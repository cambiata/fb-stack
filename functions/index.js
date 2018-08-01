// Generated by Haxe 4.0.0-preview.4+1e3e5e016
if (process.version < "v4.0.0") console.warn("Module " + (typeof(module) == "undefined" ? "" : module.filename) + " requires node.js version 4.0.0 or higher");
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
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) {
		return undefined;
	}
	return x;
};
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
Math.__name__ = true;
var Server = function() { };
Server.__name__ = true;
Server.main = function() {
	admin.initializeApp(functions.config().firebase);
	var app = new js_npm_Express();
	app.get("/api/userdata",AppMiddlewares.mwErrors,AppMiddlewares.mwToken,AppMiddlewares.mwUserEmail,AppMiddlewares.mwUserData,function(req,res) {
		console.log("src/Server.hx:26:","Route /api/userdata" + " ---------------------------------");
		res.json({ errors : res.locals.errors, userData : res.locals.userData});
		res.end();
		return;
	});
	app.get("/api/userconfig",AppMiddlewares.mwErrors,AppMiddlewares.mwToken,AppMiddlewares.mwUserEmail,AppMiddlewares.mwUserData,function(req1,res1) {
		var dbpath = "user-config/" + utils__$UserEmail_UserEmail_$Impl_$.toPiped(res1.locals.userEmail);
		return admin.database().ref(dbpath).once("value",function(snap) {
			var userconfigdata = snap.val();
			console.log("src/Server.hx:36:","userconfigdata: " + userconfigdata);
			res1.json({ userData : res1.locals.userData, userConfig : userconfigdata, dbpath : dbpath, errors : res1.locals.errors});
			res1.end();
			return;
		},function(failure) {
			res1.json({ userData : res1.locals.userData, userConfig : null, dbpath : dbpath, errors : res1.locals.errors});
			res1.end();
			return;
		});
	});
	app.get("/api/content-tree",function(req2,res2) {
		return admin.database().ref("content-tree").once("value",function(snap1) {
			var tmp = snap1.val();
			res2.json({ errors : [], data : tmp});
			res2.end();
			return;
		});
	});
	app.get("/api/test/:items",function(req3,res3) {
		var items = Std.string(req3.params.items).split(",").map(function(s) {
			return StringTools.trim(s);
		}).filter(function(s1) {
			return s1.length > 0;
		});
		console.log("src/Server.hx:57:",items);
		return Promise.all(items.map(function(s2) {
			return admin.database().ref("content-item").child(s2).once("value").then(function(snap2) {
				console.log("src/Server.hx:60:","id:" + s2 + " content:" + snap2.val());
				var promises = snap2.val();
				return Promise.resolve({ id : s2, content : promises});
			});
		})).then(function(items1) {
			res3.json({ items : items1, errors : []});
			return;
		})["catch"](function(e) {
			res3.json({ items : [], errors : [e]});
			return;
		});
	});
	module.exports.app = functions.https.onRequest(app);
};
var AppMiddlewares = function() { };
AppMiddlewares.__name__ = true;
AppMiddlewares.mwErrors = function(req,res,next) {
	res.locals.errors = [];
	next();
};
AppMiddlewares.mwToken = function(req,res,next) {
	console.log("src/Server.hx:84:","Middleware mwToken ***************************");
	var token = null;
	try {
		token = req.get("Authorization").split("Bearer ")[1];
		console.log("src/Server.hx:88:","token: " + HxOverrides.substr(token,0,50) + "...");
	} catch( e ) {
		var e1 = (e instanceof js__$Boot_HaxeError) ? e.val : e;
		res.locals.errors.push("Middleware mwToken error: " + Std.string(e1));
	}
	res.locals.token = token;
	next();
};
AppMiddlewares.mwUserEmail = function(req,res,next) {
	console.log("src/Server.hx:97:","Middleware mwUserEmail ***************************");
	try {
		var token = res.locals.token;
		admin.auth().verifyIdToken(token).then(function(verified) {
			return admin.auth().getUser(verified.uid);
		}).then(function(user) {
			res.locals.userEmail = user.email;
			console.log("src/Server.hx:105:","userEmail = " + Std.string(res.locals.userEmail));
			return next();
		})["catch"](function(e) {
			res.locals.errors.push("Middleware mwUserEmail error 1: " + e);
			if((e == null ? "null" : "" + e).indexOf("Error: Credential implementation") > -1) {
				console.log("src/Server.hx:111:","localhost error!");
				res.locals.userEmail = "jonasnys@gmail.com";
			}
			return next();
		});
	} catch( e1 ) {
		var e2 = (e1 instanceof js__$Boot_HaxeError) ? e1.val : e1;
		res.locals.errors.push("Middleware mwUserEmail error 2: " + Std.string(e2));
		next();
	}
};
AppMiddlewares.mwUserData = function(req,res,next) {
	console.log("src/Server.hx:123:","Middleware mwUserData ***************************");
	try {
		var userEmail = res.locals.userEmail;
		var dbpath = "user/" + utils__$UserEmail_UserEmail_$Impl_$.toPiped(userEmail);
		console.log("src/Server.hx:128:","dbpath: " + dbpath);
		admin.database().ref(dbpath).once("value",function(snap) {
			res.locals.userData = snap.val();
			res.locals.userData.email = userEmail;
			console.log("src/Server.hx:133:","User data: " + Std.string(res.locals.userData));
			return next();
		},function(failure) {
			console.log("src/Server.hx:136:","Middleware mwUserData error 1: " + failure);
			res.locals.userData = null;
			res.locals.errors.push("" + failure);
			return next();
		});
	} catch( e ) {
		var e1 = (e instanceof js__$Boot_HaxeError) ? e.val : e;
		console.log("src/Server.hx:142:","Middleware mwUserData error 2: " + Std.string(e1));
		res.locals.userData = null;
		res.locals.errors.push("" + Std.string(e1));
		next();
	}
};
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
var StringTools = function() { };
StringTools.__name__ = true;
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	if(!(c > 8 && c < 14)) {
		return c == 32;
	} else {
		return true;
	}
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) ++r;
	if(r > 0) {
		return HxOverrides.substr(s,r,l - r);
	} else {
		return s;
	}
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) ++r;
	if(r > 0) {
		return HxOverrides.substr(s,0,l - r);
	} else {
		return s;
	}
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
var admin = require("firebase-admin");
var functions = require("firebase-functions");
var haxe_io_Bytes = function(data) {
	this.length = data.byteLength;
	this.b = new Uint8Array(data);
	this.b.bufferValue = data;
	data.hxBytes = this;
	data.bytes = this.b;
};
haxe_io_Bytes.__name__ = true;
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
var js_npm_Express = require("express");
var utils__$UserEmail_UserEmail_$Impl_$ = {};
utils__$UserEmail_UserEmail_$Impl_$.__name__ = true;
utils__$UserEmail_UserEmail_$Impl_$.makePiped = function(email) {
	return StringTools.replace(StringTools.replace(email,"@","||"),".","|");
};
utils__$UserEmail_UserEmail_$Impl_$.toPiped = function(this1) {
	return utils__$UserEmail_UserEmail_$Impl_$.makePiped(this1);
};
String.__name__ = true;
Array.__name__ = true;
Object.defineProperty(js__$Boot_HaxeError.prototype,"message",{ get : function() {
	return String(this.val);
}});
Server.main();
})();
