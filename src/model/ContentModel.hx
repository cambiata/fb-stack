package model;

import firebase.EventType;
import firebase.Firebase;
import Client;
import mithril.M;
import utils.*;
using haxe.Json;
using dataclass.JsonConverter;
using cx.ArrayTools;

class ContentModel {
    public static var instance(default, null):ContentModel = new ContentModel();
    public static var starttime = Date.now().getTime();

    private function new () {}  // private constructor


    public function init() {
        this.contentTree = Loading;
        ApiCalls.getRequest('/api/content-tree')
        .then(item->{
            ErrorsAndLogs.addErrors(item.errors);
            this.contentTree = new ContentTree(item.data);
            ErrorsAndLogs.addLog('Content-tree loaded: ' + item.data + Profile.instance.msString());
        })
        .catchError(error->{
            ErrorsAndLogs.addError('Content-tree error: $error');
        });

        
    }

    public function initRealtimeUpdate() {
        this.contentTree = Loading;
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

    public var contentTree(default, set):DataMode<ContentTree> = Nil;
    function set_contentTree(u:DataMode<ContentTree>) {
        this.contentTree = u;
        // ErrorsAndLogs.addLog('ContentTree:' + this.contentTree);
        M.redraw();
        return u;
    }

}

class ContentTree implements DataClass {
    public var    id:String; 
    public var    children:Array<Room> = [];
    static public function populate(id:String = null, rms:Array<Room>=null) {
        id = (id == null) ? 'contentTree' + uid++ : id;
        return new ContentTree({id:id, children:rms});        
    }
    static var uid = 1;

    public function copy() return new ContentTree({id:this.id, children:this.children});
}


class Room implements DataClass {
    public var    id:String;    
    public var    children:Array<Shelf> = [];
    static public function populate(id:String, shvs:Array<Shelf>) return new Room({id:id, children:shvs});
}


class Shelf implements DataClass {
    public var    id:String;
    public var    title:String;
    public var    access:Int;
    public var    info:String; 
    public var    children:Array<Book> = [];

    static public function populate(id:String, bks:Array<Book>) return new Shelf({id:id, title:'Book $id', access:123, info:'Information om $id', children:bks});
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
    public var    children:Array<Chapter> = [];
    static public function populate(id:String, chs:Array<Chapter>) return new Book({id:id, title:'Book $id', access:123, type:Standard, info:'Information om $id', children:chs});
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
    public var    children:Array<Chapter> = [];
    static public function populateInfo(id:String) return new Chapter({id:id, title:'Chapter $id', access:123, type:Info, info:'Information om $id', text:'text i $id'});
    static public function populateArticle(id:String, chs:Array<Chapter>) return new Chapter({id:id, title:'Chapter $id', access:123, type:Article, info:'Information om $id', text:'text i $id', children:chs});
}



// class CTBook implements IContentTreeNode {
//     public var title:String = 'Book title';
// }


// interface IContentTreeNode implements DataClass {
//     public var children:Array<IContentTreeNode>;
// }
