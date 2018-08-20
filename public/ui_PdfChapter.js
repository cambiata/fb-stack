(function ($hx_exports, $global) { "use-strict";
var $s = $global.$hx_scope, $_;
var $hxClasses = $s.a, mithril_Mithril = $s.b, haxe_ds_StringMap = $s.d, Std = $s.c;
var data_PdfModel = function() {
	this.map = new haxe_ds_StringMap();
};
$hxClasses["data.PdfModel"] = data_PdfModel;
data_PdfModel.__name__ = ["data","PdfModel"];
data_PdfModel.prototype = {
	getPages: function(filename) {
		var _gthis = this;
		var _this = this.map;
		if(__map_reserved[filename] != null ? _this.existsReserved(filename) : _this.h.hasOwnProperty(filename)) {
			var _this1 = this.map;
			if(__map_reserved[filename] != null) {
				return _this1.getReserved(filename);
			} else {
				return _this1.h[filename];
			}
		}
		var _this2 = this.map;
		if(__map_reserved[filename] != null) {
			_this2.setReserved(filename,null);
		} else {
			_this2.h[filename] = null;
		}
		var pdfdoc = new pdfjs_PDFDoc(filename);
		Promise.all([pdfdoc.renderPage(1),pdfdoc.renderPage(2),pdfdoc.renderPage(3)]).then(function(cs) {
			var canvases = cs;
			var _this3 = _gthis.map;
			if(__map_reserved[filename] != null) {
				_this3.setReserved(filename,canvases);
			} else {
				_this3.h[filename] = canvases;
			}
			m.redraw();
			return null;
		});
		return [];
	}
	,__class__: data_PdfModel
};
var pdfjs_PDF = function() {
	this.pdflib = window["pdfjs-dist/build/pdf"];
};
$hxClasses["pdfjs.PDF"] = pdfjs_PDF;
pdfjs_PDF.__name__ = ["pdfjs","PDF"];
pdfjs_PDF.prototype = {
	getDocument: function(url) {
		return this.pdflib.getDocument(url);
	}
	,__class__: pdfjs_PDF
};
var pdfjs_PDFDoc = function(url) {
	this.url = url;
	this.pdf = new pdfjs_PDF();
};
$hxClasses["pdfjs.PDFDoc"] = pdfjs_PDFDoc;
pdfjs_PDFDoc.__name__ = ["pdfjs","PDFDoc"];
pdfjs_PDFDoc.prototype = {
	getDocument: function() {
		if(this.document != null) {
			return Promise.resolve(this.document);
		}
		return this.pdf.getDocument(this.url);
	}
	,renderPage: function(pageNr,scale) {
		if(scale == null) {
			scale = 1.8;
		}
		return this.getDocument().then(function(doc) {
			return doc.getPage(pageNr);
		}).then(function(p) {
			var page = p;
			var viewport = page.getViewport(scale);
			var canvas = window.document.createElement("canvas");
			canvas.height = viewport.height;
			canvas.width = viewport.width;
			return page.render({ canvasContext : canvas.getContext("2d",null), viewport : viewport}).then(function(x) {
				console.log("src/pdfjs/PDF.hx:76:","renderd page " + pageNr);
				console.log("src/pdfjs/PDF.hx:77:",canvas.width + " " + canvas.height);
				return canvas;
			});
		});
	}
	,__class__: pdfjs_PDFDoc
};
var ui_PdfChapter = function(t) {
	this.cht = t;
};
$hxClasses["ui.PdfChapter"] = ui_PdfChapter;
ui_PdfChapter.__name__ = ["ui","PdfChapter"];
ui_PdfChapter.__interfaces__ = [mithril_Mithril];
ui_PdfChapter.prototype = {
	view: function() {
		if(arguments.length > 0 && arguments[0].tag != this) return arguments[0].tag.view.apply(arguments[0].tag, arguments);
		var canvases = data_PdfModel.instance.getPages("/assets/pdf/test.pdf");
		return [m.m("div.specialchapter.pdf",m.m("h1","PdfChapter " + Std.string(this.cht))),m.m("div","canvases count " + canvases.length),m.m("div.pdfbackground",canvases.map(function(c) {
			return m.m("img.pdfpage",{ src : c.toDataURL()});
		}))];
	}
	,__class__: ui_PdfChapter
};
function $getIterator(o) { if( o instanceof Array ) return HxOverrides.iter(o); else return o.iterator(); }
var $fid = 0;
var __map_reserved = {};
try {
var __varName = window.m;
(function(m) {
			if (m.m) return;
			m.m = function() {
				try { 
					for(var i=0; i < arguments.length; ++i) if(arguments[i] instanceof List) {
						var list = arguments[i].h; arguments[i] = [];
						while(list != null) { arguments[i].push(l[0]); list = l[1]; }
					}
				} catch(e) {}
				return m.apply(this, arguments);
			}
		})(__varName);
} catch(_) {}
try {
GLOBAL.m = require("mithril");
var __varName1 = GLOBAL.m;
(function(m) {
			if (m.m) return;
			m.m = function() {
				try { 
					for(var i=0; i < arguments.length; ++i) if(arguments[i] instanceof List) {
						var list = arguments[i].h; arguments[i] = [];
						while(list != null) { arguments[i].push(l[0]); list = l[1]; }
					}
				} catch(e) {}
				return m.apply(this, arguments);
			}
		})(__varName1);
} catch(_) {}
data_PdfModel.instance = new data_PdfModel();
$s.ui_PdfChapter = ui_PdfChapter; 
})(typeof exports != "undefined" ? exports : typeof window != "undefined" ? window : typeof self != "undefined" ? self : this, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
