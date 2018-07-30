package data;
import data.Content;
import mithril.M;

using dataclass.JsonConverter;

class ContentModel {
    public static var instance(default, null):ContentModel = new ContentModel();
    
    private function new () {
        ErrorsAndLogs.addLog('new content');
    }  // private constructor

    public var content(default, set):Content;

    function set_content(u:Content) {
        this.content = u;
        ErrorsAndLogs.addLog('Content:' + this.content);
        M.redraw();
        return u;
    }    

    static var defaultData:Dynamic = {
        id: 'startup',
        rooms: [ 
            {
                id: 'home',
                title: 'Room HOME',
                sort: 1,
                shelves: [
                    {
                        id:'sh',
                        title: 'sh',
                        access: 0,
                        sort: 0,
                        books: [
                            {
                                id:'book',
                                title: 'book',
                                access: 0,
                                chapters: [
                                    {
                                        id:'ch',
                                        title:'ch',
                                        access: 0,
                                        subchapters: [
                                            {
                                                id:'sch',
                                                title:'sch',
                                                access: 0,
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id:'home',
                        title: 'Shelf HOME',
                        access: 1,
                        sort: 1,
                        books: [
                            {
                                id:'book',
                                title: 'book',
                                access: 0,
                                chapters: [
                                    {
                                        id:'ch',
                                        title:'ch',
                                        access: 0,
                                        subchapters: [
                                            {
                                                id:'sch',
                                                title:'sch',
                                                access: 0,
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                ],
            },
            {
                id: 'startup',
                title: 'Startup',
                sort: 0,
                shelves: [
                    {
                        id:'shelf0',
                        access: 0,
                        title: 'Shelf 0',
                        sort: 1,
                        books: [
                            {
                                id: 'book0',
                                title: 'Book Zero',
                                access: 0,
                                chapters: [
                                    {
                                        id:'chapter0',
                                        title:'Chapter Zero',
                                        access: 0,
                                        subchapters: [
                                            {
                                                id:'subchapter0',
                                                title:'Subchapter Zero',
                                                access: 0,
                                            },
                                            {
                                                id:'subchapter1',
                                                title:'Subchapter One',
                                                access: 1,
                                            },
                                            {
                                                id:'subchapter2',
                                                title:'Subchapter Two',
                                                access: 2,
                                            },
                                        ]
                                    },
                                    {
                                        id:'chapter1',
                                        title:'Chapter One',
                                        access: 1,
                                        subchapters: [
                                            {
                                                id:'subchapter0',
                                                title:'Subchapter Zero',
                                                access: 0,
                                            },
                                            {
                                                id:'subchapter1',
                                                title:'Subchapter One',
                                                access: 1,
                                            },
                                        ]
                                    },
                                    {
                                        id:'chapter1',
                                        title:'Chapter One',
                                        access: 2,
                                        subchapters: [
                                            {
                                                id:'subchapter0',
                                                title:'Subchapter Zero',
                                                access: 0,
                                            }
                                        ]
                                    },
                                ]
                            },
                            {
                                id: 'book1',
                                title: 'Book One',
                                access: 1,
                                chapters: [
                                    {
                                        id:'chapter0',
                                        title:'Chapter Zero',
                                        access: 0,
                                        subchapters: [
                                            {
                                                id:'subchapter0',
                                                title:'Subchapter Zero',
                                                access: 0,
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                id: 'book2',
                                title: 'Book Two',
                                access: 2,
                                chapters: [
                                    {
                                        id:'chapter0',
                                        title:'Chapter Zero',
                                        access: 0,
                                        subchapters: [
                                            {
                                                id:'subchapter0',
                                                title:'Subchapter Zero',
                                                access: 0,
                                            }
                                        ]
                                    }
                                ]
                            },
                        ]
                    },
                ],
            },
        ]
    }

    public function init() {
        this.content = Content.fromJson(defaultData);
    }



   
}





