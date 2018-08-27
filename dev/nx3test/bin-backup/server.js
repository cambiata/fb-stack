(function (console) { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
EReg.__name__ = true;
EReg.prototype = {
	match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		if(this.r.m != null && n >= 0 && n < this.r.m.length) return this.r.m[n]; else throw new js__$Boot_HaxeError("EReg::matched");
	}
	,matchedRight: function() {
		if(this.r.m == null) throw new js__$Boot_HaxeError("No string matched");
		var sz = this.r.m.index + this.r.m[0].length;
		return HxOverrides.substr(this.r.s,sz,this.r.s.length - sz);
	}
	,replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,__class__: EReg
};
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var Lambda = function() { };
Lambda.__name__ = true;
Lambda.array = function(it) {
	var a = [];
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		a.push(i);
	}
	return a;
};
Lambda.map = function(it,f) {
	var l = new List();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(f(x));
	}
	return l;
};
Lambda.has = function(it,elt) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(x == elt) return true;
	}
	return false;
};
Lambda.foreach = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(!f(x)) return false;
	}
	return true;
};
Lambda.iter = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		f(x);
	}
};
Lambda.filter = function(it,f) {
	var l = new List();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) l.add(x);
	}
	return l;
};
Lambda.indexOf = function(it,v) {
	var i = 0;
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var v2 = $it0.next();
		if(v == v2) return i;
		i++;
	}
	return -1;
};
var List = function() {
	this.length = 0;
};
List.__name__ = true;
List.prototype = {
	add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,iterator: function() {
		return new _$List_ListIterator(this.h);
	}
	,map: function(f) {
		var b = new List();
		var l = this.h;
		while(l != null) {
			var v = l[0];
			l = l[1];
			b.add(f(v));
		}
		return b;
	}
	,__class__: List
};
var _$List_ListIterator = function(head) {
	this.head = head;
	this.val = null;
};
_$List_ListIterator.__name__ = true;
_$List_ListIterator.prototype = {
	hasNext: function() {
		return this.head != null;
	}
	,next: function() {
		this.val = this.head[0];
		this.head = this.head[1];
		return this.val;
	}
	,__class__: _$List_ListIterator
};
var Main = function() { };
Main.__name__ = true;
Main.main = function() {
	var ta = window.document.getElementById("ta");
	var btn = window.document.getElementById("btn");
	btn.addEventListener("click",function(e) {
		var qscore = StringTools.trim(ta.value);
		var parser = new nx3_qs_QSParser(qscore);
		var nscore = parser.parse();
		var target = new nx3_render_TargetPdfkit();
		var renderer = new nx3_render_Renderer(target,50,30);
		renderer.renderScore(new nx3_PScore(nscore));
		target.renderToIframe("iframe");
	});
	var svgDiv = window.document.getElementById("svgDiv");
	ta.addEventListener("keyup",function(e1) {
		var qscore1 = StringTools.trim(ta.value);
		if(Main.prevQscore == qscore1) return;
		Main.prevQscore = qscore1;
		var parser1 = new nx3_qs_QSParser(qscore1);
		var nscore1 = parser1.parse();
		var target1 = new nx3_render_TargetSvgXml("test");
		var renderer1 = new nx3_render_Renderer(target1);
		renderer1.renderScore(new nx3_PScore(nscore1));
		var svg = target1.getXml().toString();
		svgDiv.innerHTML = svg;
	});
};
var Lorem = function() { };
Lorem.__name__ = true;
var PdfDoc = function() {
	this.blobStream = window.blobStream();
	this.iframe = window.document.getElementById("iframe");
	this.before();
	this.render();
	this.after();
};
PdfDoc.__name__ = true;
PdfDoc.prototype = {
	after: function() {
		this.doc.pipe(js_node_Fs.createWriteStream("test2.pdf"));
		this.doc.end();
	}
	,before: function() {
		this.doc = new PDFDocument();
		this.doc.scale(0.4);
	}
	,render: function() {
		this.doc.fontSize(25);
		this.doc.save().moveTo(100,150).lineTo(100,250).lineTo(200,250).fill("#ff3300");
		this.doc.circle(280,200,50).fill("#6600FF");
		this.doc.scale(0.6).translate(40,130).path("m 95.72971,266.7949 c -5.57504,2.79274 -12.48498,4.1891 -20.72511,4.1891 -9.69981,0 -18.99938,-1.66998 -27.91049,-5.00757 -8.90876,-3.33996 -16.75807,-7.86163 -23.54558,-13.56975 -6.78751,-5.70339 -12.24248,-12.38094 -16.36254,-20.03029 -4.12007,-7.64934 -6.1801,-15.78458 -6.1801,-24.40572 0,-29.26234 20.72746,-61.31506 62.18472,-96.1605 -1.3349,-5.34251 -2.33313,-10.74399 -2.99941,-16.209153 -0.66627,-5.460449 -1.00058,-11.107236 -1.00058,-16.938007 0,-8.010226 0.66392,-15.871864 1.99646,-23.582532 1.3302,-7.710668 3.23955,-14.935434 5.72336,-21.674325 2.48617,-6.738864 5.54208,-12.869193 9.17715,-18.393316 3.63272,-5.5265031 7.814,-10.1708424 12.53677,-13.9306366 16.47555,22.8253826 24.71097,44.6247216 24.71097,65.3862176 0,13.480109 -3.18069,26.321 -9.54442,38.522682 -6.36138,12.20404 -16.32959,24.07079 -29.90225,35.60967 l 7.99763,38.42834 c 4.36256,-0.35616 6.78751,-0.53307 7.2725,-0.53307 6.05767,0 11.72453,1.09209 16.99586,3.27863 5.27368,2.18418 9.88109,5.18919 13.82693,9.01269 3.94349,3.82349 7.07003,8.34517 9.37727,13.56502 2.30488,5.21986 3.4585,10.86193 3.46085,16.93329 -0.002,4.36836 -0.78869,8.68011 -2.36374,12.92581 -1.57504,4.25042 -3.814,8.28856 -6.72159,12.10969 -2.90994,3.82586 -6.36373,7.34272 -10.36137,10.55766 -3.99764,3.21965 -8.42141,5.98172 -13.26896,8.28856 0,-0.24294 0.18129,0.45523 0.54385,2.09218 0.36492,1.63932 0.8193,3.79048 1.36315,6.46291 0.5462,2.67008 1.18187,5.64443 1.90935,8.92306 0.72749,3.27626 1.36316,6.43224 1.90936,9.46556 0.5462,3.03568 1.02884,5.73878 1.45497,8.10222 0.42378,2.37052 0.63567,3.97681 0.63567,4.82595 0,5.70576 -1.21248,10.92561 -3.63508,15.65957 -2.42495,4.73396 -5.69746,8.80041 -9.81988,12.19933 -4.12006,3.39656 -8.90875,6.03833 -14.36136,7.9206 -5.45497,1.88226 -11.21364,2.82339 -17.27602,2.82339 -4.60506,0 -8.90641,-0.72885 -12.90875,-2.18654 -4,-1.45769 -7.515,-3.52157 -10.54502,-6.18929 -3.02765,-2.67244 -5.422,-5.91568 -7.18068,-9.73918 -1.75632,-3.82113 -2.63449,-8.03853 -2.63449,-12.64984 0,-3.27862 0.54621,-6.37563 1.63626,-9.2863 1.09005,-2.91066 2.60623,-5.39912 4.54384,-7.463 1.93996,-2.06389 4.3037,-3.7032 7.09122,-4.91323 2.78987,-1.21474 5.81989,-1.82329 9.09004,-1.82329 2.90994,0 5.63625,0.66988 8.18127,2.00492 2.54502,1.33503 4.72748,3.06634 6.54502,5.18919 1.81754,2.12521 3.27251,4.5547 4.36491,7.2861 1.09005,2.72905 1.63626,5.49111 1.63626,8.28384 0,6.31431 -2.33314,11.4752 -7.00176,15.48267 -4.66627,4.00512 -10.51205,6.37328 -17.54441,7.09976 5.57504,2.79509 11.329,4.19146 17.2666,4.1891 4.8452,0.002 9.57268,-0.87745 14.17773,-2.64177 4.6027,-1.75961 8.62859,-4.12777 12.08474,-7.10212 3.45379,-2.97436 6.24131,-6.43932 8.3602,-10.38547 2.11889,-3.94614 3.18069,-8.16354 3.18069,-12.65692 0,-1.70299 -0.18365,-3.58526 -0.54385,-5.64914 L 95.72971,266.7949 z M 95.18821,27.488123 c -1.21483,-0.243068 -2.30724,-0.365597 -3.27486,-0.365597 -3.75986,0 -7.24661,1.912917 -10.46026,5.738777 -3.21365,3.823478 -6.00352,8.80275 -8.36726,14.933079 -2.36374,6.132684 -4.21188,13.022518 -5.54914,20.671856 -1.33254,7.649365 -2.00117,15.298698 -2.00117,22.948042 0,3.158334 0.12478,6.194011 0.36492,9.10704 0.24485,2.91538 0.67333,5.70811 1.2831,8.37819 24.73216,-21.976242 37.09942,-41.768292 37.09942,-59.373819 0,-8.378205 -3.03237,-15.723276 -9.09475,-22.037568 z m 3.814,231.850857 c 5.94467,-4.37072 10.46026,-9.16837 13.55619,-14.39058 3.09123,-5.21986 4.63802,-10.86429 4.63802,-16.93801 0,-3.76216 -0.63802,-7.4347 -1.91171,-11.01996 -1.27134,-3.57818 -3.08887,-6.76718 -5.45497,-9.56227 -2.36609,-2.78801 -5.18657,-5.03588 -8.46143,-6.7318 -3.27486,-1.69828 -6.85108,-2.54506 -10.72865,-2.54506 -0.24249,0 -0.72749,0.0307 -1.45497,0.0873 -0.72513,0.0613 -1.75633,0.15097 -3.08887,0.2689 l 12.90639,60.83151 z M 81.56374,199.26225 c -3.75749,0.48354 -7.2725,1.42468 -10.545,2.82104 -3.27251,1.39637 -6.08828,3.12767 -8.45202,5.19155 -2.36374,2.06389 -4.24249,4.43205 -5.63625,7.10212 -1.39376,2.67244 -2.09064,5.58546 -2.09064,8.7438 0,9.34762 4.96527,17.11962 14.88874,23.31127 -8.24013,-1.33503 -14.84636,-4.52167 -19.81634,-9.56227 -4.96997,-5.03823 -7.45378,-11.38084 -7.45378,-19.03255 0,-4.49101 0.93937,-8.83106 2.81812,-13.02016 1.87875,-4.18909 4.39317,-7.95598 7.54325,-11.30065 3.15479,-3.34703 6.85108,-6.23647 11.09121,-8.66595 4.24249,-2.43421 8.72748,-4.13721 13.45261,-5.10664 l -7.63507,-36.42579 c -17.08768,12.86684 -30.02468,25.49546 -38.81101,37.88112 -8.78633,12.38567 -13.1795,24.64868 -13.1795,36.79139 0,6.67755 1.48322,12.99421 4.45438,18.94292 2.97115,5.95106 6.9735,11.14026 12.00469,15.5723 5.03119,4.4344 10.85107,7.92531 17.45966,10.47274 6.60623,2.55214 13.60563,3.82821 20.9982,3.82821 4.24249,0 8.18127,-0.39627 11.81634,-1.18408 3.63743,-0.79017 7.03001,-2.03558 10.1801,-3.73386 L 81.56374,199.26225 z").fill("red","even-odd").restore();
		this.doc.text("And here is some wrapped text...",100,300);
		this.doc.font("Times-Roman",13);
		this.doc.moveDown().text(Lorem.impsum,{ width : 412, align : "justify", indent : 30, columns : 2, height : 300, ellipsis : true});
		this.doc.addPage();
		this.doc.text("Hello page 2");
		this.doc.moveTo(0,20).lineTo(100,160).quadraticCurveTo(130,200,150,120).bezierCurveTo(190,-40,200,200,300,150).lineTo(400,90).stroke();
		this.doc.moveTo(100,300).path(Lorem.clefpath).stroke();
		this.doc.moveTo(400,800).polygon([100,0],[50,100],[150,100]).stroke();
		this.doc.addPage();
		this.doc.text(Lorem.impsum);
	}
	,__class__: PdfDoc
};
Math.__name__ = true;
var Reflect = function() { };
Reflect.__name__ = true;
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
Reflect.setField = function(o,field,value) {
	o[field] = value;
};
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
};
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
};
Reflect.compare = function(a,b) {
	if(a == b) return 0; else if(a > b) return 1; else return -1;
};
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std["int"] = function(x) {
	return x | 0;
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
Std.parseFloat = function(x) {
	return parseFloat(x);
};
Std.random = function(x) {
	if(x <= 0) return 0; else return Math.floor(Math.random() * x);
};
var StringBuf = function() {
	this.b = "";
};
StringBuf.__name__ = true;
StringBuf.prototype = {
	add: function(x) {
		this.b += Std.string(x);
	}
	,addSub: function(s,pos,len) {
		if(len == null) this.b += HxOverrides.substr(s,pos,null); else this.b += HxOverrides.substr(s,pos,len);
	}
	,__class__: StringBuf
};
var StringTools = function() { };
StringTools.__name__ = true;
StringTools.htmlEscape = function(s,quotes) {
	s = s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
	if(quotes) return s.split("\"").join("&quot;").split("'").join("&#039;"); else return s;
};
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && HxOverrides.substr(s,0,start.length) == start;
};
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	return slen >= elen && HxOverrides.substr(s,slen - elen,elen) == end;
};
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	return c > 8 && c < 14 || c == 32;
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return HxOverrides.substr(s,r,l - r); else return s;
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return HxOverrides.substr(s,0,l - r); else return s;
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
};
StringTools.fastCodeAt = function(s,index) {
	return s.charCodeAt(index);
};
var Type = function() { };
Type.__name__ = true;
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw new js__$Boot_HaxeError("No such constructor " + constr);
	if(Reflect.isFunction(f)) {
		if(params == null) throw new js__$Boot_HaxeError("Constructor " + constr + " need parameters");
		return Reflect.callMethod(e,f,params);
	}
	if(params != null && params.length != 0) throw new js__$Boot_HaxeError("Constructor " + constr + " does not need parameters");
	return f;
};
var Xml = function(nodeType) {
	this.nodeType = nodeType;
	this.children = [];
	this.attributeMap = new haxe_ds_StringMap();
};
Xml.__name__ = true;
Xml.parse = function(str) {
	return haxe_xml_Parser.parse(str);
};
Xml.createElement = function(name) {
	var xml = new Xml(Xml.Element);
	if(xml.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + xml.nodeType);
	xml.nodeName = name;
	return xml;
};
Xml.createPCData = function(data) {
	var xml = new Xml(Xml.PCData);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + xml.nodeType);
	xml.nodeValue = data;
	return xml;
};
Xml.createCData = function(data) {
	var xml = new Xml(Xml.CData);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + xml.nodeType);
	xml.nodeValue = data;
	return xml;
};
Xml.createComment = function(data) {
	var xml = new Xml(Xml.Comment);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + xml.nodeType);
	xml.nodeValue = data;
	return xml;
};
Xml.createDocType = function(data) {
	var xml = new Xml(Xml.DocType);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + xml.nodeType);
	xml.nodeValue = data;
	return xml;
};
Xml.createProcessingInstruction = function(data) {
	var xml = new Xml(Xml.ProcessingInstruction);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + xml.nodeType);
	xml.nodeValue = data;
	return xml;
};
Xml.createDocument = function() {
	return new Xml(Xml.Document);
};
Xml.prototype = {
	get_nodeName: function() {
		if(this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + this.nodeType);
		return this.nodeName;
	}
	,get: function(att) {
		if(this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + this.nodeType);
		return this.attributeMap.get(att);
	}
	,set: function(att,value) {
		if(this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + this.nodeType);
		this.attributeMap.set(att,value);
	}
	,exists: function(att) {
		if(this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + this.nodeType);
		return this.attributeMap.exists(att);
	}
	,attributes: function() {
		if(this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + this.nodeType);
		return this.attributeMap.keys();
	}
	,elements: function() {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + this.nodeType);
		var ret;
		var _g = [];
		var _g1 = 0;
		var _g2 = this.children;
		while(_g1 < _g2.length) {
			var child = _g2[_g1];
			++_g1;
			if(child.nodeType == Xml.Element) _g.push(child);
		}
		ret = _g;
		return HxOverrides.iter(ret);
	}
	,elementsNamed: function(name) {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + this.nodeType);
		var ret;
		var _g = [];
		var _g1 = 0;
		var _g2 = this.children;
		while(_g1 < _g2.length) {
			var child = _g2[_g1];
			++_g1;
			if(child.nodeType == Xml.Element && (function($this) {
				var $r;
				if(child.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + child.nodeType);
				$r = child.nodeName;
				return $r;
			}(this)) == name) _g.push(child);
		}
		ret = _g;
		return HxOverrides.iter(ret);
	}
	,firstChild: function() {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + this.nodeType);
		return this.children[0];
	}
	,firstElement: function() {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + this.nodeType);
		var _g = 0;
		var _g1 = this.children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.nodeType == Xml.Element) return child;
		}
		return null;
	}
	,addChild: function(x) {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + this.nodeType);
		if(x.parent != null) x.parent.removeChild(x);
		this.children.push(x);
		x.parent = this;
	}
	,removeChild: function(x) {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + this.nodeType);
		if(HxOverrides.remove(this.children,x)) {
			x.parent = null;
			return true;
		}
		return false;
	}
	,toString: function() {
		return haxe_xml_Printer.print(this);
	}
	,__class__: Xml
};
var cx_ArrayTools = function() { };
cx_ArrayTools.__name__ = true;
cx_ArrayTools.next = function(a,item) {
	var idx = HxOverrides.indexOf(a,item,0);
	if(idx == -1) return null;
	if(idx == a.length - 1) return null;
	return a[idx + 1];
};
cx_ArrayTools.prev = function(a,item) {
	var idx = HxOverrides.indexOf(a,item,0);
	if(idx <= 0) return null;
	return a[idx - 1];
};
cx_ArrayTools.reverse = function(a) {
	var result = [];
	var _g = 0;
	while(_g < a.length) {
		var item = a[_g];
		++_g;
		result.unshift(item);
	}
	return result;
};
cx_ArrayTools.has = function(a,item) {
	return HxOverrides.indexOf(a,item,0) != -1;
};
cx_ArrayTools.nextOrNull = function(a,item) {
	return cx_ArrayTools.indexOrNull(a,HxOverrides.indexOf(a,item,0) + 1);
};
cx_ArrayTools.indexOrNull = function(a,idx) {
	if(a == null) return null;
	if(idx < 0 || idx > a.length - 1) return null; else return a[idx];
};
cx_ArrayTools.indexOrValue = function(a,idx,fallbackValue) {
	if((a == null?null:idx < 0 || idx > a.length - 1?null:a[idx]) != null) return a[idx]; else return fallbackValue;
};
cx_ArrayTools.equals = function(a,b) {
	return a.toString() == b.toString();
};
cx_ArrayTools.unique = function(arr) {
	var result = [];
	var _g = 0;
	while(_g < arr.length) {
		var item = arr[_g];
		++_g;
		if(!Lambda.has(result,item)) result.push(item);
	}
	result.sort(function(a,b) {
		return Reflect.compare(a,b);
	});
	return result;
};
cx_ArrayTools.fromIterator = function(it) {
	var result = [];
	while( it.hasNext() ) {
		var v = it.next();
		result.push(v);
	}
	return result;
};
cx_ArrayTools.fromIterables = function(it) {
	return cx_ArrayTools.fromIterator($iterator(it)());
};
cx_ArrayTools.fromHashKeys = function(it) {
	return cx_ArrayTools.fromIterator(it);
};
cx_ArrayTools.allNull = function(it) {
	var _g = 0;
	while(_g < it.length) {
		var v = it[_g];
		++_g;
		if(v != null) return false;
	}
	return true;
};
cx_ArrayTools.doOverlap = function(array1,array2) {
	var _g = 0;
	while(_g < array1.length) {
		var item = array1[_g];
		++_g;
		if(Lambda.has(array2,item)) return true;
	}
	return false;
};
cx_ArrayTools.overlap = function(array1,array2) {
	return Lambda.array(array1.filter(function(value1) {
		var ret = Lambda.has(array2,value1);
		return ret;
	}));
};
cx_ArrayTools.diff = function(array1,array2) {
	var result = [];
	var _g = 0;
	while(_g < array1.length) {
		var item = array1[_g];
		++_g;
		if(!Lambda.has(array2,item)) result.push(item);
	}
	var _g1 = 0;
	while(_g1 < array2.length) {
		var item1 = array2[_g1];
		++_g1;
		if(!Lambda.has(array1,item1)) result.push(item1);
	}
	return result;
};
cx_ArrayTools.hasNot = function(array1,array2) {
	var result = [];
	var _g = 0;
	while(_g < array2.length) {
		var item = array2[_g];
		++_g;
		if(!Lambda.has(array1,item)) result.push(item);
	}
	return result;
};
cx_ArrayTools.first = function(array) {
	return array[0];
};
cx_ArrayTools.isFirst = function(array,item) {
	return array[0] == item;
};
cx_ArrayTools.last = function(array) {
	return array[array.length - 1];
};
cx_ArrayTools.isLast = function(array,item) {
	return array[array.length - 1] == item;
};
cx_ArrayTools.secondLast = function(array) {
	return array[array.length - 2];
};
cx_ArrayTools.index = function(array,item) {
	return Lambda.indexOf(array,item);
};
cx_ArrayTools.second = function(array) {
	return array[1];
};
cx_ArrayTools.third = function(array) {
	return array[2];
};
cx_ArrayTools.fourth = function(array) {
	return array[3];
};
cx_ArrayTools.fifth = function(array) {
	return array[4];
};
cx_ArrayTools.sixth = function(array) {
	return array[5];
};
cx_ArrayTools.seventh = function(array) {
	return array[6];
};
cx_ArrayTools.eighth = function(array) {
	return array[7];
};
cx_ArrayTools.nineth = function(array) {
	return array[8];
};
cx_ArrayTools.shuffle = function(a) {
	var t = cx_ArrayTools.range(a.length);
	var arr = [];
	while(t.length > 0) {
		var pos = Std.random(t.length);
		var index = t[pos];
		t.splice(pos,1);
		arr.push(a[index]);
	}
	return arr;
};
cx_ArrayTools.countItem = function(a,item) {
	var cnt = 0;
	var _g = 0;
	while(_g < a.length) {
		var ai = a[_g];
		++_g;
		if(ai == item) cnt++;
	}
	return cnt;
};
cx_ArrayTools.sorta = function(a) {
	a.sort(function(a1,b) {
		return Reflect.compare(a1,b);
	});
	return a;
};
cx_ArrayTools.range = function(start,stop,step) {
	if(step == null) step = 1;
	if(null == stop) {
		stop = start;
		start = 0;
	}
	if((stop - start) / step == Infinity) throw new js__$Boot_HaxeError("infinite range");
	var range = [];
	var i = -1;
	var j;
	if(step < 0) while((j = start + step * ++i) > stop) range.push(j); else while((j = start + step * ++i) < stop) range.push(j);
	return range;
};
cx_ArrayTools.intsMin = function(a) {
	var r = a[0];
	var _g = 0;
	while(_g < a.length) {
		var v = a[_g];
		++_g;
		if(v < r) r = v;
	}
	return r;
};
cx_ArrayTools.trimStrings = function(a) {
	return a.map(function(s) {
		return StringTools.trim(s);
	});
};
var cx_EnumTools = function() { };
cx_EnumTools.__name__ = true;
cx_EnumTools.createFromString = function(e,str) {
	try {
		var type = str;
		var params = [];
		if(cx_StrTools.has(str,"(")) {
			var parIdx = str.indexOf("(");
			type = HxOverrides.substr(str,0,parIdx);
			params = StringTools.replace(StringTools.replace(HxOverrides.substr(str,parIdx,null),"(",""),")","").split(",");
		}
		return Type.createEnum(e,type,params);
	} catch( e1 ) {
		if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
	}
	return null;
};
var cx_GUID = function() { };
cx_GUID.__name__ = true;
cx_GUID.create = function() {
	var chars = cx_GUID.CHARS;
	var uuid = [];
	var rnd = 0;
	var r;
	var _g = 0;
	while(_g < 36) {
		var i = _g++;
		if(i == 8 || i == 13 || i == 18 || i == 23) uuid[i] = "-"; else if(i == 14) uuid[i] = "4"; else {
			if(rnd <= 2) rnd = 33554432 + Std.parseInt(Std.string(Math.random() * parseFloat("16777216"))) | 0;
			r = rnd & 15;
			rnd = rnd >> 4;
			uuid[i] = chars[i == 19?r & 3 | 8:r];
		}
	}
	return uuid.join("");
};
var cx_MapTools = function() { };
cx_MapTools.__name__ = true;
cx_MapTools.keysToArray = function(it) {
	var result = [];
	while( it.hasNext() ) {
		var v = it.next();
		result.push(v);
	}
	return result;
};
cx_MapTools.sortarray = function(a) {
	a.sort(function(a1,b) {
		return Reflect.compare(a1,b);
	});
	return a;
};
var cx_MathTools = function() { };
cx_MathTools.__name__ = true;
cx_MathTools.rotate = function(x,y,angleDegrees) {
	var angleRadians = angleDegrees * cx_MathTools.PI2Over360;
	var s = Math.sin(angleRadians);
	if(Math.abs(s) <= 0.0000000000009) s = 0;
	var c = Math.cos(angleRadians);
	var xnew = x * c - y * s;
	var ynew = x * s + y * c;
	return { x : xnew, y : ynew};
};
cx_MathTools.round2 = function(number,precision) {
	if(precision == null) precision = 6;
	number = number * Math.pow(10,precision);
	number = Math.round(number) / Math.pow(10,precision);
	return number;
};
cx_MathTools.floatEquals = function(a,b) {
	return Math.abs(a - b) <= 0.0000000000009;
};
cx_MathTools.intClamp = function(val,min,max) {
	if(val < min) return min; else if(val > max) return max; else return val;
};
var cx_StrTools = function() { };
cx_StrTools.__name__ = true;
cx_StrTools.replaceAll = function(str,search,replace) {
	if(search == replace) throw new js__$Boot_HaxeError("Error");
	while(str.indexOf(search) > -1) str = StringTools.replace(str,search,replace);
	return str;
};
cx_StrTools.splitTrim = function(str,delimiter) {
	if(delimiter == null) delimiter = ",";
	var a = str.split(delimiter);
	return a.map(function(segment) {
		return StringTools.trim(segment);
	});
};
cx_StrTools.has = function(str,substr) {
	return str.indexOf(substr) > -1;
};
cx_StrTools.pluckValue = function(str,key) {
	var keypos = str.indexOf(key);
	var keylength = key.length;
	var valuestart = keypos + keylength;
	var checkpos = valuestart;
	var valueend;
	while(checkpos < str.length && str.charAt(checkpos) != " ") checkpos++;
	valueend = checkpos;
	var value = HxOverrides.substr(str,valuestart,valueend - valuestart);
	var newstr = HxOverrides.substr(str,0,keypos) + HxOverrides.substr(str,valueend,null);
	return { value : value, str : StringTools.trim(newstr)};
};
var cx_SvgTools = function() { };
cx_SvgTools.__name__ = true;
cx_SvgTools.toSegments = function(path,correctHack) {
	if(correctHack == null) correctHack = false;
	var strings = [];
	var r = new EReg("([mlcsqtazvhMLCSQTAZVH][-0-9., ]+|[zZ])","g");
	do {
		r.match(path);
		var matched = StringTools.trim(r.matched(0));
		var typechar = matched.charAt(0);
		matched = cx_StrTools.replaceAll(matched,"" + typechar + " ",typechar);
		matched = StringTools.replace(matched,typechar,typechar + ":");
		matched = cx_StrTools.replaceAll(matched,"  "," ");
		matched = cx_StrTools.replaceAll(matched,", ",",");
		matched = cx_StrTools.replaceAll(matched," ,",",");
		matched = cx_StrTools.replaceAll(matched," ",",");
		strings.push(matched);
		path = r.matchedRight();
	} while(path.length > 0);
	var segments = [];
	var _g = 0;
	while(_g < strings.length) {
		var str = strings[_g];
		++_g;
		var t = str.split(":")[0];
		var p = str.split(":")[1].split(",").map(function(s) {
			return parseFloat(s);
		});
		switch(t) {
		case "z":case "Z":
			segments.push(cx_PathSegment.Closepath);
			break;
		case "m":
			if(correctHack) while(p.length >= 2) segments.push(segments.length == 0?cx_PathSegment.MoveAbs(p.shift(),p.shift()):cx_PathSegment.LineRel(p.shift(),p.shift())); else while(p.length >= 2) segments.push(segments.length == 0?cx_PathSegment.MoveAbs(p.shift(),p.shift()):cx_PathSegment.MoveRel(p.shift(),p.shift()));
			break;
		case "M":
			while(p.length >= 2) segments.push(cx_PathSegment.MoveAbs(p.shift(),p.shift()));
			break;
		case "h":
			while(p.length >= 1) segments.push(cx_PathSegment.HorRel(p.shift()));
			break;
		case "H":
			while(p.length >= 1) segments.push(cx_PathSegment.HorAbs(p.shift()));
			break;
		case "V":
			while(p.length >= 1) segments.push(cx_PathSegment.VertAbs(p.shift()));
			break;
		case "v":
			while(p.length >= 1) segments.push(cx_PathSegment.VertRel(p.shift()));
			break;
		case "l":
			while(p.length >= 2) segments.push(cx_PathSegment.LineRel(p.shift(),p.shift()));
			break;
		case "L":
			while(p.length >= 2) segments.push(cx_PathSegment.LineAbs(p.shift(),p.shift()));
			break;
		case "t":
			while(p.length >= 2) segments.push(cx_PathSegment.TQuadrRel(p.shift(),p.shift()));
			break;
		case "T":
			while(p.length >= 2) segments.push(cx_PathSegment.TQuadrAbs(p.shift(),p.shift()));
			break;
		case "c":
			while(p.length >= 6) segments.push(cx_PathSegment.CurveRel(p.shift(),p.shift(),p.shift(),p.shift(),p.shift(),p.shift()));
			break;
		case "C":
			while(p.length >= 6) segments.push(cx_PathSegment.CurveAbs(p.shift(),p.shift(),p.shift(),p.shift(),p.shift(),p.shift()));
			break;
		case "s":
			while(p.length >= 4) segments.push(cx_PathSegment.SCurveRel(p.shift(),p.shift(),p.shift(),p.shift()));
			break;
		case "S":
			while(p.length >= 4) segments.push(cx_PathSegment.SCurveAbs(p.shift(),p.shift(),p.shift(),p.shift()));
			break;
		case "q":
			while(p.length >= 4) segments.push(cx_PathSegment.QuadrRel(p.shift(),p.shift(),p.shift(),p.shift()));
			break;
		case "Q":
			while(p.length >= 4) segments.push(cx_PathSegment.QuadrAbs(p.shift(),p.shift(),p.shift(),p.shift()));
			break;
		case "a":
			while(p.length >= 7) segments.push(cx_PathSegment.ArcRel(p.shift(),p.shift(),p.shift(),p.shift() == 0,p.shift() == 0,p.shift(),p.shift()));
			break;
		case "A":
			while(p.length >= 7) segments.push(cx_PathSegment.ArcAbs(p.shift(),p.shift(),p.shift(),p.shift() == 0,p.shift() == 0,p.shift(),p.shift()));
			break;
		default:
			console.log("Unimplemented type " + t);
		}
	}
	return segments;
};
cx_SvgTools.getPath = function(segments) {
	var str = "";
	var _g = 0;
	while(_g < segments.length) {
		var segment = segments[_g];
		++_g;
		switch(segment[1]) {
		case 0:
			str += "z ";
			break;
		case 1:
			var a = segment[2];
			str += "H " + a + " ";
			break;
		case 2:
			var a1 = segment[2];
			str += "h " + a1 + " ";
			break;
		case 3:
			var a2 = segment[2];
			str += "V " + a2 + " ";
			break;
		case 4:
			var a3 = segment[2];
			str += "v " + a3 + " ";
			break;
		case 6:
			var y = segment[3];
			var x = segment[2];
			str += "m " + x + "," + y + " ";
			break;
		case 5:
			var y1 = segment[3];
			var x1 = segment[2];
			str += "M " + x1 + "," + y1 + " ";
			break;
		case 7:
			var b = segment[3];
			var a4 = segment[2];
			str += "L " + a4 + "," + b + " ";
			break;
		case 8:
			var b1 = segment[3];
			var a5 = segment[2];
			str += "l " + a5 + "," + b1 + " ";
			break;
		case 9:
			var y2 = segment[7];
			var x2 = segment[6];
			var y21 = segment[5];
			var x21 = segment[4];
			var y11 = segment[3];
			var x11 = segment[2];
			str += "C " + x11 + "," + y11 + " " + x21 + "," + y21 + " " + x2 + "," + y2 + " ";
			break;
		case 10:
			var y3 = segment[7];
			var x3 = segment[6];
			var y22 = segment[5];
			var x22 = segment[4];
			var y12 = segment[3];
			var x12 = segment[2];
			str += "c " + x12 + "," + y12 + " " + x22 + "," + y22 + " " + x3 + "," + y3 + " ";
			break;
		case 11:
			var y23 = segment[5];
			var x23 = segment[4];
			var y4 = segment[3];
			var x4 = segment[2];
			str += "S " + x4 + "," + y4 + " " + x23 + "," + y23 + " ";
			break;
		case 12:
			var y24 = segment[5];
			var x24 = segment[4];
			var y5 = segment[3];
			var x5 = segment[2];
			str += "s " + x5 + "," + y5 + " " + x24 + "," + y24 + " ";
			break;
		case 13:
			var y6 = segment[5];
			var x6 = segment[4];
			var y13 = segment[3];
			var x13 = segment[2];
			str += "Q " + x13 + "," + y13 + " " + x6 + "," + y6 + " ";
			break;
		case 14:
			var y7 = segment[5];
			var x7 = segment[4];
			var y14 = segment[3];
			var x14 = segment[2];
			str += "q" + x14 + "," + y14 + " " + x7 + "," + y7 + " ";
			break;
		case 15:
			var y8 = segment[3];
			var x8 = segment[2];
			str += "T " + x8 + "," + y8 + " ";
			break;
		case 16:
			var y9 = segment[3];
			var x9 = segment[2];
			str += "t " + x9 + "," + y9 + " ";
			break;
		case 17:
			var y10 = segment[8];
			var x10 = segment[7];
			var sweep = segment[6];
			var large = segment[5];
			var xrot = segment[4];
			var ry = segment[3];
			var rx = segment[2];
			str += "A " + rx + "," + ry + " " + xrot + " " + (large?"1":"0") + "," + (sweep?"1":"0") + " " + x10 + "," + y10 + " ";
			break;
		case 18:
			var y15 = segment[8];
			var x15 = segment[7];
			var sweep1 = segment[6];
			var large1 = segment[5];
			var xrot1 = segment[4];
			var ry1 = segment[3];
			var rx1 = segment[2];
			str += "a " + rx1 + "," + ry1 + " " + xrot1 + " " + (large1?"1":"0") + "," + (sweep1?"1":"0") + " " + x15 + "," + y15 + " ";
			break;
		}
	}
	return str;
};
cx_SvgTools.moveSegments = function(segments,moveX,moveY) {
	if(moveY == null) moveY = 50.0;
	if(moveX == null) moveX = 10.0;
	return segments.map(function(s) {
		switch(s[1]) {
		case 0:
			return cx_PathSegment.Closepath;
		case 5:
			var y = s[3];
			var x = s[2];
			return cx_PathSegment.MoveAbs(x + moveX,y + moveY);
		case 6:
			var y1 = s[3];
			var x1 = s[2];
			return s;
		case 7:
			var y2 = s[3];
			var x2 = s[2];
			return cx_PathSegment.LineAbs(x2 + moveX,y2 + moveY);
		case 8:
			var y3 = s[3];
			var x3 = s[2];
			return s;
		case 15:
			var y4 = s[3];
			var x4 = s[2];
			return cx_PathSegment.TQuadrAbs(x4 + moveX,y4 + moveY);
		case 16:
			var y5 = s[3];
			var x5 = s[2];
			return s;
		case 11:
			var y21 = s[5];
			var x21 = s[4];
			var y11 = s[3];
			var x11 = s[2];
			return cx_PathSegment.SCurveAbs(x11 + moveX,y11 + moveY,x21 + moveX,y21 + moveY);
		case 12:
			var y22 = s[5];
			var x22 = s[4];
			var y6 = s[3];
			var x6 = s[2];
			return s;
		case 13:
			var y7 = s[5];
			var x7 = s[4];
			var y12 = s[3];
			var x12 = s[2];
			return cx_PathSegment.QuadrAbs(x12 + moveX,y12 + moveY,x7 + moveX,y7 + moveY);
		case 14:
			var y8 = s[5];
			var x8 = s[4];
			var y13 = s[3];
			var x13 = s[2];
			return s;
		case 9:
			var y9 = s[7];
			var x9 = s[6];
			var y23 = s[5];
			var x23 = s[4];
			var y14 = s[3];
			var x14 = s[2];
			return cx_PathSegment.CurveAbs(x14 + moveX,y14 + moveY,x23 + moveX,y23 + moveY,x9 + moveX,y9 + moveY);
		case 10:
			var y10 = s[7];
			var x10 = s[6];
			var y24 = s[5];
			var x24 = s[4];
			var y15 = s[3];
			var x15 = s[2];
			return s;
		case 17:
			var y16 = s[8];
			var x16 = s[7];
			var sweep = s[6];
			var large = s[5];
			var xrot = s[4];
			var ry = s[3];
			var rx = s[2];
			return cx_PathSegment.ArcAbs(rx,ry,xrot,large,sweep,x16 + moveX,y16 + moveY);
		case 18:
			var y17 = s[8];
			var x17 = s[7];
			var sweep1 = s[6];
			var large1 = s[5];
			var xrot1 = s[4];
			var ry1 = s[3];
			var rx1 = s[2];
			return s;
		default:
			return cx_PathSegment.MoveRel(0,0);
		}
	});
};
cx_SvgTools.scaleSegments = function(segments,scaleX,scaleY) {
	if(scaleY == null) scaleY = 0.5;
	if(scaleX == null) scaleX = 0.5;
	return segments.map(function(s) {
		switch(s[1]) {
		case 0:
			return cx_PathSegment.Closepath;
		case 5:
			var y = s[3];
			var x = s[2];
			return cx_PathSegment.MoveAbs(x * scaleX,y * scaleY);
		case 6:
			var y1 = s[3];
			var x1 = s[2];
			return cx_PathSegment.MoveRel(x1 * scaleX,y1 * scaleY);
		case 7:
			var y2 = s[3];
			var x2 = s[2];
			return cx_PathSegment.LineAbs(x2 * scaleX,y2 * scaleY);
		case 8:
			var y3 = s[3];
			var x3 = s[2];
			return cx_PathSegment.LineRel(x3 * scaleX,y3 * scaleY);
		case 15:
			var y4 = s[3];
			var x4 = s[2];
			return cx_PathSegment.TQuadrAbs(x4 * scaleX,y4 * scaleY);
		case 16:
			var y5 = s[3];
			var x5 = s[2];
			return cx_PathSegment.TQuadrRel(x5 * scaleX,y5 * scaleY);
		case 13:
			var y6 = s[5];
			var x6 = s[4];
			var y11 = s[3];
			var x11 = s[2];
			return cx_PathSegment.QuadrAbs(x11 * scaleX,y11 * scaleY,x6 * scaleX,y6 * scaleY);
		case 14:
			var y7 = s[5];
			var x7 = s[4];
			var y12 = s[3];
			var x12 = s[2];
			return cx_PathSegment.QuadrAbs(x12 * scaleX,y12 * scaleY,x7 * scaleX,y7 * scaleY);
		case 11:
			var y21 = s[5];
			var x21 = s[4];
			var y13 = s[3];
			var x13 = s[2];
			return cx_PathSegment.SCurveAbs(x13 * scaleX,y13 * scaleY,x21 * scaleX,y21 * scaleY);
		case 12:
			var y22 = s[5];
			var x22 = s[4];
			var y14 = s[3];
			var x14 = s[2];
			return cx_PathSegment.SCurveAbs(x14 * scaleX,y14 * scaleY,x22 * scaleX,y22 * scaleY);
		case 9:
			var y8 = s[7];
			var x8 = s[6];
			var y23 = s[5];
			var x23 = s[4];
			var y15 = s[3];
			var x15 = s[2];
			return cx_PathSegment.CurveAbs(x15 * scaleX,y15 * scaleY,x23 * scaleX,y23 * scaleY,x8 * scaleX,y8 * scaleY);
		case 10:
			var y9 = s[7];
			var x9 = s[6];
			var y24 = s[5];
			var x24 = s[4];
			var y16 = s[3];
			var x16 = s[2];
			return cx_PathSegment.CurveRel(x16 * scaleX,y16 * scaleY,x24 * scaleX,y24 * scaleY,x9 * scaleX,y9 * scaleY);
		case 17:
			var y10 = s[8];
			var x10 = s[7];
			var sweep = s[6];
			var large = s[5];
			var xrot = s[4];
			var ry = s[3];
			var rx = s[2];
			return cx_PathSegment.ArcAbs(rx * scaleX,ry * scaleY,xrot,large,sweep,x10 * scaleX,y10 * scaleY);
		case 18:
			var y17 = s[8];
			var x17 = s[7];
			var sweep1 = s[6];
			var large1 = s[5];
			var xrot1 = s[4];
			var ry1 = s[3];
			var rx1 = s[2];
			return cx_PathSegment.ArcRel(rx1 * scaleX,ry1 * scaleY,xrot1,large1,sweep1,x17 * scaleX,y17 * scaleY);
		default:
			return cx_PathSegment.MoveRel(0,0);
		}
	});
};
cx_SvgTools.rotateSegments = function(segments,angle) {
	if(angle == null) angle = 45;
	return segments.map(function(s) {
		switch(s[1]) {
		case 0:
			return cx_PathSegment.Closepath;
		case 5:
			var y = s[3];
			var x = s[2];
			var rot = cx_MathTools.rotate(x,y,angle);
			return cx_PathSegment.MoveAbs(rot.x,rot.y);
		case 6:
			var y1 = s[3];
			var x1 = s[2];
			var rot1 = cx_MathTools.rotate(x1,y1,angle);
			return cx_PathSegment.MoveRel(rot1.x,rot1.y);
		case 7:
			var y2 = s[3];
			var x2 = s[2];
			var rot2 = cx_MathTools.rotate(x2,y2,angle);
			return cx_PathSegment.LineAbs(rot2.x,rot2.y);
		case 8:
			var y3 = s[3];
			var x3 = s[2];
			var rot3 = cx_MathTools.rotate(x3,y3,angle);
			return cx_PathSegment.LineRel(rot3.x,rot3.y);
		case 15:
			var y4 = s[3];
			var x4 = s[2];
			var rot4 = cx_MathTools.rotate(x4,y4,angle);
			return cx_PathSegment.TQuadrAbs(rot4.x,rot4.y);
		case 16:
			var y5 = s[3];
			var x5 = s[2];
			var rot5 = cx_MathTools.rotate(x5,y5,angle);
			return cx_PathSegment.TQuadrRel(rot5.x,rot5.y);
		case 13:
			var y6 = s[5];
			var x6 = s[4];
			var y11 = s[3];
			var x11 = s[2];
			var rot11 = cx_MathTools.rotate(x11,y11,angle);
			var rot6 = cx_MathTools.rotate(x6,y6,angle);
			return cx_PathSegment.QuadrAbs(rot11.x,rot11.y,rot6.x,rot6.y);
		case 14:
			var y7 = s[5];
			var x7 = s[4];
			var y12 = s[3];
			var x12 = s[2];
			var rot12 = cx_MathTools.rotate(x12,y12,angle);
			var rot7 = cx_MathTools.rotate(x7,y7,angle);
			return cx_PathSegment.QuadrRel(rot12.x,rot12.y,rot7.x,rot7.y);
		case 11:
			var y8 = s[5];
			var x8 = s[4];
			var y13 = s[3];
			var x13 = s[2];
			var rot13 = cx_MathTools.rotate(x13,y13,angle);
			var rot8 = cx_MathTools.rotate(x8,y8,angle);
			return cx_PathSegment.SCurveAbs(rot13.x,rot13.y,rot8.x,rot8.y);
		case 12:
			var y9 = s[5];
			var x9 = s[4];
			var y14 = s[3];
			var x14 = s[2];
			var rot14 = cx_MathTools.rotate(x14,y14,angle);
			var rot9 = cx_MathTools.rotate(x9,y9,angle);
			return cx_PathSegment.SCurveRel(rot14.x,rot14.y,rot9.x,rot9.y);
		case 9:
			var y10 = s[7];
			var x10 = s[6];
			var y21 = s[5];
			var x21 = s[4];
			var y15 = s[3];
			var x15 = s[2];
			var rot15 = cx_MathTools.rotate(x15,y15,angle);
			var rot21 = cx_MathTools.rotate(x21,y21,angle);
			var rot10 = cx_MathTools.rotate(x10,y10,angle);
			return cx_PathSegment.CurveAbs(rot15.x,rot15.y,rot21.x,rot21.y,rot10.x,rot10.y);
		case 10:
			var y16 = s[7];
			var x16 = s[6];
			var y22 = s[5];
			var x22 = s[4];
			var y17 = s[3];
			var x17 = s[2];
			var rot16 = cx_MathTools.rotate(x17,y17,angle);
			var rot22 = cx_MathTools.rotate(x22,y22,angle);
			var rot17 = cx_MathTools.rotate(x16,y16,angle);
			return cx_PathSegment.CurveRel(rot16.x,rot16.y,rot22.x,rot22.y,rot17.x,rot17.y);
		case 17:
			var y18 = s[8];
			var x18 = s[7];
			var sweep = s[6];
			var large = s[5];
			var xrot = s[4];
			var ry = s[3];
			var rx = s[2];
			throw new js__$Boot_HaxeError("roatation of arc elements not implemented");
			var rotR = cx_MathTools.rotate(rx,ry,angle);
			var rot18 = cx_MathTools.rotate(x18,y18,angle);
			return cx_PathSegment.ArcAbs(rotR.x,rotR.y,xrot,large,sweep,rot18.x,rot18.y);
		case 18:
			var y19 = s[8];
			var x19 = s[7];
			var sweep1 = s[6];
			var large1 = s[5];
			var xrot1 = s[4];
			var ry1 = s[3];
			var rx1 = s[2];
			throw new js__$Boot_HaxeError("roatation of arc elements not implemented");
			var rotR1 = cx_MathTools.rotate(rx1,ry1,angle);
			var rot19 = cx_MathTools.rotate(x19,y19,angle);
			return cx_PathSegment.ArcRel(rotR1.x,rotR1.y,xrot1,large1,sweep1,rot19.x,rot19.y);
		default:
			return cx_PathSegment.MoveRel(0,0);
		}
	});
};
cx_SvgTools.testParsePath = function() {
	var segments = cx_SvgTools.toSegments(cx_SvgTest.GCLEF);
	var _g = 0;
	while(_g < segments.length) {
		var segment = segments[_g];
		++_g;
		console.log(segment);
	}
};
cx_SvgTools.createTestSvg = function(segments) {
	var path = cx_SvgTools.getPath(segments);
	return "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\"><path d=\"" + path + "\" fill=\"red\" stroke=\"blue\" stroke-width=\"1\"/></svg>";
};
var cx_PathSegment = { __ename__ : true, __constructs__ : ["Closepath","HorAbs","HorRel","VertAbs","VertRel","MoveAbs","MoveRel","LineAbs","LineRel","CurveAbs","CurveRel","SCurveAbs","SCurveRel","QuadrAbs","QuadrRel","TQuadrAbs","TQuadrRel","ArcAbs","ArcRel"] };
cx_PathSegment.Closepath = ["Closepath",0];
cx_PathSegment.Closepath.toString = $estr;
cx_PathSegment.Closepath.__enum__ = cx_PathSegment;
cx_PathSegment.HorAbs = function(x) { var $x = ["HorAbs",1,x]; $x.__enum__ = cx_PathSegment; $x.toString = $estr; return $x; };
cx_PathSegment.HorRel = function(x) { var $x = ["HorRel",2,x]; $x.__enum__ = cx_PathSegment; $x.toString = $estr; return $x; };
cx_PathSegment.VertAbs = function(y) { var $x = ["VertAbs",3,y]; $x.__enum__ = cx_PathSegment; $x.toString = $estr; return $x; };
cx_PathSegment.VertRel = function(y) { var $x = ["VertRel",4,y]; $x.__enum__ = cx_PathSegment; $x.toString = $estr; return $x; };
cx_PathSegment.MoveAbs = function(x,y) { var $x = ["MoveAbs",5,x,y]; $x.__enum__ = cx_PathSegment; $x.toString = $estr; return $x; };
cx_PathSegment.MoveRel = function(x,y) { var $x = ["MoveRel",6,x,y]; $x.__enum__ = cx_PathSegment; $x.toString = $estr; return $x; };
cx_PathSegment.LineAbs = function(x,y) { var $x = ["LineAbs",7,x,y]; $x.__enum__ = cx_PathSegment; $x.toString = $estr; return $x; };
cx_PathSegment.LineRel = function(x,y) { var $x = ["LineRel",8,x,y]; $x.__enum__ = cx_PathSegment; $x.toString = $estr; return $x; };
cx_PathSegment.CurveAbs = function(x1,y1,x2,y2,x,y) { var $x = ["CurveAbs",9,x1,y1,x2,y2,x,y]; $x.__enum__ = cx_PathSegment; $x.toString = $estr; return $x; };
cx_PathSegment.CurveRel = function(x1,y1,x2,y2,x,y) { var $x = ["CurveRel",10,x1,y1,x2,y2,x,y]; $x.__enum__ = cx_PathSegment; $x.toString = $estr; return $x; };
cx_PathSegment.SCurveAbs = function(x,y,x2,y2) { var $x = ["SCurveAbs",11,x,y,x2,y2]; $x.__enum__ = cx_PathSegment; $x.toString = $estr; return $x; };
cx_PathSegment.SCurveRel = function(x,y,x2,y2) { var $x = ["SCurveRel",12,x,y,x2,y2]; $x.__enum__ = cx_PathSegment; $x.toString = $estr; return $x; };
cx_PathSegment.QuadrAbs = function(x1,y1,x,y) { var $x = ["QuadrAbs",13,x1,y1,x,y]; $x.__enum__ = cx_PathSegment; $x.toString = $estr; return $x; };
cx_PathSegment.QuadrRel = function(x1,y1,x,y) { var $x = ["QuadrRel",14,x1,y1,x,y]; $x.__enum__ = cx_PathSegment; $x.toString = $estr; return $x; };
cx_PathSegment.TQuadrAbs = function(x,y) { var $x = ["TQuadrAbs",15,x,y]; $x.__enum__ = cx_PathSegment; $x.toString = $estr; return $x; };
cx_PathSegment.TQuadrRel = function(x,y) { var $x = ["TQuadrRel",16,x,y]; $x.__enum__ = cx_PathSegment; $x.toString = $estr; return $x; };
cx_PathSegment.ArcAbs = function(rx,ry,xrot,large,sweep,x,y) { var $x = ["ArcAbs",17,rx,ry,xrot,large,sweep,x,y]; $x.__enum__ = cx_PathSegment; $x.toString = $estr; return $x; };
cx_PathSegment.ArcRel = function(rx,ry,xrot,large,sweep,x,y) { var $x = ["ArcRel",18,rx,ry,xrot,large,sweep,x,y]; $x.__enum__ = cx_PathSegment; $x.toString = $estr; return $x; };
var cx_SvgTest = function() { };
cx_SvgTest.__name__ = true;
var haxe_IMap = function() { };
haxe_IMap.__name__ = true;
haxe_IMap.prototype = {
	__class__: haxe_IMap
};
var haxe__$Int64__$_$_$Int64 = function(high,low) {
	this.high = high;
	this.low = low;
};
haxe__$Int64__$_$_$Int64.__name__ = true;
haxe__$Int64__$_$_$Int64.prototype = {
	__class__: haxe__$Int64__$_$_$Int64
};
var haxe_ds_IntMap = function() {
	this.h = { };
};
haxe_ds_IntMap.__name__ = true;
haxe_ds_IntMap.__interfaces__ = [haxe_IMap];
haxe_ds_IntMap.prototype = {
	set: function(key,value) {
		this.h[key] = value;
	}
	,get: function(key) {
		return this.h[key];
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key | 0);
		}
		return HxOverrides.iter(a);
	}
	,__class__: haxe_ds_IntMap
};
var haxe_ds_ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
haxe_ds_ObjectMap.__name__ = true;
haxe_ds_ObjectMap.__interfaces__ = [haxe_IMap];
haxe_ds_ObjectMap.prototype = {
	set: function(key,value) {
		var id = key.__id__ || (key.__id__ = ++haxe_ds_ObjectMap.count);
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,get: function(key) {
		return this.h[key.__id__];
	}
	,__class__: haxe_ds_ObjectMap
};
var haxe_ds_StringMap = function() {
	this.h = { };
};
haxe_ds_StringMap.__name__ = true;
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	set: function(key,value) {
		if(__map_reserved[key] != null) this.setReserved(key,value); else this.h[key] = value;
	}
	,get: function(key) {
		if(__map_reserved[key] != null) return this.getReserved(key);
		return this.h[key];
	}
	,exists: function(key) {
		if(__map_reserved[key] != null) return this.existsReserved(key);
		return this.h.hasOwnProperty(key);
	}
	,setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) return null; else return this.rh["$" + key];
	}
	,existsReserved: function(key) {
		if(this.rh == null) return false;
		return this.rh.hasOwnProperty("$" + key);
	}
	,keys: function() {
		var _this = this.arrayKeys();
		return HxOverrides.iter(_this);
	}
	,arrayKeys: function() {
		var out = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) out.push(key);
		}
		if(this.rh != null) {
			for( var key in this.rh ) {
			if(key.charCodeAt(0) == 36) out.push(key.substr(1));
			}
		}
		return out;
	}
	,__class__: haxe_ds_StringMap
};
var haxe_io_Error = { __ename__ : true, __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] };
haxe_io_Error.Blocked = ["Blocked",0];
haxe_io_Error.Blocked.toString = $estr;
haxe_io_Error.Blocked.__enum__ = haxe_io_Error;
haxe_io_Error.Overflow = ["Overflow",1];
haxe_io_Error.Overflow.toString = $estr;
haxe_io_Error.Overflow.__enum__ = haxe_io_Error;
haxe_io_Error.OutsideBounds = ["OutsideBounds",2];
haxe_io_Error.OutsideBounds.toString = $estr;
haxe_io_Error.OutsideBounds.__enum__ = haxe_io_Error;
haxe_io_Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe_io_Error; $x.toString = $estr; return $x; };
var haxe_io_FPHelper = function() { };
haxe_io_FPHelper.__name__ = true;
haxe_io_FPHelper.i32ToFloat = function(i) {
	var sign = 1 - (i >>> 31 << 1);
	var exp = i >>> 23 & 255;
	var sig = i & 8388607;
	if(sig == 0 && exp == 0) return 0.0;
	return sign * (1 + Math.pow(2,-23) * sig) * Math.pow(2,exp - 127);
};
haxe_io_FPHelper.floatToI32 = function(f) {
	if(f == 0) return 0;
	var af;
	if(f < 0) af = -f; else af = f;
	var exp = Math.floor(Math.log(af) / 0.6931471805599453);
	if(exp < -127) exp = -127; else if(exp > 128) exp = 128;
	var sig = Math.round((af / Math.pow(2,exp) - 1) * 8388608) & 8388607;
	return (f < 0?-2147483648:0) | exp + 127 << 23 | sig;
};
haxe_io_FPHelper.i64ToDouble = function(low,high) {
	var sign = 1 - (high >>> 31 << 1);
	var exp = (high >> 20 & 2047) - 1023;
	var sig = (high & 1048575) * 4294967296. + (low >>> 31) * 2147483648. + (low & 2147483647);
	if(sig == 0 && exp == -1023) return 0.0;
	return sign * (1.0 + Math.pow(2,-52) * sig) * Math.pow(2,exp);
};
haxe_io_FPHelper.doubleToI64 = function(v) {
	var i64 = haxe_io_FPHelper.i64tmp;
	if(v == 0) {
		i64.low = 0;
		i64.high = 0;
	} else {
		var av;
		if(v < 0) av = -v; else av = v;
		var exp = Math.floor(Math.log(av) / 0.6931471805599453);
		var sig;
		var v1 = (av / Math.pow(2,exp) - 1) * 4503599627370496.;
		sig = Math.round(v1);
		var sig_l = sig | 0;
		var sig_h = sig / 4294967296.0 | 0;
		i64.low = sig_l;
		i64.high = (v < 0?-2147483648:0) | exp + 1023 << 20 | sig_h;
	}
	return i64;
};
var haxe_xml_Parser = function() { };
haxe_xml_Parser.__name__ = true;
haxe_xml_Parser.parse = function(str,strict) {
	if(strict == null) strict = false;
	var doc = Xml.createDocument();
	haxe_xml_Parser.doParse(str,strict,0,doc);
	return doc;
};
haxe_xml_Parser.doParse = function(str,strict,p,parent) {
	if(p == null) p = 0;
	var xml = null;
	var state = 1;
	var next = 1;
	var aname = null;
	var start = 0;
	var nsubs = 0;
	var nbrackets = 0;
	var c = str.charCodeAt(p);
	var buf = new StringBuf();
	var escapeNext = 1;
	var attrValQuote = -1;
	while(!(c != c)) {
		switch(state) {
		case 0:
			switch(c) {
			case 10:case 13:case 9:case 32:
				break;
			default:
				state = next;
				continue;
			}
			break;
		case 1:
			switch(c) {
			case 60:
				state = 0;
				next = 2;
				break;
			default:
				start = p;
				state = 13;
				continue;
			}
			break;
		case 13:
			if(c == 60) {
				buf.addSub(str,start,p - start);
				var child = Xml.createPCData(buf.b);
				buf = new StringBuf();
				parent.addChild(child);
				nsubs++;
				state = 0;
				next = 2;
			} else if(c == 38) {
				buf.addSub(str,start,p - start);
				state = 18;
				escapeNext = 13;
				start = p + 1;
			}
			break;
		case 17:
			if(c == 93 && str.charCodeAt(p + 1) == 93 && str.charCodeAt(p + 2) == 62) {
				var child1 = Xml.createCData(HxOverrides.substr(str,start,p - start));
				parent.addChild(child1);
				nsubs++;
				p += 2;
				state = 1;
			}
			break;
		case 2:
			switch(c) {
			case 33:
				if(str.charCodeAt(p + 1) == 91) {
					p += 2;
					if(HxOverrides.substr(str,p,6).toUpperCase() != "CDATA[") throw new js__$Boot_HaxeError("Expected <![CDATA[");
					p += 5;
					state = 17;
					start = p + 1;
				} else if(str.charCodeAt(p + 1) == 68 || str.charCodeAt(p + 1) == 100) {
					if(HxOverrides.substr(str,p + 2,6).toUpperCase() != "OCTYPE") throw new js__$Boot_HaxeError("Expected <!DOCTYPE");
					p += 8;
					state = 16;
					start = p + 1;
				} else if(str.charCodeAt(p + 1) != 45 || str.charCodeAt(p + 2) != 45) throw new js__$Boot_HaxeError("Expected <!--"); else {
					p += 2;
					state = 15;
					start = p + 1;
				}
				break;
			case 63:
				state = 14;
				start = p;
				break;
			case 47:
				if(parent == null) throw new js__$Boot_HaxeError("Expected node name");
				start = p + 1;
				state = 0;
				next = 10;
				break;
			default:
				state = 3;
				start = p;
				continue;
			}
			break;
		case 3:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				if(p == start) throw new js__$Boot_HaxeError("Expected node name");
				xml = Xml.createElement(HxOverrides.substr(str,start,p - start));
				parent.addChild(xml);
				nsubs++;
				state = 0;
				next = 4;
				continue;
			}
			break;
		case 4:
			switch(c) {
			case 47:
				state = 11;
				break;
			case 62:
				state = 9;
				break;
			default:
				state = 5;
				start = p;
				continue;
			}
			break;
		case 5:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				var tmp;
				if(start == p) throw new js__$Boot_HaxeError("Expected attribute name");
				tmp = HxOverrides.substr(str,start,p - start);
				aname = tmp;
				if(xml.exists(aname)) throw new js__$Boot_HaxeError("Duplicate attribute");
				state = 0;
				next = 6;
				continue;
			}
			break;
		case 6:
			switch(c) {
			case 61:
				state = 0;
				next = 7;
				break;
			default:
				throw new js__$Boot_HaxeError("Expected =");
			}
			break;
		case 7:
			switch(c) {
			case 34:case 39:
				buf = new StringBuf();
				state = 8;
				start = p + 1;
				attrValQuote = c;
				break;
			default:
				throw new js__$Boot_HaxeError("Expected \"");
			}
			break;
		case 8:
			switch(c) {
			case 38:
				buf.addSub(str,start,p - start);
				state = 18;
				escapeNext = 8;
				start = p + 1;
				break;
			case 62:
				if(strict) throw new js__$Boot_HaxeError("Invalid unescaped " + String.fromCharCode(c) + " in attribute value"); else if(c == attrValQuote) {
					buf.addSub(str,start,p - start);
					var val = buf.b;
					buf = new StringBuf();
					xml.set(aname,val);
					state = 0;
					next = 4;
				}
				break;
			case 60:
				if(strict) throw new js__$Boot_HaxeError("Invalid unescaped " + String.fromCharCode(c) + " in attribute value"); else if(c == attrValQuote) {
					buf.addSub(str,start,p - start);
					var val1 = buf.b;
					buf = new StringBuf();
					xml.set(aname,val1);
					state = 0;
					next = 4;
				}
				break;
			default:
				if(c == attrValQuote) {
					buf.addSub(str,start,p - start);
					var val2 = buf.b;
					buf = new StringBuf();
					xml.set(aname,val2);
					state = 0;
					next = 4;
				}
			}
			break;
		case 9:
			p = haxe_xml_Parser.doParse(str,strict,p,xml);
			start = p;
			state = 1;
			break;
		case 11:
			switch(c) {
			case 62:
				state = 1;
				break;
			default:
				throw new js__$Boot_HaxeError("Expected >");
			}
			break;
		case 12:
			switch(c) {
			case 62:
				if(nsubs == 0) parent.addChild(Xml.createPCData(""));
				return p;
			default:
				throw new js__$Boot_HaxeError("Expected >");
			}
			break;
		case 10:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				if(start == p) throw new js__$Boot_HaxeError("Expected node name");
				var v = HxOverrides.substr(str,start,p - start);
				if(v != (function($this) {
					var $r;
					if(parent.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + parent.nodeType);
					$r = parent.nodeName;
					return $r;
				}(this))) throw new js__$Boot_HaxeError("Expected </" + (function($this) {
					var $r;
					if(parent.nodeType != Xml.Element) throw "Bad node type, expected Element but found " + parent.nodeType;
					$r = parent.nodeName;
					return $r;
				}(this)) + ">");
				state = 0;
				next = 12;
				continue;
			}
			break;
		case 15:
			if(c == 45 && str.charCodeAt(p + 1) == 45 && str.charCodeAt(p + 2) == 62) {
				var xml1 = Xml.createComment(HxOverrides.substr(str,start,p - start));
				parent.addChild(xml1);
				nsubs++;
				p += 2;
				state = 1;
			}
			break;
		case 16:
			if(c == 91) nbrackets++; else if(c == 93) nbrackets--; else if(c == 62 && nbrackets == 0) {
				var xml2 = Xml.createDocType(HxOverrides.substr(str,start,p - start));
				parent.addChild(xml2);
				nsubs++;
				state = 1;
			}
			break;
		case 14:
			if(c == 63 && str.charCodeAt(p + 1) == 62) {
				p++;
				var str1 = HxOverrides.substr(str,start + 1,p - start - 2);
				var xml3 = Xml.createProcessingInstruction(str1);
				parent.addChild(xml3);
				nsubs++;
				state = 1;
			}
			break;
		case 18:
			if(c == 59) {
				var s = HxOverrides.substr(str,start,p - start);
				if(s.charCodeAt(0) == 35) {
					var c1;
					if(s.charCodeAt(1) == 120) c1 = Std.parseInt("0" + HxOverrides.substr(s,1,s.length - 1)); else c1 = Std.parseInt(HxOverrides.substr(s,1,s.length - 1));
					buf.b += String.fromCharCode(c1);
				} else if(!haxe_xml_Parser.escapes.exists(s)) {
					if(strict) throw new js__$Boot_HaxeError("Undefined entity: " + s);
					buf.b += Std.string("&" + s + ";");
				} else buf.add(haxe_xml_Parser.escapes.get(s));
				start = p + 1;
				state = escapeNext;
			} else if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45) && c != 35) {
				if(strict) throw new js__$Boot_HaxeError("Invalid character in entity: " + String.fromCharCode(c));
				buf.b += "&";
				buf.addSub(str,start,p - start);
				p--;
				start = p + 1;
				state = escapeNext;
			}
			break;
		}
		c = StringTools.fastCodeAt(str,++p);
	}
	if(state == 1) {
		start = p;
		state = 13;
	}
	if(state == 13) {
		if(p != start || nsubs == 0) {
			buf.addSub(str,start,p - start);
			var xml4 = Xml.createPCData(buf.b);
			parent.addChild(xml4);
			nsubs++;
		}
		return p;
	}
	if(!strict && state == 18 && escapeNext == 13) {
		buf.b += "&";
		buf.addSub(str,start,p - start);
		var xml5 = Xml.createPCData(buf.b);
		parent.addChild(xml5);
		nsubs++;
		return p;
	}
	throw new js__$Boot_HaxeError("Unexpected end");
};
var haxe_xml_Printer = function(pretty) {
	this.output = new StringBuf();
	this.pretty = pretty;
};
haxe_xml_Printer.__name__ = true;
haxe_xml_Printer.print = function(xml,pretty) {
	if(pretty == null) pretty = false;
	var printer = new haxe_xml_Printer(pretty);
	printer.writeNode(xml,"");
	return printer.output.b;
};
haxe_xml_Printer.prototype = {
	writeNode: function(value,tabs) {
		var _g = value.nodeType;
		switch(_g) {
		case 2:
			this.output.b += Std.string(tabs + "<![CDATA[");
			this.write(StringTools.trim((function($this) {
				var $r;
				if(value.nodeType == Xml.Document || value.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + value.nodeType);
				$r = value.nodeValue;
				return $r;
			}(this))));
			this.output.b += "]]>";
			if(this.pretty) this.output.b += "";
			break;
		case 3:
			var commentContent;
			if(value.nodeType == Xml.Document || value.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + value.nodeType);
			commentContent = value.nodeValue;
			commentContent = new EReg("[\n\r\t]+","g").replace(commentContent,"");
			commentContent = "<!--" + commentContent + "-->";
			if(tabs == null) this.output.b += "null"; else this.output.b += "" + tabs;
			this.write(StringTools.trim(commentContent));
			if(this.pretty) this.output.b += "";
			break;
		case 6:
			var $it0 = (function($this) {
				var $r;
				if(value.nodeType != Xml.Document && value.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + value.nodeType);
				$r = HxOverrides.iter(value.children);
				return $r;
			}(this));
			while( $it0.hasNext() ) {
				var child = $it0.next();
				this.writeNode(child,tabs);
			}
			break;
		case 0:
			this.output.b += Std.string(tabs + "<");
			this.write((function($this) {
				var $r;
				if(value.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + value.nodeType);
				$r = value.nodeName;
				return $r;
			}(this)));
			var $it1 = value.attributes();
			while( $it1.hasNext() ) {
				var attribute = $it1.next();
				this.output.b += Std.string(" " + attribute + "=\"");
				this.write(StringTools.htmlEscape(value.get(attribute),true));
				this.output.b += "\"";
			}
			if(this.hasChildren(value)) {
				this.output.b += ">";
				if(this.pretty) this.output.b += "";
				var $it2 = (function($this) {
					var $r;
					if(value.nodeType != Xml.Document && value.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + value.nodeType);
					$r = HxOverrides.iter(value.children);
					return $r;
				}(this));
				while( $it2.hasNext() ) {
					var child1 = $it2.next();
					this.writeNode(child1,this.pretty?tabs + "\t":tabs);
				}
				this.output.b += Std.string(tabs + "</");
				this.write((function($this) {
					var $r;
					if(value.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + value.nodeType);
					$r = value.nodeName;
					return $r;
				}(this)));
				this.output.b += ">";
				if(this.pretty) this.output.b += "";
			} else {
				this.output.b += "/>";
				if(this.pretty) this.output.b += "";
			}
			break;
		case 1:
			var nodeValue;
			if(value.nodeType == Xml.Document || value.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + value.nodeType);
			nodeValue = value.nodeValue;
			if(nodeValue.length != 0) {
				this.write(tabs + StringTools.htmlEscape(nodeValue));
				if(this.pretty) this.output.b += "";
			}
			break;
		case 5:
			this.write("<?" + (function($this) {
				var $r;
				if(value.nodeType == Xml.Document || value.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + value.nodeType);
				$r = value.nodeValue;
				return $r;
			}(this)) + "?>");
			break;
		case 4:
			this.write("<!DOCTYPE " + (function($this) {
				var $r;
				if(value.nodeType == Xml.Document || value.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + value.nodeType);
				$r = value.nodeValue;
				return $r;
			}(this)) + ">");
			break;
		}
	}
	,write: function(input) {
		if(input == null) this.output.b += "null"; else this.output.b += "" + input;
	}
	,hasChildren: function(value) {
		var $it0 = (function($this) {
			var $r;
			if(value.nodeType != Xml.Document && value.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + value.nodeType);
			$r = HxOverrides.iter(value.children);
			return $r;
		}(this));
		while( $it0.hasNext() ) {
			var child = $it0.next();
			var _g = child.nodeType;
			switch(_g) {
			case 0:case 1:
				return true;
			case 2:case 3:
				if(StringTools.ltrim((function($this) {
					var $r;
					if(child.nodeType == Xml.Document || child.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + child.nodeType);
					$r = child.nodeValue;
					return $r;
				}(this))).length != 0) return true;
				break;
			default:
			}
		}
		return false;
	}
	,__class__: haxe_xml_Printer
};
var hxlazy_Lazy = function() { };
hxlazy_Lazy.__name__ = true;
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
js__$Boot_HaxeError.__name__ = true;
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return (Function("return typeof " + name + " != \"undefined\" ? " + name + " : null"))();
};
var js_html_compat_ArrayBuffer = function(a) {
	if((a instanceof Array) && a.__enum__ == null) {
		this.a = a;
		this.byteLength = a.length;
	} else {
		var len = a;
		this.a = [];
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			this.a[i] = 0;
		}
		this.byteLength = len;
	}
};
js_html_compat_ArrayBuffer.__name__ = true;
js_html_compat_ArrayBuffer.sliceImpl = function(begin,end) {
	var u = new Uint8Array(this,begin,end == null?null:end - begin);
	var result = new ArrayBuffer(u.byteLength);
	var resultArray = new Uint8Array(result);
	resultArray.set(u);
	return result;
};
js_html_compat_ArrayBuffer.prototype = {
	slice: function(begin,end) {
		return new js_html_compat_ArrayBuffer(this.a.slice(begin,end));
	}
	,__class__: js_html_compat_ArrayBuffer
};
var js_html_compat_DataView = function(buffer,byteOffset,byteLength) {
	this.buf = buffer;
	if(byteOffset == null) this.offset = 0; else this.offset = byteOffset;
	if(byteLength == null) this.length = buffer.byteLength - this.offset; else this.length = byteLength;
	if(this.offset < 0 || this.length < 0 || this.offset + this.length > buffer.byteLength) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
};
js_html_compat_DataView.__name__ = true;
js_html_compat_DataView.prototype = {
	getInt8: function(byteOffset) {
		var v = this.buf.a[this.offset + byteOffset];
		if(v >= 128) return v - 256; else return v;
	}
	,getUint8: function(byteOffset) {
		return this.buf.a[this.offset + byteOffset];
	}
	,getInt16: function(byteOffset,littleEndian) {
		var v = this.getUint16(byteOffset,littleEndian);
		if(v >= 32768) return v - 65536; else return v;
	}
	,getUint16: function(byteOffset,littleEndian) {
		if(littleEndian) return this.buf.a[this.offset + byteOffset] | this.buf.a[this.offset + byteOffset + 1] << 8; else return this.buf.a[this.offset + byteOffset] << 8 | this.buf.a[this.offset + byteOffset + 1];
	}
	,getInt32: function(byteOffset,littleEndian) {
		var p = this.offset + byteOffset;
		var a = this.buf.a[p++];
		var b = this.buf.a[p++];
		var c = this.buf.a[p++];
		var d = this.buf.a[p++];
		if(littleEndian) return a | b << 8 | c << 16 | d << 24; else return d | c << 8 | b << 16 | a << 24;
	}
	,getUint32: function(byteOffset,littleEndian) {
		var v = this.getInt32(byteOffset,littleEndian);
		if(v < 0) return v + 4294967296.; else return v;
	}
	,getFloat32: function(byteOffset,littleEndian) {
		return haxe_io_FPHelper.i32ToFloat(this.getInt32(byteOffset,littleEndian));
	}
	,getFloat64: function(byteOffset,littleEndian) {
		var a = this.getInt32(byteOffset,littleEndian);
		var b = this.getInt32(byteOffset + 4,littleEndian);
		return haxe_io_FPHelper.i64ToDouble(littleEndian?a:b,littleEndian?b:a);
	}
	,setInt8: function(byteOffset,value) {
		if(value < 0) this.buf.a[byteOffset + this.offset] = value + 128 & 255; else this.buf.a[byteOffset + this.offset] = value & 255;
	}
	,setUint8: function(byteOffset,value) {
		this.buf.a[byteOffset + this.offset] = value & 255;
	}
	,setInt16: function(byteOffset,value,littleEndian) {
		this.setUint16(byteOffset,value < 0?value + 65536:value,littleEndian);
	}
	,setUint16: function(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
		} else {
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p] = value & 255;
		}
	}
	,setInt32: function(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,value,littleEndian);
	}
	,setUint32: function(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p++] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >>> 24;
		} else {
			this.buf.a[p++] = value >>> 24;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value & 255;
		}
	}
	,setFloat32: function(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,haxe_io_FPHelper.floatToI32(value),littleEndian);
	}
	,setFloat64: function(byteOffset,value,littleEndian) {
		var i64 = haxe_io_FPHelper.doubleToI64(value);
		if(littleEndian) {
			this.setUint32(byteOffset,i64.low);
			this.setUint32(byteOffset,i64.high);
		} else {
			this.setUint32(byteOffset,i64.high);
			this.setUint32(byteOffset,i64.low);
		}
	}
	,__class__: js_html_compat_DataView
};
var js_html_compat_Uint8Array = function() { };
js_html_compat_Uint8Array.__name__ = true;
js_html_compat_Uint8Array._new = function(arg1,offset,length) {
	var arr;
	if(typeof(arg1) == "number") {
		arr = [];
		var _g = 0;
		while(_g < arg1) {
			var i = _g++;
			arr[i] = 0;
		}
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else if(js_Boot.__instanceof(arg1,js_html_compat_ArrayBuffer)) {
		var buffer = arg1;
		if(offset == null) offset = 0;
		if(length == null) length = buffer.byteLength - offset;
		if(offset == 0) arr = buffer.a; else arr = buffer.a.slice(offset,offset + length);
		arr.byteLength = arr.length;
		arr.byteOffset = offset;
		arr.buffer = buffer;
	} else if((arg1 instanceof Array) && arg1.__enum__ == null) {
		arr = arg1.slice();
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else throw new js__$Boot_HaxeError("TODO " + Std.string(arg1));
	arr.subarray = js_html_compat_Uint8Array._subarray;
	arr.set = js_html_compat_Uint8Array._set;
	return arr;
};
js_html_compat_Uint8Array._set = function(arg,offset) {
	var t = this;
	if(js_Boot.__instanceof(arg.buffer,js_html_compat_ArrayBuffer)) {
		var a = arg;
		if(arg.byteLength + offset > t.byteLength) throw new js__$Boot_HaxeError("set() outside of range");
		var _g1 = 0;
		var _g = arg.byteLength;
		while(_g1 < _g) {
			var i = _g1++;
			t[i + offset] = a[i];
		}
	} else if((arg instanceof Array) && arg.__enum__ == null) {
		var a1 = arg;
		if(a1.length + offset > t.byteLength) throw new js__$Boot_HaxeError("set() outside of range");
		var _g11 = 0;
		var _g2 = a1.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			t[i1 + offset] = a1[i1];
		}
	} else throw new js__$Boot_HaxeError("TODO");
};
js_html_compat_Uint8Array._subarray = function(start,end) {
	var t = this;
	var a = js_html_compat_Uint8Array._new(t.slice(start,end));
	a.byteOffset = start;
	return a;
};
var js_node_Fs = require("fs");
var nx3_Constants = function() { };
nx3_Constants.__name__ = true;
var nx3_EAllotment = { __ename__ : true, __constructs__ : ["LeftAlign","Equal","Logaritmic","Linear"] };
nx3_EAllotment.LeftAlign = ["LeftAlign",0];
nx3_EAllotment.LeftAlign.toString = $estr;
nx3_EAllotment.LeftAlign.__enum__ = nx3_EAllotment;
nx3_EAllotment.Equal = ["Equal",1];
nx3_EAllotment.Equal.toString = $estr;
nx3_EAllotment.Equal.__enum__ = nx3_EAllotment;
nx3_EAllotment.Logaritmic = ["Logaritmic",2];
nx3_EAllotment.Logaritmic.toString = $estr;
nx3_EAllotment.Logaritmic.__enum__ = nx3_EAllotment;
nx3_EAllotment.Linear = ["Linear",3];
nx3_EAllotment.Linear.toString = $estr;
nx3_EAllotment.Linear.__enum__ = nx3_EAllotment;
var nx3_EBarType = { __ename__ : true, __constructs__ : ["Normal","Repeat","Ignore","Folded"] };
nx3_EBarType.Normal = ["Normal",0];
nx3_EBarType.Normal.toString = $estr;
nx3_EBarType.Normal.__enum__ = nx3_EBarType;
nx3_EBarType.Repeat = ["Repeat",1];
nx3_EBarType.Repeat.toString = $estr;
nx3_EBarType.Repeat.__enum__ = nx3_EBarType;
nx3_EBarType.Ignore = ["Ignore",2];
nx3_EBarType.Ignore.toString = $estr;
nx3_EBarType.Ignore.__enum__ = nx3_EBarType;
nx3_EBarType.Folded = ["Folded",3];
nx3_EBarType.Folded.toString = $estr;
nx3_EBarType.Folded.__enum__ = nx3_EBarType;
var nx3_EBarline = { __ename__ : true, __constructs__ : ["Normal","None","Double","Final","Dotted","Breath","EndRepeat","EndAndStartRepeat"] };
nx3_EBarline.Normal = ["Normal",0];
nx3_EBarline.Normal.toString = $estr;
nx3_EBarline.Normal.__enum__ = nx3_EBarline;
nx3_EBarline.None = ["None",1];
nx3_EBarline.None.toString = $estr;
nx3_EBarline.None.__enum__ = nx3_EBarline;
nx3_EBarline.Double = ["Double",2];
nx3_EBarline.Double.toString = $estr;
nx3_EBarline.Double.__enum__ = nx3_EBarline;
nx3_EBarline.Final = ["Final",3];
nx3_EBarline.Final.toString = $estr;
nx3_EBarline.Final.__enum__ = nx3_EBarline;
nx3_EBarline.Dotted = ["Dotted",4];
nx3_EBarline.Dotted.toString = $estr;
nx3_EBarline.Dotted.__enum__ = nx3_EBarline;
nx3_EBarline.Breath = ["Breath",5];
nx3_EBarline.Breath.toString = $estr;
nx3_EBarline.Breath.__enum__ = nx3_EBarline;
nx3_EBarline.EndRepeat = ["EndRepeat",6];
nx3_EBarline.EndRepeat.toString = $estr;
nx3_EBarline.EndRepeat.__enum__ = nx3_EBarline;
nx3_EBarline.EndAndStartRepeat = ["EndAndStartRepeat",7];
nx3_EBarline.EndAndStartRepeat.toString = $estr;
nx3_EBarline.EndAndStartRepeat.__enum__ = nx3_EBarline;
var nx3_EBarlineLeft = { __ename__ : true, __constructs__ : ["None","Single","Double","StartRepeat"] };
nx3_EBarlineLeft.None = ["None",0];
nx3_EBarlineLeft.None.toString = $estr;
nx3_EBarlineLeft.None.__enum__ = nx3_EBarlineLeft;
nx3_EBarlineLeft.Single = ["Single",1];
nx3_EBarlineLeft.Single.toString = $estr;
nx3_EBarlineLeft.Single.__enum__ = nx3_EBarlineLeft;
nx3_EBarlineLeft.Double = ["Double",2];
nx3_EBarlineLeft.Double.toString = $estr;
nx3_EBarlineLeft.Double.__enum__ = nx3_EBarlineLeft;
nx3_EBarlineLeft.StartRepeat = ["StartRepeat",3];
nx3_EBarlineLeft.StartRepeat.toString = $estr;
nx3_EBarlineLeft.StartRepeat.__enum__ = nx3_EBarlineLeft;
var nx3_EBeamflagType = { __ename__ : true, __constructs__ : ["None","Start16","End16","Full16"] };
nx3_EBeamflagType.None = ["None",0];
nx3_EBeamflagType.None.toString = $estr;
nx3_EBeamflagType.None.__enum__ = nx3_EBeamflagType;
nx3_EBeamflagType.Start16 = ["Start16",1];
nx3_EBeamflagType.Start16.toString = $estr;
nx3_EBeamflagType.Start16.__enum__ = nx3_EBeamflagType;
nx3_EBeamflagType.End16 = ["End16",2];
nx3_EBeamflagType.End16.toString = $estr;
nx3_EBeamflagType.End16.__enum__ = nx3_EBeamflagType;
nx3_EBeamflagType.Full16 = ["Full16",3];
nx3_EBeamflagType.Full16.toString = $estr;
nx3_EBeamflagType.Full16.__enum__ = nx3_EBeamflagType;
var nx3_EClef = { __ename__ : true, __constructs__ : ["ClefG","ClefF","ClefC"] };
nx3_EClef.ClefG = ["ClefG",0];
nx3_EClef.ClefG.toString = $estr;
nx3_EClef.ClefG.__enum__ = nx3_EClef;
nx3_EClef.ClefF = ["ClefF",1];
nx3_EClef.ClefF.toString = $estr;
nx3_EClef.ClefF.__enum__ = nx3_EClef;
nx3_EClef.ClefC = ["ClefC",2];
nx3_EClef.ClefC.toString = $estr;
nx3_EClef.ClefC.__enum__ = nx3_EClef;
var nx3_EDirectionTools = function() { };
nx3_EDirectionTools.__name__ = true;
nx3_EDirectionTools.uadToUd = function(directionUAD) {
	if(directionUAD == nx3_EDirectionUAD.Up) return nx3_EDirectionUD.Up;
	return nx3_EDirectionUD.Down;
};
var nx3_EDirectionUAD = { __ename__ : true, __constructs__ : ["Up","Auto","Down"] };
nx3_EDirectionUAD.Up = ["Up",0];
nx3_EDirectionUAD.Up.toString = $estr;
nx3_EDirectionUAD.Up.__enum__ = nx3_EDirectionUAD;
nx3_EDirectionUAD.Auto = ["Auto",1];
nx3_EDirectionUAD.Auto.toString = $estr;
nx3_EDirectionUAD.Auto.__enum__ = nx3_EDirectionUAD;
nx3_EDirectionUAD.Down = ["Down",2];
nx3_EDirectionUAD.Down.toString = $estr;
nx3_EDirectionUAD.Down.__enum__ = nx3_EDirectionUAD;
var nx3_EDirectionUADTools = function() { };
nx3_EDirectionUADTools.__name__ = true;
nx3_EDirectionUADTools.toUD = function(direction) {
	switch(direction[1]) {
	case 0:
		return nx3_EDirectionUD.Up;
	case 2:
		return nx3_EDirectionUD.Down;
	default:
		return nx3_EDirectionUD.Down;
	}
};
var nx3_EDirectionUD = { __ename__ : true, __constructs__ : ["Up","Down"] };
nx3_EDirectionUD.Up = ["Up",0];
nx3_EDirectionUD.Up.toString = $estr;
nx3_EDirectionUD.Up.__enum__ = nx3_EDirectionUD;
nx3_EDirectionUD.Down = ["Down",1];
nx3_EDirectionUD.Down.toString = $estr;
nx3_EDirectionUD.Down.__enum__ = nx3_EDirectionUD;
var nx3_EDirectionUDTools = function() { };
nx3_EDirectionUDTools.__name__ = true;
nx3_EDirectionUDTools.toUAD = function(direction) {
	if(direction == nx3_EDirectionUD.Up) return nx3_EDirectionUAD.Up; else return nx3_EDirectionUAD.Down;
};
var nx3_EDisplayALN = { __ename__ : true, __constructs__ : ["Always","Layout","Never"] };
nx3_EDisplayALN.Always = ["Always",0];
nx3_EDisplayALN.Always.toString = $estr;
nx3_EDisplayALN.Always.__enum__ = nx3_EDisplayALN;
nx3_EDisplayALN.Layout = ["Layout",1];
nx3_EDisplayALN.Layout.toString = $estr;
nx3_EDisplayALN.Layout.__enum__ = nx3_EDisplayALN;
nx3_EDisplayALN.Never = ["Never",2];
nx3_EDisplayALN.Never.toString = $estr;
nx3_EDisplayALN.Never.__enum__ = nx3_EDisplayALN;
var nx3_EHeadPosition = { __ename__ : true, __constructs__ : ["Left","Center","Right"] };
nx3_EHeadPosition.Left = ["Left",0];
nx3_EHeadPosition.Left.toString = $estr;
nx3_EHeadPosition.Left.__enum__ = nx3_EHeadPosition;
nx3_EHeadPosition.Center = ["Center",1];
nx3_EHeadPosition.Center.toString = $estr;
nx3_EHeadPosition.Center.__enum__ = nx3_EHeadPosition;
nx3_EHeadPosition.Right = ["Right",2];
nx3_EHeadPosition.Right.toString = $estr;
nx3_EHeadPosition.Right.__enum__ = nx3_EHeadPosition;
var nx3_EHeadType = { __ename__ : true, __constructs__ : ["Normal","Rythmic","Crossed","Pause","Other"] };
nx3_EHeadType.Normal = ["Normal",0];
nx3_EHeadType.Normal.toString = $estr;
nx3_EHeadType.Normal.__enum__ = nx3_EHeadType;
nx3_EHeadType.Rythmic = ["Rythmic",1];
nx3_EHeadType.Rythmic.toString = $estr;
nx3_EHeadType.Rythmic.__enum__ = nx3_EHeadType;
nx3_EHeadType.Crossed = ["Crossed",2];
nx3_EHeadType.Crossed.toString = $estr;
nx3_EHeadType.Crossed.__enum__ = nx3_EHeadType;
nx3_EHeadType.Pause = ["Pause",3];
nx3_EHeadType.Pause.toString = $estr;
nx3_EHeadType.Pause.__enum__ = nx3_EHeadType;
nx3_EHeadType.Other = ["Other",4];
nx3_EHeadType.Other.toString = $estr;
nx3_EHeadType.Other.__enum__ = nx3_EHeadType;
var nx3_EHeadValueType = { __ename__ : true, __constructs__ : ["HVT4","HVT2","HVT1"] };
nx3_EHeadValueType.HVT4 = ["HVT4",0];
nx3_EHeadValueType.HVT4.toString = $estr;
nx3_EHeadValueType.HVT4.__enum__ = nx3_EHeadValueType;
nx3_EHeadValueType.HVT2 = ["HVT2",1];
nx3_EHeadValueType.HVT2.toString = $estr;
nx3_EHeadValueType.HVT2.__enum__ = nx3_EHeadValueType;
nx3_EHeadValueType.HVT1 = ["HVT1",2];
nx3_EHeadValueType.HVT1.toString = $estr;
nx3_EHeadValueType.HVT1.__enum__ = nx3_EHeadValueType;
var nx3_EKey = { __ename__ : true, __constructs__ : ["Sharp6","Sharp5","Sharp4","Sharp3","Sharp2","Sharp1","Natural","Flat1","Flat2","Flat3","Flat4","Flat5","Flat6"] };
nx3_EKey.Sharp6 = ["Sharp6",0];
nx3_EKey.Sharp6.toString = $estr;
nx3_EKey.Sharp6.__enum__ = nx3_EKey;
nx3_EKey.Sharp5 = ["Sharp5",1];
nx3_EKey.Sharp5.toString = $estr;
nx3_EKey.Sharp5.__enum__ = nx3_EKey;
nx3_EKey.Sharp4 = ["Sharp4",2];
nx3_EKey.Sharp4.toString = $estr;
nx3_EKey.Sharp4.__enum__ = nx3_EKey;
nx3_EKey.Sharp3 = ["Sharp3",3];
nx3_EKey.Sharp3.toString = $estr;
nx3_EKey.Sharp3.__enum__ = nx3_EKey;
nx3_EKey.Sharp2 = ["Sharp2",4];
nx3_EKey.Sharp2.toString = $estr;
nx3_EKey.Sharp2.__enum__ = nx3_EKey;
nx3_EKey.Sharp1 = ["Sharp1",5];
nx3_EKey.Sharp1.toString = $estr;
nx3_EKey.Sharp1.__enum__ = nx3_EKey;
nx3_EKey.Natural = ["Natural",6];
nx3_EKey.Natural.toString = $estr;
nx3_EKey.Natural.__enum__ = nx3_EKey;
nx3_EKey.Flat1 = ["Flat1",7];
nx3_EKey.Flat1.toString = $estr;
nx3_EKey.Flat1.__enum__ = nx3_EKey;
nx3_EKey.Flat2 = ["Flat2",8];
nx3_EKey.Flat2.toString = $estr;
nx3_EKey.Flat2.__enum__ = nx3_EKey;
nx3_EKey.Flat3 = ["Flat3",9];
nx3_EKey.Flat3.toString = $estr;
nx3_EKey.Flat3.__enum__ = nx3_EKey;
nx3_EKey.Flat4 = ["Flat4",10];
nx3_EKey.Flat4.toString = $estr;
nx3_EKey.Flat4.__enum__ = nx3_EKey;
nx3_EKey.Flat5 = ["Flat5",11];
nx3_EKey.Flat5.toString = $estr;
nx3_EKey.Flat5.__enum__ = nx3_EKey;
nx3_EKey.Flat6 = ["Flat6",12];
nx3_EKey.Flat6.toString = $estr;
nx3_EKey.Flat6.__enum__ = nx3_EKey;
var nx3_EKeysTools = function() { };
nx3_EKeysTools.__name__ = true;
nx3_EKeysTools.getLevels = function(key,clef) {
	var result = [];
	switch(key[1]) {
	case 7:
		result = [0];
		break;
	case 8:
		result = [0,-3];
		break;
	case 9:
		result = [0,-3,1];
		break;
	case 10:
		result = [0,-3,1,-2];
		break;
	case 11:
		result = [0,-3,1,-2,2,-1];
		break;
	case 12:
		result = [0,-3,1,-2,2,-1,3];
		break;
	case 5:
		result = [-4];
		break;
	case 4:
		result = [-4,-1];
		break;
	case 3:
		result = [-4,-1,-5];
		break;
	case 2:
		result = [-4,-1,-5,-2];
		break;
	case 1:
		result = [-4,-1,-5,-2,1];
		break;
	case 0:
		result = [-4,-1,-5,-2,1,-3];
		break;
	default:
		result = [];
	}
	var adjust;
	switch(clef[1]) {
	case 0:
		adjust = -1;
		break;
	case 1:
		adjust = 1;
		break;
	default:
		adjust = 0;
	}
	var _g1 = 0;
	var _g = result.length;
	while(_g1 < _g) {
		var i = _g1++;
		result[i] = result[i] + adjust;
	}
	return result;
};
nx3_EKeysTools.getSigncode = function(key) {
	switch(key[1]) {
	case 7:case 8:case 9:case 10:case 11:case 12:
		return -1;
	case 5:case 4:case 3:case 2:case 1:case 0:
		return 1;
	default:
		return 0;
	}
};
nx3_EKeysTools.getKeyNr = function(key) {
	switch(key[1]) {
	case 12:
		return -6;
	case 11:
		return -5;
	case 10:
		return -4;
	case 9:
		return -3;
	case 8:
		return -2;
	case 7:
		return -1;
	case 5:
		return 1;
	case 4:
		return 2;
	case 3:
		return 3;
	case 2:
		return 4;
	case 1:
		return 5;
	case 0:
		return 6;
	default:
		return 0;
	}
};
nx3_EKeysTools.getNotenrBaseMap = function(key) {
	if(key == null) {
		var _g = new haxe_ds_IntMap();
		_g.h[0] = 11;
		_g.h[1] = 9;
		_g.h[2] = 7;
		_g.h[3] = 5;
		_g.h[4] = 4;
		_g.h[5] = 2;
		_g.h[6] = 0;
		return _g;
	}
	if(key != null) switch(key[1]) {
	case 12:
		var _g1 = new haxe_ds_IntMap();
		_g1.h[0] = 10;
		_g1.h[1] = 8;
		_g1.h[2] = 6;
		_g1.h[3] = 5;
		_g1.h[4] = 3;
		_g1.h[5] = 1;
		_g1.h[6] = -1;
		return _g1;
	case 11:
		var _g11 = new haxe_ds_IntMap();
		_g11.h[0] = 10;
		_g11.h[1] = 8;
		_g11.h[2] = 6;
		_g11.h[3] = 5;
		_g11.h[4] = 3;
		_g11.h[5] = 1;
		_g11.h[6] = 0;
		return _g11;
	case 10:
		var _g12 = new haxe_ds_IntMap();
		_g12.h[0] = 10;
		_g12.h[1] = 8;
		_g12.h[2] = 7;
		_g12.h[3] = 5;
		_g12.h[4] = 3;
		_g12.h[5] = 1;
		_g12.h[6] = 0;
		return _g12;
	case 9:
		var _g13 = new haxe_ds_IntMap();
		_g13.h[0] = 10;
		_g13.h[1] = 8;
		_g13.h[2] = 7;
		_g13.h[3] = 5;
		_g13.h[4] = 3;
		_g13.h[5] = 2;
		_g13.h[6] = 0;
		return _g13;
	case 8:
		var _g14 = new haxe_ds_IntMap();
		_g14.h[0] = 10;
		_g14.h[1] = 9;
		_g14.h[2] = 7;
		_g14.h[3] = 5;
		_g14.h[4] = 3;
		_g14.h[5] = 2;
		_g14.h[6] = 0;
		return _g14;
	case 7:
		var _g15 = new haxe_ds_IntMap();
		_g15.h[0] = 10;
		_g15.h[1] = 9;
		_g15.h[2] = 7;
		_g15.h[3] = 5;
		_g15.h[4] = 4;
		_g15.h[5] = 2;
		_g15.h[6] = 0;
		return _g15;
	case 5:
		var _g16 = new haxe_ds_IntMap();
		_g16.h[0] = 11;
		_g16.h[1] = 9;
		_g16.h[2] = 7;
		_g16.h[3] = 6;
		_g16.h[4] = 4;
		_g16.h[5] = 2;
		_g16.h[6] = 0;
		return _g16;
	case 4:
		var _g17 = new haxe_ds_IntMap();
		_g17.h[0] = 11;
		_g17.h[1] = 9;
		_g17.h[2] = 7;
		_g17.h[3] = 6;
		_g17.h[4] = 4;
		_g17.h[5] = 2;
		_g17.h[6] = 1;
		return _g17;
	case 3:
		var _g18 = new haxe_ds_IntMap();
		_g18.h[0] = 11;
		_g18.h[1] = 9;
		_g18.h[2] = 8;
		_g18.h[3] = 6;
		_g18.h[4] = 4;
		_g18.h[5] = 2;
		_g18.h[6] = 1;
		return _g18;
	case 2:
		var _g19 = new haxe_ds_IntMap();
		_g19.h[0] = 11;
		_g19.h[1] = 9;
		_g19.h[2] = 8;
		_g19.h[3] = 6;
		_g19.h[4] = 4;
		_g19.h[5] = 3;
		_g19.h[6] = 1;
		return _g19;
	case 1:
		var _g110 = new haxe_ds_IntMap();
		_g110.h[0] = 11;
		_g110.h[1] = 10;
		_g110.h[2] = 8;
		_g110.h[3] = 6;
		_g110.h[4] = 4;
		_g110.h[5] = 3;
		_g110.h[6] = 1;
		return _g110;
	case 0:
		var _g111 = new haxe_ds_IntMap();
		_g111.h[0] = 11;
		_g111.h[1] = 10;
		_g111.h[2] = 8;
		_g111.h[3] = 6;
		_g111.h[4] = 5;
		_g111.h[5] = 3;
		_g111.h[6] = 1;
		return _g111;
	default:
		var _g112 = new haxe_ds_IntMap();
		_g112.h[0] = 11;
		_g112.h[1] = 9;
		_g112.h[2] = 7;
		_g112.h[3] = 5;
		_g112.h[4] = 4;
		_g112.h[5] = 2;
		_g112.h[6] = 0;
		return _g112;
	} else {
		var _g112 = new haxe_ds_IntMap();
		_g112.h[0] = 11;
		_g112.h[1] = 9;
		_g112.h[2] = 7;
		_g112.h[3] = 5;
		_g112.h[4] = 4;
		_g112.h[5] = 2;
		_g112.h[6] = 0;
		return _g112;
	}
};
nx3_EKeysTools.getSignsBaseMap = function(key) {
	if(key == null) {
		var _g = new haxe_ds_IntMap();
		_g.h[0] = nx3_ESign.Natural;
		_g.h[1] = nx3_ESign.Natural;
		_g.h[2] = nx3_ESign.Natural;
		_g.h[3] = nx3_ESign.Natural;
		_g.h[4] = nx3_ESign.Natural;
		_g.h[5] = nx3_ESign.Natural;
		_g.h[6] = nx3_ESign.Natural;
		return _g;
	}
	if(key != null) switch(key[1]) {
	case 12:
		var _g1 = new haxe_ds_IntMap();
		_g1.h[0] = nx3_ESign.Flat;
		_g1.h[1] = nx3_ESign.Flat;
		_g1.h[2] = nx3_ESign.Flat;
		_g1.h[3] = nx3_ESign.Natural;
		_g1.h[4] = nx3_ESign.Flat;
		_g1.h[5] = nx3_ESign.Flat;
		_g1.h[6] = nx3_ESign.Flat;
		return _g1;
	case 11:
		var _g11 = new haxe_ds_IntMap();
		_g11.h[0] = nx3_ESign.Flat;
		_g11.h[1] = nx3_ESign.Flat;
		_g11.h[2] = nx3_ESign.Flat;
		_g11.h[3] = nx3_ESign.Natural;
		_g11.h[4] = nx3_ESign.Flat;
		_g11.h[5] = nx3_ESign.Flat;
		_g11.h[6] = nx3_ESign.Natural;
		return _g11;
	case 10:
		var _g12 = new haxe_ds_IntMap();
		_g12.h[0] = nx3_ESign.Flat;
		_g12.h[1] = nx3_ESign.Flat;
		_g12.h[2] = nx3_ESign.Natural;
		_g12.h[3] = nx3_ESign.Natural;
		_g12.h[4] = nx3_ESign.Flat;
		_g12.h[5] = nx3_ESign.Flat;
		_g12.h[6] = nx3_ESign.Natural;
		return _g12;
	case 9:
		var _g13 = new haxe_ds_IntMap();
		_g13.h[0] = nx3_ESign.Flat;
		_g13.h[1] = nx3_ESign.Flat;
		_g13.h[2] = nx3_ESign.Natural;
		_g13.h[3] = nx3_ESign.Natural;
		_g13.h[4] = nx3_ESign.Flat;
		_g13.h[5] = nx3_ESign.Natural;
		_g13.h[6] = nx3_ESign.Natural;
		return _g13;
	case 8:
		var _g14 = new haxe_ds_IntMap();
		_g14.h[0] = nx3_ESign.Flat;
		_g14.h[1] = nx3_ESign.Natural;
		_g14.h[2] = nx3_ESign.Natural;
		_g14.h[3] = nx3_ESign.Natural;
		_g14.h[4] = nx3_ESign.Flat;
		_g14.h[5] = nx3_ESign.Natural;
		_g14.h[6] = nx3_ESign.Natural;
		return _g14;
	case 7:
		var _g15 = new haxe_ds_IntMap();
		_g15.h[0] = nx3_ESign.Flat;
		_g15.h[1] = nx3_ESign.Natural;
		_g15.h[2] = nx3_ESign.Natural;
		_g15.h[3] = nx3_ESign.Natural;
		_g15.h[4] = nx3_ESign.Natural;
		_g15.h[5] = nx3_ESign.Natural;
		_g15.h[6] = nx3_ESign.Natural;
		return _g15;
	case 5:
		var _g16 = new haxe_ds_IntMap();
		_g16.h[0] = nx3_ESign.Natural;
		_g16.h[1] = nx3_ESign.Natural;
		_g16.h[2] = nx3_ESign.Natural;
		_g16.h[3] = nx3_ESign.Sharp;
		_g16.h[4] = nx3_ESign.Natural;
		_g16.h[5] = nx3_ESign.Natural;
		_g16.h[6] = nx3_ESign.Natural;
		return _g16;
	case 4:
		var _g17 = new haxe_ds_IntMap();
		_g17.h[0] = nx3_ESign.Natural;
		_g17.h[1] = nx3_ESign.Natural;
		_g17.h[2] = nx3_ESign.Natural;
		_g17.h[3] = nx3_ESign.Sharp;
		_g17.h[4] = nx3_ESign.Natural;
		_g17.h[5] = nx3_ESign.Natural;
		_g17.h[6] = nx3_ESign.Sharp;
		return _g17;
	case 3:
		var _g18 = new haxe_ds_IntMap();
		_g18.h[0] = nx3_ESign.Natural;
		_g18.h[1] = nx3_ESign.Natural;
		_g18.h[2] = nx3_ESign.Sharp;
		_g18.h[3] = nx3_ESign.Sharp;
		_g18.h[4] = nx3_ESign.Natural;
		_g18.h[5] = nx3_ESign.Natural;
		_g18.h[6] = nx3_ESign.Sharp;
		return _g18;
	case 2:
		var _g19 = new haxe_ds_IntMap();
		_g19.h[0] = nx3_ESign.Natural;
		_g19.h[1] = nx3_ESign.Natural;
		_g19.h[2] = nx3_ESign.Sharp;
		_g19.h[3] = nx3_ESign.Sharp;
		_g19.h[4] = nx3_ESign.Natural;
		_g19.h[5] = nx3_ESign.Sharp;
		_g19.h[6] = nx3_ESign.Sharp;
		return _g19;
	case 1:
		var _g110 = new haxe_ds_IntMap();
		_g110.h[0] = nx3_ESign.Natural;
		_g110.h[1] = nx3_ESign.Sharp;
		_g110.h[2] = nx3_ESign.Sharp;
		_g110.h[3] = nx3_ESign.Sharp;
		_g110.h[4] = nx3_ESign.Natural;
		_g110.h[5] = nx3_ESign.Sharp;
		_g110.h[6] = nx3_ESign.Sharp;
		return _g110;
	case 0:
		var _g111 = new haxe_ds_IntMap();
		_g111.h[0] = nx3_ESign.Natural;
		_g111.h[1] = nx3_ESign.Sharp;
		_g111.h[2] = nx3_ESign.Sharp;
		_g111.h[3] = nx3_ESign.Sharp;
		_g111.h[4] = nx3_ESign.Sharp;
		_g111.h[5] = nx3_ESign.Sharp;
		_g111.h[6] = nx3_ESign.Sharp;
		return _g111;
	default:
		var _g112 = new haxe_ds_IntMap();
		_g112.h[0] = nx3_ESign.Natural;
		_g112.h[1] = nx3_ESign.Natural;
		_g112.h[2] = nx3_ESign.Natural;
		_g112.h[3] = nx3_ESign.Natural;
		_g112.h[4] = nx3_ESign.Natural;
		_g112.h[5] = nx3_ESign.Natural;
		_g112.h[6] = nx3_ESign.Natural;
		return _g112;
	} else {
		var _g112 = new haxe_ds_IntMap();
		_g112.h[0] = nx3_ESign.Natural;
		_g112.h[1] = nx3_ESign.Natural;
		_g112.h[2] = nx3_ESign.Natural;
		_g112.h[3] = nx3_ESign.Natural;
		_g112.h[4] = nx3_ESign.Natural;
		_g112.h[5] = nx3_ESign.Natural;
		_g112.h[6] = nx3_ESign.Natural;
		return _g112;
	}
};
nx3_EKeysTools.getKeyRootShift = function(key) {
	switch(key[1]) {
	case 12:
		return 4;
	case 11:
		return 1;
	case 10:
		return 8;
	case 9:
		return 3;
	case 8:
		return 10;
	case 7:
		return 5;
	case 6:
		return 0;
	case 5:
		return 7;
	case 4:
		return 2;
	case 3:
		return 9;
	case 2:
		return 4;
	case 1:
		return 11;
	case 0:
		return 6;
	}
	return 0;
};
var nx3_ELyricContinuation = { __ename__ : true, __constructs__ : ["Hyphen","Melisma"] };
nx3_ELyricContinuation.Hyphen = ["Hyphen",0];
nx3_ELyricContinuation.Hyphen.toString = $estr;
nx3_ELyricContinuation.Hyphen.__enum__ = nx3_ELyricContinuation;
nx3_ELyricContinuation.Melisma = ["Melisma",1];
nx3_ELyricContinuation.Melisma.toString = $estr;
nx3_ELyricContinuation.Melisma.__enum__ = nx3_ELyricContinuation;
var nx3_EModus = { __ename__ : true, __constructs__ : ["Major","Minor"] };
nx3_EModus.Major = ["Major",0];
nx3_EModus.Major.toString = $estr;
nx3_EModus.Major.__enum__ = nx3_EModus;
nx3_EModus.Minor = ["Minor",1];
nx3_EModus.Minor.toString = $estr;
nx3_EModus.Minor.__enum__ = nx3_EModus;
var nx3_ENotationVariant = { __ename__ : true, __constructs__ : ["Normal","Rythmic","RythmicSingleLevel","HeadsOnly","StavesOnly"] };
nx3_ENotationVariant.Normal = ["Normal",0];
nx3_ENotationVariant.Normal.toString = $estr;
nx3_ENotationVariant.Normal.__enum__ = nx3_ENotationVariant;
nx3_ENotationVariant.Rythmic = ["Rythmic",1];
nx3_ENotationVariant.Rythmic.toString = $estr;
nx3_ENotationVariant.Rythmic.__enum__ = nx3_ENotationVariant;
nx3_ENotationVariant.RythmicSingleLevel = function(level) { var $x = ["RythmicSingleLevel",2,level]; $x.__enum__ = nx3_ENotationVariant; $x.toString = $estr; return $x; };
nx3_ENotationVariant.HeadsOnly = ["HeadsOnly",3];
nx3_ENotationVariant.HeadsOnly.toString = $estr;
nx3_ENotationVariant.HeadsOnly.__enum__ = nx3_ENotationVariant;
nx3_ENotationVariant.StavesOnly = ["StavesOnly",4];
nx3_ENotationVariant.StavesOnly.toString = $estr;
nx3_ENotationVariant.StavesOnly.__enum__ = nx3_ENotationVariant;
var nx3_ENoteArticulation = { __ename__ : true, __constructs__ : ["Staccato","Tenuto","Marcato"] };
nx3_ENoteArticulation.Staccato = ["Staccato",0];
nx3_ENoteArticulation.Staccato.toString = $estr;
nx3_ENoteArticulation.Staccato.__enum__ = nx3_ENoteArticulation;
nx3_ENoteArticulation.Tenuto = ["Tenuto",1];
nx3_ENoteArticulation.Tenuto.toString = $estr;
nx3_ENoteArticulation.Tenuto.__enum__ = nx3_ENoteArticulation;
nx3_ENoteArticulation.Marcato = ["Marcato",2];
nx3_ENoteArticulation.Marcato.toString = $estr;
nx3_ENoteArticulation.Marcato.__enum__ = nx3_ENoteArticulation;
var nx3_ENoteAttributes = { __ename__ : true, __constructs__ : ["Arpeggio","Clef"] };
nx3_ENoteAttributes.Arpeggio = function(top,bottomY) { var $x = ["Arpeggio",0,top,bottomY]; $x.__enum__ = nx3_ENoteAttributes; $x.toString = $estr; return $x; };
nx3_ENoteAttributes.Clef = function(variant) { var $x = ["Clef",1,variant]; $x.__enum__ = nx3_ENoteAttributes; $x.toString = $estr; return $x; };
var nx3_ENoteType = { __ename__ : true, __constructs__ : ["Note","Pause","BarPause","Tpl","Lyric","Chord","Dynamics","Pitch"] };
nx3_ENoteType.Note = function(heads,variant,articulations,attributes) { var $x = ["Note",0,heads,variant,articulations,attributes]; $x.__enum__ = nx3_ENoteType; $x.toString = $estr; return $x; };
nx3_ENoteType.Pause = function(level) { var $x = ["Pause",1,level]; $x.__enum__ = nx3_ENoteType; $x.toString = $estr; return $x; };
nx3_ENoteType.BarPause = ["BarPause",2];
nx3_ENoteType.BarPause.toString = $estr;
nx3_ENoteType.BarPause.__enum__ = nx3_ENoteType;
nx3_ENoteType.Tpl = function(level,sign,pause) { var $x = ["Tpl",3,level,sign,pause]; $x.__enum__ = nx3_ENoteType; $x.toString = $estr; return $x; };
nx3_ENoteType.Lyric = function(text,offset,continuation,font) { var $x = ["Lyric",4,text,offset,continuation,font]; $x.__enum__ = nx3_ENoteType; $x.toString = $estr; return $x; };
nx3_ENoteType.Chord = ["Chord",5];
nx3_ENoteType.Chord.toString = $estr;
nx3_ENoteType.Chord.__enum__ = nx3_ENoteType;
nx3_ENoteType.Dynamics = ["Dynamics",6];
nx3_ENoteType.Dynamics.toString = $estr;
nx3_ENoteType.Dynamics.__enum__ = nx3_ENoteType;
nx3_ENoteType.Pitch = function(level,midinote) { var $x = ["Pitch",7,level,midinote]; $x.__enum__ = nx3_ENoteType; $x.toString = $estr; return $x; };
var nx3_ENoteVal = { __ename__ : true, __constructs__ : ["Nv1","Nv1dot","Nv1ddot","Nv1tri","Nv2","Nv2dot","Nv2ddot","Nv2tri","Nv4","Nv4dot","Nv4ddot","Nv4tri","Nv8","Nv8dot","Nv8ddot","Nv8tri","Nv16","Nv16dot","Nv16ddot","Nv16tri","Nv32","Nv32dot","Nv32ddot","Nv32tri"] };
nx3_ENoteVal.Nv1 = ["Nv1",0];
nx3_ENoteVal.Nv1.toString = $estr;
nx3_ENoteVal.Nv1.__enum__ = nx3_ENoteVal;
nx3_ENoteVal.Nv1dot = ["Nv1dot",1];
nx3_ENoteVal.Nv1dot.toString = $estr;
nx3_ENoteVal.Nv1dot.__enum__ = nx3_ENoteVal;
nx3_ENoteVal.Nv1ddot = ["Nv1ddot",2];
nx3_ENoteVal.Nv1ddot.toString = $estr;
nx3_ENoteVal.Nv1ddot.__enum__ = nx3_ENoteVal;
nx3_ENoteVal.Nv1tri = ["Nv1tri",3];
nx3_ENoteVal.Nv1tri.toString = $estr;
nx3_ENoteVal.Nv1tri.__enum__ = nx3_ENoteVal;
nx3_ENoteVal.Nv2 = ["Nv2",4];
nx3_ENoteVal.Nv2.toString = $estr;
nx3_ENoteVal.Nv2.__enum__ = nx3_ENoteVal;
nx3_ENoteVal.Nv2dot = ["Nv2dot",5];
nx3_ENoteVal.Nv2dot.toString = $estr;
nx3_ENoteVal.Nv2dot.__enum__ = nx3_ENoteVal;
nx3_ENoteVal.Nv2ddot = ["Nv2ddot",6];
nx3_ENoteVal.Nv2ddot.toString = $estr;
nx3_ENoteVal.Nv2ddot.__enum__ = nx3_ENoteVal;
nx3_ENoteVal.Nv2tri = ["Nv2tri",7];
nx3_ENoteVal.Nv2tri.toString = $estr;
nx3_ENoteVal.Nv2tri.__enum__ = nx3_ENoteVal;
nx3_ENoteVal.Nv4 = ["Nv4",8];
nx3_ENoteVal.Nv4.toString = $estr;
nx3_ENoteVal.Nv4.__enum__ = nx3_ENoteVal;
nx3_ENoteVal.Nv4dot = ["Nv4dot",9];
nx3_ENoteVal.Nv4dot.toString = $estr;
nx3_ENoteVal.Nv4dot.__enum__ = nx3_ENoteVal;
nx3_ENoteVal.Nv4ddot = ["Nv4ddot",10];
nx3_ENoteVal.Nv4ddot.toString = $estr;
nx3_ENoteVal.Nv4ddot.__enum__ = nx3_ENoteVal;
nx3_ENoteVal.Nv4tri = ["Nv4tri",11];
nx3_ENoteVal.Nv4tri.toString = $estr;
nx3_ENoteVal.Nv4tri.__enum__ = nx3_ENoteVal;
nx3_ENoteVal.Nv8 = ["Nv8",12];
nx3_ENoteVal.Nv8.toString = $estr;
nx3_ENoteVal.Nv8.__enum__ = nx3_ENoteVal;
nx3_ENoteVal.Nv8dot = ["Nv8dot",13];
nx3_ENoteVal.Nv8dot.toString = $estr;
nx3_ENoteVal.Nv8dot.__enum__ = nx3_ENoteVal;
nx3_ENoteVal.Nv8ddot = ["Nv8ddot",14];
nx3_ENoteVal.Nv8ddot.toString = $estr;
nx3_ENoteVal.Nv8ddot.__enum__ = nx3_ENoteVal;
nx3_ENoteVal.Nv8tri = ["Nv8tri",15];
nx3_ENoteVal.Nv8tri.toString = $estr;
nx3_ENoteVal.Nv8tri.__enum__ = nx3_ENoteVal;
nx3_ENoteVal.Nv16 = ["Nv16",16];
nx3_ENoteVal.Nv16.toString = $estr;
nx3_ENoteVal.Nv16.__enum__ = nx3_ENoteVal;
nx3_ENoteVal.Nv16dot = ["Nv16dot",17];
nx3_ENoteVal.Nv16dot.toString = $estr;
nx3_ENoteVal.Nv16dot.__enum__ = nx3_ENoteVal;
nx3_ENoteVal.Nv16ddot = ["Nv16ddot",18];
nx3_ENoteVal.Nv16ddot.toString = $estr;
nx3_ENoteVal.Nv16ddot.__enum__ = nx3_ENoteVal;
nx3_ENoteVal.Nv16tri = ["Nv16tri",19];
nx3_ENoteVal.Nv16tri.toString = $estr;
nx3_ENoteVal.Nv16tri.__enum__ = nx3_ENoteVal;
nx3_ENoteVal.Nv32 = ["Nv32",20];
nx3_ENoteVal.Nv32.toString = $estr;
nx3_ENoteVal.Nv32.__enum__ = nx3_ENoteVal;
nx3_ENoteVal.Nv32dot = ["Nv32dot",21];
nx3_ENoteVal.Nv32dot.toString = $estr;
nx3_ENoteVal.Nv32dot.__enum__ = nx3_ENoteVal;
nx3_ENoteVal.Nv32ddot = ["Nv32ddot",22];
nx3_ENoteVal.Nv32ddot.toString = $estr;
nx3_ENoteVal.Nv32ddot.__enum__ = nx3_ENoteVal;
nx3_ENoteVal.Nv32tri = ["Nv32tri",23];
nx3_ENoteVal.Nv32tri.toString = $estr;
nx3_ENoteVal.Nv32tri.__enum__ = nx3_ENoteVal;
var nx3_ENoteValTools = function() { };
nx3_ENoteValTools.__name__ = true;
nx3_ENoteValTools.beaminglevel = function(val) {
	switch(val[1]) {
	case 12:
		return 1;
	case 15:
		return 1;
	case 13:
		return 1;
	case 14:
		return 1;
	case 16:
		return 2;
	case 19:
		return 2;
	case 17:
		return 2;
	case 18:
		return 2;
	case 20:
		return 3;
	case 23:
		return 3;
	case 21:
		return 3;
	case 22:
		return 3;
	default:
		return 0;
	}
};
nx3_ENoteValTools.stavinglevel = function(val) {
	switch(val[1]) {
	case 0:
		return 0;
	case 3:
		return 0;
	case 1:
		return 0;
	case 2:
		return 0;
	default:
		return 1;
	}
};
nx3_ENoteValTools.dotlevel = function(val) {
	switch(val[1]) {
	case 1:case 5:case 9:case 13:case 17:case 21:
		return 1;
	case 2:case 6:case 10:case 14:case 18:case 22:
		return 2;
	default:
		return 0;
	}
};
nx3_ENoteValTools.head = function(val) {
	switch(val[1]) {
	case 0:
		return nx3_EHeadValueType.HVT1;
	case 3:
		return nx3_EHeadValueType.HVT1;
	case 1:
		return nx3_EHeadValueType.HVT1;
	case 2:
		return nx3_EHeadValueType.HVT1;
	case 4:
		return nx3_EHeadValueType.HVT2;
	case 7:
		return nx3_EHeadValueType.HVT2;
	case 5:
		return nx3_EHeadValueType.HVT2;
	case 6:
		return nx3_EHeadValueType.HVT2;
	default:
		return nx3_EHeadValueType.HVT4;
	}
};
nx3_ENoteValTools.value = function(noteval) {
	switch(noteval[1]) {
	case 0:
		return 12096;
	case 1:
		return 18144;
	case 2:
		return 21168;
	case 3:
		return 8063;
	case 4:
		return 6048;
	case 5:
		return 9072;
	case 6:
		return 10584;
	case 7:
		return 4031;
	case 8:
		return 3024;
	case 9:
		return 4536;
	case 10:
		return 5292;
	case 11:
		return 2015;
	case 12:
		return 1512;
	case 13:
		return 2268;
	case 14:
		return 2646;
	case 15:
		return 1007;
	case 16:
		return 756;
	case 17:
		return 1134;
	case 18:
		return 1323;
	case 19:
		return 503;
	case 20:
		return 378;
	case 21:
		return 567;
	case 22:
		return 661;
	case 23:
		return 251;
	}
};
nx3_ENoteValTools.getFromValue = function(value) {
	switch(value) {
	case 12096:
		return nx3_ENoteVal.Nv1;
	case 18144:
		return nx3_ENoteVal.Nv1dot;
	case 21168:
		return nx3_ENoteVal.Nv1ddot;
	case 8063:
		return nx3_ENoteVal.Nv1tri;
	case 6048:
		return nx3_ENoteVal.Nv2;
	case 9072:
		return nx3_ENoteVal.Nv2dot;
	case 10584:
		return nx3_ENoteVal.Nv2ddot;
	case 4031:
		return nx3_ENoteVal.Nv2tri;
	case 3024:
		return nx3_ENoteVal.Nv4;
	case 4536:
		return nx3_ENoteVal.Nv4dot;
	case 5292:
		return nx3_ENoteVal.Nv4ddot;
	case 2015:
		return nx3_ENoteVal.Nv4tri;
	case 1512:
		return nx3_ENoteVal.Nv8;
	case 2268:
		return nx3_ENoteVal.Nv8dot;
	case 2646:
		return nx3_ENoteVal.Nv8ddot;
	case 1007:
		return nx3_ENoteVal.Nv8tri;
	case 756:
		return nx3_ENoteVal.Nv16;
	case 1134:
		return nx3_ENoteVal.Nv16dot;
	case 1323:
		return nx3_ENoteVal.Nv16ddot;
	case 503:
		return nx3_ENoteVal.Nv16tri;
	case 378:
		return nx3_ENoteVal.Nv32;
	case 567:
		return nx3_ENoteVal.Nv32dot;
	case 661:
		return nx3_ENoteVal.Nv32ddot;
	case 251:
		return nx3_ENoteVal.Nv32tri;
	default:
		return null;
	}
};
nx3_ENoteValTools.toValString = function(val) {
	switch(val[1]) {
	case 0:
		return "1";
	case 1:
		return "1.";
	case 2:
		return "1..";
	case 3:
		return "1-3";
	case 4:
		return "2";
	case 5:
		return "2.";
	case 6:
		return "2..";
	case 7:
		return "2-3";
	case 8:
		return "4";
	case 9:
		return "4.";
	case 10:
		return "4..";
	case 11:
		return "4-3";
	case 12:
		return "8";
	case 13:
		return "8.";
	case 14:
		return "8..";
	case 15:
		return "8-3";
	case 16:
		return "16";
	case 17:
		return "16.";
	case 18:
		return "16..";
	case 19:
		return "16-3";
	case 20:
		return "32";
	case 21:
		return "32.";
	case 22:
		return "32..";
	case 23:
		return "32-3";
	}
};
nx3_ENoteValTools.fromValString = function(valString) {
	if(valString == null) return nx3_ENoteVal.Nv4; else switch(valString) {
	case "":
		return nx3_ENoteVal.Nv4;
	case "1":
		return nx3_ENoteVal.Nv1;
	case "1.":
		return nx3_ENoteVal.Nv1dot;
	case "1..":
		return nx3_ENoteVal.Nv1ddot;
	case "1-3":
		return nx3_ENoteVal.Nv1tri;
	case "2":
		return nx3_ENoteVal.Nv2;
	case "2.":
		return nx3_ENoteVal.Nv2dot;
	case "2..":
		return nx3_ENoteVal.Nv2ddot;
	case "2-3":
		return nx3_ENoteVal.Nv2tri;
	case "4":
		return nx3_ENoteVal.Nv4;
	case "4.":
		return nx3_ENoteVal.Nv4dot;
	case "4..":
		return nx3_ENoteVal.Nv4ddot;
	case "4-3":
		return nx3_ENoteVal.Nv4tri;
	case "8":
		return nx3_ENoteVal.Nv8;
	case "8.":
		return nx3_ENoteVal.Nv8dot;
	case "8..":
		return nx3_ENoteVal.Nv8ddot;
	case "8-3":
		return nx3_ENoteVal.Nv8tri;
	case "16":
		return nx3_ENoteVal.Nv16;
	case "16.":
		return nx3_ENoteVal.Nv16dot;
	case "16..":
		return nx3_ENoteVal.Nv16ddot;
	case "16-3":
		return nx3_ENoteVal.Nv16tri;
	case "32":
		return nx3_ENoteVal.Nv32;
	case "32.":
		return nx3_ENoteVal.Nv32dot;
	case "32..":
		return nx3_ENoteVal.Nv32ddot;
	case "32-3":
		return nx3_ENoteVal.Nv32tri;
	default:
		throw new js__$Boot_HaxeError("unhandled note value: " + valString);
	}
};
var nx3_EOctave = { __ename__ : true, __constructs__ : ["Normal","Up","Down"] };
nx3_EOctave.Normal = ["Normal",0];
nx3_EOctave.Normal.toString = $estr;
nx3_EOctave.Normal.__enum__ = nx3_EOctave;
nx3_EOctave.Up = ["Up",1];
nx3_EOctave.Up.toString = $estr;
nx3_EOctave.Up.__enum__ = nx3_EOctave;
nx3_EOctave.Down = ["Down",2];
nx3_EOctave.Down.toString = $estr;
nx3_EOctave.Down.__enum__ = nx3_EOctave;
var nx3_EPartType = { __ename__ : true, __constructs__ : ["Normal","Lyrics","Tplrow","Tplchain","Dynamics","Chords","Ignore","Hidden","PitchRow","PitchChain"] };
nx3_EPartType.Normal = ["Normal",0];
nx3_EPartType.Normal.toString = $estr;
nx3_EPartType.Normal.__enum__ = nx3_EPartType;
nx3_EPartType.Lyrics = ["Lyrics",1];
nx3_EPartType.Lyrics.toString = $estr;
nx3_EPartType.Lyrics.__enum__ = nx3_EPartType;
nx3_EPartType.Tplrow = function(modus,octave) { var $x = ["Tplrow",2,modus,octave]; $x.__enum__ = nx3_EPartType; $x.toString = $estr; return $x; };
nx3_EPartType.Tplchain = function(modus,octave) { var $x = ["Tplchain",3,modus,octave]; $x.__enum__ = nx3_EPartType; $x.toString = $estr; return $x; };
nx3_EPartType.Dynamics = ["Dynamics",4];
nx3_EPartType.Dynamics.toString = $estr;
nx3_EPartType.Dynamics.__enum__ = nx3_EPartType;
nx3_EPartType.Chords = ["Chords",5];
nx3_EPartType.Chords.toString = $estr;
nx3_EPartType.Chords.__enum__ = nx3_EPartType;
nx3_EPartType.Ignore = ["Ignore",6];
nx3_EPartType.Ignore.toString = $estr;
nx3_EPartType.Ignore.__enum__ = nx3_EPartType;
nx3_EPartType.Hidden = ["Hidden",7];
nx3_EPartType.Hidden.toString = $estr;
nx3_EPartType.Hidden.__enum__ = nx3_EPartType;
nx3_EPartType.PitchRow = ["PitchRow",8];
nx3_EPartType.PitchRow.toString = $estr;
nx3_EPartType.PitchRow.__enum__ = nx3_EPartType;
nx3_EPartType.PitchChain = function(leveloffset) { var $x = ["PitchChain",9,leveloffset]; $x.__enum__ = nx3_EPartType; $x.toString = $estr; return $x; };
var nx3_EPosition = { __ename__ : true, __constructs__ : ["X","Y","XY","XYW"] };
nx3_EPosition.X = function(x) { var $x = ["X",0,x]; $x.__enum__ = nx3_EPosition; $x.toString = $estr; return $x; };
nx3_EPosition.Y = function(y) { var $x = ["Y",1,y]; $x.__enum__ = nx3_EPosition; $x.toString = $estr; return $x; };
nx3_EPosition.XY = function(x,y) { var $x = ["XY",2,x,y]; $x.__enum__ = nx3_EPosition; $x.toString = $estr; return $x; };
nx3_EPosition.XYW = function(x,y,w) { var $x = ["XYW",3,x,y,w]; $x.__enum__ = nx3_EPosition; $x.toString = $estr; return $x; };
var nx3_ESign = { __ename__ : true, __constructs__ : ["None","Natural","Flat","Sharp","DoubleFlat","DoubleSharp","ParNatural","ParFlat","ParSharp"] };
nx3_ESign.None = ["None",0];
nx3_ESign.None.toString = $estr;
nx3_ESign.None.__enum__ = nx3_ESign;
nx3_ESign.Natural = ["Natural",1];
nx3_ESign.Natural.toString = $estr;
nx3_ESign.Natural.__enum__ = nx3_ESign;
nx3_ESign.Flat = ["Flat",2];
nx3_ESign.Flat.toString = $estr;
nx3_ESign.Flat.__enum__ = nx3_ESign;
nx3_ESign.Sharp = ["Sharp",3];
nx3_ESign.Sharp.toString = $estr;
nx3_ESign.Sharp.__enum__ = nx3_ESign;
nx3_ESign.DoubleFlat = ["DoubleFlat",4];
nx3_ESign.DoubleFlat.toString = $estr;
nx3_ESign.DoubleFlat.__enum__ = nx3_ESign;
nx3_ESign.DoubleSharp = ["DoubleSharp",5];
nx3_ESign.DoubleSharp.toString = $estr;
nx3_ESign.DoubleSharp.__enum__ = nx3_ESign;
nx3_ESign.ParNatural = ["ParNatural",6];
nx3_ESign.ParNatural.toString = $estr;
nx3_ESign.ParNatural.__enum__ = nx3_ESign;
nx3_ESign.ParFlat = ["ParFlat",7];
nx3_ESign.ParFlat.toString = $estr;
nx3_ESign.ParFlat.__enum__ = nx3_ESign;
nx3_ESign.ParSharp = ["ParSharp",8];
nx3_ESign.ParSharp.toString = $estr;
nx3_ESign.ParSharp.__enum__ = nx3_ESign;
var nx3_ETie = { __ename__ : true, __constructs__ : ["Tie","Gliss"] };
nx3_ETie.Tie = function(direction,level) { var $x = ["Tie",0,direction,level]; $x.__enum__ = nx3_ETie; $x.toString = $estr; return $x; };
nx3_ETie.Gliss = function(direction,levelLeft,levelRight) { var $x = ["Gliss",1,direction,levelLeft,levelRight]; $x.__enum__ = nx3_ETie; $x.toString = $estr; return $x; };
var nx3_ETime = { __ename__ : true, __constructs__ : ["Time2_2","Time3_2","Time4_2","Time2_4","Time3_4","Time4_4","Time5_4","Time6_4","Time7_4","Time2_8","Time3_8","Time4_8","Time5_8","Time6_8","Time7_8","Time9_8","Time12_8","TimeCommon","TimeAllabreve"] };
nx3_ETime.Time2_2 = ["Time2_2",0];
nx3_ETime.Time2_2.toString = $estr;
nx3_ETime.Time2_2.__enum__ = nx3_ETime;
nx3_ETime.Time3_2 = ["Time3_2",1];
nx3_ETime.Time3_2.toString = $estr;
nx3_ETime.Time3_2.__enum__ = nx3_ETime;
nx3_ETime.Time4_2 = ["Time4_2",2];
nx3_ETime.Time4_2.toString = $estr;
nx3_ETime.Time4_2.__enum__ = nx3_ETime;
nx3_ETime.Time2_4 = ["Time2_4",3];
nx3_ETime.Time2_4.toString = $estr;
nx3_ETime.Time2_4.__enum__ = nx3_ETime;
nx3_ETime.Time3_4 = ["Time3_4",4];
nx3_ETime.Time3_4.toString = $estr;
nx3_ETime.Time3_4.__enum__ = nx3_ETime;
nx3_ETime.Time4_4 = ["Time4_4",5];
nx3_ETime.Time4_4.toString = $estr;
nx3_ETime.Time4_4.__enum__ = nx3_ETime;
nx3_ETime.Time5_4 = ["Time5_4",6];
nx3_ETime.Time5_4.toString = $estr;
nx3_ETime.Time5_4.__enum__ = nx3_ETime;
nx3_ETime.Time6_4 = ["Time6_4",7];
nx3_ETime.Time6_4.toString = $estr;
nx3_ETime.Time6_4.__enum__ = nx3_ETime;
nx3_ETime.Time7_4 = ["Time7_4",8];
nx3_ETime.Time7_4.toString = $estr;
nx3_ETime.Time7_4.__enum__ = nx3_ETime;
nx3_ETime.Time2_8 = ["Time2_8",9];
nx3_ETime.Time2_8.toString = $estr;
nx3_ETime.Time2_8.__enum__ = nx3_ETime;
nx3_ETime.Time3_8 = ["Time3_8",10];
nx3_ETime.Time3_8.toString = $estr;
nx3_ETime.Time3_8.__enum__ = nx3_ETime;
nx3_ETime.Time4_8 = ["Time4_8",11];
nx3_ETime.Time4_8.toString = $estr;
nx3_ETime.Time4_8.__enum__ = nx3_ETime;
nx3_ETime.Time5_8 = ["Time5_8",12];
nx3_ETime.Time5_8.toString = $estr;
nx3_ETime.Time5_8.__enum__ = nx3_ETime;
nx3_ETime.Time6_8 = ["Time6_8",13];
nx3_ETime.Time6_8.toString = $estr;
nx3_ETime.Time6_8.__enum__ = nx3_ETime;
nx3_ETime.Time7_8 = ["Time7_8",14];
nx3_ETime.Time7_8.toString = $estr;
nx3_ETime.Time7_8.__enum__ = nx3_ETime;
nx3_ETime.Time9_8 = ["Time9_8",15];
nx3_ETime.Time9_8.toString = $estr;
nx3_ETime.Time9_8.__enum__ = nx3_ETime;
nx3_ETime.Time12_8 = ["Time12_8",16];
nx3_ETime.Time12_8.toString = $estr;
nx3_ETime.Time12_8.__enum__ = nx3_ETime;
nx3_ETime.TimeCommon = ["TimeCommon",17];
nx3_ETime.TimeCommon.toString = $estr;
nx3_ETime.TimeCommon.__enum__ = nx3_ETime;
nx3_ETime.TimeAllabreve = ["TimeAllabreve",18];
nx3_ETime.TimeAllabreve.toString = $estr;
nx3_ETime.TimeAllabreve.__enum__ = nx3_ETime;
var nx3_ETimeUtils = function() { };
nx3_ETimeUtils.__name__ = true;
nx3_ETimeUtils.toString = function(time) {
	if(time == null) return "";
	switch(time[1]) {
	case 0:
		return "2/2";
	case 1:
		return "3/2";
	case 2:
		return "4/2";
	case 8:
		return "7/4";
	case 7:
		return "6/4";
	case 6:
		return "5/4";
	case 5:
		return "4/4";
	case 4:
		return "3/4";
	case 3:
		return "2/4";
	case 9:
		return "2/8";
	case 10:
		return "3/8";
	case 11:
		return "4/8";
	case 12:
		return "5/8";
	case 13:
		return "6/8";
	case 14:
		return "7/8";
	case 15:
		return "9/8";
	case 16:
		return "12/8";
	case 17:
		return "C";
	case 18:
		return "AllaBreve";
	}
	return "time-unknown";
};
nx3_ETimeUtils.fromString = function(str) {
	if(str == null) return null;
	switch(str) {
	case "4/2":
		return nx3_ETime.Time4_2;
	case "3/2":
		return nx3_ETime.Time3_2;
	case "224":
		return nx3_ETime.Time2_2;
	case "7/4":
		return nx3_ETime.Time7_4;
	case "6/4":
		return nx3_ETime.Time6_4;
	case "5/4":
		return nx3_ETime.Time5_4;
	case "4/4":
		return nx3_ETime.Time4_4;
	case "3/4":
		return nx3_ETime.Time3_4;
	case "2/4":
		return nx3_ETime.Time2_4;
	case "2/8":
		return nx3_ETime.Time2_8;
	case "3/8":
		return nx3_ETime.Time3_8;
	case "4/8":
		return nx3_ETime.Time4_8;
	case "5/8":
		return nx3_ETime.Time5_8;
	case "6/8":
		return nx3_ETime.Time6_8;
	case "7/8":
		return nx3_ETime.Time7_8;
	case "9/8":
		return nx3_ETime.Time9_8;
	case "12/8":
		return nx3_ETime.Time12_8;
	case "C":
		return nx3_ETime.TimeCommon;
	case "AllaBreve":
		return nx3_ETime.TimeAllabreve;
	default:
		return null;
	}
	return null;
};
var nx3_EVoiceType = { __ename__ : true, __constructs__ : ["Normal","Barpause"] };
nx3_EVoiceType.Normal = ["Normal",0];
nx3_EVoiceType.Normal.toString = $estr;
nx3_EVoiceType.Normal.__enum__ = nx3_EVoiceType;
nx3_EVoiceType.Barpause = function(level) { var $x = ["Barpause",1,level]; $x.__enum__ = nx3_EVoiceType; $x.toString = $estr; return $x; };
var nx3_IBarWidthCalculator = function() { };
nx3_IBarWidthCalculator.__name__ = true;
nx3_IBarWidthCalculator.prototype = {
	__class__: nx3_IBarWidthCalculator
};
var nx3_NBar = function(parts,type,time,timeDisplay,allotment,spacing) {
	if(spacing == null) spacing = 0;
	this.nparts = parts;
	var _g = 0;
	while(_g < parts.length) {
		var part = parts[_g];
		++_g;
		part.nbar = this;
	}
	if(type == null) this.type = nx3_EBarType.Normal; else this.type = type;
	this.time = time;
	if(timeDisplay == null) this.timeDisplay = nx3_EDisplayALN.Layout; else this.timeDisplay = timeDisplay;
	if(allotment == null) this.allotment = nx3_EAllotment.Logaritmic; else this.allotment = allotment;
	if(spacing != 0) this.spacing = spacing; else this.spacing = 8;
};
nx3_NBar.__name__ = true;
nx3_NBar.prototype = {
	getNNote: function(partIdx,voiceIdx,noteIdx) {
		return this.getNPart(partIdx).getNVoice(voiceIdx).getNNote(noteIdx);
	}
	,getNPart: function(idx) {
		if(idx < 0 || idx > this.nparts.length) return null; else return this.nparts[idx];
	}
	,iterator: function() {
		return HxOverrides.iter(this.nparts);
	}
	,get_length: function() {
		return this.nparts.length;
	}
	,getTag: function() {
		var partstags = "";
		Lambda.iter(this.nparts,function(npart) {
			partstags += npart.getTag();
		});
		var time = nx3_NTags.timeTag(this.time) + nx3_NTags.displayALNTag(this.timeDisplay);
		var spacing;
		if(this.spacing != 8) spacing = "sp:" + this.spacing; else spacing = "";
		var type = nx3_NTags.nbarTypeTag(this.type);
		var allot = nx3_NTags.nbarAllotmentTag(this.allotment);
		return "/" + type + partstags + time + allot + spacing;
	}
	,__class__: nx3_NBar
};
var nx3_NHead = function(type,level,sign,tie,tieTo) {
	if(level == null) level = 0;
	if(type != null) this.type = type; else this.type = nx3_EHeadType.Normal;
	if(sign != null) this.sign = sign; else this.sign = nx3_ESign.None;
	if(tie != null) this.tie = tie; else this.tie = null;
	if(tieTo != null) this.tieTo = tieTo; else this.tieTo = null;
	this.level = level;
};
nx3_NHead.__name__ = true;
nx3_NHead.prototype = {
	toString: function() {
		var str = "" + this.level;
		if(this.type != nx3_EHeadType.Normal) str += " " + this.type[0]; else str += "";
		if(this.sign != nx3_ESign.None) str += " " + this.sign[0]; else str += "";
		return "NHead(" + str + ")";
	}
	,getTag: function() {
		var level = Std.string(this.level);
		var tie;
		if(this.tie != null) tie = "_"; else tie = "";
		var sign = nx3_NTags.headSignTag(this.sign);
		var type = nx3_NTags.headTypetag(this.type);
		return "&" + type + level + sign + tie;
	}
	,__class__: nx3_NHead
};
var nx3_NNote = function(type,heads,value,direction) {
	if(type == null) if(heads != null) type = nx3_ENoteType.Note(heads); else type = nx3_ENoteType.Note([new nx3_NHead()]);
	if(heads != null) {
		var _g = 0;
		while(_g < heads.length) {
			var head = heads[_g];
			++_g;
			head.nnote = this;
		}
	}
	if(type == null) this.type = nx3_ENoteType.Note(heads); else this.type = type;
	if(value == null) this.value = nx3_ENoteVal.Nv4; else this.value = value;
	if(direction == null) this.direction = nx3_EDirectionUAD.Auto; else this.direction = direction;
};
nx3_NNote.__name__ = true;
nx3_NNote.__interfaces__ = [hxlazy_Lazy];
nx3_NNote.prototype = {
	iterator: function() {
		var _this = this.get_nheads();
		return HxOverrides.iter(_this);
	}
	,get_length: function() {
		return this.get_nheads().length;
	}
	,get_nheads: function() {
		if(this.nheads_ != null) return this.nheads_;
		{
			var _g = this.type;
			switch(_g[1]) {
			case 0:
				var attributes = _g[5];
				var articulations = _g[4];
				var variant = _g[3];
				var nheads = _g[2];
				nheads.sort(function(a,b) {
					return Reflect.compare(a.level,b.level);
				});
				this.nheads_ = nheads;
				break;
			case 1:
				var level = _g[2];
				this.nheads_ = [new nx3_NHead(nx3_EHeadType.Pause,level)];
				break;
			default:
				this.nheads_ = [new nx3_NHead(nx3_EHeadType.Other,0)];
			}
		}
		return this.nheads_;
	}
	,getNHead: function(idx) {
		if(idx < 0 || idx > this.get_nheads().length) return null; else return this.get_nheads()[idx];
	}
	,toString: function() {
		var str = "";
		if(this.type[0] != "Note") str += " " + this.type[0]; else str += "";
		var heads = "";
		var _g = 0;
		var _g1 = this.get_nheads();
		while(_g < _g1.length) {
			var head = _g1[_g];
			++_g;
			heads += head.toString();
		}
		return "NNote(" + str + "):" + heads;
	}
	,getTag: function() {
		var headstags = "";
		Lambda.iter(this,function(nhead) {
			headstags += nhead.getTag();
		});
		var type = nx3_NTags.noteTypeTag(this.type);
		var val = nx3_ENoteValTools.toValString(this.value);
		return "%l" + type + headstags + val;
	}
	,get_headLevels: function() {
		if(this.__lazyheadLevels != null) return this.__lazyheadLevels;
		return this.__lazyheadLevels = Lambda.array(Lambda.map(this,function(head) {
			return head.level;
		}));
	}
	,get_topLevel: function() {
		if(this.__lazytopLevel != null) return this.__lazytopLevel;
		return this.__lazytopLevel = this.get_nheads()[0].level;
	}
	,get_bottomLevel: function() {
		if(this.__lazybottomLevel != null) return this.__lazybottomLevel;
		return this.__lazybottomLevel = this.get_nheads()[this.get_nheads().length - 1].level;
	}
	,get_ties: function() {
		if(this.__lazyties != null) return this.__lazyties;
		return this.__lazyties = Lambda.array(Lambda.filter(this,function(head) {
			return head.tie != null;
		}).map(function(head1) {
			return head1.tie;
		}));
	}
	,__class__: nx3_NNote
};
var nx3_NPart = function(voices,type,clef,clefDisplay,key,keyDisplay,sound) {
	if(sound == null) sound = "";
	this.nvoices = voices;
	var _g = 0;
	while(_g < voices.length) {
		var voice = voices[_g];
		++_g;
		voice.npart = this;
	}
	if(this.nvoices.length > 2) throw new js__$Boot_HaxeError("For now, NPart can't have more than two voices");
	if(type == null) this.type = nx3_EPartType.Normal; else this.type = type;
	this.clef = clef;
	if(clefDisplay == null) this.clefDisplay = nx3_EDisplayALN.Layout; else this.clefDisplay = clefDisplay;
	this.key = key;
	if(keyDisplay == null) this.keyDisplay = nx3_EDisplayALN.Layout; else this.keyDisplay = keyDisplay;
	this.sound = sound;
};
nx3_NPart.__name__ = true;
nx3_NPart.prototype = {
	iterator: function() {
		return HxOverrides.iter(this.nvoices);
	}
	,get_length: function() {
		return this.nvoices.length;
	}
	,getNVoice: function(idx) {
		if(idx < 0 || idx > this.nvoices.length) return null; else return this.nvoices[idx];
	}
	,getTag: function() {
		var voicestags = "";
		Lambda.iter(this,function(nvoice) {
			voicestags += nvoice.getTag();
		});
		var clef = nx3_NTags.clefTag(this.clef) + nx3_NTags.displayALNTag(this.clefDisplay);
		var key = nx3_NTags.keyTag(this.key) + nx3_NTags.displayALNTag(this.keyDisplay);
		var type = nx3_NTags.npartTypeTag(this.type);
		return "!" + type + voicestags + clef + key;
	}
	,__class__: nx3_NPart
};
var nx3_NScore = function(nbars) {
	this.tag = null;
	this.nbars = nbars;
	var _g = 0;
	while(_g < nbars.length) {
		var bar = nbars[_g];
		++_g;
		bar.nscore = this;
	}
	this.configuration = { };
	this.configuration.test = 123;
	this.configuration.rtempo = 80;
	this.configuration.rlength = 3;
	this.guid = cx_GUID.create();
	this.playbackSounds = [];
};
nx3_NScore.__name__ = true;
nx3_NScore.prototype = {
	getNBar: function(idx) {
		if(idx < 0 || idx > this.nbars.length) return null; else return this.nbars[idx];
	}
	,iterator: function() {
		return HxOverrides.iter(this.nbars);
	}
	,get_length: function() {
		return this.nbars.length;
	}
	,getTag: function() {
		if(this.tag != null) return this.tag;
		var bartags = "";
		Lambda.iter(this.nbars,function(nbar) {
			bartags += nbar.getTag();
		});
		return this.tag = "#" + bartags;
	}
	,__class__: nx3_NScore
};
var nx3_NTags = function() {
};
nx3_NTags.__name__ = true;
nx3_NTags.nbarAllotmentTag = function(allotment) {
	if(allotment == null) return "";
	switch(allotment[1]) {
	case 1:
		return "aEQ";
	case 0:
		return "aLA";
	case 3:
		return "aLN";
	case 2:
		return "";
	}
};
nx3_NTags.nbarTypeTag = function(type) {
	if(type == null) return "";
	switch(type[1]) {
	case 3:
		return "bFO";
	case 2:
		return "bIG";
	case 1:
		return "bRP";
	default:
		return "";
	}
};
nx3_NTags.timeTag = function(time) {
	if(time == null) return "";
	return nx3_ETimeUtils.toString(time);
};
nx3_NTags.npartTypeTag = function(type) {
	if(type == null) return "";
	switch(type[1]) {
	case 5:
		return "pCH";
	case 4:
		return "pDY";
	case 7:
		return "pHI";
	case 6:
		return "pIG";
	case 1:
		return "pLY";
	case 8:
		return "pPR";
	case 3:
		return "pTC";
	case 2:
		return "pTR";
	default:
		return "";
	}
};
nx3_NTags.keyTag = function(key) {
	if(key == null) return "";
	return Std.string(nx3_EKeysTools.getKeyNr(key));
};
nx3_NTags.clefTag = function(clef) {
	if(clef == null) return "";
	switch(clef[1]) {
	case 2:
		return "C";
	case 1:
		return "F";
	case 0:
		return "G";
	}
};
nx3_NTags.displayALNTag = function(display) {
	if(display == null) return "";
	switch(display[1]) {
	case 0:
		return "dA";
	case 2:
		return "dN";
	default:
		return "";
	}
};
nx3_NTags.nvoiceTypeTag = function(type) {
	if(type == null) return "";
	switch(type[1]) {
	case 1:
		return "vBP";
	default:
		return "";
	}
};
nx3_NTags.directionUADTag = function(dir) {
	if(dir == null) return "";
	switch(dir[1]) {
	case 0:
		return "U";
	case 2:
		return "D";
	default:
		return "";
	}
};
nx3_NTags.noteTypeTag = function(type) {
	if(type == null) return "";
	switch(type[1]) {
	case 2:
		return "tB";
	case 5:
		return "tC";
	case 6:
		return "tD";
	case 4:
		var f = type[5];
		var c = type[4];
		var offset = type[3];
		var text = type[2];
		return "tL" + text + ":" + Std.string(offset);
	case 1:
		var level = type[2];
		return "tP" + level;
	case 7:
		var midinoter = type[3];
		var level1 = type[2];
		return "tI" + level1 + ":midinote";
	case 3:
		var pause = type[4];
		var sign = type[3];
		var level2 = type[2];
		return "tT" + level2 + ":" + Std.string(sign) + ":" + (pause == null?"null":"" + pause);
	default:
		return "";
	}
};
nx3_NTags.headSignTag = function(sign) {
	if(sign == null) return "";
	switch(sign[1]) {
	case 4:
		return "bb";
	case 2:
		return "b";
	case 3:
		return "#";
	case 5:
		return "##";
	case 1:
		return "N";
	default:
		return "";
	}
};
nx3_NTags.headTypetag = function(type) {
	if(type == null) return "";
	switch(type[1]) {
	case 2:
		return "tC";
	case 1:
		return "tR";
	case 3:
		return "tP";
	case 4:
		return "tO";
	default:
		return "";
	}
};
nx3_NTags.prototype = {
	__class__: nx3_NTags
};
var nx3_NVoice = function(notes,type,direction) {
	if(notes == null || notes.length == 0) {
		this.nnotes = [];
		this.type = nx3_EVoiceType.Barpause(0);
	} else {
		this.nnotes = notes;
		if(type != null) this.type = type; else this.type = nx3_EVoiceType.Normal;
	}
	var _g = 0;
	while(_g < notes.length) {
		var note = notes[_g];
		++_g;
		note.nvoice = this;
	}
	if(direction != null) this.direction = direction; else this.direction = nx3_EDirectionUAD.Auto;
};
nx3_NVoice.__name__ = true;
nx3_NVoice.prototype = {
	iterator: function() {
		return HxOverrides.iter(this.nnotes);
	}
	,get_length: function() {
		return this.nnotes.length;
	}
	,getNNote: function(idx) {
		if(idx < 0 || idx > this.nnotes.length) return null; else return this.nnotes[idx];
	}
	,getTag: function() {
		var dir = nx3_NTags.directionUADTag(this.direction);
		var type = nx3_NTags.nvoiceTypeTag(this.type);
		var notestags = "";
		Lambda.iter(this,function(nnote) {
			notestags += nnote.getTag();
		});
		return "@" + type + notestags + dir;
	}
	,__class__: nx3_NVoice
};
var nx3_PAttributesRectsCalculator = function() { };
nx3_PAttributesRectsCalculator.__name__ = true;
nx3_PAttributesRectsCalculator.getClefRect = function(clef) {
	switch(clef[1]) {
	case 2:
		return new nx3_geom_Rectangle(0,-3,9,6);
	case 1:
		return new nx3_geom_Rectangle(0,-4,9,8);
	case 0:
		return new nx3_geom_Rectangle(0,-5,9,10);
	}
};
nx3_PAttributesRectsCalculator.getKeyRect = function(key) {
	switch(key[1]) {
	case 6:
		return new nx3_geom_Rectangle(0,-3,1,6);
	case 7:case 5:
		return new nx3_geom_Rectangle(0,-3,4.4,6);
	case 8:case 4:
		return new nx3_geom_Rectangle(0,-3,6.8,6);
	case 9:case 3:
		return new nx3_geom_Rectangle(0,-3,9.2,6);
	case 10:case 2:
		return new nx3_geom_Rectangle(0,-3,11.6,6);
	case 11:case 1:
		return new nx3_geom_Rectangle(0,-3,14.,6);
	default:
		return new nx3_geom_Rectangle(0,-2,.5,4);
	}
};
nx3_PAttributesRectsCalculator.getTimeRect = function(time) {
	if(time == null) return new nx3_geom_Rectangle(0,-3,.5,3);
	switch(time[1]) {
	case 16:
		return new nx3_geom_Rectangle(0,-3,6,6);
	default:
		return new nx3_geom_Rectangle(0,-3,4,3);
	}
};
var nx3_PBamegroupFrameTipCalculator = function(notelevels,direction) {
	if(direction == nx3_EDirectionUD.Down) {
		var invertedLevels = [];
		var _g = 0;
		while(_g < notelevels.length) {
			var level = notelevels[_g];
			++_g;
			invertedLevels.push(level * -1);
		}
		notelevels = invertedLevels;
	}
	this.notelevels = notelevels;
	this.direction = direction;
};
nx3_PBamegroupFrameTipCalculator.__name__ = true;
nx3_PBamegroupFrameTipCalculator.floatMin = function(levels) {
	var result = levels[0];
	if(levels.length == 1) return result;
	var _g = 0;
	while(_g < levels.length) {
		var level = levels[_g];
		++_g;
		result = Math.min(result,level);
	}
	return result;
};
nx3_PBamegroupFrameTipCalculator.intMin = function(levels) {
	var result = levels[0];
	if(levels.length == 1) return result;
	var _g = 0;
	while(_g < levels.length) {
		var level = levels[_g];
		++_g;
		result = Std["int"](Math.min(result,level));
	}
	return result;
};
nx3_PBamegroupFrameTipCalculator.intMax = function(levels) {
	var result = levels[0];
	if(levels.length == 1) return result;
	var _g = 0;
	while(_g < levels.length) {
		var level = levels[_g];
		++_g;
		result = Std["int"](Math.max(result,level));
	}
	return result;
};
nx3_PBamegroupFrameTipCalculator.prototype = {
	getTips: function() {
		var stemLength = 7;
		var min = nx3_PBamegroupFrameTipCalculator.intMin(this.notelevels);
		var leftTip = this.notelevels[0];
		var rightTip = cx_ArrayTools.last(this.notelevels);
		if(this.notelevels.length == 2) {
			var slopevalue = 1;
			leftTip = nx3_PBamegroupFrameTipCalculator.floatMin([leftTip,rightTip + slopevalue,stemLength]);
			rightTip = nx3_PBamegroupFrameTipCalculator.floatMin([rightTip,leftTip + slopevalue,stemLength]);
		} else {
			var slopevalue1 = this.notelevels.length * .25;
			var inlevels = this.notelevels.slice();
			inlevels.shift();
			inlevels.pop();
			var inmin = nx3_PBamegroupFrameTipCalculator.intMin(inlevels);
			if(inlevels.length == 0) inmin = null;
			if(inmin != null && leftTip >= inmin && rightTip >= inmin) {
				leftTip = inmin;
				rightTip = inmin;
			} else if(rightTip < leftTip && min < leftTip) leftTip = nx3_PBamegroupFrameTipCalculator.floatMin([min + slopevalue1,leftTip]); else if(leftTip < rightTip && min < rightTip) rightTip = nx3_PBamegroupFrameTipCalculator.floatMin([min + slopevalue1,rightTip]);
		}
		leftTip = Std["int"](Math.min(stemLength,leftTip));
		rightTip = Std["int"](Math.min(stemLength,rightTip));
		if(this.direction == nx3_EDirectionUD.Down) return { leftTip : -leftTip, rightTip : -rightTip};
		return { leftTip : leftTip, rightTip : rightTip};
	}
	,__class__: nx3_PBamegroupFrameTipCalculator
};
var nx3_PBar = function(nbar) {
	this.stretchwidth = 0;
	this._keys = null;
	this._clefs = null;
	this.nbar = nbar;
	this.value = 0;
};
nx3_PBar.__name__ = true;
nx3_PBar.prototype = {
	iterator: function() {
		var _this = this.getParts();
		return HxOverrides.iter(_this);
	}
	,get_length: function() {
		return this.getParts().length;
	}
	,getScore: function() {
		return this.score;
	}
	,getSystembar: function() {
		return this.systembar;
	}
	,get_clefs: function() {
		if(this._clefs != null) return this._clefs;
		this._clefs = [];
		var _g = 0;
		var _g1 = this.getParts();
		while(_g < _g1.length) {
			var vpart = _g1[_g];
			++_g;
			this._clefs.push(vpart.npart.clef);
		}
		return this._clefs;
	}
	,get_keys: function() {
		if(this._keys != null) return this._keys;
		this._keys = [];
		var _g = 0;
		var _g1 = this.getParts();
		while(_g < _g1.length) {
			var vpart = _g1[_g];
			++_g;
			this._keys.push(vpart.npart.key);
		}
		return this._keys;
	}
	,get_time: function() {
		return this.nbar.time;
	}
	,get_displayClefs: function() {
		var result = nx3_EDisplayALN.Never;
		var _g = 0;
		var _g1 = this.getParts();
		while(_g < _g1.length) {
			var vpart = _g1[_g];
			++_g;
			if(vpart.npart.clefDisplay == null) result = nx3_EDisplayALN.Layout;
			if(vpart.npart.clefDisplay == nx3_EDisplayALN.Layout) result = nx3_EDisplayALN.Layout;
			if(vpart.npart.clefDisplay == nx3_EDisplayALN.Always) {
				result = nx3_EDisplayALN.Always;
				break;
			}
		}
		return result;
	}
	,get_displayKeys: function() {
		var result = nx3_EDisplayALN.Never;
		var _g = 0;
		var _g1 = this.getParts();
		while(_g < _g1.length) {
			var vpart = _g1[_g];
			++_g;
			if(vpart.npart.keyDisplay == null) result = nx3_EDisplayALN.Layout;
			if(vpart.npart.keyDisplay == nx3_EDisplayALN.Layout) result = nx3_EDisplayALN.Layout;
			if(vpart.npart.keyDisplay == nx3_EDisplayALN.Always) {
				result = nx3_EDisplayALN.Always;
				break;
			}
		}
		return result;
	}
	,get_displayTime: function() {
		var result;
		if(this.nbar.timeDisplay != null) result = this.nbar.timeDisplay; else result = nx3_EDisplayALN.Layout;
		return this.nbar.timeDisplay;
	}
	,getParts: function() {
		if(this.parts != null) return this.parts;
		this.parts = [];
		var _g = 0;
		var _g1 = this.nbar.nparts;
		while(_g < _g1.length) {
			var npart = _g1[_g];
			++_g;
			var ppart = new nx3_PPart(npart);
			ppart.bar = this;
			this.parts.push(ppart);
		}
		return this.parts;
	}
	,getPart: function(idx) {
		if(idx < 0 || idx > this.getParts().length) return null; else return this.getParts()[idx];
	}
	,getColumns: function() {
		if(this.columns != null) return this.columns;
		var generator = new nx3_PColumnsGenerator(this);
		this.columns = generator.getColumns();
		this.calculateMDistances();
		return this.columns;
	}
	,getIndex: function() {
		var _this = this.getScore().getBars();
		return HxOverrides.indexOf(_this,this,0);
	}
	,calculateMDistances: function() {
		if(this.columns == null) this.getColumns();
		new nx3_PColumnsDistancesCalculator(this).calculate();
	}
	,calculateAPositions: function() {
		new nx3_PColumnsAllotmentCalculator(this).calculate();
	}
	,getValue: function() {
		if(this.value != 0) return this.value;
		var _g = 0;
		var _g1 = this.getParts();
		while(_g < _g1.length) {
			var part = _g1[_g];
			++_g;
			this.value = Std["int"](Math.max(this.value,part.getValue()));
		}
		return this.value;
	}
	,getContentwidth: function() {
		if(this.contentwidth != null) return this.contentwidth;
		var lastcolumn = cx_ArrayTools.last(this.getColumns());
		this.contentwidth = lastcolumn.getAPostion() + Math.max(lastcolumn.getADistance(),lastcolumn.getRightX());
		return this.contentwidth;
	}
	,getContentXZero: function() {
		var firstcolumn = cx_ArrayTools.first(this.getColumns());
		this.contentx = -firstcolumn.getLeftX();
		return this.contentx;
	}
	,getAllottedDistanceSum: function() {
		if(this.allottedDistanceSum != null) return this.allottedDistanceSum;
		this.getContentwidth();
		return this.allottedDistanceSum;
	}
	,getStretchWidth: function() {
		return this.stretchwidth;
	}
	,getTieConnections: function() {
		if(this.tieconnections != null) return this.tieconnections;
		this.tieconnections = [];
		var nextBar = cx_ArrayTools.indexOrNull(this.score.getBars(),this.getIndex() + 1);
		if(nextBar == null) return this.tieconnections;
		var _g = 0;
		var _g1 = this.getParts();
		while(_g < _g1.length) {
			var part = _g1[_g];
			++_g;
			var nextPart = cx_ArrayTools.indexOrNull(nextBar.getParts(),part.getIndex());
			var _g2 = 0;
			var _g3 = part.getVoices();
			while(_g2 < _g3.length) {
				var voice = _g3[_g2];
				++_g2;
				var lastnote = cx_ArrayTools.last(voice.getNotes());
				if(!lastnote.getHasTie()) continue;
				var _g4 = 0;
				var _g5 = lastnote.nnote.get_nheads();
				while(_g4 < _g5.length) {
					var nhead = _g5[_g4];
					++_g4;
					if(nhead.tie != null) {
						var level = nhead.level;
						var nextPart1 = cx_ArrayTools.indexOrNull(nextBar.getParts(),part.getIndex());
						if(nextPart1 == null) break;
						var _g6 = 0;
						var _g7 = nextPart1.getVoices();
						while(_g6 < _g7.length) {
							var voice1 = _g7[_g6];
							++_g6;
							var nextnote = cx_ArrayTools.first(voice1.getNotes());
							var _g8 = 0;
							var _g9 = nextnote.nnote.get_nheads();
							while(_g8 < _g9.length) {
								var nnhead = _g9[_g8];
								++_g8;
								if(nnhead.level == nhead.level) {
									this.tieconnections.push({ from : lastnote, to : nextnote, level : nhead.level, tie : nhead.tie});
									break;
								}
							}
						}
					}
				}
			}
		}
		return this.tieconnections;
	}
	,__class__: nx3_PBar
};
var nx3_PBarConfig = function(showClef,showKey,showTime,showCautClef,showCautKey,showCautTime) {
	if(showCautTime == null) showCautTime = false;
	if(showCautKey == null) showCautKey = false;
	if(showCautClef == null) showCautClef = false;
	if(showTime == null) showTime = false;
	if(showKey == null) showKey = false;
	if(showClef == null) showClef = false;
	this.showClef = showClef;
	this.showKey = showKey;
	this.showTime = showTime;
	this.showCautClef = showCautClef;
	this.showCautKey = showCautKey;
	this.showCautTime = showCautTime;
};
nx3_PBarConfig.__name__ = true;
nx3_PBarConfig.prototype = {
	__class__: nx3_PBarConfig
};
var nx3_PBarStretchCalculator = function(systembar) {
	this.systembar = systembar;
};
nx3_PBarStretchCalculator.__name__ = true;
nx3_PBarStretchCalculator.prototype = {
	stretch: function(amount) {
		this.systembar.getBarMeasurements().setContentWidth(this.systembar.getBarMeasurements().getContentWidth() + amount);
		if(this.systembar.bar.getColumns().length < 2) return;
		var columns = this.systembar.bar.getColumns();
		var firstcolumn = columns[0];
		var aDistance = new haxe_ds_ObjectMap();
		var gotShared = new haxe_ds_ObjectMap();
		var _g = 0;
		while(_g < columns.length) {
			var column = columns[_g];
			++_g;
			var value = column.getADistance();
			aDistance.set(column,value);
			gotShared.set(column,0);
		}
		var seedThreshold = new haxe_ds_IntMap();
		var seedrest = amount;
		var countIterations = 0;
		while(seedrest > 0) {
			var seed = .5;
			var _g1 = 0;
			while(_g1 < columns.length) {
				var column1 = columns[_g1];
				++_g1;
				var grain = column1.getDistanceDelta() * seed;
				var valueDeltaInt = Std["int"](column1.getDistanceDelta() * 100000);
				if(!seedThreshold.h.hasOwnProperty(valueDeltaInt)) seedThreshold.h[valueDeltaInt] = 0;
				var value1 = seedThreshold.h[valueDeltaInt] + grain;
				seedThreshold.h[valueDeltaInt] = value1;
				var threshold = seedThreshold.h[valueDeltaInt];
				var benefit;
				if(column1 == firstcolumn) benefit = 0.0; else benefit = column1.getADistanceBenefit();
				if(threshold > benefit) {
					var value2 = gotShared.h[column1.__id__] + grain;
					gotShared.set(column1,value2);
					seedrest -= grain;
				}
			}
			countIterations++;
		}
		var gain = 0.0;
		var _g2 = 0;
		while(_g2 < columns.length) {
			var column2 = columns[_g2];
			++_g2;
			column2.sposition = column2.getAPostion() + gain;
			gain += gotShared.h[column2.__id__];
		}
	}
	,resetStretch: function() {
		var _g = 0;
		var _g1 = this.systembar.bar.getColumns();
		while(_g < _g1.length) {
			var column = _g1[_g];
			++_g;
			column.sposition = null;
		}
	}
	,__class__: nx3_PBarStretchCalculator
};
var nx3_PBarWidthCalculator = function() {
};
nx3_PBarWidthCalculator.__name__ = true;
nx3_PBarWidthCalculator.__interfaces__ = [nx3_IBarWidthCalculator];
nx3_PBarWidthCalculator.prototype = {
	getClefWidth: function(clef) {
		return nx3_PAttributesRectsCalculator.getClefRect(clef).width;
	}
	,getKeyWidth: function(key) {
		return nx3_PAttributesRectsCalculator.getKeyRect(key).width;
	}
	,getTimeWidth: function(time) {
		return nx3_PAttributesRectsCalculator.getTimeRect(time).width;
	}
	,getContentLeftMarginWidth: function(bar) {
		return 3.0;
	}
	,getContentWidth: function(bar) {
		return bar.getContentwidth();
	}
	,getBarlineWidth: function(barline) {
		return 1.0;
	}
	,getLeftBarlineWidth: function(barline) {
		return 1.0;
	}
	,getClefsWidth: function(clefs) {
		var result = 0.0;
		var _g = 0;
		while(_g < clefs.length) {
			var clef = clefs[_g];
			++_g;
			if(clef == null) continue;
			result = Math.max(result,nx3_PAttributesRectsCalculator.getClefRect(clef).width);
		}
		return result;
	}
	,getKeysWidth: function(keys) {
		var result = 0.0;
		var _g = 0;
		while(_g < keys.length) {
			var key = keys[_g];
			++_g;
			if(key == null) continue;
			result = Math.max(result,nx3_PAttributesRectsCalculator.getKeyRect(key).width);
		}
		return result;
	}
	,__class__: nx3_PBarWidthCalculator
};
var nx3_PBaseRectCalculator = function(note) {
	this.note = note;
};
nx3_PBaseRectCalculator.__name__ = true;
nx3_PBaseRectCalculator.prototype = {
	getBaseRect: function() {
		{
			var _g = this.note.nnote.type;
			switch(_g[1]) {
			case 0:
				var atr = _g[5];
				var a = _g[4];
				var v = _g[3];
				var h = _g[2];
				var _g1 = nx3_ENoteValTools.head(this.note.nnote.value);
				switch(_g1[1]) {
				case 2:
					return new nx3_geom_Rectangle(-2.8000000000000003,-3.,5.6000000000000005,6.);
				default:
					return new nx3_geom_Rectangle(-2.2,-3.,4.4,6.);
				}
				break;
			case 4:
				var f = _g[5];
				var c = _g[4];
				var o = _g[3];
				var text = _g[2];
				return cx_ArrayTools.first(this.note.getHeadsRects()).clone();
			default:
				return new nx3_geom_Rectangle(-4,-3.,8,6.);
			}
		}
	}
	,__class__: nx3_PBaseRectCalculator
};
var nx3_PBeamflagCalculator = function(beamgroup) {
	this.beamgroup = beamgroup;
};
nx3_PBeamflagCalculator.__name__ = true;
nx3_PBeamflagCalculator.prototype = {
	getBeamflags: function() {
		var firstpass = [];
		var noteIdx = 0;
		var holder = [];
		var holderIdx = 0;
		var _g = 0;
		var _g1 = this.beamgroup.pnotes;
		while(_g < _g1.length) {
			var note = _g1[_g];
			++_g;
			var nextnote = cx_ArrayTools.indexOrNull(this.beamgroup.pnotes,noteIdx + 1);
			if(nextnote == null) continue;
			if(nx3_ENoteValTools.beaminglevel(note.nnote.value) > 1 && nx3_ENoteValTools.beaminglevel(nextnote.nnote.value) > 1) {
				holder.push(2);
				firstpass.push(nx3_EBeamflagType.Full16);
			} else if(nx3_ENoteValTools.beaminglevel(note.nnote.value) == 1 && nx3_ENoteValTools.beaminglevel(nextnote.nnote.value) > 1) {
				holder.push(-1);
				firstpass.push(nx3_EBeamflagType.End16);
			} else if(nx3_ENoteValTools.beaminglevel(note.nnote.value) > 1 && nx3_ENoteValTools.beaminglevel(nextnote.nnote.value) == 1) {
				holder.push(1);
				firstpass.push(nx3_EBeamflagType.Start16);
			} else {
				holder.push(0);
				firstpass.push(nx3_EBeamflagType.None);
			}
			noteIdx++;
		}
		var result = [];
		var _g2 = 0;
		while(_g2 < firstpass.length) {
			var r = firstpass[_g2];
			++_g2;
			var rnext = cx_ArrayTools.next(firstpass,r);
			var rprev = cx_ArrayTools.prev(firstpass,r);
			if(rnext == nx3_EBeamflagType.Full16 && r == nx3_EBeamflagType.End16) result.push(nx3_EBeamflagType.None); else if(rprev == nx3_EBeamflagType.Full16 && r == nx3_EBeamflagType.Start16) result.push(nx3_EBeamflagType.None); else result.push(r);
		}
		return result;
	}
	,__class__: nx3_PBeamflagCalculator
};
var nx3_PBeamgroup = function(pnotes) {
	this.value = null;
	this.voice = pnotes[0].voice;
	this.pnotes = pnotes;
	var _g = 0;
	while(_g < pnotes.length) {
		var pnote = pnotes[_g];
		++_g;
		pnote.beamgroup = this;
	}
};
nx3_PBeamgroup.__name__ = true;
nx3_PBeamgroup.prototype = {
	getValue: function() {
		if(this.value != null) return this.value;
		this.value = 0;
		var _g = 0;
		var _g1 = this.pnotes;
		while(_g < _g1.length) {
			var pnote = _g1[_g];
			++_g;
			this.value += nx3_ENoteValTools.value(pnote.nnote.value);
		}
		return this.value;
	}
	,setDirection: function(direction) {
		this.direction = direction;
	}
	,getDirection: function() {
		if(this.direction == null) {
			var calculator = new nx3_PPartbeamgroupsDirectionCalculator(this.voice.getPart());
			calculator.calculateBeamgroupsDirections();
		}
		return this.direction;
	}
	,getPVoice: function() {
		return this.voice;
	}
	,getNotesStemXPositions: function() {
		if(this.stavexpositions != null) return this.stavexpositions;
		this.stavexpositions = [];
		var _g = 0;
		var _g1 = this.pnotes;
		while(_g < _g1.length) {
			var note = _g1[_g];
			++_g;
			this.stavexpositions.push(note.getComplex().getXPosition() + note.getStaveXPosition());
		}
		return this.stavexpositions;
	}
	,getFrame: function() {
		if(this.frame != null) return this.frame;
		var firstnote = this.pnotes[0].nnote;
		if(firstnote.type[0] != "Note") return null;
		if(this.pnotes.length == 1) {
			var stavinglevel = nx3_ENoteValTools.stavinglevel(firstnote.value);
			if(stavinglevel <= 0) return null;
		}
		var calculator = new nx3_PBeamgroupFrameCalculator(this);
		this.frame = calculator.getFrame();
		return this.frame;
	}
	,toString: function() {
		return "PBeamgroup \r";
	}
	,__class__: nx3_PBeamgroup
};
var nx3_PBeamgroupDirectionCalculator = function(beamgroup) {
	this.beamgroup = beamgroup;
};
nx3_PBeamgroupDirectionCalculator.__name__ = true;
nx3_PBeamgroupDirectionCalculator.prototype = {
	getDirection: function() {
		this.topLevel = this.findTopLevel();
		this.bottomLevel = this.findBottomLevel();
		if(this.topLevel + this.bottomLevel <= 0) return nx3_EDirectionUD.Down;
		return nx3_EDirectionUD.Up;
	}
	,findTopLevel: function() {
		var topLevel = this.beamgroup.pnotes[0].nnote.get_topLevel();
		if(this.beamgroup.pnotes.length == 1) return topLevel;
		var _g1 = 1;
		var _g = this.beamgroup.pnotes.length;
		while(_g1 < _g) {
			var i = _g1++;
			var level = this.beamgroup.pnotes[i].nnote.get_topLevel();
			topLevel = Std["int"](Math.min(topLevel,level));
		}
		return topLevel;
	}
	,findBottomLevel: function() {
		var bottomLevel = this.beamgroup.pnotes[0].nnote.get_bottomLevel();
		if(this.beamgroup.pnotes.length == 1) return bottomLevel;
		var _g1 = 1;
		var _g = this.beamgroup.pnotes.length;
		while(_g1 < _g) {
			var i = _g1++;
			var level = this.beamgroup.pnotes[i].nnote.get_bottomLevel();
			bottomLevel = Std["int"](Math.max(bottomLevel,level));
		}
		return bottomLevel;
	}
	,__class__: nx3_PBeamgroupDirectionCalculator
};
var nx3_PBeamgroupFrameCalculator = function(beamgroup) {
	this.beamgroup = beamgroup;
};
nx3_PBeamgroupFrameCalculator.__name__ = true;
nx3_PBeamgroupFrameCalculator.prototype = {
	getFrame: function() {
		this.calcLevelArrays();
		var frame = this.calcFramePrototype();
		return frame;
	}
	,calcFramePrototype: function() {
		var count = this.innerLevels.length;
		var tips = this.calcTips();
		var beamflags = new nx3_PBeamflagCalculator(this.beamgroup).getBeamflags();
		return { leftInnerY : this.innerLevels[0], leftOuterY : this.outerLevels[0], rightInnerY : this.innerLevels[count - 1], rightOuterY : this.outerLevels[count - 1], leftTipY : tips.leftTip, rightTipY : tips.rightTip, outerLevels : this.outerLevels, innerLevels : this.innerLevels, beamflags : beamflags};
	}
	,getTopLevels: function() {
		var levels = [];
		var _g = 0;
		var _g1 = this.beamgroup.pnotes;
		while(_g < _g1.length) {
			var note = _g1[_g];
			++_g;
			levels.push(note.nnote.get_topLevel());
		}
		return levels;
	}
	,getBottomLevels: function() {
		var levels = [];
		var _g = 0;
		var _g1 = this.beamgroup.pnotes;
		while(_g < _g1.length) {
			var note = _g1[_g];
			++_g;
			levels.push(note.nnote.get_bottomLevel());
		}
		return levels;
	}
	,calcLevelArrays: function() {
		var _g = this.beamgroup.getDirection();
		switch(_g[1]) {
		case 0:
			this.outerLevels = this.getTopLevels();
			this.innerLevels = this.getBottomLevels();
			break;
		case 1:
			this.outerLevels = this.getBottomLevels();
			this.innerLevels = this.getTopLevels();
			break;
		}
	}
	,calcTips: function() {
		var stemLenght = 7;
		var direction = this.beamgroup.getDirection();
		var calculator = new nx3_PBamegroupFrameTipCalculator(this.outerLevels,direction);
		var tips = calculator.getTips();
		if(direction == nx3_EDirectionUD.Up) tips.leftTip = tips.leftTip - stemLenght; else tips.leftTip = tips.leftTip + stemLenght;
		if(direction == nx3_EDirectionUD.Up) tips.rightTip = tips.rightTip - stemLenght; else tips.rightTip = tips.rightTip + stemLenght;
		return tips;
	}
	,__class__: nx3_PBeamgroupFrameCalculator
};
var nx3_PColumn = function(bar,complexes,valueposition,value) {
	this.allottedDistance = 0;
	this.bar = bar;
	this.complexes = complexes;
	this.valueposition = valueposition;
	this.value = value;
	this.mposition = 0.0;
	this.mdistanceBenefit = 0;
};
nx3_PColumn.__name__ = true;
nx3_PColumn.prototype = {
	getComplexes: function() {
		return this.complexes;
	}
	,getValueposition: function() {
		return this.valueposition;
	}
	,getValue: function() {
		if(this.value == null) throw new js__$Boot_HaxeError("value shouldnt be null");
		return this.value;
	}
	,getMDistance: function() {
		if(this.mdistance == null) throw new js__$Boot_HaxeError("mdistance shouldnt be null");
		return this.mdistance;
	}
	,getMDistanceBenefit: function() {
		if(this.mdistanceBenefit != null) return this.mdistanceBenefit;
		this.mdistanceBenefit = Math.max(0,this.getMDistance() - 3.2);
		return this.mdistanceBenefit;
	}
	,getDistanceDelta: function() {
		if(this.distancedelta != null) return this.distancedelta;
		this.bar.getContentwidth();
		this.distancedelta = this.allottedDistance / this.bar.getAllottedDistanceSum();
		return this.distancedelta;
	}
	,getMPosition: function() {
		return this.mposition;
	}
	,getADistance: function() {
		if(this.adistance != null) return this.adistance;
		this.bar.calculateAPositions();
		return this.adistance;
	}
	,getADistanceBenefit: function() {
		return this.adistanceBenefit;
	}
	,getAPostion: function() {
		if(this.aposition != null) return this.aposition;
		this.bar.calculateAPositions();
		return this.aposition;
	}
	,getSPosition: function() {
		if(this.sposition != null) return this.sposition;
		return this.getAPostion();
	}
	,getRightX: function() {
		if(this.rightX != null) return this.rightX;
		this.rightX = 0;
		var _g = 0;
		var _g1 = this.getComplexes();
		while(_g < _g1.length) {
			var complex = _g1[_g];
			++_g;
			if(complex != null) this.rightX = Math.max(this.rightX,complex.getRightX());
		}
		return this.rightX;
	}
	,getLeftX: function() {
		if(this.leftX != null) return this.leftX;
		this.leftX = 0;
		var _g = 0;
		var _g1 = this.getComplexes();
		while(_g < _g1.length) {
			var complex = _g1[_g];
			++_g;
			if(complex != null) this.leftX = Math.min(this.leftX,complex.getLeftX());
		}
		return this.leftX;
	}
	,getNextComplex: function(complex) {
		if(this == cx_ArrayTools.last(this.bar.getColumns())) return null;
		var partIndex;
		var _this = this.getComplexes();
		partIndex = HxOverrides.indexOf(_this,complex,0);
		var nextColumnIdx;
		nextColumnIdx = (function($this) {
			var $r;
			var _this1 = $this.bar.getColumns();
			$r = HxOverrides.indexOf(_this1,$this,0);
			return $r;
		}(this)) + 1;
		var _g1 = nextColumnIdx;
		var _g = this.bar.getColumns().length;
		while(_g1 < _g) {
			var ci = _g1++;
			var complex1 = this.bar.getColumns()[ci].getComplexes()[partIndex];
			if(complex1 != null) return complex1;
		}
		return null;
	}
	,toString: function() {
		return "PColumn";
	}
	,__class__: nx3_PColumn
};
var nx3_PColumnsAllotmentCalculator = function(bar) {
	this.bar = bar;
	this.spacing = bar.nbar.spacing;
	this.bar.allottedDistanceSum = 0;
};
nx3_PColumnsAllotmentCalculator.__name__ = true;
nx3_PColumnsAllotmentCalculator.prototype = {
	calculate: function(stretch) {
		if(stretch == null) stretch = 0;
		var aposition = this.bar.getContentXZero();
		var _g = 0;
		var _g1 = this.bar.getColumns();
		while(_g < _g1.length) {
			var column = _g1[_g];
			++_g;
			var dist = this.getADistance(column.getValue(),column);
			column.allottedDistance = dist;
			this.bar.allottedDistanceSum += dist;
			var adistance = Math.max(column.getMDistance(),dist);
			var adistanceBenefit = Math.max(0,column.getMDistance() - dist);
			column.aposition = aposition;
			column.adistance = adistance;
			column.adistanceBenefit = adistanceBenefit;
			aposition += adistance;
		}
	}
	,getADistance: function(val,column) {
		var _g = this.bar.nbar.allotment;
		switch(_g[1]) {
		case 1:
			return this.spacing;
		case 0:
			return column.getMDistance();
		case 2:
			return (0.5 + val / 3024 / 2) * this.spacing;
		default:
			return val / 3024 * this.spacing;
		}
	}
	,__class__: nx3_PColumnsAllotmentCalculator
};
var nx3_PColumnsDistancesCalculator = function(bar) {
	this.bar = bar;
	this.prevLeftComplex = new haxe_ds_IntMap();
};
nx3_PColumnsDistancesCalculator.__name__ = true;
nx3_PColumnsDistancesCalculator.prototype = {
	calculate: function() {
		var leftColumn = null;
		var xposition = 0.0;
		var _g1 = 0;
		var _g = this.bar.getColumns().length;
		while(_g1 < _g) {
			var columnIdx = _g1++;
			var rightColumn = this.bar.getColumns()[columnIdx];
			rightColumn.mdistance = 0;
			if(columnIdx == 0) {
				var complexId = 0;
				var _g2 = 0;
				var _g3 = cx_ArrayTools.first(this.bar.getColumns()).getComplexes();
				while(_g2 < _g3.length) {
					var complex = _g3[_g2];
					++_g2;
					this.prevLeftComplex.h[complexId] = { leftComplex : complex, columnIdx : 0};
					complexId++;
				}
			} else if(columnIdx < this.bar.getColumns().length) {
				var leftComplexes = leftColumn.getComplexes();
				var rightComplexes = rightColumn.getComplexes();
				var columndistance = 0.0;
				var _g31 = 0;
				var _g21 = leftComplexes.length;
				while(_g31 < _g21) {
					var complexIdx = _g31++;
					var leftComplex = leftComplexes[complexIdx];
					var rightComplex = rightComplexes[complexIdx];
					var distance = this.getComplexDistances(columnIdx,complexIdx,leftComplex,rightComplex);
					columndistance = Math.max(columndistance,distance);
				}
				columndistance = cx_MathTools.round2(columndistance,null);
				leftColumn.mdistance = columndistance;
				xposition += columndistance;
				rightColumn.mposition = xposition;
			}
			if(columnIdx == this.bar.getColumns().length - 1) {
				var lastColumn = this.bar.getColumns()[columnIdx];
				lastColumn.mdistance = lastColumn.getRightX();
				return;
			}
			leftColumn = rightColumn;
		}
	}
	,getComplexDistances: function(columnIdx,complexIdx,leftComplex,rightComplex) {
		if(rightComplex == null) {
			if(leftComplex != null) {
				var leftColumnIdx1 = columnIdx - 1;
				this.prevLeftComplex.h[complexIdx] = { leftComplex : leftComplex, columnIdx : leftColumnIdx1};
			}
			return 0;
		}
		if(leftComplex == null) {
			var currentLeftColumIdx = columnIdx - 1;
			var prevLeftColumnIdx = this.prevLeftComplex.h[complexIdx].columnIdx;
			var currentLeftXPos = this.bar.getColumns()[currentLeftColumIdx].getMPosition();
			var prevLeftXPos = this.bar.getColumns()[prevLeftColumnIdx].getMPosition();
			var distanceBenefit = currentLeftXPos - prevLeftXPos;
			var currentLeftComplex = this.prevLeftComplex.h[complexIdx].leftComplex;
			var distance1 = new nx3_PComplexDistancesCalculator().getDistance(currentLeftComplex,rightComplex);
			var actualDistance = Math.max(0,distance1 - distanceBenefit);
			return actualDistance;
		}
		var leftColumnIdx = columnIdx - 1;
		var distance = new nx3_PComplexDistancesCalculator().getDistance(leftComplex,rightComplex);
		this.prevLeftComplex.h[complexIdx] = { leftComplex : leftComplex, columnIdx : leftColumnIdx};
		return distance;
	}
	,__class__: nx3_PColumnsDistancesCalculator
};
var nx3_PColumnsGenerator = function(bar) {
	this.bar = bar;
	this.vparts = this.bar.getParts();
};
nx3_PColumnsGenerator.__name__ = true;
nx3_PColumnsGenerator.prototype = {
	getColumns: function() {
		if(this.columns != null) return this.columns;
		this.positions = this.calcPositions(this.vparts);
		this.calcColumns(this.positions,this.vparts);
		return this.columns;
	}
	,calcColumns: function(positions,vparts) {
		var partsCount = vparts.length;
		this.columns = [];
		this.positionsColumns = new haxe_ds_IntMap();
		var barvalue = this.bar.getValue();
		var idx = 0;
		var _g = 0;
		while(_g < positions.length) {
			var pos = positions[_g];
			++_g;
			var nextpos = cx_ArrayTools.indexOrNull(positions,idx + 1);
			if(nextpos == null) nextpos = barvalue;
			var value = nextpos - pos;
			var vcomplexes = [];
			var _g2 = 0;
			var _g1 = this.vparts.length;
			while(_g2 < _g1) {
				var i = _g2++;
				var part = this.vparts[i];
				var x = part.getPositionsComplexes();
				var complex = part.getPositionsComplexes().get(pos);
				vcomplexes.push(complex);
			}
			var vcolumn = new nx3_PColumn(this.bar,vcomplexes,pos,value);
			this.columns.push(vcolumn);
			var _g11 = 0;
			while(_g11 < vcomplexes.length) {
				var complex1 = vcomplexes[_g11];
				++_g11;
				if(complex1 != null) complex1.column = vcolumn;
			}
			this.positionsColumns.h[pos] = vcolumn;
			idx++;
		}
	}
	,calcPositions: function(vparts) {
		var positionsMap = new haxe_ds_IntMap();
		var _g = 0;
		while(_g < vparts.length) {
			var vpart = vparts[_g];
			++_g;
			var poss;
			var _this = cx_MapTools.keysToArray(vpart.getPositionsComplexes().keys());
			poss = _this.slice();
			var _g1 = 0;
			while(_g1 < poss.length) {
				var pos = poss[_g1];
				++_g1;
				positionsMap.h[pos] = true;
			}
		}
		var positions = cx_MapTools.keysToArray(positionsMap.keys());
		positions.sort(function(a,b) {
			return Reflect.compare(a,b);
		});
		return positions;
	}
	,__class__: nx3_PColumnsGenerator
};
var nx3_PComplex = function(part,notes,valueposition) {
	this.part = part;
	if(notes.length > 2) throw new js__$Boot_HaxeError("PComplex nr of PNote(s) limited to max 2 - for now");
	this.notes = notes;
	var _g = 0;
	var _g1 = this.notes;
	while(_g < _g1.length) {
		var note = _g1[_g];
		++_g;
		note.complex = this;
	}
	this.valueposition = valueposition;
};
nx3_PComplex.__name__ = true;
nx3_PComplex.prototype = {
	getNotes: function() {
		return this.notes;
	}
	,getValueposition: function() {
		return this.valueposition;
	}
	,getPart: function() {
		return this.part;
	}
	,getColumn: function() {
		if(this.column != null) return this.column;
		this.part.getBar().getColumns();
		if(this.column == null) throw new js__$Boot_HaxeError("this shouldn't happen");
		return this.column;
	}
	,getHeadsRects: function() {
		if(this.headsrects != null) return this.headsrects;
		var firstrects = this.notes[0].getHeadsRects();
		if(this.notes.length == 1) return firstrects;
		var secondrects;
		var _this = this.notes[1].getHeadsRects();
		secondrects = _this.slice();
		var xoffset = this.getNoteXOffset(this.notes[1]);
		nx3_geom_RectanglesTools.offset(secondrects,xoffset,0);
		this.headsrects = firstrects.concat(secondrects);
		return this.headsrects;
	}
	,getSignsRects: function() {
		if(this.signsrects != null) return this.signsrects;
		if(this.getVisibleSigns().length == 0) return [];
		this.signsrects = new nx3_PSignsRectsCalculator(this.getVisibleSigns()).getSignRects(this.getHeadsRects());
		return this.signsrects;
	}
	,getNoteXOffset: function(note) {
		if(note == cx_ArrayTools.first(this.getNotes())) return 0;
		if(this.secondoffset != null) return this.secondoffset;
		this.secondoffset = new nx3_PNoteOffsetCalculator(this).getNoteOffset(cx_ArrayTools.second(this.getNotes()));
		return this.secondoffset;
	}
	,getSigns: function() {
		if(this.signs != null) return this.signs;
		this.signs = new nx3_PSignsCalculator(this.getNotes()).getSigns();
		return this.signs;
	}
	,getVisibleSigns: function() {
		if(this.visiblesigns != null) return this.visiblesigns;
		this.visiblesigns = new nx3_PSignsCalculator(this.getNotes()).getVisibleSigns();
		return this.visiblesigns;
	}
	,getStavesRects: function() {
		if(this.stavesrects != null) return this.stavesrects;
		this.stavesrects = [];
		var _g = 0;
		var _g1 = this.notes;
		while(_g < _g1.length) {
			var note = _g1[_g];
			++_g;
			var rect = this.getStaveRect(note);
			if(rect != null) this.stavesrects.push(rect);
		}
		var _g2 = 0;
		var _g11 = this.notes;
		while(_g2 < _g11.length) {
			var note1 = _g11[_g2];
			++_g2;
			var flagrect = new nx3_PStaveRectCalculator(note1).getFlagRect();
			if(flagrect != null) this.stavesrects.push(flagrect);
		}
		return this.stavesrects;
	}
	,getStaveRect: function(note) {
		return new nx3_PStaveRectCalculator(note).getStaveRect();
	}
	,getTieRects: function() {
		if(this.tierects != null) return this.tierects;
		this.tierects = new nx3_PComplexTierectsCalculator(this).getTieRects();
		return this.tierects;
	}
	,getDotRects: function() {
		if(this.dotrects != null) return this.dotrects;
		this.dotrects = new nx3_PComplexDotsrectsCalculator(this).getDotRects();
		return this.dotrects;
	}
	,getBaseRect: function() {
		if(this.baserect != null) return this.baserect;
		this.baserect = new nx3_geom_Rectangle(0,0,0,0);
		var _g = 0;
		var _g1 = this.getNotes();
		while(_g < _g1.length) {
			var note = _g1[_g];
			++_g;
			this.baserect = this.baserect.union(note.getBaseRect());
		}
		return this.baserect;
	}
	,getAllRects: function() {
		if(this.allrects != null) return this.allrects;
		this.allrects = [];
		this.allrects = nx3_geom_RectanglesTools.concat(this.allrects,this.getHeadsRects());
		this.allrects = nx3_geom_RectanglesTools.concat(this.allrects,this.getStavesRects());
		this.allrects = nx3_geom_RectanglesTools.concat(this.allrects,this.getSignsRects());
		this.allrects = nx3_geom_RectanglesTools.concat(this.allrects,this.getTieRects());
		this.allrects = nx3_geom_RectanglesTools.concat(this.allrects,this.getDotRects());
		return this.allrects;
	}
	,getRect: function() {
		this.rect = nx3_geom_RectanglesTools.unionAll(this.getAllRects());
		return this.rect;
	}
	,getXPosition: function() {
		if(this.xposition != null) return this.xposition;
		this.getHeadsRects();
		this.xposition = this.getColumn().getSPosition();
		return this.xposition;
	}
	,getIndex: function() {
		var _this = this.part.getComplexes();
		return HxOverrides.indexOf(_this,this,0);
	}
	,getLeftX: function() {
		if(this.leftX != null) return this.leftX;
		this.leftX = this.getRect().x;
		return this.leftX;
	}
	,getRightX: function() {
		if(this.rightX != null) return this.rightX;
		this.rightX = this.getRect().x + this.getRect().width;
		return this.rightX;
	}
	,getNext: function() {
		if(this.next != null) return this.next;
		this.next = this.getColumn().getNextComplex(this);
		return this.next;
	}
	,setTieinfos: function(val) {
		this.tieinfos = val;
	}
	,getTieinfos: function() {
		if(this.tieinfos == null) this.getTieRects();
		if(this.getTieRects().length == 0) return [];
		this.tieinfos = new nx3_PComplexTieTargetCalculator(this.tieinfos).findTargetHeads();
		return this.tieinfos;
	}
	,getHeads: function() {
		var result = [];
		var _g = 0;
		var _g1 = this.getNotes();
		while(_g < _g1.length) {
			var note = _g1[_g];
			++_g;
			result = result.concat(note.heads);
		}
		return result;
	}
	,getHasTie: function() {
		if(this.hasTie != null) return this.hasTie;
		var _g = 0;
		var _g1 = this.getNotes();
		while(_g < _g1.length) {
			var note = _g1[_g];
			++_g;
			if(note.getHasTie() == true) {
				this.hasTie = true;
				return this.hasTie;
			}
		}
		this.hasTie = false;
		return this.hasTie;
	}
	,getHeadLevels: function() {
		if(this.headlevels != null) return this.headlevels;
		this.headlevels = [];
		var _g = 0;
		var _g1 = this.getNotes();
		while(_g < _g1.length) {
			var note = _g1[_g];
			++_g;
			var _g2 = 0;
			var _g3 = note.nnote.get_nheads();
			while(_g2 < _g3.length) {
				var nhead = _g3[_g2];
				++_g2;
				this.headlevels.push(nhead.level);
			}
		}
		return this.headlevels;
	}
	,toString: function() {
		var str = "PComplex: \r";
		var _g = 0;
		var _g1 = this.getNotes();
		while(_g < _g1.length) {
			var note = _g1[_g];
			++_g;
			str += "- Note: " + Std.string(note.nnote) + "\r";
		}
		return str;
	}
	,__class__: nx3_PComplex
};
var nx3_PComplexDistancesCalculator = function() {
};
nx3_PComplexDistancesCalculator.__name__ = true;
nx3_PComplexDistancesCalculator.prototype = {
	getDistance: function(leftComplex,rightComplex) {
		var leftBaseRects = [leftComplex.getBaseRect()];
		var rightBaseRects = [rightComplex.getBaseRect()];
		var minDistance = nx3_geom_RectanglesTools.getXIntersection(leftBaseRects,rightBaseRects);
		var leftRects = leftComplex.getAllRects();
		var rightRects = rightComplex.getAllRects();
		var objDistance = nx3_geom_RectanglesTools.getXIntersection(leftRects,rightRects);
		var objDistanceMargin = objDistance + 0.6;
		return Math.max(minDistance,objDistanceMargin);
	}
	,getRects: function(complex) {
		var rects = [];
		rects.concat(complex.getHeadsRects());
		rects.concat(complex.getStavesRects());
		rects.concat(complex.getSignsRects());
		return rects;
	}
	,__class__: nx3_PComplexDistancesCalculator
};
var nx3_PComplexDotsrectsCalculator = function(complex) {
	this.complex = complex;
};
nx3_PComplexDotsrectsCalculator.__name__ = true;
nx3_PComplexDotsrectsCalculator.prototype = {
	getDotRects: function() {
		var nrofnotes = this.complex.getNotes().length;
		var firstnote = cx_ArrayTools.first(this.complex.getNotes());
		var rects = this.getRectsForNote(firstnote,false);
		if(nrofnotes == 2) {
			var secondnote = cx_ArrayTools.second(this.complex.getNotes());
			var secondrects = this.getRectsForNote(secondnote,true);
			rects = nx3_geom_RectanglesTools.concat(rects,secondrects);
		}
		return rects;
	}
	,getRectsForNote: function(note,down) {
		if(down == null) down = false;
		if(nx3_ENoteValTools.dotlevel(note.nnote.value) == 0) return [];
		var rects = [];
		var dotwidth;
		if(nx3_ENoteValTools.dotlevel(note.nnote.value) == 1) dotwidth = 2.0; else dotwidth = 3.0;
		var headrect = nx3_geom_RectanglesTools.unionAll(note.getHeadsRects());
		var rectX = headrect.x + headrect.width;
		var dotlevels = new haxe_ds_IntMap();
		var _g = 0;
		var _g1 = note.nnote.get_nheads();
		while(_g < _g1.length) {
			var head = _g1[_g];
			++_g;
			var level = head.level;
			var adj = Std["int"](Math.abs((level - 1) % 2));
			var dotlevel;
			if(down) dotlevel = level + adj; else dotlevel = level - adj;
			dotlevels.h[dotlevel] = true;
		}
		var dotkeys = cx_ArrayTools.fromHashKeys(dotlevels.keys());
		var _g2 = 0;
		while(_g2 < dotkeys.length) {
			var level1 = dotkeys[_g2];
			++_g2;
			rects.push(new nx3_geom_Rectangle(rectX,level1 - 0.5,dotwidth,1));
		}
		return rects;
	}
	,__class__: nx3_PComplexDotsrectsCalculator
};
var nx3_PComplexTieTargetCalculator = function(tieinfos) {
	this.tieinfos = tieinfos;
};
nx3_PComplexTieTargetCalculator.__name__ = true;
nx3_PComplexTieTargetCalculator.prototype = {
	findTargetHeads: function() {
		var _g = 0;
		var _g1 = this.tieinfos;
		while(_g < _g1.length) {
			var info = _g1[_g];
			++_g;
			var head = info.head;
			var headlevel = head.nhead.level;
			var nextnote = head.getNote().getNext();
			if(nextnote == null) continue;
			var nextheads = nextnote.getHeads();
			var _g2 = 0;
			while(_g2 < nextheads.length) {
				var nexthead = nextheads[_g2];
				++_g2;
				if(headlevel == nexthead.nhead.level) {
					info.target = nexthead;
					break;
				}
			}
		}
		return this.tieinfos;
	}
	,__class__: nx3_PComplexTieTargetCalculator
};
var nx3_PComplexTierectsCalculator = function(complex) {
	this.complex = complex;
};
nx3_PComplexTierectsCalculator.__name__ = true;
nx3_PComplexTierectsCalculator.prototype = {
	getTieRects: function() {
		var nrofnotes = this.complex.getNotes().length;
		var firstnote = cx_ArrayTools.first(this.complex.getNotes());
		var firstties = firstnote.getTies();
		var secondnote;
		if(nrofnotes == 2) secondnote = cx_ArrayTools.second(this.complex.getNotes()); else secondnote = null;
		var secondties;
		if(nrofnotes == 2) secondties = cx_ArrayTools.second(this.complex.getNotes()).getTies(); else secondties = [];
		if(firstties == [] && secondties == []) return [];
		var headrects = this.complex.getHeadsRects();
		var dotrects = this.complex.getDotRects();
		var tieinfos = [];
		var rects = [];
		var headIdx = 0;
		var dotidx = 0;
		var adjusty = 0.0;
		var tiewidth = 3.2;
		var tieheight = 1.6;
		var _g = 0;
		var _g1 = firstnote.getHeads();
		while(_g < _g1.length) {
			var head = _g1[_g];
			++_g;
			var headrect = this.complex.getHeadsRects()[headIdx];
			var rx = headrect.x + headrect.width;
			if(nx3_ENoteValTools.dotlevel(firstnote.nnote.value) > 0) {
				var dotrect = this.complex.getDotRects()[dotidx];
				rx = dotrect.x + dotrect.width;
				dotidx++;
			}
			if(head.nhead.tie != null) {
				var tielevel = 0;
				{
					var _g2 = head.nhead.tie;
					switch(_g2[1]) {
					case 0:
						var tlevel = _g2[3];
						var tiedir = _g2[2];
						tielevel = tlevel;
						break;
					default:
					}
				}
				var level = head.nhead.level + tielevel;
				var direction = nx3_EDirectionUD.Up;
				if(firstties.length == 1) {
					if(secondnote == null) {
						if(firstnote.getDirection() == nx3_EDirectionUD.Up) level = level + 1; else level = level - 1;
						if(firstnote.getDirection() == nx3_EDirectionUD.Up) direction = nx3_EDirectionUD.Down; else direction = nx3_EDirectionUD.Up;
						if(firstnote.getDirection() == nx3_EDirectionUD.Up) adjusty = .8; else adjusty = -.8;
					} else if(firstnote.getDirection() == nx3_EDirectionUD.Up) level = level - 1; else level = level - 1;
					tiewidth = 3;
				} else if(secondnote == null && head == cx_ArrayTools.last(firstnote.getHeads())) {
					direction = nx3_EDirectionUD.Down;
					adjusty = .5;
				} else adjusty = -.5;
				var r = new nx3_geom_Rectangle(rx,level - 0.8 + adjusty,tiewidth,1.6);
				rects.push(r);
				tieinfos.push({ direction : direction, rect : r, head : head, target : null});
			}
			headIdx++;
		}
		tiewidth = 3.2;
		if(secondnote != null) {
			var _g3 = 0;
			var _g11 = secondnote.getHeads();
			while(_g3 < _g11.length) {
				var head1 = _g11[_g3];
				++_g3;
				if(head1.nhead.tie != null) {
					var level1 = head1.nhead.level;
					var headrect1 = this.complex.getHeadsRects()[headIdx];
					var rx1 = headrect1.x + headrect1.width;
					if(nx3_ENoteValTools.dotlevel(secondnote.nnote.value) > 0) {
						var dotrect1 = this.complex.getDotRects()[dotidx];
						rx1 = dotrect1.x + dotrect1.width;
						dotidx++;
					}
					if(secondties.length == 1) {
						level1++;
						tiewidth = 3;
					}
					var r1 = new nx3_geom_Rectangle(rx1,level1 - 0.8,tiewidth,1.6);
					rects.push(r1);
					tieinfos.push({ direction : nx3_EDirectionUD.Down, rect : r1, head : head1, target : null});
				}
				headIdx++;
			}
		}
		this.complex.setTieinfos(tieinfos);
		return rects;
	}
	,getNoteTies: function(note) {
	}
	,__class__: nx3_PComplexTierectsCalculator
};
var nx3_PHead = function(nhead) {
	this.nhead = nhead;
};
nx3_PHead.__name__ = true;
nx3_PHead.prototype = {
	getNote: function() {
		return this.note;
	}
	,toString: function() {
		return "PHead  \r" + Std.string(this.nhead);
	}
	,__class__: nx3_PHead
};
var nx3_PHeadPlacementsCalculator = function(vheads,direction) {
	this.vheads = vheads;
	this.direction = direction;
};
nx3_PHeadPlacementsCalculator.__name__ = true;
nx3_PHeadPlacementsCalculator.prototype = {
	getHeadsPlacements: function() {
		if(this.vheads.length == 1) return [{ level : this.vheads[0].nhead.level, pos : nx3_EHeadPosition.Center}];
		var len = this.vheads.length;
		var placements = [];
		var tempArray = [];
		var _g = 0;
		var _g1 = this.vheads;
		while(_g < _g1.length) {
			var vhead = _g1[_g];
			++_g;
			var placement = { level : vhead.nhead.level, pos : nx3_EHeadPosition.Center};
			placements.push(placement);
			tempArray.push(0);
		}
		if(this.direction == nx3_EDirectionUD.Up) {
			var _g11 = 0;
			var _g2 = len - 1;
			while(_g11 < _g2) {
				var j = _g11++;
				var i = len - j - 1;
				var vhead1 = this.vheads[i];
				var vheadNext = this.vheads[i - 1];
				var lDiff = vhead1.nhead.level - vheadNext.nhead.level;
				if(lDiff < 2) {
					if(tempArray[i] == tempArray[i - 1]) {
						tempArray[i - 1] = 1;
						placements[i - 1].pos = nx3_EHeadPosition.Right;
					}
				}
			}
		} else {
			var _g12 = 0;
			var _g3 = len - 1;
			while(_g12 < _g3) {
				var i1 = _g12++;
				var vhead2 = this.vheads[i1];
				var vheadNext1 = this.vheads[i1 + 1];
				var lDiff1 = vheadNext1.nhead.level - vhead2.nhead.level;
				if(lDiff1 < 2) {
					if(tempArray[i1] == tempArray[i1 + 1]) {
						tempArray[i1 + 1] = -1;
						placements[i1 + 1].pos = nx3_EHeadPosition.Left;
					}
				}
			}
		}
		return placements;
	}
	,__class__: nx3_PHeadPlacementsCalculator
};
var nx3_PHeadsRectsCalculator = function(note,direction) {
	if(direction != null) this.direction = direction; else this.direction = note.getDirection();
	this.vheads = note.getHeads();
	this.placements = new nx3_PHeadPlacementsCalculator(this.vheads,this.direction).getHeadsPlacements();
	this.notevalue = note.nnote.value;
};
nx3_PHeadsRectsCalculator.__name__ = true;
nx3_PHeadsRectsCalculator.prototype = {
	getHeadsRects: function() {
		var rects = [];
		var i = 0;
		var _g = 0;
		var _g1 = this.placements;
		while(_g < _g1.length) {
			var placement = _g1[_g];
			++_g;
			var headtype = this.vheads[i].nhead.type;
			var rect = null;
			var headw = 0;
			this.headRect(headtype,this.notevalue);
			var _g2 = nx3_ENoteValTools.head(this.notevalue);
			switch(_g2[1]) {
			case 2:
				headw = 2.2;
				break;
			default:
				headw = 1.6;
			}
			var rect1 = new nx3_geom_Rectangle(-headw,-1,2 * headw,2);
			var pos = 0.0;
			var _g21 = placement.pos;
			switch(_g21[1]) {
			case 0:
				pos = -2 * headw;
				break;
			case 2:
				pos = 2 * headw;
				break;
			default:
				pos = 0;
			}
			rect1.offset(pos,placement.level);
			rects.push(rect1);
			i++;
		}
		return rects;
	}
	,headRect: function(type,notevalue) {
		var headw = 2;
		var headh = 2;
		switch(type[1]) {
		case 0:
			var _g = nx3_ENoteValTools.head(this.notevalue);
			switch(_g[1]) {
			case 2:
				return new nx3_geom_Rectangle(-2.2,-1,4.4,2);
			default:
				return new nx3_geom_Rectangle(-1.6,-1,3.2,2);
			}
			break;
		case 3:
			var _g1 = nx3_ENoteValTools.beaminglevel(this.notevalue);
			switch(_g1) {
			case 1:
				return new nx3_geom_Rectangle(-1.8,-3,3.6,6);
			case 2:
				return new nx3_geom_Rectangle(-2,-3,4,6);
			default:
				return new nx3_geom_Rectangle(-1.6,-3.3,3.2,6.6);
			}
			break;
		default:
			return new nx3_geom_Rectangle(-2,-2,4,4);
		}
		return new nx3_geom_Rectangle(-2,-2,4,4);
	}
	,__class__: nx3_PHeadsRectsCalculator
};
var nx3_PNote = function(nnote) {
	this.nnote = nnote;
};
nx3_PNote.__name__ = true;
nx3_PNote.prototype = {
	iterator: function() {
		return HxOverrides.iter(this.heads);
	}
	,get_length: function() {
		return this.heads.length;
	}
	,getVoice: function() {
		return this.voice;
	}
	,getHeads: function() {
		if(this.heads != null) return this.heads;
		this.heads = [];
		var _g = 0;
		var _g1 = this.nnote.get_nheads();
		while(_g < _g1.length) {
			var nhead = _g1[_g];
			++_g;
			var phead = new nx3_PHead(nhead);
			phead.note = this;
			this.heads.push(phead);
		}
		return this.heads;
	}
	,getBeamgroup: function() {
		if(this.voice == null) throw new js__$Boot_HaxeError("PNote doesn't have a parent PVoice");
		if(this.beamgroup == null) this.voice.getBeamgroups();
		if(this.beamgroup == null) throw new js__$Boot_HaxeError("this should not happen");
		return this.beamgroup;
	}
	,getDirection: function() {
		return this.getBeamgroup().getDirection();
	}
	,getComplex: function() {
		if(this.voice == null) throw new js__$Boot_HaxeError("PNote doesn't have a parent PVoice");
		if(this.complex == null) this.voice.getPart().getComplexes();
		if(this.complex == null) throw new js__$Boot_HaxeError("Shouldn't happen");
		return this.complex;
	}
	,getHeadsRects: function() {
		if(this.voice == null) throw new js__$Boot_HaxeError("PNote doesn't have a parent PVoice");
		if(this.headsRects != null) return this.headsRects;
		var calculator = new nx3_PNoteheadsRectsCalculator(this);
		this.headsRects = calculator.getHeadsRects();
		return this.headsRects;
	}
	,getStaveRect: function() {
		if(this.voice == null) throw new js__$Boot_HaxeError("PNote doesn't have a parent PVoice");
		if(this.staveRectChecked) return this.staveRect;
		this.staveRect = this.getComplex().getStaveRect(this);
		this.staveRectChecked = true;
		return this.staveRect;
	}
	,getStaveXPosition: function() {
		if(this.voice == null) throw new js__$Boot_HaxeError("PNote doesn't have a parent PVoice");
		if(this.staveXPosition != null) return this.staveXPosition;
		var staverect = this.getStaveRect();
		if(staverect == null) return 0;
		if(this.getDirection() == nx3_EDirectionUD.Up) this.staveXPosition = staverect.width; else this.staveXPosition = staverect.x;
		return this.staveXPosition;
	}
	,getBaseRect: function() {
		if(this.voice == null) throw new js__$Boot_HaxeError("PNote doesn't have a parent PVoice");
		if(this.baserect != null) return this.baserect;
		this.baserect = new nx3_PBaseRectCalculator(this).getBaseRect();
		return this.baserect;
	}
	,getXOffset: function() {
		if(this.voice == null) throw new js__$Boot_HaxeError("PNote doesn't have a parent PVoice");
		if(this.xoffset != null) return this.xoffset;
		this.xoffset = this.getComplex().getNoteXOffset(this);
		return this.xoffset;
	}
	,getXPosition: function() {
		if(this.voice == null) throw new js__$Boot_HaxeError("PNote doesn't have a parent PVoice");
		if(this.xposition != null) return this.xposition;
		this.xposition = this.getComplex().getXPosition() + this.getXOffset();
		return this.xposition;
	}
	,getTies: function() {
		return this.nnote.get_ties();
	}
	,getNext: function() {
		if(this.voice == null) throw new js__$Boot_HaxeError("PNote doesn't have a parent PVoice");
		if(this.next != null) return this.next;
		var idx;
		var _this = this.voice.getNotes();
		idx = HxOverrides.indexOf(_this,this,0);
		this.next = cx_ArrayTools.indexOrNull(this.voice.getNotes(),idx + 1);
		return this.next;
	}
	,getHasTie: function() {
		return !Lambda.foreach(this.nnote,function(nhead) {
			return !(nhead.tie != null);
		});
	}
	,__class__: nx3_PNote
};
var nx3_PNoteHeadsRectTplCalculator = function(note) {
	this.note = note;
	var level;
	{
		var _g = note.nnote.type;
		switch(_g[1]) {
		case 3:
			var pause = _g[4];
			var sign = _g[3];
			var level1 = _g[2];
			level = level1;
			break;
		default:
			level = 0;
		}
	}
	var part = this.note.getVoice().getPart().npart;
	var _g1 = part.type;
	switch(_g1[1]) {
	case 3:
		this.level = level * 3;
		break;
	case 2:
		this.level = 0;
		break;
	default:
		this.level = 0;
	}
};
nx3_PNoteHeadsRectTplCalculator.__name__ = true;
nx3_PNoteHeadsRectTplCalculator.prototype = {
	getHeadsRects: function() {
		return [new nx3_geom_Rectangle(-5.5,-5.3 + this.level,10,8.8)];
	}
	,__class__: nx3_PNoteHeadsRectTplCalculator
};
var nx3_PNoteHeadsRectsLyricsCalculator = function(note,text,font) {
	this.note = note;
	this.text = text;
	this.font = font;
};
nx3_PNoteHeadsRectsLyricsCalculator.__name__ = true;
nx3_PNoteHeadsRectsLyricsCalculator.prototype = {
	getHeadsRects: function() {
		var tightchars = ["i","l","t","j"];
		var widechars = ["m","M","w","W"];
		var totalW = 0;
		var _g1 = 0;
		var _g = this.text.length;
		while(_g1 < _g) {
			var i = _g1++;
			var $char = this.text.charAt(i);
			if(HxOverrides.indexOf(tightchars,$char,0) != -1) totalW += 2; else if(HxOverrides.indexOf(widechars,$char,0) != -1) totalW += 5; else totalW += 3;
		}
		totalW += 2;
		var width = totalW;
		var height = 6;
		return [new nx3_geom_Rectangle(-width / 2,-height / 2,width,height)];
	}
	,__class__: nx3_PNoteHeadsRectsLyricsCalculator
};
var nx3_PNoteHeadsRectsPausesCalculator = function(vnote) {
	this.vnote = vnote;
};
nx3_PNoteHeadsRectsPausesCalculator.__name__ = true;
nx3_PNoteHeadsRectsPausesCalculator.prototype = {
	getHeadsRects: function() {
		var rects;
		var _g = nx3_ENoteValTools.beaminglevel(this.vnote.nnote.value);
		switch(_g) {
		case 1:
			rects = [new nx3_geom_Rectangle(-1.8,-3,3.6,6)];
			break;
		case 2:
			rects = [new nx3_geom_Rectangle(-2,-3,4,6)];
			break;
		default:
			rects = [new nx3_geom_Rectangle(-1.6,-3.3,3.2,6.6)];
		}
		var level = 0;
		{
			var _g1 = this.vnote.nnote.type;
			switch(_g1[1]) {
			case 1:
				var l = _g1[2];
				level = l;
				break;
			default:
			}
		}
		rects[0].offset(0,level);
		return rects;
	}
	,__class__: nx3_PNoteHeadsRectsPausesCalculator
};
var nx3_PNoteHeadsRectsPitchCalculator = function(note) {
	this.note = note;
	{
		var _g = note.nnote.type;
		switch(_g[1]) {
		case 7:
			var midinote = _g[3];
			var level = _g[2];
			this.level = level;
			this.midinote = midinote;
			break;
		default:
		}
	}
	var part = this.note.getVoice().getPart().npart;
	{
		var _g1 = part.type;
		switch(_g1[1]) {
		case 9:
			var l = _g1[2];
			this.chain = true;
			break;
		default:
			this.chain = false;
		}
	}
	{
		var _g2 = part.type;
		switch(_g2[1]) {
		case 9:
			var leveloffset = _g2[2];
			this.partlevel = leveloffset;
			break;
		default:
			this.partlevel = 0;
		}
	}
};
nx3_PNoteHeadsRectsPitchCalculator.__name__ = true;
nx3_PNoteHeadsRectsPitchCalculator.prototype = {
	getHeadsRects: function() {
		if(!this.chain) return [new nx3_geom_Rectangle(-2,-2,1,4)];
		var rlevel = this.level + this.midinote;
		return [new nx3_geom_Rectangle(-2,-2 + rlevel,1,4)];
	}
	,__class__: nx3_PNoteHeadsRectsPitchCalculator
};
var nx3_PNoteOffsetCalculator = function(complex) {
	this.complex = complex;
};
nx3_PNoteOffsetCalculator.__name__ = true;
nx3_PNoteOffsetCalculator.prototype = {
	getNoteOffset: function(note) {
		if(note == cx_ArrayTools.first(this.complex.getNotes())) return 0;
		var firstrects = this.complex.notes[0].getHeadsRects();
		var secondrects;
		var _this = this.complex.notes[1].getHeadsRects();
		secondrects = _this.slice();
		var secondoffset = nx3_geom_RectanglesTools.getXIntersection(firstrects,secondrects);
		var firstnote = cx_ArrayTools.first(this.complex.getNotes());
		var diff = note.nnote.get_topLevel() - firstnote.nnote.get_bottomLevel();
		if(diff == 1) secondoffset = secondoffset * 0.8;
		if(diff < 1) {
			if(nx3_ENoteValTools.dotlevel(firstnote.nnote.value) > 0) if(nx3_ENoteValTools.dotlevel(firstnote.nnote.value) == 1) secondoffset += 2.0; else secondoffset += 3.0;
		}
		return secondoffset;
	}
	,__class__: nx3_PNoteOffsetCalculator
};
var nx3_PNoteheadsRectsCalculator = function(note) {
	this.note = note;
};
nx3_PNoteheadsRectsCalculator.__name__ = true;
nx3_PNoteheadsRectsCalculator.prototype = {
	getHeadsRects: function() {
		{
			var _g = this.note.nnote.type;
			switch(_g[1]) {
			case 0:
				var a2 = _g[5];
				var a = _g[4];
				var v = _g[3];
				var h = _g[2];
				return new nx3_PHeadsRectsCalculator(this.note).getHeadsRects();
			case 1:
				var l = _g[2];
				return new nx3_PNoteHeadsRectsPausesCalculator(this.note).getHeadsRects();
			case 4:
				var font = _g[5];
				var c = _g[4];
				var o = _g[3];
				var text = _g[2];
				return new nx3_PNoteHeadsRectsLyricsCalculator(this.note,text,font).getHeadsRects();
			case 3:
				var pause = _g[4];
				var sign = _g[3];
				var l1 = _g[2];
				return new nx3_PNoteHeadsRectTplCalculator(this.note).getHeadsRects();
			case 7:
				var m = _g[3];
				var l2 = _g[2];
				return new nx3_PNoteHeadsRectsPitchCalculator(this.note).getHeadsRects();
			default:
				throw new js__$Boot_HaxeError("Non implemented ENoteType: " + this.note.nnote.type[0]);
				return [];
			}
		}
	}
	,__class__: nx3_PNoteheadsRectsCalculator
};
var nx3_PPart = function(npart) {
	this.rect = null;
	this.npart = npart;
	this.value = 0;
};
nx3_PPart.__name__ = true;
nx3_PPart.prototype = {
	iterator: function() {
		var _this = this.getVoices();
		return HxOverrides.iter(_this);
	}
	,get_length: function() {
		return this.getVoices().length;
	}
	,getBar: function() {
		return this.bar;
	}
	,getVoices: function() {
		if(this.voices != null) return this.voices;
		this.voices = [];
		var _g = 0;
		var _g1 = this.npart.nvoices;
		while(_g < _g1.length) {
			var nvoice = _g1[_g];
			++_g;
			var voice = new nx3_PVoice(nvoice);
			voice.part = this;
			this.voices.push(voice);
		}
		return this.voices;
	}
	,getVoice: function(idx) {
		if(idx < 0 || idx > this.getVoices().length) return null; else return this.getVoices()[idx];
	}
	,getComplexes: function() {
		if(this.complexes != null) return this.complexes;
		var generator = new nx3_PPartComplexesGenerator(this);
		this.complexes = generator.getComplexes();
		return this.complexes;
	}
	,getPositionsComplexes: function() {
		if(this.positionsComplexes != null) return this.positionsComplexes;
		this.positionsComplexes = new haxe_ds_IntMap();
		var _g = 0;
		var _g1 = this.getComplexes();
		while(_g < _g1.length) {
			var complex = _g1[_g];
			++_g;
			this.positionsComplexes.set(complex.getValueposition(),complex);
		}
		return this.positionsComplexes;
	}
	,getIndex: function() {
		var _this = this.bar.getParts();
		return HxOverrides.indexOf(_this,this,0);
	}
	,getValue: function() {
		if(this.value != 0) return this.value;
		var _g = 0;
		var _g1 = this.getVoices();
		while(_g < _g1.length) {
			var voice = _g1[_g];
			++_g;
			this.value = Std["int"](Math.max(this.value,voice.getValue()));
		}
		return this.value;
	}
	,getRect: function() {
		if(this.rect != null) return this.rect;
		var result;
		var _g = this.npart.type;
		switch(_g[1]) {
		case 0:
			result = new nx3_geom_Rectangle(0,-8,1,13);
			break;
		default:
			result = new nx3_geom_Rectangle(0,-4,1,8);
		}
		var _g1 = 0;
		var _g11 = this.getComplexes();
		while(_g1 < _g11.length) {
			var complex = _g11[_g1];
			++_g1;
			var cr = complex.getRect();
			result = result.union(cr);
		}
		var _g2 = 0;
		var _g12 = this.getVoices();
		while(_g2 < _g12.length) {
			var voice = _g12[_g2];
			++_g2;
			var _g21 = 0;
			var _g3 = voice.getBeamgroups();
			while(_g21 < _g3.length) {
				var beamgroup = _g3[_g21];
				++_g21;
				var dir = beamgroup.getDirection();
				var frame = beamgroup.getFrame();
				if(frame == null) continue;
				var top;
				if(dir == nx3_EDirectionUD.Up) top = Math.min(frame.leftTipY,frame.rightTipY); else top = 0;
				var bottom;
				if(dir == nx3_EDirectionUD.Up) bottom = 0; else bottom = Math.max(frame.leftTipY,frame.rightTipY);
				var br = new nx3_geom_Rectangle(0,top,1,bottom - top);
				result = result.union(br);
			}
		}
		this.rect = result;
		return result;
	}
	,getYAbove: function() {
		var result = 0.0;
		var index;
		var _this = this.bar.getParts();
		index = HxOverrides.indexOf(_this,this,0);
		if(index == 0) result = this.getRect().y; else {
			var prevPart = this.bar.getPart(index - 1);
			result = prevPart.getRect().get_bottom() + -this.getRect().y;
		}
		return result;
	}
	,__class__: nx3_PPart
};
var nx3_PPartComplexesGenerator = function(part) {
	this.part = part;
	this.vvoices = part.getVoices();
};
nx3_PPartComplexesGenerator.__name__ = true;
nx3_PPartComplexesGenerator.prototype = {
	getComplexes: function() {
		if(this.complexes != null) return this.complexes;
		this.positionsMap = this.calcPositionsMap();
		this.calcComplexes(this.positionsMap);
		return this.complexes;
	}
	,calcComplexes: function(positions) {
		this.complexes = [];
		var poskeys = cx_MapTools.keysToArray(positions.keys());
		poskeys = cx_MapTools.sortarray(poskeys);
		var _g = 0;
		while(_g < poskeys.length) {
			var pos = poskeys[_g];
			++_g;
			var vnotes = positions.h[pos];
			var vcomplex = new nx3_PComplex(this.part,vnotes,pos);
			this.complexes.push(vcomplex);
		}
	}
	,calcPositionsMap: function() {
		var positionsMap = new haxe_ds_IntMap();
		var _g = 0;
		var _g1 = this.vvoices;
		while(_g < _g1.length) {
			var vvoice = _g1[_g];
			++_g;
			var _g2 = 0;
			var _g3 = vvoice.getNotes();
			while(_g2 < _g3.length) {
				var vnote = _g3[_g2];
				++_g2;
				var npos;
				var this1 = vvoice.getNotePositions();
				npos = this1.get(vnote);
				if(!positionsMap.h.hasOwnProperty(npos)) positionsMap.h[npos] = [];
				positionsMap.h[npos].push(vnote);
			}
		}
		return positionsMap;
	}
	,__class__: nx3_PPartComplexesGenerator
};
var nx3_PPartbeamgroupsDirectionCalculator = function(ppart) {
	this.ppart = ppart;
};
nx3_PPartbeamgroupsDirectionCalculator.__name__ = true;
nx3_PPartbeamgroupsDirectionCalculator.prototype = {
	calculateBeamgroupsDirections: function() {
		var partbeamgroups = [];
		var _g = 0;
		var _g1 = this.ppart.getVoices();
		while(_g < _g1.length) {
			var pvoice = _g1[_g];
			++_g;
			partbeamgroups.push(pvoice.getBeamgroups());
		}
		var beamgroups0 = partbeamgroups[0];
		var voiceDirection0 = this.ppart.getVoices()[0].nvoice.direction;
		if(voiceDirection0 == null) voiceDirection0 = nx3_EDirectionUAD.Auto;
		if(partbeamgroups.length == 1) {
			var _g2 = 0;
			while(_g2 < beamgroups0.length) {
				var beamgroup = beamgroups0[_g2];
				++_g2;
				var direction = null;
				switch(voiceDirection0[1]) {
				case 0:
					direction = nx3_EDirectionUD.Up;
					break;
				case 2:
					direction = nx3_EDirectionUD.Down;
					break;
				case 1:
					var calculator = new nx3_PBeamgroupDirectionCalculator(beamgroup);
					direction = calculator.getDirection();
					break;
				}
				beamgroup.setDirection(direction);
			}
		} else if(partbeamgroups.length == 2) {
			var beamgroups1 = partbeamgroups[1];
			var voiceDirection1 = this.ppart.getVoices()[1].nvoice.direction;
			if(voiceDirection1 == null) voiceDirection0 = nx3_EDirectionUAD.Auto;
			var voice0 = this.ppart.getVoices()[0];
			var voice1 = this.ppart.getVoices()[1];
			if(voiceDirection0 == nx3_EDirectionUAD.Auto && voiceDirection1 == nx3_EDirectionUAD.Auto) {
				var voice0value = voice0.getValue();
				var voice1value = voice1.getValue();
				var direction1 = null;
				var bgPosition = 0;
				var _g3 = 0;
				while(_g3 < beamgroups0.length) {
					var beamgroup1 = beamgroups0[_g3];
					++_g3;
					if(bgPosition < voice1value) direction1 = nx3_EDirectionUD.Up; else {
						var calculator1 = new nx3_PBeamgroupDirectionCalculator(beamgroup1);
						direction1 = calculator1.getDirection();
					}
					beamgroup1.setDirection(direction1);
					bgPosition += beamgroup1.getValue();
				}
				var bgPosition1 = 0;
				var _g4 = 0;
				while(_g4 < beamgroups1.length) {
					var beamgroup2 = beamgroups1[_g4];
					++_g4;
					if(bgPosition1 < voice0value) direction1 = nx3_EDirectionUD.Down; else {
						var calculator2 = new nx3_PBeamgroupDirectionCalculator(beamgroup2);
						direction1 = calculator2.getDirection();
					}
					beamgroup2.setDirection(direction1);
					bgPosition1 += beamgroup2.getValue();
				}
			} else {
				var _g5 = 0;
				while(_g5 < beamgroups0.length) {
					var beamgroup3 = beamgroups0[_g5];
					++_g5;
					beamgroup3.setDirection(nx3_EDirectionTools.uadToUd(voice0.nvoice.direction));
				}
				var _g6 = 0;
				while(_g6 < beamgroups1.length) {
					var beamgroup4 = beamgroups1[_g6];
					++_g6;
					beamgroup4.setDirection(nx3_EDirectionTools.uadToUd(voice1.nvoice.direction));
				}
			}
		} else throw new js__$Boot_HaxeError("SHOULDN'T HAPPEN");
	}
	,__class__: nx3_PPartbeamgroupsDirectionCalculator
};
var nx3_PScore = function(nscore) {
	this.prevSystemwidth = 0;
	this.nscore = nscore;
};
nx3_PScore.__name__ = true;
nx3_PScore.prototype = {
	getBars: function() {
		if(this.bars != null) return this.bars;
		this.bars = [];
		var _g = 0;
		var _g1 = this.nscore.nbars;
		while(_g < _g1.length) {
			var nbar = _g1[_g];
			++_g;
			var bar = new nx3_PBar(nbar);
			bar.score = this;
			this.bars.push(bar);
		}
		return this.bars;
	}
	,getNBars: function() {
		var result = [];
		var _g = 0;
		var _g1 = this.getBars();
		while(_g < _g1.length) {
			var bar = _g1[_g];
			++_g;
			result.push(bar.nbar);
		}
		return result;
	}
	,getSystems: function(systemwidth) {
		if(systemwidth != this.prevSystemwidth) this.systems = null;
		if(this.systems != null) return this.systems;
		this.systems = new nx3_PScoreSystemsGenerator(this,this.getBars()).getsSystems([systemwidth]);
		var _g = 0;
		var _g1 = this.systems;
		while(_g < _g1.length) {
			var system = _g1[_g];
			++_g;
			system.calculateSystembarXs();
		}
		var _g2 = 0;
		var _g11 = this.systems;
		while(_g2 < _g11.length) {
			var system1 = _g11[_g2];
			++_g2;
			var ifMoreThan;
			if(system1 != cx_ArrayTools.last(this.systems)) ifMoreThan = 0; else ifMoreThan = system1.getSystemBreakWidth() * .7;
			new nx3_PScoreSystemStretcher(system1).stretchTo(system1.getSystemBreakWidth(),ifMoreThan);
		}
		return this.systems;
	}
	,getBar: function(idx) {
		if(idx < 0 || idx > this.getBars().length) return null; else return this.getBars()[idx];
	}
	,getSystemY: function(system) {
		if(this.systems == null) throw new js__$Boot_HaxeError("Systems == null");
		var systemidx = HxOverrides.indexOf(this.systems,system,0);
		var sysY = .0;
		var _g = 0;
		while(_g < systemidx) {
			var i = _g++;
			sysY += this.systems[i].getHeight();
		}
		return sysY;
	}
	,getHeight: function() {
		if(this.systems == null) throw new js__$Boot_HaxeError("Systems == null");
		var lastsystem = cx_ArrayTools.last(this.systems);
		return this.getSystemY(lastsystem) + lastsystem.getHeight();
	}
	,getWidth: function() {
		if(this.systems == null) throw new js__$Boot_HaxeError("Systems == null");
		var w = .0;
		var _g = 0;
		var _g1 = this.systems;
		while(_g < _g1.length) {
			var sys = _g1[_g];
			++_g;
			w = Math.max(w,sys.getBarsWidth());
		}
		return w;
	}
	,__class__: nx3_PScore
};
var nx3_PScoreSystemStretcher = function(system) {
	this.system = system;
};
nx3_PScoreSystemStretcher.__name__ = true;
nx3_PScoreSystemStretcher.prototype = {
	stretchTo: function(stretchSystemToWidth,ifMoreThan) {
		if(ifMoreThan == null) ifMoreThan = 0;
		if(ifMoreThan > 0) {
			if(this.system.getWidth() <= ifMoreThan) return true;
		}
		var diff = stretchSystemToWidth - this.system.getWidth();
		var totalvalue = this.system.getValue();
		var _g = 0;
		var _g1 = this.system.getSystembars();
		while(_g < _g1.length) {
			var systembar = _g1[_g];
			++_g;
			var stretchamount = systembar.bar.getValue() / totalvalue * diff;
			systembar.setBarStretch(stretchamount);
		}
		this.system.calculateSystembarXs();
		return false;
	}
	,__class__: nx3_PScoreSystemStretcher
};
var nx3_PScoreSystemsGenerator = function(score,bars) {
	this.bars = bars;
	this.score = score;
};
nx3_PScoreSystemsGenerator.__name__ = true;
nx3_PScoreSystemsGenerator.prototype = {
	getsSystems: function(systemwidths) {
		var tempbars = this.bars.slice();
		var result = [];
		var sysidx = 0;
		var prevbarAttributes = null;
		while(tempbars.length > 0) {
			var systemwidthsFirst = systemwidths[0];
			var syswidth;
			syswidth = (systemwidths == null?null:sysidx < 0 || sysidx > systemwidths.length - 1?null:systemwidths[sysidx]) != null?systemwidths[sysidx]:systemwidthsFirst;
			var generator = new nx3_PSystemBarsGenerator(this.score,tempbars,{ showFirstClef : true, showFirstKey : true, showFirstTime : sysidx == 0},prevbarAttributes,syswidth,new nx3_PBarWidthCalculator());
			var system = generator.getSystem();
			prevbarAttributes = system.getLastBarAttributes();
			result.push(system);
			sysidx++;
		}
		return result;
	}
	,__class__: nx3_PScoreSystemsGenerator
};
var nx3_PSignsCalculator = function(notes) {
	this.notes = notes;
};
nx3_PSignsCalculator.__name__ = true;
nx3_PSignsCalculator.prototype = {
	getSigns: function() {
		var signs;
		signs = this.calcUnsortedSigns(this.notes);
		signs = this.calcSortSigns(signs);
		return signs;
	}
	,getVisibleSigns: function() {
		return this.calcVisibleSigns(this.getSigns());
	}
	,calcVisibleSigns: function(signs) {
		var visibleSigns = [];
		var _g = 0;
		while(_g < signs.length) {
			var sign = signs[_g];
			++_g;
			if(sign.sign == nx3_ESign.None) continue;
			visibleSigns.push(sign);
		}
		return visibleSigns;
	}
	,calcUnsortedSigns: function(notes) {
		var PSigns = [];
		var _g = 0;
		while(_g < notes.length) {
			var note = notes[_g];
			++_g;
			var _g1 = 0;
			var _g2 = note.nnote.get_nheads();
			while(_g1 < _g2.length) {
				var nhead = _g2[_g1];
				++_g1;
				var tsign = { sign : nhead.sign, level : nhead.level, position : 0};
				PSigns.push(tsign);
			}
		}
		return PSigns;
	}
	,calcSortSigns: function(PSigns) {
		PSigns.sort(function(a,b) {
			return Reflect.compare(a.level,b.level);
		});
		return PSigns;
	}
	,__class__: nx3_PSignsCalculator
};
var nx3_PSignsRectsCalculator = function(signs) {
	this.signs = signs;
};
nx3_PSignsRectsCalculator.__name__ = true;
nx3_PSignsRectsCalculator.prototype = {
	getSignRects: function(headsRects) {
		var rects = [];
		if(headsRects == null) headsRects = [];
		var _g = 0;
		var _g1 = this.signs;
		while(_g < _g1.length) {
			var sign = _g1[_g];
			++_g;
			var rect = this.getSignRect(sign.sign);
			rect.offset(-rect.width,sign.level);
			var _g2 = 0;
			while(_g2 < headsRects.length) {
				var hr = headsRects[_g2];
				++_g2;
				var i = rect.intersection(hr);
				var count = 0;
				while(i.width > 0.0000001) {
					rect.offset(-i.width,0);
					i = rect.intersection(hr);
					if(count > 5) break;
					count++;
				}
			}
			var _g21 = 0;
			while(_g21 < rects.length) {
				var r = rects[_g21];
				++_g21;
				var i1 = r.intersection(rect);
				while(i1.width > 0 || i1.height > 0) {
					rect.x = r.x - rect.width;
					i1 = r.intersection(rect);
				}
			}
			rects.push(rect);
		}
		return rects;
	}
	,getSignRect: function(sign) {
		switch(sign[1]) {
		case 0:
			return null;
		case 5:
			return new nx3_geom_Rectangle(0,-1.5,2.6,3);
		case 7:case 8:case 6:
			return new nx3_geom_Rectangle(0,-2,4.4,4);
		case 2:
			return new nx3_geom_Rectangle(0,-3,2.6,5);
		default:
			return new nx3_geom_Rectangle(0,-3,2.6,6);
		}
		throw new js__$Boot_HaxeError("This shouldn't happen!");
		return null;
	}
	,__class__: nx3_PSignsRectsCalculator
};
var nx3_PStaveRectCalculator = function(note) {
	this.note = note;
};
nx3_PStaveRectCalculator.__name__ = true;
nx3_PStaveRectCalculator.prototype = {
	getStaveRect: function() {
		if(this.note.nnote.type[0] != "Note") return null;
		if(nx3_ENoteValTools.stavinglevel(this.note.nnote.value) < 1) return null;
		var headw;
		var _g = nx3_ENoteValTools.head(this.note.nnote.value);
		switch(_g[1]) {
		case 2:
			headw = 2.2;
			break;
		default:
			headw = 1.6;
		}
		var rect = null;
		if(this.note.getDirection() == nx3_EDirectionUD.Up) rect = new nx3_geom_Rectangle(0,this.note.nnote.get_bottomLevel() - 7,headw,7); else rect = new nx3_geom_Rectangle(-headw,this.note.nnote.get_topLevel(),headw,7);
		rect.offset(this.note.getXOffset(),0);
		return rect;
	}
	,getFlagRect: function() {
		if(this.note.nnote.type[0] != "Note") return null;
		if(nx3_ENoteValTools.beaminglevel(this.note.nnote.value) < 1) return null;
		var beamgroup = this.note.getBeamgroup();
		if(beamgroup != null && beamgroup.pnotes.length == 1) {
			if(nx3_ENoteValTools.beaminglevel(this.note.nnote.value) > 0) {
				var headw;
				var _g = nx3_ENoteValTools.head(this.note.nnote.value);
				switch(_g[1]) {
				case 2:
					headw = 2.2;
					break;
				default:
					headw = 1.6;
				}
				var rect = null;
				if(this.note.getDirection() == nx3_EDirectionUD.Up) rect = new nx3_geom_Rectangle(headw,this.note.nnote.get_bottomLevel() - 7,2.6,4.8); else rect = new nx3_geom_Rectangle(-headw,this.note.nnote.get_topLevel() + 7 - 4.8,2.6,4.8);
				rect.offset(this.note.getXOffset(),0);
				return rect;
			}
		}
		return null;
	}
	,__class__: nx3_PStaveRectCalculator
};
var nx3_PSystem = function(score) {
	this.systemBreakWidth = 0;
	this.systembars = [];
	this.width = 0;
	this.score = score;
};
nx3_PSystem.__name__ = true;
nx3_PSystem.prototype = {
	getStatus: function() {
		return this.status;
	}
	,getWidth: function() {
		return this.width;
	}
	,getSystembars: function() {
		return this.systembars;
	}
	,getLastBarAttributes: function() {
		if(this.systembars.length == 0) return null;
		return cx_ArrayTools.last(this.systembars).actAttributes;
	}
	,getSystemBreakWidth: function() {
		return this.systemBreakWidth;
	}
	,getValue: function() {
		if(this.value != null) return this.value;
		this.value = 0;
		var _g = 0;
		var _g1 = this.getSystembars();
		while(_g < _g1.length) {
			var systembar = _g1[_g];
			++_g;
			this.value += systembar.bar.getValue();
		}
		return this.value;
	}
	,calculateSystembarXs: function() {
		var x = 0.0;
		var _g = 0;
		var _g1 = this.getSystembars();
		while(_g < _g1.length) {
			var systemBar = _g1[_g];
			++_g;
			systemBar.xposition = x;
			x += systemBar.getBarMeasurements().getTotalWidth();
		}
	}
	,getSpaceAbovePart: function(partIdx) {
		var distance = 0.0;
		var baridx = 0;
		var _g = 0;
		var _g1 = this.getSystembars();
		while(_g < _g1.length) {
			var systembar = _g1[_g];
			++_g;
			var part = systembar.bar.getPart(partIdx);
			if(part == null) {
				console.log("part == null");
				continue;
			}
			var partdistance = 0.0;
			var partrect = part.getRect();
			if(partIdx == 0) partdistance = -partrect.get_top(); else {
				var prevpart = systembar.bar.getParts()[partIdx - 1];
				var prevpartrect = prevpart.getRect();
				partdistance = prevpartrect.get_bottom() + -partrect.get_top();
			}
			distance = Math.max(distance,partdistance);
			baridx++;
		}
		return distance;
	}
	,getPartY: function(partidx) {
		var party = 0.0;
		var _g1 = 0;
		var _g = partidx + 1;
		while(_g1 < _g) {
			var idx = _g1++;
			party += this.getSpaceAbovePart(idx);
		}
		return party;
	}
	,getTopPartY: function() {
		return this.getPartY(0);
	}
	,getBottomPartY: function() {
		var partcount = this.getSystembars()[0].bar.getParts().length - 1;
		return this.getPartY(partcount);
	}
	,getHeight: function() {
		var partcount = this.getSystembars()[0].bar.getParts().length - 1;
		var partbottom;
		var pb = 0.0;
		var _g = 0;
		var _g1 = this.getSystembars();
		while(_g < _g1.length) {
			var sb = _g1[_g];
			++_g;
			pb = Math.max(pb,sb.bar.getPart(partcount).getRect().get_bottom());
		}
		partbottom = pb;
		return this.getPartY(partcount) + partbottom;
	}
	,getSystembarX: function(systembar) {
		var idx;
		var _this = this.getSystembars();
		idx = HxOverrides.indexOf(_this,systembar,0);
		var x = .0;
		var _g = 0;
		var _g1 = this.getSystembars();
		while(_g < _g1.length) {
			var sb = _g1[_g];
			++_g;
			if(sb == systembar) return x;
			x += sb.getBarMeasurements().getTotalWidth();
		}
		return 0;
	}
	,getBarsWidth: function() {
		var lastbar = cx_ArrayTools.last(this.getSystembars());
		return this.getSystembarX(lastbar) + lastbar.getBarMeasurements().getTotalWidth();
	}
	,getY: function() {
		if(this.score == null) {
			return 0;
			throw new js__$Boot_HaxeError("Score == null");
		}
		return this.score.getSystemY(this);
	}
	,__class__: nx3_PSystem
};
var nx3_PSystemBar = function(system,bar,barConfig,barMeasurements,actAttributes,caAttributes) {
	this.stretchamount = 0;
	this.system = system;
	this.bar = bar;
	this.bar.systembar = this;
	this.barConfig = barConfig;
	this.barMeasurements = barMeasurements;
	this.actAttributes = actAttributes;
	this.caAttributes = caAttributes;
};
nx3_PSystemBar.__name__ = true;
nx3_PSystemBar.prototype = {
	setBarStretch: function(amount) {
		if(amount == this.stretchamount) return;
		var calculator = new nx3_PBarStretchCalculator(this);
		if(amount == 0) calculator.resetStretch(); else calculator.stretch(amount);
	}
	,getBarMeasurements: function() {
		if(this.barMeasurements != null) return this.barMeasurements;
		this.barMeasurements = new nx3_PSystembarMeasurements(this.bar).init(this.actAttributes,this.barConfig,this.caAttributes);
		return this.barMeasurements;
	}
	,getXPosition: function() {
		return this.xposition;
	}
	,getX: function() {
		if(this.system == null) throw new js__$Boot_HaxeError("System == null");
		return this.system.getSystembarX(this);
	}
	,__class__: nx3_PSystemBar
};
var nx3_PSystemBarsGenerator = function(score,bars,systemConfig,prevBarAttributes,breakSystemwidth,barWidthCalculator) {
	this.score = score;
	this.bars = bars;
	this.systemConfig = systemConfig;
	this.prevBarAttributes = prevBarAttributes;
	this.breakSystemwidth = breakSystemwidth;
	this.system = new nx3_PSystem(this.score);
	this.barWidthCalculator = barWidthCalculator;
};
nx3_PSystemBarsGenerator.__name__ = true;
nx3_PSystemBarsGenerator.prototype = {
	getSystem: function() {
		this.system.systemBreakWidth = this.breakSystemwidth;
		var tryAnotherBar = true;
		while(tryAnotherBar) {
			var currentBar = this.bars[0];
			var currentBarConfig = new nx3_PBarConfig();
			var currentBarAttributes = this.getBarAttributes(currentBar);
			if(this.prevBarAttributes != null) this.overrideActualAttributesFromPrevBarAttributes(currentBarAttributes,currentBar,this.prevBarAttributes);
			this.overrideActualAttributesWithDefaultsIfStillNotSet(currentBarAttributes);
			if(this.system.getSystembars().length == 0) this.adaptBarConfig(currentBar,currentBarConfig,this.prevBarAttributes,this.systemConfig.showFirstClef,this.systemConfig.showFirstKey,this.systemConfig.showFirstTime); else this.adaptBarConfig(currentBar,currentBarConfig,this.prevBarAttributes,this.systemConfig.showFollowingClef,this.systemConfig.showFollowingKey,this.systemConfig.showFollowingTime);
			var currentMeasurements = new nx3_PSystembarMeasurements(currentBar).init(currentBarAttributes,currentBarConfig);
			var testSystemWidth = this.system.width + currentMeasurements.getTotalWidth();
			if(testSystemWidth > this.breakSystemwidth) {
				this.takeCareOfLastBarCautions();
				return this.system;
			}
			this.system.width += currentMeasurements.getTotalWidth();
			this.system.getSystembars().push(new nx3_PSystemBar(this.system,currentBar,currentBarConfig,currentMeasurements,currentBarAttributes,null));
			this.bars.shift();
			this.prevBarAttributes = this.copyBarAttributes(currentBarAttributes);
			if(this.bars.length < 1) tryAnotherBar = false;
		}
		this.system.status = nx3_PSystemStatus.Ok;
		return this.system;
	}
	,takeCareOfLastBarCautions: function() {
		this.system.status = nx3_PSystemStatus.Ok;
		var sysBar = cx_ArrayTools.last(this.system.getSystembars()).bar;
		var sysBarAttributes = cx_ArrayTools.last(this.system.getSystembars()).actAttributes;
		if(sysBar != cx_ArrayTools.last(this.bars)) {
			var nextBar = this.bars[0];
			var nextBarAttributes = this.getBarAttributes(nextBar);
			var newClef = this.arrayBNullOrDiffers(sysBarAttributes.clefs,nextBarAttributes.clefs);
			var newKey = this.arrayBNullOrDiffers(sysBarAttributes.keys,nextBarAttributes.keys);
			var newTime = this.nullOrDiffers(sysBarAttributes.time,nextBarAttributes.time);
			if(newClef || newKey || newTime) {
				var sysBarCautAttributes = this.copyAndRemoveRedundantAttributes(sysBarAttributes,nextBarAttributes);
				var sysBarConfig = cx_ArrayTools.last(this.system.getSystembars()).barConfig;
				var sysBarWidth = cx_ArrayTools.last(this.system.getSystembars()).getBarMeasurements().getTotalWidth();
				var systemWidthWithoutLastBar = this.system.width - sysBarWidth;
				var sysBarConfigWithCautions = new nx3_PBarConfig(sysBarConfig.showClef,sysBarConfig.showKey,sysBarConfig.showTime);
				if(newClef) sysBarConfigWithCautions.showCautClef = true;
				if(newKey) sysBarConfigWithCautions.showCautKey = true;
				if(newTime) sysBarConfigWithCautions.showCautTime = true;
				var measurementsWithCautions = new nx3_PSystembarMeasurements(sysBar).init(sysBarAttributes,sysBarConfigWithCautions,sysBarCautAttributes);
				if(systemWidthWithoutLastBar + measurementsWithCautions.getTotalWidth() <= this.breakSystemwidth) {
					cx_ArrayTools.last(this.system.getSystembars()).caAttributes = sysBarCautAttributes;
					cx_ArrayTools.last(this.system.getSystembars()).barConfig = sysBarConfigWithCautions;
					this.system.width = this.system.getWidth() - sysBarWidth + cx_ArrayTools.last(this.system.getSystembars()).getBarMeasurements().getTotalWidth();
				} else {
					this.system.status = nx3_PSystemStatus.Problem(101,"Last bar fits without caution attributes but not with them");
					if(this.system.getSystembars().length == 1) {
						this.system.status = nx3_PSystemStatus.Problem(102,"First bar doesn't fit when adding required cational attributes");
						return;
					}
					this.system.getSystembars().pop();
					this.bars.unshift(sysBar);
					this.system.width = this.system.width - sysBarWidth;
					this.system.status = nx3_PSystemStatus.Ok;
				}
			}
		}
	}
	,copyAndRemoveRedundantAttributes: function(sysBarAttributes,nextBarAttributes) {
		var result = this.copyBarAttributes(nextBarAttributes);
		var _g1 = 0;
		var _g = sysBarAttributes.clefs.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(result.clefs[i] == sysBarAttributes.clefs[i]) result.clefs[i] = null;
		}
		var _g11 = 0;
		var _g2 = sysBarAttributes.keys.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			if(result.keys[i1] == sysBarAttributes.keys[i1]) result.keys[i1] = null;
		}
		if(result.time == sysBarAttributes.time) result.time = null;
		return result;
	}
	,adaptBarConfig: function(bar,barConfig,prevBarAttributes,showClef,showKey,showTime) {
		if(showClef == true) showClef = true; else showClef = false;
		if(showKey == true) showKey = true; else showKey = false;
		if(showTime == true) showTime = true; else showTime = false;
		var barAttributes = this.getBarAttributes(bar);
		var _g = bar.get_displayClefs();
		switch(_g[1]) {
		case 2:
			barConfig.showClef = false;
			break;
		case 0:
			barConfig.showClef = true;
			break;
		default:
			barConfig.showClef = showClef;
			if(showClef == false && prevBarAttributes != null) {
				var _g2 = 0;
				var _g1 = prevBarAttributes.clefs.length;
				while(_g2 < _g1) {
					var i = _g2++;
					if(bar.get_clefs()[i] == null) continue;
					if(bar.get_clefs()[i] == prevBarAttributes.clefs[i]) continue;
					barConfig.showClef = true;
					break;
				}
			}
		}
		var _g3 = bar.get_displayKeys();
		switch(_g3[1]) {
		case 2:
			barConfig.showKey = false;
			break;
		case 0:
			barConfig.showKey = true;
			break;
		default:
			barConfig.showKey = showKey;
			if(showKey == false && prevBarAttributes != null) {
				var _g21 = 0;
				var _g11 = prevBarAttributes.keys.length;
				while(_g21 < _g11) {
					var i1 = _g21++;
					if(bar.get_keys()[i1] == null) continue;
					if(bar.get_keys()[i1] == prevBarAttributes.keys[i1]) continue;
					barConfig.showKey = true;
					break;
				}
			}
		}
		var _g4 = bar.get_displayTime();
		switch(_g4[1]) {
		case 2:
			barConfig.showTime = false;
			break;
		case 0:
			barConfig.showTime = true;
			break;
		default:
			barConfig.showTime = showTime;
			if(showTime == false && prevBarAttributes != null) {
				if(bar.get_time() == null) {
				} else if(bar.get_time() == prevBarAttributes.time) {
				} else barConfig.showTime = true;
			}
			if(bar.get_time() == null) barConfig.showTime = false;
		}
	}
	,copyBarAttributes: function(barAttributes) {
		var result = { clefs : [], keys : [], time : null};
		result.clefs = barAttributes.clefs.slice();
		result.keys = barAttributes.keys.slice();
		result.time = barAttributes.time;
		return result;
	}
	,overrideActualAttributesWithDefaultsIfStillNotSet: function(currentBarAttributes) {
		var _g1 = 0;
		var _g = currentBarAttributes.clefs.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(currentBarAttributes.clefs[i] == null) currentBarAttributes.clefs[i] = nx3_PSystemBarsGenerator.defaultClef;
		}
		var _g11 = 0;
		var _g2 = currentBarAttributes.keys.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			if(currentBarAttributes.keys[i1] == null) currentBarAttributes.keys[i1] = nx3_PSystemBarsGenerator.defaultKey;
		}
		if(currentBarAttributes.time == null) currentBarAttributes.time = nx3_PSystemBarsGenerator.defaultTime;
	}
	,overrideActualAttributesFromPrevBarAttributes: function(currentBarAttributes,currentBar,prevBarAttributes) {
		if(!this.compareBarAttributesValidity(currentBarAttributes,prevBarAttributes)) throw new js__$Boot_HaxeError("Attributes non compatible");
		var _g1 = 0;
		var _g = currentBar.get_clefs().length;
		while(_g1 < _g) {
			var i = _g1++;
			if(currentBar.get_clefs()[i] == null && prevBarAttributes.clefs[i] != null) currentBarAttributes.clefs[i] = prevBarAttributes.clefs[i];
		}
		var _g11 = 0;
		var _g2 = currentBar.get_keys().length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			if(currentBar.get_keys()[i1] == null && prevBarAttributes.keys[i1] != null) currentBarAttributes.keys[i1] = prevBarAttributes.keys[i1];
		}
		if(currentBar.get_time() == null && prevBarAttributes.time != null) currentBarAttributes.time = prevBarAttributes.time;
	}
	,getBarAttributes: function(bar) {
		var time = cx_ArrayTools.first((function($this) {
			var $r;
			var _this = [bar.get_time()];
			$r = _this.slice();
			return $r;
		}(this)));
		var result = { clefs : (function($this) {
			var $r;
			var _this1 = bar.get_clefs();
			$r = _this1.slice();
			return $r;
		}(this)), keys : (function($this) {
			var $r;
			var _this2 = bar.get_keys();
			$r = _this2.slice();
			return $r;
		}(this)), time : time};
		return result;
	}
	,compareBarAttributesValidity: function(barAttributesA,barAttributesB) {
		if(barAttributesA.clefs.length != barAttributesB.clefs.length) return false;
		if(barAttributesA.keys.length != barAttributesB.keys.length) return false;
		return true;
	}
	,arrayBNullOrDiffers: function(itemA,itemB) {
		if(cx_ArrayTools.allNull(itemB)) return false;
		var _g1 = 0;
		var _g = itemA.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(itemB[i] != null && itemB[i] != itemA[i]) return true;
		}
		return false;
	}
	,nullOrDiffers: function(itemA,itemB) {
		if(itemB == null) return false;
		return itemB != itemA;
	}
	,__class__: nx3_PSystemBarsGenerator
};
var nx3_PSystemStatus = { __ename__ : true, __constructs__ : ["Ok","Problem"] };
nx3_PSystemStatus.Ok = ["Ok",0];
nx3_PSystemStatus.Ok.toString = $estr;
nx3_PSystemStatus.Ok.__enum__ = nx3_PSystemStatus;
nx3_PSystemStatus.Problem = function(code,msg) { var $x = ["Problem",1,code,msg]; $x.__enum__ = nx3_PSystemStatus; $x.toString = $estr; return $x; };
var nx3_PSystembarMeasurements = function(bar) {
	this.barlineWidth = 0;
	this.cautTimeWidth = 0;
	this.cautKeyWidth = 0;
	this.cautClefWidth = 0;
	this.contentWidth = 0;
	this.contentXZero = 0;
	this.leftContentMarginWidth = 0;
	this.timeWidth = 0;
	this.keyWidth = 0;
	this.clefWidth = 0;
	this.ackoladeWidth = 0;
	this.bar = bar;
};
nx3_PSystembarMeasurements.__name__ = true;
nx3_PSystembarMeasurements.prototype = {
	getAckoladeXPosition: function() {
		return 0;
	}
	,getClefXPosition: function() {
		return this.getAckoladeXPosition() + this.ackoladeWidth;
	}
	,getKeyXPosition: function() {
		return this.getClefXPosition() + this.clefWidth;
	}
	,getTimeXPosition: function() {
		return this.getKeyXPosition() + this.keyWidth;
	}
	,getLeftContentMarginXPosition: function() {
		return this.getTimeXPosition() + this.timeWidth;
	}
	,getContentXZero: function() {
		return this.contentXZero;
	}
	,getContentXPosition: function() {
		return this.getLeftContentMarginXPosition() + this.leftContentMarginWidth;
	}
	,getContentWidth: function() {
		return this.contentWidth;
	}
	,setContentWidth: function(val) {
		this.contentWidth = val;
	}
	,getCautClefXPosition: function() {
		return this.getContentXPosition() + this.contentWidth;
	}
	,getCautKeyXPosition: function() {
		return this.getCautClefXPosition() + this.cautClefWidth;
	}
	,getCautTimeXPosition: function() {
		return this.getCautKeyXPosition() + this.cautKeyWidth;
	}
	,getBarlineXPosition: function() {
		return this.getCautTimeXPosition() + this.cautTimeWidth;
	}
	,getTotalWidth: function() {
		return this.getBarlineXPosition() + this.barlineWidth;
	}
	,init: function(barAttributes,barConfig,cautAttributes) {
		var calculator = new nx3_PBarWidthCalculator();
		this.ackoladeWidth = calculator.getLeftBarlineWidth(nx3_EBarlineLeft.None);
		if(barConfig.showClef) this.clefWidth = calculator.getClefsWidth(barAttributes.clefs);
		if(barConfig.showKey) this.keyWidth = calculator.getKeysWidth(barAttributes.keys);
		if(barConfig.showTime) this.timeWidth += calculator.getTimeWidth(barAttributes.time);
		this.leftContentMarginWidth = calculator.getContentLeftMarginWidth(this.bar);
		this.contentWidth = calculator.getContentWidth(this.bar);
		this.contentXZero = this.bar.getContentXZero();
		if(barConfig.showCautClef && cautAttributes != null) this.cautClefWidth = calculator.getClefsWidth(cautAttributes.clefs);
		if(barConfig.showCautKey && cautAttributes != null) this.cautKeyWidth = calculator.getKeysWidth(cautAttributes.keys);
		if(barConfig.showCautTime && cautAttributes != null) this.cautTimeWidth += calculator.getTimeWidth(cautAttributes.time);
		this.barlineWidth = calculator.getBarlineWidth(nx3_EBarline.Normal);
		return this;
	}
	,__class__: nx3_PSystembarMeasurements
};
var nx3_PVoice = function(nvoice) {
	this.nvoice = nvoice;
};
nx3_PVoice.__name__ = true;
nx3_PVoice.prototype = {
	iterator: function() {
		var _this = this.getNotes();
		return HxOverrides.iter(_this);
	}
	,get_length: function() {
		return this.getNotes().length;
	}
	,getPart: function() {
		return this.part;
	}
	,getNotes: function() {
		if(this.notes != null) return this.notes;
		this.notes = [];
		var _g = 0;
		var _g1 = this.nvoice.nnotes;
		while(_g < _g1.length) {
			var nnote = _g1[_g];
			++_g;
			var pnote = new nx3_PNote(nnote);
			pnote.voice = this;
			this.notes.push(pnote);
		}
		return this.notes;
	}
	,getNote: function(idx) {
		if(idx < 0 || idx > this.getNotes().length) return null; else return this.getNotes()[idx];
	}
	,getValue: function() {
		if(this.value != null) return this.value;
		if(this.notes == null) this.getNotes();
		this.value = 0;
		var _g = 0;
		var _g1 = this.notes;
		while(_g < _g1.length) {
			var pnote = _g1[_g];
			++_g;
			this.value += nx3_ENoteValTools.value(pnote.nnote.value);
		}
		return this.value;
	}
	,getBeamgroups: function(pattern) {
		if(pattern != null && pattern != this.beampattern) {
			this.beampattern = pattern;
			this.beamgroups = null;
		}
		if(this.beamgroups != null) return this.beamgroups;
		this.beamgroups = new nx3_PVoiceBeamgroupsGenerator(this.getNotes(),pattern).getBeamgroups();
		return this.beamgroups;
	}
	,getNotePositions: function() {
		if(this.pnotePositions != null) return this.pnotePositions;
		if(this.notes == null) this.getNotes();
		this.pnotePositions = new haxe_ds_ObjectMap();
		var pos = 0;
		var _g = 0;
		var _g1 = this.notes;
		while(_g < _g1.length) {
			var pnote = _g1[_g];
			++_g;
			this.pnotePositions.set(pnote,pos);
			pos += nx3_ENoteValTools.value(pnote.nnote.value);
		}
		return this.pnotePositions;
	}
	,__class__: nx3_PVoice
};
var nx3_PVoiceBeamgroupsGenerator = function(pnotes,pattern) {
	if(pattern == null) pattern = [nx3_ENoteVal.Nv4];
	this.voice = pnotes[0].getVoice();
	this.notes = pnotes;
	this.pattern = pattern;
	this.adjustPatternLenght();
};
nx3_PVoiceBeamgroupsGenerator.__name__ = true;
nx3_PVoiceBeamgroupsGenerator.prototype = {
	getBeamgroups: function() {
		var patternPositions = this.getPatternPositions();
		var notesPositions = this.getNotesPositions();
		var notesBeamgroupPosIndexes = this.getNotesBeamgroupPosIndexes(patternPositions,notesPositions);
		var beamgroups = this.createBeamgroups(notesBeamgroupPosIndexes);
		return beamgroups;
	}
	,createBeamgroups: function(indexes) {
		var noteIdx = 0;
		var prevBeamgroupPosIdx = -1;
		var groupIdx = -1;
		var result = [];
		var pnoteGroupIdx = [];
		var groupIdxpnotes = [];
		var _g = 0;
		var _g1 = this.notes;
		while(_g < _g1.length) {
			var pnote = _g1[_g];
			++_g;
			var beamgroupPosIdx = indexes[noteIdx];
			if(beamgroupPosIdx == -1) {
				groupIdx++;
				pnoteGroupIdx.push(groupIdx);
			} else {
				if(prevBeamgroupPosIdx != beamgroupPosIdx) groupIdx++;
				pnoteGroupIdx.push(groupIdx);
			}
			prevBeamgroupPosIdx = beamgroupPosIdx;
			noteIdx++;
		}
		var noteIdx1 = 0;
		var grouppnotes = [];
		var pnotes = null;
		var _g2 = 0;
		var _g11 = this.notes;
		while(_g2 < _g11.length) {
			var pnote1 = _g11[_g2];
			++_g2;
			var groupIdx1 = pnoteGroupIdx[noteIdx1];
			if(grouppnotes[groupIdx1] == null) grouppnotes[groupIdx1] = [];
			grouppnotes[groupIdx1].push(pnote1);
			noteIdx1++;
		}
		var _g3 = 0;
		while(_g3 < grouppnotes.length) {
			var group = grouppnotes[_g3];
			++_g3;
			var beamgroup = new nx3_PBeamgroup(group);
			result.push(beamgroup);
		}
		return result;
	}
	,getNotesBeamgroupPosIndexes: function(patternPositions,notesPositions) {
		var findPatternIdxForNote = function(curNotePos) {
			var _g1 = 0;
			var _g = patternPositions.length;
			while(_g1 < _g) {
				var p = _g1++;
				var curPatternPos = patternPositions[p];
				if(curNotePos.start >= curPatternPos.start && curNotePos.end <= curPatternPos.end) return p;
			}
			return -1;
		};
		var result = [];
		var p1 = 0;
		var curPatternPos1 = patternPositions[p1];
		var _g11 = 0;
		var _g2 = this.notes.length;
		while(_g11 < _g2) {
			var n = _g11++;
			var curNotePos1 = notesPositions[n];
			var nnote = this.notes[n].nnote;
			var patternIdx;
			{
				var _g21 = nnote.type;
				switch(_g21[1]) {
				case 0:
					var attributes = _g21[5];
					var articluation = _g21[4];
					var variant = _g21[3];
					var heads = _g21[2];
					if(nx3_ENoteValTools.beaminglevel(nnote.value) <= 0) patternIdx = -1; else patternIdx = findPatternIdxForNote(curNotePos1);
					break;
				case 1:
					var level = _g21[2];
					patternIdx = -1;
					break;
				default:
					patternIdx = -1;
				}
			}
			result.push(patternIdx);
		}
		return result;
	}
	,getNotesPositions: function() {
		var result = [];
		var currPos = 0;
		var _g = 0;
		var _g1 = this.notes;
		while(_g < _g1.length) {
			var pnote = _g1[_g];
			++_g;
			var value = nx3_ENoteValTools.value(pnote.nnote.value);
			var posinfo = { start : currPos, end : currPos + value};
			result.push(posinfo);
			currPos += value;
		}
		return result;
	}
	,getPatternPositions: function() {
		var result = [];
		var currPos = 0;
		var _g = 0;
		var _g1 = this.pattern;
		while(_g < _g1.length) {
			var segment = _g1[_g];
			++_g;
			var value = nx3_ENoteValTools.value(segment);
			var posinfo = { start : currPos, end : currPos + value};
			result.push(posinfo);
			currPos += value;
		}
		return result;
	}
	,adjustPatternLenght: function() {
		var notesValue = 0;
		var _g = 0;
		var _g1 = this.notes;
		while(_g < _g1.length) {
			var pnote = _g1[_g];
			++_g;
			notesValue += nx3_ENoteValTools.value(pnote.nnote.value);
		}
		var patternValue = 0;
		var _g2 = 0;
		var _g11 = this.pattern;
		while(_g2 < _g11.length) {
			var value = _g11[_g2];
			++_g2;
			patternValue += nx3_ENoteValTools.value(value);
		}
		while(patternValue < notesValue) {
			this.pattern = this.pattern.concat(this.pattern);
			patternValue *= 2;
		}
	}
	,__class__: nx3_PVoiceBeamgroupsGenerator
};
var nx3_action_EActionInfo = { __ename__ : true, __constructs__ : ["TargetXY"] };
nx3_action_EActionInfo.TargetXY = function(target,x,y) { var $x = ["TargetXY",0,target,x,y]; $x.__enum__ = nx3_action_EActionInfo; $x.toString = $estr; return $x; };
var nx3_action_EActionType = { __ename__ : true, __constructs__ : ["HeadAction","NoteAction"] };
nx3_action_EActionType.HeadAction = function(type,head,info) { var $x = ["HeadAction",0,type,head,info]; $x.__enum__ = nx3_action_EActionType; $x.toString = $estr; return $x; };
nx3_action_EActionType.NoteAction = function(type,note,info) { var $x = ["NoteAction",1,type,note,info]; $x.__enum__ = nx3_action_EActionType; $x.toString = $estr; return $x; };
var nx3_action_EActivityType = { __ename__ : true, __constructs__ : ["MouseDown","MouseUp","MouseOver","MouseOut"] };
nx3_action_EActivityType.MouseDown = ["MouseDown",0];
nx3_action_EActivityType.MouseDown.toString = $estr;
nx3_action_EActivityType.MouseDown.__enum__ = nx3_action_EActivityType;
nx3_action_EActivityType.MouseUp = ["MouseUp",1];
nx3_action_EActivityType.MouseUp.toString = $estr;
nx3_action_EActivityType.MouseUp.__enum__ = nx3_action_EActivityType;
nx3_action_EActivityType.MouseOver = ["MouseOver",2];
nx3_action_EActivityType.MouseOver.toString = $estr;
nx3_action_EActivityType.MouseOver.__enum__ = nx3_action_EActivityType;
nx3_action_EActivityType.MouseOut = ["MouseOut",3];
nx3_action_EActivityType.MouseOut.toString = $estr;
nx3_action_EActivityType.MouseOut.__enum__ = nx3_action_EActivityType;
var nx3_action_IInteractivity = function() { };
nx3_action_IInteractivity.__name__ = true;
nx3_action_IInteractivity.prototype = {
	__class__: nx3_action_IInteractivity
};
var nx3_geom_BezieerTool = function() { };
nx3_geom_BezieerTool.__name__ = true;
nx3_geom_BezieerTool.bezieerCoordinates = function(anchor1,control1,control2,anchor2,lineWidth,lineColor,segments) {
	if(segments == null) segments = 10;
	if(lineColor == null) lineColor = 0;
	if(lineWidth == null) lineWidth = 1;
	var coord = [];
	coord.push(anchor1);
	var posx;
	var posy;
	var _g = 0;
	while(_g < segments) {
		var i = _g++;
		var u = i / segments;
		posx = Math.pow(u,3) * (anchor2.x + 3 * (control1.x - control2.x) - anchor1.x) + 3 * Math.pow(u,2) * (anchor1.x - 2 * control1.x + control2.x) + 3 * u * (control1.x - anchor1.x) + anchor1.x;
		posy = Math.pow(u,3) * (anchor2.y + 3 * (control1.y - control2.y) - anchor1.y) + 3 * Math.pow(u,2) * (anchor1.y - 2 * control1.y + control2.y) + 3 * u * (control1.y - anchor1.y) + anchor1.y;
		coord.push({ x : posx, y : posy});
	}
	coord.push(anchor2);
	return coord;
};
var nx3_geom_Point = function(x,y) {
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.x = x;
	this.y = y;
};
nx3_geom_Point.__name__ = true;
nx3_geom_Point.distance = function(pt1,pt2) {
	var dx = pt1.x - pt2.x;
	var dy = pt1.y - pt2.y;
	return Math.sqrt(dx * dx + dy * dy);
};
nx3_geom_Point.interpolate = function(pt1,pt2,f) {
	return new nx3_geom_Point(pt2.x + f * (pt1.x - pt2.x),pt2.y + f * (pt1.y - pt2.y));
};
nx3_geom_Point.polar = function(len,angle) {
	return new nx3_geom_Point(len * Math.cos(angle),len * Math.sin(angle));
};
nx3_geom_Point.prototype = {
	add: function(v) {
		return new nx3_geom_Point(v.x + this.x,v.y + this.y);
	}
	,clone: function() {
		return new nx3_geom_Point(this.x,this.y);
	}
	,copyFrom: function(sourcePoint) {
		this.x = sourcePoint.x;
		this.y = sourcePoint.y;
	}
	,equals: function(toCompare) {
		return toCompare.x == this.x && toCompare.y == this.y;
	}
	,normalize: function(thickness) {
		if(this.x == 0 && this.y == 0) return; else {
			var norm = thickness / Math.sqrt(this.x * this.x + this.y * this.y);
			this.x *= norm;
			this.y *= norm;
		}
	}
	,offset: function(dx,dy) {
		this.x += dx;
		this.y += dy;
	}
	,setTo: function(x,y) {
		this.x = x;
		this.y = y;
	}
	,subtract: function(v) {
		return new nx3_geom_Point(this.x - v.x,this.y - v.y);
	}
	,toString: function() {
		return "(" + this.x + ", " + this.y + ")";
	}
	,get_length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	,__class__: nx3_geom_Point
};
var nx3_geom_Rectangle = function(x,y,width,height) {
	if(height == null) height = 0;
	if(width == null) width = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
};
nx3_geom_Rectangle.__name__ = true;
nx3_geom_Rectangle.prototype = {
	clone: function() {
		return new nx3_geom_Rectangle(this.x,this.y,this.width,this.height);
	}
	,contains: function(x,y) {
		return x >= this.x && y >= this.y && x < this.get_right() && y < this.get_bottom();
	}
	,containsPoint: function(point) {
		return this.contains(point.x,point.y);
	}
	,containsRect: function(rect) {
		if(rect.width <= 0 || rect.height <= 0) return rect.x > this.x && rect.y > this.y && rect.get_right() < this.get_right() && rect.get_bottom() < this.get_bottom(); else return rect.x >= this.x && rect.y >= this.y && rect.get_right() <= this.get_right() && rect.get_bottom() <= this.get_bottom();
	}
	,copyFrom: function(sourceRect) {
		this.x = sourceRect.x;
		this.y = sourceRect.y;
		this.width = sourceRect.width;
		this.height = sourceRect.height;
	}
	,equals: function(toCompare) {
		return this.x == toCompare.x && this.y == toCompare.y && this.width == toCompare.width && this.height == toCompare.height;
	}
	,extendBounds: function(r) {
		var dx = this.x - r.x;
		if(dx > 0) {
			this.x -= dx;
			this.width += dx;
		}
		var dy = this.y - r.y;
		if(dy > 0) {
			this.y -= dy;
			this.height += dy;
		}
		if(r.get_right() > this.get_right()) this.set_right(r.get_right());
		if(r.get_bottom() > this.get_bottom()) this.set_bottom(r.get_bottom());
	}
	,inflate: function(dx,dy) {
		this.x -= dx;
		this.y -= dy;
		this.width += dx * 2;
		this.height += dy * 2;
	}
	,inflatePoint: function(point) {
		this.inflate(point.x,point.y);
	}
	,intersection: function(toIntersect) {
		var x0;
		if(this.x < toIntersect.x) x0 = toIntersect.x; else x0 = this.x;
		var x1;
		if(this.get_right() > toIntersect.get_right()) x1 = toIntersect.get_right(); else x1 = this.get_right();
		if(x1 <= x0) return new nx3_geom_Rectangle();
		var y0;
		if(this.y < toIntersect.y) y0 = toIntersect.y; else y0 = this.y;
		var y1;
		if(this.get_bottom() > toIntersect.get_bottom()) y1 = toIntersect.get_bottom(); else y1 = this.get_bottom();
		if(y1 <= y0) return new nx3_geom_Rectangle();
		return new nx3_geom_Rectangle(x0,y0,cx_MathTools.round2(x1 - x0,null),cx_MathTools.round2(y1 - y0,null));
	}
	,intersects: function(toIntersect) {
		var x0;
		if(this.x < toIntersect.x) x0 = toIntersect.x; else x0 = this.x;
		var x1;
		if(this.get_right() > toIntersect.get_right()) x1 = toIntersect.get_right(); else x1 = this.get_right();
		if(x1 <= x0) return false;
		var y0;
		if(this.y < toIntersect.y) y0 = toIntersect.y; else y0 = this.y;
		var y1;
		if(this.get_bottom() > toIntersect.get_bottom()) y1 = toIntersect.get_bottom(); else y1 = this.get_bottom();
		return y1 > y0;
	}
	,isEmpty: function() {
		return this.width <= 0 || this.height <= 0;
	}
	,offset: function(dx,dy) {
		this.x = cx_MathTools.round2(this.x + dx,null);
		this.y = cx_MathTools.round2(this.y + dy,null);
	}
	,offsetPoint: function(point) {
		this.x += point.x;
		this.y += point.y;
	}
	,setEmpty: function() {
		this.x = 0;
		this.y = 0;
		this.width = 0;
		this.height = 0;
	}
	,toString: function() {
		return "(x=" + this.x + ", y=" + this.y + ", width=" + this.width + ", height=" + this.height + ")";
	}
	,union: function(toUnion) {
		var x0;
		if(this.x > toUnion.x) x0 = toUnion.x; else x0 = this.x;
		var x1;
		if(this.get_right() < toUnion.get_right()) x1 = toUnion.get_right(); else x1 = this.get_right();
		var y0;
		if(this.y > toUnion.y) y0 = toUnion.y; else y0 = this.y;
		var y1;
		if(this.get_bottom() < toUnion.get_bottom()) y1 = toUnion.get_bottom(); else y1 = this.get_bottom();
		return new nx3_geom_Rectangle(x0,y0,x1 - x0,y1 - y0);
	}
	,get_bottom: function() {
		return this.y + this.height;
	}
	,set_bottom: function(value) {
		this.height = value - this.y;
		return value;
	}
	,get_bottomRight: function() {
		return new nx3_geom_Point(this.x + this.width,this.y + this.height);
	}
	,set_bottomRight: function(value) {
		this.width = value.x - this.x;
		this.height = value.y - this.y;
		return value.clone();
	}
	,get_left: function() {
		return this.x;
	}
	,set_left: function(value) {
		this.width -= value - this.x;
		this.x = value;
		return value;
	}
	,get_right: function() {
		return this.x + this.width;
	}
	,set_right: function(value) {
		this.width = value - this.x;
		return value;
	}
	,get_size: function() {
		return new nx3_geom_Point(this.width,this.height);
	}
	,set_size: function(value) {
		this.width = value.x;
		this.height = value.y;
		return value.clone();
	}
	,get_top: function() {
		return this.y;
	}
	,set_top: function(value) {
		this.height -= value - this.y;
		this.y = value;
		return value;
	}
	,get_topLeft: function() {
		return new nx3_geom_Point(this.x,this.y);
	}
	,set_topLeft: function(value) {
		this.x = value.x;
		this.y = value.y;
		return value.clone();
	}
	,__class__: nx3_geom_Rectangle
};
var nx3_geom_RectanglesTools = function() { };
nx3_geom_RectanglesTools.__name__ = true;
nx3_geom_RectanglesTools.getXIntersection = function(rectsA,rectsB) {
	var rectsB2 = [];
	var _g2 = 0;
	while(_g2 < rectsB.length) {
		var r = rectsB[_g2];
		++_g2;
		rectsB2.push(r.clone());
	}
	var check = function() {
		var _g = 0;
		while(_g < rectsA.length) {
			var ra = rectsA[_g];
			++_g;
			var _g1 = 0;
			while(_g1 < rectsB2.length) {
				var rb = rectsB2[_g1];
				++_g1;
				var i = ra.intersection(rb);
				i.width = cx_MathTools.round2(i.width,8);
				if(i.width > 0) return i.width;
			}
		}
		return 0;
	};
	var x = 0;
	var moveX = check();
	while(moveX > 0) {
		x += moveX;
		var _g3 = 0;
		while(_g3 < rectsB2.length) {
			var r1 = rectsB2[_g3];
			++_g3;
			r1.offset(moveX,0);
		}
		moveX = check();
	}
	return x;
};
nx3_geom_RectanglesTools.clone = function(rects) {
	if(rects == null) return null;
	var result = [];
	var _g = 0;
	while(_g < rects.length) {
		var r = rects[_g];
		++_g;
		result.push(r);
	}
	return result;
};
nx3_geom_RectanglesTools.offset = function(rects,x,y) {
	var _g = 0;
	while(_g < rects.length) {
		var r = rects[_g];
		++_g;
		r.offset(x,y);
	}
};
nx3_geom_RectanglesTools.unionAll = function(rects) {
	if(rects == null) return null;
	if(rects.length == 1) return rects[0].clone();
	var r = rects[0].clone();
	var _g1 = 1;
	var _g = rects.length;
	while(_g1 < _g) {
		var i = _g1++;
		r = r.union(rects[i]);
	}
	return r;
};
nx3_geom_RectanglesTools.concat = function(rectsA,rectsB) {
	var _g = 0;
	while(_g < rectsB.length) {
		var r = rectsB[_g];
		++_g;
		rectsA.push(r);
	}
	return rectsA;
};
var nx3_qs_QSExamples = function() { };
nx3_qs_QSExamples.__name__ = true;
nx3_qs_QSExamples.run = function() {
	var nscore = new nx3_qs_QSParser("#test |C /Gbbb %up c d e16 f g a ").parse();
	var nscore1 = new nx3_qs_QSParser("c c").parse();
	new nx3_qs_QSParser("#test a+16 2a-,b a+,b-,cN8 ").parse();
	new nx3_qs_QSParser("#test 4a,b 8 16 | b b b").parse();
	new nx3_qs_QSParser("c2_,d pu d /F c /C c").parse();
	new nx3_qs_QSParser("/tpl 1 2 3 y t r").parse();
	var nscore2 = new nx3_qs_QSParser("/lyr Hej- san hopp- san.").parse();
	new nx3_qs_QSParser("c d e f g a ").parse();
	new nx3_qs_QSParser("c d e % f g a ").parse();
	new nx3_qs_QSParser("c d e % f g a / a b c ").parse();
	new nx3_qs_QSParser("a | a").parse();
	new nx3_qs_QSParser("a a a / b b b | a / b ").parse();
	new nx3_qs_QSParser("a % b | a  ").parse();
	new nx3_qs_QSParser("a % b / a | a / b % c  ").parse();
	new nx3_qs_QSParser("a aa % b bb / a | a aa / b bb % c cc  ").parse();
	console.log(nx3_xml_ScoreXML.toXml(nscore2).toString());
};
var nx3_qs_Qs1 = { __ename__ : true, __constructs__ : ["S","B","P","V","N"] };
nx3_qs_Qs1.S = function(s) { var $x = ["S",0,s]; $x.__enum__ = nx3_qs_Qs1; $x.toString = $estr; return $x; };
nx3_qs_Qs1.B = function(s) { var $x = ["B",1,s]; $x.__enum__ = nx3_qs_Qs1; $x.toString = $estr; return $x; };
nx3_qs_Qs1.P = function(s) { var $x = ["P",2,s]; $x.__enum__ = nx3_qs_Qs1; $x.toString = $estr; return $x; };
nx3_qs_Qs1.V = function(s) { var $x = ["V",3,s]; $x.__enum__ = nx3_qs_Qs1; $x.toString = $estr; return $x; };
nx3_qs_Qs1.N = function(s) { var $x = ["N",4,s]; $x.__enum__ = nx3_qs_Qs1; $x.toString = $estr; return $x; };
var nx3_qs_QSParser = function(str) {
	this.noteIdx = 0;
	this.voiceIdx = -1;
	this.partIdx = -1;
	this.barIdx = -1;
	this.init();
	str = cx_StrTools.replaceAll(str,"  "," ");
	str = nx3_qs_QSParserTools.urlDecode(str);
	this.str = str;
};
nx3_qs_QSParser.__name__ = true;
nx3_qs_QSParser.prototype = {
	init: function() {
	}
	,initBarGlobals: function(s) {
		this.barGlobals = { time : null};
		if(nx3_qs_StrTools.has(s,"2/8")) this.barGlobals.time = nx3_ETime.Time2_8;
		if(nx3_qs_StrTools.has(s,"3/8")) this.barGlobals.time = nx3_ETime.Time3_8;
		if(nx3_qs_StrTools.has(s,"4/8")) this.barGlobals.time = nx3_ETime.Time4_8;
		if(nx3_qs_StrTools.has(s,"5/8")) this.barGlobals.time = nx3_ETime.Time5_8;
		if(nx3_qs_StrTools.has(s,"6/8")) this.barGlobals.time = nx3_ETime.Time6_8;
		if(nx3_qs_StrTools.has(s,"2/4")) this.barGlobals.time = nx3_ETime.Time2_4;
		if(nx3_qs_StrTools.has(s,"3/4")) this.barGlobals.time = nx3_ETime.Time3_4;
		if(nx3_qs_StrTools.has(s,"4/4")) this.barGlobals.time = nx3_ETime.Time4_4;
		if(nx3_qs_StrTools.has(s,"5/4")) this.barGlobals.time = nx3_ETime.Time5_4;
		if(nx3_qs_StrTools.has(s,"6/4")) this.barGlobals.time = nx3_ETime.Time6_4;
		if(nx3_qs_StrTools.has(s,"C")) this.barGlobals.time = nx3_ETime.TimeCommon;
		if(nx3_qs_StrTools.has(s,"c")) this.barGlobals.time = nx3_ETime.TimeAllabreve;
	}
	,initPartGlobals: function(s) {
		this.partGlobals = { clef : null, key : null, type : null};
		this.partGlobals.clef = this.getPartClef(s);
		this.partGlobals.key = this.getPartKey(s);
		if(nx3_qs_StrTools.has(s,"tpl")) this.partGlobals.type = nx3_EPartType.Tplchain(nx3_EModus.Major,nx3_EOctave.Normal);
		if(nx3_qs_StrTools.has(s,"tpr")) this.partGlobals.type = nx3_EPartType.Tplrow(nx3_EModus.Major,nx3_EOctave.Normal);
		if(nx3_qs_StrTools.has(s,"lyr")) this.partGlobals.type = nx3_EPartType.Lyrics;
	}
	,initVoiceGlobals: function(s) {
		this.voiceGlobals = { dir : nx3_EDirectionUAD.Auto};
		if(nx3_qs_StrTools.has(s,"u")) this.voiceGlobals.dir = nx3_EDirectionUAD.Up;
		if(nx3_qs_StrTools.has(s,"d")) this.voiceGlobals.dir = nx3_EDirectionUAD.Down;
	}
	,initNoteGlobals: function() {
		this.noteGlobals = { value : nx3_ENoteVal.Nv4, levels : [0]};
	}
	,parse: function() {
		this.init();
		this.tokens = this.getTokens(this.str);
		var matrix = this.createMatrix(this.tokens);
		this.checkParts(matrix);
		var nscore = this.createNScore(matrix);
		return nscore;
	}
	,createNScore: function(matrix) {
		var notecounter = 0;
		var bars = [];
		var _g = 0;
		while(_g < matrix.length) {
			var ib = matrix[_g];
			++_g;
			this.initBarGlobals(ib.bar);
			var parts = [];
			var _g1 = 0;
			var _g2 = ib.parts;
			while(_g1 < _g2.length) {
				var ip = _g2[_g1];
				++_g1;
				this.initPartGlobals(ip.part);
				var voices = [];
				var _g3 = 0;
				var _g4 = ip.voices;
				while(_g3 < _g4.length) {
					var iv = _g4[_g3];
					++_g3;
					this.initVoiceGlobals(iv.voice);
					var notes = [];
					this.initNoteGlobals();
					var _g5 = 0;
					var _g6 = iv.notes;
					while(_g5 < _g6.length) {
						var ni = _g6[_g5];
						++_g5;
						notes.push(this.createNNote(ni));
					}
					voices.push(this.createVoice(iv.voice,notes));
				}
				parts.push(this.createPart(ip.part,voices));
			}
			bars.push(this.createBar(ib.bar,parts));
		}
		var score = new nx3_NScore(bars);
		return score;
	}
	,createBar: function(s,parts) {
		return new nx3_NBar(parts,null,this.barGlobals.time);
	}
	,getPartClef: function(s) {
		if(nx3_qs_StrTools.has(s,"F")) return nx3_EClef.ClefF;
		if(nx3_qs_StrTools.has(s,"C")) return nx3_EClef.ClefC;
		return nx3_EClef.ClefG;
	}
	,getPartKey: function(s) {
		if(nx3_qs_StrTools.has(s,"bbb")) return nx3_EKey.Flat3;
		if(nx3_qs_StrTools.has(s,"bb")) return nx3_EKey.Flat2;
		if(nx3_qs_StrTools.has(s,"b")) return nx3_EKey.Flat1;
		if(nx3_qs_StrTools.has(s,"n")) return nx3_EKey.Natural;
		if(nx3_qs_StrTools.has(s,"###")) return nx3_EKey.Sharp3;
		if(nx3_qs_StrTools.has(s,"##")) return nx3_EKey.Sharp2;
		if(nx3_qs_StrTools.has(s,"#")) return nx3_EKey.Sharp1;
		return nx3_EKey.Natural;
	}
	,createPart: function(s,voices) {
		return new nx3_NPart(voices,this.partGlobals.type,this.partGlobals.clef,null,this.partGlobals.key);
	}
	,createVoice: function(s,notes) {
		return new nx3_NVoice(notes,null,this.voiceGlobals.dir);
	}
	,createNNoteLyrics: function(s) {
		var cont = null;
		if(nx3_qs_StrTools.has(s,"-")) {
			cont = nx3_ELyricContinuation.Hyphen;
			s = StringTools.replace(s,"-","");
		}
		var text = s;
		return new nx3_NNote(nx3_ENoteType.Lyric(s,null,cont),null,this.noteGlobals.value);
	}
	,createNNoteTpl: function(s) {
		var level = 0;
		if(nx3_qs_StrTools.has(s,"x")) level = 6;
		if(nx3_qs_StrTools.has(s,"c")) level = 5;
		if(nx3_qs_StrTools.has(s,"v")) level = 4;
		if(nx3_qs_StrTools.has(s,"b")) level = 3;
		if(nx3_qs_StrTools.has(s,"n")) level = 2;
		if(nx3_qs_StrTools.has(s,"m")) level = 1;
		if(nx3_qs_StrTools.has(s,"a")) level = 0;
		if(nx3_qs_StrTools.has(s,"s")) level = -1;
		if(nx3_qs_StrTools.has(s,"d")) level = -2;
		if(nx3_qs_StrTools.has(s,"f")) level = -3;
		if(nx3_qs_StrTools.has(s,"g")) level = -4;
		if(nx3_qs_StrTools.has(s,"h")) level = -5;
		if(nx3_qs_StrTools.has(s,"j")) level = -6;
		if(nx3_qs_StrTools.has(s,"q")) level = -7;
		if(nx3_qs_StrTools.has(s,"w")) level = -8;
		if(nx3_qs_StrTools.has(s,"e")) level = -9;
		if(nx3_qs_StrTools.has(s,"r")) level = -10;
		var sign = null;
		if(nx3_qs_StrTools.has(s,"+")) sign = nx3_ESign.Sharp;
		if(nx3_qs_StrTools.has(s,"+")) sign = nx3_ESign.Flat;
		return new nx3_NNote(nx3_ENoteType.Tpl(level,sign,false),null,this.noteGlobals.value);
	}
	,createNNoteNormal: function(s) {
		var hs = s.split(",");
		var heads = [];
		var _g = 0;
		while(_g < hs.length) {
			var h = hs[_g];
			++_g;
			var level = 0;
			if(nx3_qs_StrTools.has(h,"F")) level = -4;
			if(nx3_qs_StrTools.has(h,"E")) level = -3;
			if(nx3_qs_StrTools.has(h,"D")) level = -2;
			if(nx3_qs_StrTools.has(h,"C")) level = -1;
			if(nx3_qs_StrTools.has(h,"b")) level = 0;
			if(nx3_qs_StrTools.has(h,"a")) level = 1;
			if(nx3_qs_StrTools.has(h,"g")) level = 2;
			if(nx3_qs_StrTools.has(h,"f")) level = 3;
			if(nx3_qs_StrTools.has(h,"e")) level = 4;
			if(nx3_qs_StrTools.has(h,"d")) level = 5;
			if(nx3_qs_StrTools.has(h,"c")) level = 6;
			if(nx3_qs_StrTools.has(h,"B")) level = 7;
			if(nx3_qs_StrTools.has(h,"A")) level = 8;
			if(nx3_qs_StrTools.has(h,"G")) level = 9;
			if(nx3_qs_StrTools.has(h,"`")) level += 7;
			if(nx3_qs_StrTools.has(h,"´")) level -= 7;
			var _g1 = this.partGlobals.clef;
			switch(_g1[1]) {
			case 2:
				level = level - 6;
				break;
			case 1:
				level = level - 5;
				break;
			default:
				level = level;
			}
			var sign = nx3_ESign.None;
			if(nx3_qs_StrTools.has(h,"+")) sign = nx3_ESign.Sharp;
			if(nx3_qs_StrTools.has(h,"-")) sign = nx3_ESign.Flat;
			if(nx3_qs_StrTools.has(h,"n")) sign = nx3_ESign.Natural;
			if(nx3_qs_StrTools.has(h,"N")) sign = nx3_ESign.Natural;
			var tie = null;
			if(nx3_qs_StrTools.has(h,"_")) tie = nx3_ETie.Tie(nx3_EDirectionUAD.Auto,0);
			heads.push(new nx3_NHead(null,level,sign,tie));
		}
		if(nx3_qs_StrTools.has(s,"p")) {
			var pauselevel = 0;
			if(nx3_qs_StrTools.has(s,"u")) pauselevel = -1;
			if(nx3_qs_StrTools.has(s,"uu")) pauselevel = -2;
			if(nx3_qs_StrTools.has(s,"d")) pauselevel = 1;
			if(nx3_qs_StrTools.has(s,"dd")) pauselevel = 2;
			return new nx3_NNote(nx3_ENoteType.Pause(pauselevel),null,this.noteGlobals.value);
		}
		return new nx3_NNote(null,heads,this.noteGlobals.value);
	}
	,createNNote: function(s) {
		if(nx3_qs_StrTools.has(s,"16")) {
			this.noteGlobals.value = nx3_ENoteVal.Nv16;
			s = StringTools.replace(s,"16","");
		}
		if(nx3_qs_StrTools.has(s,"8.")) {
			this.noteGlobals.value = nx3_ENoteVal.Nv8dot;
			s = StringTools.replace(s,"8.","");
		}
		if(nx3_qs_StrTools.has(s,"8")) {
			this.noteGlobals.value = nx3_ENoteVal.Nv8;
			s = StringTools.replace(s,"8","");
		}
		if(nx3_qs_StrTools.has(s,"4.")) {
			this.noteGlobals.value = nx3_ENoteVal.Nv4dot;
			s = StringTools.replace(s,"4.","");
		}
		if(nx3_qs_StrTools.has(s,"4")) {
			this.noteGlobals.value = nx3_ENoteVal.Nv4;
			s = StringTools.replace(s,"4","");
		}
		if(nx3_qs_StrTools.has(s,"2.")) {
			this.noteGlobals.value = nx3_ENoteVal.Nv2dot;
			s = StringTools.replace(s,"2.","");
		}
		if(nx3_qs_StrTools.has(s,"2")) {
			this.noteGlobals.value = nx3_ENoteVal.Nv2;
			s = StringTools.replace(s,"2","");
		}
		if(nx3_qs_StrTools.has(s,"1.")) {
			this.noteGlobals.value = nx3_ENoteVal.Nv1dot;
			s = StringTools.replace(s,"1.","");
		}
		if(nx3_qs_StrTools.has(s,"1")) {
			this.noteGlobals.value = nx3_ENoteVal.Nv1;
			s = StringTools.replace(s,"1","");
		}
		var nnote = null;
		if(this.partGlobals.type != null) {
			var _g = this.partGlobals.type;
			switch(_g[1]) {
			case 3:
				var octave = _g[3];
				var modus = _g[2];
				nnote = this.createNNoteTpl(s);
				break;
			case 2:
				var octave1 = _g[3];
				var modus1 = _g[2];
				nnote = this.createNNoteTpl(s);
				break;
			case 1:
				nnote = this.createNNoteLyrics(s);
				break;
			default:
				nnote = null;
			}
		}
		if(nnote == null) nnote = this.createNNoteNormal(s);
		return nnote;
	}
	,getTokens: function(str) {
		var a = StringTools.trim(this.str).split(" ");
		var tokens = [];
		var _g = 0;
		while(_g < a.length) {
			var sub = a[_g];
			++_g;
			var token;
			var _g1 = sub.charAt(0);
			switch(_g1) {
			case "#":
				token = nx3_qs_Qs1.S(HxOverrides.substr(sub,1,null));
				break;
			case "|":
				token = nx3_qs_Qs1.B(HxOverrides.substr(sub,1,null));
				break;
			case "/":
				token = nx3_qs_Qs1.P(HxOverrides.substr(sub,1,null));
				break;
			case "%":
				token = nx3_qs_Qs1.V(HxOverrides.substr(sub,1,null));
				break;
			default:
				if(StringTools.startsWith(sub,",")) sub = HxOverrides.substr(sub,1,null);
				if(StringTools.endsWith(sub,",")) sub = sub.substring(0,sub.length - 1);
				if(sub == "") return null;
				token = nx3_qs_Qs1.N(sub);
			}
			if(token != null) tokens.push(token);
		}
		return tokens;
	}
	,checkParts: function(matrix) {
		var firstLenght;
		if(matrix[0] != null) firstLenght = matrix[0].parts.length; else firstLenght = 0;
		var _g = 0;
		while(_g < matrix.length) {
			var b = matrix[_g];
			++_g;
			var partLength = b.parts.length;
			if(partLength != firstLenght) {
				while(partLength < firstLenght) {
					b.parts.push({ part : "pp", voices : [{ voice : "vv", notes : []}]});
					partLength++;
					console.log("Inconsistent part numbers: " + firstLenght + " " + partLength + " " + this.str);
				}
				return false;
			}
		}
		return true;
	}
	,createMatrix: function(tokens) {
		var _g = this;
		var addMissingParts = function(matrix) {
			if(matrix.length == 0) {
				_g.matrixAddBar(matrix);
				_g.barIdx = 0;
			}
			while(matrix[_g.barIdx].parts.length < _g.partIdx + 1) matrix[_g.barIdx].parts.push({ part : "ppp", voices : [{ voice : "vvv", notes : []}]});
		};
		var addMissingVoices = function(matrix1) {
			while(matrix1[_g.barIdx].parts[_g.partIdx].voices.length < _g.voiceIdx + 1) matrix1[_g.barIdx].parts[_g.partIdx].voices.push({ voice : "vvvv", notes : []});
		};
		var matrix2 = [];
		var _g1 = 0;
		while(_g1 < tokens.length) {
			var t = tokens[_g1];
			++_g1;
			switch(t[1]) {
			case 0:
				var s = t[2];
				break;
			case 1:
				var s1 = t[2];
				this.barIdx++;
				this.matrixAddBar(matrix2);
				this.partIdx = -1;
				this.voiceIdx = -1;
				this.noteIdx = 0;
				matrix2[this.barIdx].bar = s1;
				break;
			case 2:
				var s2 = t[2];
				this.partIdx++;
				this.voiceIdx = -1;
				this.noteIdx = 0;
				addMissingParts(matrix2);
				matrix2[this.barIdx].parts[this.partIdx].part = s2;
				break;
			case 3:
				var s3 = t[2];
				this.voiceIdx++;
				this.noteIdx = 0;
				addMissingVoices(matrix2);
				matrix2[this.barIdx].parts[this.partIdx].voices[this.voiceIdx].voice = s3;
				break;
			case 4:
				var s4 = t[2];
				if(this.barIdx == -1) {
					this.barIdx = 0;
					this.matrixAddBar(matrix2);
				}
				if(this.partIdx == -1) this.partIdx = 0;
				addMissingParts(matrix2);
				if(this.voiceIdx == -1) this.voiceIdx = 0;
				addMissingVoices(matrix2);
				matrix2[this.barIdx].parts[this.partIdx].voices[this.voiceIdx].notes.push(s4);
				this.noteIdx++;
				break;
			}
		}
		try {
			while(nx3_qs_ArrTools.last(nx3_qs_ArrTools.last(nx3_qs_ArrTools.last(matrix2).parts).voices).notes.length == 0) {
				console.log("pop");
				matrix2.pop();
			}
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			console.log(e);
		}
		return matrix2;
	}
	,matrixAddBar: function(matrix,bar) {
		if(bar == null) bar = "-";
		var qsbar = { bar : bar, parts : [{ part : "pp", voices : [{ voice : "vv", notes : []}]}]};
		matrix.push(qsbar);
	}
	,resetBar: function() {
		this.barGlobals = { time : nx3_ETime.Time4_4};
	}
	,resetPart: function() {
		this.partGlobals = { clef : nx3_EClef.ClefG, key : nx3_EKey.Natural, type : nx3_EPartType.Normal};
	}
	,resetVoice: function() {
		this.voiceGlobals = { dir : nx3_EDirectionUAD.Auto};
	}
	,traceCurrent: function(str) {
		if(str == null) str = "";
		console.log("" + this.barIdx + ":" + this.partIdx + ":" + this.voiceIdx + ":" + this.noteIdx + " : " + str);
	}
	,__class__: nx3_qs_QSParser
};
var nx3_qs_StrTools = function() { };
nx3_qs_StrTools.__name__ = true;
nx3_qs_StrTools.has = function(s,needle) {
	return s.indexOf(needle) > -1;
};
var nx3_qs_ArrTools = function() { };
nx3_qs_ArrTools.__name__ = true;
nx3_qs_ArrTools.last = function(arr) {
	return arr[arr.length - 1];
};
var nx3_qs_QSParserTools = function() { };
nx3_qs_QSParserTools.__name__ = true;
nx3_qs_QSParserTools.urlEncode = function(qcode) {
	return StringTools.replace(qcode,"/",nx3_qs_QSParserTools.relaceSlash);
};
nx3_qs_QSParserTools.urlDecode = function(qcode) {
	return StringTools.replace(qcode,nx3_qs_QSParserTools.relaceSlash,"/");
};
nx3_qs_QSParserTools.filterLyrics = function(qcode) {
	var pos = qcode.indexOf("/lyr");
	if(qcode.indexOf("/lyr") > -1) qcode = HxOverrides.substr(qcode,pos + 4,null);
	return qcode;
};
var nx3_render_ITarget = function() { };
nx3_render_ITarget.__name__ = true;
nx3_render_ITarget.prototype = {
	__class__: nx3_render_ITarget
};
var nx3_render_Renderer = function(target,targetX,targetY,interactions) {
	if(targetY == null) targetY = 0;
	if(targetX == null) targetX = 0;
	this.target = target;
	this.targetX = targetX;
	this.targetY = targetY;
	this.scaling = this.target.getScaling();
	if(interactions != null) this.interactions = interactions; else this.interactions = [];
};
nx3_render_Renderer.__name__ = true;
nx3_render_Renderer.prototype = {
	xToUnitX: function(x) {
		return x * (1 / this.scaling.unitX);
	}
	,yToUnitY: function(y) {
		return y * (1 / this.scaling.unitY);
	}
	,renderSystem: function(system,newX,newY) {
		if(newY == null) newY = -1;
		if(newX == null) newX = -1;
		if(newX != -1) this.targetX = newX;
		if(newY != -1) this.targetY = newY;
		this.drawSystem(system);
	}
	,renderScore: function(score,newX,newY,systemwidth) {
		if(systemwidth == null) systemwidth = 400;
		if(newY == null) newY = -1;
		if(newX == null) newX = -1;
		if(newX != -1) this.targetX = newX;
		if(newY != -1) this.targetY = newY;
		this.drawSystems(score.getSystems(systemwidth));
		this.target.totalWidth = score.getWidth() * this.scaling.unitX;
		this.target.totalHeight = score.getHeight() * this.scaling.unitY;
		return { width : score.getWidth() * this.scaling.unitX, height : score.getHeight() * this.scaling.unitY};
	}
	,testText: function() {
		this.target.setFont(nx3_Constants.FONT_TEXT_DEFAULTFORMAT);
		var str = "ABC abc 123";
		this.target.text(0,0,str);
		var w = this.target.textwidth(str);
		var h = this.target.textheight(str);
		this.target.rectangle(0,0,new nx3_geom_Rectangle(0,0,w,h),1,16711680);
	}
	,addInteraction: function(interaction) {
		this.interactions.push(interaction);
	}
	,drawSystems: function(systems) {
		var _g = 0;
		while(_g < systems.length) {
			var system = systems[_g];
			++_g;
			this.drawSystem(system);
		}
	}
	,drawSystemExtras: function(systems,system,nx,ny) {
		if(ny == null) ny = 0;
		if(nx == null) nx = 0;
		var tx = this.targetX + nx * this.scaling.unitX;
		var ty = this.targetY + ny * this.scaling.unitY;
		var _g = 0;
		var _g1 = system.getSystembars();
		while(_g < _g1.length) {
			var systembar = _g1[_g];
			++_g;
			if(systembar == cx_ArrayTools.first(system.getSystembars())) {
				if(system != systems[0]) {
					var prevSystem = cx_ArrayTools.prev(systems,system);
					var prevSystembar = cx_ArrayTools.last(prevSystem.getSystembars());
					var tieconnections = prevSystembar.bar.getTieConnections();
					var _g2 = 0;
					while(_g2 < tieconnections.length) {
						var connection = tieconnections[_g2];
						++_g2;
						var fromBarX = systembar.getXPosition();
						var fromNoteX = systembar.getBarMeasurements().getLeftContentMarginXPosition() + connection.from.getXPosition();
						var part = connection.to.getComplex().getPart();
						var partidx;
						var _this = part.getBar().getParts();
						partidx = HxOverrides.indexOf(_this,part,0);
						var party = partidx * 20 * this.scaling.unitY;
						var tielevel = 0;
						{
							var _g3 = connection.tie;
							switch(_g3[1]) {
							case 0:
								var tlevel = _g3[3];
								var tdir = _g3[2];
								tielevel = tlevel;
								break;
							default:
							}
						}
						var xshift = -5;
						var tiewidth = 3;
						var tierect = new nx3_geom_Rectangle(fromBarX + fromNoteX + xshift,connection.level + tielevel,tiewidth,1);
						this.drawTie(system,tx,ty + party,tierect,nx3_EDirectionUD.Down);
					}
				}
			}
			if(systembar == cx_ArrayTools.last(system.getSystembars())) {
				var tieconnections1 = systembar.bar.getTieConnections();
				var _g21 = 0;
				while(_g21 < tieconnections1.length) {
					var connection1 = tieconnections1[_g21];
					++_g21;
					var fromBarX1 = systembar.getXPosition();
					var fromNoteX1 = systembar.getBarMeasurements().getLeftContentMarginXPosition() + connection1.from.getXPosition();
					var toBarX = systembar.getXPosition() + systembar.getBarMeasurements().getTotalWidth();
					var part1 = connection1.to.getComplex().getPart();
					var partidx1;
					var _this1 = part1.getBar().getParts();
					partidx1 = HxOverrides.indexOf(_this1,part1,0);
					var party1 = partidx1 * 20 * this.scaling.unitY;
					var tielevel1 = 0;
					{
						var _g31 = connection1.tie;
						switch(_g31[1]) {
						case 0:
							var tlevel1 = _g31[3];
							var tdir1 = _g31[2];
							tielevel1 = tlevel1;
							break;
						default:
						}
					}
					var xshift1 = 2;
					var tierect1 = new nx3_geom_Rectangle(fromBarX1 + fromNoteX1 + xshift1,connection1.level + tielevel1,toBarX - (fromBarX1 + fromNoteX1),2);
					this.drawTie(system,tx,ty + party1,tierect1,nx3_EDirectionUD.Down);
				}
			} else {
				var tieconnections2 = systembar.bar.getTieConnections();
				var _g22 = 0;
				while(_g22 < tieconnections2.length) {
					var connection2 = tieconnections2[_g22];
					++_g22;
					var fromBarX2 = systembar.getXPosition();
					var nextsystembar = connection2.to.getComplex().getPart().getBar().getSystembar();
					var toBarX1 = nextsystembar.getXPosition();
					var fromNoteX2 = systembar.getBarMeasurements().getLeftContentMarginXPosition() + connection2.from.getXPosition();
					var toNoteX = nextsystembar.getBarMeasurements().getLeftContentMarginXPosition() + connection2.to.getXPosition();
					var part2 = connection2.to.getComplex().getPart();
					var partidx2;
					var _this2 = part2.getBar().getParts();
					partidx2 = HxOverrides.indexOf(_this2,part2,0);
					var party2 = partidx2 * 20 * this.scaling.unitY;
					var xshift2 = 2;
					var tielevel2 = 0;
					{
						var _g32 = connection2.tie;
						switch(_g32[1]) {
						case 0:
							var tlevel2 = _g32[3];
							var tdir2 = _g32[2];
							tielevel2 = tlevel2;
							break;
						default:
						}
					}
					var tierect2 = new nx3_geom_Rectangle(fromBarX2 + fromNoteX2 + xshift2,connection2.level + tielevel2,toBarX1 + toNoteX - (fromBarX2 + fromNoteX2) - xshift2 - xshift2,2);
					this.drawTie(system,tx,ty + party2,tierect2,nx3_EDirectionUD.Down);
				}
			}
		}
	}
	,drawSystem: function(system) {
		this.drawBarlines(system,system.getSystembars());
		var _g = 0;
		var _g1 = system.getSystembars();
		while(_g < _g1.length) {
			var systembar = _g1[_g];
			++_g;
			this.drawBarAttributes(system,systembar);
			this.drawBarContent(system,systembar);
		}
	}
	,drawBarlines: function(system,systembars) {
		var tx = this.targetX;
		var ty = this.targetY + system.getY() * this.scaling.unitY;
		var part = cx_ArrayTools.first(systembars[0].bar.getParts());
		var partidx;
		var _this = part.getBar().getParts();
		partidx = HxOverrides.indexOf(_this,part,0);
		var party = system.getPartY(0) * this.scaling.unitY;
		var partFirstY = party - 4 * this.scaling.unitY;
		var partY = 0.0;
		var _g = 0;
		while(_g < systembars.length) {
			var systembar = systembars[_g];
			++_g;
			var barX = systembar.getX();
			var barWidth = systembar.getBarMeasurements().getTotalWidth();
			var _g1 = 0;
			var _g2 = systembar.bar.getParts();
			while(_g1 < _g2.length) {
				var part1 = _g2[_g1];
				++_g1;
				var partidx1;
				var _this1 = part1.getBar().getParts();
				partidx1 = HxOverrides.indexOf(_this1,part1,0);
				var part_getYPosition = system.getPartY(partidx1);
				var _g3 = part1.npart.type;
				switch(_g3[1]) {
				case 0:
					var barlineTop = (part_getYPosition - 4) * this.scaling.unitY;
					var barlineBottom = (part_getYPosition + 4) * this.scaling.unitY;
					var barlineX = tx + (barX + barWidth) * this.scaling.unitX;
					this.target.line(barlineX,ty + barlineTop,barlineX,ty + barlineBottom,1.4,0);
					partY = part_getYPosition;
					break;
				default:
				}
			}
		}
		var partLastY = (partY + 4) * this.scaling.unitY;
		this.target.line(tx,ty + partFirstY,tx,ty + partLastY,2,0);
	}
	,drawBarAttributes: function(system,systembar) {
		var tx = this.targetX;
		var _g = 0;
		var _g1 = systembar.bar.getParts();
		while(_g < _g1.length) {
			var part = _g1[_g];
			++_g;
			if(part.npart.type[0] != "Normal") continue;
			var partIdx;
			var _this = systembar.bar.getParts();
			partIdx = HxOverrides.indexOf(_this,part,0);
			var partX = this.targetX + systembar.getX() * this.scaling.unitX;
			var partY = this.targetY + (system.getY() + system.getPartY(partIdx)) * this.scaling.unitY;
			this.target.testLines(partX,partY,systembar.getBarMeasurements().getTotalWidth() * this.scaling.unitX);
			this.drawBarAttributeClef(system,systembar,part);
			this.drawBarAttributeKey(system,systembar,part);
			this.drawBarAttributeTime(system,systembar,part);
		}
	}
	,drawBarAttributeTime: function(system,systembar,part) {
		var showTime = systembar.barConfig.showTime;
		if(!showTime) return;
		var acttime = systembar.actAttributes.time;
		var tx = this.targetX + systembar.getX() * this.scaling.unitX;
		var ty = this.targetY;
		var timeX = systembar.getBarMeasurements().getTimeXPosition() * this.scaling.unitX;
		var partidx;
		var _this = part.getBar().getParts();
		partidx = HxOverrides.indexOf(_this,part,0);
		var part_getYPosition = system.getY() + system.getPartY(partidx);
		var timeChars = nx3_ETimeUtils.toString(acttime).split("/");
		if(timeChars.length == 2) {
			var upperXmlStr = this.getSvgNumber(timeChars[0]);
			var timeY = -3 * this.scaling.unitY;
			this.target.shape(timeChars[0],tx + timeX,ty + timeY + part_getYPosition * this.scaling.unitY,upperXmlStr);
			var lowerXmlStr = this.getSvgNumber(timeChars[1]);
			var timeY1 = this.scaling.unitY;
			this.target.shape(timeChars[1],tx + timeX,ty + timeY1 + part_getYPosition * this.scaling.unitY,lowerXmlStr);
		} else {
			var midXmlStr = this.getSvgNumber(timeChars[0]);
			var timeY2 = -1 * this.scaling.unitY;
			this.target.shape(timeChars[0],tx + timeX,ty + timeY2 + part_getYPosition * this.scaling.unitY,midXmlStr);
		}
	}
	,drawBarAttributeKey: function(system,systembar,part) {
		var showkey = systembar.barConfig.showKey;
		if(!showkey) return;
		var partidx;
		var _this = systembar.bar.getParts();
		partidx = HxOverrides.indexOf(_this,part,0);
		var part_getYPosition = system.getPartY(partidx);
		var actkey = systembar.actAttributes.keys[partidx];
		var tx = this.targetX + systembar.getX() * this.scaling.unitX;
		var ty = this.targetY + system.getY() * this.scaling.unitY;
		var keyX = systembar.getBarMeasurements().getKeyXPosition() * this.scaling.unitX;
		var keyY = this.scaling.unitY;
		var keyCode = nx3_EKeysTools.getSigncode(actkey);
		var svgXmlstr;
		if(keyCode == -1) svgXmlstr = nx3_render_svg_SvgElements.signFlat; else svgXmlstr = nx3_render_svg_SvgElements.signSharp;
		var keyLevels = nx3_EKeysTools.getLevels(actkey,systembar.actAttributes.clefs[partidx]);
		var _g = 0;
		while(_g < keyLevels.length) {
			var level = keyLevels[_g];
			++_g;
			var keyY1 = level * this.scaling.unitY;
			this.target.shape(keyCode == -1?"Flat":"Sharp",tx + keyX,ty + keyY1 + part_getYPosition * this.scaling.unitY,svgXmlstr);
			keyX += 2.4 * this.target.getScaling().unitX;
		}
	}
	,drawBarAttributeClef: function(system,systembar,part) {
		var showclef = systembar.barConfig.showClef;
		if(!showclef) return;
		var partidx;
		var _this = systembar.bar.getParts();
		partidx = HxOverrides.indexOf(_this,part,0);
		var part_getYPosition = system.getPartY(partidx);
		var actclef = systembar.actAttributes.clefs[partidx];
		var tx = this.targetX + systembar.getX() * this.scaling.unitX;
		var ty = this.targetY + system.getY() * this.scaling.unitY;
		var clefX = systembar.getBarMeasurements().getClefXPosition() * this.scaling.unitX;
		var clefY = this.scaling.unitY;
		var svgXmlstr;
		switch(actclef[1]) {
		case 2:
			svgXmlstr = nx3_render_svg_SvgElements.clefC;
			break;
		case 0:
			svgXmlstr = nx3_render_svg_SvgElements.clefG;
			break;
		case 1:
			svgXmlstr = nx3_render_svg_SvgElements.clefF;
			break;
		}
		this.target.shape(actclef[0],tx + clefX,ty + clefY + part_getYPosition * this.scaling.unitY,svgXmlstr);
	}
	,drawBarContent: function(system,systembar) {
		var bar = systembar.bar;
		var barx = systembar.getX() + systembar.getBarMeasurements().getContentXPosition();
		var nx = systembar.getBarMeasurements().getContentXPosition();
		var tx = this.targetX + barx * this.scaling.unitX;
		var ty = this.targetY;
		var contentwidth = bar.getContentwidth();
		var _g = 0;
		var _g1 = bar.getParts();
		while(_g < _g1.length) {
			var part = _g1[_g];
			++_g;
			var _g2 = 0;
			var _g3 = part.getVoices();
			while(_g2 < _g3.length) {
				var voice = _g3[_g2];
				++_g2;
				var _g4 = 0;
				var _g5 = voice.getBeamgroups();
				while(_g4 < _g5.length) {
					var beamgroup = _g5[_g4];
					++_g4;
					this.drawBeamgroup(system,systembar,beamgroup);
				}
			}
		}
		var _g6 = 0;
		var _g11 = bar.getColumns();
		while(_g6 < _g11.length) {
			var column = _g11[_g6];
			++_g6;
			var _g21 = 0;
			var _g31 = column.getComplexes();
			while(_g21 < _g31.length) {
				var complex = _g31[_g21];
				++_g21;
				this.drawComplex(system,systembar,complex);
			}
		}
	}
	,drawNoteHeads: function(system,systembar,note) {
		var _g3 = this;
		var part = note.getComplex().getPart();
		var partidx;
		var _this = part.getBar().getParts();
		partidx = HxOverrides.indexOf(_this,part,0);
		var part_getYPosition = system.getPartY(partidx);
		var barx = systembar.getX() + systembar.getBarMeasurements().getContentXPosition();
		var x = this.targetX + (barx + note.getComplex().getXPosition()) * this.target.getScaling().unitX;
		var y = this.targetY + (system.getY() + part_getYPosition) * this.target.getScaling().unitY;
		{
			var _g = note.nnote.type;
			switch(_g[1]) {
			case 4:
				var font = _g[5];
				var c = _g[4];
				var o = _g[3];
				var text = _g[2];
				var rect = cx_ArrayTools.first(note.getHeadsRects());
				this.target.rectangle(x,y,rect,1,255);
				this.target.text(x + rect.x * this.scaling.unitX,y + rect.y * this.scaling.unitY,text);
				break;
			case 7:
				var midinote = _g[3];
				var level = _g[2];
				var rect1 = cx_ArrayTools.first(note.getHeadsRects());
				var nextnote = note.getNext();
				var width;
				if(nextnote != null) {
					var nextX = nextnote.getXPosition();
					width = nextX - note.getXPosition();
				} else width = systembar.getBarMeasurements().getContentWidth() - note.getXPosition();
				this.target.rectangle(x,y,new nx3_geom_Rectangle(rect1.x,rect1.y,width,rect1.height),3,255);
				break;
			case 3:
				var pause = _g[4];
				var sign = _g[3];
				var level1 = _g[2];
				var rect2 = cx_ArrayTools.first(note.getHeadsRects()).clone();
				rect2.inflate(-0.8,-0.8);
				var color;
				if(pause) color = 11184810; else color = 0;
				this.target.filledellipse(x,y,rect2,this.scaling.linesWidth * 5,color,16777215);
				var levelmod = (-level1 + 21) % 7;
				var numSvgStr;
				switch(levelmod) {
				case 0:
					numSvgStr = nx3_render_svg_SvgElements.tpl1;
					break;
				case 1:
					numSvgStr = nx3_render_svg_SvgElements.tpl2;
					break;
				case 2:
					numSvgStr = nx3_render_svg_SvgElements.tpl3;
					break;
				case 3:
					numSvgStr = nx3_render_svg_SvgElements.tpl4;
					break;
				case 4:
					numSvgStr = nx3_render_svg_SvgElements.tpl5;
					break;
				case 5:
					numSvgStr = nx3_render_svg_SvgElements.tpl6;
					break;
				case 6:
					numSvgStr = nx3_render_svg_SvgElements.tpl7;
					break;
				default:
					numSvgStr = nx3_render_svg_SvgElements.tpl1;
				}
				if(pause) {
					numSvgStr = StringTools.replace(numSvgStr,"fill:#000000","fill:#AAAAAA");
					console.log(numSvgStr);
				}
				var tx;
				if(this.scaling == nx3_render_scaling_Scaling.NORMAL) tx = x - this.scaling.unitX * 5; else tx = x - this.scaling.unitX * 5.5;
				var ty;
				if((function($this) {
					var $r;
					var e = note.getVoice().getPart().npart.type;
					$r = e[0];
					return $r;
				}(this)) == "Tplchain") ty = y + level1 * 3 * this.scaling.unitY; else ty = y;
				ty += this.scaling.unitY * .4;
				this.target.shape(null,tx,ty,numSvgStr,color);
				var signSvgStr;
				if(sign != null) switch(sign[1]) {
				case 2:
					signSvgStr = nx3_render_svg_SvgElements.tplArrowDown;
					break;
				case 3:
					signSvgStr = nx3_render_svg_SvgElements.tplArrowUp;
					break;
				default:
					signSvgStr = nx3_render_svg_SvgElements.tplArrowUp;
				} else signSvgStr = "";
				if(signSvgStr != "") this.target.shape(null,tx,ty,signSvgStr,color);
				break;
			default:
				var svginfo = nx3_render_RendererTools.getHeadSvgInfo(note.nnote);
				var hx1 = x;
				var hx2 = x;
				var _g1 = 0;
				var _g2 = note.getHeadsRects();
				while(_g1 < _g2.length) {
					var rect3 = [_g2[_g1]];
					++_g1;
					this.target.shape(null,x + rect3[0].x * this.scaling.unitX,y + (rect3[0].y + svginfo.y) * this.scaling.unitY,svginfo.xmlStr);
					this.target.interactiveEllipse(x,y,rect3[0],5 * this.scaling.linesWidth,3585587,null,(function(rect3) {
						return function(activityType) {
							var _g4 = 0;
							var _g5 = _g3.interactions;
							while(_g4 < _g5.length) {
								var interaction = _g5[_g4];
								++_g4;
								interaction.handleAction(nx3_action_EActionType.NoteAction(activityType,note,nx3_action_EActionInfo.TargetXY(_g3.target,x + rect3[0].x * _g3.scaling.unitX,y + rect3[0].y * _g3.scaling.unitY)));
							}
						};
					})(rect3));
				}
				var i = 0;
				var _g11 = 0;
				var _g21 = note.getHeadsRects();
				while(_g11 < _g21.length) {
					var rect4 = _g21[_g11];
					++_g11;
					var level2 = note.getHeads()[i].nhead.level;
					if(level2 > 5 || level2 < -5) {
						hx1 = Math.min(hx1,x + (rect4.x - 0.6) * this.scaling.unitX);
						hx2 = Math.max(hx2,x + (rect4.x + rect4.width + 0.6) * this.scaling.unitX);
					}
					i++;
				}
				var _g12 = 0;
				var _g22 = note.getHeads();
				while(_g12 < _g22.length) {
					var head = _g22[_g12];
					++_g12;
					var level3 = head.nhead.level;
					if(level3 < 5 && level3 > -5) continue;
					var lev1;
					if(level3 < 0) lev1 = level3; else lev1 = 5;
					var lev2;
					if(level3 < 0) lev2 = -4; else lev2 = level3 + 1;
					var _g31 = lev1;
					while(_g31 < lev2) {
						var l = _g31++;
						if((l + 100) % 2 == 1) continue;
						var hy = y + l * this.scaling.unitY;
						this.target.line(hx1,hy,hx2,hy,1,0);
					}
				}
			}
		}
	}
	,drawComplex: function(system,systembar,complex) {
		if(complex == null) return;
		var _g = 0;
		var _g1 = complex.getNotes();
		while(_g < _g1.length) {
			var note = _g1[_g];
			++_g;
			this.drawNoteHeads(system,systembar,note);
		}
		this.drawComplexSigns(system,systembar,complex);
		this.drawComplexDots(system,systembar,complex);
		this.drawComplexTies(system,systembar,complex);
	}
	,drawComplexTies: function(system,systembar,complex,nx,ny) {
		if(ny == null) ny = 0;
		if(nx == null) nx = 0;
		var part = complex.getPart();
		var partidx;
		var _this = part.getBar().getParts();
		partidx = HxOverrides.indexOf(_this,part,0);
		var part_getYPosition = system.getPartY(partidx);
		var barx = systembar.getX() + systembar.getBarMeasurements().getContentXPosition();
		var x = this.targetX + (barx + complex.getXPosition()) * this.target.getScaling().unitX;
		var y = this.targetY + (system.getY() + part_getYPosition) * this.target.getScaling().unitY;
		var _g = 0;
		var _g1 = complex.getTieinfos();
		while(_g < _g1.length) {
			var info = _g1[_g];
			++_g;
			var rect = info.rect;
			var direction = info.direction;
			if(info.target != null) {
				var targetcomplex = info.target.getNote().getComplex();
				var thisx = complex.getXPosition() + rect.x;
				var targetAllRect = nx3_geom_RectanglesTools.unionAll(targetcomplex.getAllRects());
				var targetx = targetcomplex.getXPosition() + targetAllRect.x;
				var xshift = .5 * this.scaling.unitX;
				rect.width = targetx - thisx - 0.5;
				this.drawTie(system,x + xshift,y,rect,direction);
			} else rect.width = 6;
		}
	}
	,drawComplexDots: function(system,systembar,complex,nx,ny) {
		if(ny == null) ny = 0;
		if(nx == null) nx = 0;
		var _g = 0;
		var _g1 = complex.getDotRects();
		while(_g < _g1.length) {
			var r = _g1[_g];
			++_g;
			var part = complex.getPart();
			var partidx;
			var _this = part.getBar().getParts();
			partidx = HxOverrides.indexOf(_this,part,0);
			var part_getYPosition = system.getPartY(partidx);
			var barx = systembar.getX() + systembar.getBarMeasurements().getContentXPosition();
			var x = this.targetX + (barx + complex.getXPosition()) * this.target.getScaling().unitX;
			var y = this.targetY + (system.getY() + part_getYPosition) * this.target.getScaling().unitY;
			var crect = r.clone();
			var ddot = crect.width == 3.0;
			crect.offset(0.9,0.2);
			crect.width = 0.7;
			crect.height = 0.6;
			this.target.filledellipse(x,y,crect,0,0,0);
			if(!ddot) continue;
			crect.offset(1.3,0);
			this.target.filledellipse(x,y,crect,0,0,0);
		}
	}
	,drawComplexSigns: function(system,systembar,complex,nx,ny) {
		if(ny == null) ny = 0;
		if(nx == null) nx = 0;
		var part = complex.getPart();
		var partidx;
		var _this = part.getBar().getParts();
		partidx = HxOverrides.indexOf(_this,part,0);
		var part_getYPosition = system.getPartY(partidx);
		var barx = systembar.getX() + systembar.getBarMeasurements().getContentXPosition();
		var x = this.targetX + (barx + complex.getXPosition()) * this.target.getScaling().unitX;
		var y = this.targetY + (system.getY() + part_getYPosition) * this.target.getScaling().unitY;
		var signs = complex.getVisibleSigns();
		var rects = complex.getSignsRects();
		var _g1 = 0;
		var _g = signs.length;
		while(_g1 < _g) {
			var i = _g1++;
			var sign = signs[i];
			var rect = rects[i];
			var xmlStr;
			var _g2 = sign.sign;
			switch(_g2[1]) {
			case 2:
				xmlStr = nx3_render_svg_SvgElements.signFlat;
				break;
			case 1:
				xmlStr = nx3_render_svg_SvgElements.signNatural;
				break;
			case 3:
				xmlStr = nx3_render_svg_SvgElements.signSharp;
				break;
			default:
				xmlStr = null;
			}
			if(xmlStr != null) this.target.shape(null,x + rect.x * this.scaling.unitX,y + (rect.y + 2) * this.scaling.unitY,xmlStr);
		}
	}
	,drawBeamgroup: function(system,systembar,beamgroup) {
		var frame = beamgroup.getFrame();
		if(frame == null) return;
		var barx = systembar.getX() + systembar.getBarMeasurements().getContentXPosition();
		var tx = this.targetX + barx * this.scaling.unitX;
		var ty = this.targetY + system.getY() * this.scaling.unitY;
		var part = beamgroup.getPVoice().getPart();
		var partidx;
		var _this = part.getBar().getParts();
		partidx = HxOverrides.indexOf(_this,part,0);
		var part_getYPosition = system.getPartY(partidx);
		var rightY = ty + part_getYPosition * this.target.getScaling().unitY;
		var direction = beamgroup.getDirection();
		var firstnote = beamgroup.pnotes[0];
		var leftX = cx_ArrayTools.first(beamgroup.getNotesStemXPositions()) * this.scaling.unitX;
		var leftOuterY = frame.leftOuterY * this.scaling.unitY;
		var leftInnerY = frame.leftInnerY * this.scaling.unitY;
		var leftTipY = frame.leftTipY * this.scaling.unitY;
		this.target.line(tx + leftX,rightY + leftInnerY,tx + leftX,rightY + leftTipY,1,0);
		if(beamgroup.pnotes.length == 1) {
			if(nx3_ENoteValTools.beaminglevel(firstnote.nnote.value) > 0) {
				if(beamgroup.getDirection() == nx3_EDirectionUD.Up) {
					var adjustX = 0.6 * this.scaling.unitX;
					var adjustY = this.scaling.unitY;
					var flag;
					if(nx3_ENoteValTools.beaminglevel(firstnote.nnote.value) == 2) flag = nx3_render_svg_SvgElements.flagUp16; else flag = nx3_render_svg_SvgElements.flagUp8;
					var flagTag;
					if(nx3_ENoteValTools.beaminglevel(firstnote.nnote.value) == 2) flagTag = "Flag16Up"; else flagTag = "Flag8Up";
					this.target.shape(flagTag,tx + leftX - adjustX,rightY + adjustY + leftTipY,flag,0);
				} else {
					var adjustX1 = 0.6 * this.scaling.unitX;
					var adjustY1 = -3 * this.scaling.unitY;
					var flag1;
					if(nx3_ENoteValTools.beaminglevel(firstnote.nnote.value) == 2) flag1 = nx3_render_svg_SvgElements.flagDown16; else flag1 = nx3_render_svg_SvgElements.flagDown8;
					var flagTag1;
					if(nx3_ENoteValTools.beaminglevel(firstnote.nnote.value) == 2) flagTag1 = "Flag16Down"; else flagTag1 = "Flag8Down";
					this.target.shape(flagTag1,tx + leftX - adjustX1,rightY + adjustY1 + leftTipY,flag1,0);
				}
			}
		}
		if(beamgroup.pnotes.length < 2) return;
		var storeY = [rightY + leftTipY];
		var storeX = [tx + leftX];
		var lastnote = cx_ArrayTools.last(beamgroup.pnotes);
		var rightX = cx_ArrayTools.last(beamgroup.getNotesStemXPositions()) * this.scaling.unitX;
		var rightOuterY = frame.rightOuterY * this.scaling.unitY;
		var rightInnerY = frame.rightInnerY * this.scaling.unitY;
		var rightTipY = frame.rightTipY * this.scaling.unitY;
		this.target.line(tx + rightX,rightY + rightInnerY,tx + rightX,rightY + rightTipY,1,0);
		var beamh = 0.95 * this.scaling.unitY;
		if(beamgroup.getDirection() == nx3_EDirectionUD.Up) beamh = -beamh; else beamh = beamh;
		this.target.parallellogram(tx + leftX,rightY + leftTipY - beamh,tx + rightX,rightY + rightTipY - beamh,beamh,0,0,0);
		if(beamgroup.pnotes.length > 2) {
			var _g1 = 1;
			var _g = frame.outerLevels.length - 1;
			while(_g1 < _g) {
				var i = _g1++;
				var midX = beamgroup.getNotesStemXPositions()[i] * this.scaling.unitX;
				var midInnerY = frame.innerLevels[i] * this.scaling.unitY;
				var delta = (midX - leftX) / (rightX - leftX);
				var midTipY = leftTipY + (rightTipY - leftTipY) * delta;
				this.target.line(tx + midX,rightY + midInnerY,tx + midX,rightY + midTipY,1,0);
				storeY.push(rightY + midTipY);
				storeX.push(tx + midX);
			}
		}
		storeY.push(rightY + rightTipY);
		storeX.push(tx + rightX);
		var idx = 0;
		var beamh1 = 0.95 * this.scaling.unitY;
		var _g2 = 0;
		var _g11 = beamgroup.getFrame().beamflags;
		while(_g2 < _g11.length) {
			var flagtype = _g11[_g2];
			++_g2;
			var adjustY2;
			if(beamgroup.getDirection() == nx3_EDirectionUD.Up) adjustY2 = 2.1; else adjustY2 = -2.1;
			adjustY2 *= this.scaling.unitY;
			var currX = storeX[idx];
			var currY = storeY[idx] + adjustY2;
			var nextX = storeX[idx + 1];
			var nextY = storeY[idx + 1] + adjustY2;
			var factor = 2.2 * this.scaling.unitX;
			switch(flagtype[1]) {
			case 3:
				this.target.parallellogram(currX,currY - beamh1 / 2,nextX,nextY - beamh1 / 2,beamh1,0,0,0);
				break;
			case 1:
				var endX = currX + factor;
				var endY = factor / (nextX - currX) * (nextY - currY) + currY;
				this.target.parallellogram(currX,currY - beamh1 / 2,endX,endY - beamh1 / 2,beamh1,0,0,0);
				break;
			case 2:
				var startX = nextX - factor;
				var startY = -((nextX - startX) / (nextX - currX)) * (nextY - currY) + nextY;
				this.target.parallellogram(startX,startY - beamh1 / 2,nextX,nextY - beamh1 / 2,beamh1,0,0,0);
				break;
			default:
			}
			idx++;
		}
	}
	,drawBeamgroupX: function(system,beamgroup,nx,ny) {
		if(ny == null) ny = 0;
		if(nx == null) nx = 0;
		var frame = beamgroup.getFrame();
		if(frame == null) return;
		var tx = this.targetX + nx * this.scaling.unitX;
		var ty = this.targetY + ny * this.scaling.unitY;
		var part = beamgroup.getPVoice().getPart();
		var partidx;
		var _this = part.getBar().getParts();
		partidx = HxOverrides.indexOf(_this,part,0);
		var part_getYPosition = partidx * 20;
		var rightY = this.targetY + part_getYPosition * this.target.getScaling().unitY;
		var direction = beamgroup.getDirection();
		var firstnote = beamgroup.pnotes[0];
		var leftX = cx_ArrayTools.first(beamgroup.getNotesStemXPositions()) * this.scaling.unitX;
		var leftOuterY = frame.leftOuterY * this.scaling.unitY;
		var leftInnerY = frame.leftInnerY * this.scaling.unitY;
		var leftTipY = frame.leftTipY * this.scaling.unitY;
		this.target.line(this.targetX + leftX,rightY + leftInnerY,this.targetX + leftX,rightY + leftTipY,1,0);
		if(beamgroup.pnotes.length == 1) {
			if(nx3_ENoteValTools.beaminglevel(firstnote.nnote.value) > 0) {
				if(beamgroup.getDirection() == nx3_EDirectionUD.Up) {
					var adjustX = 0.6 * this.scaling.unitX;
					var adjustY = this.scaling.unitY;
					var flag;
					if(nx3_ENoteValTools.beaminglevel(firstnote.nnote.value) == 2) flag = nx3_render_svg_SvgElements.flagUp16; else flag = nx3_render_svg_SvgElements.flagUp8;
					this.target.shape(null,this.targetX + leftX - adjustX,rightY + adjustY + leftTipY,flag,0);
				} else {
					var adjustX1 = 0.6 * this.scaling.unitX;
					var adjustY1 = -3 * this.scaling.unitY;
					var flag1;
					if(nx3_ENoteValTools.beaminglevel(firstnote.nnote.value) == 2) flag1 = nx3_render_svg_SvgElements.flagDown16; else flag1 = nx3_render_svg_SvgElements.flagDown8;
					this.target.shape(null,this.targetX + leftX - adjustX1,rightY + adjustY1 + leftTipY,flag1,0);
				}
			}
		}
		if(beamgroup.pnotes.length < 2) return;
		var storeY = [rightY + leftTipY];
		var storeX = [this.targetX + leftX];
		var lastnote = cx_ArrayTools.last(beamgroup.pnotes);
		var rightX = cx_ArrayTools.last(beamgroup.getNotesStemXPositions()) * this.scaling.unitX;
		var rightOuterY = frame.rightOuterY * this.scaling.unitY;
		var rightInnerY = frame.rightInnerY * this.scaling.unitY;
		var rightTipY = frame.rightTipY * this.scaling.unitY;
		this.target.line(this.targetX + rightX,rightY + rightInnerY,this.targetX + rightX,rightY + rightTipY,1,0);
		var beamh = 0.95 * this.scaling.unitY;
		if(beamgroup.getDirection() == nx3_EDirectionUD.Up) beamh = -beamh; else beamh = beamh;
		this.target.parallellogram(this.targetX + leftX,rightY + leftTipY - beamh,this.targetX + rightX,rightY + rightTipY - beamh,beamh,0,0,0);
		if(beamgroup.pnotes.length > 2) {
			var _g1 = 1;
			var _g = frame.outerLevels.length - 1;
			while(_g1 < _g) {
				var i = _g1++;
				var midX = beamgroup.getNotesStemXPositions()[i] * this.scaling.unitX;
				var midInnerY = frame.innerLevels[i] * this.scaling.unitY;
				var delta = (midX - leftX) / (rightX - leftX);
				var midTipY = leftTipY + (rightTipY - leftTipY) * delta;
				this.target.line(this.targetX + midX,rightY + midInnerY,this.targetX + midX,rightY + midTipY,1,0);
				storeY.push(rightY + midTipY);
				storeX.push(this.targetX + midX);
			}
		}
		storeY.push(rightY + rightTipY);
		storeX.push(this.targetX + rightX);
		var idx = 0;
		var beamh1 = 0.95 * this.scaling.unitY;
		var _g2 = 0;
		var _g11 = beamgroup.getFrame().beamflags;
		while(_g2 < _g11.length) {
			var flagtype = _g11[_g2];
			++_g2;
			var adjustY2;
			if(beamgroup.getDirection() == nx3_EDirectionUD.Up) adjustY2 = 2.1; else adjustY2 = -2.1;
			adjustY2 *= this.scaling.unitY;
			var currX = storeX[idx];
			var currY = storeY[idx] + adjustY2;
			var nextX = storeX[idx + 1];
			var nextY = storeY[idx + 1] + adjustY2;
			var factor = 2.2 * this.scaling.unitX;
			switch(flagtype[1]) {
			case 3:
				this.target.parallellogram(currX,currY - beamh1 / 2,nextX,nextY - beamh1 / 2,beamh1,0,0,0);
				break;
			case 1:
				var endX = currX + factor;
				var endY = factor / (nextX - currX) * (nextY - currY) + currY;
				this.target.parallellogram(currX,currY - beamh1 / 2,endX,endY - beamh1 / 2,beamh1,0,0,0);
				break;
			case 2:
				var startX = nextX - factor;
				var startY = -((nextX - startX) / (nextX - currX)) * (nextY - currY) + nextY;
				this.target.parallellogram(startX,startY - beamh1 / 2,nextX,nextY - beamh1 / 2,beamh1,0,0,0);
				break;
			default:
			}
			idx++;
		}
	}
	,drawTie: function(system,x,y,rect,direction) {
		var a1 = null;
		var c1 = null;
		var c2 = null;
		var a2 = null;
		this.target.filledrectangle(x,y,rect);
		if(direction == nx3_EDirectionUD.Down) {
			a1 = { x : rect.x, y : rect.y};
			c1 = { x : rect.x + 1, y : rect.get_bottom()};
			c2 = { x : rect.get_right() - 1, y : rect.get_bottom()};
			a2 = { x : rect.get_right(), y : rect.y};
		} else {
			a1 = { x : rect.x, y : rect.get_bottom()};
			c1 = { x : rect.x + 1, y : rect.y};
			c2 = { x : rect.get_right() - 1, y : rect.y};
			a2 = { x : rect.get_right(), y : rect.get_bottom()};
		}
		var coords1 = nx3_geom_BezieerTool.bezieerCoordinates(a1,c1,c2,a2);
		var thickness = 0.06 * this.scaling.unitY;
		if(direction == nx3_EDirectionUD.Down) {
			c1 = { x : rect.x, y : rect.get_bottom() - thickness};
			c2 = { x : rect.get_right(), y : rect.get_bottom() - thickness};
		} else {
			c1 = { x : rect.x, y : rect.y + thickness};
			c2 = { x : rect.get_right(), y : rect.y + thickness};
		}
		var coords2 = nx3_geom_BezieerTool.bezieerCoordinates(a2,c2,c1,a1);
		coords1.shift();
		var coords = coords1.concat(coords2);
		this.target.polyfill(x,y,coords);
	}
	,getSvgNumber: function($char) {
		switch($char) {
		case "0":
			return nx3_render_svg_SvgElements.time0;
		case "1":
			return nx3_render_svg_SvgElements.time1;
		case "2":
			return nx3_render_svg_SvgElements.time2;
		case "3":
			return nx3_render_svg_SvgElements.time3;
		case "4":
			return nx3_render_svg_SvgElements.time4;
		case "5":
			return nx3_render_svg_SvgElements.time5;
		case "6":
			return nx3_render_svg_SvgElements.time6;
		case "7":
			return nx3_render_svg_SvgElements.time7;
		case "8":
			return nx3_render_svg_SvgElements.time8;
		case "9":
			return nx3_render_svg_SvgElements.time9;
		case "C":
			return nx3_render_svg_SvgElements.timeCommon;
		case "AllaBreve":
			return nx3_render_svg_SvgElements.timeAllabreve;
		default:
			return "";
		}
	}
	,getTarget: function() {
		return this.target;
	}
	,interactiveComplex: function(system,complex,nx,ny) {
		if(complex == null) return;
		var part = complex.getPart();
		var partidx;
		var _this = part.getBar().getParts();
		partidx = HxOverrides.indexOf(_this,part,0);
		var part_getYPosition = partidx * 20;
		var x = this.targetX + (nx + complex.getXPosition()) * this.target.getScaling().unitX;
		var y = this.targetY + (ny + part_getYPosition) * this.target.getScaling().unitY;
		var _g = 0;
		var _g1 = complex.getNotes();
		while(_g < _g1.length) {
			var note = _g1[_g];
			++_g;
			this.interactiveNote(system,note,nx,ny);
		}
	}
	,interactiveNote: function(system,note,nx,ny) {
		var part = note.getComplex().getPart();
		var partidx;
		var _this = part.getBar().getParts();
		partidx = HxOverrides.indexOf(_this,part,0);
		var part_getYPosition = partidx * 20;
		var x = this.targetX + (nx + note.getComplex().getXPosition()) * this.target.getScaling().unitX;
		var y = this.targetY + (ny + part_getYPosition) * this.target.getScaling().unitY;
	}
	,__class__: nx3_render_Renderer
};
var nx3_render_RendererTools = function() { };
nx3_render_RendererTools.__name__ = true;
nx3_render_RendererTools.getHeadSvgInfo = function(nnote) {
	{
		var _g = nnote.type;
		switch(_g[1]) {
		case 0:
			var attributes = _g[5];
			var articulations = _g[4];
			var variant = _g[3];
			var heads = _g[2];
			var _g1 = nx3_ENoteValTools.head(nnote.value);
			switch(_g1[1]) {
			case 2:
				return { xmlStr : nx3_render_svg_SvgElements.noteWhole, y : 0};
			case 1:
				return { xmlStr : nx3_render_svg_SvgElements.noteWhite, y : 0};
			default:
				return { xmlStr : nx3_render_svg_SvgElements.noteBlack, y : 0};
			}
			break;
		case 1:
			var level = _g[2];
			var _g11 = nx3_ENoteValTools.beaminglevel(nnote.value);
			switch(_g11) {
			case 0:
				var _g2 = nx3_ENoteValTools.head(nnote.value);
				switch(_g2[1]) {
				case 0:
					return { xmlStr : nx3_render_svg_SvgElements.pauseNv4, y : 2};
				case 1:
					return { xmlStr : nx3_render_svg_SvgElements.pauseNv2, y : 2};
				case 2:
					return { xmlStr : nx3_render_svg_SvgElements.pauseNv1, y : 2};
				}
				break;
			case 1:
				return { xmlStr : nx3_render_svg_SvgElements.pauseNv8, y : 2};
			case 2:
				return { xmlStr : nx3_render_svg_SvgElements.pauseNv16, y : 2};
			case 3:
				return { xmlStr : nx3_render_svg_SvgElements.pauseNv16, y : 2};
			default:
				return { xmlStr : nx3_render_svg_SvgElements.clefG, y : 2};
			}
			break;
		default:
			return { xmlStr : nx3_render_svg_SvgElements.clefG, y : 2};
		}
	}
};
var nx3_render_TargetPdfkit = function(scaling) {
	if(scaling != null) this.scaling = scaling; else this.scaling = nx3_render_scaling_Scaling.NORMAL;
	this.blobStream = window.blobStream();
	this.before();
};
nx3_render_TargetPdfkit.__name__ = true;
nx3_render_TargetPdfkit.__interfaces__ = [nx3_render_ITarget];
nx3_render_TargetPdfkit.prototype = {
	testRender: function() {
		this.doc.fontSize(25);
		this.doc.save().moveTo(100,150).lineTo(100,250).lineTo(200,250).fill("#ff3300");
		this.doc.circle(280,200,50).fill("#6600FF");
		var sharp = "m 31.526296,208.23455 -17.48556,5.8284 0.0157,31.51021 17.46908,-5.82841 0,-31.5102 z m 4.52736,-43.89588 0.0131,26.0474 9.44083,-3.09464 0,16.5724 -9.4526,3.097 0,31.50785 9.4526,-3.09701 0,16.57476 -9.4526,3.09701 0,28.59482 -4.52736,0 0,-27.32111 -17.48556,5.82841 0,27.31875 -4.52736,0 0,-26.04268 -9.4526,3.09464 0,-16.57239 9.4526,-3.09701 -0.0131,-31.50785 -9.43847,3.09465 0,-16.5724 9.4526,-3.09701 0,-28.59482 4.52736,0 0.0157,27.32111 17.46908,-5.82841 0,-27.32347 4.52736,0 z";
		this.doc.path(this.scalePath(sharp,0.3,10,10)).fill("#000");
		var flat = "m 0.119631,150.69109 5.81283,0 -1.25721,57.37598 c 3.63742,-5.96993 9.26898,-8.95607 16.901689,-8.95371 2.66507,-0.002 5.23835,0.45287 7.72451,1.3657 2.48383,0.91046 4.63332,2.15823 6.45084,3.73622 1.8152,1.58034 3.27018,3.46025 4.36022,5.64914 1.09004,2.18654 1.63625,4.55234 1.63625,7.10684 -0.24254,3.52158 -1.54679,7.44178 -3.90817,11.75353 -2.36373,4.3141 -6.39435,8.53622 -12.08944,12.66399 l -25.631519,18.95235 0,-109.65004 z m 16.901689,55.71308 c -5.082969,0 -8.960559,2.55214 -11.620919,7.65407 -0.71102,6.92521 -1.06652,12.87863 -1.06652,17.86026 0,8.62586 0.29665,14.63825 0.88758,18.03953 2.30253,-1.45769 4.75337,-3.61121 7.35491,-6.46763 2.603867,-2.85641 4.991139,-5.89445 7.171249,-9.11175 2.17775,-3.21966 3.96469,-6.43696 5.35609,-9.65898 1.39141,-3.21966 2.08592,-6.04541 2.08827,-8.47254 -0.002,-2.79509 -0.96997,-5.13494 -2.90523,-7.0172 -1.93762,-1.88463 -4.35784,-2.82576 -7.26543,-2.82576 z";
		this.doc.path(flat).stroke();
		this.doc.text("And here is some wrapped text...",100,300);
		this.doc.font("Times-Roman",13);
		this.doc.moveDown().text("Hejsan hoppsan",{ width : 412, align : "justify", indent : 30, columns : 2, height : 300, ellipsis : true});
	}
	,getScaling: function() {
		return this.scaling;
	}
	,clear: function() {
	}
	,testLines: function(x,y,width) {
		var _g = -2;
		while(_g < 3) {
			var i = _g++;
			var cy = y + i * this.scaling.space;
			this.line(x,cy,x + width,cy,this.scaling.linesWidth,0);
		}
	}
	,rect: function(x,y,rect,lineWidth,lineColor) {
	}
	,rectangle: function(x,y,rect,lineWidth,lineColor) {
		var x1 = x + rect.x * this.scaling.unitX;
		var y1 = y + rect.y * this.scaling.unitY;
		var width = rect.width * this.scaling.unitX;
		var height = rect.height * this.scaling.unitY;
		console.log([x1,y1,width,height]);
		this.doc.rect(x1,y1,width,height).fill("#000");
	}
	,rectangles: function(x,y,rects,lineWidth,lineColor) {
	}
	,filledrectangle: function(x,y,rect,lineWidth,lineColor,fillColor) {
	}
	,filledellipse: function(x,y,rect,lineWidth,lineColor,fillColor) {
		var cx = x + (rect.x + rect.width / 2) * this.scaling.unitX;
		var cy = y + (rect.y + rect.height / 2) * this.scaling.unitY;
		var rx = rect.width / 2 * this.scaling.unitX;
		var ry = rect.height / 2 * this.scaling.unitY;
		this.doc.ellipse(cx,cy,rx,ry).fill("#000");
	}
	,line: function(x,y,x2,y2,lineWidth,lineColor) {
		this.doc.moveTo(x,y).lineTo(x2,y2).stroke();
	}
	,shape: function(shapeId,x,y,xmlStr,fillColor) {
		var xml = Xml.parse(xmlStr);
		var elementTag = xml.firstElement().firstChild().firstChild().get_nodeName().toLowerCase();
		switch(elementTag) {
		case "path":
			var pathD = xml.firstElement().firstChild().firstChild().get("d");
			this.doc.path(this.scalePath(pathD,0.178,x + this.scaling.svgX,y + this.scaling.svgY)).fill("#000");
			break;
		case "rect":
			var rectXml = xml.firstElement().firstChild().firstChild();
			var rx = Std.parseFloat(rectXml.get("x")) * 0.178;
			var ry = Std.parseFloat(rectXml.get("y")) * 0.178;
			var width = Std.parseFloat(rectXml.get("width")) * 0.178 * 0.25;
			var height = Std.parseFloat(rectXml.get("height")) * 0.178 * 0.25;
			this.rectangle(x,y,new nx3_geom_Rectangle(0,0.3,width,height));
			break;
		default:
		}
	}
	,text: function(x,y,text) {
	}
	,textwidth: function(text) {
		return 0;
	}
	,textheight: function(text) {
		return 0;
	}
	,setFont: function(font) {
	}
	,parallellogram: function(x,y,x2,y2,pheight,lineWidth,lineColor,fillColor) {
		var pathStr = "M " + x + " " + y + " L " + x2 + " " + y2 + "  L " + x2 + " " + (y2 + pheight) + "  L " + x + "  " + (y + pheight) + "  L " + x + " " + y;
		this.doc.path(pathStr).fill("#000");
	}
	,polyline: function(x,y,coordinates,lineWidth,lineColor) {
		if(lineColor == null) lineColor = 0;
		if(lineWidth == null) lineWidth = 1;
	}
	,polyfill: function(x,y,coordinates,lineWidth,lineColor,fillColor) {
		if(fillColor == null) fillColor = 0;
		if(lineColor == null) lineColor = 0;
		if(lineWidth == null) lineWidth = 1;
		var coord = coordinates.shift();
		var pathStr = "M " + Std.string(coord.x * this.scaling.unitX + x) + " " + Std.string(coord.y * this.scaling.unitY + y) + " ";
		var _g = 0;
		while(_g < coordinates.length) {
			var coord1 = coordinates[_g];
			++_g;
			pathStr += "L " + Std.string(coord1.x * this.scaling.unitX + x) + " " + Std.string(coord1.y * this.scaling.unitY + y) + " ";
		}
		this.doc.path(pathStr).stroke().fill("#000");
	}
	,interactiveEllipse: function(x,y,rect,lineWidth,lineColor,fillColor,cb) {
	}
	,scaleRect: function(rect,inflateX,inflateY) {
		if(inflateY == null) inflateY = 0;
		if(inflateX == null) inflateX = 0;
		return null;
	}
	,tooltipShow: function(rect,text) {
	}
	,tooltipHide: function() {
	}
	,after: function() {
		var _g = this;
		if(this.iframe == null) throw new js__$Boot_HaxeError("No target iframe");
		var stream = this.doc.pipe(this.blobStream);
		stream.on("finish",function() {
			_g.iframe.setAttribute("src",stream.toBlobURL("application/pdf"));
		});
		this.doc.end();
	}
	,before: function() {
		this.doc = new PDFDocument();
		this.doc.scale(0.7);
	}
	,renderToIframe: function(iframeId) {
		this.iframe = window.document.getElementById(iframeId);
		this.after();
	}
	,scalePath: function(path,factor,moveX,moveY) {
		if(moveY == null) moveY = 0;
		if(moveX == null) moveX = 0;
		var correctHack = StringTools.startsWith(path,"m 31.526296,208.23455") || StringTools.startsWith(path,"m 0.119631,150.69109 5.81283,0");
		var segments = cx_SvgTools.toSegments(path,correctHack);
		segments = cx_SvgTools.scaleSegments(segments,factor,factor);
		segments = cx_SvgTools.moveSegments(segments,moveX,moveY);
		var path1 = cx_SvgTools.getPath(segments);
		return path1;
	}
	,__class__: nx3_render_TargetPdfkit
};
var nx3_render_TargetSvgXml = function(svgId,scaling) {
	this.svgId = svgId;
	this.svg = Xml.createElement("svg");
	this.svg.set("id",svgId);
	if(scaling != null) this.scaling = scaling; else this.scaling = nx3_render_scaling_Scaling.NORMAL;
	this.font = nx3_Constants.FONT_TEXT_DEFAULTFORMAT;
};
nx3_render_TargetSvgXml.__name__ = true;
nx3_render_TargetSvgXml.__interfaces__ = [nx3_render_ITarget];
nx3_render_TargetSvgXml.hex = function($int) {
	if($int == 0) return "#000"; else return "#" + StringTools.hex($int);
};
nx3_render_TargetSvgXml.prototype = {
	getXml: function() {
		this.svg.set("width",Std.string(this.totalWidth));
		this.svg.set("height",Std.string(this.totalHeight + nx3_render_TargetSvgXml.SVG_EXTRA_HEIGHT));
		return this.svg;
	}
	,getScaling: function() {
		return this.scaling;
	}
	,testLines: function(x,y,width) {
		var _g = -2;
		while(_g < 3) {
			var i = _g++;
			var cy = y + i * this.scaling.space;
			this.line(x,cy,x + width,cy,this.scaling.linesWidth,0);
		}
	}
	,rect: function(x,y,rect,lineWidth,lineColor) {
	}
	,rectangle: function(x,y,rect,lineWidth,lineColor) {
		if(lineColor == null) lineColor = 0;
		if(lineWidth == null) lineWidth = 1;
		var r = Xml.createElement("rect");
		r.set("x",Std.string(x + rect.x * this.scaling.unitX));
		r.set("y",Std.string(y + rect.y * this.scaling.unitY));
		r.set("width",Std.string(rect.width * this.scaling.unitX));
		r.set("height",Std.string(rect.height * this.scaling.unitY));
		r.set("fill","none");
		r.set("stroke","#eee");
		r.set("stroke-width",Std.string(lineWidth * this.scaling.linesWidth));
		this.svg.addChild(r);
	}
	,rectangles: function(x,y,rects,lineWidth,lineColor) {
	}
	,filledrectangle: function(x,y,rect,lineWidth,lineColor,fillColor) {
	}
	,filledellipse: function(x,y,rect,lineWidth,lineColor,fillColor) {
		var r = Xml.createElement("ellipse");
		r.set("cx",Std.string(x + (rect.x + rect.width / 2) * this.scaling.unitX));
		r.set("cy",Std.string(y + (rect.y + rect.height / 2) * this.scaling.unitY));
		r.set("rx",Std.string(rect.width / 2 * this.scaling.unitX));
		r.set("ry",Std.string(rect.height / 2 * this.scaling.unitY));
		r.set("fill",fillColor == 0?"#000":"#" + StringTools.hex(fillColor));
		r.set("stroke",lineColor == 0?"#000":"#" + StringTools.hex(lineColor));
		r.set("stroke-width",Std.string(lineWidth * this.scaling.linesWidth));
		r.set("style","fill: " + (fillColor == 0?"#000":"#" + StringTools.hex(fillColor)) + "; stroke: " + (lineColor == 0?"#000":"#" + StringTools.hex(lineColor)) + "; stroke-width: " + lineWidth * this.scaling.linesWidth + "; cursor:pointer;");
		this.svg.addChild(r);
	}
	,line: function(x,y,x2,y2,lineWidth,lineColor) {
		if(lineColor == null) lineColor = 16711680;
		if(lineWidth == null) lineWidth = 1;
		var el = Xml.createElement("line");
		el.set("x1",x == null?"null":"" + x);
		el.set("y1",y == null?"null":"" + y);
		el.set("x2",x2 == null?"null":"" + x2);
		el.set("y2",y2 == null?"null":"" + y2);
		el.set("stroke",lineColor == 0?"#000":"#" + StringTools.hex(lineColor));
		el.set("style","stroke-width:" + lineWidth * this.scaling.linesWidth);
		this.svg.addChild(el);
	}
	,shape: function(shapeId,x,y,xmlStr,fillColor) {
		if(fillColor == null) fillColor = 0;
		var xml = Xml.parse(xmlStr);
		var elementTag = xml.firstElement().firstChild().firstChild().get_nodeName().toLowerCase();
		var element = Xml.createElement("dummy");
		if(elementTag == "path") {
			element = Xml.createElement("path");
			var pathD = xml.firstElement().firstChild().firstChild().get("d");
			element.set("d",pathD);
			element.set("stroke","none");
			element.set("fill",fillColor == 0?"#000":"#" + StringTools.hex(fillColor));
		} else if(elementTag == "rect") {
			var rectXml = xml.firstElement().firstChild().firstChild();
			element = Xml.createElement("rect");
			element.set("x",rectXml.get("x"));
			element.set("y",rectXml.get("y"));
			element.set("width",rectXml.get("width"));
			element.set("height",rectXml.get("height"));
		} else throw new js__$Boot_HaxeError("Shape element " + elementTag + " - UNIMPLEMENTED");
		var sc = this.scaling.svgScale;
		element.set("transform","matrix(" + sc + ",0,0," + sc + ",0,0)");
		var svg = Xml.createElement("svg");
		svg.set("x",Std.string(x + this.scaling.svgX));
		svg.set("y",Std.string(y + this.scaling.svgY));
		svg.addChild(element);
		this.svg.addChild(svg);
	}
	,parallellogram: function(x,y,x2,y2,pheight,lineWidth,lineColor,fillColor) {
		var pathStr = "M " + x + " " + y + " L " + x2 + " " + y2 + "  L " + x2 + " " + (y2 + pheight) + "  L " + x + "  " + (y + pheight) + "  L " + x + " " + y;
		var el = Xml.createElement("path");
		el.set("d",pathStr);
		el.set("fill",fillColor == 0?"#000":"#" + StringTools.hex(fillColor));
		el.set("stroke",lineColor == 0?"#000":"#" + StringTools.hex(lineColor));
		el.set("style","stroke-width:" + lineWidth * this.scaling.linesWidth);
		this.svg.addChild(el);
	}
	,clear: function() {
		this.svg = Xml.createElement("svg");
		this.svg.set("id",this.svgId);
	}
	,polyline: function(x,y,coordinates,lineWidth,lineColor) {
		if(lineColor == null) lineColor = 0;
		if(lineWidth == null) lineWidth = 1;
	}
	,polyfill: function(x,y,coordinates,lineWidth,lineColor,fillColor) {
		if(fillColor == null) fillColor = 255;
		if(lineColor == null) lineColor = 0;
		if(lineWidth == null) lineWidth = 1;
		console.log("Polyfill: " + x + " " + y);
		var coord = coordinates.shift();
		var path = "M " + Std.string(coord.x * this.scaling.unitX + x) + " " + Std.string(coord.y * this.scaling.unitY + y) + " ";
		var _g = 0;
		while(_g < coordinates.length) {
			var coord1 = coordinates[_g];
			++_g;
			path += "L " + Std.string(coord1.x * this.scaling.unitX + x) + " " + Std.string(coord1.y * this.scaling.unitY + y) + " ";
		}
		console.log(path);
		var el = Xml.createElement("path");
		el.set("d",path);
		el.set("fill",fillColor == 0?"#000":"#" + StringTools.hex(fillColor));
		el.set("stroke",lineColor == 0?"#000":"#" + StringTools.hex(lineColor));
		el.set("style","stroke-width:" + lineWidth * this.scaling.linesWidth);
		this.svg.addChild(el);
	}
	,sline: function(x,y,start,end,lineWidth,lineColor) {
	}
	,interactiveEllipse: function(x,y,rect,lineWidth,lineColor,fillColor,cb) {
	}
	,scaleRect: function(rect,inflateX,inflateY) {
		if(inflateY == null) inflateY = 0;
		if(inflateX == null) inflateX = 0;
		return null;
	}
	,tooltipShow: function(rect,text) {
	}
	,tooltipHide: function() {
	}
	,setFont: function(font) {
		this.font = font;
	}
	,text: function(x,y,text) {
		var fontsize = this.font.size * this.scaling.fontScaling;
		x = x + 4 * this.scaling.fontScaling;
		y = y + (-3 + this.font.size) * this.scaling.fontScaling;
		var txt = Xml.createElement("text");
		txt.set("x",x == null?"null":"" + x);
		txt.set("y",y == null?"null":"" + y);
		txt.set("font-size",Std.string(this.font.size * this.scaling.fontScaling));
		txt.set("font-family",Std.string(this.font.name));
		var str = Xml.createPCData(text);
		txt.addChild(str);
		this.svg.addChild(txt);
	}
	,textwidth: function(text) {
		if(this.context == null) {
			var canvas = window.document.getElementById("CanvasTextMeasurement");
			if(canvas == null) {
				console.log("creating a canvas for text measurement");
				var _this = window.document;
				canvas = _this.createElement("canvas");
				canvas.id = "CanvasTextMeasurement";
			}
			this.context = canvas.getContext("2d",null);
		}
		var fontsize = this.font.size * this.scaling.fontScaling;
		var fontstr = "" + fontsize + "px " + this.font.name;
		this.context.font = fontstr;
		var measure = this.context.measureText(text);
		return measure.width / this.scaling.unitX;
	}
	,textheight: function(text) {
		return this.font.size / 3.8;
	}
	,addToDomElement: function(elementId) {
		window.document.getElementById(elementId).innerHTML = this.getXml().toString();
	}
	,__class__: nx3_render_TargetSvgXml
};
var nx3_render_scaling_Scaling = function() { };
nx3_render_scaling_Scaling.__name__ = true;
nx3_render_scaling_Scaling.scaleRect = function(scaling,rect) {
	return new nx3_geom_Rectangle(rect.x * scaling.unitX,rect.y * scaling.unitY,rect.width * scaling.unitX,rect.height * scaling.unitY);
};
var nx3_render_svg_SvgElements = function() { };
nx3_render_svg_SvgElements.__name__ = true;
var nx3_xml_BarXML = function() { };
nx3_xml_BarXML.__name__ = true;
nx3_xml_BarXML.copy = function(bar) {
	return nx3_xml_BarXML.fromXmlStr(nx3_xml_BarXML.toXml(bar).toString());
};
nx3_xml_BarXML.toXml = function(bar) {
	var xml = Xml.createElement("bar");
	var _g = 0;
	var _g1 = bar.nparts;
	while(_g < _g1.length) {
		var part = _g1[_g];
		++_g;
		var partXml = nx3_xml_PartXML.toXml(part);
		xml.addChild(partXml);
	}
	var _g2 = bar.type;
	switch(_g2[1]) {
	case 0:
		break;
	default:
		xml.set("type",Std.string(bar.type));
	}
	if(bar.time != null) {
		var _g3 = bar.time;
		switch(_g3[1]) {
		case 5:
			break;
		default:
			xml.set("time",Std.string(nx3_ETimeUtils.toString(bar.time)));
		}
	}
	var _g4 = bar.timeDisplay;
	switch(_g4[1]) {
	case 1:
		break;
	default:
		xml.set("timedisplay",Std.string(bar.timeDisplay));
	}
	return xml;
};
nx3_xml_BarXML.fromXmlStr = function(xmlStr) {
	var xml = Xml.parse(xmlStr).firstElement();
	var parts = [];
	var $it0 = xml.elements();
	while( $it0.hasNext() ) {
		var p = $it0.next();
		var part = nx3_xml_PartXML.fromXmlStr(haxe_xml_Printer.print(p));
		parts.push(part);
	}
	var typeStr = xml.get("type");
	var type;
	if(typeStr == null) type = nx3_EBarType.Normal; else type = cx_EnumTools.createFromString(nx3_EBarType,typeStr);
	var time = null;
	var timeStr = xml.get("time");
	if(timeStr != null) time = nx3_ETimeUtils.fromString(timeStr);
	var timeDisplayStr = xml.get("timedisplay");
	var timeDisplay;
	if(timeDisplayStr == null) timeDisplay = nx3_EDisplayALN.Layout; else timeDisplay = cx_EnumTools.createFromString(nx3_EDisplayALN,timeDisplayStr);
	return new nx3_NBar(parts,type,time,timeDisplay);
};
nx3_xml_BarXML.test = function(item) {
	var str = nx3_xml_BarXML.toXml(item).toString();
	var item2 = nx3_xml_BarXML.fromXmlStr(str);
	var str2 = nx3_xml_BarXML.toXml(item2).toString();
	console.log(str);
	console.log(str2);
	return str == str2;
	return false;
};
var nx3_xml_HeadXML = function() { };
nx3_xml_HeadXML.__name__ = true;
nx3_xml_HeadXML.toXml = function(head) {
	var xml = Xml.createElement(nx3_xml_HeadXML.XHEAD);
	var _g = head.type;
	switch(_g[1]) {
	case 2:case 1:
		xml.set(nx3_xml_HeadXML.XHEAD_TYPE,Std.string(head.type));
		break;
	default:
	}
	xml.set(nx3_xml_HeadXML.XHEAD_LEVEL,head.level == null?"null":"" + head.level);
	if(head.sign != nx3_ESign.None) xml.set(nx3_xml_HeadXML.XHEAD_SIGN,Std.string(head.sign));
	if(head.tie != null) {
		var _g1 = head.tie;
		switch(_g1[1]) {
		case 0:
			var level = _g1[3];
			var direction = _g1[2];
			xml.set(nx3_xml_HeadXML.XHEAD_TIE,"true");
			if(level != 0) xml.set(nx3_xml_HeadXML.XHEAD_TIE_LEVEL,level == null?"null":"" + level);
			if(direction != nx3_EDirectionUAD.Auto) xml.set(nx3_xml_HeadXML.XHEAD_TIE_DIRECTION,Std.string(direction[0]));
			break;
		case 1:
			var levelRight = _g1[4];
			var levelLeft = _g1[3];
			var direction1 = _g1[2];
			xml.set(nx3_xml_HeadXML.XHEAD_TIE,levelLeft == null?"null":"" + levelLeft);
			break;
		}
	}
	if(head.tieTo != null) {
		var _g2 = head.tieTo;
		switch(_g2[1]) {
		case 0:
			var level1 = _g2[3];
			var direction2 = _g2[2];
			xml.set(nx3_xml_HeadXML.XHEAD_TIETO,Std.string(head.tieTo));
			break;
		case 1:
			var levelRight1 = _g2[4];
			var levelLeft1 = _g2[3];
			var direction3 = _g2[2];
			xml.set(nx3_xml_HeadXML.XHEAD_TIETO,Std.string(head.tieTo));
			break;
		}
	}
	return xml;
};
nx3_xml_HeadXML.fromXmlStr = function(xmlStr) {
	var xml = Xml.parse(xmlStr).firstElement();
	var typeStr = xml.get(nx3_xml_HeadXML.XHEAD_TYPE);
	var type = cx_EnumTools.createFromString(nx3_EHeadType,typeStr);
	var level = Std.parseInt(xml.get(nx3_xml_HeadXML.XHEAD_LEVEL));
	var sign = cx_EnumTools.createFromString(nx3_ESign,xml.get(nx3_xml_HeadXML.XHEAD_SIGN));
	var tie = null;
	if(xml.get(nx3_xml_HeadXML.XHEAD_TIE) != null) {
		var tiedirection;
		if(xml.get(nx3_xml_HeadXML.XHEAD_TIE_DIRECTION) == null) tiedirection = nx3_EDirectionUAD.Auto; else tiedirection = nx3_EDirectionUAD.Up;
		var tielevel;
		if(xml.get(nx3_xml_HeadXML.XHEAD_TIE_LEVEL) == null) tielevel = 0; else tielevel = Std.parseInt(xml.get(nx3_xml_HeadXML.XHEAD_TIE_LEVEL));
		tie = nx3_ETie.Tie(tiedirection,tielevel);
	}
	var tieTo = cx_EnumTools.createFromString(nx3_ETie,xml.get(nx3_xml_HeadXML.XHEAD_TIETO));
	return new nx3_NHead(type,level,sign,tie,tieTo);
};
nx3_xml_HeadXML.test = function(item) {
	var str = nx3_xml_HeadXML.toXml(item).toString();
	var item2 = nx3_xml_HeadXML.fromXmlStr(str);
	var str2 = nx3_xml_HeadXML.toXml(item2).toString();
	console.log(str);
	console.log(str2);
	return str == str2;
};
var nx3_xml_NoteXML = function() { };
nx3_xml_NoteXML.__name__ = true;
nx3_xml_NoteXML.toXml = function(note) {
	var xml = null;
	{
		var _g = note.type;
		switch(_g[1]) {
		case 0:
			var attributes = _g[5];
			var articulations = _g[4];
			var variant = _g[3];
			var heads = _g[2];
			xml = Xml.createElement("note");
			var _g1 = 0;
			while(_g1 < heads.length) {
				var head = heads[_g1];
				++_g1;
				var headXml = nx3_xml_HeadXML.toXml(head);
				xml.addChild(headXml);
			}
			if(variant != null) xml.set("variant",Std.string(variant));
			if(articulations != null) {
				var articulationStrings = [];
				var _g11 = 0;
				while(_g11 < articulations.length) {
					var articulation = articulations[_g11];
					++_g11;
					articulationStrings.push(Std.string(articulation));
				}
				xml.set("articulations",articulationStrings.join(";"));
			}
			if(attributes != null) {
				var attributesStrings = [];
				var _g12 = 0;
				while(_g12 < attributes.length) {
					var attribute = attributes[_g12];
					++_g12;
					attributesStrings.push(Std.string(attribute));
				}
				xml.set("attributes",attributesStrings.join(";"));
			}
			break;
		case 1:
			var level = _g[2];
			xml = Xml.createElement("pause");
			if(level != 0) xml.set("level",level == null?"null":"" + level);
			break;
		case 4:
			var format = _g[5];
			var continuation = _g[4];
			var offset = _g[3];
			var text = _g[2];
			xml = Xml.createElement("lyric");
			xml.set("text",text);
			if(continuation != null) xml.set("continuation",Std.string(continuation));
			if(offset != null) xml.set("offset",Std.string(offset));
			if(format != null) xml.set("format",Std.string(format));
			break;
		case 7:
			var midinote = _g[3];
			var level1 = _g[2];
			xml = Xml.createElement("pitch");
			if(level1 != 0) xml.set("level",level1 == null?"null":"" + level1);
			if(midinote != 0) xml.set("midinote",midinote == null?"null":"" + midinote);
			break;
		case 3:
			var pause = _g[4];
			var sign = _g[3];
			var level2 = _g[2];
			xml = Xml.createElement("tpl");
			xml.set("level",level2 == null?"null":"" + level2);
			if(sign != nx3_ESign.None) xml.set("sign",Std.string(sign));
			if(pause == true) xml.set("pause","true");
			break;
		default:
			xml = Xml.createElement("undefined");
		}
	}
	if(nx3_ENoteValTools.value(note.value) != nx3_ENoteValTools.value(nx3_ENoteVal.Nv4)) xml.set("val",Std.string(nx3_ENoteValTools.toValString(note.value)));
	if(note.direction != nx3_EDirectionUAD.Auto) xml.set("direction",Std.string(note.direction));
	return xml;
};
nx3_xml_NoteXML.fromXmlStr = function(xmlStr) {
	var xml = Xml.parse(xmlStr).firstElement();
	var xmlType;
	if(xml.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + xml.nodeType);
	xmlType = xml.nodeName;
	var type = null;
	switch(xmlType) {
	case "note":
		var heads = [];
		var $it0 = xml.elementsNamed(nx3_xml_HeadXML.XHEAD);
		while( $it0.hasNext() ) {
			var h = $it0.next();
			var head = nx3_xml_HeadXML.fromXmlStr(haxe_xml_Printer.print(h));
			heads.push(head);
		}
		var variant = cx_EnumTools.createFromString(nx3_ENotationVariant,xml.get("variant"));
		var articulations = [];
		var articulationsStr = xml.get("articulations");
		if(articulationsStr != null) {
			var articulationStrings = articulationsStr.split(";");
			var _g = 0;
			while(_g < articulationStrings.length) {
				var articulationStr = articulationStrings[_g];
				++_g;
				articulations.push(cx_EnumTools.createFromString(nx3_ENoteArticulation,articulationStr));
			}
		}
		if(articulations.length == 0) articulations = null;
		var attributes = [];
		var attributesStr = xml.get("attributes");
		if(attributesStr != null) {
			var attributesStrings = attributesStr.split(";");
			var _g1 = 0;
			while(_g1 < attributesStrings.length) {
				var attributeStr = attributesStrings[_g1];
				++_g1;
				attributes.push(cx_EnumTools.createFromString(nx3_ENoteAttributes,attributeStr));
			}
		}
		if(attributes.length == 0) attributes = null;
		type = nx3_ENoteType.Note(heads,variant,articulations,attributes);
		break;
	case "pause":
		var pauseLevelStr = xml.get("level");
		var levelInt;
		if(pauseLevelStr == null) levelInt = 0; else levelInt = Std.parseInt(pauseLevelStr);
		type = nx3_ENoteType.Pause(levelInt);
		break;
	case "lyric":
		var text = xml.get("text");
		var offsetStr = xml.get("offset");
		var offset = cx_EnumTools.createFromString(nx3_EPosition,offsetStr);
		var continuationStr = xml.get("continuation");
		var continuation = cx_EnumTools.createFromString(nx3_ELyricContinuation,continuationStr);
		type = nx3_ENoteType.Lyric(text,offset,continuation);
		break;
	case "pitch":
		var levelstr = xml.get("level");
		var level;
		if(levelstr != null) level = Std.parseInt(levelstr); else level = 0;
		var midinotestr = xml.get("midinote");
		var midinote;
		if(midinotestr != null) midinote = Std.parseInt(midinotestr); else midinote = 0;
		type = nx3_ENoteType.Pitch(level,midinote);
		break;
	case "tpl":
		var levelstr1 = xml.get("level");
		var level1;
		if(levelstr1 != null) level1 = Std.parseInt(levelstr1); else level1 = 0;
		var sign = cx_EnumTools.createFromString(nx3_ESign,xml.get("sign"));
		var pausestr = xml.get("pause");
		var pause = pausestr != null && pausestr.toLowerCase() == "true";
		type = nx3_ENoteType.Tpl(level1,sign,pause);
		break;
	}
	var valStr = xml.get("val");
	var value = nx3_ENoteValTools.fromValString(valStr);
	var direction = cx_EnumTools.createFromString(nx3_EDirectionUAD,xml.get("direction"));
	return new nx3_NNote(type,null,value,direction);
};
nx3_xml_NoteXML.test = function(item) {
	var str = nx3_xml_NoteXML.toXml(item).toString();
	var item2 = nx3_xml_NoteXML.fromXmlStr(str);
	var str2 = nx3_xml_NoteXML.toXml(item2).toString();
	console.log(str);
	console.log(str2);
	return str == str2;
};
nx3_xml_NoteXML.clone = function(nnote) {
	return nx3_xml_NoteXML.fromXmlStr(nx3_xml_NoteXML.toXml(nnote).toString());
};
var nx3_xml_PartXML = function() { };
nx3_xml_PartXML.__name__ = true;
nx3_xml_PartXML.toXml = function(part) {
	var xml = Xml.createElement("part");
	var _g = 0;
	var _g1 = part.nvoices;
	while(_g < _g1.length) {
		var voice = _g1[_g];
		++_g;
		var voiceXml = nx3_xml_VoiceXML.toXml(voice);
		xml.addChild(voiceXml);
	}
	{
		var _g2 = part.type;
		switch(_g2[1]) {
		case 0:
			break;
		case 3:
			var octave = _g2[3];
			var modus = _g2[2];
			xml.set("type","tplchain");
			if(modus != null) {
				if(modus != nx3_EModus.Major) xml.set("modus",Std.string(modus));
			}
			if(octave != null) {
				if(octave != nx3_EOctave.Normal || octave != null) xml.set("octave",Std.string(octave));
			}
			break;
		case 2:
			var octave1 = _g2[3];
			var modus1 = _g2[2];
			xml.set("type","tplchain");
			if(modus1 != null) {
				if(modus1 != nx3_EModus.Major) xml.set("modus",Std.string(modus1));
			}
			if(octave1 != null) {
				if(octave1 != nx3_EOctave.Normal || octave1 != null) xml.set("octave",Std.string(octave1));
			}
			break;
		case 9:
			var leveloffset = _g2[2];
			xml.set("type","pitchchain");
			xml.set("leveloffset",leveloffset == null?"null":"" + leveloffset);
			break;
		default:
			xml.set("type",Std.string(part.type));
		}
	}
	if(part.clef != null) {
		var _g3 = part.clef;
		switch(_g3[1]) {
		case 0:
			break;
		default:
			xml.set("clef",Std.string(part.clef));
		}
	}
	if(part.key != null) {
		var _g4 = part.key;
		switch(_g4[1]) {
		case 6:
			break;
		default:
			xml.set("key",Std.string(part.key));
		}
	}
	var _g5 = part.clefDisplay;
	switch(_g5[1]) {
	case 1:
		break;
	default:
		xml.set("clefdisplay",Std.string(part.clefDisplay));
	}
	var _g6 = part.keyDisplay;
	switch(_g6[1]) {
	case 1:
		break;
	default:
		xml.set("keydisplay",Std.string(part.keyDisplay));
	}
	return xml;
};
nx3_xml_PartXML.fromXmlStr = function(xmlStr) {
	var xml = Xml.parse(xmlStr).firstElement();
	var voices = [];
	var $it0 = xml.elements();
	while( $it0.hasNext() ) {
		var v = $it0.next();
		var voice = nx3_xml_VoiceXML.fromXmlStr(haxe_xml_Printer.print(v));
		voices.push(voice);
	}
	var type = null;
	var typeStr = xml.get("type");
	if(typeStr == "pitchchain") {
		var leveloffset = Std.parseInt(xml.get("leveloffset"));
		type = nx3_EPartType.PitchChain(leveloffset);
	} else if(typeStr == "tplchain" || typeStr == "tplrow") {
		var oct = xml.get("octave");
		var octave = null;
		if(oct != null) octave = cx_EnumTools.createFromString(nx3_EOctave,oct);
		var mod = xml.get("modus");
		var modus = null;
		if(mod != null) modus = cx_EnumTools.createFromString(nx3_EModus,mod);
		type = nx3_EPartType.Tplchain(modus,octave);
	} else type = cx_EnumTools.createFromString(nx3_EPartType,typeStr);
	var str = xml.get("clef");
	var clef = null;
	if(str != null) clef = cx_EnumTools.createFromString(nx3_EClef,str);
	var clefDisplayStr = xml.get("clefdisplay");
	var clefDisplay;
	if(clefDisplayStr == null) clefDisplay = nx3_EDisplayALN.Layout; else clefDisplay = cx_EnumTools.createFromString(nx3_EDisplayALN,clefDisplayStr);
	var str1 = xml.get("key");
	var key = null;
	if(str1 != null) key = cx_EnumTools.createFromString(nx3_EKey,str1);
	var keyDisplayStr = xml.get("keydisplay");
	var keyDisplay;
	if(keyDisplayStr == null) keyDisplay = nx3_EDisplayALN.Layout; else keyDisplay = cx_EnumTools.createFromString(nx3_EDisplayALN,keyDisplayStr);
	return new nx3_NPart(voices,type,clef,clefDisplay,key,keyDisplay);
};
var nx3_xml_ScoreXML = function() { };
nx3_xml_ScoreXML.__name__ = true;
nx3_xml_ScoreXML.toXml = function(score) {
	var xml = Xml.createElement("score");
	var config = Xml.createElement("config");
	config.set("test","12345");
	xml.addChild(config);
	var $it0 = score.iterator();
	while( $it0.hasNext() ) {
		var bar = $it0.next();
		var barXml = nx3_xml_BarXML.toXml(bar);
		xml.addChild(barXml);
	}
	return xml;
};
nx3_xml_ScoreXML.fromXmlStr = function(xmlStr) {
	var xml = Xml.parse(xmlStr).firstElement();
	var bars = [];
	var config = xml.elementsNamed("config").next();
	var configObject = { };
	if(config != null) {
		var $it0 = config.attributes();
		while( $it0.hasNext() ) {
			var attr = $it0.next();
			Reflect.setField(configObject,attr,config.get(attr));
		}
	}
	var $it1 = xml.elementsNamed("bar");
	while( $it1.hasNext() ) {
		var b = $it1.next();
		var bar = nx3_xml_BarXML.fromXmlStr(haxe_xml_Printer.print(b));
		bars.push(bar);
	}
	var score = new nx3_NScore(bars);
	score.configuration = configObject;
	return score;
};
var nx3_xml_VoiceXML = function() { };
nx3_xml_VoiceXML.__name__ = true;
nx3_xml_VoiceXML.toXml = function(voice) {
	var xml = Xml.createElement("voice");
	var _g = voice.type;
	switch(_g[1]) {
	case 1:
		xml.set("type",Std.string(voice.type));
		break;
	default:
	}
	if(voice.direction != nx3_EDirectionUAD.Auto) xml.set("direction",Std.string(voice.direction));
	if(voice.nnotes != null) {
		var _g1 = 0;
		var _g11 = voice.nnotes;
		while(_g1 < _g11.length) {
			var note = _g11[_g1];
			++_g1;
			var noteXml = nx3_xml_NoteXML.toXml(note);
			xml.addChild(noteXml);
		}
	}
	return xml;
};
nx3_xml_VoiceXML.fromXmlStr = function(xmlStr) {
	var xml = Xml.parse(xmlStr).firstElement();
	var typeStr = xml.get("type");
	var type = cx_EnumTools.createFromString(nx3_EVoiceType,typeStr);
	var directionStr = xml.get("direction");
	var direction = null;
	if(directionStr == null) direction = nx3_EDirectionUAD.Auto; else direction = cx_EnumTools.createFromString(nx3_EDirectionUAD,directionStr);
	var notes = [];
	var $it0 = xml.elements();
	while( $it0.hasNext() ) {
		var n = $it0.next();
		var note = nx3_xml_NoteXML.fromXmlStr(haxe_xml_Printer.print(n));
		notes.push(note);
	}
	return new nx3_NVoice(notes,type,direction);
};
nx3_xml_VoiceXML.test = function(item) {
	var str = nx3_xml_VoiceXML.toXml(item).toString();
	var item2 = nx3_xml_VoiceXML.fromXmlStr(str);
	var str2 = nx3_xml_VoiceXML.toXml(item2).toString();
	console.log(str);
	console.log(str2);
	return str == str2;
};
var PDFDocument = require("pdfkit");
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
String.prototype.__class__ = String;
String.__name__ = true;
Array.__name__ = true;
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
if(Array.prototype.map == null) Array.prototype.map = function(f) {
	var a = [];
	var _g1 = 0;
	var _g = this.length;
	while(_g1 < _g) {
		var i = _g1++;
		a[i] = f(this[i]);
	}
	return a;
};
if(Array.prototype.filter == null) Array.prototype.filter = function(f1) {
	var a1 = [];
	var _g11 = 0;
	var _g2 = this.length;
	while(_g11 < _g2) {
		var i1 = _g11++;
		var e = this[i1];
		if(f1(e)) a1.push(e);
	}
	return a1;
};
var __map_reserved = {}
var q = window.jQuery;
var js = js || {}
js.JQuery = q;
var ArrayBuffer = (Function("return typeof ArrayBuffer != 'undefined' ? ArrayBuffer : null"))() || js_html_compat_ArrayBuffer;
if(ArrayBuffer.prototype.slice == null) ArrayBuffer.prototype.slice = js_html_compat_ArrayBuffer.sliceImpl;
var DataView = (Function("return typeof DataView != 'undefined' ? DataView : null"))() || js_html_compat_DataView;
var Uint8Array = (Function("return typeof Uint8Array != 'undefined' ? Uint8Array : null"))() || js_html_compat_Uint8Array._new;
Lorem.impsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in suscipit purus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus nec hendrerit felis. Morbi aliquam facilisis risus eu lacinia. Sed eu leo in turpis fringilla hendrerit. Ut nec accumsan nisl. Suspendisse rhoncus nisl posuere tortor tempus et dapibus elit porta. Cras leo neque, elementum a rhoncus ut, vestibulum non nibh. Phasellus pretium justo turpis. Etiam vulputate, odio vitae tincidunt ultricies, eros odio dapibus nisi, ut tincidunt lacus arcu eu elit. Aenean velit erat, vehicula eget lacinia ut, dignissim non tellus. Aliquam nec lacus mi, sed vestibulum nunc. Suspendisse potenti. Curabitur vitae sem turpis. Vestibulum sed neque eget dolor dapibus porttitor at sit amet sem. Fusce a turpis lorem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;\nMauris at ante tellus. Vestibulum a metus lectus. Praesent tempor purus a lacus blandit eget gravida ante hendrerit. Cras et eros metus. Sed commodo malesuada eros, vitae interdum augue semper quis. Fusce id magna nunc. Curabitur sollicitudin placerat semper. Cras et mi neque, a dignissim risus. Nulla venenatis porta lacus, vel rhoncus lectus tempor vitae. Duis sagittis venenatis rutrum. Curabitur tempor massa tortor.";
Lorem.clefpath = "m 95.72971,266.7949 c -5.57504,2.79274 -12.48498,4.1891 -20.72511,4.1891 -9.69981,0 -18.99938,-1.66998 -27.91049,-5.00757 -8.90876,-3.33996 -16.75807,-7.86163 -23.54558,-13.56975 -6.78751,-5.70339 -12.24248,-12.38094 -16.36254,-20.03029 -4.12007,-7.64934 -6.1801,-15.78458 -6.1801,-24.40572 0,-29.26234 20.72746,-61.31506 62.18472,-96.1605 -1.3349,-5.34251 -2.33313,-10.74399 -2.99941,-16.209153 -0.66627,-5.460449 -1.00058,-11.107236 -1.00058,-16.938007 0,-8.010226 0.66392,-15.871864 1.99646,-23.582532 1.3302,-7.710668 3.23955,-14.935434 5.72336,-21.674325 2.48617,-6.738864 5.54208,-12.869193 9.17715,-18.393316 3.63272,-5.5265031 7.814,-10.1708424 12.53677,-13.9306366 16.47555,22.8253826 24.71097,44.6247216 24.71097,65.3862176 0,13.480109 -3.18069,26.321 -9.54442,38.522682 -6.36138,12.20404 -16.32959,24.07079 -29.90225,35.60967 l 7.99763,38.42834 c 4.36256,-0.35616 6.78751,-0.53307 7.2725,-0.53307 6.05767,0 11.72453,1.09209 16.99586,3.27863 5.27368,2.18418 9.88109,5.18919 13.82693,9.01269 3.94349,3.82349 7.07003,8.34517 9.37727,13.56502 2.30488,5.21986 3.4585,10.86193 3.46085,16.93329 -0.002,4.36836 -0.78869,8.68011 -2.36374,12.92581 -1.57504,4.25042 -3.814,8.28856 -6.72159,12.10969 -2.90994,3.82586 -6.36373,7.34272 -10.36137,10.55766 -3.99764,3.21965 -8.42141,5.98172 -13.26896,8.28856 0,-0.24294 0.18129,0.45523 0.54385,2.09218 0.36492,1.63932 0.8193,3.79048 1.36315,6.46291 0.5462,2.67008 1.18187,5.64443 1.90935,8.92306 0.72749,3.27626 1.36316,6.43224 1.90936,9.46556 0.5462,3.03568 1.02884,5.73878 1.45497,8.10222 0.42378,2.37052 0.63567,3.97681 0.63567,4.82595 0,5.70576 -1.21248,10.92561 -3.63508,15.65957 -2.42495,4.73396 -5.69746,8.80041 -9.81988,12.19933 -4.12006,3.39656 -8.90875,6.03833 -14.36136,7.9206 -5.45497,1.88226 -11.21364,2.82339 -17.27602,2.82339 -4.60506,0 -8.90641,-0.72885 -12.90875,-2.18654 -4,-1.45769 -7.515,-3.52157 -10.54502,-6.18929 -3.02765,-2.67244 -5.422,-5.91568 -7.18068,-9.73918 -1.75632,-3.82113 -2.63449,-8.03853 -2.63449,-12.64984 0,-3.27862 0.54621,-6.37563 1.63626,-9.2863 1.09005,-2.91066 2.60623,-5.39912 4.54384,-7.463 1.93996,-2.06389 4.3037,-3.7032 7.09122,-4.91323 2.78987,-1.21474 5.81989,-1.82329 9.09004,-1.82329 2.90994,0 5.63625,0.66988 8.18127,2.00492 2.54502,1.33503 4.72748,3.06634 6.54502,5.18919 1.81754,2.12521 3.27251,4.5547 4.36491,7.2861 1.09005,2.72905 1.63626,5.49111 1.63626,8.28384 0,6.31431 -2.33314,11.4752 -7.00176,15.48267 -4.66627,4.00512 -10.51205,6.37328 -17.54441,7.09976 5.57504,2.79509 11.329,4.19146 17.2666,4.1891 4.8452,0.002 9.57268,-0.87745 14.17773,-2.64177 4.6027,-1.75961 8.62859,-4.12777 12.08474,-7.10212 3.45379,-2.97436 6.24131,-6.43932 8.3602,-10.38547 2.11889,-3.94614 3.18069,-8.16354 3.18069,-12.65692 0,-1.70299 -0.18365,-3.58526 -0.54385,-5.64914 L 95.72971,266.7949 z M 95.18821,27.488123 c -1.21483,-0.243068 -2.30724,-0.365597 -3.27486,-0.365597 -3.75986,0 -7.24661,1.912917 -10.46026,5.738777 -3.21365,3.823478 -6.00352,8.80275 -8.36726,14.933079 -2.36374,6.132684 -4.21188,13.022518 -5.54914,20.671856 -1.33254,7.649365 -2.00117,15.298698 -2.00117,22.948042 0,3.158334 0.12478,6.194011 0.36492,9.10704 0.24485,2.91538 0.67333,5.70811 1.2831,8.37819 24.73216,-21.976242 37.09942,-41.768292 37.09942,-59.373819 0,-8.378205 -3.03237,-15.723276 -9.09475,-22.037568 z m 3.814,231.850857 c 5.94467,-4.37072 10.46026,-9.16837 13.55619,-14.39058 3.09123,-5.21986 4.63802,-10.86429 4.63802,-16.93801 0,-3.76216 -0.63802,-7.4347 -1.91171,-11.01996 -1.27134,-3.57818 -3.08887,-6.76718 -5.45497,-9.56227 -2.36609,-2.78801 -5.18657,-5.03588 -8.46143,-6.7318 -3.27486,-1.69828 -6.85108,-2.54506 -10.72865,-2.54506 -0.24249,0 -0.72749,0.0307 -1.45497,0.0873 -0.72513,0.0613 -1.75633,0.15097 -3.08887,0.2689 l 12.90639,60.83151 z M 81.56374,199.26225 c -3.75749,0.48354 -7.2725,1.42468 -10.545,2.82104 -3.27251,1.39637 -6.08828,3.12767 -8.45202,5.19155 -2.36374,2.06389 -4.24249,4.43205 -5.63625,7.10212 -1.39376,2.67244 -2.09064,5.58546 -2.09064,8.7438 0,9.34762 4.96527,17.11962 14.88874,23.31127 -8.24013,-1.33503 -14.84636,-4.52167 -19.81634,-9.56227 -4.96997,-5.03823 -7.45378,-11.38084 -7.45378,-19.03255 0,-4.49101 0.93937,-8.83106 2.81812,-13.02016 1.87875,-4.18909 4.39317,-7.95598 7.54325,-11.30065 3.15479,-3.34703 6.85108,-6.23647 11.09121,-8.66595 4.24249,-2.43421 8.72748,-4.13721 13.45261,-5.10664 l -7.63507,-36.42579 c -17.08768,12.86684 -30.02468,25.49546 -38.81101,37.88112 -8.78633,12.38567 -13.1795,24.64868 -13.1795,36.79139 0,6.67755 1.48322,12.99421 4.45438,18.94292 2.97115,5.95106 6.9735,11.14026 12.00469,15.5723 5.03119,4.4344 10.85107,7.92531 17.45966,10.47274 6.60623,2.55214 13.60563,3.82821 20.9982,3.82821 4.24249,0 8.18127,-0.39627 11.81634,-1.18408 3.63743,-0.79017 7.03001,-2.03558 10.1801,-3.73386 L 81.56374,199.26225 z";
Xml.Element = 0;
Xml.PCData = 1;
Xml.CData = 2;
Xml.Comment = 3;
Xml.DocType = 4;
Xml.ProcessingInstruction = 5;
Xml.Document = 6;
cx_GUID.CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
cx_MathTools.EPSILON = 0.0000000000009;
cx_MathTools.PI2Over360 = 2 * Math.PI / 360;
cx_SvgTest.LINES = "M 50, 50 L 150, 50 150, 100 50,100 Z";
cx_SvgTest.CURVES = " M200,250 l 50,-25 a25,25 -30 0,1 50,-25 l 50,-25 a25,50 -30 0,1 50,-25 l 50,-25 a25,75 -30 0,1 50,-25 l 50,-25 a25, 100 -30 0, 1 50, -25 l 50, -25";
cx_SvgTest.CURVES2 = "M100,0 a100,100 0 0,0 -100,100 z";
cx_SvgTest.CURVES3 = "M 100 100 a 100 100 80 1 1 200 0";
cx_SvgTest.CUBICS = "M200,300 Q400,50 600,300 T1000,300";
cx_SvgTest.QUADR = "M100,200 C100,100 250,100 250,200 S400,300 400,200";
cx_SvgTest.GCLEF = "m 95.72971,266.7949 c -5.57504,2.79274 -12.48498,4.1891 -20.72511,4.1891 -9.69981,0 -18.99938,-1.66998 -27.91049,-5.00757 -8.90876,-3.33996 -16.75807,-7.86163 -23.54558,-13.56975 -6.78751,-5.70339 -12.24248,-12.38094 -16.36254,-20.03029 -4.12007,-7.64934 -6.1801,-15.78458 -6.1801,-24.40572 0,-29.26234 20.72746,-61.31506 62.18472,-96.1605 -1.3349,-5.34251 -2.33313,-10.74399 -2.99941,-16.209153 -0.66627,-5.460449 -1.00058,-11.107236 -1.00058,-16.938007 0,-8.010226 0.66392,-15.871864 1.99646,-23.582532 1.3302,-7.710668 3.23955,-14.935434 5.72336,-21.674325 2.48617,-6.738864 5.54208,-12.869193 9.17715,-18.393316 3.63272,-5.5265031 7.814,-10.1708424 12.53677,-13.9306366 16.47555,22.8253826 24.71097,44.6247216 24.71097,65.3862176 0,13.480109 -3.18069,26.321 -9.54442,38.522682 -6.36138,12.20404 -16.32959,24.07079 -29.90225,35.60967 l 7.99763,38.42834 c 4.36256,-0.35616 6.78751,-0.53307 7.2725,-0.53307 6.05767,0 11.72453,1.09209 16.99586,3.27863 5.27368,2.18418 9.88109,5.18919 13.82693,9.01269 3.94349,3.82349 7.07003,8.34517 9.37727,13.56502 2.30488,5.21986 3.4585,10.86193 3.46085,16.93329 -0.002,4.36836 -0.78869,8.68011 -2.36374,12.92581 -1.57504,4.25042 -3.814,8.28856 -6.72159,12.10969 -2.90994,3.82586 -6.36373,7.34272 -10.36137,10.55766 -3.99764,3.21965 -8.42141,5.98172 -13.26896,8.28856 0,-0.24294 0.18129,0.45523 0.54385,2.09218 0.36492,1.63932 0.8193,3.79048 1.36315,6.46291 0.5462,2.67008 1.18187,5.64443 1.90935,8.92306 0.72749,3.27626 1.36316,6.43224 1.90936,9.46556 0.5462,3.03568 1.02884,5.73878 1.45497,8.10222 0.42378,2.37052 0.63567,3.97681 0.63567,4.82595 0,5.70576 -1.21248,10.92561 -3.63508,15.65957 -2.42495,4.73396 -5.69746,8.80041 -9.81988,12.19933 -4.12006,3.39656 -8.90875,6.03833 -14.36136,7.9206 -5.45497,1.88226 -11.21364,2.82339 -17.27602,2.82339 -4.60506,0 -8.90641,-0.72885 -12.90875,-2.18654 -4,-1.45769 -7.515,-3.52157 -10.54502,-6.18929 -3.02765,-2.67244 -5.422,-5.91568 -7.18068,-9.73918 -1.75632,-3.82113 -2.63449,-8.03853 -2.63449,-12.64984 0,-3.27862 0.54621,-6.37563 1.63626,-9.2863 1.09005,-2.91066 2.60623,-5.39912 4.54384,-7.463 1.93996,-2.06389 4.3037,-3.7032 7.09122,-4.91323 2.78987,-1.21474 5.81989,-1.82329 9.09004,-1.82329 2.90994,0 5.63625,0.66988 8.18127,2.00492 2.54502,1.33503 4.72748,3.06634 6.54502,5.18919 1.81754,2.12521 3.27251,4.5547 4.36491,7.2861 1.09005,2.72905 1.63626,5.49111 1.63626,8.28384 0,6.31431 -2.33314,11.4752 -7.00176,15.48267 -4.66627,4.00512 -10.51205,6.37328 -17.54441,7.09976 5.57504,2.79509 11.329,4.19146 17.2666,4.1891 4.8452,0.002 9.57268,-0.87745 14.17773,-2.64177 4.6027,-1.75961 8.62859,-4.12777 12.08474,-7.10212 3.45379,-2.97436 6.24131,-6.43932 8.3602,-10.38547 2.11889,-3.94614 3.18069,-8.16354 3.18069,-12.65692 0,-1.70299 -0.18365,-3.58526 -0.54385,-5.64914 L 95.72971,266.7949 z M 95.18821,27.488123 c -1.21483,-0.243068 -2.30724,-0.365597 -3.27486,-0.365597 -3.75986,0 -7.24661,1.912917 -10.46026,5.738777 -3.21365,3.823478 -6.00352,8.80275 -8.36726,14.933079 -2.36374,6.132684 -4.21188,13.022518 -5.54914,20.671856 -1.33254,7.649365 -2.00117,15.298698 -2.00117,22.948042 0,3.158334 0.12478,6.194011 0.36492,9.10704 0.24485,2.91538 0.67333,5.70811 1.2831,8.37819 24.73216,-21.976242 37.09942,-41.768292 37.09942,-59.373819 0,-8.378205 -3.03237,-15.723276 -9.09475,-22.037568 z m 3.814,231.850857 c 5.94467,-4.37072 10.46026,-9.16837 13.55619,-14.39058 3.09123,-5.21986 4.63802,-10.86429 4.63802,-16.93801 0,-3.76216 -0.63802,-7.4347 -1.91171,-11.01996 -1.27134,-3.57818 -3.08887,-6.76718 -5.45497,-9.56227 -2.36609,-2.78801 -5.18657,-5.03588 -8.46143,-6.7318 -3.27486,-1.69828 -6.85108,-2.54506 -10.72865,-2.54506 -0.24249,0 -0.72749,0.0307 -1.45497,0.0873 -0.72513,0.0613 -1.75633,0.15097 -3.08887,0.2689 l 12.90639,60.83151 z M 81.56374,199.26225 c -3.75749,0.48354 -7.2725,1.42468 -10.545,2.82104 -3.27251,1.39637 -6.08828,3.12767 -8.45202,5.19155 -2.36374,2.06389 -4.24249,4.43205 -5.63625,7.10212 -1.39376,2.67244 -2.09064,5.58546 -2.09064,8.7438 0,9.34762 4.96527,17.11962 14.88874,23.31127 -8.24013,-1.33503 -14.84636,-4.52167 -19.81634,-9.56227 -4.96997,-5.03823 -7.45378,-11.38084 -7.45378,-19.03255 0,-4.49101 0.93937,-8.83106 2.81812,-13.02016 1.87875,-4.18909 4.39317,-7.95598 7.54325,-11.30065 3.15479,-3.34703 6.85108,-6.23647 11.09121,-8.66595 4.24249,-2.43421 8.72748,-4.13721 13.45261,-5.10664 l -7.63507,-36.42579 c -17.08768,12.86684 -30.02468,25.49546 -38.81101,37.88112 -8.78633,12.38567 -13.1795,24.64868 -13.1795,36.79139 0,6.67755 1.48322,12.99421 4.45438,18.94292 2.97115,5.95106 6.9735,11.14026 12.00469,15.5723 5.03119,4.4344 10.85107,7.92531 17.45966,10.47274 6.60623,2.55214 13.60563,3.82821 20.9982,3.82821 4.24249,0 8.18127,-0.39627 11.81634,-1.18408 3.63743,-0.79017 7.03001,-2.03558 10.1801,-3.73386 L 81.56374,199.26225 z";
cx_SvgTest.CCLEF = "M 90,276 C 86,276 81,275 77,274 73,273 70,271 67,268 64,266 61,263 60,260 58,256 57,253 57,249 57,247 57,245 58,243 59,241 60,239 61,238 63,236 64,235 66,234 68,233 70,232 72,232 74,232 76,233 77,233 79,234 81,236 82,237 84,238 85,240 86,242 87,244 87,246 87,248 87,250 86,252 85,253 84,255 82,256 80,258 79,259 77,260 76,261 75,262 74,262 74,263 74,267 79,269 88,269 92,269 96,268 98,267 101,266 103,264 105,261 107,258 108,255 109,250 110,245 110,239 110,232 110,228 110,224 109,220 108,216 107,212 105,210 104,207 102,204 100,203 98,201 96,200 93,200 84,200 76,207 67,222 66,217 65,213 64,209 63,205 62,201 60,199 59,196 57,193 55,192 53,190 52,189 49,189 48,189 47,189 46,190 L 46,275 39,275 39,93 46,93 46,179 C 46,179 47,179 47,179 48,180 48,180 49,180 51,180 53,179 55,177 57,175 59,173 60,170 62,167 63,163 64,159 65,155 66,151 67,147 77,160 86,166 92,166 94,166 97,165 99,164 101,162 103,160 104,157 106,155 107,151 108,148 109,144 109,140 109,135 109,128 109,122 108,117 107,113 106,109 104,107 102,104 99,102 96,101 93,100 89,100 84,100 75,100 71,102 71,105 71,106 73,107 75,108 80,110 83,112 85,114 86,116 87,118 87,121 87,123 87,124 86,126 85,128 84,130 83,131 81,133 80,134 78,135 76,136 74,137 72,137 68,137 64,135 61,132 58,129 56,125 56,120 56,114 58,108 62,102 66,98 70,95 74,94 79,93 83,92 88,92 95,92 101,93 106,95 112,96 116,99 120,102 124,105 127,110 129,114 131,119 132,125 132,131 132,136 131,142 129,147 128,152 125,157 122,161 119,165 116,168 112,170 108,173 103,174 98,174 89,174 81,172 76,169 L 76,169 C 74,169 72,170 71,173 70,175 69,178 69,182 69,184 69,186 69,188 70,191 70,193 71,194 72,196 72,197 73,198 74,199 75,200 76,200 79,197 82,194 86,193 89,191 93,190 97,190 102,190 107,191 111,194 116,196 120,200 123,204 126,209 129,214 130,219 132,225 133,231 133,237 133,250 129,259 122,266 114,273 104,276 90,276 Z M 27,93 L 27,275 4,275 4,93 27,93 Z";
cx_SvgTest.FCLEF = "M 8,240 C 21,236 32,230 39,224 45,218 51,211 57,204 62,197 67,190 70,183 74,176 77,168 79,161 81,153 82,146 82,139 82,133 81,127 80,122 78,118 76,113 73,110 70,106 66,103 62,101 58,99 53,98 48,98 44,98 41,99 37,100 33,101 30,103 27,106 24,108 22,111 20,114 18,117 17,120 17,123 17,125 17,126 18,126 18,126 18,126 19,125 20,125 20,124 22,123 23,123 24,122 26,122 27,121 29,121 31,121 33,121 35,121 36,122 38,123 40,124 41,126 42,127 43,129 44,131 45,133 45,135 45,137 45,143 43,147 40,151 36,155 32,157 26,157 23,157 20,156 18,155 16,154 14,152 12,149 10,147 9,144 8,141 7,138 7,134 7,131 7,126 8,121 11,116 13,111 16,107 21,104 25,101 29,98 35,96 40,94 46,93 52,93 62,93 71,95 78,98 85,101 91,105 95,111 99,116 102,122 104,128 105,134 106,140 106,147 106,150 106,154 105,157 105,161 104,164 102,168 101,172 99,176 97,180 94,185 91,190 88,195 84,202 78,209 71,215 64,221 57,226 50,230 43,235 36,238 29,240 23,243 18,244 14,244 10,244 8,243 8,240 Z M 121,116 C 121,113 122,111 124,110 125,108 127,107 130,107 133,107 135,108 136,110 138,111 139,113 139,116 139,119 138,121 136,122 135,124 133,125 130,125 127,125 125,124 124,122 122,121 121,119 121,116 Z M 121,162 C 121,159 122,157 124,156 125,154 127,153 130,153 133,153 135,154 136,156 138,157 139,159 139,162 139,165 138,167 136,168 135,170 133,171 130,171 127,171 125,170 124,168 122,167 121,165 121,162 Z";
haxe_ds_ObjectMap.count = 0;
haxe_io_FPHelper.i64tmp = (function($this) {
	var $r;
	var x = new haxe__$Int64__$_$_$Int64(0,0);
	$r = x;
	return $r;
}(this));
haxe_xml_Parser.escapes = (function($this) {
	var $r;
	var h = new haxe_ds_StringMap();
	if(__map_reserved.lt != null) h.setReserved("lt","<"); else h.h["lt"] = "<";
	if(__map_reserved.gt != null) h.setReserved("gt",">"); else h.h["gt"] = ">";
	if(__map_reserved.amp != null) h.setReserved("amp","&"); else h.h["amp"] = "&";
	if(__map_reserved.quot != null) h.setReserved("quot","\""); else h.h["quot"] = "\"";
	if(__map_reserved.apos != null) h.setReserved("apos","'"); else h.h["apos"] = "'";
	$r = h;
	return $r;
}(this));
js_Boot.__toStr = {}.toString;
js_html_compat_Uint8Array.BYTES_PER_ELEMENT = 1;
nx3_Constants.BASE_NOTE_VALUE = 3024;
nx3_Constants.STAVE_LENGTH = 6.8;
nx3_Constants.STAVE_BASIC_LENGTH = 7;
nx3_Constants.SIGN_TO_NOTE_DISTANCE = 0.8;
nx3_Constants.COMPLEX_COLLISION_OVERLAP_XTRA = 0.6;
nx3_Constants.SIGN_NORMAL_WIDTH = 2.6;
nx3_Constants.SIGN_PARENTHESIS_WIDTH = 4.4;
nx3_Constants.HEAD_ADJUST_X = 0;
nx3_Constants.COMPLEX_COLLISION_ADJUST_SAMELINE = 3.0;
nx3_Constants.COMPLEX_COLLISION_ADJUST_NEXTLINE = 2.2;
nx3_Constants.COMPLEX_COLLISION_ADJUST_SAMELINE_WHOLE = 4.3;
nx3_Constants.COMPLEX_COLLISION_ADJUST_NEXTLINE_WHOLE = 4;
nx3_Constants.NOTE_STEM_X_NORMAL = 1.6;
nx3_Constants.HEAD_WIDTH_NORMAL = 3.2;
nx3_Constants.HEAD_HALFWIDTH_NORMAL = 1.6;
nx3_Constants.HEAD_HALFWIDTH_WIDE = 2.2;
nx3_Constants.COMPLEX_COLLISION_CHORD_INTERSECTION = 0.8;
nx3_Constants.COMPLEX_COLLISION_NEXTLINEDELTA = 0.7;
nx3_Constants.COMPLEX_COLLISION_NEXTLINEDELTA_H1 = 0.9;
nx3_Constants.DOT_WIDTH = 2.0;
nx3_Constants.DDOT_WIDTH = 3.0;
nx3_Constants.FLAG_HEIGHT = 4.8;
nx3_Constants.FLAG_WIDTH = 2.6;
nx3_Constants.FLOAT_QUASI_ZERO = 0.0000001;
nx3_Constants.FONT_TEXT_DEFAULTFORMAT = { name : "Georgia", size : 20, bold : false, italic : false};
nx3_Constants.JS_CANVAS_TEXT_MEASUREMENT = "CanvasTextMeasurement";
nx3_Constants.FONT_TEXT_X_ADJUST_SVG = 4;
nx3_Constants.FONT_TEXT_Y_ADJUST_SVG = -3;
nx3_Constants.FONT_TEXT_Y_ADJUST_FLASH = -1.2;
nx3_Constants.FONT_TEXT_X_ADJUST_FLASH = -.3;
nx3_Constants.FONT_TEXT_X_ADJUST_SYS = 0;
nx3_Constants.FONT_TEXT_Y_ADJUST_SYS = -6;
nx3_Constants.BEAM_HEIGHT = 0.95;
nx3_Constants.TIE_WIDTH_CHORD = 3.2;
nx3_Constants.TIE_WIDTH_SINGLE = 3;
nx3_Constants.TIE_HEIGHT = 1.6;
nx3_Constants.LEGER_MARGIN = 0.6;
nx3_Constants.OBJECT_XMARGIN = 0.6;
nx3_Constants.ATTRIBUTE_SIGN_WIDTH = 2.4;
nx3_Constants.SCORE_DEFAULT_COUNTIN = 0;
nx3_Constants.SCORE_DEFAULT_TEMPO = 80;
nx3_Constants.BAR_SPACING_DEFAULT = 8;
nx3_ENoteValTools.DOT = 1.5;
nx3_ENoteValTools.DOTDOT = 1.75;
nx3_ENoteValTools.TRI = 0.66666666;
nx3_ENoteValTools.N1 = 4;
nx3_ENoteValTools.N2 = 2;
nx3_ENoteValTools.N4 = 1;
nx3_ENoteValTools.N8 = .5;
nx3_ENoteValTools.N16 = .25;
nx3_ENoteValTools.N32 = .125;
nx3_ENoteValTools.valNv1 = 12096;
nx3_ENoteValTools.valNv1dot = 18144;
nx3_ENoteValTools.valNv1ddot = 21168;
nx3_ENoteValTools.valNv1tri = 8063;
nx3_ENoteValTools.valNv2 = 6048;
nx3_ENoteValTools.valNv2dot = 9072;
nx3_ENoteValTools.valNv2ddot = 10584;
nx3_ENoteValTools.valNv2tri = 4031;
nx3_ENoteValTools.valNv4 = 3024;
nx3_ENoteValTools.valNv4dot = 4536;
nx3_ENoteValTools.valNv4ddot = 5292;
nx3_ENoteValTools.valNv4tri = 2015;
nx3_ENoteValTools.valNv8 = 1512;
nx3_ENoteValTools.valNv8dot = 2268;
nx3_ENoteValTools.valNv8ddot = 2646;
nx3_ENoteValTools.valNv8tri = 1007;
nx3_ENoteValTools.valNv16 = 756;
nx3_ENoteValTools.valNv16dot = 1134;
nx3_ENoteValTools.valNv16ddot = 1323;
nx3_ENoteValTools.valNv16tri = 503;
nx3_ENoteValTools.valNv32 = 378;
nx3_ENoteValTools.valNv32dot = 567;
nx3_ENoteValTools.valNv32ddot = 661;
nx3_ENoteValTools.valNv32tri = 251;
nx3_PBaseRectCalculator.BASERECT_HEIGHT = 3;
nx3_PBaseRectCalculator.BASERECT_HEIGHT_X_2 = 6.;
nx3_PBaseRectCalculator.BASERECT_MARGIN = 0.6;
nx3_PBaseRectCalculator.BASERECT_MARGIN_X_2 = 1.2;
nx3_PColumnsAllotmentCalculator.delta = 0.5;
nx3_PSystemBarsGenerator.defaultClef = nx3_EClef.ClefF;
nx3_PSystemBarsGenerator.defaultKey = nx3_EKey.Flat2;
nx3_qs_QSParserTools.relaceSlash = "---";
nx3_render_TargetPdfkit.SVG_SCALE = 0.178;
nx3_render_TargetSvgXml.SVG_EXTRA_HEIGHT = 5;
nx3_render_scaling_Scaling.MID = { linesWidth : 1.25, space : 12.0, unitY : 6.0, noteWidth : 10, unitX : 5, quarterNoteWidth : 2.5, signPosWidth : 14.0, svgScale : .27, svgX : 0, svgY : -55.0, fontScaling : 1.5};
nx3_render_scaling_Scaling.NORMAL = { linesWidth : .75, space : 8.0, unitY : 4.0, noteWidth : 7.0, unitX : 3.5, quarterNoteWidth : 1.75, signPosWidth : 9.5, svgScale : .175, svgX : 0, svgY : -36.0, fontScaling : 1.0};
nx3_render_scaling_Scaling.SMALL = { linesWidth : .5, space : 6.0, unitY : 3.0, noteWidth : 5.0, unitX : 2.5, quarterNoteWidth : 1.25, signPosWidth : 7.0, svgScale : .14, svgX : 0, svgY : -28.5, fontScaling : 0.75};
nx3_render_scaling_Scaling.MINI = { linesWidth : .5, space : 4.0, unitY : 2.0, noteWidth : 3.3333333333333335, unitX : 1.6666666666666667, quarterNoteWidth : 0.83333333333333337, signPosWidth : 4.666666666666667, svgScale : 0.093333333333333338, svgX : 0, svgY : -19., fontScaling : 0.5};
nx3_render_scaling_Scaling.BIG = { linesWidth : 1.5, space : 16.0, unitY : 8.0, noteWidth : 14.0, unitX : 7.0, quarterNoteWidth : 5.5, signPosWidth : 19.0, svgScale : .36, svgX : -0.0, svgY : -74.0, fontScaling : 2.0};
nx3_render_scaling_Scaling.PRINT1 = { linesWidth : 3, space : 32.0, unitY : 16.0, noteWidth : 28.0, unitX : 14.0, quarterNoteWidth : 11.0, signPosWidth : 38.0, svgScale : .72, svgX : -0.0, svgY : -148.0, fontScaling : 4.0};
nx3_render_svg_SvgElements.pauseNv2 = "<svg><g><rect height=\"23\" width=\"50\" x=\"8\" y=\"210\" /></g></svg>";
nx3_render_svg_SvgElements.pauseNv1 = "<svg><g><rect height=\"26\" width=\"50\" x=\"8\" y=\"234\" /></g></svg>";
nx3_render_svg_SvgElements.clefG = "<svg><g><path style=\"fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke:none\"\r\n\t\t\td=\"m 95.72971,266.7949 c -5.57504,2.79274 -12.48498,4.1891 -20.72511,4.1891 -9.69981,0 -18.99938,-1.66998 -27.91049,-5.00757 -8.90876,-3.33996 -16.75807,-7.86163 -23.54558,-13.56975 -6.78751,-5.70339 -12.24248,-12.38094 -16.36254,-20.03029 -4.12007,-7.64934 -6.1801,-15.78458 -6.1801,-24.40572 0,-29.26234 20.72746,-61.31506 62.18472,-96.1605 -1.3349,-5.34251 -2.33313,-10.74399 -2.99941,-16.209153 -0.66627,-5.460449 -1.00058,-11.107236 -1.00058,-16.938007 0,-8.010226 0.66392,-15.871864 1.99646,-23.582532 1.3302,-7.710668 3.23955,-14.935434 5.72336,-21.674325 2.48617,-6.738864 5.54208,-12.869193 9.17715,-18.393316 3.63272,-5.5265031 7.814,-10.1708424 12.53677,-13.9306366 16.47555,22.8253826 24.71097,44.6247216 24.71097,65.3862176 0,13.480109 -3.18069,26.321 -9.54442,38.522682 -6.36138,12.20404 -16.32959,24.07079 -29.90225,35.60967 l 7.99763,38.42834 c 4.36256,-0.35616 6.78751,-0.53307 7.2725,-0.53307 6.05767,0 11.72453,1.09209 16.99586,3.27863 5.27368,2.18418 9.88109,5.18919 13.82693,9.01269 3.94349,3.82349 7.07003,8.34517 9.37727,13.56502 2.30488,5.21986 3.4585,10.86193 3.46085,16.93329 -0.002,4.36836 -0.78869,8.68011 -2.36374,12.92581 -1.57504,4.25042 -3.814,8.28856 -6.72159,12.10969 -2.90994,3.82586 -6.36373,7.34272 -10.36137,10.55766 -3.99764,3.21965 -8.42141,5.98172 -13.26896,8.28856 0,-0.24294 0.18129,0.45523 0.54385,2.09218 0.36492,1.63932 0.8193,3.79048 1.36315,6.46291 0.5462,2.67008 1.18187,5.64443 1.90935,8.92306 0.72749,3.27626 1.36316,6.43224 1.90936,9.46556 0.5462,3.03568 1.02884,5.73878 1.45497,8.10222 0.42378,2.37052 0.63567,3.97681 0.63567,4.82595 0,5.70576 -1.21248,10.92561 -3.63508,15.65957 -2.42495,4.73396 -5.69746,8.80041 -9.81988,12.19933 -4.12006,3.39656 -8.90875,6.03833 -14.36136,7.9206 -5.45497,1.88226 -11.21364,2.82339 -17.27602,2.82339 -4.60506,0 -8.90641,-0.72885 -12.90875,-2.18654 -4,-1.45769 -7.515,-3.52157 -10.54502,-6.18929 -3.02765,-2.67244 -5.422,-5.91568 -7.18068,-9.73918 -1.75632,-3.82113 -2.63449,-8.03853 -2.63449,-12.64984 0,-3.27862 0.54621,-6.37563 1.63626,-9.2863 1.09005,-2.91066 2.60623,-5.39912 4.54384,-7.463 1.93996,-2.06389 4.3037,-3.7032 7.09122,-4.91323 2.78987,-1.21474 5.81989,-1.82329 9.09004,-1.82329 2.90994,0 5.63625,0.66988 8.18127,2.00492 2.54502,1.33503 4.72748,3.06634 6.54502,5.18919 1.81754,2.12521 3.27251,4.5547 4.36491,7.2861 1.09005,2.72905 1.63626,5.49111 1.63626,8.28384 0,6.31431 -2.33314,11.4752 -7.00176,15.48267 -4.66627,4.00512 -10.51205,6.37328 -17.54441,7.09976 5.57504,2.79509 11.329,4.19146 17.2666,4.1891 4.8452,0.002 9.57268,-0.87745 14.17773,-2.64177 4.6027,-1.75961 8.62859,-4.12777 12.08474,-7.10212 3.45379,-2.97436 6.24131,-6.43932 8.3602,-10.38547 2.11889,-3.94614 3.18069,-8.16354 3.18069,-12.65692 0,-1.70299 -0.18365,-3.58526 -0.54385,-5.64914 L 95.72971,266.7949 z M 95.18821,27.488123 c -1.21483,-0.243068 -2.30724,-0.365597 -3.27486,-0.365597 -3.75986,0 -7.24661,1.912917 -10.46026,5.738777 -3.21365,3.823478 -6.00352,8.80275 -8.36726,14.933079 -2.36374,6.132684 -4.21188,13.022518 -5.54914,20.671856 -1.33254,7.649365 -2.00117,15.298698 -2.00117,22.948042 0,3.158334 0.12478,6.194011 0.36492,9.10704 0.24485,2.91538 0.67333,5.70811 1.2831,8.37819 24.73216,-21.976242 37.09942,-41.768292 37.09942,-59.373819 0,-8.378205 -3.03237,-15.723276 -9.09475,-22.037568 z m 3.814,231.850857 c 5.94467,-4.37072 10.46026,-9.16837 13.55619,-14.39058 3.09123,-5.21986 4.63802,-10.86429 4.63802,-16.93801 0,-3.76216 -0.63802,-7.4347 -1.91171,-11.01996 -1.27134,-3.57818 -3.08887,-6.76718 -5.45497,-9.56227 -2.36609,-2.78801 -5.18657,-5.03588 -8.46143,-6.7318 -3.27486,-1.69828 -6.85108,-2.54506 -10.72865,-2.54506 -0.24249,0 -0.72749,0.0307 -1.45497,0.0873 -0.72513,0.0613 -1.75633,0.15097 -3.08887,0.2689 l 12.90639,60.83151 z M 81.56374,199.26225 c -3.75749,0.48354 -7.2725,1.42468 -10.545,2.82104 -3.27251,1.39637 -6.08828,3.12767 -8.45202,5.19155 -2.36374,2.06389 -4.24249,4.43205 -5.63625,7.10212 -1.39376,2.67244 -2.09064,5.58546 -2.09064,8.7438 0,9.34762 4.96527,17.11962 14.88874,23.31127 -8.24013,-1.33503 -14.84636,-4.52167 -19.81634,-9.56227 -4.96997,-5.03823 -7.45378,-11.38084 -7.45378,-19.03255 0,-4.49101 0.93937,-8.83106 2.81812,-13.02016 1.87875,-4.18909 4.39317,-7.95598 7.54325,-11.30065 3.15479,-3.34703 6.85108,-6.23647 11.09121,-8.66595 4.24249,-2.43421 8.72748,-4.13721 13.45261,-5.10664 l -7.63507,-36.42579 c -17.08768,12.86684 -30.02468,25.49546 -38.81101,37.88112 -8.78633,12.38567 -13.1795,24.64868 -13.1795,36.79139 0,6.67755 1.48322,12.99421 4.45438,18.94292 2.97115,5.95106 6.9735,11.14026 12.00469,15.5723 5.03119,4.4344 10.85107,7.92531 17.45966,10.47274 6.60623,2.55214 13.60563,3.82821 20.9982,3.82821 4.24249,0 8.18127,-0.39627 11.81634,-1.18408 3.63743,-0.79017 7.03001,-2.03558 10.1801,-3.73386 L 81.56374,199.26225 z\" />\r\n\t\t</g></svg>";
nx3_render_svg_SvgElements.clefC = "<svg><g><path style=\"fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke:none\"\r\n\t\t\td=\"M 90,276 C 86,276 81,275 77,274 73,273 70,271 67,268 64,266 61,263 60,260 58,256 57,253 57,249 57,247 57,245 58,243 59,241 60,239 61,238 63,236 64,235 66,234 68,233 70,232 72,232 74,232 76,233 77,233 79,234 81,236 82,237 84,238 85,240 86,242 87,244 87,246 87,248 87,250 86,252 85,253 84,255 82,256 80,258 79,259 77,260 76,261 75,262 74,262 74,263 74,267 79,269 88,269 92,269 96,268 98,267 101,266 103,264 105,261 107,258 108,255 109,250 110,245 110,239 110,232 110,228 110,224 109,220 108,216 107,212 105,210 104,207 102,204 100,203 98,201 96,200 93,200 84,200 76,207 67,222 66,217 65,213 64,209 63,205 62,201 60,199 59,196 57,193 55,192 53,190 52,189 49,189 48,189 47,189 46,190 L 46,275 39,275 39,93 46,93 46,179 C 46,179 47,179 47,179 48,180 48,180 49,180 51,180 53,179 55,177 57,175 59,173 60,170 62,167 63,163 64,159 65,155 66,151 67,147 77,160 86,166 92,166 94,166 97,165 99,164 101,162 103,160 104,157 106,155 107,151 108,148 109,144 109,140 109,135 109,128 109,122 108,117 107,113 106,109 104,107 102,104 99,102 96,101 93,100 89,100 84,100 75,100 71,102 71,105 71,106 73,107 75,108 80,110 83,112 85,114 86,116 87,118 87,121 87,123 87,124 86,126 85,128 84,130 83,131 81,133 80,134 78,135 76,136 74,137 72,137 68,137 64,135 61,132 58,129 56,125 56,120 56,114 58,108 62,102 66,98 70,95 74,94 79,93 83,92 88,92 95,92 101,93 106,95 112,96 116,99 120,102 124,105 127,110 129,114 131,119 132,125 132,131 132,136 131,142 129,147 128,152 125,157 122,161 119,165 116,168 112,170 108,173 103,174 98,174 89,174 81,172 76,169 L 76,169 C 74,169 72,170 71,173 70,175 69,178 69,182 69,184 69,186 69,188 70,191 70,193 71,194 72,196 72,197 73,198 74,199 75,200 76,200 79,197 82,194 86,193 89,191 93,190 97,190 102,190 107,191 111,194 116,196 120,200 123,204 126,209 129,214 130,219 132,225 133,231 133,237 133,250 129,259 122,266 114,273 104,276 90,276 Z M 27,93 L 27,275 4,275 4,93 27,93 Z\"/>\r\n\t\t</g></svg>";
nx3_render_svg_SvgElements.clefF = "<svg><g><path style=\"fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke:none\"\r\n\t\t\td=\"M 8,240 C 21,236 32,230 39,224 45,218 51,211 57,204 62,197 67,190 70,183 74,176 77,168 79,161 81,153 82,146 82,139 82,133 81,127 80,122 78,118 76,113 73,110 70,106 66,103 62,101 58,99 53,98 48,98 44,98 41,99 37,100 33,101 30,103 27,106 24,108 22,111 20,114 18,117 17,120 17,123 17,125 17,126 18,126 18,126 18,126 19,125 20,125 20,124 22,123 23,123 24,122 26,122 27,121 29,121 31,121 33,121 35,121 36,122 38,123 40,124 41,126 42,127 43,129 44,131 45,133 45,135 45,137 45,143 43,147 40,151 36,155 32,157 26,157 23,157 20,156 18,155 16,154 14,152 12,149 10,147 9,144 8,141 7,138 7,134 7,131 7,126 8,121 11,116 13,111 16,107 21,104 25,101 29,98 35,96 40,94 46,93 52,93 62,93 71,95 78,98 85,101 91,105 95,111 99,116 102,122 104,128 105,134 106,140 106,147 106,150 106,154 105,157 105,161 104,164 102,168 101,172 99,176 97,180 94,185 91,190 88,195 84,202 78,209 71,215 64,221 57,226 50,230 43,235 36,238 29,240 23,243 18,244 14,244 10,244 8,243 8,240 Z M 121,116 C 121,113 122,111 124,110 125,108 127,107 130,107 133,107 135,108 136,110 138,111 139,113 139,116 139,119 138,121 136,122 135,124 133,125 130,125 127,125 125,124 124,122 122,121 121,119 121,116 Z M 121,162 C 121,159 122,157 124,156 125,154 127,153 130,153 133,153 135,154 136,156 138,157 139,159 139,162 139,165 138,167 136,168 135,170 133,171 130,171 127,171 125,170 124,168 122,167 121,165 121,162 Z\"/>\r\n\t\t</g></svg>";
nx3_render_svg_SvgElements.HVT4 = nx3_render_svg_SvgElements.noteBlack;
nx3_render_svg_SvgElements.noteBlack = "<svg><g><path style=\"fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke:none\"\r\n\t\t\td = \"m 20.557649,250.57631 c -5.81753,-0.002 -10.6650905,-1.36806 -14.5450105,-4.0971 -3.87756,-2.73612 -5.81516995,-6.6516 -5.81516995,-11.74881 0,-4.12777 1.30193995,-8.10458 3.90816995,-11.92807 2.60387,-3.82585 5.9069905,-7.19411 9.9070005,-10.1095 3.99998,-2.91302 8.452014,-5.24816 13.360774,-7.01013 4.90876,-1.7596 9.66448,-2.63941 14.2719,-2.63941 6.1801,0 11.17834,1.42467 14.99703,4.27637 3.81636,2.85406 5.72572,6.70821 5.72572,11.56483 0,4.00747 -1.30195,7.92295 -3.90817,11.7488 -2.60623,3.8235 -5.93761,7.19412 -9.99882,10.10714 -4.05885,2.91303 -8.54382,5.27883 -13.45258,7.10448 -4.90878,1.81858 -9.72573,2.72905 -14.450844,2.7314 z\" />\r\n\t\t</g></svg>";
nx3_render_svg_SvgElements.HVT2 = nx3_render_svg_SvgElements.noteWhite;
nx3_render_svg_SvgElements.noteWhite = "<svg><g><path style=\"fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke:none\"\r\n\t\t\td=\"m -0.01820308,235.29885 c 0,-4.12777 1.15125988,-8.19421 3.45376988,-12.20168 2.30253,-4.00747 5.3325496,-7.55735 9.0900592,-10.65436 3.7575,-3.09701 7.96936,-5.58546 12.63565,-7.46772 4.66627,-1.88227 9.30428,-2.8234 13.90934,-2.8234 7.63741,0 13.69743,1.60865 18.18243,4.82831 4.48262,3.2173 6.72393,7.73898 6.72863,13.56739 -0.005,4.25042 -1.21482,8.25553 -3.63977,12.02006 -2.4226,3.76452 -5.57504,7.04315 -9.4526,9.83588 -3.87756,2.79037 -8.30134,5.00522 -13.27367,6.64689 -4.96763,1.63695 -10.06001,2.45779 -15.27249,2.46015 -6.18245,-0.002 -11.45615,-1.42939 -15.8186992,-4.28109 -4.36254,-2.85641 -6.54264988,-6.83322 -6.54264988,-11.93043 z M 49.439026,207.62158 c -1.93759,0 -4.39551,0.48589 -7.3643,1.45769 -2.97117,0.96944 -6.15186,2.2455 -9.54915,3.82113 -3.39257,1.57799 -6.75924,3.39893 -10.09297,5.46517 -3.33606,2.06388 -6.36843,4.18438 -9.09475,6.37091 -2.731,2.18182 -4.9417295,4.39902 -6.6391792,6.64453 -1.69512,2.24787 -2.54502,4.28109 -2.54738,6.10202 0.002,5.7034 3.4561299,8.55746 10.3684392,8.55746 3.27486,0 7.45849,-1.06143 12.55087,-3.18664 5.09241,-2.12285 10.0624,-4.73396 14.91464,-7.82861 4.84756,-3.097 9.03119,-6.34497 12.54619,-9.74153 3.51735,-3.40128 5.27603,-6.4346 5.27603,-9.10468 0,-5.7034 -3.45377,-8.55745 -10.36844,-8.55745 z\" />\r\n\t\t</g></svg>";
nx3_render_svg_SvgElements.HVT1 = nx3_render_svg_SvgElements.noteWhole;
nx3_render_svg_SvgElements.noteWhole = "<svg><g><path style=\"fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke:none\"\r\n\t\t\td=\"m 0.14197458,226.9183 c 0,-3.64187 1.21011002,-6.97946 3.63271012,-10.01514 2.4226,-3.03568 5.66217,-5.64679 9.7233503,-7.83569 4.0565,-2.18182 8.692204,-3.85179 13.899944,-5.00757 5.21012,-1.15106 10.54031,-1.72894 15.99057,-1.7313 5.09006,0.002 10.08827,0.64157 14.99232,1.91292 4.9064,1.27843 9.32782,3.00738 13.26661,5.19156 3.93643,2.18653 7.11712,4.76698 9.54208,7.74133 2.42025,2.97671 3.63271,6.22468 3.63271,9.74389 0,3.88718 -1.0312,7.34743 -3.08885,10.38311 -2.06004,3.03568 -4.99825,5.58546 -8.81461,7.64935 -3.81636,2.06388 -8.38843,3.67253 -13.71862,4.8283 -5.33019,1.15106 -11.26544,1.72895 -17.8081,1.73131 -5.81517,-0.002 -11.23482,-0.58025 -16.26603,-1.73131 -5.026479,-1.15577 -9.389044,-2.79508 -13.082984,-4.9203 -3.6962903,-2.12521 -6.6015203,-4.70565 -8.7204103,-7.73897 -2.1212401,-3.03568 -3.18069012,-6.43696 -3.18069012,-10.20149 z m 65.06407442,9.28158 c 0,-4.00511 -1.39376,-8.80276 -4.18363,-14.38822 -1.33254,-2.67007 -2.75691,-5.00757 -4.27074,-7.01248 -1.51618,-2.00256 -3.18305,-3.61121 -5.00057,-4.82595 -1.81754,-1.21239 -3.90817,-2.12522 -6.27193,-2.73141 -2.36373,-0.60619 -5.06179,-0.91047 -8.09181,-0.91047 -11.63506,0 -17.452602,4.675 -17.452602,14.02498 0,3.51922 0.696896,6.88984 2.090662,10.10714 1.39376,3.2173 3.24189,6.10202 5.54443,8.6518 2.30253,2.54978 4.84756,4.583 7.63508,6.09966 2.78751,1.51902 5.63859,2.27853 8.54853,2.27853 2.6651,0 5.17951,-0.12266 7.54324,-0.3656 2.36376,-0.24296 4.485,-0.72885 6.36375,-1.45769 1.8811,-0.72649 3.48674,-1.8516 4.81694,-3.36826 1.33489,-1.51666 2.24367,-3.55224 2.72865,-6.10203 z\" />\r\n\t\t</g></svg>";
nx3_render_svg_SvgElements.signNatural = "<svg><g><path style=\"fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke:none;display:inline\"\r\n\t\t\td=\"m 27.763524,289.1105 0,-36.43051 -27.82574358,9.65191 0,-97.8116 4.52499988,0 0.0183,36.60977 27.8092637,-9.83589 0,97.81632 -4.52736,0 z m -23.3007437,-42.80378 23.3007437,-8.38055 -0.0157,-30.60209 -23.2842537,8.55981 0,30.42283 z\" />\t\r\n\t\t</g></svg>";
nx3_render_svg_SvgElements.signSharp = "<svg><g><path style=\"fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke:none;display:inline\"\r\n\t\t\td=\"m 31.526296,208.23455 -17.48556,5.8284 0.0157,31.51021 17.46908,-5.82841 0,-31.5102 z m 4.52736,-43.89588 0.0131,26.0474 9.44083,-3.09464 0,16.5724 -9.4526,3.097 0,31.50785 9.4526,-3.09701 0,16.57476 -9.4526,3.09701 0,28.59482 -4.52736,0 0,-27.32111 -17.48556,5.82841 0,27.31875 -4.52736,0 0,-26.04268 -9.4526,3.09464 0,-16.57239 9.4526,-3.09701 -0.0131,-31.50785 -9.43847,3.09465 0,-16.5724 9.4526,-3.09701 0,-28.59482 4.52736,0 0.0157,27.32111 17.46908,-5.82841 0,-27.32347 4.52736,0 z\" />\t\r\n\t\t</g></svg>";
nx3_render_svg_SvgElements.signFlat = "<svg><g><path style=\"fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke:none;display:inline\"\r\n\t\t\t\td=\"m 0.119631,150.69109 5.81283,0 -1.25721,57.37598 c 3.63742,-5.96993 9.26898,-8.95607 16.901689,-8.95371 2.66507,-0.002 5.23835,0.45287 7.72451,1.3657 2.48383,0.91046 4.63332,2.15823 6.45084,3.73622 1.8152,1.58034 3.27018,3.46025 4.36022,5.64914 1.09004,2.18654 1.63625,4.55234 1.63625,7.10684 -0.24254,3.52158 -1.54679,7.44178 -3.90817,11.75353 -2.36373,4.3141 -6.39435,8.53622 -12.08944,12.66399 l -25.631519,18.95235 0,-109.65004 z m 16.901689,55.71308 c -5.082969,0 -8.960559,2.55214 -11.620919,7.65407 -0.71102,6.92521 -1.06652,12.87863 -1.06652,17.86026 0,8.62586 0.29665,14.63825 0.88758,18.03953 2.30253,-1.45769 4.75337,-3.61121 7.35491,-6.46763 2.603867,-2.85641 4.991139,-5.89445 7.171249,-9.11175 2.17775,-3.21966 3.96469,-6.43696 5.35609,-9.65898 1.39141,-3.21966 2.08592,-6.04541 2.08827,-8.47254 -0.002,-2.79509 -0.96997,-5.13494 -2.90523,-7.0172 -1.93762,-1.88463 -4.35784,-2.82576 -7.26543,-2.82576 z\" />\r\n\t\t</g></svg>";
nx3_render_svg_SvgElements.flagDown8 = "<svg><g><path style=\"fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke:none\" \r\n\t\t\td=\"M 10,227 C 12,227 14,227 15,227 16,227 17,226 19,226 20,225 22,224 23,223 25,222 27,220 30,218 39,211 44,206 46,205 54,195 58,185 58,174 58,166 55,156 48,144 48,143 47,142 47,141 47,140 48,139 48,139 49,139 50,140 52,142 53,144 55,146 56,149 57,152 59,155 60,158 61,161 62,164 62,166 63,171 64,176 64,181 64,186 63,190 61,195 60,200 57,204 54,209 50,213 47,216 43,220 39,224 36,228 33,232 29,237 25,243 22,249 18,255 15,262 13,269 12,269 12,270 12,271 12,271 12,272 13,272 13,273 12,273 10,273 L 10,227 Z\"/>\r\n\t\t</g></svg>";
nx3_render_svg_SvgElements.flagUp8 = "<svg><g><path style=\"fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke:none\" \r\n\t\t\td=\"M 12,181 C 14,181 15,181 14,181 14,181 14,182 14,182 14,183 14,184 14,184 20,199 27,211 35,221 45,234 50,241 52,243 56,250 58,258 58,266 L 58,267 C 58,273 58,278 57,282 56,287 55,291 53,294 52,297 51,299 50,301 48,302 48,303 47,303 46,303 46,303 46,302 46,301 46,300 47,298 48,295 49,293 50,291 50,290 51,288 51,286 51,284 52,282 52,280 52,277 52,274 52,270 L 52,269 C 52,256 45,245 30,234 28,233 27,232 26,231 25,230 24,230 22,229 21,228 20,228 18,227 16,227 14,227 12,227 L 12,181 Z\"/>\r\n\t\t</g></svg>";
nx3_render_svg_SvgElements.flagDown16 = "<svg><g><path style=\"fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke:none\" \r\n\t\t\td=\"M 65,152 C 65,157 64,162 63,165 65,169 66,175 66,181 66,186 65,191 64,196 62,200 59,205 56,209 52,213 49,217 45,221 42,224 38,228 35,232 31,238 27,243 23,250 20,256 17,262 15,269 15,269 15,270 15,271 15,271 15,272 15,272 15,273 14,273 12,273 L 12,192 C 16,192 20,192 24,190 28,188 32,186 36,183 39,181 42,178 45,176 47,174 49,172 50,171 55,165 58,158 58,150 58,143 56,135 53,127 52,125 51,124 51,123 51,122 52,122 53,122 55,122 56,123 58,126 59,129 60,132 61,136 62,139 63,143 64,146 65,149 65,151 65,152 Z M 60,179 C 60,178 60,177 60,177 60,176 60,175 60,174 59,175 58,177 55,180 53,182 50,185 47,187 45,190 42,192 40,194 37,196 36,198 35,199 29,207 23,216 19,226 20,225 22,225 24,224 26,222 28,221 30,219 36,214 41,210 44,207 48,204 50,202 50,202 57,195 60,187 60,179 Z\"/>\r\n\t\t</g></svg>";
nx3_render_svg_SvgElements.flagUp16 = "<svg><g><path style=\"fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke:none\" \r\n\t\t\td=\"M 52,321 C 51,321 50,321 50,320 50,319 51,318 51,316 51,314 52,312 52,310 53,308 53,305 53,303 54,301 54,299 54,297 54,295 54,293 53,291 52,290 51,288 50,286 48,284 46,281 43,279 40,276 36,273 31,269 28,268 27,266 25,265 23,264 22,263 21,263 20,262 19,262 17,262 16,262 15,262 13,262 L 13,181 14,181 C 14,181 15,181 15,182 15,182 15,183 16,184 19,196 26,208 36,221 39,225 41,228 45,232 48,235 51,239 53,242 56,246 58,250 59,255 60,259 61,264 61,269 61,275 60,281 58,285 59,286 59,288 59,290 60,292 60,295 60,298 L 60,298 C 60,300 60,302 59,305 59,307 58,310 57,312 56,315 56,317 55,318 54,320 53,321 52,321 Z M 55,272 C 55,263 53,256 48,250 48,250 46,249 44,247 42,245 40,242 37,240 34,237 31,235 28,233 24,230 22,229 19,228 22,233 24,238 27,243 30,247 32,252 36,255 36,256 37,257 39,259 41,260 43,262 45,264 47,267 49,269 51,271 53,273 54,275 55,277 55,276 55,275 55,274 55,273 55,272 55,272 Z\"/>\r\n\t\t</g></svg>";
nx3_render_svg_SvgElements.pauseNv4 = "<svg><g><path style=\"fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke:none\"\r\n\t\t\td=\"M 54,263 C 49,261 43,260 38,260 34,260 30,261 27,263 24,266 22,269 22,273 22,280 26,287 34,294 33,295 33,295 32,295 31,295 29,294 26,292 23,291 20,288 17,285 14,283 12,280 9,276 7,273 6,269 6,266 6,264 6,261 7,258 8,256 9,254 11,252 12,250 14,248 17,247 19,246 21,245 24,245 28,245 31,246 35,248 34,246 32,244 30,241 29,239 27,237 24,234 22,231 20,228 17,225 14,221 11,217 7,213 20,201 26,191 26,181 26,179 25,176 24,173 23,170 21,167 19,165 18,162 16,160 15,158 13,156 13,155 13,155 13,154 14,153 16,153 L 48,198 C 37,212 31,222 31,228 31,231 32,233 34,236 35,239 37,242 40,245 42,248 45,251 47,254 50,257 52,260 54,263 Z\" />\r\n\t\t</g></svg>";
nx3_render_svg_SvgElements.pauseNv8 = "<svg><g><path style=\"fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke:none\"\r\n\t\t\td=\"M 30,273 L 22,273 52,208 C 42,211 34,213 28,213 17,213 11,208 11,199 11,197 12,194 15,193 18,191 21,190 24,190 31,190 34,193 34,199 34,202 33,205 31,209 32,209 32,209 34,209 42,209 50,205 60,197 L 30,273 Z\"/>\r\n\t\t</g></svg>";
nx3_render_svg_SvgElements.pauseNv16 = "<svg><g><path style=\"fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke:none\"\r\n\t\t\td=\"M 26,314 L 18,314 44,253 C 37,256 30,258 23,258 12,258 6,254 6,245 6,242 8,240 10,238 13,236 16,235 20,235 27,235 30,238 30,244 30,246 29,249 27,253 28,253 29,253 29,253 30,253 31,253 31,253 34,253 39,252 46,249 L 65,207 C 57,210 49,212 42,212 31,212 25,208 25,200 25,197 26,194 29,192 31,190 34,189 38,189 44,189 48,192 48,198 48,201 47,204 45,208 46,208 47,208 48,208 53,208 62,204 73,196 L 26,314 Z\"/>\r\n\t\t</g></svg>";
nx3_render_svg_SvgElements.time0 = "<svg><g><path style=\"fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke:none\" \r\n\t\t\td=\"M 81,227 C 81,232 80,238 78,243 76,248 74,252 70,256 67,260 63,263 59,265 54,268 50,269 45,269 40,269 35,268 30,265 26,263 22,260 19,256 16,252 13,247 11,242 9,237 8,232 8,227 8,222 9,216 11,211 13,206 16,202 19,197 22,193 26,190 30,188 35,185 40,184 45,184 49,184 54,185 58,188 63,190 67,193 70,197 73,201 76,206 78,211 80,216 81,221 81,227 Z M 58,229 C 58,202 54,189 45,189 36,189 31,202 31,227 31,252 36,264 45,264 54,264 58,252 58,229 Z\"/>\r\n\t\t</g></svg>";
nx3_render_svg_SvgElements.time1 = "<svg><g><path style=\"fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke:none\" \r\n\t\t\td=\"M 10,269 C 10,266 11,264 13,264 16,263 18,262 19,261 20,259 20,257 20,253 L 20,215 C 20,211 20,208 19,207 19,207 18,208 17,210 16,211 15,212 13,214 12,216 11,217 9,219 8,220 8,221 7,221 7,221 6,221 5,221 14,203 19,191 20,184 21,184 23,185 25,185 26,185 29,185 31,185 37,185 41,185 43,184 L 43,253 C 43,257 44,259 45,261 46,262 47,262 48,263 50,263 51,264 52,264 53,265 54,266 54,269 L 10,269 Z\"/>\r\n\t\t</g></svg>";
nx3_render_svg_SvgElements.time2 = "<svg><g><path style=\"fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke:none\" \r\n\t\t\td=\"M 76,239 C 75,260 68,271 55,271 53,271 51,270 48,269 45,268 41,267 38,266 35,265 32,263 29,262 26,261 24,261 23,261 21,261 19,261 18,262 17,263 16,263 15,264 14,265 13,266 12,267 11,267 10,268 9,268 8,268 7,267 7,267 7,263 8,259 10,257 12,255 13,252 15,250 18,245 23,240 29,236 34,232 38,229 40,227 43,225 45,223 47,221 48,219 49,217 49,215 50,213 50,211 50,209 50,204 49,199 46,196 43,193 39,191 34,191 28,191 24,193 22,196 24,197 27,199 29,201 31,203 32,205 32,208 32,210 32,211 31,213 30,214 29,215 28,216 27,217 25,218 24,219 22,219 21,220 19,220 12,220 8,216 8,208 8,200 11,194 17,189 23,185 31,183 42,183 48,183 54,184 58,186 62,188 65,190 68,192 70,195 72,198 73,201 74,204 74,206 74,208 74,214 72,219 68,223 67,224 64,225 61,227 57,229 53,231 49,233 44,235 40,237 36,239 32,241 29,243 27,245 L 27,245 C 27,245 28,245 29,245 29,245 30,245 31,245 33,245 35,245 38,246 41,247 44,247 48,248 51,249 54,250 56,251 59,252 61,252 62,252 65,252 68,251 69,249 69,249 70,248 71,246 71,244 73,242 76,239 Z\"/>\r\n\t\t</g></svg>";
nx3_render_svg_SvgElements.time3 = "<svg><g><path style=\"fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke:none\" \r\n\t\t\td=\"M 70,245 C 70,253 67,260 61,264 56,268 48,270 37,270 33,270 29,270 25,269 21,268 18,267 15,265 12,263 10,261 8,259 7,257 6,254 6,251 6,248 7,245 10,243 12,241 15,240 18,240 21,240 24,241 26,243 28,245 29,247 29,250 29,255 27,259 24,262 26,264 30,265 35,265 39,265 43,263 45,260 48,257 49,253 49,249 49,243 48,239 46,237 44,234 41,232 37,231 33,231 30,231 28,230 25,230 24,229 24,228 24,227 24,225 24,225 24,224 25,223 25,223 26,223 27,223 28,223 29,223 30,222 32,222 37,222 41,220 44,218 47,216 48,212 48,206 48,195 43,189 32,189 28,189 25,190 23,192 25,194 26,196 28,198 29,200 30,202 30,205 30,208 29,211 27,212 24,214 22,215 19,215 15,215 13,214 10,212 8,210 7,207 7,203 7,197 10,192 15,189 21,186 28,184 37,184 46,184 54,186 60,190 65,194 68,199 68,207 68,211 67,215 64,219 61,222 58,225 53,226 L 54,227 C 58,228 62,230 65,233 68,236 70,240 70,245 Z\"/>\r\n\t\t</g></svg>";
nx3_render_svg_SvgElements.time4 = "<svg><g><path style=\"fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke:none\" \r\n\t\t\td=\"M 66,250 L 66,255 C 66,256 66,256 66,257 66,257 66,258 66,258 66,260 67,262 68,262 69,263 72,264 76,264 L 77,269 32,269 32,264 C 38,264 41,262 42,261 43,260 43,256 43,250 L 6,250 6,243 C 8,239 11,235 14,230 16,225 19,220 21,215 23,209 25,204 26,199 28,193 29,189 29,184 L 60,184 C 58,192 52,202 41,213 28,226 21,235 18,242 L 43,242 43,221 66,201 66,242 78,242 78,250 66,250 Z\"/>\r\n\t\t</g></svg>";
nx3_render_svg_SvgElements.time5 = "<svg><g><path style=\"fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke:none\" \r\n\t\t\td=\"M 4,249 C 4,245 5,242 8,239 10,236 13,235 16,235 25,235 29,239 29,247 29,248 29,250 28,251 27,253 27,254 26,255 25,256 24,258 24,258 23,259 22,260 22,260 24,263 28,264 32,264 43,264 48,256 48,241 48,234 47,230 44,226 42,222 38,220 33,220 29,220 24,222 18,225 17,225 17,225 17,226 17,226 16,226 16,226 16,227 15,227 14,227 13,227 11,227 9,228 9,223 10,217 10,209 11,202 11,193 12,183 20,185 31,186 44,186 52,186 61,185 69,184 68,197 56,204 34,204 34,204 32,204 31,204 30,204 28,204 27,204 25,203 23,203 22,203 21,203 20,203 19,203 19,203 18,204 18,205 18,206 18,207 18,209 18,210 17,212 17,213 17,215 17,217 17,218 24,215 31,213 39,213 43,213 47,214 51,215 56,216 59,218 62,220 65,223 68,226 69,229 71,232 72,236 72,240 72,245 71,249 69,252 67,256 65,259 62,261 58,264 55,266 50,267 46,268 41,269 36,269 31,269 26,268 23,267 19,266 15,265 13,263 10,261 8,259 6,256 5,254 4,251 4,249 Z\"/>\r\n\t\t</g></svg>";
nx3_render_svg_SvgElements.time6 = "<svg><g><path style=\"fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke:none\" \r\n\t\t\td=\"M 74,241 C 74,245 73,249 72,253 70,257 68,260 65,262 62,265 59,267 55,268 51,269 46,270 42,270 30,270 21,266 15,259 9,251 6,240 6,227 6,221 7,215 9,210 10,204 13,200 16,196 19,192 23,189 27,186 31,184 36,183 41,183 46,183 49,183 53,184 57,185 60,186 63,188 66,189 68,191 69,193 71,196 72,198 72,201 72,204 71,207 68,210 66,212 63,213 59,213 55,213 52,212 50,209 47,207 46,204 46,201 46,200 46,198 47,196 48,195 48,193 48,192 48,189 46,188 42,188 40,188 38,189 36,190 34,192 33,194 32,196 31,198 30,201 29,204 28,207 28,211 28,214 28,214 28,215 28,217 28,219 28,221 28,223 35,220 43,218 50,218 57,218 63,220 67,224 72,228 74,234 74,241 Z M 43,226 C 34,226 29,232 29,245 29,258 33,264 41,264 49,264 53,258 53,245 53,232 50,226 43,226 Z\"/>\r\n\t\t</g></svg>";
nx3_render_svg_SvgElements.time7 = "<svg><g><path style=\"fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke:none\" \r\n\t\t\td=\"M 77,188 C 77,194 72,207 63,227 54,245 50,259 50,269 L 50,271 C 47,270 42,270 34,270 32,270 29,270 27,270 25,270 24,271 22,271 23,257 32,242 49,225 55,219 59,214 61,209 56,212 50,213 45,213 44,213 41,213 39,212 36,211 34,210 31,209 28,208 26,207 23,206 21,206 20,205 19,205 18,205 16,207 15,209 14,212 13,214 12,217 10,215 9,213 8,211 L 8,203 C 8,203 8,201 8,200 8,198 8,197 8,195 L 8,186 C 14,188 17,190 17,190 18,190 18,189 20,189 21,188 23,187 25,186 26,185 28,185 30,184 32,183 34,183 36,183 38,183 40,184 42,185 45,186 48,188 50,190 53,192 55,193 57,195 59,196 61,197 62,197 67,197 71,193 72,187 L 74,187 C 76,187 77,187 77,188 Z\"/>\r\n\t\t</g></svg>";
nx3_render_svg_SvgElements.time8 = "<svg><g><path style=\"fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke:none\" \r\n\t\t\td=\"M 75,244 C 75,248 74,251 72,255 71,258 68,260 65,263 62,265 58,267 54,268 50,269 46,270 42,270 37,270 32,269 28,268 24,267 21,266 18,264 15,262 12,259 11,256 9,253 8,250 8,246 8,242 9,238 12,234 14,231 18,229 22,227 14,223 10,216 10,207 10,203 11,200 12,197 14,195 16,192 19,190 21,188 25,187 28,186 32,185 36,184 40,184 50,184 58,186 64,189 70,193 73,198 73,204 73,213 69,219 61,225 70,229 75,235 75,244 Z M 60,203 C 60,198 58,195 55,192 52,190 47,189 41,189 31,189 26,193 26,200 26,208 34,214 50,219 57,215 60,210 60,203 L 60,203 Z M 58,252 C 58,249 57,247 56,246 54,244 52,242 49,240 47,239 44,237 40,235 37,234 33,232 30,231 23,234 20,240 20,246 20,251 22,256 26,259 30,262 35,263 41,263 45,263 49,262 53,260 56,258 58,255 58,252 Z\"/>\r\n\t\t</g></svg>";
nx3_render_svg_SvgElements.time9 = "<svg><g><path style=\"fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke:none\" \r\n\t\t\td=\"M 4,212 C 4,202 7,195 13,190 20,185 28,183 39,183 50,183 58,187 64,195 70,203 73,213 73,227 73,233 72,238 70,244 68,249 66,253 63,257 59,261 55,264 51,267 46,269 41,270 36,270 32,270 29,270 25,269 22,268 19,267 16,265 14,263 11,262 10,259 8,257 7,255 7,252 7,249 8,246 11,244 13,241 15,240 19,240 23,240 26,241 28,244 30,246 31,249 31,253 31,254 31,255 30,257 30,259 29,260 29,261 29,264 31,265 35,265 45,265 50,254 50,232 L 50,229 C 42,233 35,235 29,235 21,235 15,233 11,229 6,225 4,219 4,212 Z M 38,189 C 34,189 30,191 28,195 25,198 24,203 24,209 24,214 25,218 27,222 29,225 32,227 36,227 45,227 50,221 50,209 50,203 49,199 47,195 45,191 42,189 38,189 Z\"/>\r\n\t\t</g></svg>";
nx3_render_svg_SvgElements.timeCommon = "<svg><g><path style=\"fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke:none\" \r\n\t\t\td=\"M 78,247 C 77,250 76,253 74,255 72,258 70,261 67,263 64,265 61,267 58,268 55,269 52,270 49,270 43,270 37,269 32,267 27,264 23,261 19,257 16,253 13,248 11,243 9,238 8,232 8,226 8,220 9,214 11,209 13,204 15,199 19,196 22,192 26,189 31,187 36,185 42,184 48,184 51,184 55,184 59,185 62,186 66,187 68,189 71,190 73,192 75,194 76,197 77,199 77,202 77,205 76,208 73,210 71,212 68,213 65,213 62,213 59,212 56,210 53,208 52,205 52,202 52,198 54,193 59,189 56,189 54,189 52,189 48,189 45,190 42,192 39,193 36,196 34,199 32,202 31,205 30,210 29,214 28,218 28,224 28,229 29,234 30,239 31,244 33,248 35,252 37,256 39,259 42,261 45,264 48,265 52,265 60,265 69,259 78,247 Z\"/>\r\n\t\t</g></svg>";
nx3_render_svg_SvgElements.timeAllabreve = "<svg><g><path style=\"fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke:none\" \r\n\t\t\td=\"M 39,191 C 30,197 26,207 26,223 26,227 26,230 27,234 28,238 29,241 30,245 31,248 32,251 34,254 35,257 37,259 39,261 L 39,191 Z M 74,247 C 73,250 72,253 70,256 68,259 66,261 63,263 61,265 58,267 55,268 52,270 49,270 46,270 L 45,270 45,284 39,284 39,270 C 34,269 29,267 25,264 21,262 18,259 15,255 12,251 10,246 8,241 7,236 6,231 6,225 6,220 7,215 8,210 10,205 12,201 15,198 18,194 21,191 25,188 29,186 34,185 39,184 L 39,171 45,171 45,184 C 49,184 52,184 56,185 59,186 63,187 65,189 68,191 70,192 72,195 73,197 74,199 74,202 74,205 73,207 70,210 68,212 65,213 62,213 59,213 56,212 53,210 50,208 49,205 49,202 49,198 51,193 56,189 55,189 54,189 52,189 51,188 50,188 49,188 48,188 48,188 47,188 46,188 46,188 45,189 L 45,265 C 46,265 48,265 49,265 57,265 66,259 74,247 Z\"/>\r\n\t\t</g></svg>";
nx3_render_svg_SvgElements.tplTestCircle = "\r\n\t<svg ><circle style=\"fill:none;stroke:#ff00ff;stroke-width:16.41697121;stroke-miterlimit:4;stroke-dasharray:none\" id=\"path3384\" cx=\"92.372879\" cy=\"174.15253\" r=\"76.117874\" /> </svg>\r\n\t";
nx3_render_svg_SvgElements.tplCircle = "\r\n\t\t<svg ><g visibility=\"visible\" id=\"page1\"><desc>Slide</desc><g><desc>Drawing</desc><g><g style=\"stroke:none;fill:#FFFFFFF\"><path d=\"M 93,253 C 78,253 66,250 53,242 41,235 32,226 25,214 17,201 14,189 14,175 14,160 17,148 25,135 32,123 41,114 53,107 66,99 78,96 92,96 107,96 119,99 132,107 144,114 153,123 160,135 168,148 171,160 171,174 171,189 168,201 160,214 153,226 144,235 132,242 119,250 107,253 93,253 L 93,253 Z\"/></g><g style=\"stroke:#000000;fill:none\"><path style=\"fill:none\" d=\"M 93,253 C 78,253 66,250 53,242 41,235 32,226 25,214 17,201 14,189 14,175 14,160 17,148 25,135 32,123 41,114 53,107 66,99 78,96 92,96 107,96 119,99 132,107 144,114 153,123 160,135 168,148 171,160 171,174 171,189 168,201 160,214 153,226 144,235 132,242 119,250 107,253 93,253\"/></g><g/></g></g><g><desc>Drawing</desc><g><g style=\"stroke:none;fill:#000000\"><path d=\"M 71,256 C 64,254 57,252 50,248 44,244 38,239 33,234 28,229 23,223 19,217 15,210 13,203 11,196 9,189 8,182 8,175 8,167 9,160 11,153 13,146 15,139 19,132 23,126 28,120 33,115 38,110 44,105 50,101 57,97 64,95 71,93 78,91 85,90 92,90 100,90 107,91 114,93 121,95 128,97 135,101 141,105 147,110 152,115 157,120 162,126 166,132 170,139 172,146 174,153 176,160 177,167 177,174 177,182 176,189 174,196 172,203 170,210 166,217 162,223 157,229 152,234 147,239 141,244 135,248 128,252 121,254 114,256 107,258 100,259 93,259 85,259 78,258 71,256 Z M 130,239 C 136,236 141,232 145,227 150,223 154,218 157,212 160,206 163,200 165,194 166,188 167,181 167,174 167,168 166,161 165,155 163,149 160,143 157,137 154,131 150,126 145,122 141,117 136,113 130,110 124,107 118,104 112,102 106,101 99,100 92,100 86,100 79,101 73,102 67,104 61,107 55,110 49,113 44,117 40,122 35,126 31,131 28,137 25,143 22,149 20,155 19,161 18,168 18,175 18,181 19,188 20,194 22,200 25,206 28,212 31,218 35,223 40,227 44,232 49,236 55,239 61,242 67,245 73,247 79,248 86,249 93,249 99,249 106,248 112,247 118,245 124,242 130,239 Z\"/></g><g style=\"stroke:none;fill:none\"><rect x=\"8\" y=\"89\" width=\"170\" height=\"171\"/></g><g/></g></g><g><desc>Drawing</desc><g><g style=\"stroke:none;fill:none\"><rect x=\"0\" y=\"464\" width=\"854\" height=\"964\"/></g><g/></g></g></g></svg>";
nx3_render_svg_SvgElements.tplArrowDown = "<svg><g><path style=\"fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke:none\" \r\n\t\t d=\"m 93.219081,334.7112 26.789959,-45.28185 -16.80224,0 0,-27.26555 -19.974144,0 0,27.26555 -16.80224,0 26.788665,45.28185 z\"   />\r\n\t</g></svg>";
nx3_render_svg_SvgElements.tplArrowUp = "<svg><g>< path style = \"fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke:none\" \r\n\t\td=\"m 93.220375,22.163798 -26.789959,45.281851 16.802241,0 0,27.265551 19.974143,0 0,-27.265551 16.80224,0 -26.788665,-45.281851 z\" />\r\n\t</g></svg>";
nx3_render_svg_SvgElements.tpl1 = "<svg><g><path style=\"fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke:none\" \r\n\t\t\t d=\"M 106,225 L 93,225 93,146 C 90,149 86,152 82,155 77,158 73,160 69,161 L 69,149 C 76,146 82,142 87,137 92,133 96,128 98,124 L 106,124 106,225 Z\"/>\t\t\r\n\t\t</g></svg>";
nx3_render_svg_SvgElements.tpl2 = "<svg><g><path style=\"fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke:none\" \r\n\t\t\td=\"M 124,212 L 124,225 58,225 C 58,222 58,219 59,216 61,211 64,207 67,202 71,197 76,192 83,187 93,178 101,171 104,166 108,161 110,157 110,152 110,148 108,144 105,141 102,138 97,136 92,136 86,136 82,138 78,141 75,144 73,148 73,154 L 60,152 C 61,143 64,136 70,131 75,126 83,124 92,124 102,124 109,127 115,132 120,137 123,144 123,152 123,156 122,160 121,164 119,168 117,172 113,176 109,180 103,186 95,193 87,199 83,203 80,206 78,208 77,210 75,212 L 124,212 Z\"/>\r\n\t\t</g></svg>";
nx3_render_svg_SvgElements.tpl3 = "<svg><g><path style=\"fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke:none\" \r\n\t\t\td=\"M 60,198 L 73,196 C 74,202 77,207 80,210 83,213 87,214 92,214 99,214 104,212 107,208 111,204 113,200 113,194 113,189 111,184 108,181 104,177 99,176 94,176 91,176 88,176 85,177 L 86,165 C 87,165 88,165 88,165 93,165 98,164 102,161 106,159 108,155 108,150 108,146 106,143 103,140 100,137 97,136 92,136 87,136 83,137 80,140 77,143 75,147 74,152 L 61,150 C 63,142 66,135 71,131 77,126 83,124 91,124 97,124 102,125 107,127 111,130 115,133 117,137 120,141 121,145 121,150 121,154 120,158 117,161 115,165 112,167 107,169 113,171 118,174 121,178 124,182 126,188 126,194 126,203 123,211 116,217 110,223 102,226 92,226 83,226 76,223 70,218 64,213 61,206 60,198 Z\"/>\r\n\t\t</g></svg>";
nx3_render_svg_SvgElements.tpl4 = "<svg><g><path style=\"fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke:none\" \r\n\t\t\td=\"M 101,225 L 101,201 56,201 56,188 104,125 114,125 114,188 126,188 126,201 114,201 114,225 101,225 Z M 101,188 L 101,145 69,188 101,188 Z\"/>\r\n\t\t</g></svg>";
nx3_render_svg_SvgElements.tpl5 = "<svg><g><path style=\"fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke:none\" \r\n\t\t\td=\"M 60,198 L 73,197 C 74,203 76,207 79,210 83,213 87,214 92,214 98,214 103,212 107,208 111,204 113,198 113,191 113,185 111,179 108,176 104,172 99,170 93,170 88,170 85,171 82,173 79,174 77,176 75,179 L 62,177 72,125 121,125 121,138 83,138 78,165 C 84,160 90,158 96,158 104,158 112,161 117,167 123,173 126,181 126,190 126,199 123,207 118,214 112,222 103,226 92,226 83,226 76,223 70,218 64,213 61,206 60,198 Z\"/>\r\n\t\t</g></svg>";
nx3_render_svg_SvgElements.tpl6x = "<svg><g><path style=\"fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke:none\" \r\n\t\t\td=\"M 124,150 L 111,151 C 110,146 108,143 106,141 103,138 99,136 94,136 90,136 86,137 83,139 80,142 77,145 74,150 72,155 71,162 71,172 74,168 78,165 82,162 86,160 91,159 96,159 104,159 111,162 117,168 123,174 126,182 126,192 126,198 125,204 122,209 119,215 115,219 110,222 105,225 100,226 94,226 83,226 75,222 68,215 61,207 58,195 58,178 58,158 62,144 69,135 75,128 84,124 95,124 103,124 110,126 115,131 120,136 123,142 124,150 Z M 71,191 C 71,195 72,199 74,203 76,206 78,209 82,211 85,213 89,214 93,214 99,214 103,212 107,208 111,204 113,199 113,192 113,186 111,180 107,177 104,173 99,171 92,171 86,171 81,173 77,177 73,180 71,185 71,191 Z\"/>\r\n\t\t</g></svg>";
nx3_render_svg_SvgElements.tpl6 = "<svg><g><path style=\"fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke:none\" \r\n\t\t\td=\"M 124,150 L 111,151 C 110,146 108,143 106,141 103,138 99,136 94,136 90,136 86,137 83,139 80,142 77,145 74,150 72,155 71,162 71,172 74,168 78,165 82,162 86,160 91,159 96,159 104,159 111,162 117,168 123,174 126,182 126,192 126,198 125,204 122,209 119,215 115,219 110,222 105,225 100,226 94,226 83,226 75,222 68,215 61,207 58,195 58,178 58,158 62,144 69,135 75,128 84,124 95,124 103,124 110,126 115,131 120,136 123,142 124,150 Z M 71,191 C 71,195 72,199 74,203 76,206 78,209 82,211 85,213 89,214 93,214 99,214 103,212 107,208 111,204 113,199 113,192 113,186 111,180 107,177 104,173 99,171 92,171 86,171 81,173 77,177 73,180 71,185 71,191 Z\"/>\r\n\t\t</g></svg>";
nx3_render_svg_SvgElements.tpl7 = "<svg><g><path style=\"fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke:none\" \r\n\t\t\td=\"M 61,138 L 61,125 126,125 126,136 C 120,142 114,152 108,163 102,174 97,186 94,197 91,206 90,215 89,225 L 76,225 C 76,217 78,208 81,196 83,185 87,175 93,164 98,154 104,145 110,138 L 61,138 Z\"/>\r\n\t\t</g></svg>";
nx3_xml_BarXML.XBAR = "bar";
nx3_xml_BarXML.XBAR_TYPE = "type";
nx3_xml_BarXML.XBAR_TIME = "time";
nx3_xml_BarXML.XBAR_TIMEDISPLAY = "timedisplay";
nx3_xml_HeadXML.XHEAD = "headx";
nx3_xml_HeadXML.XHEAD_TYPE = "type";
nx3_xml_HeadXML.XHEAD_LEVEL = "level";
nx3_xml_HeadXML.XHEAD_SIGN = "sign";
nx3_xml_HeadXML.XHEAD_TIE = "tie";
nx3_xml_HeadXML.XHEAD_TIETO = "tieto";
nx3_xml_HeadXML.XHEAD_TIE_DIRECTION = "tiedirection";
nx3_xml_HeadXML.XHEAD_TIE_LEVEL = "tielevel";
nx3_xml_NoteXML.XNOTE = "note";
nx3_xml_NoteXML.XPAUSE = "pause";
nx3_xml_NoteXML.XPAUSE_LEVEL = "level";
nx3_xml_NoteXML.XLYRIC = "lyric";
nx3_xml_NoteXML.XLYRIC_TEXT = "text";
nx3_xml_NoteXML.XUNDEFINED = "undefined";
nx3_xml_NoteXML.XPITCH = "pitch";
nx3_xml_NoteXML.XPITCH_LEVEL = "level";
nx3_xml_NoteXML.XPITCH_MIDINOTE = "midinote";
nx3_xml_NoteXML.XTPL = "tpl";
nx3_xml_NoteXML.XTPL_LEVEL = "level";
nx3_xml_NoteXML.XTPL_SIGN = "sign";
nx3_xml_NoteXML.XNOTE_TYPE = "type";
nx3_xml_NoteXML.XNOTE_TYPE_NOTE = "note";
nx3_xml_NoteXML.XNOTE_TYPE_NOTATION_VARIANT = "variant";
nx3_xml_NoteXML.XNOTE_VALUE = "value";
nx3_xml_NoteXML.XNOTE_VAL = "val";
nx3_xml_NoteXML.XNOTE_DIRECTION = "direction";
nx3_xml_NoteXML.XNOTE_TYPE_PAUSE = "pause";
nx3_xml_NoteXML.XNOTE_TYPE_NOTE_ARTICULATIONS = "articulations";
nx3_xml_NoteXML.LIST_DELIMITER = ";";
nx3_xml_NoteXML.XNOTE_TYPE_NOTE_ATTRIBUTES = "attributes";
nx3_xml_NoteXML.XOFFSET = "offset";
nx3_xml_NoteXML.XLYRIC_CONTINUATION = "continuation";
nx3_xml_NoteXML.XLYRIC_FORMAT = "format";
nx3_xml_NoteXML.XTPL_PAUSE = "pause";
nx3_xml_PartXML.XPART = "part";
nx3_xml_PartXML.XPART_TYPE = "type";
nx3_xml_PartXML.XPART_LEVELOFFSET = "leveloffset";
nx3_xml_PartXML.XPART_CLEF = "clef";
nx3_xml_PartXML.XPART_CLEFDISPLAY = "clefdisplay";
nx3_xml_PartXML.XPART_KEY = "key";
nx3_xml_PartXML.XPART_KEYDISPLAY = "keydisplay";
nx3_xml_PartXML.XPART_PITCHCHAIN = "pitchchain";
nx3_xml_PartXML.XPART_TYPE_TPLCHAIN = "tplchain";
nx3_xml_PartXML.XPART_TYPE_TPLROW = "tplrow";
nx3_xml_PartXML.XPART_MODUS = "modus";
nx3_xml_PartXML.XPART_OCTAVE = "octave";
nx3_xml_ScoreXML.XSCORE = "score";
nx3_xml_ScoreXML.XCONFIG = "config";
nx3_xml_VoiceXML.XVOICE = "voice";
nx3_xml_VoiceXML.XVOICE_TYPE = "type";
nx3_xml_VoiceXML.XVOICE_BARPAUSE = "barpause";
nx3_xml_VoiceXML.XVOICE_DIRECTION = "direction";
Main.main();
})(typeof console != "undefined" ? console : {log:function(){}});
