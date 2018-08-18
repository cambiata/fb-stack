package data;
import haxe.io.BytesData;
import data.Content;

class ContentUtils {
    static public function getContentInit():Content {
        return new Content({id: 'tree0', rooms:[
            new Room({id:'room0', title:'TestRoom', 

            home: new Home({
                title: 'Här är titel för hemsidan',
                children: [
                ],
            }),
            
            shelves:[
                
                // other shelves
                new Shelf({id:'shelf0', title:'Default page shelves', access:0, books:[
                    new Book({id:'book0', title:'Bok 0', access: 0, chapters:[
                        new Chapter({id:'chapter0', title:'Kapitel 1', access:1, subchapters:[
                            new Chapter({id:'sub0', title:'Subkapitel 0', access:0}),
                            new Chapter({id:'ros0', title:'Rosettakapitel', access:0, type: new RosettaChapter({data:'{abc:"ABC"}'})}),
                        ]}),

                        new Chapter({id:'vidc1', title:'Videokapitel 1', type: new VideoChapter({url:'/video/kap/1'})}),
                        new Chapter({id:'pdf1', title:'Pdfkapitel 1', type: new PdfChapter()}),

                        // new Chapter({id:'chapter1', title:'Kapitel 2', access:0, subchapters:[
                        //     new Chapter({id:'sub0', title:'Sub0', access:0}),
                        //     new Chapter({id:'sub1', title:'Sub1', access:0}),
                        //     new Chapter({id:'sub2', title:'Sub2', access:0}),
                        // ]}),
                        // new Chapter({id:'chapter3', title:'Kapitel 3', access:0, subchapters:[]}),
                    ]}),
                    new Book({id:'book1', title:'Bok 1', access: 1, chapters:[
                        new Chapter({id:'chapter0', title:'Kapitel 1', access:1, subchapters:[
                            new Chapter({id:'sub0', title:'Sub0', access:0}),
                            new Chapter({id:'sub1', title:'Sub1', access:0}),
                        ]}),
                    ]}),
                ]}),
                // new Shelf({id:'sh1', title:'Shelf1', access:1, books:[]}),
                new Shelf({id:'shelf1', title:'Ytterligare en bokhylla', access:0, books:[
                    new Book({id:'book2', title:'En bok bland alla andra', access:0, chapters:[
                        new Chapter({id:'chapter0', title:'Chapter Access 0', access:0, subchapters:[]}),
                        new Chapter({id:'chapter1', title:'Chapter Access 1', access:1, subchapters:[]}),
                        new Chapter({id:'chapter2', title:'Chapter Access 2', access:2, subchapters:[]}),
                    ]}),
                ]}),
                // new Shelf({id:'home', title:'Home shelf', type: Homepage, access:999, books:[
                //     new Book({id:'homebook0', title:'Home Book 0', access:999, chapters:[]}),
                //     new Book({id:'homebook1', title:'Home Book 1', access:999, chapters:[]}),
                // ]}),
            ]}),
            // new Room({id:'room1', title: 'Room1', shelves:[
            //     new Shelf({id:'home', title:'Homeshelf Room1', type:Shelftype.Homepage, access:0, books:[
            //         new Book({id:'b0', title:'Book0', access:0, chapters:[]}),
            //         new Book({id:'b1', title:'Book1', access:0, chapters:[]}),
            //     ]}),
            //     new Shelf({id:'sh0', title:'Shelf0 of Room1', access:0, books:[
            //         new Book({id:'b0', title:'Book0', access:0, chapters:[]}),
            //         new Book({id:'b1', title:'Book1', access:0, chapters:[]}),                   
            //     ]}),
            // ]}),
        ]});            
    }




}