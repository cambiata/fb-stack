package data;

import haxe.DynamicAccess;
import haxe.crypto.Adler32;
using dataclass.JsonConverter;
using cx.ArrayTools;
using Lambda;

class Content implements DataClass {
    public var    id:String; 
    public var    rooms:Array<Room> = [];
    @exclude public var path:String = '';
    @exclude public var dbpath:String = 'content-tree';
}

class Room implements DataClass {
    public var      id:String = 'defaultRoomId';    
    public var      shelves:Array<Shelf> = [];
    public var      title:String = 'defaultRoomTitle';
    public var      sort:Int = 0;
    public var      home:Home = null;
    
    @exclude public var path:String = '';
    @exclude public var dbpath:String = '';
}

class Home implements DataClass {
    public var      title: String = 'Titel för hemsidan';
    public var      sections:Array<IHomeSection> = [];
}


interface IHomeSection extends DataClass {
    var     title(default, set):String;
    var     sort(default, set):Int; 
}

class SectionShelves implements IHomeSection {
    public var title:String = 'Shelves section';
    public var sort:Int = 200;
}

class SectionCells implements IHomeSection {
    public var title:String = ''; // only shown if not empty string
    public var sort:Int = 100;    
    public var cells:Array<IHomeCell> = [];
}

interface IHomeCell extends DataClass {
    var     title(default, set):String;
    var     sort(default, set):Int; 
    var     color(default, set):String;
    var     bgcolor(default, set):String;    
    var     text(default, set):String;
    var     bgimage(default, set):String;
    var     image(default, set):String;
    var     url(default, set): String;
}

class TextCell implements IHomeCell {
    public var     title:String = 'Cell Title';
    public var     sort:Int = 100;
    public var     gridColumn:String = '';
    public var     gridRow:String = '';
    public var     color:String = 'white';
    public var     text:String = 'Celltext...';
    public var     bgcolor:String = '#666';     
    public var     bgimage:String = '/assets/background/background.jpg';     
    public var     url: String = '';
    public var     image: String = '';
}

class VideoCell implements IHomeCell {
    public var     title:String = 'Cell Title';
    public var     sort:Int = 100;
    public var     gridColumn:String = '';
    public var     gridRow:String = '';
    public var     color:String = 'white';
    public var     text:String = 'Celltext...';
    public var     bgcolor:String = '#666';     
    public var     bgimage:String = '/assets/background/background.jpg';     
    public var     url: String = '';
    public var     image: String = '';
    
    public var     video:String = '/assets/video/tada.mp4';         
}


// class Home
// class DomItem implements DataClass {
//     public var      tag:String = 'div';
//     public var      cls:String = 'home';
//     public var      style:String = '{"color":"white", "background-color":"purple"}';
//     public var      data:String = '';
//     public var      attrs:String = '';

    
//     public var      text:String = 'text...';
//     public var      children:Array<DomItem> = [];
// 	public function vnode() : Dynamic {
//         var vchildren = this.children.map(c->c.vnode());
// 		return { 
// 			tag: this.tag, key: null, attrs: {className:cls, style:haxe.Json.parse(style)}, children: vchildren, text: this.text, 
// 			dom: null, domSize: 0,
// 			state: {}, events: null, instance: null, skip: false			
// 		}
// 	}
// }

class Shelf implements DataClass {
    public var    id:String = 'defaultShelfId';
    public var    title:String = 'defaultShelfTitle';
    public var    access:Int = 0;
    public var    info:String = 'defaultShelfInfo';
    public var    books:Array<Book> = [];
    public var    sort:Int = 0;
    public var    type:String = 'content';
    @exclude public var path:String = '';
    @exclude public var dbpath:String = '';
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
    @exclude public var path:String = '';
    @exclude public var dbpath:String = '';
}

class Chapter implements DataClass
{
    public var    id:String = 'defaultChapterId';
    public var    title:String = 'defaultChapterTitle';
    public var    access:Int = 0;
    public var    info:String = 'defaultChapterInfo';
    public var    text:String = 'defaultChapterText';
    public var    sort:Int = 0;
    public var    subchapters:Array<Chapter> = [];    
    public var    type:IChaptertype = null;

    @exclude public var path:String = '';
    @exclude public var dbpath:String = '';
}

interface IChaptertype extends DataClass {
    // var extratype(default, set):String;
}

class StandardChaptertype implements IChaptertype {
    // public var extratype:String = 'chapter';
}

class VideoChaptertype implements IChaptertype {
    public var url:String = '/url/to/video';
}

class RosettaChaptertype implements IChaptertype {
    public var data:String = '{xyz:123}';
}

class PdfChaptertype implements IChaptertype {
    public var filename:String = '/test.pdf';
}

class PitchChaptertype implements IChaptertype {
    //public var filename:String = '/test.pdf';
}

class ScorxmixerChaptertype implements IChaptertype {
    //public var filename:String = '/test.pdf';
}



typedef ContentRef = {roomId:String, shelfId:String, bookId:String, chapterId:String, subchapterId:String};


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
                        new Chapter({id:chapter.id, title:chapter.title, access:chapter.access, /*type:chapter.type,*/ info:chapter.info, text:chapter.text, subchapters:chapter.subchapters.filter(s->s.access <= access)});
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

