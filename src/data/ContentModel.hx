package data;
import data.Content;
import mithril.M;

using dataclass.JsonConverter;
using Lambda;

class ContentModel {
    public static var instance(default, null):ContentModel = new ContentModel();
    
    private function new () {
        ErrorsAndLogs.addLog('new content');
    }  // private constructor

    public var content(default, set):Content;

    function set_content(u:Content) {
        function updatePaths(tree:Content) {
            tree.path = ''; // '/' + tree.id; Do not include tree.id!
            tree.rooms.iter(room->{
                room.path = tree.path + '/' + room.id;
                room.shelves.iter(shelf->{
                    shelf.path = room.path + '/' + shelf.id;
                    shelf.books.iter(book->{
                        book.path = shelf.path + '/' + book.id;
                        book.chapters.iter(chapter->{
                            chapter.path = book.path + '/' + chapter.id;
                            chapter.subchapters.iter (sub->{
                                sub.path = chapter.path + '/' + sub.id;
                            });
                        });
                    });
                });
            });
        }
        
        this.content = u;
        ErrorsAndLogs.addLog('Content:' + this.content);

        updatePaths(this.content);

        M.redraw();
        return u;
    }    

    public function init() {
        this.content = new Content({id: 'tree0', rooms:[
            new Room({id:'room0', title:'TestRoom', shelves:[
                new Shelf({id:'home', title:'Homeshelf Room0', type: Homepage, access:0, books:[]}),
                new Shelf({id:'sh0', title:'Shelf01', access:0, books:[
                    new Book({id:'book0', title:'Bok 0', access: 0, chapters:[
                        new Chapter({id:'chapter0', title:'Kapitel 1', access:1, subchapters:[
                            new Chapter({id:'sub0', title:'Sub0', access:0}),
                            new Chapter({id:'sub1', title:'Sub1', access:0}),
                        ]}),
                        new Chapter({id:'chapter1', title:'Kapitel 2', access:0, subchapters:[
                            new Chapter({id:'sub0', title:'Sub0', access:0}),
                            new Chapter({id:'sub1', title:'Sub1', access:0}),
                            new Chapter({id:'sub2', title:'Sub2', access:0}),
                        ]}),
                        new Chapter({id:'chapter3', title:'Kapitel 3', access:0, subchapters:[]}),
                    ]}),
                    new Book({id:'book1', title:'Bok 1', access: 1, chapters:[
                        new Chapter({id:'chapter0', title:'Kapitel 1', access:1, subchapters:[
                            new Chapter({id:'sub0', title:'Sub0', access:0}),
                            new Chapter({id:'sub1', title:'Sub1', access:0}),
                        ]}),
                    ]}),
                ]}),
                new Shelf({id:'sh1', title:'Shelf1', access:1, books:[]}),
                new Shelf({id:'sh2', title:'Shelf2', access:0, books:[
                    new Book({id:'book0', title:'Book 0', access:0, chapters:[
                        new Chapter({id:'chapter0', title:'Chapter Access 0', access:0, subchapters:[]}),
                        new Chapter({id:'chapter1', title:'Chapter Access 1', access:1, subchapters:[]}),
                        new Chapter({id:'chapter2', title:'Chapter Access 2', access:2, subchapters:[]}),
                    ]}),
                ]}),
                new Shelf({id:'home', title:'Home shelf', type: Homepage, access:999, books:[
                    new Book({id:'homebook0', title:'Home Book 0', access:999, chapters:[]}),
                    new Book({id:'homebook1', title:'Home Book 1', access:999, chapters:[]}),
                ]}),
            ]}),
            new Room({id:'room1', title: 'Room1', shelves:[
                new Shelf({id:'home', title:'Homeshelf Room1', type:Shelftype.Homepage, access:0, books:[
                    new Book({id:'b0', title:'Book0', access:0, chapters:[]}),
                    new Book({id:'b1', title:'Book1', access:0, chapters:[]}),
                ]}),
                new Shelf({id:'sh0', title:'Shelf0 of Room1', access:0, books:[
                    new Book({id:'b0', title:'Book0', access:0, chapters:[]}),
                    new Book({id:'b1', title:'Book1', access:0, chapters:[]}),                   
                ]}),
            ]}),
        ]});
        trace(haxe.Json.stringify(this.content.toJson()));
    }
}





