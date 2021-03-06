// Generated by Haxe 4.0.0-preview.4+1e3e5e016
(function () { "use strict";
var $hxEnums = {};
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.substr = function(s,pos,len) {
	if(len == null) {
		len = s.length;
	} else if(len < 0) {
		if(pos == 0) {
			len = s.length + len;
		} else {
			return "";
		}
	}
	return s.substr(pos,len);
};
var Main = function() {
	data_FirebaseModel.instance.init();
	m.mount(window.document.querySelector("main"),new Index());
};
Main.__name__ = true;
Main.main = function() {
	new Main();
};
var mithril_Mithril = function() { };
mithril_Mithril.__name__ = true;
var Index = function() {
};
Index.__name__ = true;
Index.__interfaces__ = [mithril_Mithril];
Index.prototype = {
	view: function() {
		if(arguments.length > 0 && arguments[0].tag != this) return arguments[0].tag.view.apply(arguments[0].tag, arguments);
		return [new ui_media_StorageMedia("/test/choir.png").view(),new ui_media_StorageMedia("/test/choirX.png").view(),new ui_media_StorageMedia("/test/Carolamedley-VERSION-1A.mp3").view(),new ui_media_StorageMedia("/test/video.mp4").view(),new ui_media_StorageMedia("/test/test.png").view()];
	}
};
Math.__name__ = true;
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
var data_FirebaseModel = function() {
	this.app = null;
};
data_FirebaseModel.__name__ = true;
data_FirebaseModel.prototype = {
	init: function() {
		this.app = firebase.initializeApp({ apiKey : "AIzaSyBGLErhUSfQHA4wOtkid206KVE-96QEN04", authDomain : "fb-stack.firebaseapp.com", databaseURL : "https://fb-stack.firebaseio.com", projectId : "fb-stack", storageBucket : "fb-stack.appspot.com", messagingSenderId : "665827748546"});
	}
};
var haxe_IMap = function() { };
haxe_IMap.__name__ = true;
var haxe_ds_StringMap = function() {
	this.h = { };
};
haxe_ds_StringMap.__name__ = true;
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	setReserved: function(key,value) {
		if(this.rh == null) {
			this.rh = { };
		}
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) {
			return null;
		} else {
			return this.rh["$" + key];
		}
	}
	,existsReserved: function(key) {
		if(this.rh == null) {
			return false;
		}
		return this.rh.hasOwnProperty("$" + key);
	}
};
var data_StorageMap = function() {
	this.map = new haxe_ds_StringMap();
};
data_StorageMap.__name__ = true;
data_StorageMap.prototype = {
	get: function(src) {
		var _gthis = this;
		var _this = this.map;
		if(__map_reserved[src] != null ? _this.existsReserved(src) : _this.h.hasOwnProperty(src)) {
			console.log("../../src/data/StorageMap.hx:23:","Get " + src + " from cache");
			var _this1 = this.map;
			if(__map_reserved[src] != null) {
				return _this1.getReserved(src);
			} else {
				return _this1.h[src];
			}
		}
		console.log("../../src/data/StorageMap.hx:26:",src + " does not exist");
		firebase.storage().ref(src).getDownloadURL().then(function(downloadUrl) {
			console.log("../../src/data/StorageMap.hx:29:","found " + src + ":" + downloadUrl);
			var _this2 = _gthis.map;
			if(__map_reserved[src] != null) {
				_this2.setReserved(src,downloadUrl);
			} else {
				_this2.h[src] = downloadUrl;
			}
			m.redraw();
			return downloadUrl;
		})["catch"](function(e) {
			console.log("../../src/data/StorageMap.hx:34:","error " + e);
			return data_StorageMap.NONEXISTING;
		});
		return this.getDefault(src);
	}
	,getDefault: function(src) {
		if(haxe_io_Path.extension(src) == "mp3") {
			return data_StorageMap.DEFAULT_MP3;
		} else {
			return data_StorageMap.DEFAULT_IMG;
		}
	}
};
var haxe_io_Path = function(path) {
	switch(path) {
	case ".":case "..":
		this.dir = path;
		this.file = "";
		return;
	}
	var c1 = path.lastIndexOf("/");
	var c2 = path.lastIndexOf("\\");
	if(c1 < c2) {
		this.dir = HxOverrides.substr(path,0,c2);
		path = HxOverrides.substr(path,c2 + 1,null);
		this.backslash = true;
	} else if(c2 < c1) {
		this.dir = HxOverrides.substr(path,0,c1);
		path = HxOverrides.substr(path,c1 + 1,null);
	} else {
		this.dir = null;
	}
	var cp = path.lastIndexOf(".");
	if(cp != -1) {
		this.ext = HxOverrides.substr(path,cp + 1,null);
		this.file = HxOverrides.substr(path,0,cp);
	} else {
		this.ext = null;
		this.file = path;
	}
};
haxe_io_Path.__name__ = true;
haxe_io_Path.extension = function(path) {
	var s = new haxe_io_Path(path);
	if(s.ext == null) {
		return "";
	}
	return s.ext;
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	if(Error.captureStackTrace) {
		Error.captureStackTrace(this,js__$Boot_HaxeError);
	}
};
js__$Boot_HaxeError.__name__ = true;
js__$Boot_HaxeError.wrap = function(val) {
	if((val instanceof Error)) {
		return val;
	} else {
		return new js__$Boot_HaxeError(val);
	}
};
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
});
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.__string_rec = function(o,s) {
	if(o == null) {
		return "null";
	}
	if(s.length >= 5) {
		return "<...>";
	}
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) {
		t = "object";
	}
	switch(t) {
	case "function":
		return "<function>";
	case "object":
		if(o.__enum__) {
			var e = $hxEnums[o.__enum__];
			var n = e.__constructs__[o._hx_index];
			var con = e[n];
			if(con.__params__) {
				s += "\t";
				var tmp = n + "(";
				var _g = [];
				var _g1 = 0;
				var _g2 = con.__params__;
				while(_g1 < _g2.length) {
					var p = _g2[_g1];
					++_g1;
					_g.push(js_Boot.__string_rec(o[p],s));
				}
				return tmp + _g.join(",") + ")";
			} else {
				return n;
			}
		}
		if((o instanceof Array)) {
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			var _g11 = 0;
			var _g3 = l;
			while(_g11 < _g3) {
				var i1 = _g11++;
				str += (i1 > 0 ? "," : "") + js_Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e1 ) {
			var e2 = (e1 instanceof js__$Boot_HaxeError) ? e1.val : e1;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				return s2;
			}
		}
		var k = null;
		var str1 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str1.length != 2) {
			str1 += ", \n";
		}
		str1 += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str1 += "\n" + s + "}";
		return str1;
	case "string":
		return o;
	default:
		return String(o);
	}
};
var ui_media_StorageItem = function(src) {
	this.src = src;
};
ui_media_StorageItem.__name__ = true;
ui_media_StorageItem.__interfaces__ = [mithril_Mithril];
ui_media_StorageItem.prototype = {
	view: function() {
		if(arguments.length > 0 && arguments[0].tag != this) return arguments[0].tag.view.apply(arguments[0].tag, arguments);
		var storageUrl = data_StorageMap.instance.get(this.src);
		var itemView = null;
		if(storageUrl == data_StorageMap.instance.getDefault(this.src)) {
			itemView = this.getLoadingView(this.src);
		} else if(storageUrl == data_StorageMap.NONEXISTING) {
			itemView = this.getUploadView(this.src);
		} else {
			itemView = this.getItemView(data_StorageMap.instance.get(this.src));
		}
		return itemView;
	}
	,getLoadingView: function(src) {
		return m.m("div",{ style : { border : "2px solid blue", padding : "1em"}},"Loading " + src + "...");
	}
	,getItemView: function(src) {
		return [m.m("img",{ src : data_StorageMap.instance.get(src)})];
	}
	,getUploadView: function(src) {
		var tmp = m.m("span","Upload file: " + src);
		var tmp1 = m.m("input",{ type : "file", id : "file", onchange : function(e) {
			ui_media_StorageItem.file = e.target.files[0];
			console.log("../../src/ui/media/StorageItem.hx:57:",ui_media_StorageItem.file);
			return;
		}});
		var tmp2 = m.m("button",{ onclick : function(e1) {
			console.log("../../src/ui/media/StorageItem.hx:62:","upload");
			console.log("../../src/ui/media/StorageItem.hx:63:",ui_media_StorageItem.file);
			if(ui_media_StorageItem.file == null) {
				return;
			}
			var fileref = src;
			var storageRef = firebase.storage().ref(fileref);
			console.log("../../src/ui/media/StorageItem.hx:69:",storageRef);
			storageRef.put(ui_media_StorageItem.file).on("state_changed",function(snap) {
				console.log("../../src/ui/media/StorageItem.hx:73:","uploading " + src + "...");
				return null;
			},function(error) {
				console.log("../../src/ui/media/StorageItem.hx:76:","error2 " + e1);
				return;
			},function() {
				console.log("../../src/ui/media/StorageItem.hx:79:","hehe");
				m.redraw();
				return;
			});
			return;
		}},"Upload");
		var tmp3 = m.m("span",Std.string(ui_media_StorageItem.file) + "");
		return m.m("div",{ style : { border : "2px solid green", padding : "1em"}},[tmp,tmp1,tmp2,tmp3]);
	}
};
var ui_media_StorageAudio = function(src) {
	ui_media_StorageItem.call(this,src);
};
ui_media_StorageAudio.__name__ = true;
ui_media_StorageAudio.__super__ = ui_media_StorageItem;
ui_media_StorageAudio.prototype = $extend(ui_media_StorageItem.prototype,{
	getItemView: function(src) {
		var tmp = m.m("source",{ src : src});
		return m.m("audio",{ controls : true},tmp);
	}
});
var ui_media_StorageImage = function(src) {
	ui_media_StorageItem.call(this,src);
};
ui_media_StorageImage.__name__ = true;
ui_media_StorageImage.__super__ = ui_media_StorageItem;
ui_media_StorageImage.prototype = $extend(ui_media_StorageItem.prototype,{
	getItemView: function(src) {
		return [m.m("img",{ src : src})];
	}
});
var ui_media_StorageMedia = function(src) {
	this.src = src;
	var tmp;
	switch(haxe_io_Path.extension(src)) {
	case "mp3":
		tmp = new ui_media_StorageAudio(src);
		break;
	case "mp4":
		tmp = new ui_media_StorageVideo(src);
		break;
	default:
		tmp = new ui_media_StorageImage(src);
	}
	this.item = tmp;
};
ui_media_StorageMedia.__name__ = true;
ui_media_StorageMedia.prototype = {
	view: function() {
		return this.item.view();
	}
};
var ui_media_StorageVideo = function(src) {
	ui_media_StorageItem.call(this,src);
};
ui_media_StorageVideo.__name__ = true;
ui_media_StorageVideo.__super__ = ui_media_StorageItem;
ui_media_StorageVideo.prototype = $extend(ui_media_StorageItem.prototype,{
	getItemView: function(src) {
		return m.m("video",{ src : src, controls : true, style : { width : "100%", objectFit : "contain", backgroundColor : "black"}});
	}
});
String.__name__ = true;
Array.__name__ = true;
var __map_reserved = {};
Object.defineProperty(js__$Boot_HaxeError.prototype,"message",{ get : function() {
	return String(this.val);
}});
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
data_FirebaseModel.instance = new data_FirebaseModel();
data_StorageMap.DEFAULT_IMG = "/assets/default.jpg";
data_StorageMap.DEFAULT_MP3 = "/assets/default.mp3";
data_StorageMap.NONEXISTING = "NONEXISTING";
data_StorageMap.instance = new data_StorageMap();
Main.main();
})();
