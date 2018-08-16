package data;

import data.PagesModel;
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
        PagesModel.instance.setPageFromContentRef(ref);
        M.redraw();
    }

    public function getRoom():Room {
        return try {
            ContentModel.instance.content.rooms.filter(room->room.id == this.filterContent.roomId).first();
        } catch (e:Dynamic) {
            // trace('FilterModel.getRoom(): Cant not get room with ref ' + this.filterContent);
            // ErrorsAndLogs.addLog('Fallback to first room - cant show room with ref ' + this.filterContent);
            ContentModel.instance.content.rooms.first();
        }
    }

    // public function getRoomShelvesExceptHomeshelf():Array<Shelf> {
    //     return try {
    //         this.getRoom().shelves.getShelvesExcludeType(Homepage);
    //     } catch (e:Dynamic) {
    //         trace('FilterModel.getRoomShelvesExceptHomeshelf(): Cant not get shelves of room with ref ' + this.filterContent);
    //         [];        
    //     }
    // }    

    public function getShelves():Array<Shelf> {
        return try {
            var shelves = this.getRoom().shelves;
            // trace(shelves.length);
            if (this.filterContent != null && this.filterContent.shelfId != null) {
                // trace('filter to ' + this.filterContent.shelfId);
                shelves = shelves.filter(shelf->shelf.id == this.filterContent.shelfId);
            }
            // trace(shelves.length);
            shelves;

        } catch (e:Dynamic) {
            trace('FilterModel.getShelves(): Cant not get shelves of room with ref ' + this.filterContent);
            [];
        }
    }

    public function getShelf():Shelf {
        return try {
            getRoom().shelves.filter(shelf->shelf.id == this.filterContent.shelfId).first();
        } catch (e:Dynamic) {
            trace('FilterModel.getShelf(): Cant not get shelf with ref ' + this.filterContent);
            null;
        }
    }

    public function getBook():Book {
        return try {
            getShelf().books.filter(book->book.id == this.filterContent.bookId).first();
        } catch (e:Dynamic) {
            trace('FilterModel.getBook(): Cant not get book with ref ' + this.filterContent);
            null;            
        }
    }

    public function getChapters():Array<Chapter> {
        return try {
            getBook().chapters;
        } catch (e:Dynamic) {
            trace('FilterModel.getChapters(): Cant not get chapters of book with ref ' + this.filterContent);
            null;
        }
    }

    public function getChapter():Chapter {
        return try {
            if (this.filterContent.chapterId != null) {
                getChapters().filter(chapter->chapter.id == this.filterContent.chapterId).first();
            } else {
                trace('Fallback to first chapter');
                getChapters().first();
            }
        } catch (e:Dynamic) {
            trace('FilterModel.getChapter(): Cant not get chapters of book with ref' + this.filterContent);
            null;
        }
    }

     public function getSubchapters():Array<Chapter> {
        return try {
            getChapter().subchapters;
        } catch (e:Dynamic) {
            trace('FilterModel.getSubchapters(): Cant not get subchapters of chapter with ref' + this.filterContent);
            null;
        }
    }

    public function getSubchapter():Chapter {
        return try {
            if (this.filterContent.subchapterId != null) {
                getSubchapters().filter(sub->sub.id == this.filterContent.subchapterId).first();
            } else {
                trace('Fallback to first subchapter');
                getSubchapters().first();
            }
        } catch (e:Dynamic) {
            trace('FilterModel.getSubchapter(): Cant not get subchapter of chapter with ref' + this.filterContent);
            null;
        }
    }   
}

class FilterTools {



    static public function getShelvesOfType(shelves:Array<Shelf>, type:data.Content.Shelftype) {
        return shelves.filter(shelf->shelf.type == type);         
    }

    static public function getShelvesExcludeType(shelves:Array<Shelf>, type:data.Content.Shelftype) {
        return shelves.filter(shelf->shelf.type != type);         
    }

 



}