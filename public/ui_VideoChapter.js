(function ($hx_exports, $global) { "use-strict";
var $s = $global.$hx_scope, $_;
var haxe_Log = $s.e, $hxClasses = $s.a, mithril_Mithril = $s.b;
var ui_VideoChapter = function(c) {
	this.c = c;
	haxe_Log.trace("VIDEO CHAPTER CREATED",{ fileName : "src/ui/VideoChapter.hx", lineNumber : 9, className : "ui.VideoChapter", methodName : "new"});
};
$hxClasses["ui.VideoChapter"] = ui_VideoChapter;
ui_VideoChapter.__name__ = ["ui","VideoChapter"];
ui_VideoChapter.__interfaces__ = [mithril_Mithril];
ui_VideoChapter.prototype = {
	view: function() {
		if(arguments.length > 0 && arguments[0].tag != this) return arguments[0].tag.view.apply(arguments[0].tag, arguments);
		return [m.m("div.specialchapter.video",m.m("h1","Video")),m.m("video",{ src : this.c.url, controls : true, config : function(el,isInit,context) {
			return context.retain = true;
		}, style : { width : "100%", objectFit : "contain", backgroundColor : "black"}})];
	}
	,__class__: ui_VideoChapter
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
$s.ui_VideoChapter = ui_VideoChapter; 
})(typeof exports != "undefined" ? exports : typeof window != "undefined" ? window : typeof self != "undefined" ? self : this, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
