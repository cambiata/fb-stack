package ui;

import haxe.DynamicAccess;
import ui.content.ContentTreeView.UIShelf;
import mithril.M;
import data.*;
import data.Content;
import ui.content.ContentItemsView;
import firebase.Firebase;

import markdown.MithrilTools;

using data.Content.ContentFilters;
using cx.ArrayTools;
using dataclass.TypedJsonConverter;
using dataclass.JsonConverter;
using data.FilterModel.FilterTools;
using Lambda;

class ClientUI implements Mithril { 
    public static var instance(default, null):ClientUI = new ClientUI();
    private function new () {}  // private constructor
    public function init() {
        var element = js.Browser.document.querySelector;       
        M.mount(element('header'), new UIHeader());
        // M.mount(element('div#buttons'), new UIDevbuttons());
        // M.mount(element('main#develop'), new UIDevelop());
        // M.mount(element('main#content'), new UIContent());
        M.mount(element('main'), new UIContent());

        M.mount(element('footer'), new UIFooter());
    }    
}

class UIFooter implements Mithril {
    public function new() {}
    public function view() {
        var values = [['aaa', 'Alt A'],['ccc', 'Alt B'],];
        
        return [
            m('button', {onclick: e->{
                PagesModel.instance.pageIdx = 0;
            }}, 'Page 0'),
            m('button', {onclick: e->{
                PagesModel.instance.pageIdx = 1;
            }}, 'Page 1'),
            m('button', {onclick: e->{
                PagesModel.instance.pageIdx = 2;
            }}, 'Page 2'),
            m('button', {onclick: e->{
                PagesModel.instance.pageIdx = 3;
            }}, 'Page 3'),
            m('button', {onclick: e->{
                PagesModel.instance.pageWidth = '100%';
            }}, 'Width 100%'),
            m('button', {onclick: e->{
                PagesModel.instance.pageWidth = '50%';
            }}, 'Width 50%'),
            m('button', {onclick: e->{
                PagesModel.instance.pageWidth = '25%';
            }}, 'Width 25%'),
            m('button', {onclick: e->{
                ContentLoader.instance.loadContent();
            }}, 'Content load'),
            m('button', {onclick: e->{
                trace(haxe.Json.stringify(ContentModel.instance.content.toTypedJson()));
            }}, 'Trace content'),

            m('select', {onchange:e->{                    
                    trace(e.target.selectedIndex);
                    var roomIdx = e.target.selectedIndex;
                    var roomId = ContentModel.instance.content.rooms[roomIdx].id;
                    FilterModel.instance.setFilterContent({roomId:roomId, bookId:null, shelfId:null, chapterId:null, subchapterId:null});
                }}, ContentModel.instance.content.rooms.map(room->{                
                m('option', {value:room.id, key:room.id}, room.title);
            })),

            m('button', {onclick: e->{
                return ApiCalls.getRequest('/api/content-tree')
                .then(result->{
                    var content:Dynamic = result.data;              

                    trace(content.rooms);


                    // content.rooms.map(room->{
                    //     trace('-' + room.classtype);
                    //     if (room.shelves != null) room.shelves.map(shelf->{
                    //         trace('- -' + shelf.classtype);
                    //         if (shelf.books != null) shelf.books.map(book->{
                    //             trace('- - -' + book.classtype);
                    //                  if (book.chapters != null) book.chapters.map(chapter->{
                    //                     trace('- - - -' + chapter.classtype);
                    //                     if (chapter.subchapters != null) chapter.subchapters.map(sub->{
                    //                         trace('- - - - -' + sub.classtype);
                    

                    //                     });       
                

                    //                 });       

                    //         });

                    //     });

                    // });



                    var c:Content = Content.fromJson(content);


                    trace('---------------------');
                    // trace(c.toTypedJson());
                    trace(haxe.Json.stringify(c.toTypedJson()));
                })
                .catchError(e->{
                    trace(e);
                });
            }}, 'ClickMe'),

            m('button', {onclick: e->{
                trace(haxe.Json.stringify(ContentModel.instance.content.toTypedJson()));

            }}, 'Tree to json'),

        ];
    }
}


class UIContent implements Mithril {
    public function new() { //(state:T) {

    }

    public function view() {
        new Pages([
            new Homepage().view(),
            // new HomeView().view(),
            new Shelvespage().view(),
            
            //new ShelvesView().view(),
            new Bookpage().view(),
            // new BookView().view(),
            [
                new ui.content.ContentTreeView(ContentModel.instance.content).view(),
                new UIFilters().view(),
            ]            
        ], PagesModel.instance.pageIdx, null, null, PagesModel.instance.pageWidth).view();
    }
}

class Bookpage implements Mithril {
    public function new() {

    }
    
    function chapterView(chapter:Chapter) {
        return try {
            if (chapter == null) m('div', 'No chapter selected') else
            m('section', [
                m('h1', '' + chapter.title),
                // m('p', '' + chapter.text),
                MithrilTools.markdownToView(chapter.text),
            ]);
        } catch (e:Dynamic) {
            m('div', 'Chapter does not exist');
        }
    }

    function chaptersView(chapters:Array<Chapter>, book:Book) {
        return try {            
            m('nav',
            [
                m('a.btn', {href:'/content' + FilterModel.instance.getShelf().path, oncreate:M.routeLink}, '<<'),
                m('img', {src:'/assets/books/${book.id}.jpg'}),
                m('h3', 'Innehåll:'),
                // m('div.border', 'Chapters length:' + chapters.length),
                m('ul', chapters.map(chap->{
                    var selected = (chap == FilterModel.instance.getChapter()) ? '.selected' : '';
                    m('li',
                        m('a$selected', {href:'/content' + chap.path, oncreate:M.routeLink}, '' + chap.title)
                    );
                })),
            ]);
        } catch (e:Dynamic) {
            m('nav', 'No chapters');
        }
    }

    function subchapterView(subchapter:Chapter) {
        return try {
            if (subchapter == null) m('div', 'No subchapter selected') else
            m('section', [
                m('h2', '' + subchapter.title),
                // m('p', '' + subchapter.text),
                MithrilTools.markdownToView(subchapter.text),
                

            ]);
        } catch (e:Dynamic) {
            m('div', 'Subchapter does not exist');
            
        }
    }

    function subchaptersView(subchapters:Array<Chapter>) {
        return try {            
                m('menu', [
                    subchapters.map(sub->{
                        var selected = (sub == FilterModel.instance.getSubchapter()) ? '.selected' : '';
                        m('a$selected', {href:'/content' + sub.path, oncreate:M.routeLink}, '' + sub.title);
                    }),
                ]);

        } catch (e:Dynamic) {
            m('div.border', 'No subchapters');
        }
    }

    function editChapterView(chapter:Chapter) {
       return try {
            m('details', [
                m('textarea', {style:{width:"100%", height:"300px"}, 
                    oninput: e->chapter.text = e.target.value,
                    value: chapter.text
                }),
                m('button', {onclick: e->{
                    trace(chapter.dbpath);
                    Firebase.database().ref(chapter.dbpath).update({text:chapter.text}, e->{
                        trace('after update ' + e);
                    });
                }}, 'Save'),
            ]);
        } catch(e:Dynamic) {
            null;
        }
    }

    function editSubchapterView(chapter:Chapter) {
       return try {
            m('details', [
                m('textarea', {style:{width:"100%", height:"300px"}, 
                    oninput: e->chapter.text = e.target.value,
                    value: chapter.text
                }),
                m('button', {onclick: e->{
                    trace(chapter.dbpath);
                    Firebase.database().ref(chapter.dbpath).update({text:chapter.text}, e->{
                        trace('after update ' + e);
                    });
                }}, 'Save'),
            ]);
        } catch(e:Dynamic) {
            null;
        }
    }    

    function headerView(book:Book) {
        return (book != null) ?  m('header', [m('div', book.title)]) : cast 'No book selected';        
    }

    public function view() {
        var book = FilterModel.instance.getBook();
        var chapter = FilterModel.instance.getChapter();
        var chapters = FilterModel.instance.getChapters();
        var subchapter = FilterModel.instance.getSubchapter();
        var subchapters = FilterModel.instance.getSubchapters();

        return m('div.book', [
            headerView(book),
            chaptersView(chapters, book),
            m('article', [
                editChapterView(chapter),
                chapterView(chapter),
                subchaptersView(subchapters),
                editChapterView(subchapter),
                subchapterView(subchapter),
            ]),
        ]);
    }

}

class Shelvespage implements Mithril {
    public function new() {

    }
    
    public function view() {
         var shelves = FilterModel.instance.getShelves().map(shelf->{
             var books = shelf.books.map(book->{
                    var selected = book == FilterModel.instance.getBook() ? '.selected' : '';
                    m('nav$selected', 
                        m('a', {href:'/content'+book.path, oncreate: M.routeLink}, [
                            m('img', {src:'/assets/books/${book.id}.jpg'}),
                            m('div', book.title),
                        ])
                    );
                });
                          
                m('section', [
                    m('header', m('h1', shelf.title)),
                    books,
                ]);
         });

        var view = try {
            m('div.shelves', [
                m('section', m('header' ,  [
                    m('a.btn', {href:'/content' + FilterModel.instance.getRoom().path, oncreate:M.routeLink}, '<<'),
                    m('a.btn', {href:'/content' + FilterModel.instance.getRoom().path + '/shelves', oncreate:M.routeLink}, 'Visa alla'),
                ])),
                shelves,
            ]);

        } catch (e:Dynamic) { m('div', 'error ' + e); } 

        return view;
    }
}

class Homepage implements Mithril {
    public function new() {

    }
    
    public function shelvesView() return try {
        [
            m('section.shelves', [
                m('header', m('h1', 'Innehåll')),
                FilterModel.instance.getRoom().shelves.map(shelf->{
                    var selected = shelf == FilterModel.instance.getShelf() ? '.selected' : '';                        
                    m('nav$selected', 
                        m('a', {href:'/content'+shelf.path, oncreate: M.routeLink}, [
                            m('img', {src:'/assets/shelves/${shelf.id}.jpg'}),
                            m('div', [
                                m('h2', shelf.title),
                                m('p', shelf.info),
                            ]),
                        ])
                    );
                }),
            ]),
        ];
    } catch (e:Dynamic) {
        m('h3.error', '404 - can not show other shelves for room  ' + FilterModel.instance.filterContent);
    }

    // public function homeView() return try {
    //     var room = FilterModel.instance.getRoom();
    //     [
    //         m('section', [
    //             m('article', 'Article'),
    //             m('nav', 'Nav'),
    //             m('article', 'Article'),
    //             m('nav', 'Nav'),
    //         ]),
    //     ];
    // } catch (e:Dynamic) { 
    //     trace('error: ' + e); 
    //     m('div.error', 'Error:' + e);
    // }    

    public function cellsView(s:SectionCells) return try {
        var header = s.title > '' ? m('header', m('h1', s.title)) : null;        

        var dense = {gridAutoFlow: 'dense'};

        m('section.cells', [
            header,
            s.cells.map(c->{
                return switch Type.getClass(c) {
                    case VideoCell:
                        var c:VideoCell = cast c;
                        var styles = new DynamicAccess<String>();
                        if (c.gridColumn > '') styles.set('gridColumn', c.gridColumn);
                        if (c.gridRow > '') styles.set('gridRow', c.gridRow);
                        m('article.cell', {style:styles},  
                            m('video', {src:c.video, controls:true, style:{width:'100%', height:'100%', backgroundColor:'black'}})
                        );

                    case _: 
                        var c:TextCell = cast c;
                        var styles = new DynamicAccess<String>();
                        var aTag = c.url > '' ? 'a' : 'div';
                        var aHref = c.url > '' ? {href: c.url, oncreate:M.routeLink} : null;
                        var image = c.image > '' ? m('img', {src:c.image}) : null;                
                        if (c.color > '') styles.set('color', c.color);
                        if (c.bgcolor > '') styles.set('backgroundColor', c.bgcolor);
                        if (c.bgimage > '') styles.set('backgroundImage', 'url("' + c.bgimage + '")');
                        if (c.gridColumn > '') styles.set('gridColumn', c.gridColumn);
                        if (c.gridRow > '') styles.set('gridRow', c.gridRow);
                        m('article.cell', {style: styles}, 
                            m(aTag, aHref, [
                                    image,
                                    MithrilTools.markdownToView(c.text),
                                ]
                            )
                        );
                }
            }),
        ]);
    } catch (e:Dynamic) { 
        trace('error: ' + e); 
        m('div.error', 'Error:' + e);
    }       

    public function homeView() return try {        
        var home:Home = FilterModel.instance.getRoom().home;
        if (home == null) return shelvesView();
        cast [
            home.sections.sortA((a,b)->a.sort-b.sort).map(s->{
                switch Type.getClass(s) {
                    case SectionShelves: shelvesView();
                    case SectionCells: cellsView(cast s);
                    case _: m('div', 'unknown shelf');
                }
            }),
        ];
    } catch(e:Dynamic) {
        return m('section', m('div', 'Homeview error: $e'));
    }
 

    public function view() {             
        return m('div.home', [
            homeView(),
        ]);
    }
}

class Pages implements Mithril {
    public function new(views:Array<mithril.Vnodes>, shift:Int=0, pageTop='60px', pageBottom='100px', pageWidth='30%') {
        this.views = views;
        this.shift = shift;
        this.pageTop = pageTop;
        this.pageBottom = pageBottom;
        this.pageWidth = pageWidth;
    }

    var views:Array<mithril.Vnodes>;
    var shift: Int;
    var pageTop:String;
    var pageBottom:String;
    var pageWidth:String;

    public function view() {   
        return m('div', 
            this.views.mapi((i, v)->{
                var pos = i + -this.shift;
                var style = '
                    position:absolute; 
                    width: ${this.pageWidth};
                    top: ${this.pageTop};
                    bottom:  ${this.pageBottom};
                    border: 0px solid gray;
                    transition-duration: 200ms;        
                    transform: translate3d(${pos*100}%, 0, 1px);
                    overflow-y:scroll;
                    
                ';
                m('div#page' + i, {style:style}, v);            
            }).array()
        );
    }

    public function setShift(shift:Int) {
        shift = cast Math.max(0, Math.min(shift, this.views.length-1));
        this.shift = shift;
    }
}

class Testpage implements Mithril {
    public function new(msg:String) {
        this.msg = msg;
    }
    var msg:String;
    public function view() {
        return [
            m('h1', msg),
        ];
    }
}


class UIContentSearch implements Mithril {
    public function new() { 
    
    }
    
    public function view() {
        return new UIFilters().view();
    }
}

class UIFilters implements Mithril {
    public function new() {}

    public function view() {


        var f = FilterModel.instance.filterContent;
        var s:String = f != null ? '${f.roomId}/${f.shelfId}/${f.bookId}/${f.chapterId}/${f.subchapterId}' : 'null';
        var filterContentView = m('div', 'filter2: $s');



        return m('.border', [
            m('h3', 'Filters:'),
            filterContentView,
            // roomFilterView,
            // shelfFilterView,
            // bookFilterView,
            // chapterFilterView,
            // subchapterFilterView,
        ]);

    }
}

// class UIContentitemView implements Mithril {
//     public function new(chapter:Chapter) { //(state:T) {
//         this.chapter = chapter;
//     }
//     var chapter:Chapter;
//     public function view() {
//         var content = data.ContentitemModel.instance.getChapterContent(this.chapter.path);
//         var contentView = content == null ? [
//             m('div.error', '404 - content is null for ' + this.chapter.path),
//             m('button', {onclick:e->{
//                 ContentitemLoader.instance.createItem(this.chapter.path, 'This is new content for ' + this.chapter.title + ' (' + this.chapter.path + ')');
//             }}, 'Create'),
//          ] 
//          : m('div', 'Content: ' + content); 

//         return m('div', [
//             m('h1', 'UIContentitemView'),
//             contentView,
//         ] );
//     }
    
// }

//-----------------------------------------------------------------------------------------------------------------------------

class UIDevelop implements Mithril {
    public function new() { 
    
    }
    
    public function view() {
        return [
            new ui.content.ContentTreeView(ContentModel.instance.content).view(),
            new ui.content.ContentTreeView(ContentModel.instance.content.sort()).view(),
            // new ui.content.ContentTreeView(ContentModel.instance.content.fiterRoomAndShelfHome()).view(),
            new UIFilters().view(),
        ];
    }
}

