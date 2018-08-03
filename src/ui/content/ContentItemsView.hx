package ui.content;
import data.FilterModel;
import mithril.M;
import data.Content;

class ContentItemsView {
}

class HomeView implements Mithril {
    public function new() {  }
    
    public function view() {

        var room = FilterModel.instance.getRoom();

        var homeshelfView = try {
            new UIShelvesList([FilterModel.instance.getRoomHomeshelf()]).view();
        } catch (e:Dynamic) {
            m('h3.error', '404 - can not show homeshelf for room  ' + FilterModel.instance.filterContent);
        } 

        var othershelvesView = try {
            m('nav', FilterModel.instance.getRoomShelvesExceptHomeshelf().map(shelf->{
                var selected = shelf == FilterModel.instance.getShelf() ? '.selected' : '';
                m('a$selected', {href:'/content'+shelf.path, oncreate: M.routeLink}, '' + shelf.title);
            }));
        } catch (e:Dynamic) {
            m('h3.error', '404 - can not show other shelves for room  ' + FilterModel.instance.filterContent);
        }

        var homeView = try {
            [
                m('a.border', {href:'/content' + room.path, oncreate:M.routeLink},  'Room: ' + FilterModel.instance.getRoom().title),
                m('div', 'Homeshelf:'),
                homeshelfView,
                m('div', 'Other shelves:'),
                othershelvesView,

            ];
        } catch (e:Dynamic) {
            m('h1.error', '404 - can not show room ' + FilterModel.instance.filterContent);
        } 
        
        return m('div.border', [
            m('h1', 'homepage'),
            homeView,
        ] );
    }
}

class ShelvesView implements Mithril {
    public function new() {  }
    
    public function view() {
        return m('div.border', [
            m('h1', 'shelves'),
            m('p', [m('a', {href:'/content' + FilterModel.instance.getRoom().path, oncreate:M.routeLink}, 'Visa alla'),]),

            m('div', FilterModel.instance.getShelves().map(shelf->{
                var a = m('a', {href:'/content'+shelf.path, oncreate: M.routeLink}, '' + shelf.title);
                m('div.border', [
                    a,
                    m('nav', [
                        shelf.books.map(book->{
                            var selected = book == FilterModel.instance.getBook() ? '.selected' : '';
                            m('a$selected', {href:'/content'+book.path, oncreate: M.routeLink}, '' + book.title);

                        })
                    ]),
                ]);
            }))

        ] );
    }
}

class BookView implements Mithril {
    public function new() {  }
    
    public function view() {

        var book = FilterModel.instance.getBook();

        var bookView = try {
            if (book == null) m('div', 'No book selected') else
            [
                m('h1', '' + book.title),
                m('p', '' + book.info),
                m('div', 'Nr of chapters:' + book.chapters.length),
            ];
        } catch (e:Dynamic) {
            m('.error', '404 - Can not show book: ' + book);
        }

        var chapter = FilterModel.instance.getChapter();
        var chapterView = try {
            if (chapter == null) m('div', 'No chapter selected') else
            [
                m('h3', '' + chapter.title),
                m('p', '' + chapter.text.substr(0, 50) + '...'),
            ];
        } catch (e:Dynamic) {
            m('div', 'Chapter does not exist');
        }

        var chapters = FilterModel.instance.getChapters();
        var chaptersView = try {
            [
                m('div.border', 'Chapters length:' + chapters.length),
                m('nav', chapters.map(chap->{
                    var selected = (chap == FilterModel.instance.getChapter()) ? '.selected' : '';
                    m('a$selected', {href:'/content' + chap.path, oncreate:M.routeLink}, '' + chap.title);
                }))
            ];
        } catch (e:Dynamic) {
            m('div.border', 'No chapters');
        }

        var subchapter = FilterModel.instance.getSubchapter();
        var subchapterView = try {
            if (subchapter == null) m('div', 'No subchapter selected') else
            [
                m('h3', '' + subchapter.title),
                m('p', '' + subchapter.text.substr(0, 50) + '...'),
            ];
        } catch (e:Dynamic) {
            m('div', 'Subchapter does not exist');
        }

        var subchapters = FilterModel.instance.getSubchapters();
        var subchaptersView = try {
            [
                m('div.border', 'Subchapters length:' + subchapters.length),
                m('nav', subchapters.map(sub->{
                    var selected = (sub == FilterModel.instance.getSubchapter()) ? '.selected' : '';
                    m('a$selected', {href:'/content' + sub.path, oncreate:M.routeLink}, '' + sub.title);
                }))
            ];
        } catch (e:Dynamic) {
            m('div.border', 'No subchapters');
        }

        return m('div.border', [
            bookView, 
            chaptersView,
            chapterView,
            subchaptersView,
            subchapterView,
        ] );
    }
}


//-----------------------------------------------------------------------------------------

class UIShelvesList implements Mithril {
    public function new(shelves:Array<Shelf>) { //(state:T) {
        this.shelves = shelves;
    }
    var shelves:Array<Shelf>;
    
    public function view() {
        return m('div.grid1', this.shelves.map(shelf->{
            var a = m('a', {href:'/content'+shelf.path, oncreate: M.routeLink}, 'Shelf: ' + shelf.path);
            m('div.border', [a]);
        }) );
    }
}

class UIBooksList implements Mithril {
    public function new(books:Array<Book>) {
        this.books = books;
    }
    var books:Array<Book>;

    public function view() {
        return m('div.grid4', this.books.map(book->{
            m('a', {href:'/book'+book.path, oncreate: M.routeLink}, 'Book: ' + book.path);
        }));

    }

}