package ui.content;

import model.ErrorsAndLogs;
import model.ContentTreeModel;
import model.UserModel;
import mithril.M;

using model.ContentTreeModel.ContentTreeFilters;

using cx.ArrayTools;

class ContentItemView implements Mithril {
    public function new() { //(state:T) {
        // this.state = state;
    }
        
    public function view() {
        return switch model.ContentItemModel.instance.contentItem {
            case Loading: 
                m('h1', 'Loading content');
            case BlaBla:
                m('h1', 'BlaBla');
            case HomeType:
                var ct:ContentTree = ContentTreeModel.instance.contentTree.getData();
                var homeRoom:Room = ContentTreeModel.instance.contentTree.getData().filterHomeRoom();
                cast new RoomView(homeRoom).view();
                
            case RoomType(ref):
                var item:Room = ContentTreeModel.instance.contentTree.getData().filterRoom(ref.roomId);
                cast new RoomView(item).view();

            case ShelfType(ref):
                 var item:Shelf = ContentTreeModel.instance.contentTree.getData().filterRoom(ref.roomId).filterShelf(ref.shelfId);
                 cast new ShelfView(item).view(); 

            case BookType(ref):
                 var item:Book = ContentTreeModel.instance.contentTree.getData().filterRoom(ref.roomId).filterShelf(ref.shelfId).filterBook(ref.bookId);
                 cast new BookView(item).view();   
            
            case ChapterType(ref):
                 var item:Chapter = ContentTreeModel.instance.contentTree.getData().filterRoom(ref.roomId).filterShelf(ref.shelfId).filterBook(ref.bookId).filterChapter(ref.chapterId);
                 cast new ChapterView(item).view();    

            case SubchapterType(ref):
                var item:Chapter = ContentTreeModel.instance.contentTree.getData().filterRoom(ref.roomId).filterShelf(ref.shelfId).filterBook(ref.bookId).filterChapter(ref.chapterId).filterSubchapter(ref.shelfId);
                cast new ChapterView(item).view();                     
            
            case _:
                m('div', 'Unimplemented contentItem view ' + model.ContentItemModel.instance.contentItem);    
            }
    }
}

class RoomView implements Mithril {
    public function new(item:Room) { //(state:T) {
        this.item = item;
    }
    var item:Room;
    
    public function view() {
        return m('div', [
            m('h1', 'Room' ),
            m('div', '' + this.item),
        ]);
    }
    
}

class ShelfView implements Mithril {
    public function new(item:Shelf) { //(state:T) {
        this.item = item;
    }
    var item:Shelf;
    
    public function view() {
        return m('div', [
            m('h1', 'Shelf' ),
            m('div', '' + this.item),
        ]);
    }
}

class BookView implements Mithril {
    public function new(item:Book) { //(state:T) {
        this.item = item;
    }
    var item:Book;
    
    public function view() {
        return m('div', [
            m('h1', 'Book' ),
            m('div', '' + this.item),
        ]);
    }
}

class ChapterView implements Mithril {
    public function new(item:Chapter) { //(state:T) {
        this.item = item;
    }
    var item:Chapter;
    
    public function view() {
        return m('div', [
            m('h1', 'Chapter' ),
            m('div', '' + this.item),
        ]);
    }
}

class SubchapterView implements Mithril {
    public function new(item:Chapter) { //(state:T) {
        this.item = item;
    }
    var item:Chapter;
    
    public function view() {
        return m('div', [
            m('h1', 'Subchapter' ),
            m('div', '' + this.item),
        ]);
    }
}