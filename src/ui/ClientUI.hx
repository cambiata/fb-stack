package ui;

import ui.content.ContentTreeView.UIShelf;
import mithril.M;
import data.*;
import data.Content;
import ui.content.ContentItemsView;
import firebase.Firebase;

import markdown.MithrilTools;

using data.Content.ContentFilters;
using cx.ArrayTools;
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
                PagesModel.instance.pageWidth = '25%';
            }}, 'Width 25%'),
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
    
    public function view() {

        var book = FilterModel.instance.getBook();

        var headerView = (book != null) ?  [m('div', book.title)] : cast 'No book selected';
        

        var chapter = FilterModel.instance.getChapter();
        var chapterView = try {
            if (chapter == null) m('div', 'No chapter selected') else
            [
                m('h1', '' + chapter.title),
                // m('p', '' + chapter.text),
                MithrilTools.markdownToView(chapter.text),
            ];
        } catch (e:Dynamic) {
            m('div', 'Chapter does not exist');
        }

        var editChapterView = try {
            m('details', [
                // m('texarea', {val:chapter.text}),
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

        var chapters = FilterModel.instance.getChapters();
        var chaptersView = try {
            
            m('nav',
            [
                m('a.btn', {href:'/content' + FilterModel.instance.getShelf().path, oncreate:M.routeLink}, '<<'),
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

        var subchapter = FilterModel.instance.getSubchapter();
        var subchapterView = try {
            if (subchapter == null) m('div', 'No subchapter selected') else
            [
                m('h2', '' + subchapter.title),
                // m('p', '' + subchapter.text),
                MithrilTools.markdownToView(subchapter.text),
                

            ];
        } catch (e:Dynamic) {
            m('div', 'Subchapter does not exist');
            
        }
        var subchapters = FilterModel.instance.getSubchapters();
        var subchaptersView = try {            
                subchapters.map(sub->{
                    var selected = (sub == FilterModel.instance.getSubchapter()) ? '.selected' : '';
                    m('a$selected', {href:'/content' + sub.path, oncreate:M.routeLink}, '' + sub.title);
                });

        } catch (e:Dynamic) {
            m('div.border', 'No subchapters');
        }

        return m('div.book', [
            m('header', headerView),
            chaptersView,
            m('article', [
                m('section', chapterView),
                editChapterView,
                m('menu', subchaptersView),
                m('section', subchapterView),
                // subchaptersView,
                // subchapterView,
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
                            m('img', {src:"/assets/slice4.png"}),
                            m('div', book.title),

                        ])
                    );
                });
                          
                m('section', [
                    m('header', m('h1', shelf.title)),
                    books,
                ]);
         });



                // m('section', [
                //     m('header', m('h1', 'Sectionheader')),
                //     FilterModel.instance.getRoom().shelves.map(shelf->{
                //         var selected = shelf == FilterModel.instance.getShelf() ? '.selected' : '';                        
                //         m('nav$selected', 
                //             m('a', {href:'/content'+shelf.path, oncreate: M.routeLink}, [
                //                 m('img', {src:'/assets/slice3.png'}),
                //                 m('div', shelf.title),
                //             ])
                //         );
                //     }),
                // ]),         

        
        // return m('div.border', [
        //     m('h1', 'shelves'),
        //     m('p', [m('a', {href:'/content' + FilterModel.instance.getRoom().path, oncreate:M.routeLink}, 'Visa alla'),]),

        //     m('div', FilterModel.instance.getShelves().map(shelf->{
        //         var a = m('a', {href:'/content'+shelf.path, oncreate: M.routeLink}, '' + shelf.title);
        //         m('div.border', [
        //             a,
        //             m('nav', [
        //                 shelf.books.map(book->{
        //                     var selected = book == FilterModel.instance.getBook() ? '.selected' : '';
                            


        //                 })
        //             ]),
        //         ]);
        //     }))

        // ] );
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
    
    public function view() {

        var homeView = try {
            var room = FilterModel.instance.getRoom();
            [
                m('section', [
                    m('article', 'Article'),
                    m('nav', 'Nav'),
                    m('article', 'Article'),
                    m('nav', 'Nav'),
                ]),
            ];
        } catch (e:Dynamic) { 
            trace('error: ' + e); 
            m('div.error', 'Error:' + e);
        
        }

        var othershelvesView = try {
            [
                m('section', [
                    m('header', m('h1', 'Sectionheader')),
                    FilterModel.instance.getRoom().shelves.map(shelf->{
                        var selected = shelf == FilterModel.instance.getShelf() ? '.selected' : '';                        
                        m('nav$selected', 
                            m('a', {href:'/content'+shelf.path, oncreate: M.routeLink}, [
                                m('img', {src:'/assets/slice3.png'}),
                                m('div', [
                                    m('h3', shelf.title),
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

        return m('div.home', [
            homeView,            
            othershelvesView,
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

