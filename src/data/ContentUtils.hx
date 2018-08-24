package data;
import haxe.io.BytesData;
import data.Content;

class ContentUtils {
    static public function getContentInit():Content {
        return new Content({id: 'tree0', rooms:[
            new Room({id:'room0', title:'TestRoom', 

            home: new Home({
                title: 'Här är titel för hemsidan',
                sections: [
                    new SectionShelves({sort: 200}),



                    new SectionCells({sort: 100, cells:[
                        new TextCell({title:'Cell0', gridColumn: 'span 2', gridRow:'span 2', bgcolor:'#0F154D', /*bgimage:'/assets/home/background.jpg',*/ url: '/content/room0/shelf1/book2', text:'#Välkommen till Körakademin hösten 2018!                        

###Vi lyfter svensk körsång!

Körakademin finns till för att ge dej som körsångare nya möjligheter att utvecklas. Vi spelar in mängder av körmusik som du hittar på scorx.org och vi skapar övningsmaterial för rösten, notläsning mm.

                        '}),


new VideoCell( {gridColumn:'span 2'} ),


new TextCell({title:'Cell1', bgcolor:'#43245D', color: 'white', gridColumn:'span 2', image: '', text:'

## ScorX Player                        

är en musikmixer som hjälper dig att öva din körstämma hemma vid datorn eller i mobilen/plattan. Lyssna, följ med i notbilden och sjung med! 

'}),



                    ]}),

 new SectionCells({sort: 300, cells:[           

new TextCell({title:'Cell1', bgcolor:'#0F154D', color: 'white', gridColumn:'span 2', image: '', text:'

##Körakademin Plus

är en kostnadsfri nätbaserad distanskurs för körsångare. Här får du fri tillgång till alla våra inspelningar och allt vårt övriga övningsmaterial för notläsning, gehör, rösten med mera. 

'}),


new TextCell({title:'Cell1', bgcolor:'#6E1841', color: 'white',gridColumn:'span 2', image: '', text:'
###Sjunger du i en Sensus-kör?                        

Som registrerad körsångare i Sensus får du som medlemsförmån gratis använda 12 PLAY- titlar per termin ur vårt musikbibliotek i ScorX. Du får tillgång till detta genom att bli medlem i ScorX-gruppen **Körakademin Sensus**.

'}),

new TextCell({title:'Cell1', bgcolor:'#6E1841', color: 'white',gridColumn:'', image: '', text:'
                        
###Sök bland 800 Scorx-titlar                        

Nu kan du hitta ännu fler...

'}),

new TextCell({title:'Cell1', bgcolor:'#312632', color: 'white',gridColumn:'', image: '', text:'
                        
###Möt våra inspelningsteam                        

Hundratals sånger finns inspelade i ScorX bibliotek. Men vilka är rösterna bakom inspelningarna? 

'}),



                    ]}),
                ],
            }),
            
            shelves:[                
                // other shelves
                new Shelf({id:'shelf0', title:'Default page shelves', access:0, books:[
                    new Book({id:'book0', title:'Bok 0', access: 0, chapters:[
                        new Chapter({id:'chapter0', title:'Kapitel 1', access:1, subchapters:[
                            new Chapter({id:'sub0', title:'Sub', access:0}),
                            new Chapter({id:'vidc1', title:'Video', access:0, type: new VideoChaptertype({url:'/assets/video/tada.mp4'})}),
                            new Chapter({id:'pdf1', title:'Pdf', access:0, type: new PdfChaptertype()}),
                            new Chapter({id:'ros0', title:'Rosetta', access:0, type: new RosettaChaptertype()}),
                            new Chapter({id:'pitch1', title:'Pitch', access:0, type: new PitchChaptertype()}),
                        ]}),

                        new Chapter({id:'vidc1', title:'Videokapitel 1', type: new VideoChaptertype({url:'/assets/video/tada.mp4'})}),
                        new Chapter({id:'pdf1', title:'Pdfkapitel 1', type: new PdfChaptertype()}),
                        new Chapter({id:'rosetta1', title:'Rosetta 1', type: new RosettaChaptertype()}),
                        new Chapter({id:'pitch1', title:'Pitch 1', type: new PitchChaptertype()}),
                        new Chapter({id:'scorx1', title:'Scorxmixer 1', type: new ScorxmixerChaptertype()}),

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