package ui;

import ui.content.ContentTreeView.UIShelf;
import mithril.M;
import data.ErrorsAndLogs;
import data.*;
import data.Content;
import ui.content.ContentItemsView;
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
            new HomeView().view(),
            new ShelvesView().view(),
            new BookView().view(),
            [
                new ui.content.ContentTreeView(ContentModel.instance.content).view(),
                new UIFilters().view(),
            ]            
        ], PagesModel.instance.pageIdx, null, null, PagesModel.instance.pageWidth).view();
    }
}

class PagesModel {


    private function new() {}
    public static var instance(default, null): PagesModel = new PagesModel();

    public var pageIdx(default, set):Int = 0;
    function set_pageIdx(val:Int) {
        this.pageIdx = val;
        M.redraw();
        return this.pageIdx;
    }

    public var pageWidth(default, set):String = '25%';
    function set_pageWidth(val:String) {
        this.pageWidth = val;
        M.redraw();
        return this.pageWidth;
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
                    border: 1px solid gray;
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


/*
class UIContentHomepage implements Mithril {
    public function new() { 
        this.homeroom = FilterModel.instance.getHomeroom();
        this.homeShelves = homeroom.shelves.getShelvesOfType(Homepage);
        this.otherShelves = homeroom.shelves.getShelvesExcludeType(Homepage);        
    }
    
    var homeroom:Room;
    var homeShelves:Array<Shelf>;
    var otherShelves:Array<Shelf>;   

    public function view() {
        return try {
            var homeshelfView = try {
                [
                    m('div', 'Home Shelf'),
                    m('div.border.grid1', 'Sh: ' +  homeroom.shelves.getShelvesOfType(Homepage).first().title),
                ];
            } catch (e:Dynamic) {
                m('div.error', 'Cant get home shelf for this room!');
            } 
            var otherShelvesView = try {
                [
                    m('div', 'Other shelves overview:'),
                    m('div.grid2', this.otherShelves.map(shelf->{
                        m('a.border', {href:'/shelf'+shelf.path, oncreate: M.routeLink}, 'Sh: ' + shelf.title);
                    })),
                ];        
            } catch (e:Dynamic) {
                m('div.error', 'Cant get other shelves for this room!');
            }

            m('.border', [
                m('a', {href:'/', oncreate: M.routeLink},'Room filter:' + FilterModel.instance.filterRoom),
                m('h2', homeroom.title + ' (' + homeroom.id + ')'),
                homeshelfView,
                otherShelvesView, 
            ]);


        } catch (e:Dynamic) {
            ErrorsAndLogs.addError('Can not find book: $e');
            m('.error', 'ERROR $e');
        } 
    }
}
*/

// class UIHomeShelf implements Mithril {
//     public function new(room:Room) { 

//         // Plocka fram shelf ot type home
//         var homeShelves = room.shelves.getShelvesOfType(Homepage);
//         this.homeshelf = homeShelves.length>0 ? room.shelves.first() : null;
//         this.otherShelves = room.shelves.getShelvesExcludeType(Homepage);

//     }


//     public function view() {
//         if (this.homeshelf == null) return m('div.error', 'This Room does not have a Home Shelf');
//         return [
//                     m('div.border.grid1', 'HomeShelf ' +  this.homeshelf.path),
//                     // m('h3', 'Other shelves overview:'),
//                     // m('div.grid2', this.otherShelves.map(shelf->{
//                     //         m('a.border', {href:'/shelf'+shelf.path, oncreate: M.routeLink}, 'Shelf: ' + shelf.path);
//                     // })),
//         ];
//     }
    
// }





// class UIContentFilteredShelves implements Mithril {
//     public function new() { 
//         this.homeroom = FilterModel.instance.getHomeroom();
//     }
    
//     var homeroom:Room;
    
//     public function view() {
//         return try {
//             m('div.border', [
//                 m('a', {href:'/room' +  this.homeroom.path, oncreate: M.routeLink},'Shelf filter:' + FilterModel.instance.filterShelf),
//                 // m('div', 'Shelf filter:' + FilterModel.instance.filterShelf),
//                 // m('a', {onclick:e->{
//                 //     FilterModel.instance.filterShelf = null;
//                 // }}, 'Reset'),
//                 m('h2', 'UIContentFilteredShelves'),
//                 m('div.grid1', FilterModel.instance.getFilteredShelves().getShelvesExcludeType(Shelftype.Homepage).map(shelf->{
//                     var a = m('a', {href:'/shelf'+shelf.path, oncreate: M.routeLink}, 'Sh: ' + shelf.title);
//                     m('div.border', [
//                         a,
//                         m('h4', 'Books:'),
//                         m('div.grid4', [
//                             shelf.books.map(book->{
//                                 m('a.border', {href:'/book'+book.path, oncreate: M.routeLink}, 'B: ' + book.title);

//                             })
//                         ]),
//                     ]);
//                 }))
//             ]);
//         } catch (e:Dynamic) {
//             ErrorsAndLogs.addError('UIContentFilteredShelves:' + e);
//             m('.error', 'UIContentFilteredShelves $e');

//         }
//     }
// }

/*
class UIContentBook implements Mithril {
    public function new() { 
        this.book = FilterModel.instance.getBook();
        this.chapter = FilterModel.instance.getChapter();
        this.subchapter = FilterModel.instance.getSubchapter();
    }
    var book:Book;
    var chapter:Chapter;
    var subchapter:Chapter;
    
    public function view() {
        return try {

            var view404 =  (FilterModel.instance.filterBook != null && this.book == null)
            ? m('h1.error', '404')
            : null;

            var bookView = (this.book != null) 
            ? m('div', [
                m('h2', 'Book:' + this.book.title),
                m('div', '' + this.book.path),
                m('div', '' + this.book.info),
            ])
            : m('div', 'No book');


            var chaptersListView = (this.chapter != null)
            ? [
                m('h3', 'ChaptersList:'),
                m('div.grid1', this.book.chapters.map(chapter->{
                        var active = chapter.id == this.chapter.id ? '.active' : '';
                        m('a.border$active', {href:'/chapter' + chapter.path, oncreate:M.routeLink}, 'Ch ' + chapter.title);
                })),                
            ]
            : m('div', 'No chapter');


            var chapterView = (this.chapter != null)
            ? m('div', [
                m('div', 'Chapter filter:' + FilterModel.instance.filterChapter),
                m('h2', 'Chapter ' + this.chapter.title),
                m('div', '' + this.chapter.path),
                m('div', '' + this.chapter.info),  
                new UIContentitemView(this.chapter).view(),
            ])
            : m('div', 'No chapter');


            var subchaptersView = this.subchapter != null  
            ? m('div', [
                m('div', 'Subchapters:'),
                m('div', 'Subchapter filter:' + FilterModel.instance.filterSubchapter),    
                m('nav', this.chapter.subchapters.map(sub->{

                    var active = sub.id == this.subchapter.id ? '.active' : '';
                    m('a.border$active', {href:'/subchapter' + sub.path, oncreate:M.routeLink}, 'Sub ' + sub.title);
                })),
                m('h3', 'Subchapter: ' + this.subchapter.title),
                m('div', '' + this.subchapter.path),
                m('div', '' + this.subchapter.info), 
                new UIContentitemView(this.subchapter).view(),
            ])
            : m('div', 'No subchapter');

            // -----------------------------------------------------------

            m('article.border', [  
                
                m('header', {style:{gridArea:'header'}}, [
                    view404, 
                    bookView,
                    m('div', 'Book filter:' + FilterModel.instance.filterBook),
                ]),
                m('aside.border', {style:{gridArea:'aside'}}, [
                    chaptersListView,
                ]),
                m('section#section1.border', {style:{gridArea:'section1'}}, [
                    chapterView,
                    
                ]),
                m('section#section2.border', {style:{gridArea:'section2'}}, [
                    subchaptersView,
                ]),
            ]);
        } catch (e:Dynamic) {
           m('div.border.error', 'Can not show book data for filter: ' + FilterModel.instance.filterBook); 
        } 
    }
}
*/

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

class UIDevbuttons implements Mithril {

    public function new() { //(state:T) {

    }
    
    public function view() {
        return [
            m("button[type=button]", {onclick:e->{
                data.UserLoader.instance.signIn('jonasnys@gmail.com', '123456');
            }}, 'Log in as Jonas'),

            m("button[type=button]", {onclick:e->{
                data.UserLoader.instance.load();
            }}, 'UserLoader.load()'),            
            // m("button[type=button]", {onclick:e->{
            //     FilterModel.instance.setFilterRoom({treeId:null, roomId:'room1'});
            // }}, 'Set room as room1'),
            // m("button[type=button]", {onclick:e->{
            //     FilterModel.instance.setFilterRoom({treeId:null, roomId:'room0'});
            // }}, 'Set room as room0'),
            // m("button[type=button]", {onclick:e->{
            //     FilterModel.instance.setFilterRoom({treeId:null, roomId:'x'});
            // }}, 'Set room as x'),
            m("button[type=button]", {onclick:e->{
                M.redraw();
            }}, 'M.redraw()'),
            
            m("button[type=button]", {onclick:e->{
                ContentLoader.instance.load();
                haxe.Timer.delay(()->{  
                    ContentLoader.instance.loadRealtimeUpdate();
                }, 3000);                
            }}, 'Load Content'),

            /*           
            m("button[type=button]", {onclick:e->{
                UserLoader.instance.load();
                haxe.Timer.delay(()->{  
                    UserLoader.instance.loadRealtimeUpdate();
                }, 3000);                
            }}, 'Load User'),   
            */

            m("button[type=button]", {onclick:e->{
                data.ContentitemLoader.instance.load(['a']);
            }}, 'Load contentitem'),                     
        ];
    }
}


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


class StateMonitor implements Mithril {
    public function new() {}

    public function view() {
        return m('div', [
            m('div', 'Statemonitor'),
            // m('div.statelabel', 'logs:'),
            // m('div.stateitems', ErrorsAndLogs.logs.map(e->m('div.stateitem.statelog', ''+e))),
            // m('div.statelabel', 'errors:'),
            // m('div.stateitems', ErrorsAndLogs.errors.map(e->m('div.stateitem.stateerror', ''+e))),
            // m('div.statelabel', 'content-tree'),
            // m('div.stateitems', '' + ContentModel.instance.content),
            // new UIContent().view(),
        ]);
    }
}
