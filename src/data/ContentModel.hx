package data;
import data.Content;

#if mithril
import mithril.M;
#end

using dataclass.TypedJsonConverter;
using Lambda;

class ContentModel {
    public static var instance(default, null):ContentModel = new ContentModel();
    
    private function new () {
        trace('new content');
        this.content = ContentUtils.getContentInit();
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

        function updateDbPaths(tree:Content) {
            tree.dbpath = 'content-tree'; // 
            tree.rooms.iter(room->{
                room.dbpath = tree.dbpath + '/rooms/' + tree.rooms.indexOf(room);
                room.shelves.iter(shelf->{
                    shelf.dbpath = room.dbpath + '/shelves/' + room.shelves.indexOf(shelf);
                    shelf.books.iter(book->{
                        book.dbpath = shelf.dbpath + '/books/' + shelf.books.indexOf(book);
                        book.chapters.iter(chapter->{
                            chapter.dbpath = book.dbpath + '/chapters/' + book.chapters.indexOf(chapter);
                            chapter.subchapters.iter (sub->{
                                sub.dbpath = chapter.dbpath + '/subchapters/' + chapter.subchapters.indexOf(sub);
                            });
                        });
                    });
                });
            });


        }
        
        this.content = u;
        trace('Content:' + this.content);

        updatePaths(this.content);
        updateDbPaths(this.content);

        #if mithril M.redraw(); #end
        
        return u;
    }    

    // public function init();
    


    
}





