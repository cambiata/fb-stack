package ui.content;

import utils.*;
import mithril.M.Mithril;
import mithril.M;
import mithril.M.m;
import Client;
import model.UserModel;
import model.ContentTreeModel;
import model.ErrorsAndLogs;
import model.ApiCalls;

using StringTools;
using model.ContentTreeModel;
using cx.ArrayTools;

typedef ContentTreeFilter = {
    filterRooms:Array<String>, 
    filterAccess:Int,
}

class ContentTreeView implements Mithril {

    public function new(filter:ContentTreeFilter=null) {
        this.filter = filter;
    }

    var filter:ContentTreeFilter;

    public function view() {
        return switch ContentTreeModel.instance.contentTree {
            case Nil: m('h1', 'Nil');
            case Loading: m('h1', 'Loading');
            case Data(ct): 
                //var ct = (this.filter != null && this.filter.filterRooms != null) ? contentTree.filterContentTree(this.filter.filterRooms) : contentTree;
                var path = ct.id;
                m('details[open]', [m('summary', 'ContentTree ' + ct.id)].concat(ct.rooms.map(child-> cast new UIRoom(child, path, filter).view() )) );
        }
    }

    static public function parsePath(p:String):SubchapterRef {
        var segments = p.split('/');
        return {treeId:segments.indexOrNull(0), roomId:segments.indexOrNull(1), shelfId:segments.indexOrNull(2), bookId:segments.indexOrNull(3), chapterId:segments.indexOrNull(4), subchapterId:segments.indexOrNull(5)};
    }

}

class UIRoom implements Mithril {
    public function new(item:Room, parentPath:String, filter:ContentTreeFilter) {
        this.item = item;
        this.path = parentPath + '/' + item.id;
        this.filter = filter;
    }
    var filter:ContentTreeFilter;
    var path:String;
    var item:Room = null;
    public function view() {

        var showItem = (filter != null && filter.filterRooms.has(item.id));
        var cssClass = showItem ? '.open' : '.protected';

        var children = (this.item.shelves != null) ? this.item.shelves : [];
        // var anchor = m('a', {href:this.path, oncreate: M.routeLink }, 'Room ' + item.id );
        var objPath = ContentTreeView.parsePath(this.path);
        var itemPath = '/' +['room', objPath.treeId, objPath.roomId].join('/');
        var anchor = m('a', {href:itemPath, oncreate: M.routeLink }, 'Room:' + this.item.id + ':' + itemPath);
        
        return m('details[open]$cssClass', [m('summary', [anchor])].concat(children.map(child-> cast new UIShelf(child, this.path, this.filter).view() )) );
    }
}

class UIShelf implements Mithril {
    public function new(item:Shelf, parentPath:String, filter:ContentTreeFilter) {
        this.item = item;
        this.path = parentPath + '/' + item.id;
        this.filter = filter;
    }
    var  filter:ContentTreeFilter;
    var path:String;
    var item:Shelf;
    public function view() {

        var showItem = (filter != null && filter.filterAccess >= item.access);
        var cssClass = showItem ? '.open' : '.protected';

        var books = (this.item.books != null) ? this.item.books : [];
        // var anchor = m('a', {href:this.path, oncreate: M.routeLink }, 'Shelf ' + item.title + ':'  + item.id + ' access:' + item.access);

        var objPath = ContentTreeView.parsePath(this.path);
        var itemPath = '/' +['shelf', objPath.treeId, objPath.roomId, objPath.shelfId].join('/');
        var anchor = m('a', {href:itemPath, oncreate: M.routeLink }, 'Shelf:' + this.item.title + ':' + itemPath);

        return m('details[open].$cssClass', [m('summary',[anchor])].concat(books.map(child-> cast new UIBook(child, this.path, this.filter).view() )) );
    }
}

class UIBook implements Mithril {
    public function new(item:Book, parentPath:String, filter:ContentTreeFilter) {
        this.item = item;
        this.path = parentPath + '/' + item.id;
        this.filter = filter;
    }
    var filter:ContentTreeFilter;
    var path:String;
    var item:Book = null;
    public function view() {

        var showItem = (filter != null && filter.filterAccess >= item.access);
        var cssClass = showItem ? '.open' : '.protected';

        var chapters = (this.item.chapters != null) ? this.item.chapters : [];
        // var anchor = m('a', {href:this.path, oncreate: M.routeLink }, 'Book ' + item.title + ':'  + item.id + ' access:' + item.access);
        
        var objPath = ContentTreeView.parsePath(this.path);
        var itemPath = '/' +['book', objPath.treeId, objPath.roomId, objPath.shelfId, objPath.bookId].join('/');
        var anchor = m('a', {href:itemPath, oncreate: M.routeLink }, 'Book:' + this.item.title + ':' + itemPath);
        
        
        return m('details[open].$cssClass', [m('summary', [anchor])].concat(chapters.map(child-> cast new UIChapter(child, this.path, this.filter).view() )) );
    }
}

class UIChapter implements Mithril {
    public function new(item:Chapter, parentPath:String, filter:ContentTreeFilter) {
        this.item = item;
        this.path = parentPath + '/' + item.id;
        this.filter = filter;
    }
    var filter:ContentTreeFilter;
    var path:String;
    var item:Chapter = null;
    public function view() {

        var showItem = (filter != null && filter.filterAccess >= item.access);
        var cssClass = showItem ? '.open' : '.protected';

        var chapters = (this.item.chapters != null) ? this.item.chapters : [];
        // var anchor = m('a', {href:this.path, oncreate: M.routeLink }, 'Chapter ' + item.title + ':'  + item.id + ' access:' + item.access);
        
        var objPath = ContentTreeView.parsePath(this.path);
        var itemPath = '/' +['chapter', objPath.treeId, objPath.roomId, objPath.shelfId, objPath.bookId, objPath.chapterId].join('/');
        var anchor = m('a', {href:itemPath, oncreate: M.routeLink }, 'Chapter:' + this.item.title + ':' + itemPath);
        
        return m('details[open]$cssClass', [m('summary', [anchor])].concat(chapters.map(child-> cast new UISubchapter(child, this.path, this.filter).view() )) );
    }
}

class UISubchapter implements Mithril {
    public function new(item:Chapter, parentPath:String, filter:ContentTreeFilter) {
        this.item = item;
        this.path = parentPath + '/' + item.id;
        this.filter = filter;
    }
    var filter:ContentTreeFilter;
    var path:String;
    var item:Chapter = null;
    public function view() {

        var showItem = (filter != null && filter.filterAccess >= item.access);
        var cssClass = showItem ? '.open' : '.protected';

        var chapters = (this.item.chapters != null) ? this.item.chapters : [];
        // var anchor = m('a', {href:this.path, oncreate: M.routeLink }, 'Chapter ' + item.title + ':'  + item.id + ' access:' + item.access);
        
        var objPath = ContentTreeView.parsePath(this.path);
        var itemPath = '/' +['subchapter', objPath.treeId, objPath.roomId, objPath.shelfId, objPath.bookId, objPath.chapterId, objPath.subchapterId].join('/');
        var anchor = m('a', {href:itemPath, oncreate: M.routeLink }, 'Subhapter:' + this.item.title + ':' + itemPath);
               
        
        return m('details[open]$cssClass', [m('summary', [anchor])].concat(chapters.map(child-> cast new UIChapter(child, this.path, this.filter).view() )) );
    }
}