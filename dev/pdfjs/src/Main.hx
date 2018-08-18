import mithril.M;
import pdfjs.PDF;

class Main {
    static function main() new Main();
    public function new() {
        M.mount(js.Browser.document.querySelector('main'), new PdfJs());
    }
}

class Index implements Mithril {
    public function new() {}
    public function view() {
        return [
           m('h1', 'Hello from Mithril' ),           
        ];
    }
}

class PdfJs implements Mithril {
    public function new() {
        var url = 'test.pdf'; 
        this.canvases = [];
        var pdfdoc:PDFDoc = new PDFDoc('test.pdf');
        js.Promise.all([
            pdfdoc.renderPage(1),
            pdfdoc.renderPage(2),
            pdfdoc.renderPage(3),
        ])
        .then(canvases->{
            var cs:Array<js.html.CanvasElement> = cast canvases;
            this.canvases = cs;  
            M.redraw();          
            return null;
        });
    }

    var canvases:Array<js.html.CanvasElement>;
    
    public function view() {
        return [
            m('h1', 'PdfJs' ),  
            m('div', this.canvases.length),
            this.canvases.map(c->m('img', {src: c.toDataURL()})),
        ];
    }
}

