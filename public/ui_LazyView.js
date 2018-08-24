(function ($hx_exports, $global) { "use-strict";
var $s = $global.$hx_scope, $_;
var $hxClasses = $s.a, mithril_Mithril = $s.b, data_TestModel = $s.c;
var ui_LazyView = function() {
};
$hxClasses["ui.LazyView"] = ui_LazyView;
ui_LazyView.__name__ = ["ui","LazyView"];
ui_LazyView.__interfaces__ = [mithril_Mithril];
ui_LazyView.prototype = {
	view: function() {
		if(arguments.length > 0 && arguments[0].tag != this) return arguments[0].tag.view.apply(arguments[0].tag, arguments);
		return [m.m("h1","Lazy View " + data_TestModel.instance.counter)];
	}
	,__class__: ui_LazyView
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
$s.ui_LazyView = ui_LazyView; 
})(typeof exports != "undefined" ? exports : typeof window != "undefined" ? window : typeof self != "undefined" ? self : this, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
