package model;

import firebase.EventType;
import firebase.Firebase;
import Client;
import mithril.M;
import utils.*;
using haxe.Json;
using dataclass.JsonConverter;
using cx.ArrayTools;
using model.ContentTreeModel.ContentTreeFilters;


class ContentTreeModel {
    
    public static var instance(default, null):ContentTreeModel = new ContentTreeModel();
    public static var starttime = Date.now().getTime();
    private function new () {}  // private constructor

    public function init() {
        this.contentTree = Data(ContentTree.fromJson(defaultData()));
    }

    public function load() {
        ApiCalls.getRequest('/api/content-tree')
        .then(item->{
            ErrorsAndLogs.addErrors(item.errors);
            this.contentTree = new ContentTree(item.data);
            ErrorsAndLogs.addLog('Content-tree loaded ' + Profile.instance.msString());
        })
        .catchError(error->{
            ErrorsAndLogs.addError('Content-tree error: $error');
        });
    }

    public function loadRealtimeUpdate() {
        
        Firebase.database().ref('content-tree').on(EventType.Value, (snap, str)->{
            try {
                ErrorsAndLogs.addLog('Realtime content loaded!' + Profile.instance.msString());
                this.contentTree = new ContentTree(snap.val());
            } catch (e:Dynamic) {
                ErrorsAndLogs.addError('Could not insantiate contentTree from loaded Realtime data');
                return null;
            }
        });
    }

    public var contentTree(default, set):DataMode<ContentTree> =  Nil; //Data(defaultData());
    function set_contentTree(u:DataMode<ContentTree>) {
        this.contentTree = u;
        // ErrorsAndLogs.addLog('ContentTree:' + this.contentTree);
        M.redraw();
        return u;
    }

    static public function defaultData():Dynamic {
        var json =  {
            id: 'startup',
            rooms: [ 
                {
                    id: 'startup-room',
                    shelves: [],
                },
            ]
        }
        return json;

    }


    public function test() {

        try {
            var ct:ContentTree = ContentTree.fromJson(defaultData());
            this.contentTree = Data(ct);
        } catch (e:Dynamic) {
            ErrorsAndLogs.addError(e);
        }

    }
}

class ContentTreeFilters {

    static public function filterHomeRoom(contentTree:ContentTree): Room {
        var user:model.UserModel.CurrentUser = UserModel.instance.currentUser.getData();
        var contentTree:ContentTree = ContentTreeModel.instance.contentTree.getData();
        var room:Room = user != null ? 
            contentTree.filterRoom(user.userConfig.domain) :
            contentTree.rooms.first();  

        if (user != null && room == null) {
            ErrorsAndLogs.addError('ContentTreeFilters::filterHomeRoom() - Can not filter to user\'s domain room ' + user.userConfig.domain);
            contentTree.rooms.first();
        }     
          
        return room;
    }


    static public function filterRoom(contentTree:ContentTree, roomId:String): Room {
        return contentTree.rooms.filter(room -> room.id == roomId).first();
    }

    static public function filterShelf(room:Room, shelfId):Shelf {
        return room.shelves.filter(shelf -> shelf.id == shelfId).first();
    }

    static public function filterBook(shelf:Shelf, bookId):Book {
        return shelf.books.filter(book -> book.id == bookId).first();
    }

    static public function filterChapter(book:Book, chapterId):Chapter {
        return book.chapters.filter(chapter -> chapter.id == chapterId).first();
    }

    static public function filterSubchapter(chapter:Chapter, subchapterId):Chapter {
        return chapter.chapters.filter(chapter -> chapter.id == subchapterId).first();
    }


}








class ContentTree implements DataClass {
    public var    id:String; 
    public var    rooms:Array<Room> = [];
    static public function populate(id:String = null, rms:Array<Room>=null) {
        id = (id == null) ? 'contentTree' + uid++ : id;
        return new ContentTree({id:id, rooms:rms});        
    }
    static var uid = 1;

    public function copy() return new ContentTree({id:this.id, rooms:this.rooms});
}

class Room implements DataClass {
    public var      id:String;    
    public var      shelves:Array<Shelf> = [];
    public var      title:String = 'room-title';
    public var      color:String = 'yellow';
    public var      textcolor:String = 'black';
    static public function populate(id:String, shelves:Array<Shelf>) return new Room({id:id, shelves:shelves});
}

class Shelf implements DataClass {
    public var    id:String;
    public var    title:String;
    public var    access:Int;
    public var    info:String; 
    public var    books:Array<Book> = [];

    static public function populate(id:String, books:Array<Book>) return new Shelf({id:id, title:'Book $id', access:123, info:'Information om $id', books:books});
}

enum Booktype {
    Standard;
    Lexicon;
}

class Book implements DataClass {
    public var    id:String;
    public var    title:String;
    public var    access:Int;
    public var    type:Booktype; 
    public var    info:String; 
    public var    chapters:Array<Chapter> = [];
    static public function populate(id:String, chapters:Array<Chapter>) return new Book({id:id, title:'Book $id', access:123, type:Standard, info:'Information om $id', chapters:chapters});
}

enum Chaptertype {
    Info;
    Article;
    Video;
    Exercise;
}

class Chapter implements DataClass {
    public var    id:String;
    public var    title:String;
    public var    access:Int;
    public var    type:Chaptertype; 
    public var    info:String; 
    public var    text:String; 
    public var    chapters:Array<Chapter> = [];
    static public function populateInfo(id:String) return new Chapter({id:id, title:'Chapter $id', access:123, type:Info, info:'Information om $id', text:'text i $id'});
    static public function populateArticle(id:String, chapters:Array<Chapter>) return new Chapter({id:id, title:'Chapter $id', access:123, type:Article, info:'Information om $id', text:'text i $id', chapters:chapters});
}



// class CTBook implements IContentTreeNode {
//     public var title:String = 'Book title';
// }


// interface IContentTreeNode implements DataClass {
//     public var children:Array<IContentTreeNode>;
// }

typedef TreeRef = {treeId:String}
typedef RoomRef = {> TreeRef, roomId:String}
typedef ShelfRef = {> RoomRef, shelfId:String}
typedef BookRef = {> ShelfRef, bookId:String}
typedef ChapterRef = {> BookRef, chapterId:String}
typedef SubchapterRef = {> ChapterRef, subchapterId:String};