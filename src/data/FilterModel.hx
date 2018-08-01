package data;

import data.Content;
import mithril.M;

using cx.ArrayTools;
using FilterModel.FilterTools;

class FilterModel {
    public static var instance(default, null):FilterModel = new FilterModel();
    


    private function new () {}  // private constructor

    public var filterRoom:RoomRef = {treeId: null, roomId: null};
    public function setFilterRoom(ref:RoomRef) {
        this.filterRoom = ref;
        this.filterShelf = null;
        this.filterBook = null;
        this.filterChapter = null;
        this.filterSubchapter = null; 
        M.redraw();
    }


    public var filterShelf:ShelfRef = null;
    public function setFilterShelf(ref:ShelfRef) {
        this.filterShelf = ref;
        M.redraw();
    }

    public var filterBook:BookRef = null;
    public function setFilterBook(ref:BookRef) {
        this.filterBook = ref;
        M.redraw();
    }    

    public var filterChapter:ChapterRef = null;
    public function setFilterChapter(ref:ChapterRef) {
        this.filterSubchapter = null;
        this.filterChapter = ref;
        this.filterBook = {treeId:ref.treeId, roomId:ref.roomId, shelfId:ref.shelfId, bookId:ref.bookId};
        M.redraw();
    }

    public var filterSubchapter:SubchapterRef = null;
    public function setFilterSubchapter(ref:SubchapterRef) {
        this.filterSubchapter = ref;
        this.filterBook = {treeId:ref.treeId, roomId:ref.roomId, shelfId:ref.shelfId, bookId:ref.bookId};
        this.filterChapter = {treeId:ref.treeId, roomId:ref.roomId, shelfId:ref.shelfId, bookId:ref.bookId, chapterId: ref.chapterId};
        M.redraw();
    }    

    public function getContent():Content {
        return ContentModel.instance.content;
    }

    public function getRoom():Room {
        try {
            return getContent().rooms.filter(room->room.id == filterRoom.roomId).first();
        } catch (e:Dynamic) {
            ErrorsAndLogs.addError('Can not find room with id from filterRoomRef: ' + filterRoom + ' $e');
        }
        return getContent().rooms.first();
    }

    public function getHomeroom():Room {
        return getRoom().fallbackRoomIfNull();
    }

    public function getFilteredShelves():Array<Shelf> {
        return this.filterShelf != null ? getHomeroom().shelves.filter(shelf->shelf.id == this.filterShelf.shelfId) : getHomeroom().shelves;
    }

    public function getBook():Book {
        return try {
            getHomeroom().shelves.filter(shelf->shelf.id == this.filterBook.shelfId).first().books.filter(book->book.id == this.filterBook.bookId).first();
            
        } catch (e:Dynamic) {
            // ErrorsAndLogs.addError('Can not find book for filter ' + this.filterBook);
            null;
        } 
    }

    public function getChapter():Chapter {
        return try {
            try {
                getBook().chapters.filter(chapter->chapter.id == this.filterChapter.chapterId).first();
            } catch (e:Dynamic) {
                getBook().chapters.first();
            }
        } catch (e:Dynamic) {
            // ErrorsAndLogs.addError('Can not find chapter for filter ' + this.filterChapter);
            null;
        }
    } 

    public function getSubchapter():Chapter {
         return try {
            try {
                getChapter().subchapters.filter(sub->sub.id == this.filterSubchapter.subchapterId).first();
            } catch (e:Dynamic) {
                getChapter().subchapters.first();
            }
        } catch (e:Dynamic) {
            // ErrorsAndLogs.addError('Can not find subchapter for filter ' + this.filterSubchapter);
            null;
        }       
    }

}

class FilterTools {

    static public function fallbackRoomIfNull(room:Room):Room {
        return room == null ? {
            // ErrorsAndLogs.addLog('Fallback to first room');
            ContentModel.instance.content.rooms.first();
        } : room;
    }

    static public function getShelvesOfType(shelves:Array<Shelf>, type:data.Content.Shelftype) {
        return shelves.filter(shelf->shelf.type == type);         
    }

    static public function getShelvesExcludeType(shelves:Array<Shelf>, type:data.Content.Shelftype) {
        return shelves.filter(shelf->shelf.type != type);         
    }

    

}