package pdfjs;

class PDF {
    var pdflib:PDFLib;
    public function new() {
        this.pdflib = untyped window['pdfjs-dist/build/pdf'];
    }

    public function getDocument(url:String):js.Promise<PDFDocumentProxy> {
        return this.pdflib.getDocument(url);
    }
}

@:jsRequire('Pdf')
extern class PDFLib {
    public function getDocument(url:String):js.Promise<PDFDocumentProxy>;
}

extern class PDFDocumentProxy {
    public var numPages: Int;
    public function getPage(number:Int): js.Promise<PDFPageProxy>;
}

extern class PDFPageProxy {
    public var pageNumber:Int;
    public var rotate:Int;
    public var ref:Dynamic; // PDFRef;
    public function render(params: Dynamic): PDFRenderTask;
    public function getViewport(scale:Float, ?rotate:Float): PDFPageViewport;
}

extern class PDFRenderTask extends js.Promise<PDFPageProxy> {
    public function cancel(): Void;
}

extern class PDFPageViewport {
    public var width: Float;
    public var height: Float;
    public var fontScale: Float;
    public var transform: Array<Float>;
    public function clone(options:Dynamic): PDFPageViewport;
}

class PDFDoc {

    var url:String;
    var pdf:PDF;
    var document:PDFDocumentProxy;
    public function new(url:String) {
        this.url = url;
        this.pdf = new PDF();
    }

    public function getDocument():js.Promise<PDFDocumentProxy> {
        if (this.document != null) return js.Promise.resolve(this.document);
        return this.pdf.getDocument(this.url);
    }

    public function renderPage(pageNr:Int, scale=2.0):js.Promise<js.html.CanvasElement> {
        return this.getDocument()
        .then(doc->{
            return doc.getPage(pageNr);
        })
        .then(p->{
            var page:PDFPageProxy = p;
            var viewport:PDFPageViewport = page.getViewport(scale);
            var canvas:js.html.CanvasElement = cast js.Browser.document.createElement("canvas");
            canvas.height = cast viewport.height;
            canvas.width = cast viewport.width;                
            var renderContext = {
                canvasContext: canvas.getContext2d(),
                viewport: viewport
            };
            page.render(renderContext)
            .then(x->{
                trace('renderd page $pageNr');
                trace(canvas.width + ' ' + canvas.height);
                return canvas;
            });
        });
    }



}
