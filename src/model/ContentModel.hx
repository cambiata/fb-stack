package model;

import Client;
using haxe.Json;
using dataclass.JsonConverter;
import mithril.M;

class ContentModel {
    public static var instance(default, null):ContentModel = new ContentModel();
    
    private function new () {}  // private constructor

    public function init() {
        this.contentTree = Loading;
        ApiCalls.getRequest('/api/content-tree')
        .then(item->{
            ErrorsAndLogs.addErrors(item.errors);
            // var rooms:Rooms = new Rooms(item.data);
            this.contentTree = new ContentTree(item.data);
            ErrorsAndLogs.addLog('Content-tree loaded: ' + item.data);
        })
        .catchError(error->{
            ErrorsAndLogs.addError('Content-tree error: $error');
        });
    }

    public var contentTree(default, set):DataMode<ContentTree> = Nil;
    function set_contentTree(u:DataMode<ContentTree>) {
        this.contentTree = u;
        ErrorsAndLogs.addLog('ContentTree:' + this.contentTree);
        M.redraw();
        return u;
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

}


class Room implements DataClass {
    public var    id:String;    
    public var    shelves:Array<Shelf> = [];
    static public function populate(id:String, shvs:Array<Shelf>) return new Room({id:id, shelves:shvs});
}


class Shelf implements DataClass {
    public var    id:String;
    public var    title:String;
    public var    access:Int;
    public var    info:String; 
    public var    books:Array<Book> = [];

    static public function populate(id:String, bks:Array<Book>) return new Shelf({id:id, title:'Book $id', access:123, info:'Information om $id', books:bks});
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
    static public function populate(id:String, chs:Array<Chapter>) return new Book({id:id, title:'Book $id', access:123, type:Standard, info:'Information om $id', chapters:chs});
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
    static public function populateArticle(id:String, chs:Array<Chapter>) return new Chapter({id:id, title:'Chapter $id', access:123, type:Article, info:'Information om $id', text:'text i $id', chapters:chs});
}


