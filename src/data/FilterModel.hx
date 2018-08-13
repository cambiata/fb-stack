package data;

import data.Content;
import mithril.M;

using cx.ArrayTools;
using FilterModel.FilterTools;

class FilterModel {
    public static var instance(default, null):FilterModel = new FilterModel();
    
    private function new () {}  // private constructor

    public var filterContent(default, null):ContentRef;
    public function setFilterContent(ref:ContentRef) {
        this.filterContent = ref;
        trace(this.filterContent);
        M.redraw();
    }

    public function getRoom():Room {
        return try {
            ContentModel.instance.content.rooms.filter(room->room.id == this.filterContent.roomId).first();
        } catch (e:Dynamic) {
            // ErrorsAndLogs.addError('FilterModel.getRoom(): Cant not get room with ref ' + this.filterContent);
            // ErrorsAndLogs.addLog('Fallback to first room - cant show room with ref ' + this.filterContent);
            ContentModel.instance.content.rooms.first();
        }
    }

    public function getRoomHomeshelf():Shelf {
        return try {
            this.getRoom().shelves.getShelvesOfType(Homepage).first();
        } catch (e:Dynamic) {
            ErrorsAndLogs.addError('FilterModel.getRoomHomeShelf(): Cant not get home shelf of room with ref ' + this.filterContent);
            null;        
        }
    }

    public function getRoomShelvesExceptHomeshelf():Array<Shelf> {
        return try {
            this.getRoom().shelves.getShelvesExcludeType(Homepage);
        } catch (e:Dynamic) {
            ErrorsAndLogs.addError('FilterModel.getRoomShelvesExceptHomeshelf(): Cant not get shelves of room with ref ' + this.filterContent);
            [];        
        }
    }    

    public function getShelves():Array<Shelf> {
        return try {
            var shelves = this.getRoomShelvesExceptHomeshelf();
            // trace(shelves.length);
            if (this.filterContent != null && this.filterContent.shelfId != null) {
                // trace('filter to ' + this.filterContent.shelfId);
                shelves = shelves.filter(shelf->shelf.id == this.filterContent.shelfId);
            }
            // trace(shelves.length);
            shelves;

        } catch (e:Dynamic) {
            ErrorsAndLogs.addError('FilterModel.getShelves(): Cant not get shelves of room with ref ' + this.filterContent);
            [];
        }
    }

    public function getShelf():Shelf {
        return try {
            getRoom().shelves.filter(shelf->shelf.id == this.filterContent.shelfId).first();
        } catch (e:Dynamic) {
            // ErrorsAndLogs.addError('FilterModel.getShelf(): Cant not get shelf with ref ' + this.filterContent);
            null;
        }
    }

    public function getBook():Book {
        return try {
            getShelf().books.filter(book->book.id == this.filterContent.bookId).first();
        } catch (e:Dynamic) {
            // ErrorsAndLogs.addError('FilterModel.getBook(): Cant not get book with ref ' + this.filterContent);
            null;            
        }
    }

    public function getChapters():Array<Chapter> {
        return try {
            getBook().chapters;
        } catch (e:Dynamic) {
            ErrorsAndLogs.addError('FilterModel.getChapters(): Cant not get chapters of book with ref ' + this.filterContent);
            null;
        }
    }

    public function getChapter():Chapter {
        return try {
            if (this.filterContent.chapterId != null) {
                getChapters().filter(chapter->chapter.id == this.filterContent.chapterId).first();
            } else {
                // ErrorsAndLogs.addLog('Fallback to first chapter');
                getChapters().first();
            }
        } catch (e:Dynamic) {
            ErrorsAndLogs.addError('FilterModel.getChapter(): Cant not get chapters of book with ref' + this.filterContent);
            null;
        }
    }

     public function getSubchapters():Array<Chapter> {
        return try {
            getChapter().subchapters;
        } catch (e:Dynamic) {
            ErrorsAndLogs.addError('FilterModel.getSubchapters(): Cant not get subchapters of chapter with ref' + this.filterContent);
            null;
        }
    }

    public function getSubchapter():Chapter {
        return try {
            if (this.filterContent.subchapterId != null) {
                getSubchapters().filter(sub->sub.id == this.filterContent.subchapterId).first();
            } else {
                // ErrorsAndLogs.addLog('Fallback to first subchapter');
                getSubchapters().first();
            }
        } catch (e:Dynamic) {
            ErrorsAndLogs.addError('FilterModel.getSubchapter(): Cant not get subchapter of chapter with ref' + this.filterContent);
            null;
        }
    }   




    // // Room -----------------------------------------------

    // public var filterRoom(default, null):RoomRef = {treeId: null, roomId: null};
    // function _setRoom(ref:RoomRef) {
    //     this.filterRoom = ref;
    // }
    // public function setFilterRoom(ref:RoomRef) {
    //     _setRoom(ref);
    //     this.filterShelf = null;
    //     this.filterBook = null;
    //     this.filterChapter = null;
    //     this.filterSubchapter = null; 
    //     M.redraw();
    // }

    // // Shelf -----------------------------------------------

    // public var filterShelf(default,null):ShelfRef = null;
    // function _setShelf(ref:ShelfRef) {
    //     _setRoom(cast ref);
    //     this.filterShelf = ref;
    // }
    // public function setFilterShelf(ref:ShelfRef) {
    //     _setShelf(ref);
    //     M.redraw();
    // }

    // // Book -----------------------------------------------
    
    // public var filterBook(default,null):BookRef = null;
    // function _setBook(ref:BookRef) {
    //     _setShelf(cast ref);
    //     this.filterBook = ref;
    // }
    // public function setFilterBook(ref:BookRef) {
    //     _setBook(ref);
    //     M.redraw();
    // }    

    // // Chapters -----------------------------------------------
    
    // public var filterChapter(default,null):ChapterRef = null;
    // function _setChapter(ref:ChapterRef) {
    //     _setBook(cast ref);
    //     this.filterChapter = ref;
    // }
    // public function setFilterChapter(ref:ChapterRef) {
    //     _setChapter(ref);
    //     M.redraw();
    // }

    // // Subchapters -----------------------------------------------

    // public var filterSubchapter(default,null):SubchapterRef = null;
    // function _setSubchpater(ref:SubchapterRef) {
    //     _setChapter(cast ref);
    //     this.filterSubchapter = ref;
    // }
    // public function setFilterSubchapter(ref:SubchapterRef) {
    //     _setSubchpater(ref);
    //     M.redraw();
    // }    

    // public function getContent():Content {
    //     return ContentModel.instance.content;
    // }

    // public function getRoom():Room {
    //     try {
    //         return getContent().rooms.filter(room->room.id == filterRoom.roomId).first();
    //     } catch (e:Dynamic) {
    //         ErrorsAndLogs.addError('Can not find room with id from filterRoomRef: ' + filterRoom + ' $e');
    //     }
    //     return getContent().rooms.first();
    // }

    // public function getHomeroom():Room {
    //     return getRoom().fallbackRoomIfNull();
    // }

    // public function getFilteredShelves():Array<Shelf> {
    //     return this.filterShelf != null ? getHomeroom().shelves.filter(shelf->shelf.id == this.filterShelf.shelfId) : getHomeroom().shelves;
    // }

    // public function getBook():Book {
    //     return try {
    //         getHomeroom().shelves.filter(shelf->shelf.id == this.filterBook.shelfId).first().books.filter(book->book.id == this.filterBook.bookId).first();
            
    //     } catch (e:Dynamic) {
    //         // ErrorsAndLogs.addError('Can not find book for filter ' + this.filterBook);
    //         null;
    //     } 
    // }

    // public function getChapter():Chapter {
    //     return try {
    //         try {
    //             getBook().chapters.filter(chapter->chapter.id == this.filterChapter.chapterId).first();
    //         } catch (e:Dynamic) {
    //             getBook().chapters.first();
    //         }
    //     } catch (e:Dynamic) {
    //         // ErrorsAndLogs.addError('Can not find chapter for filter ' + this.filterChapter);
    //         null;
    //     }
    // } 

    // public function getSubchapter():Chapter {
    //      return try {
    //         try {
    //             getChapter().subchapters.filter(sub->sub.id == this.filterSubchapter.subchapterId).first();
    //         } catch (e:Dynamic) {
    //             getChapter().subchapters.first();
    //         }
    //     } catch (e:Dynamic) {
    //         // ErrorsAndLogs.addError('Can not find subchapter for filter ' + this.filterSubchapter);
    //         null;
    //     }       
    // }

}

class FilterTools {

    // static public function fallbackRoomIfNull(room:Room):Room {
    //     return room == null ? {
    //         // ErrorsAndLogs.addLog('Fallback to first room');
    //         ContentModel.instance.content.rooms.first();
    //     } : room;
    // }

    static public function getShelvesOfType(shelves:Array<Shelf>, type:data.Content.Shelftype) {
        return shelves.filter(shelf->shelf.type == type);         
    }

    static public function getShelvesExcludeType(shelves:Array<Shelf>, type:data.Content.Shelftype) {
        return shelves.filter(shelf->shelf.type != type);         
    }

    
    // static public inline function shelf2Room(ref:ShelfRef):RoomRef return {treeId:ref.treeId, roomId:ref.roomId};
    // static public inline function book2shelf(ref:BookRef):ShelfRef return {treeId:ref.treeId, roomId:ref.roomId, shelfId:ref.shelfId};
    // static public inline function chapter2book(ref:ChapterRef):BookRef return {treeId:ref.treeId, roomId:ref.roomId, shelfId:ref.shelfId, bookId:ref.bookId};
    // static public inline function subchapter2chapter(ref:SubchapterRef):ChapterRef return {treeId:ref.treeId, roomId:ref.roomId, shelfId:ref.shelfId, bookId:ref.bookId, chapterId:ref.chapterId};



}