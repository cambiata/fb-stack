package data;

import haxe.crypto.Adler32;
using dataclass.JsonConverter;
using cx.ArrayTools;
using Lambda;

class Content implements DataClass {
    public var    id:String; 
    public var    rooms:Array<Room> = [];
    static public function populate(id:String = null, rms:Array<Room>=null) {
        id = (id == null) ? 'content' + uid++ : id;
        return new Content({id:id, rooms:rms});        
    }
    static var uid = 1;
    public function copy() return new Content({id:this.id, rooms:this.rooms});
}

class Room implements DataClass {
    public var      id:String = 'defaultRoomId';    
    public var      shelves:Array<Shelf> = [];
    public var      title:String = 'defaultRoomTitle';
    public var      color:String = 'yellow';
    public var      textcolor:String = 'black';
    public var      sort:Int = 0;
}

class Shelf implements DataClass {
    public var    id:String = 'defaultShelfId';
    public var    title:String = 'defaultShelfTitle';
    public var    access:Int = 0;
    public var    info:String = 'defaultShelfInfo';
    public var    books:Array<Book> = [];
    public var    sort:Int = 0;
}

enum abstract Booktype(String) {
    var Standard = 'standard';
    var Lexicon = 'lexicon';
}

class Book implements DataClass {
    public var    id:String = 'defaultBookId';
    public var    title:String = 'defaultBookTitle';
    public var    access:Int = 0;
    public var    type:Booktype = Standard;
    public var    info:String = 'defaultBookInfo';
    public var    chapters:Array<Chapter> = [];
    public var    sort:Int = 0;
    static public function populate(id:String, chapters:Array<Chapter>) return new Book({id:id, title:'Book $id', access:123, type:Standard, info:'Information om $id', chapters:chapters});
}

enum abstract Chaptertype(String) {
    var Info = 'info';
    var Article = 'article';
    var Video = 'video';
    var Exercise = 'exercise';
}

class Chapter implements DataClass {
    public var    id:String = 'defaultChapterId';
    public var    title:String = 'defaultChapterTitle';
    public var    access:Int = 0;
    public var    type:Chaptertype = Article;
    public var    info:String = 'defaultChapterInfo';
    public var    text:String = 'defaultChapterText';
    public var    subchapters:Array<Chapter> = [];
    public var    sort:Int = 0;
}

typedef TreeRef = {treeId:String}
typedef RoomRef = {> TreeRef, roomId:String}
typedef ShelfRef = {> RoomRef, shelfId:String}
typedef BookRef = {> ShelfRef, bookId:String}
typedef ChapterRef = {> BookRef, chapterId:String}
typedef SubchapterRef = {> ChapterRef, subchapterId:String};

class ContentFilters {

    static public function filterRoom(ct:Content, roomId:String) {
        return new Content({id:ct.id, rooms:ct.rooms.filter(room->room.id == roomId) });
    }

    static public function fiterRoomAndShelfHome(ct:Content) {
        return new Content({id:ct.id, rooms:ct.rooms.filter(room->room.id == 'home').map(room->{
            new Room({id:room.id, title:room.title, shelves:room.shelves.filter(shelf->{
                trace(shelf.id);
                shelf.id == 'home';
            })});
        })});   
    }

    static public function filterAccess(ct:Content, access:Int=0) {
        return new Content({id:ct.id, rooms:ct.rooms.map(room->{
            new Room({id:room.id, shelves:room.shelves.filter(shelf->shelf.access <= access).map(shelf->{
                new Shelf({id:shelf.id, title:shelf.title, info:'' + shelf.info, access:shelf.access, books:shelf.books.filter(book-> book.access <= access).map(book->{
                    new Book({id:book.id, title:book.title, access:book.access, type:book.type, info:'' + book.info, chapters:book.chapters.filter(chapter->chapter.access <= access).map(chapter->{
                        new Chapter({id:chapter.id, title:chapter.title, access:chapter.access, type:chapter.type, info:chapter.info, text:chapter.text, subchapters:chapter.subchapters.filter(s->s.access <= access)});
                    })});
                })});
            })});
        })});
    }

    static public function sort(ct:Content):Content {
        ct.rooms.sortA((a,b)->a.sort - b.sort).iter(room->room.shelves.sortA((a,b)->a.sort-b.sort).iter(shelf->shelf.books.sortA((a,b)->a.sort-b.sort)));
        return ct;
    }


}

