package data;

import pdfjs.PDF;
import mithril.M;

class PdfModel {
    private function new() {
        this.map = new haxe.ds.StringMap();
    }
    
    public static var instance(default, null): PdfModel = new PdfModel();

    var map:haxe.ds.StringMap<Array<js.html.CanvasElement>>;

    public function getPages(filename:String):Array<js.html.CanvasElement> {
        if (this.map.exists(filename)) return this.map.get(filename);

        this.map.set(filename, null); // set to null to prevent multiple loadings...
        var pdfdoc:PDFDoc = new PDFDoc(filename);
        js.Promise.all([
            pdfdoc.renderPage(1),
            pdfdoc.renderPage(2),
            pdfdoc.renderPage(3),
        ])
        .then(cs->{
            var canvases:Array<js.html.CanvasElement> = cast cs;
            this.map.set(filename, canvases);
            M.redraw();          
            return null;
        });




        return [];
    }

}


