package ui;

import mithril.M;
import pdfjs.PDF;
import data.Content;

class PdfChapter implements Mithril {
    public function new(t:PdfChaptertype) {
        this.cht = t;
    }
    var cht: PdfChaptertype;
    public function view() {

        var canvases = data.PdfModel.instance.getPages('/assets/pdf/test.pdf');

        return [
            m('div.specialchapter.pdf', m('h1', 'PdfChapter ' + cht)),
            // new PdfJs('/assets/pdf/test.pdf').view(),
            m('div', 'canvases count ' + canvases.length),
            m('div.pdfbackground', 
                canvases.map(c->m('img.pdfpage', {src: c.toDataURL()}))
            ),
        ];
    }
}


// class PdfJs implements Mithril {
//     public function new(url:String) {
        
//         this.canvases = [];
//         var pdfdoc:PDFDoc = new PDFDoc(url);
//         js.Promise.all([
//             pdfdoc.renderPage(1),
//             pdfdoc.renderPage(2),
//             pdfdoc.renderPage(3),
//         ])
//         .then(canvases->{
//             var cs:Array<js.html.CanvasElement> = cast canvases;
//             this.canvases = cs;  
//             M.redraw();          
//             return null;
//         });
//     }

//     var canvases:Array<js.html.CanvasElement>;
    
//     public function view() {
//         return [
//             m('h1', 'PdfJs' ),  
//             m('div', this.canvases.length),
//             this.canvases.map(c->m('img', {src: c.toDataURL()})),
//         ];
//     }
// }
