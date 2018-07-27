package model;


import ui.content.ContentItemView;
import js.Browser;
import firebase.Firebase;
import utils.*;
import mithril.M.Mithril;
import mithril.M;
import mithril.M.m;
import model.ContentTreeModel;

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
            "/yxa": routeHandler,
            "/room/:treeId/:roomId": this.roomHandler,
            "/shelf/:treeId/:roomId/:shelfId": this.shelfHandler,
            "/book/:treeId/:roomId/:shelfId/:bookId": this.bookHandler,
            "/chapter/:treeId/:roomId/:shelfId/:bookId/:chapterId": this.chapterHandler,
            "/subchapter/:treeId/:roomId/:shelfId/:bookId/:chapterId/:subchapterId": this.subchapterHandler,
        }       
        
        var element = js.Browser.document.querySelector;
        M.route(element('#routes'), '/', routes); 
    }

   public var homeHandler:SimpleRouteResolver = {
        onmatch: function(args, path) {
            try {
                //var ref:RoomRef = {treeId:args.get('treeId'), roomId:args.get('roomId')};
                ContentItemModel.instance.contentItem = HomeType;
                // ErrorsAndLogs.addLog('RouteResolver:$path: ' + args + '');
            } catch (e:Dynamic) {
                ErrorsAndLogs.addError('RouteResolver roomHandler Error: $e');
                null;
            }
            return null;
        },
        render:function(vnode) {
            return m('div', 'RouteHandler');
        }
    }

    public var roomHandler:SimpleRouteResolver = {
        onmatch: function(args, path) {
            try {
                var ref:RoomRef = {treeId:args.get('treeId'), roomId:args.get('roomId')};
                ContentItemModel.instance.contentItem = RoomType(ref);
                // ErrorsAndLogs.addLog('RouteResolver:$path: ' + args + '');
            } catch (e:Dynamic) {
                ErrorsAndLogs.addError('RouteResolver roomHandler Error: $e');
                null;
            }
            return null;
        },
        render:function(vnode) {
            return m('div', 'RouteHandler');
        }
    }

    public var shelfHandler:SimpleRouteResolver = {
        onmatch: function(args, path) {
            try {
                var ref:ShelfRef = {treeId:args.get('treeId'), roomId:args.get('roomId'), shelfId:args.get('shelfId')};
                ContentItemModel.instance.contentItem = ShelfType(ref);
                // ErrorsAndLogs.addLog('RouteResolver:$path: ' + args + '');
            } catch (e:Dynamic) {
                ErrorsAndLogs.addError('RouteResolver ShelfHandler Error: $e');
                null;
            }
            return null;
        },
        render:function(vnode) {
            return m('div', 'RouteHandler');
        }
    }

    public var bookHandler:SimpleRouteResolver = {
        onmatch: function(args, path) {
            try {
                var ref:BookRef = {treeId:args.get('treeId'), roomId:args.get('roomId'), shelfId:args.get('shelfId'), bookId:args.get('bookId')};
                ContentItemModel.instance.contentItem = BookType(ref);
                // ErrorsAndLogs.addLog('RouteResolver:$path: ' + args + '');
            } catch (e:Dynamic) {
                ErrorsAndLogs.addError('RouteResolver bookHandler Error: $e');
                null;
            }
            return null;
        },
        render:function(vnode) {
            return m('div', 'RouteHandler');
        }
    }
    
    public var chapterHandler:SimpleRouteResolver = {
        onmatch: function(args, path) {
            try {
                var ref:ChapterRef = {treeId:args.get('treeId'), roomId:args.get('roomId'), shelfId:args.get('shelfId'), bookId:args.get('bookId'), chapterId:args.get('chapterId')};
                ContentItemModel.instance.contentItem = ChapterType(ref);
                // ErrorsAndLogs.addLog('RouteResolver:$path: ' + args + '');
            } catch (e:Dynamic) {
                ErrorsAndLogs.addError('RouteResolver chapterHandler Error: $e');
                null;
            }
            return null;
        },
        render:function(vnode) {
            return m('div', 'RouteHandler');
        }
    }

    public var subchapterHandler:SimpleRouteResolver = {
        onmatch: function(args, path) {
            try {
                var ref:SubchapterRef = {treeId:args.get('treeId'), roomId:args.get('roomId'), shelfId:args.get('shelfId'), bookId:args.get('bookId'), chapterId:args.get('chapterId'), subchapterId: args.get('subachapterId')};
                ContentItemModel.instance.contentItem = SubchapterType(ref);
                // ErrorsAndLogs.addLog('RouteResolver:$path: ' + args + '');
            } catch (e:Dynamic) {
                ErrorsAndLogs.addError('RouteResolver subchapterHandler Error: $e');
                null;
            }
            return null;
        },
        render:function(vnode) {
            return m('div', 'RouteHandler');
        }
    }    
}

typedef SimpleRouteResolver = {
	function onmatch(args : haxe.DynamicAccess<String>, requestedPath : String) : Dynamic;
	function render(vnode : Null<Vnode<Dynamic>>) : Vnodes;
}
