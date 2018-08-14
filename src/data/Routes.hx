package data;


import ui.ClientUI.Pages;
import js.Browser;
import firebase.Firebase;
import utils.*;
import mithril.M.Mithril;
import mithril.M;
import mithril.M.m;
import data.ContentModel;
import data.Content;
import ui.ClientUI;

class Routes {
    public static var instance(default, null):Routes = new Routes();
    
    private function new () {

    }  // private constructor

    public function init() {
        var routeHandler:SimpleRouteResolver = { 
            onmatch: function(args, path) {
                trace(args);
                trace(path);
                ErrorsAndLogs.addLog('RouteResolver:$path: ' + args + '');
                return null;
            },
            render:function(vnode) {
                return m('div', 'RouteHandler');
            }
        }

        var routes = {
            "/": this.homeHandler,
            // "/room/:roomId": this.roomHandler,
            // "/shelf/:roomId/:shelfId": this.shelfHandler,
            // "/book/:roomId/:shelfId/:bookId": this.bookHandler,
            // "/chapter/:roomId/:shelfId/:bookId/:chapterId": this.chapterHandler,
            // "/subchapter/:roomId/:shelfId/:bookId/:chapterId/:subchapterId": this.subchapterHandler,

            "/content/:roomId": this.contentHandler,
            "/content/:roomId/shelves": this.shelvesHandler,
            "/content/:roomId/:shelfId": this.contentHandler,
            "/content/:roomId/:shelfId/:bookId": this.contentHandler,
            "/content/:roomId/:shelfId/:bookId/:chapterId": this.contentHandler,
            "/content/:roomId/:shelfId/:bookId/:chapterId/:subchapterId": this.contentHandler,
        }       
        
        var element = js.Browser.document.querySelector;
        M.route(element('#routes'), '/', routes); 
    }

   public var contentHandler:SimpleRouteResolver = {
        onmatch: function(args, path) {
            try {
                ErrorsAndLogs.addLog('RouteResolver:$path: ' + args + '');
                
                /*
                if (args.exists('subchapterId')) {
                    FilterModel.instance.setFilterSubchapter(cast args);
                } else (args.exists('chapterId')) {
                    FilterModel.instance.setFilterChapter(cast args);
                } else (args.exists('subchapterId')) {
                    FilterModel.instance.setFilter(cast args);
                } else (args.exists('subchapterId')) {
                    FilterModel.instance.setFilterSubchapter(cast args);
                } else (args.exists('subchapterId')) {
                    FilterModel.instance.setFilterSubchapter(cast args);
                } else
                */

                FilterModel.instance.setFilterContent(cast args);
                


            } catch (e:Dynamic) {
                ErrorsAndLogs.addError('RouteResolver roomHandler Error: $e');
                null;
            }
            return null;
        },
        render:function(vnode) {
            return m('div', 'homeHandler');
        }
    }

   public var shelvesHandler:SimpleRouteResolver = {
        onmatch: function(args, path) {
            try {
                ErrorsAndLogs.addLog('RouteResolver:$path: ' + args + '');
                FilterModel.instance.setFilterContent(cast args);
                PagesModel.instance.pageIdx = 1;
            } catch (e:Dynamic) {
                ErrorsAndLogs.addError('RouteResolver roomHandler Error: $e');
                null;
            }
            return null;
        },
        render:function(vnode) {
            return m('div', 'homeHandler');
        }
    }



   public var homeHandler:SimpleRouteResolver = {
        onmatch: function(args, path) {
            try {
                ErrorsAndLogs.addLog('RouteResolver:$path: ' + args + '');
                FilterModel.instance.setFilterContent(null);
            } catch (e:Dynamic) {
                ErrorsAndLogs.addError('RouteResolver roomHandler Error: $e');
                null;
            }
            return null;
        },
        render:function(vnode) {
            return m('div', 'homeHandler');
        }
    }

    // public var roomHandler:SimpleRouteResolver = {
    //     onmatch: function(args, path) {
    //         try {
    //             var ref:RoomRef = {treeId:null, roomId:args.get('roomId')};
    //             FilterModel.instance.setFilterRoom(ref);
    //             ErrorsAndLogs.addLog('RouteResolver:$path: ' + args + '');
    //         } catch (e:Dynamic) {
    //             ErrorsAndLogs.addError('RouteResolver roomHandler Error: $e');
    //             null;
    //         }
    //         return null;
    //     },
    //     render:function(vnode) {
    //         return m('div', 'RouteHandler');
    //     }
    // }

    // public var shelfHandler:SimpleRouteResolver = {
    //     onmatch: function(args, path) {
    //         try {
    //             var ref:ShelfRef = {treeId:null, roomId:args.get('roomId'), shelfId:args.get('shelfId')};
    //             FilterModel.instance.setFilterShelf(ref);
    //             // ContentItemModel.instance.contentItem = ShelfType(ref);
    //             ErrorsAndLogs.addLog('RouteResolver:$path: ' + args + '');
    //         } catch (e:Dynamic) {
    //             ErrorsAndLogs.addError('RouteResolver ShelfHandler Error: $e');
    //             null;
    //         }
    //         return null;
    //     },
    //     render:function(vnode) {
    //         return m('div', 'RouteHandler');
    //     }
    // }

    // public var bookHandler:SimpleRouteResolver = {
    //     onmatch: function(args, path) {
    //         try {
    //             var ref:BookRef = {treeId:null, roomId:args.get('roomId'), shelfId:args.get('shelfId'), bookId:args.get('bookId')};
    //             // ContentItemModel.instance.contentItem = BookType(ref);
    //             FilterModel.instance.setFilterBook(ref);
    //             ErrorsAndLogs.addLog('RouteResolver:$path: ' + args + '');
    //         } catch (e:Dynamic) {
    //             ErrorsAndLogs.addError('RouteResolver bookHandler Error: $e');
    //             null;
    //         }
    //         return null;
    //     },
    //     render:function(vnode) {
    //         return m('div', 'RouteHandler');
    //     }
    // }
    
    // public var chapterHandler:SimpleRouteResolver = {
    //     onmatch: function(args, path) {
    //         try {
    //             var ref:ChapterRef = {treeId:null, roomId:args.get('roomId'), shelfId:args.get('shelfId'), bookId:args.get('bookId'), chapterId:args.get('chapterId')};
    //             FilterModel.instance.setFilterChapter(ref);
    //             ErrorsAndLogs.addLog('RouteResolver:$path: ' + args + '');
    //         } catch (e:Dynamic) {
    //             ErrorsAndLogs.addError('RouteResolver chapterHandler Error: $e');
    //             null;
    //         }
    //         return null;
    //     },
    //     render:function(vnode) {
    //         return m('div', 'RouteHandler');
    //     }
    // }

    // public var subchapterHandler:SimpleRouteResolver = {
    //     onmatch: function(args, path) {
    //         try {
    //             var ref:SubchapterRef = {treeId:null, roomId:args.get('roomId'), shelfId:args.get('shelfId'), bookId:args.get('bookId'), chapterId:args.get('chapterId'), subchapterId: args.get('subchapterId')};
    //             // ContentItemModel.instance.contentItem = SubchapterType(ref);
    //             FilterModel.instance.setFilterSubchapter(ref);
    //             ErrorsAndLogs.addLog('RouteResolver:$path: ' + args + '');
    //         } catch (e:Dynamic) {
    //             ErrorsAndLogs.addError('RouteResolver subchapterHandler Error: $e');
    //             null;
    //         }
    //         return null;
    //     },
    //     render:function(vnode) {
    //         return m('div', 'RouteHandler');
    //     }
    // }    
}

typedef SimpleRouteResolver = {
	function onmatch(args : haxe.DynamicAccess<String>, requestedPath : String) : Dynamic;
	function render(vnode : Null<Vnode<Dynamic>>) : Vnodes;
}
