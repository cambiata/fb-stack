(function ($hx_exports, $global) { "use-strict";
var $s = $global.$hx_scope, $_;
var $hxClasses = $s.a, ui_render_IStringRenderer = $s.b, nx3_qs_QSParser = $s.c, Xml = $s.d, Std = $s.e, js__$Boot_HaxeError = $s.f, haxe_xml_Printer = $s.g, nx3_EDirectionUD = $s.h, $hxEnums = $s.i, nx3_ETimeUtils = $s.j, nx3_EKeysTools = $s.k, StringTools = $s.l, nx3_ENoteValTools = $s.m, $estr = $s.n, HxOverrides = $s.o, nx3_EDisplayALN = $s.p, Lambda = $s.aa, nx3_ENoteVal = $s.ab, nx3_EDirectionUAD = $s.ac, haxe_ds_ObjectMap = $s.ad, Reflect = $s.ae, nx3_ESign = $s.af, haxe_ds_IntMap = $s.ag, nx3_EClef = $s.ah, nx3_EKey = $s.ai;
var cx_ArrayTools = function() { };
$hxClasses["cx.ArrayTools"] = cx_ArrayTools;
cx_ArrayTools.__name__ = ["cx","ArrayTools"];
cx_ArrayTools.sortA = function(a,fn) {
	var copy = a.slice();
	copy.sort(fn);
	return copy;
};
cx_ArrayTools.str = function(a) {
	return Std.string(a);
};
cx_ArrayTools.next = function(a,item) {
	var idx = a.indexOf(item);
	if(idx == -1) {
		return null;
	}
	if(idx == a.length - 1) {
		return null;
	}
	return a[idx + 1];
};
cx_ArrayTools.prev = function(a,item) {
	var idx = a.indexOf(item);
	if(idx <= 0) {
		return null;
	}
	return a[idx - 1];
};
cx_ArrayTools.reverse = function(a) {
	var result = [];
	var _g = 0;
	while(_g < a.length) result.unshift(a[_g++]);
	return result;
};
cx_ArrayTools.copyUntil = function(a,f) {
	var result = [];
	var _g = 0;
	while(_g < a.length) {
		var item = a[_g];
		++_g;
		if(f(item)) {
			break;
		}
		result.push(item);
	}
	return result;
};
cx_ArrayTools.copyUntilIncluding = function(a,f) {
	var result = [];
	var _g = 0;
	while(_g < a.length) {
		var item = a[_g];
		++_g;
		result.push(item);
		if(f(item)) {
			break;
		}
	}
	return result;
};
cx_ArrayTools.has = function(a,item) {
	return a.indexOf(item) != -1;
};
cx_ArrayTools.nextOrNull = function(a,item) {
	var idx = a.indexOf(item) + 1;
	if(a == null) {
		return null;
	} else if(idx < 0 || idx > a.length - 1) {
		return null;
	} else {
		return a[idx];
	}
};
cx_ArrayTools.indexOrNull = function(a,idx) {
	if(a == null) {
		return null;
	}
	if(idx < 0 || idx > a.length - 1) {
		return null;
	} else {
		return a[idx];
	}
};
cx_ArrayTools.nullOrEmpty = function(a) {
	if(a != null) {
		return a.length == 0;
	} else {
		return true;
	}
};
cx_ArrayTools.indexOrValue = function(a,idx,fallbackValue) {
	if((a == null ? null : idx < 0 || idx > a.length - 1 ? null : a[idx]) != null) {
		return a[idx];
	} else {
		return fallbackValue;
	}
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
		if(!Lambda.has(result,item)) {
			result.push(item);
		}
	}
	result.sort(function(a,b) {
		return Reflect.compare(a,b);
	});
	return result;
};
cx_ArrayTools.fromIterator = function(it) {
	var result = [];
	while(it.hasNext()) result.push(it.next());
	return result;
};
cx_ArrayTools.fromIterables = function(it) {
	return cx_ArrayTools.fromIterator($getIterator(it));
};
cx_ArrayTools.fromHashKeys = function(it) {
	return cx_ArrayTools.fromIterator(it);
};
cx_ArrayTools.allNull = function(it) {
	var _g = 0;
	while(_g < it.length) if(it[_g++] != null) {
		return false;
	}
	return true;
};
cx_ArrayTools.doOverlap = function(array1,array2) {
	var _g = 0;
	while(_g < array1.length) if(Lambda.has(array2,array1[_g++])) {
		return true;
	}
	return false;
};
cx_ArrayTools.overlap = function(array1,array2) {
	return Lambda.array(array1.filter(function(value1) {
		return Lambda.has(array2,value1);
	}));
};
cx_ArrayTools.diff = function(array1,array2) {
	var result = [];
	var _g = 0;
	while(_g < array1.length) {
		var item = array1[_g];
		++_g;
		if(!Lambda.has(array2,item)) {
			result.push(item);
		}
	}
	var _g1 = 0;
	while(_g1 < array2.length) {
		var item1 = array2[_g1];
		++_g1;
		if(!Lambda.has(array1,item1)) {
			result.push(item1);
		}
	}
	return result;
};
cx_ArrayTools.hasNot = function(array1,array2) {
	var result = [];
	var _g = 0;
	while(_g < array2.length) {
		var item = array2[_g];
		++_g;
		if(!Lambda.has(array1,item)) {
			result.push(item);
		}
	}
	return result;
};
cx_ArrayTools.hasOtherThan = function(array1,array2) {
	var _g = 0;
	while(_g < array2.length) if(!Lambda.has(array1,array2[_g++])) {
		return true;
	}
	return false;
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
	while(_g < a.length) if(a[_g++] == item) {
		++cnt;
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
	if(step == null) {
		step = 1;
	}
	if(null == stop) {
		stop = start;
		start = 0;
	}
	if((stop - start) / step == Infinity) {
		throw new js__$Boot_HaxeError("infinite range");
	}
	var range = [];
	var i = -1;
	var j;
	if(step < 0) {
		while(true) {
			j = start + step * ++i;
			if(!(j > stop)) {
				break;
			}
			range.push(j);
		}
	} else {
		while(true) {
			j = start + step * ++i;
			if(!(j < stop)) {
				break;
			}
			range.push(j);
		}
	}
	return range;
};
cx_ArrayTools.intsMin = function(a) {
	var r = a[0];
	var _g = 0;
	while(_g < a.length) {
		var v = a[_g];
		++_g;
		if(v < r) {
			r = v;
		}
	}
	return r;
};
cx_ArrayTools.trimStrings = function(a) {
	return a.map(function(s) {
		return StringTools.trim(s);
	});
};
cx_ArrayTools.cleaveL = function(a,f) {
	var l = [];
	var r = a.slice();
	var _g = 0;
	while(_g < a.length) {
		var a1 = a[_g];
		++_g;
		l.push(a1);
		r.shift();
		if(f(a1)) {
			break;
		}
	}
	return { left : l, right : r};
};
cx_ArrayTools.cleaveR = function(a,f) {
	var l = [];
	var r = a.slice();
	var _g = 0;
	while(_g < a.length) {
		var a1 = a[_g];
		++_g;
		if(f(a1)) {
			break;
		}
		l.push(a1);
		r.shift();
	}
	return { left : l, right : r};
};
var cx_MapTools = function() { };
$hxClasses["cx.MapTools"] = cx_MapTools;
cx_MapTools.__name__ = ["cx","MapTools"];
cx_MapTools.keysToArray = function(it) {
	var result = [];
	while(it.hasNext()) result.push(it.next());
	return result;
};
cx_MapTools.sortarray = function(a) {
	a.sort(function(a1,b) {
		return Reflect.compare(a1,b);
	});
	return a;
};
var nx3_Constants = function() { };
$hxClasses["nx3.Constants"] = nx3_Constants;
nx3_Constants.__name__ = ["nx3","Constants"];
var nx3_EBarline = $hxEnums["nx3.EBarline"] = { __ename__ : true, __constructs__ : ["Normal","None","Double","Final","Dotted","Breath","EndRepeat","EndAndStartRepeat"]
	,Normal: {_hx_index:0,__enum__:"nx3.EBarline",toString:$estr}
	,None: {_hx_index:1,__enum__:"nx3.EBarline",toString:$estr}
	,Double: {_hx_index:2,__enum__:"nx3.EBarline",toString:$estr}
	,Final: {_hx_index:3,__enum__:"nx3.EBarline",toString:$estr}
	,Dotted: {_hx_index:4,__enum__:"nx3.EBarline",toString:$estr}
	,Breath: {_hx_index:5,__enum__:"nx3.EBarline",toString:$estr}
	,EndRepeat: {_hx_index:6,__enum__:"nx3.EBarline",toString:$estr}
	,EndAndStartRepeat: {_hx_index:7,__enum__:"nx3.EBarline",toString:$estr}
};
var nx3_EBarlineLeft = $hxEnums["nx3.EBarlineLeft"] = { __ename__ : true, __constructs__ : ["None","Single","Double","StartRepeat"]
	,None: {_hx_index:0,__enum__:"nx3.EBarlineLeft",toString:$estr}
	,Single: {_hx_index:1,__enum__:"nx3.EBarlineLeft",toString:$estr}
	,Double: {_hx_index:2,__enum__:"nx3.EBarlineLeft",toString:$estr}
	,StartRepeat: {_hx_index:3,__enum__:"nx3.EBarlineLeft",toString:$estr}
};
var nx3_EBeamflagType = $hxEnums["nx3.EBeamflagType"] = { __ename__ : true, __constructs__ : ["None","Start16","End16","Full16"]
	,None: {_hx_index:0,__enum__:"nx3.EBeamflagType",toString:$estr}
	,Start16: {_hx_index:1,__enum__:"nx3.EBeamflagType",toString:$estr}
	,End16: {_hx_index:2,__enum__:"nx3.EBeamflagType",toString:$estr}
	,Full16: {_hx_index:3,__enum__:"nx3.EBeamflagType",toString:$estr}
};
var nx3_EDirectionTools = function() { };
$hxClasses["nx3.EDirectionTools"] = nx3_EDirectionTools;
nx3_EDirectionTools.__name__ = ["nx3","EDirectionTools"];
nx3_EDirectionTools.uadToUd = function(directionUAD) {
	if(directionUAD == nx3_EDirectionUAD.Up) {
		return nx3_EDirectionUD.Up;
	}
	return nx3_EDirectionUD.Down;
};
var nx3_EHeadPosition = $hxEnums["nx3.EHeadPosition"] = { __ename__ : true, __constructs__ : ["Left","Center","Right"]
	,Left: {_hx_index:0,__enum__:"nx3.EHeadPosition",toString:$estr}
	,Center: {_hx_index:1,__enum__:"nx3.EHeadPosition",toString:$estr}
	,Right: {_hx_index:2,__enum__:"nx3.EHeadPosition",toString:$estr}
};
var nx3_IBarWidthCalculator = function() { };
$hxClasses["nx3.IBarWidthCalculator"] = nx3_IBarWidthCalculator;
nx3_IBarWidthCalculator.__name__ = ["nx3","IBarWidthCalculator"];
nx3_IBarWidthCalculator.prototype = {
	__class__: nx3_IBarWidthCalculator
};
var nx3_PAttributesRectsCalculator = function() { };
$hxClasses["nx3.PAttributesRectsCalculator"] = nx3_PAttributesRectsCalculator;
nx3_PAttributesRectsCalculator.__name__ = ["nx3","PAttributesRectsCalculator"];
nx3_PAttributesRectsCalculator.getClefRect = function(clef) {
	switch(clef._hx_index) {
	case 0:
		return new nx3_geom_Rectangle(0,-5,9,10);
	case 1:
		return new nx3_geom_Rectangle(0,-4,9,8);
	case 2:
		return new nx3_geom_Rectangle(0,-3,9,6);
	}
};
nx3_PAttributesRectsCalculator.getKeyRect = function(key) {
	switch(key._hx_index) {
	case 3:case 9:
		return new nx3_geom_Rectangle(0,-3,9.2,6);
	case 5:case 7:
		return new nx3_geom_Rectangle(0,-3,4.4,6);
	case 6:
		return new nx3_geom_Rectangle(0,-3,1,6);
	case 4:case 8:
		return new nx3_geom_Rectangle(0,-3,6.8,6);
	case 2:case 10:
		return new nx3_geom_Rectangle(0,-3,11.6,6);
	case 1:case 11:
		return new nx3_geom_Rectangle(0,-3,14.,6);
	default:
		return new nx3_geom_Rectangle(0,-2,.5,4);
	}
};
nx3_PAttributesRectsCalculator.getTimeRect = function(time) {
	if(time == null) {
		return new nx3_geom_Rectangle(0,-3,.5,3);
	}
	if(time._hx_index == 16) {
		return new nx3_geom_Rectangle(0,-3,6,6);
	} else {
		return new nx3_geom_Rectangle(0,-3,4,3);
	}
};
var nx3_PBamegroupFrameTipCalculator = function(notelevels,direction) {
	if(direction == nx3_EDirectionUD.Down) {
		var invertedLevels = [];
		var _g = 0;
		while(_g < notelevels.length) invertedLevels.push(notelevels[_g++] * -1);
		notelevels = invertedLevels;
	}
	this.notelevels = notelevels;
	this.direction = direction;
};
$hxClasses["nx3.PBamegroupFrameTipCalculator"] = nx3_PBamegroupFrameTipCalculator;
nx3_PBamegroupFrameTipCalculator.__name__ = ["nx3","PBamegroupFrameTipCalculator"];
nx3_PBamegroupFrameTipCalculator.floatMin = function(levels) {
	var result = levels[0];
	if(levels.length == 1) {
		return result;
	}
	var _g = 0;
	while(_g < levels.length) result = Math.min(result,levels[_g++]);
	return result;
};
nx3_PBamegroupFrameTipCalculator.intMin = function(levels) {
	var result = levels[0];
	if(levels.length == 1) {
		return result;
	}
	var _g = 0;
	while(_g < levels.length) result = Math.min(result,levels[_g++]) | 0;
	return result;
};
nx3_PBamegroupFrameTipCalculator.intMax = function(levels) {
	var result = levels[0];
	if(levels.length == 1) {
		return result;
	}
	var _g = 0;
	while(_g < levels.length) result = Math.max(result,levels[_g++]) | 0;
	return result;
};
nx3_PBamegroupFrameTipCalculator.prototype = {
	getTips: function() {
		var levels = this.notelevels;
		var result = levels[0];
		var min;
		if(levels.length == 1) {
			min = result;
		} else {
			var _g = 0;
			while(_g < levels.length) result = Math.min(result,levels[_g++]) | 0;
			min = result;
		}
		var leftTip = this.notelevels[0];
		var array = this.notelevels;
		var rightTip = array[array.length - 1];
		if(this.notelevels.length == 2) {
			var levels1 = [leftTip,rightTip + 1,7];
			var result1 = levels1[0];
			if(levels1.length == 1) {
				leftTip = result1;
			} else {
				var _g1 = 0;
				while(_g1 < levels1.length) result1 = Math.min(result1,levels1[_g1++]);
				leftTip = result1;
			}
			var levels2 = [rightTip,leftTip + 1,7];
			var result2 = levels2[0];
			if(levels2.length == 1) {
				rightTip = result2;
			} else {
				var _g2 = 0;
				while(_g2 < levels2.length) result2 = Math.min(result2,levels2[_g2++]);
				rightTip = result2;
			}
		} else {
			var slopevalue = this.notelevels.length * .25;
			var inlevels = this.notelevels.slice();
			inlevels.shift();
			inlevels.pop();
			var result3 = inlevels[0];
			var inmin;
			if(inlevels.length == 1) {
				inmin = result3;
			} else {
				var _g3 = 0;
				while(_g3 < inlevels.length) result3 = Math.min(result3,inlevels[_g3++]) | 0;
				inmin = result3;
			}
			if(inlevels.length == 0) {
				inmin = null;
			}
			if(inmin != null && leftTip >= inmin && rightTip >= inmin) {
				leftTip = inmin;
				rightTip = inmin;
			} else if(rightTip < leftTip && min < leftTip) {
				var levels3 = [min + slopevalue,leftTip];
				var result4 = levels3[0];
				if(levels3.length == 1) {
					leftTip = result4;
				} else {
					var _g4 = 0;
					while(_g4 < levels3.length) result4 = Math.min(result4,levels3[_g4++]);
					leftTip = result4;
				}
			} else if(leftTip < rightTip && min < rightTip) {
				var levels4 = [min + slopevalue,rightTip];
				var result5 = levels4[0];
				if(levels4.length == 1) {
					rightTip = result5;
				} else {
					var _g5 = 0;
					while(_g5 < levels4.length) result5 = Math.min(result5,levels4[_g5++]);
					rightTip = result5;
				}
			}
		}
		leftTip = Math.min(7,leftTip) | 0;
		rightTip = Math.min(7,rightTip) | 0;
		if(this.direction == nx3_EDirectionUD.Down) {
			return { leftTip : -leftTip, rightTip : -rightTip};
		}
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
$hxClasses["nx3.PBar"] = nx3_PBar;
nx3_PBar.__name__ = ["nx3","PBar"];
nx3_PBar.prototype = {
	iterator: function() {
		return HxOverrides.iter(this.getParts());
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
		if(this._clefs != null) {
			return this._clefs;
		}
		this._clefs = [];
		var _g = 0;
		var _g1 = this.getParts();
		while(_g < _g1.length) this._clefs.push(_g1[_g++].npart.clef);
		return this._clefs;
	}
	,get_keys: function() {
		if(this._keys != null) {
			return this._keys;
		}
		this._keys = [];
		var _g = 0;
		var _g1 = this.getParts();
		while(_g < _g1.length) this._keys.push(_g1[_g++].npart.key);
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
			if(vpart.npart.clefDisplay == null) {
				result = nx3_EDisplayALN.Layout;
			}
			if(vpart.npart.clefDisplay == nx3_EDisplayALN.Layout) {
				result = nx3_EDisplayALN.Layout;
			}
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
			if(vpart.npart.keyDisplay == null) {
				result = nx3_EDisplayALN.Layout;
			}
			if(vpart.npart.keyDisplay == nx3_EDisplayALN.Layout) {
				result = nx3_EDisplayALN.Layout;
			}
			if(vpart.npart.keyDisplay == nx3_EDisplayALN.Always) {
				result = nx3_EDisplayALN.Always;
				break;
			}
		}
		return result;
	}
	,get_displayTime: function() {
		return this.nbar.timeDisplay;
	}
	,getParts: function() {
		if(this.parts != null) {
			return this.parts;
		}
		this.parts = [];
		var _g = 0;
		var _g1 = this.nbar.nparts;
		while(_g < _g1.length) {
			var ppart = new nx3_PPart(_g1[_g++]);
			ppart.bar = this;
			this.parts.push(ppart);
		}
		return this.parts;
	}
	,getPart: function(idx) {
		if(idx < 0 || idx > this.getParts().length) {
			return null;
		} else {
			return this.getParts()[idx];
		}
	}
	,getColumns: function() {
		if(this.columns != null) {
			return this.columns;
		}
		this.columns = new nx3_PColumnsGenerator(this).getColumns();
		this.calculateMDistances();
		return this.columns;
	}
	,getIndex: function() {
		return this.getScore().getBars().indexOf(this);
	}
	,calculateMDistances: function() {
		if(this.columns == null) {
			this.getColumns();
		}
		new nx3_PColumnsDistancesCalculator(this).calculate();
	}
	,calculateAPositions: function() {
		new nx3_PColumnsAllotmentCalculator(this).calculate();
	}
	,getValue: function() {
		if(this.value != 0) {
			return this.value;
		}
		var _g = 0;
		var _g1 = this.getParts();
		while(_g < _g1.length) this.value = Math.max(this.value,_g1[_g++].getValue()) | 0;
		return this.value;
	}
	,getContentwidth: function() {
		if(this.contentwidth != null) {
			return this.contentwidth;
		}
		var array = this.getColumns();
		var lastcolumn = array[array.length - 1];
		this.contentwidth = lastcolumn.getAPostion() + Math.max(lastcolumn.getADistance(),lastcolumn.getRightX());
		return this.contentwidth;
	}
	,getContentXZero: function() {
		this.contentx = -this.getColumns()[0].getLeftX();
		return this.contentx;
	}
	,getAllottedDistanceSum: function() {
		if(this.allottedDistanceSum != null) {
			return this.allottedDistanceSum;
		}
		this.getContentwidth();
		return this.allottedDistanceSum;
	}
	,getStretchWidth: function() {
		return this.stretchwidth;
	}
	,getTieConnections: function() {
		if(this.tieconnections != null) {
			return this.tieconnections;
		}
		this.tieconnections = [];
		var a = this.score.getBars();
		var idx = this.getIndex() + 1;
		var nextBar = a == null ? null : idx < 0 || idx > a.length - 1 ? null : a[idx];
		if(nextBar == null) {
			return this.tieconnections;
		}
		var _g = 0;
		var _g1 = this.getParts();
		while(_g < _g1.length) {
			var part = _g1[_g];
			++_g;
			var a1 = nextBar.getParts();
			var idx1 = part.getIndex();
			if(a1 != null) {
				idx1 < 0 || idx1 > a1.length - 1;
			}
			var _g2 = 0;
			var _g3 = part.getVoices();
			while(_g2 < _g3.length) {
				var array = _g3[_g2++].getNotes();
				var lastnote = array[array.length - 1];
				if(!lastnote.getHasTie()) {
					continue;
				}
				var _g4 = 0;
				var _g5 = lastnote.nnote.get_nheads();
				while(_g4 < _g5.length) {
					var nhead = _g5[_g4];
					++_g4;
					if(nhead.tie != null) {
						var a2 = nextBar.getParts();
						var idx2 = part.getIndex();
						var nextPart = a2 == null ? null : idx2 < 0 || idx2 > a2.length - 1 ? null : a2[idx2];
						if(nextPart == null) {
							break;
						}
						var _g6 = 0;
						var _g7 = nextPart.getVoices();
						while(_g6 < _g7.length) {
							var nextnote = _g7[_g6++].getNotes()[0];
							var _g8 = 0;
							var _g9 = nextnote.nnote.get_nheads();
							while(_g8 < _g9.length) if(_g9[_g8++].level == nhead.level) {
								this.tieconnections.push({ from : lastnote, to : nextnote, level : nhead.level, tie : nhead.tie});
								break;
							}
						}
					}
				}
			}
		}
		return this.tieconnections;
	}
	,__class__: nx3_PBar
	,__properties__: {get_displayTime:"get_displayTime",get_displayKeys:"get_displayKeys",get_displayClefs:"get_displayClefs",get_time:"get_time",get_keys:"get_keys",get_clefs:"get_clefs",get_length:"get_length"}
};
var nx3_PBarConfig = function(showClef,showKey,showTime,showCautClef,showCautKey,showCautTime) {
	if(showCautTime == null) {
		showCautTime = false;
	}
	if(showCautKey == null) {
		showCautKey = false;
	}
	if(showCautClef == null) {
		showCautClef = false;
	}
	if(showTime == null) {
		showTime = false;
	}
	if(showKey == null) {
		showKey = false;
	}
	if(showClef == null) {
		showClef = false;
	}
	this.showClef = showClef;
	this.showKey = showKey;
	this.showTime = showTime;
	this.showCautClef = showCautClef;
	this.showCautKey = showCautKey;
	this.showCautTime = showCautTime;
};
$hxClasses["nx3.PBarConfig"] = nx3_PBarConfig;
nx3_PBarConfig.__name__ = ["nx3","PBarConfig"];
nx3_PBarConfig.prototype = {
	__class__: nx3_PBarConfig
};
var nx3_PBarStretchCalculator = function(systembar) {
	this.systembar = systembar;
};
$hxClasses["nx3.PBarStretchCalculator"] = nx3_PBarStretchCalculator;
nx3_PBarStretchCalculator.__name__ = ["nx3","PBarStretchCalculator"];
nx3_PBarStretchCalculator.prototype = {
	stretch: function(amount) {
		this.systembar.getBarMeasurements().setContentWidth(this.systembar.getBarMeasurements().getContentWidth() + amount);
		if(this.systembar.bar.getColumns().length < 2) {
			return;
		}
		var columns = this.systembar.bar.getColumns();
		var firstcolumn = columns[0];
		var aDistance = new haxe_ds_ObjectMap();
		var gotShared = new haxe_ds_ObjectMap();
		var _g = 0;
		while(_g < columns.length) {
			var column = columns[_g];
			++_g;
			aDistance.set(column,column.getADistance());
			gotShared.set(column,0);
		}
		var seedThreshold_h = { };
		var seedrest = amount;
		while(seedrest > 0) {
			var _g1 = 0;
			while(_g1 < columns.length) {
				var column1 = columns[_g1];
				++_g1;
				var grain = column1.getDistanceDelta() * .5;
				var valueDeltaInt = column1.getDistanceDelta() * 100000 | 0;
				if(!seedThreshold_h.hasOwnProperty(valueDeltaInt)) {
					seedThreshold_h[valueDeltaInt] = 0;
				}
				seedThreshold_h[valueDeltaInt] = seedThreshold_h[valueDeltaInt] + grain;
				if(seedThreshold_h[valueDeltaInt] > (column1 == firstcolumn ? 0.0 : column1.getADistanceBenefit())) {
					gotShared.set(column1,gotShared.h[column1.__id__] + grain);
					seedrest -= grain;
				}
			}
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
		while(_g < _g1.length) _g1[_g++].sposition = null;
	}
	,__class__: nx3_PBarStretchCalculator
};
var nx3_PBarWidthCalculator = function() {
};
$hxClasses["nx3.PBarWidthCalculator"] = nx3_PBarWidthCalculator;
nx3_PBarWidthCalculator.__name__ = ["nx3","PBarWidthCalculator"];
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
			if(clef == null) {
				continue;
			}
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
			if(key == null) {
				continue;
			}
			result = Math.max(result,nx3_PAttributesRectsCalculator.getKeyRect(key).width);
		}
		return result;
	}
	,__class__: nx3_PBarWidthCalculator
};
var nx3_PBaseRectCalculator = function(note) {
	this.note = note;
};
$hxClasses["nx3.PBaseRectCalculator"] = nx3_PBaseRectCalculator;
nx3_PBaseRectCalculator.__name__ = ["nx3","PBaseRectCalculator"];
nx3_PBaseRectCalculator.prototype = {
	getBaseRect: function() {
		switch(this.note.nnote.type._hx_index) {
		case 0:
			if(nx3_ENoteValTools.head(this.note.nnote.value)._hx_index == 2) {
				return new nx3_geom_Rectangle(-2.8000000000000003,-3.,5.6000000000000005,6.);
			} else {
				return new nx3_geom_Rectangle(-2.2,-3.,4.4,6.);
			}
			break;
		case 4:
			return this.note.getHeadsRects()[0].clone();
		default:
			return new nx3_geom_Rectangle(-4,-3.,8,6.);
		}
	}
	,__class__: nx3_PBaseRectCalculator
};
var nx3_PBeamflagCalculator = function(beamgroup) {
	this.beamgroup = beamgroup;
};
$hxClasses["nx3.PBeamflagCalculator"] = nx3_PBeamflagCalculator;
nx3_PBeamflagCalculator.__name__ = ["nx3","PBeamflagCalculator"];
nx3_PBeamflagCalculator.prototype = {
	getBeamflags: function() {
		var firstpass = [];
		var noteIdx = 0;
		var holder = [];
		var _g = 0;
		var _g1 = this.beamgroup.pnotes;
		while(_g < _g1.length) {
			var note = _g1[_g];
			++_g;
			var a = this.beamgroup.pnotes;
			var idx = noteIdx + 1;
			var nextnote = a == null ? null : idx < 0 || idx > a.length - 1 ? null : a[idx];
			if(nextnote == null) {
				continue;
			}
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
			++noteIdx;
		}
		var result = [];
		var _g2 = 0;
		while(_g2 < firstpass.length) {
			var r = firstpass[_g2];
			++_g2;
			var idx1 = firstpass.indexOf(r);
			var idx2 = firstpass.indexOf(r);
			var rprev = idx2 <= 0 ? null : firstpass[idx2 - 1];
			if((idx1 == -1 ? null : idx1 == firstpass.length - 1 ? null : firstpass[idx1 + 1]) == nx3_EBeamflagType.Full16 && r == nx3_EBeamflagType.End16) {
				result.push(nx3_EBeamflagType.None);
			} else if(rprev == nx3_EBeamflagType.Full16 && r == nx3_EBeamflagType.Start16) {
				result.push(nx3_EBeamflagType.None);
			} else {
				result.push(r);
			}
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
	while(_g < pnotes.length) pnotes[_g++].beamgroup = this;
};
$hxClasses["nx3.PBeamgroup"] = nx3_PBeamgroup;
nx3_PBeamgroup.__name__ = ["nx3","PBeamgroup"];
nx3_PBeamgroup.prototype = {
	getValue: function() {
		if(this.value != null) {
			return this.value;
		}
		this.value = 0;
		var _g = 0;
		var _g1 = this.pnotes;
		while(_g < _g1.length) this.value += nx3_ENoteValTools.value(_g1[_g++].nnote.value);
		return this.value;
	}
	,setDirection: function(direction) {
		this.direction = direction;
	}
	,getDirection: function() {
		if(this.direction == null) {
			new nx3_PPartbeamgroupsDirectionCalculator(this.voice.getPart()).calculateBeamgroupsDirections();
		}
		return this.direction;
	}
	,getPVoice: function() {
		return this.voice;
	}
	,getNotesStemXPositions: function() {
		if(this.stavexpositions != null) {
			return this.stavexpositions;
		}
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
		if(this.frame != null) {
			return this.frame;
		}
		var firstnote = this.pnotes[0].nnote;
		var e = firstnote.type;
		if($hxEnums[e.__enum__].__constructs__[e._hx_index] != "Note") {
			return null;
		}
		if(this.pnotes.length == 1) {
			if(nx3_ENoteValTools.stavinglevel(firstnote.value) <= 0) {
				return null;
			}
		}
		this.frame = new nx3_PBeamgroupFrameCalculator(this).getFrame();
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
$hxClasses["nx3.PBeamgroupDirectionCalculator"] = nx3_PBeamgroupDirectionCalculator;
nx3_PBeamgroupDirectionCalculator.__name__ = ["nx3","PBeamgroupDirectionCalculator"];
nx3_PBeamgroupDirectionCalculator.prototype = {
	getDirection: function() {
		this.topLevel = this.findTopLevel();
		this.bottomLevel = this.findBottomLevel();
		if(this.topLevel + this.bottomLevel <= 0) {
			return nx3_EDirectionUD.Down;
		}
		return nx3_EDirectionUD.Up;
	}
	,findTopLevel: function() {
		var topLevel = this.beamgroup.pnotes[0].nnote.get_topLevel();
		if(this.beamgroup.pnotes.length == 1) {
			return topLevel;
		}
		var _g1 = 1;
		var _g = this.beamgroup.pnotes.length;
		while(_g1 < _g) topLevel = Math.min(topLevel,this.beamgroup.pnotes[_g1++].nnote.get_topLevel()) | 0;
		return topLevel;
	}
	,findBottomLevel: function() {
		var bottomLevel = this.beamgroup.pnotes[0].nnote.get_bottomLevel();
		if(this.beamgroup.pnotes.length == 1) {
			return bottomLevel;
		}
		var _g1 = 1;
		var _g = this.beamgroup.pnotes.length;
		while(_g1 < _g) bottomLevel = Math.max(bottomLevel,this.beamgroup.pnotes[_g1++].nnote.get_bottomLevel()) | 0;
		return bottomLevel;
	}
	,__class__: nx3_PBeamgroupDirectionCalculator
};
var nx3_PBeamgroupFrameCalculator = function(beamgroup) {
	this.beamgroup = beamgroup;
};
$hxClasses["nx3.PBeamgroupFrameCalculator"] = nx3_PBeamgroupFrameCalculator;
nx3_PBeamgroupFrameCalculator.__name__ = ["nx3","PBeamgroupFrameCalculator"];
nx3_PBeamgroupFrameCalculator.prototype = {
	getFrame: function() {
		this.calcLevelArrays();
		return this.calcFramePrototype();
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
		while(_g < _g1.length) levels.push(_g1[_g++].nnote.get_topLevel());
		return levels;
	}
	,getBottomLevels: function() {
		var levels = [];
		var _g = 0;
		var _g1 = this.beamgroup.pnotes;
		while(_g < _g1.length) levels.push(_g1[_g++].nnote.get_bottomLevel());
		return levels;
	}
	,calcLevelArrays: function() {
		switch(this.beamgroup.getDirection()._hx_index) {
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
		var direction = this.beamgroup.getDirection();
		var tips = new nx3_PBamegroupFrameTipCalculator(this.outerLevels,direction).getTips();
		tips.leftTip = direction == nx3_EDirectionUD.Up ? tips.leftTip - 7 : tips.leftTip + 7;
		tips.rightTip = direction == nx3_EDirectionUD.Up ? tips.rightTip - 7 : tips.rightTip + 7;
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
$hxClasses["nx3.PColumn"] = nx3_PColumn;
nx3_PColumn.__name__ = ["nx3","PColumn"];
nx3_PColumn.prototype = {
	getComplexes: function() {
		return this.complexes;
	}
	,getValueposition: function() {
		return this.valueposition;
	}
	,getValue: function() {
		if(this.value == null) {
			throw new js__$Boot_HaxeError("value shouldnt be null");
		}
		return this.value;
	}
	,getMDistance: function() {
		if(this.mdistance == null) {
			throw new js__$Boot_HaxeError("mdistance shouldnt be null");
		}
		return this.mdistance;
	}
	,getMDistanceBenefit: function() {
		if(this.mdistanceBenefit != null) {
			return this.mdistanceBenefit;
		}
		this.mdistanceBenefit = Math.max(0,this.getMDistance() - 3.2);
		return this.mdistanceBenefit;
	}
	,getDistanceDelta: function() {
		if(this.distancedelta != null) {
			return this.distancedelta;
		}
		this.bar.getContentwidth();
		this.distancedelta = this.allottedDistance / this.bar.getAllottedDistanceSum();
		return this.distancedelta;
	}
	,getMPosition: function() {
		return this.mposition;
	}
	,getADistance: function() {
		if(this.adistance != null) {
			return this.adistance;
		}
		this.bar.calculateAPositions();
		return this.adistance;
	}
	,getADistanceBenefit: function() {
		return this.adistanceBenefit;
	}
	,getAPostion: function() {
		if(this.aposition != null) {
			return this.aposition;
		}
		this.bar.calculateAPositions();
		return this.aposition;
	}
	,getSPosition: function() {
		if(this.sposition != null) {
			return this.sposition;
		}
		return this.getAPostion();
	}
	,getRightX: function() {
		if(this.rightX != null) {
			return this.rightX;
		}
		this.rightX = 0;
		var _g = 0;
		var _g1 = this.getComplexes();
		while(_g < _g1.length) {
			var complex = _g1[_g];
			++_g;
			if(complex != null) {
				this.rightX = Math.max(this.rightX,complex.getRightX());
			}
		}
		return this.rightX;
	}
	,getLeftX: function() {
		if(this.leftX != null) {
			return this.leftX;
		}
		this.leftX = 0;
		var _g = 0;
		var _g1 = this.getComplexes();
		while(_g < _g1.length) {
			var complex = _g1[_g];
			++_g;
			if(complex != null) {
				this.leftX = Math.min(this.leftX,complex.getLeftX());
			}
		}
		return this.leftX;
	}
	,getNextComplex: function(complex) {
		var array = this.bar.getColumns();
		if(this == array[array.length - 1]) {
			return null;
		}
		var partIndex = this.getComplexes().indexOf(complex);
		var _g1 = this.bar.getColumns().indexOf(this) + 1;
		var _g = this.bar.getColumns().length;
		while(_g1 < _g) {
			var complex1 = this.bar.getColumns()[_g1++].getComplexes()[partIndex];
			if(complex1 != null) {
				return complex1;
			}
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
$hxClasses["nx3.PColumnsAllotmentCalculator"] = nx3_PColumnsAllotmentCalculator;
nx3_PColumnsAllotmentCalculator.__name__ = ["nx3","PColumnsAllotmentCalculator"];
nx3_PColumnsAllotmentCalculator.prototype = {
	calculate: function(stretch) {
		if(stretch == null) {
			stretch = 0;
		}
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
		switch(this.bar.nbar.allotment._hx_index) {
		case 0:
			return column.getMDistance();
		case 1:
			return this.spacing;
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
$hxClasses["nx3.PColumnsDistancesCalculator"] = nx3_PColumnsDistancesCalculator;
nx3_PColumnsDistancesCalculator.__name__ = ["nx3","PColumnsDistancesCalculator"];
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
				var _g3 = this.bar.getColumns()[0].getComplexes();
				while(_g2 < _g3.length) {
					this.prevLeftComplex.h[complexId] = { leftComplex : _g3[_g2++], columnIdx : 0};
					++complexId;
				}
			} else if(columnIdx < this.bar.getColumns().length) {
				var leftComplexes = leftColumn.getComplexes();
				var rightComplexes = rightColumn.getComplexes();
				var columndistance = 0.0;
				var _g31 = 0;
				var _g21 = leftComplexes.length;
				while(_g31 < _g21) {
					var complexIdx = _g31++;
					columndistance = Math.max(columndistance,this.getComplexDistances(columnIdx,complexIdx,leftComplexes[complexIdx],rightComplexes[complexIdx]));
				}
				var number = columndistance;
				number *= Math.pow(10,6);
				number = Math.round(number) / Math.pow(10,6);
				columndistance = number;
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
				this.prevLeftComplex.h[complexIdx] = { leftComplex : leftComplex, columnIdx : columnIdx - 1};
			}
			return 0;
		}
		if(leftComplex == null) {
			var prevLeftColumnIdx = this.prevLeftComplex.h[complexIdx].columnIdx;
			var distanceBenefit = this.bar.getColumns()[columnIdx - 1].getMPosition() - this.bar.getColumns()[prevLeftColumnIdx].getMPosition();
			return Math.max(0,new nx3_PComplexDistancesCalculator().getDistance(this.prevLeftComplex.h[complexIdx].leftComplex,rightComplex) - distanceBenefit);
		}
		var distance = new nx3_PComplexDistancesCalculator().getDistance(leftComplex,rightComplex);
		this.prevLeftComplex.h[complexIdx] = { leftComplex : leftComplex, columnIdx : columnIdx - 1};
		return distance;
	}
	,__class__: nx3_PColumnsDistancesCalculator
};
var nx3_PColumnsGenerator = function(bar) {
	this.bar = bar;
	this.vparts = this.bar.getParts();
};
$hxClasses["nx3.PColumnsGenerator"] = nx3_PColumnsGenerator;
nx3_PColumnsGenerator.__name__ = ["nx3","PColumnsGenerator"];
nx3_PColumnsGenerator.prototype = {
	getColumns: function() {
		if(this.columns != null) {
			return this.columns;
		}
		this.positions = this.calcPositions(this.vparts);
		this.calcColumns(this.positions,this.vparts);
		return this.columns;
	}
	,calcColumns: function(positions,vparts) {
		this.columns = [];
		this.positionsColumns = new haxe_ds_IntMap();
		var barvalue = this.bar.getValue();
		var idx = 0;
		var _g = 0;
		while(_g < positions.length) {
			var pos = positions[_g];
			++_g;
			var idx1 = idx + 1;
			var nextpos = positions == null ? null : idx1 < 0 || idx1 > positions.length - 1 ? null : positions[idx1];
			if(nextpos == null) {
				nextpos = barvalue;
			}
			var value = nextpos - pos;
			var vcomplexes = [];
			var _g2 = 0;
			var _g1 = this.vparts.length;
			while(_g2 < _g1) {
				var part = this.vparts[_g2++];
				part.getPositionsComplexes();
				vcomplexes.push(part.getPositionsComplexes().h[pos]);
			}
			var vcolumn = new nx3_PColumn(this.bar,vcomplexes,pos,value);
			this.columns.push(vcolumn);
			var _g11 = 0;
			while(_g11 < vcomplexes.length) {
				var complex = vcomplexes[_g11];
				++_g11;
				if(complex != null) {
					complex.column = vcolumn;
				}
			}
			this.positionsColumns.h[pos] = vcolumn;
			++idx;
		}
	}
	,calcPositions: function(vparts) {
		var positionsMap = new haxe_ds_IntMap();
		var _g = 0;
		while(_g < vparts.length) {
			var poss = cx_MapTools.keysToArray(vparts[_g++].getPositionsComplexes().keys()).slice();
			var _g1 = 0;
			while(_g1 < poss.length) positionsMap.h[poss[_g1++]] = true;
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
	if(notes.length > 2) {
		throw new js__$Boot_HaxeError("PComplex nr of PNote(s) limited to max 2 - for now");
	}
	this.notes = notes;
	var _g = 0;
	var _g1 = this.notes;
	while(_g < _g1.length) _g1[_g++].complex = this;
	this.valueposition = valueposition;
};
$hxClasses["nx3.PComplex"] = nx3_PComplex;
nx3_PComplex.__name__ = ["nx3","PComplex"];
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
		if(this.column != null) {
			return this.column;
		}
		this.part.getBar().getColumns();
		if(this.column == null) {
			throw new js__$Boot_HaxeError("this shouldn't happen");
		}
		return this.column;
	}
	,getHeadsRects: function() {
		if(this.headsrects != null) {
			return this.headsrects;
		}
		var firstrects = this.notes[0].getHeadsRects();
		if(this.notes.length == 1) {
			return firstrects;
		}
		var secondrects = this.notes[1].getHeadsRects().slice();
		nx3_geom_RectanglesTools.offset(secondrects,this.getNoteXOffset(this.notes[1]),0);
		this.headsrects = firstrects.concat(secondrects);
		return this.headsrects;
	}
	,getSignsRects: function() {
		if(this.signsrects != null) {
			return this.signsrects;
		}
		if(this.getVisibleSigns().length == 0) {
			return [];
		}
		this.signsrects = new nx3_PSignsRectsCalculator(this.getVisibleSigns()).getSignRects(this.getHeadsRects());
		return this.signsrects;
	}
	,getNoteXOffset: function(note) {
		if(note == this.getNotes()[0]) {
			return 0;
		}
		if(this.secondoffset != null) {
			return this.secondoffset;
		}
		this.secondoffset = new nx3_PNoteOffsetCalculator(this).getNoteOffset(this.getNotes()[1]);
		return this.secondoffset;
	}
	,getSigns: function() {
		if(this.signs != null) {
			return this.signs;
		}
		this.signs = new nx3_PSignsCalculator(this.getNotes()).getSigns();
		return this.signs;
	}
	,getVisibleSigns: function() {
		if(this.visiblesigns != null) {
			return this.visiblesigns;
		}
		this.visiblesigns = new nx3_PSignsCalculator(this.getNotes()).getVisibleSigns();
		return this.visiblesigns;
	}
	,getStavesRects: function() {
		if(this.stavesrects != null) {
			return this.stavesrects;
		}
		this.stavesrects = [];
		var _g = 0;
		var _g1 = this.notes;
		while(_g < _g1.length) {
			var rect = this.getStaveRect(_g1[_g++]);
			if(rect != null) {
				this.stavesrects.push(rect);
			}
		}
		var _g2 = 0;
		var _g11 = this.notes;
		while(_g2 < _g11.length) {
			var flagrect = new nx3_PStaveRectCalculator(_g11[_g2++]).getFlagRect();
			if(flagrect != null) {
				this.stavesrects.push(flagrect);
			}
		}
		return this.stavesrects;
	}
	,getStaveRect: function(note) {
		return new nx3_PStaveRectCalculator(note).getStaveRect();
	}
	,getTieRects: function() {
		if(this.tierects != null) {
			return this.tierects;
		}
		this.tierects = new nx3_PComplexTierectsCalculator(this).getTieRects();
		return this.tierects;
	}
	,getDotRects: function() {
		if(this.dotrects != null) {
			return this.dotrects;
		}
		this.dotrects = new nx3_PComplexDotsrectsCalculator(this).getDotRects();
		return this.dotrects;
	}
	,getBaseRect: function() {
		if(this.baserect != null) {
			return this.baserect;
		}
		this.baserect = new nx3_geom_Rectangle(0,0,0,0);
		var _g = 0;
		var _g1 = this.getNotes();
		while(_g < _g1.length) this.baserect = this.baserect.union(_g1[_g++].getBaseRect());
		return this.baserect;
	}
	,getAllRects: function() {
		if(this.allrects != null) {
			return this.allrects;
		}
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
		if(this.xposition != null) {
			return this.xposition;
		}
		this.getHeadsRects();
		this.xposition = this.getColumn().getSPosition();
		return this.xposition;
	}
	,getIndex: function() {
		return this.part.getComplexes().indexOf(this);
	}
	,getLeftX: function() {
		if(this.leftX != null) {
			return this.leftX;
		}
		this.leftX = this.getRect().x;
		return this.leftX;
	}
	,getRightX: function() {
		if(this.rightX != null) {
			return this.rightX;
		}
		this.rightX = this.getRect().x + this.getRect().width;
		return this.rightX;
	}
	,getNext: function() {
		if(this.next != null) {
			return this.next;
		}
		this.next = this.getColumn().getNextComplex(this);
		return this.next;
	}
	,setTieinfos: function(val) {
		this.tieinfos = val;
	}
	,getTieinfos: function() {
		if(this.tieinfos == null) {
			this.getTieRects();
		}
		if(this.getTieRects().length == 0) {
			return [];
		}
		this.tieinfos = new nx3_PComplexTieTargetCalculator(this.tieinfos).findTargetHeads();
		return this.tieinfos;
	}
	,getHeads: function() {
		var result = [];
		var _g = 0;
		var _g1 = this.getNotes();
		while(_g < _g1.length) result = result.concat(_g1[_g++].heads);
		return result;
	}
	,getHasTie: function() {
		if(this.hasTie != null) {
			return this.hasTie;
		}
		var _g = 0;
		var _g1 = this.getNotes();
		while(_g < _g1.length) if(_g1[_g++].getHasTie() == true) {
			this.hasTie = true;
			return this.hasTie;
		}
		this.hasTie = false;
		return this.hasTie;
	}
	,getHeadLevels: function() {
		if(this.headlevels != null) {
			return this.headlevels;
		}
		this.headlevels = [];
		var _g = 0;
		var _g1 = this.getNotes();
		while(_g < _g1.length) {
			var _g2 = 0;
			var _g3 = _g1[_g++].nnote.get_nheads();
			while(_g2 < _g3.length) this.headlevels.push(_g3[_g2++].level);
		}
		return this.headlevels;
	}
	,toString: function() {
		var str = "PComplex: \r";
		var _g = 0;
		var _g1 = this.getNotes();
		while(_g < _g1.length) str += "- Note: " + Std.string(_g1[_g++].nnote) + "\r";
		return str;
	}
	,__class__: nx3_PComplex
};
var nx3_PComplexDistancesCalculator = function() {
};
$hxClasses["nx3.PComplexDistancesCalculator"] = nx3_PComplexDistancesCalculator;
nx3_PComplexDistancesCalculator.__name__ = ["nx3","PComplexDistancesCalculator"];
nx3_PComplexDistancesCalculator.prototype = {
	getDistance: function(leftComplex,rightComplex) {
		return Math.max(nx3_geom_RectanglesTools.getXIntersection([leftComplex.getBaseRect()],[rightComplex.getBaseRect()]),nx3_geom_RectanglesTools.getXIntersection(leftComplex.getAllRects(),rightComplex.getAllRects()) + 0.6);
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
$hxClasses["nx3.PComplexDotsrectsCalculator"] = nx3_PComplexDotsrectsCalculator;
nx3_PComplexDotsrectsCalculator.__name__ = ["nx3","PComplexDotsrectsCalculator"];
nx3_PComplexDotsrectsCalculator.prototype = {
	getDotRects: function() {
		var nrofnotes = this.complex.getNotes().length;
		var rects = this.getRectsForNote(this.complex.getNotes()[0],false);
		if(nrofnotes == 2) {
			rects = nx3_geom_RectanglesTools.concat(rects,this.getRectsForNote(this.complex.getNotes()[1],true));
		}
		return rects;
	}
	,getRectsForNote: function(note,down) {
		if(down == null) {
			down = false;
		}
		if(nx3_ENoteValTools.dotlevel(note.nnote.value) == 0) {
			return [];
		}
		var rects = [];
		var dotwidth = nx3_ENoteValTools.dotlevel(note.nnote.value) == 1 ? 2.0 : 3.0;
		var headrect = nx3_geom_RectanglesTools.unionAll(note.getHeadsRects());
		var rectX = headrect.x + headrect.width;
		var dotlevels = new haxe_ds_IntMap();
		var _g = 0;
		var _g1 = note.nnote.get_nheads();
		while(_g < _g1.length) {
			var level = _g1[_g++].level;
			var adj = Math.abs((level - 1) % 2) | 0;
			dotlevels.h[down ? level + adj : level - adj] = true;
		}
		var dotkeys = cx_ArrayTools.fromHashKeys(dotlevels.keys());
		var _g2 = 0;
		while(_g2 < dotkeys.length) rects.push(new nx3_geom_Rectangle(rectX,dotkeys[_g2++] - 0.5,dotwidth,1));
		return rects;
	}
	,__class__: nx3_PComplexDotsrectsCalculator
};
var nx3_PComplexTieTargetCalculator = function(tieinfos) {
	this.tieinfos = tieinfos;
};
$hxClasses["nx3.PComplexTieTargetCalculator"] = nx3_PComplexTieTargetCalculator;
nx3_PComplexTieTargetCalculator.__name__ = ["nx3","PComplexTieTargetCalculator"];
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
			if(nextnote == null) {
				continue;
			}
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
$hxClasses["nx3.PComplexTierectsCalculator"] = nx3_PComplexTierectsCalculator;
nx3_PComplexTierectsCalculator.__name__ = ["nx3","PComplexTierectsCalculator"];
nx3_PComplexTierectsCalculator.prototype = {
	getTieRects: function() {
		var nrofnotes = this.complex.getNotes().length;
		var firstnote = this.complex.getNotes()[0];
		var firstties = firstnote.getTies();
		var secondnote = nrofnotes == 2 ? this.complex.getNotes()[1] : null;
		var secondties = nrofnotes == 2 ? this.complex.getNotes()[1].getTies() : [];
		if(firstties == [] && secondties == []) {
			return [];
		}
		this.complex.getHeadsRects();
		this.complex.getDotRects();
		var tieinfos = [];
		var rects = [];
		var headIdx = 0;
		var dotidx = 0;
		var adjusty = 0.0;
		var tiewidth = 3.2;
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
				++dotidx;
			}
			if(head.nhead.tie != null) {
				var tielevel = 0;
				var _g2 = head.nhead.tie;
				if(_g2._hx_index == 0) {
					tielevel = _g2.level;
				}
				var level = head.nhead.level + tielevel;
				var direction = nx3_EDirectionUD.Up;
				if(firstties.length == 1) {
					if(secondnote == null) {
						if(firstnote.getDirection() == nx3_EDirectionUD.Up) {
							++level;
						} else {
							--level;
						}
						direction = firstnote.getDirection() == nx3_EDirectionUD.Up ? nx3_EDirectionUD.Down : nx3_EDirectionUD.Up;
						adjusty = firstnote.getDirection() == nx3_EDirectionUD.Up ? .8 : -.8;
					} else if(firstnote.getDirection() == nx3_EDirectionUD.Up) {
						--level;
					} else {
						--level;
					}
					tiewidth = 3;
				} else {
					var tmp;
					if(secondnote == null) {
						var array = firstnote.getHeads();
						tmp = head == array[array.length - 1];
					} else {
						tmp = false;
					}
					if(tmp) {
						direction = nx3_EDirectionUD.Down;
						adjusty = .5;
					} else {
						adjusty = -.5;
					}
				}
				var r = new nx3_geom_Rectangle(rx,level - 0.8 + adjusty,tiewidth,1.6);
				rects.push(r);
				tieinfos.push({ direction : direction, rect : r, head : head, target : null});
			}
			++headIdx;
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
						++dotidx;
					}
					if(secondties.length == 1) {
						++level1;
						tiewidth = 3;
					}
					var r1 = new nx3_geom_Rectangle(rx1,level1 - 0.8,tiewidth,1.6);
					rects.push(r1);
					tieinfos.push({ direction : nx3_EDirectionUD.Down, rect : r1, head : head1, target : null});
				}
				++headIdx;
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
$hxClasses["nx3.PHead"] = nx3_PHead;
nx3_PHead.__name__ = ["nx3","PHead"];
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
$hxClasses["nx3.PHeadPlacementsCalculator"] = nx3_PHeadPlacementsCalculator;
nx3_PHeadPlacementsCalculator.__name__ = ["nx3","PHeadPlacementsCalculator"];
nx3_PHeadPlacementsCalculator.prototype = {
	getHeadsPlacements: function() {
		if(this.vheads.length == 1) {
			return [{ level : this.vheads[0].nhead.level, pos : nx3_EHeadPosition.Center}];
		}
		var len = this.vheads.length;
		var placements = [];
		var tempArray = [];
		var _g = 0;
		var _g1 = this.vheads;
		while(_g < _g1.length) {
			placements.push({ level : _g1[_g++].nhead.level, pos : nx3_EHeadPosition.Center});
			tempArray.push(0);
		}
		if(this.direction == nx3_EDirectionUD.Up) {
			var _g11 = 0;
			var _g2 = len - 1;
			while(_g11 < _g2) {
				var i = len - _g11++ - 1;
				if(this.vheads[i].nhead.level - this.vheads[i - 1].nhead.level < 2) {
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
				if(this.vheads[i1 + 1].nhead.level - this.vheads[i1].nhead.level < 2) {
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
	this.direction = direction != null ? direction : note.getDirection();
	this.vheads = note.getHeads();
	this.placements = new nx3_PHeadPlacementsCalculator(this.vheads,this.direction).getHeadsPlacements();
	this.notevalue = note.nnote.value;
};
$hxClasses["nx3.PHeadsRectsCalculator"] = nx3_PHeadsRectsCalculator;
nx3_PHeadsRectsCalculator.__name__ = ["nx3","PHeadsRectsCalculator"];
nx3_PHeadsRectsCalculator.prototype = {
	getHeadsRects: function() {
		var rects = [];
		var i = 0;
		var _g = 0;
		var _g1 = this.placements;
		while(_g < _g1.length) {
			var placement = _g1[_g];
			++_g;
			var headw = 0;
			headw = nx3_ENoteValTools.head(this.notevalue)._hx_index == 2 ? 2.2 : 1.6;
			var rect = new nx3_geom_Rectangle(-headw,-1,2 * headw,2);
			var pos = 0.0;
			switch(placement.pos._hx_index) {
			case 0:
				pos = -2 * headw;
				break;
			case 2:
				pos = 2 * headw;
				break;
			default:
				pos = 0;
			}
			rect.offset(pos,placement.level);
			rects.push(rect);
			++i;
		}
		return rects;
	}
	,headRect: function(type,notevalue) {
		switch(type._hx_index) {
		case 0:
			if(nx3_ENoteValTools.head(this.notevalue)._hx_index == 2) {
				return new nx3_geom_Rectangle(-2.2,-1,4.4,2);
			} else {
				return new nx3_geom_Rectangle(-1.6,-1,3.2,2);
			}
			break;
		case 3:
			switch(nx3_ENoteValTools.beaminglevel(this.notevalue)) {
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
	}
	,__class__: nx3_PHeadsRectsCalculator
};
var nx3_PNote = function(nnote) {
	this.nnote = nnote;
};
$hxClasses["nx3.PNote"] = nx3_PNote;
nx3_PNote.__name__ = ["nx3","PNote"];
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
		if(this.heads != null) {
			return this.heads;
		}
		this.heads = [];
		var _g = 0;
		var _g1 = this.nnote.get_nheads();
		while(_g < _g1.length) {
			var phead = new nx3_PHead(_g1[_g++]);
			phead.note = this;
			this.heads.push(phead);
		}
		return this.heads;
	}
	,getBeamgroup: function() {
		if(this.voice == null) {
			throw new js__$Boot_HaxeError("PNote doesn't have a parent PVoice");
		}
		if(this.beamgroup == null) {
			this.voice.getBeamgroups();
		}
		if(this.beamgroup == null) {
			throw new js__$Boot_HaxeError("this should not happen");
		}
		return this.beamgroup;
	}
	,getDirection: function() {
		return this.getBeamgroup().getDirection();
	}
	,getComplex: function() {
		if(this.voice == null) {
			throw new js__$Boot_HaxeError("PNote doesn't have a parent PVoice");
		}
		if(this.complex == null) {
			this.voice.getPart().getComplexes();
		}
		if(this.complex == null) {
			throw new js__$Boot_HaxeError("Shouldn't happen");
		}
		return this.complex;
	}
	,getHeadsRects: function() {
		if(this.voice == null) {
			throw new js__$Boot_HaxeError("PNote doesn't have a parent PVoice");
		}
		if(this.headsRects != null) {
			return this.headsRects;
		}
		this.headsRects = new nx3_PNoteheadsRectsCalculator(this).getHeadsRects();
		return this.headsRects;
	}
	,getStaveRect: function() {
		if(this.voice == null) {
			throw new js__$Boot_HaxeError("PNote doesn't have a parent PVoice");
		}
		if(this.staveRectChecked) {
			return this.staveRect;
		}
		this.staveRect = this.getComplex().getStaveRect(this);
		this.staveRectChecked = true;
		return this.staveRect;
	}
	,getStaveXPosition: function() {
		if(this.voice == null) {
			throw new js__$Boot_HaxeError("PNote doesn't have a parent PVoice");
		}
		if(this.staveXPosition != null) {
			return this.staveXPosition;
		}
		var staverect = this.getStaveRect();
		if(staverect == null) {
			return 0;
		}
		this.staveXPosition = this.getDirection() == nx3_EDirectionUD.Up ? staverect.width : staverect.x;
		return this.staveXPosition;
	}
	,getBaseRect: function() {
		if(this.voice == null) {
			throw new js__$Boot_HaxeError("PNote doesn't have a parent PVoice");
		}
		if(this.baserect != null) {
			return this.baserect;
		}
		this.baserect = new nx3_PBaseRectCalculator(this).getBaseRect();
		return this.baserect;
	}
	,getXOffset: function() {
		if(this.voice == null) {
			throw new js__$Boot_HaxeError("PNote doesn't have a parent PVoice");
		}
		if(this.xoffset != null) {
			return this.xoffset;
		}
		this.xoffset = this.getComplex().getNoteXOffset(this);
		return this.xoffset;
	}
	,getXPosition: function() {
		if(this.voice == null) {
			throw new js__$Boot_HaxeError("PNote doesn't have a parent PVoice");
		}
		if(this.xposition != null) {
			return this.xposition;
		}
		this.xposition = this.getComplex().getXPosition() + this.getXOffset();
		return this.xposition;
	}
	,getTies: function() {
		return this.nnote.get_ties();
	}
	,getNext: function() {
		if(this.voice == null) {
			throw new js__$Boot_HaxeError("PNote doesn't have a parent PVoice");
		}
		if(this.next != null) {
			return this.next;
		}
		var idx = this.voice.getNotes().indexOf(this);
		var a = this.voice.getNotes();
		var idx1 = idx + 1;
		this.next = a == null ? null : idx1 < 0 || idx1 > a.length - 1 ? null : a[idx1];
		return this.next;
	}
	,getHasTie: function() {
		return !Lambda.foreach(this.nnote,function(nhead) {
			return nhead.tie == null;
		});
	}
	,__class__: nx3_PNote
	,__properties__: {get_length:"get_length"}
};
var nx3_PNoteHeadsRectTplCalculator = function(note) {
	this.note = note;
	var _g = note.nnote.type;
	var level = _g._hx_index == 3 ? _g.level : 0;
	var tmp;
	switch(this.note.getVoice().getPart().npart.type._hx_index) {
	case 2:
		tmp = 0;
		break;
	case 3:
		tmp = level * 3;
		break;
	default:
		tmp = 0;
	}
	this.level = tmp;
};
$hxClasses["nx3.PNoteHeadsRectTplCalculator"] = nx3_PNoteHeadsRectTplCalculator;
nx3_PNoteHeadsRectTplCalculator.__name__ = ["nx3","PNoteHeadsRectTplCalculator"];
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
$hxClasses["nx3.PNoteHeadsRectsLyricsCalculator"] = nx3_PNoteHeadsRectsLyricsCalculator;
nx3_PNoteHeadsRectsLyricsCalculator.__name__ = ["nx3","PNoteHeadsRectsLyricsCalculator"];
nx3_PNoteHeadsRectsLyricsCalculator.prototype = {
	getHeadsRects: function() {
		var tightchars = ["i","l","t","j"];
		var widechars = ["m","M","w","W"];
		var totalW = 0;
		var _g1 = 0;
		var _g = this.text.length;
		while(_g1 < _g) {
			var char = this.text.charAt(_g1++);
			if(tightchars.indexOf(char) != -1) {
				totalW += 2;
			} else if(widechars.indexOf(char) != -1) {
				totalW += 5;
			} else {
				totalW += 3;
			}
		}
		var width = totalW += 2;
		return [new nx3_geom_Rectangle(-width / 2,-3.,width,6)];
	}
	,__class__: nx3_PNoteHeadsRectsLyricsCalculator
};
var nx3_PNoteHeadsRectsPausesCalculator = function(vnote) {
	this.vnote = vnote;
};
$hxClasses["nx3.PNoteHeadsRectsPausesCalculator"] = nx3_PNoteHeadsRectsPausesCalculator;
nx3_PNoteHeadsRectsPausesCalculator.__name__ = ["nx3","PNoteHeadsRectsPausesCalculator"];
nx3_PNoteHeadsRectsPausesCalculator.prototype = {
	getHeadsRects: function() {
		var rects;
		switch(nx3_ENoteValTools.beaminglevel(this.vnote.nnote.value)) {
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
		var _g1 = this.vnote.nnote.type;
		if(_g1._hx_index == 1) {
			level = _g1.level;
		}
		rects[0].offset(0,level);
		return rects;
	}
	,__class__: nx3_PNoteHeadsRectsPausesCalculator
};
var nx3_PNoteHeadsRectsPitchCalculator = function(note) {
	this.note = note;
	var _g = note.nnote.type;
	if(_g._hx_index == 7) {
		this.level = _g.level;
		this.midinote = _g.midinote;
	}
	var part = this.note.getVoice().getPart().npart;
	this.chain = part.type._hx_index == 9;
	var _g2 = part.type;
	this.partlevel = _g2._hx_index == 9 ? _g2.leveloffset : 0;
};
$hxClasses["nx3.PNoteHeadsRectsPitchCalculator"] = nx3_PNoteHeadsRectsPitchCalculator;
nx3_PNoteHeadsRectsPitchCalculator.__name__ = ["nx3","PNoteHeadsRectsPitchCalculator"];
nx3_PNoteHeadsRectsPitchCalculator.prototype = {
	getHeadsRects: function() {
		if(!this.chain) {
			return [new nx3_geom_Rectangle(-2,-2,1,4)];
		}
		return [new nx3_geom_Rectangle(-2,-2 + (this.level + this.midinote),1,4)];
	}
	,__class__: nx3_PNoteHeadsRectsPitchCalculator
};
var nx3_PNoteOffsetCalculator = function(complex) {
	this.complex = complex;
};
$hxClasses["nx3.PNoteOffsetCalculator"] = nx3_PNoteOffsetCalculator;
nx3_PNoteOffsetCalculator.__name__ = ["nx3","PNoteOffsetCalculator"];
nx3_PNoteOffsetCalculator.prototype = {
	getNoteOffset: function(note) {
		if(note == this.complex.getNotes()[0]) {
			return 0;
		}
		var secondoffset = nx3_geom_RectanglesTools.getXIntersection(this.complex.notes[0].getHeadsRects(),this.complex.notes[1].getHeadsRects().slice());
		var firstnote = this.complex.getNotes()[0];
		var diff = note.nnote.get_topLevel() - firstnote.nnote.get_bottomLevel();
		if(diff == 1) {
			secondoffset *= 0.8;
		}
		if(diff < 1) {
			if(nx3_ENoteValTools.dotlevel(firstnote.nnote.value) > 0) {
				secondoffset += nx3_ENoteValTools.dotlevel(firstnote.nnote.value) == 1 ? 2.0 : 3.0;
			}
		}
		return secondoffset;
	}
	,__class__: nx3_PNoteOffsetCalculator
};
var nx3_PNoteheadsRectsCalculator = function(note) {
	this.note = note;
};
$hxClasses["nx3.PNoteheadsRectsCalculator"] = nx3_PNoteheadsRectsCalculator;
nx3_PNoteheadsRectsCalculator.__name__ = ["nx3","PNoteheadsRectsCalculator"];
nx3_PNoteheadsRectsCalculator.prototype = {
	getHeadsRects: function() {
		var _g = this.note.nnote.type;
		switch(_g._hx_index) {
		case 0:
			return new nx3_PHeadsRectsCalculator(this.note).getHeadsRects();
		case 1:
			return new nx3_PNoteHeadsRectsPausesCalculator(this.note).getHeadsRects();
		case 3:
			return new nx3_PNoteHeadsRectTplCalculator(this.note).getHeadsRects();
		case 4:
			return new nx3_PNoteHeadsRectsLyricsCalculator(this.note,_g.text,_g.font).getHeadsRects();
		case 7:
			return new nx3_PNoteHeadsRectsPitchCalculator(this.note).getHeadsRects();
		default:
			var e = this.note.nnote.type;
			throw new js__$Boot_HaxeError("Non implemented ENoteType: " + $hxEnums[e.__enum__].__constructs__[e._hx_index]);
		}
	}
	,__class__: nx3_PNoteheadsRectsCalculator
};
var nx3_PPart = function(npart) {
	this.rect = null;
	this.npart = npart;
	this.value = 0;
};
$hxClasses["nx3.PPart"] = nx3_PPart;
nx3_PPart.__name__ = ["nx3","PPart"];
nx3_PPart.prototype = {
	iterator: function() {
		return HxOverrides.iter(this.getVoices());
	}
	,get_length: function() {
		return this.getVoices().length;
	}
	,getBar: function() {
		return this.bar;
	}
	,getVoices: function() {
		if(this.voices != null) {
			return this.voices;
		}
		this.voices = [];
		var _g = 0;
		var _g1 = this.npart.nvoices;
		while(_g < _g1.length) {
			var voice = new nx3_PVoice(_g1[_g++]);
			voice.part = this;
			this.voices.push(voice);
		}
		return this.voices;
	}
	,getVoice: function(idx) {
		if(idx < 0 || idx > this.getVoices().length) {
			return null;
		} else {
			return this.getVoices()[idx];
		}
	}
	,getComplexes: function() {
		if(this.complexes != null) {
			return this.complexes;
		}
		this.complexes = new nx3_PPartComplexesGenerator(this).getComplexes();
		return this.complexes;
	}
	,getPositionsComplexes: function() {
		if(this.positionsComplexes != null) {
			return this.positionsComplexes;
		}
		this.positionsComplexes = new haxe_ds_IntMap();
		var _g = 0;
		var _g1 = this.getComplexes();
		while(_g < _g1.length) {
			var complex = _g1[_g];
			++_g;
			this.positionsComplexes.h[complex.getValueposition()] = complex;
		}
		return this.positionsComplexes;
	}
	,getIndex: function() {
		return this.bar.getParts().indexOf(this);
	}
	,getValue: function() {
		if(this.value != 0) {
			return this.value;
		}
		var _g = 0;
		var _g1 = this.getVoices();
		while(_g < _g1.length) this.value = Math.max(this.value,_g1[_g++].getValue()) | 0;
		return this.value;
	}
	,getRect: function() {
		if(this.rect != null) {
			return this.rect;
		}
		var result = this.npart.type._hx_index == 0 ? new nx3_geom_Rectangle(0,-8,1,13) : new nx3_geom_Rectangle(0,-4,1,8);
		var _g1 = 0;
		var _g2 = this.getComplexes();
		while(_g1 < _g2.length) result = result.union(_g2[_g1++].getRect());
		var _g11 = 0;
		var _g21 = this.getVoices();
		while(_g11 < _g21.length) {
			var _g3 = 0;
			var _g4 = _g21[_g11++].getBeamgroups();
			while(_g3 < _g4.length) {
				var beamgroup = _g4[_g3];
				++_g3;
				var dir = beamgroup.getDirection();
				var frame = beamgroup.getFrame();
				if(frame == null) {
					continue;
				}
				var top = dir == nx3_EDirectionUD.Up ? Math.min(frame.leftTipY,frame.rightTipY) : 0;
				result = result.union(new nx3_geom_Rectangle(0,top,1,(dir == nx3_EDirectionUD.Up ? 0 : Math.max(frame.leftTipY,frame.rightTipY)) - top));
			}
		}
		this.rect = result;
		return result;
	}
	,getYAbove: function() {
		var result = 0.0;
		var index = this.bar.getParts().indexOf(this);
		if(index == 0) {
			result = this.getRect().y;
		} else {
			result = this.bar.getPart(index - 1).getRect().get_bottom() + -this.getRect().y;
		}
		return result;
	}
	,__class__: nx3_PPart
	,__properties__: {get_length:"get_length"}
};
var nx3_PPartComplexesGenerator = function(part) {
	this.part = part;
	this.vvoices = part.getVoices();
};
$hxClasses["nx3.PPartComplexesGenerator"] = nx3_PPartComplexesGenerator;
nx3_PPartComplexesGenerator.__name__ = ["nx3","PPartComplexesGenerator"];
nx3_PPartComplexesGenerator.prototype = {
	getComplexes: function() {
		if(this.complexes != null) {
			return this.complexes;
		}
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
			var vcomplex = new nx3_PComplex(this.part,positions.h[pos],pos);
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
				var npos = vvoice.getNotePositions().h[vnote.__id__];
				if(!positionsMap.h.hasOwnProperty(npos)) {
					positionsMap.h[npos] = [];
				}
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
$hxClasses["nx3.PPartbeamgroupsDirectionCalculator"] = nx3_PPartbeamgroupsDirectionCalculator;
nx3_PPartbeamgroupsDirectionCalculator.__name__ = ["nx3","PPartbeamgroupsDirectionCalculator"];
nx3_PPartbeamgroupsDirectionCalculator.prototype = {
	calculateBeamgroupsDirections: function() {
		var partbeamgroups = [];
		var _g = 0;
		var _g1 = this.ppart.getVoices();
		while(_g < _g1.length) partbeamgroups.push(_g1[_g++].getBeamgroups());
		var beamgroups0 = partbeamgroups[0];
		var voiceDirection0 = this.ppart.getVoices()[0].nvoice.direction;
		if(voiceDirection0 == null) {
			voiceDirection0 = nx3_EDirectionUAD.Auto;
		}
		if(partbeamgroups.length == 1) {
			var _g2 = 0;
			while(_g2 < beamgroups0.length) {
				var beamgroup = beamgroups0[_g2];
				++_g2;
				var direction = null;
				switch(voiceDirection0._hx_index) {
				case 0:
					direction = nx3_EDirectionUD.Up;
					break;
				case 1:
					direction = new nx3_PBeamgroupDirectionCalculator(beamgroup).getDirection();
					break;
				case 2:
					direction = nx3_EDirectionUD.Down;
					break;
				}
				beamgroup.setDirection(direction);
			}
		} else if(partbeamgroups.length == 2) {
			var beamgroups1 = partbeamgroups[1];
			var voiceDirection1 = this.ppart.getVoices()[1].nvoice.direction;
			if(voiceDirection1 == null) {
				voiceDirection0 = nx3_EDirectionUAD.Auto;
			}
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
					if(bgPosition < voice1value) {
						direction1 = nx3_EDirectionUD.Up;
					} else {
						direction1 = new nx3_PBeamgroupDirectionCalculator(beamgroup1).getDirection();
					}
					beamgroup1.setDirection(direction1);
					bgPosition += beamgroup1.getValue();
				}
				var bgPosition1 = 0;
				var _g4 = 0;
				while(_g4 < beamgroups1.length) {
					var beamgroup2 = beamgroups1[_g4];
					++_g4;
					if(bgPosition1 < voice0value) {
						direction1 = nx3_EDirectionUD.Down;
					} else {
						direction1 = new nx3_PBeamgroupDirectionCalculator(beamgroup2).getDirection();
					}
					beamgroup2.setDirection(direction1);
					bgPosition1 += beamgroup2.getValue();
				}
			} else {
				var _g5 = 0;
				while(_g5 < beamgroups0.length) beamgroups0[_g5++].setDirection(nx3_EDirectionTools.uadToUd(voice0.nvoice.direction));
				var _g6 = 0;
				while(_g6 < beamgroups1.length) beamgroups1[_g6++].setDirection(nx3_EDirectionTools.uadToUd(voice1.nvoice.direction));
			}
		} else {
			throw new js__$Boot_HaxeError("SHOULDN'T HAPPEN");
		}
	}
	,__class__: nx3_PPartbeamgroupsDirectionCalculator
};
var nx3_PScore = function(nscore) {
	this.prevSystemwidth = 0;
	this.nscore = nscore;
};
$hxClasses["nx3.PScore"] = nx3_PScore;
nx3_PScore.__name__ = ["nx3","PScore"];
nx3_PScore.prototype = {
	getBars: function() {
		if(this.bars != null) {
			return this.bars;
		}
		this.bars = [];
		var _g = 0;
		var _g1 = this.nscore.nbars;
		while(_g < _g1.length) {
			var bar = new nx3_PBar(_g1[_g++]);
			bar.score = this;
			this.bars.push(bar);
		}
		return this.bars;
	}
	,getNBars: function() {
		var result = [];
		var _g = 0;
		var _g1 = this.getBars();
		while(_g < _g1.length) result.push(_g1[_g++].nbar);
		return result;
	}
	,getSystems: function(systemwidth) {
		if(systemwidth != this.prevSystemwidth) {
			this.systems = null;
		}
		if(this.systems != null) {
			return this.systems;
		}
		this.systems = new nx3_PScoreSystemsGenerator(this,this.getBars()).getsSystems([systemwidth]);
		var _g = 0;
		var _g1 = this.systems;
		while(_g < _g1.length) _g1[_g++].calculateSystembarXs();
		var _g2 = 0;
		var _g11 = this.systems;
		while(_g2 < _g11.length) {
			var system = _g11[_g2];
			++_g2;
			var array = this.systems;
			new nx3_PScoreSystemStretcher(system).stretchTo(system.getSystemBreakWidth(),system != array[array.length - 1] ? 0 : system.getSystemBreakWidth() * .7);
		}
		return this.systems;
	}
	,getBar: function(idx) {
		if(idx < 0 || idx > this.getBars().length) {
			return null;
		} else {
			return this.getBars()[idx];
		}
	}
	,getSystemY: function(system) {
		if(this.systems == null) {
			throw new js__$Boot_HaxeError("Systems == null");
		}
		var systemidx = this.systems.indexOf(system);
		var sysY = .0;
		var _g1 = 0;
		while(_g1 < systemidx) sysY += this.systems[_g1++].getHeight();
		return sysY;
	}
	,getHeight: function() {
		if(this.systems == null) {
			throw new js__$Boot_HaxeError("Systems == null");
		}
		var array = this.systems;
		var lastsystem = array[array.length - 1];
		return this.getSystemY(lastsystem) + lastsystem.getHeight();
	}
	,getWidth: function() {
		if(this.systems == null) {
			throw new js__$Boot_HaxeError("Systems == null");
		}
		var w = .0;
		var _g = 0;
		var _g1 = this.systems;
		while(_g < _g1.length) w = Math.max(w,_g1[_g++].getBarsWidth());
		return w;
	}
	,__class__: nx3_PScore
};
var nx3_PScoreSystemStretcher = function(system) {
	this.system = system;
};
$hxClasses["nx3.PScoreSystemStretcher"] = nx3_PScoreSystemStretcher;
nx3_PScoreSystemStretcher.__name__ = ["nx3","PScoreSystemStretcher"];
nx3_PScoreSystemStretcher.prototype = {
	stretchTo: function(stretchSystemToWidth,ifMoreThan) {
		if(ifMoreThan == null) {
			ifMoreThan = 0;
		}
		if(ifMoreThan > 0) {
			if(this.system.getWidth() <= ifMoreThan) {
				return true;
			}
		}
		var diff = stretchSystemToWidth - this.system.getWidth();
		var totalvalue = this.system.getValue();
		var _g = 0;
		var _g1 = this.system.getSystembars();
		while(_g < _g1.length) {
			var systembar = _g1[_g];
			++_g;
			systembar.setBarStretch(systembar.bar.getValue() / totalvalue * diff);
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
$hxClasses["nx3.PScoreSystemsGenerator"] = nx3_PScoreSystemsGenerator;
nx3_PScoreSystemsGenerator.__name__ = ["nx3","PScoreSystemsGenerator"];
nx3_PScoreSystemsGenerator.prototype = {
	getsSystems: function(systemwidths) {
		var tempbars = this.bars.slice();
		var result = [];
		var sysidx = 0;
		var prevbarAttributes = null;
		while(tempbars.length > 0) {
			var system = new nx3_PSystemBarsGenerator(this.score,tempbars,{ showFirstClef : true, showFirstKey : true, showFirstTime : sysidx == 0},prevbarAttributes,(systemwidths == null ? null : sysidx < 0 || sysidx > systemwidths.length - 1 ? null : systemwidths[sysidx]) != null ? systemwidths[sysidx] : systemwidths[0],new nx3_PBarWidthCalculator()).getSystem();
			prevbarAttributes = system.getLastBarAttributes();
			result.push(system);
			++sysidx;
		}
		return result;
	}
	,__class__: nx3_PScoreSystemsGenerator
};
var nx3_PSignsCalculator = function(notes) {
	this.notes = notes;
};
$hxClasses["nx3.PSignsCalculator"] = nx3_PSignsCalculator;
nx3_PSignsCalculator.__name__ = ["nx3","PSignsCalculator"];
nx3_PSignsCalculator.prototype = {
	getSigns: function() {
		var signs = this.calcUnsortedSigns(this.notes);
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
			if(sign.sign == nx3_ESign.None) {
				continue;
			}
			visibleSigns.push(sign);
		}
		return visibleSigns;
	}
	,calcUnsortedSigns: function(notes) {
		var PSigns = [];
		var _g = 0;
		while(_g < notes.length) {
			var _g1 = 0;
			var _g2 = notes[_g++].nnote.get_nheads();
			while(_g1 < _g2.length) {
				var nhead = _g2[_g1];
				++_g1;
				PSigns.push({ sign : nhead.sign, level : nhead.level, position : 0});
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
$hxClasses["nx3.PSignsRectsCalculator"] = nx3_PSignsRectsCalculator;
nx3_PSignsRectsCalculator.__name__ = ["nx3","PSignsRectsCalculator"];
nx3_PSignsRectsCalculator.prototype = {
	getSignRects: function(headsRects) {
		var rects = [];
		if(headsRects == null) {
			headsRects = [];
		}
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
					if(count > 5) {
						break;
					}
					++count;
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
		switch(sign._hx_index) {
		case 0:
			return null;
		case 2:
			return new nx3_geom_Rectangle(0,-3,2.6,5);
		case 5:
			return new nx3_geom_Rectangle(0,-1.5,2.6,3);
		case 6:case 7:case 8:
			return new nx3_geom_Rectangle(0,-2,4.4,4);
		default:
			return new nx3_geom_Rectangle(0,-3,2.6,6);
		}
	}
	,__class__: nx3_PSignsRectsCalculator
};
var nx3_PStaveRectCalculator = function(note) {
	this.note = note;
};
$hxClasses["nx3.PStaveRectCalculator"] = nx3_PStaveRectCalculator;
nx3_PStaveRectCalculator.__name__ = ["nx3","PStaveRectCalculator"];
nx3_PStaveRectCalculator.prototype = {
	getStaveRect: function() {
		var e = this.note.nnote.type;
		if($hxEnums[e.__enum__].__constructs__[e._hx_index] != "Note") {
			return null;
		}
		if(nx3_ENoteValTools.stavinglevel(this.note.nnote.value) < 1) {
			return null;
		}
		var headw = nx3_ENoteValTools.head(this.note.nnote.value)._hx_index == 2 ? 2.2 : 1.6;
		var rect = null;
		if(this.note.getDirection() == nx3_EDirectionUD.Up) {
			rect = new nx3_geom_Rectangle(0,this.note.nnote.get_bottomLevel() - 7,headw,7);
		} else {
			rect = new nx3_geom_Rectangle(-headw,this.note.nnote.get_topLevel(),headw,7);
		}
		rect.offset(this.note.getXOffset(),0);
		return rect;
	}
	,getFlagRect: function() {
		var e = this.note.nnote.type;
		if($hxEnums[e.__enum__].__constructs__[e._hx_index] != "Note") {
			return null;
		}
		if(nx3_ENoteValTools.beaminglevel(this.note.nnote.value) < 1) {
			return null;
		}
		var beamgroup = this.note.getBeamgroup();
		if(beamgroup != null && beamgroup.pnotes.length == 1) {
			if(nx3_ENoteValTools.beaminglevel(this.note.nnote.value) > 0) {
				var headw = nx3_ENoteValTools.head(this.note.nnote.value)._hx_index == 2 ? 2.2 : 1.6;
				var rect = null;
				if(this.note.getDirection() == nx3_EDirectionUD.Up) {
					rect = new nx3_geom_Rectangle(headw,this.note.nnote.get_bottomLevel() - 7,2.6,4.8);
				} else {
					rect = new nx3_geom_Rectangle(-headw,this.note.nnote.get_topLevel() + 7 - 4.8,2.6,4.8);
				}
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
$hxClasses["nx3.PSystem"] = nx3_PSystem;
nx3_PSystem.__name__ = ["nx3","PSystem"];
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
		if(this.systembars.length == 0) {
			return null;
		}
		var array = this.systembars;
		return array[array.length - 1].actAttributes;
	}
	,getSystemBreakWidth: function() {
		return this.systemBreakWidth;
	}
	,getValue: function() {
		if(this.value != null) {
			return this.value;
		}
		this.value = 0;
		var _g = 0;
		var _g1 = this.getSystembars();
		while(_g < _g1.length) this.value += _g1[_g++].bar.getValue();
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
		var _g = 0;
		var _g1 = this.getSystembars();
		while(_g < _g1.length) {
			var systembar = _g1[_g];
			++_g;
			var part = systembar.bar.getPart(partIdx);
			if(part == null) {
				console.log("src/nx3/PSystem.hx:71:","part == null");
				continue;
			}
			var partdistance = 0.0;
			var partrect = part.getRect();
			if(partIdx == 0) {
				partdistance = -partrect.get_top();
			} else {
				partdistance = systembar.bar.getParts()[partIdx - 1].getRect().get_bottom() + -partrect.get_top();
			}
			distance = Math.max(distance,partdistance);
		}
		return distance;
	}
	,getPartY: function(partidx) {
		var party = 0.0;
		var _g1 = 0;
		var _g = partidx + 1;
		while(_g1 < _g) party += this.getSpaceAbovePart(_g1++);
		return party;
	}
	,getTopPartY: function() {
		return this.getPartY(0);
	}
	,getBottomPartY: function() {
		return this.getPartY(this.getSystembars()[0].bar.getParts().length - 1);
	}
	,getHeight: function() {
		var partcount = this.getSystembars()[0].bar.getParts().length - 1;
		var pb = 0.0;
		var _g = 0;
		var _g1 = this.getSystembars();
		while(_g < _g1.length) pb = Math.max(pb,_g1[_g++].bar.getPart(partcount).getRect().get_bottom());
		return this.getPartY(partcount) + pb;
	}
	,getSystembarX: function(systembar) {
		var x = .0;
		var _g = 0;
		var _g1 = this.getSystembars();
		while(_g < _g1.length) {
			var sb = _g1[_g];
			++_g;
			if(sb == systembar) {
				return x;
			}
			x += sb.getBarMeasurements().getTotalWidth();
		}
		return 0;
	}
	,getBarsWidth: function() {
		var array = this.getSystembars();
		var lastbar = array[array.length - 1];
		return this.getSystembarX(lastbar) + lastbar.getBarMeasurements().getTotalWidth();
	}
	,getY: function() {
		if(this.score == null) {
			return 0;
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
$hxClasses["nx3.PSystemBar"] = nx3_PSystemBar;
nx3_PSystemBar.__name__ = ["nx3","PSystemBar"];
nx3_PSystemBar.prototype = {
	setBarStretch: function(amount) {
		if(amount == this.stretchamount) {
			return;
		}
		var calculator = new nx3_PBarStretchCalculator(this);
		if(amount == 0) {
			calculator.resetStretch();
		} else {
			calculator.stretch(amount);
		}
	}
	,getBarMeasurements: function() {
		if(this.barMeasurements != null) {
			return this.barMeasurements;
		}
		this.barMeasurements = new nx3_PSystembarMeasurements(this.bar).init(this.actAttributes,this.barConfig,this.caAttributes);
		return this.barMeasurements;
	}
	,getXPosition: function() {
		return this.xposition;
	}
	,getX: function() {
		if(this.system == null) {
			throw new js__$Boot_HaxeError("System == null");
		}
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
$hxClasses["nx3.PSystemBarsGenerator"] = nx3_PSystemBarsGenerator;
nx3_PSystemBarsGenerator.__name__ = ["nx3","PSystemBarsGenerator"];
nx3_PSystemBarsGenerator.prototype = {
	getSystem: function() {
		this.system.systemBreakWidth = this.breakSystemwidth;
		var tryAnotherBar = true;
		while(tryAnotherBar) {
			var currentBar = this.bars[0];
			var currentBarConfig = new nx3_PBarConfig();
			var currentBarAttributes = this.getBarAttributes(currentBar);
			if(this.prevBarAttributes != null) {
				this.overrideActualAttributesFromPrevBarAttributes(currentBarAttributes,currentBar,this.prevBarAttributes);
			}
			this.overrideActualAttributesWithDefaultsIfStillNotSet(currentBarAttributes);
			if(this.system.getSystembars().length == 0) {
				this.adaptBarConfig(currentBar,currentBarConfig,this.prevBarAttributes,this.systemConfig.showFirstClef,this.systemConfig.showFirstKey,this.systemConfig.showFirstTime);
			} else {
				this.adaptBarConfig(currentBar,currentBarConfig,this.prevBarAttributes,this.systemConfig.showFollowingClef,this.systemConfig.showFollowingKey,this.systemConfig.showFollowingTime);
			}
			var currentMeasurements = new nx3_PSystembarMeasurements(currentBar).init(currentBarAttributes,currentBarConfig);
			if(this.system.width + currentMeasurements.getTotalWidth() > this.breakSystemwidth) {
				this.takeCareOfLastBarCautions();
				return this.system;
			}
			this.system.width += currentMeasurements.getTotalWidth();
			this.system.getSystembars().push(new nx3_PSystemBar(this.system,currentBar,currentBarConfig,currentMeasurements,currentBarAttributes,null));
			this.bars.shift();
			this.prevBarAttributes = this.copyBarAttributes(currentBarAttributes);
			if(this.bars.length < 1) {
				tryAnotherBar = false;
			}
		}
		this.system.status = nx3_PSystemStatus.Ok;
		return this.system;
	}
	,takeCareOfLastBarCautions: function() {
		this.system.status = nx3_PSystemStatus.Ok;
		var array = this.system.getSystembars();
		var sysBar = array[array.length - 1].bar;
		var array1 = this.system.getSystembars();
		var sysBarAttributes = array1[array1.length - 1].actAttributes;
		var array2 = this.bars;
		if(sysBar != array2[array2.length - 1]) {
			var nextBarAttributes = this.getBarAttributes(this.bars[0]);
			var newClef = this.arrayBNullOrDiffers(sysBarAttributes.clefs,nextBarAttributes.clefs);
			var newKey = this.arrayBNullOrDiffers(sysBarAttributes.keys,nextBarAttributes.keys);
			var newTime = this.nullOrDiffers(sysBarAttributes.time,nextBarAttributes.time);
			if(newClef || newKey || newTime) {
				var sysBarCautAttributes = this.copyAndRemoveRedundantAttributes(sysBarAttributes,nextBarAttributes);
				var array3 = this.system.getSystembars();
				var sysBarConfig = array3[array3.length - 1].barConfig;
				var array4 = this.system.getSystembars();
				var sysBarWidth = array4[array4.length - 1].getBarMeasurements().getTotalWidth();
				var sysBarConfigWithCautions = new nx3_PBarConfig(sysBarConfig.showClef,sysBarConfig.showKey,sysBarConfig.showTime);
				if(newClef) {
					sysBarConfigWithCautions.showCautClef = true;
				}
				if(newKey) {
					sysBarConfigWithCautions.showCautKey = true;
				}
				if(newTime) {
					sysBarConfigWithCautions.showCautTime = true;
				}
				if(this.system.width - sysBarWidth + new nx3_PSystembarMeasurements(sysBar).init(sysBarAttributes,sysBarConfigWithCautions,sysBarCautAttributes).getTotalWidth() <= this.breakSystemwidth) {
					var array5 = this.system.getSystembars();
					array5[array5.length - 1].caAttributes = sysBarCautAttributes;
					var array6 = this.system.getSystembars();
					array6[array6.length - 1].barConfig = sysBarConfigWithCautions;
					var tmp = this.system.getWidth() - sysBarWidth;
					var array7 = this.system.getSystembars();
					var tmp1 = array7[array7.length - 1].getBarMeasurements().getTotalWidth();
					this.system.width = tmp + tmp1;
				} else {
					this.system.status = nx3_PSystemStatus.Problem(101,"Last bar fits without caution attributes but not with them");
					if(this.system.getSystembars().length == 1) {
						this.system.status = nx3_PSystemStatus.Problem(102,"First bar doesn't fit when adding required cational attributes");
						return;
					}
					this.system.getSystembars().pop();
					this.bars.unshift(sysBar);
					this.system.width -= sysBarWidth;
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
			if(result.clefs[i] == sysBarAttributes.clefs[i]) {
				result.clefs[i] = null;
			}
		}
		var _g11 = 0;
		var _g2 = sysBarAttributes.keys.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			if(result.keys[i1] == sysBarAttributes.keys[i1]) {
				result.keys[i1] = null;
			}
		}
		if(result.time == sysBarAttributes.time) {
			result.time = null;
		}
		return result;
	}
	,adaptBarConfig: function(bar,barConfig,prevBarAttributes,showClef,showKey,showTime) {
		showClef = showClef == true;
		showKey = showKey == true;
		showTime = showTime == true;
		this.getBarAttributes(bar);
		switch(bar.get_displayClefs()._hx_index) {
		case 0:
			barConfig.showClef = true;
			break;
		case 2:
			barConfig.showClef = false;
			break;
		default:
			barConfig.showClef = showClef;
			if(showClef == false && prevBarAttributes != null) {
				var _g1 = 0;
				var _g = prevBarAttributes.clefs.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(bar.get_clefs()[i] == null) {
						continue;
					}
					if(bar.get_clefs()[i] == prevBarAttributes.clefs[i]) {
						continue;
					}
					barConfig.showClef = true;
					break;
				}
			}
		}
		switch(bar.get_displayKeys()._hx_index) {
		case 0:
			barConfig.showKey = true;
			break;
		case 2:
			barConfig.showKey = false;
			break;
		default:
			barConfig.showKey = showKey;
			if(showKey == false && prevBarAttributes != null) {
				var _g2 = 0;
				var _g11 = prevBarAttributes.keys.length;
				while(_g2 < _g11) {
					var i1 = _g2++;
					if(bar.get_keys()[i1] == null) {
						continue;
					}
					if(bar.get_keys()[i1] == prevBarAttributes.keys[i1]) {
						continue;
					}
					barConfig.showKey = true;
					break;
				}
			}
		}
		switch(bar.get_displayTime()._hx_index) {
		case 0:
			barConfig.showTime = true;
			break;
		case 2:
			barConfig.showTime = false;
			break;
		default:
			barConfig.showTime = showTime;
			if(showTime == false && prevBarAttributes != null) {
				if(bar.get_time() != null) {
					if(bar.get_time() != prevBarAttributes.time) {
						barConfig.showTime = true;
					}
				}
			}
			if(bar.get_time() == null) {
				barConfig.showTime = false;
			}
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
			if(currentBarAttributes.clefs[i] == null) {
				currentBarAttributes.clefs[i] = nx3_PSystemBarsGenerator.defaultClef;
			}
		}
		var _g11 = 0;
		var _g2 = currentBarAttributes.keys.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			if(currentBarAttributes.keys[i1] == null) {
				currentBarAttributes.keys[i1] = nx3_PSystemBarsGenerator.defaultKey;
			}
		}
		if(currentBarAttributes.time == null) {
			currentBarAttributes.time = nx3_PSystemBarsGenerator.defaultTime;
		}
	}
	,overrideActualAttributesFromPrevBarAttributes: function(currentBarAttributes,currentBar,prevBarAttributes) {
		if(!this.compareBarAttributesValidity(currentBarAttributes,prevBarAttributes)) {
			throw new js__$Boot_HaxeError("Attributes non compatible");
		}
		var _g1 = 0;
		var _g = currentBar.get_clefs().length;
		while(_g1 < _g) {
			var i = _g1++;
			if(currentBar.get_clefs()[i] == null && prevBarAttributes.clefs[i] != null) {
				currentBarAttributes.clefs[i] = prevBarAttributes.clefs[i];
			}
		}
		var _g11 = 0;
		var _g2 = currentBar.get_keys().length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			if(currentBar.get_keys()[i1] == null && prevBarAttributes.keys[i1] != null) {
				currentBarAttributes.keys[i1] = prevBarAttributes.keys[i1];
			}
		}
		if(currentBar.get_time() == null && prevBarAttributes.time != null) {
			currentBarAttributes.time = prevBarAttributes.time;
		}
	}
	,getBarAttributes: function(bar) {
		var time = bar.get_time() != null ? [bar.get_time()].slice()[0] : null;
		return { clefs : bar.get_clefs().slice(), keys : bar.get_keys().slice(), time : time};
	}
	,compareBarAttributesValidity: function(barAttributesA,barAttributesB) {
		if(barAttributesA.clefs.length != barAttributesB.clefs.length) {
			return false;
		}
		if(barAttributesA.keys.length != barAttributesB.keys.length) {
			return false;
		}
		return true;
	}
	,arrayBNullOrDiffers: function(itemA,itemB) {
		if(cx_ArrayTools.allNull(itemB)) {
			return false;
		}
		var _g1 = 0;
		var _g = itemA.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(itemB[i] != null && itemB[i] != itemA[i]) {
				return true;
			}
		}
		return false;
	}
	,nullOrDiffers: function(itemA,itemB) {
		if(itemB == null) {
			return false;
		}
		return itemB != itemA;
	}
	,__class__: nx3_PSystemBarsGenerator
};
var nx3_PSystemStatus = $hxEnums["nx3.PSystemStatus"] = { __ename__ : true, __constructs__ : ["Ok","Problem"]
	,Ok: {_hx_index:0,__enum__:"nx3.PSystemStatus",toString:$estr}
	,Problem: ($_=function(code,msg) { return {_hx_index:1,code:code,msg:msg,__enum__:"nx3.PSystemStatus",toString:$estr}; },$_.__params__ = ["code","msg"],$_)
};
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
$hxClasses["nx3.PSystembarMeasurements"] = nx3_PSystembarMeasurements;
nx3_PSystembarMeasurements.__name__ = ["nx3","PSystembarMeasurements"];
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
		if(barConfig.showClef) {
			this.clefWidth = calculator.getClefsWidth(barAttributes.clefs);
		}
		if(barConfig.showKey) {
			this.keyWidth = calculator.getKeysWidth(barAttributes.keys);
		}
		if(barConfig.showTime) {
			this.timeWidth += calculator.getTimeWidth(barAttributes.time);
		}
		this.leftContentMarginWidth = calculator.getContentLeftMarginWidth(this.bar);
		this.contentWidth = calculator.getContentWidth(this.bar);
		this.contentXZero = this.bar.getContentXZero();
		if(barConfig.showCautClef && cautAttributes != null) {
			this.cautClefWidth = calculator.getClefsWidth(cautAttributes.clefs);
		}
		if(barConfig.showCautKey && cautAttributes != null) {
			this.cautKeyWidth = calculator.getKeysWidth(cautAttributes.keys);
		}
		if(barConfig.showCautTime && cautAttributes != null) {
			this.cautTimeWidth += calculator.getTimeWidth(cautAttributes.time);
		}
		this.barlineWidth = calculator.getBarlineWidth(nx3_EBarline.Normal);
		return this;
	}
	,__class__: nx3_PSystembarMeasurements
};
var nx3_PVoice = function(nvoice) {
	this.nvoice = nvoice;
};
$hxClasses["nx3.PVoice"] = nx3_PVoice;
nx3_PVoice.__name__ = ["nx3","PVoice"];
nx3_PVoice.prototype = {
	iterator: function() {
		return HxOverrides.iter(this.getNotes());
	}
	,get_length: function() {
		return this.getNotes().length;
	}
	,getPart: function() {
		return this.part;
	}
	,getNotes: function() {
		if(this.notes != null) {
			return this.notes;
		}
		this.notes = [];
		var _g = 0;
		var _g1 = this.nvoice.nnotes;
		while(_g < _g1.length) {
			var pnote = new nx3_PNote(_g1[_g++]);
			pnote.voice = this;
			this.notes.push(pnote);
		}
		return this.notes;
	}
	,getNote: function(idx) {
		if(idx < 0 || idx > this.getNotes().length) {
			return null;
		} else {
			return this.getNotes()[idx];
		}
	}
	,getValue: function() {
		if(this.value != null) {
			return this.value;
		}
		if(this.notes == null) {
			this.getNotes();
		}
		this.value = 0;
		var _g = 0;
		var _g1 = this.notes;
		while(_g < _g1.length) this.value += nx3_ENoteValTools.value(_g1[_g++].nnote.value);
		return this.value;
	}
	,getBeamgroups: function(pattern) {
		if(pattern != null && pattern != this.beampattern) {
			this.beampattern = pattern;
			this.beamgroups = null;
		}
		if(this.beamgroups != null) {
			return this.beamgroups;
		}
		this.beamgroups = new nx3_PVoiceBeamgroupsGenerator(this.getNotes(),pattern).getBeamgroups();
		return this.beamgroups;
	}
	,getNotePositions: function() {
		if(this.pnotePositions != null) {
			return this.pnotePositions;
		}
		if(this.notes == null) {
			this.getNotes();
		}
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
	,__properties__: {get_length:"get_length"}
};
var nx3_PVoiceBeamgroupsGenerator = function(pnotes,pattern) {
	if(pattern == null) {
		pattern = [nx3_ENoteVal.Nv4];
	}
	this.voice = pnotes[0].getVoice();
	this.notes = pnotes;
	this.pattern = pattern;
	this.adjustPatternLenght();
};
$hxClasses["nx3.PVoiceBeamgroupsGenerator"] = nx3_PVoiceBeamgroupsGenerator;
nx3_PVoiceBeamgroupsGenerator.__name__ = ["nx3","PVoiceBeamgroupsGenerator"];
nx3_PVoiceBeamgroupsGenerator.prototype = {
	getBeamgroups: function() {
		return this.createBeamgroups(this.getNotesBeamgroupPosIndexes(this.getPatternPositions(),this.getNotesPositions()));
	}
	,createBeamgroups: function(indexes) {
		var noteIdx = 0;
		var prevBeamgroupPosIdx = -1;
		var groupIdx = -1;
		var result = [];
		var pnoteGroupIdx = [];
		var _g = 0;
		var _g1 = this.notes;
		while(_g < _g1.length) {
			++_g;
			var beamgroupPosIdx = indexes[noteIdx];
			if(beamgroupPosIdx == -1) {
				++groupIdx;
				pnoteGroupIdx.push(groupIdx);
			} else {
				if(prevBeamgroupPosIdx != beamgroupPosIdx) {
					++groupIdx;
				}
				pnoteGroupIdx.push(groupIdx);
			}
			prevBeamgroupPosIdx = beamgroupPosIdx;
			++noteIdx;
		}
		var noteIdx1 = 0;
		var grouppnotes = [];
		var _g2 = 0;
		var _g11 = this.notes;
		while(_g2 < _g11.length) {
			var pnote = _g11[_g2++];
			var groupIdx1 = pnoteGroupIdx[noteIdx1];
			if(grouppnotes[groupIdx1] == null) {
				grouppnotes[groupIdx1] = [];
			}
			grouppnotes[groupIdx1].push(pnote);
			++noteIdx1;
		}
		var _g3 = 0;
		while(_g3 < grouppnotes.length) result.push(new nx3_PBeamgroup(grouppnotes[_g3++]));
		return result;
	}
	,getNotesBeamgroupPosIndexes: function(patternPositions,notesPositions) {
		var findPatternIdxForNote = function(curNotePos) {
			var _g1 = 0;
			var _g = patternPositions.length;
			while(_g1 < _g) {
				var p = _g1++;
				var curPatternPos = patternPositions[p];
				if(curNotePos.start >= curPatternPos.start && curNotePos.end <= curPatternPos.end) {
					return p;
				}
			}
			return -1;
		};
		var result = [];
		var _g11 = 0;
		var _g2 = this.notes.length;
		while(_g11 < _g2) {
			var n = _g11++;
			var curNotePos1 = notesPositions[n];
			var nnote = this.notes[n].nnote;
			var patternIdx;
			switch(nnote.type._hx_index) {
			case 0:
				patternIdx = nx3_ENoteValTools.beaminglevel(nnote.value) <= 0 ? -1 : findPatternIdxForNote(curNotePos1);
				break;
			case 1:
				patternIdx = -1;
				break;
			default:
				patternIdx = -1;
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
			var value = nx3_ENoteValTools.value(_g1[_g++].nnote.value);
			result.push({ start : currPos, end : currPos + value});
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
			var value = nx3_ENoteValTools.value(_g1[_g++]);
			result.push({ start : currPos, end : currPos + value});
			currPos += value;
		}
		return result;
	}
	,adjustPatternLenght: function() {
		var notesValue = 0;
		var _g = 0;
		var _g1 = this.notes;
		while(_g < _g1.length) notesValue += nx3_ENoteValTools.value(_g1[_g++].nnote.value);
		var patternValue = 0;
		var _g2 = 0;
		var _g11 = this.pattern;
		while(_g2 < _g11.length) patternValue += nx3_ENoteValTools.value(_g11[_g2++]);
		while(patternValue < notesValue) {
			this.pattern = this.pattern.concat(this.pattern);
			patternValue *= 2;
		}
	}
	,__class__: nx3_PVoiceBeamgroupsGenerator
};
var nx3_action_EActionInfo = $hxEnums["nx3.action.EActionInfo"] = { __ename__ : true, __constructs__ : ["TargetXY"]
	,TargetXY: ($_=function(target,x,y) { return {_hx_index:0,target:target,x:x,y:y,__enum__:"nx3.action.EActionInfo",toString:$estr}; },$_.__params__ = ["target","x","y"],$_)
};
var nx3_action_EActionType = $hxEnums["nx3.action.EActionType"] = { __ename__ : true, __constructs__ : ["HeadAction","NoteAction"]
	,HeadAction: ($_=function(type,head,info) { return {_hx_index:0,type:type,head:head,info:info,__enum__:"nx3.action.EActionType",toString:$estr}; },$_.__params__ = ["type","head","info"],$_)
	,NoteAction: ($_=function(type,note,info) { return {_hx_index:1,type:type,note:note,info:info,__enum__:"nx3.action.EActionType",toString:$estr}; },$_.__params__ = ["type","note","info"],$_)
};
var nx3_geom_BezieerTool = function() { };
$hxClasses["nx3.geom.BezieerTool"] = nx3_geom_BezieerTool;
nx3_geom_BezieerTool.__name__ = ["nx3","geom","BezieerTool"];
nx3_geom_BezieerTool.bezieerCoordinates = function(anchor1,control1,control2,anchor2,lineWidth,lineColor,segments) {
	if(segments == null) {
		segments = 10;
	}
	if(lineColor == null) {
		lineColor = 0;
	}
	if(lineWidth == null) {
		lineWidth = 1;
	}
	var coord = [];
	coord.push(anchor1);
	var posx;
	var posy;
	var _g1 = 0;
	while(_g1 < segments) {
		var u = _g1++ / segments;
		posx = Math.pow(u,3) * (anchor2.x + 3 * (control1.x - control2.x) - anchor1.x) + 3 * Math.pow(u,2) * (anchor1.x - 2 * control1.x + control2.x) + 3 * u * (control1.x - anchor1.x) + anchor1.x;
		posy = Math.pow(u,3) * (anchor2.y + 3 * (control1.y - control2.y) - anchor1.y) + 3 * Math.pow(u,2) * (anchor1.y - 2 * control1.y + control2.y) + 3 * u * (control1.y - anchor1.y) + anchor1.y;
		coord.push({ x : posx, y : posy});
	}
	coord.push(anchor2);
	return coord;
};
var nx3_geom_Point = function(x,y) {
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	this.x = x;
	this.y = y;
};
$hxClasses["nx3.geom.Point"] = nx3_geom_Point;
nx3_geom_Point.__name__ = ["nx3","geom","Point"];
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
		if(toCompare.x == this.x) {
			return toCompare.y == this.y;
		} else {
			return false;
		}
	}
	,normalize: function(thickness) {
		if(this.x == 0 && this.y == 0) {
			return;
		} else {
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
	,__properties__: {get_length:"get_length"}
};
var nx3_geom_Rectangle = function(x,y,width,height) {
	if(height == null) {
		height = 0;
	}
	if(width == null) {
		width = 0;
	}
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
};
$hxClasses["nx3.geom.Rectangle"] = nx3_geom_Rectangle;
nx3_geom_Rectangle.__name__ = ["nx3","geom","Rectangle"];
nx3_geom_Rectangle.prototype = {
	clone: function() {
		return new nx3_geom_Rectangle(this.x,this.y,this.width,this.height);
	}
	,contains: function(x,y) {
		if(x >= this.x && y >= this.y && x < this.get_right()) {
			return y < this.get_bottom();
		} else {
			return false;
		}
	}
	,containsPoint: function(point) {
		return this.contains(point.x,point.y);
	}
	,containsRect: function(rect) {
		if(rect.width <= 0 || rect.height <= 0) {
			if(rect.x > this.x && rect.y > this.y && rect.get_right() < this.get_right()) {
				return rect.get_bottom() < this.get_bottom();
			} else {
				return false;
			}
		} else if(rect.x >= this.x && rect.y >= this.y && rect.get_right() <= this.get_right()) {
			return rect.get_bottom() <= this.get_bottom();
		} else {
			return false;
		}
	}
	,copyFrom: function(sourceRect) {
		this.x = sourceRect.x;
		this.y = sourceRect.y;
		this.width = sourceRect.width;
		this.height = sourceRect.height;
	}
	,equals: function(toCompare) {
		if(this.x == toCompare.x && this.y == toCompare.y && this.width == toCompare.width) {
			return this.height == toCompare.height;
		} else {
			return false;
		}
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
		if(r.get_right() > this.get_right()) {
			this.set_right(r.get_right());
		}
		if(r.get_bottom() > this.get_bottom()) {
			this.set_bottom(r.get_bottom());
		}
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
		var x0 = this.x < toIntersect.x ? toIntersect.x : this.x;
		var x1 = this.get_right() > toIntersect.get_right() ? toIntersect.get_right() : this.get_right();
		if(x1 <= x0) {
			return new nx3_geom_Rectangle();
		}
		var y0 = this.y < toIntersect.y ? toIntersect.y : this.y;
		var y1 = this.get_bottom() > toIntersect.get_bottom() ? toIntersect.get_bottom() : this.get_bottom();
		if(y1 <= y0) {
			return new nx3_geom_Rectangle();
		}
		var number = x1 - x0;
		number *= Math.pow(10,6);
		number = Math.round(number) / Math.pow(10,6);
		var number1 = y1 - y0;
		number1 *= Math.pow(10,6);
		number1 = Math.round(number1) / Math.pow(10,6);
		return new nx3_geom_Rectangle(x0,y0,number,number1);
	}
	,intersects: function(toIntersect) {
		if((this.get_right() > toIntersect.get_right() ? toIntersect.get_right() : this.get_right()) <= (this.x < toIntersect.x ? toIntersect.x : this.x)) {
			return false;
		}
		return (this.get_bottom() > toIntersect.get_bottom() ? toIntersect.get_bottom() : this.get_bottom()) > (this.y < toIntersect.y ? toIntersect.y : this.y);
	}
	,isEmpty: function() {
		if(!(this.width <= 0)) {
			return this.height <= 0;
		} else {
			return true;
		}
	}
	,offset: function(dx,dy) {
		var number = this.x + dx;
		number *= Math.pow(10,6);
		number = Math.round(number) / Math.pow(10,6);
		this.x = number;
		var number1 = this.y + dy;
		number1 *= Math.pow(10,6);
		number1 = Math.round(number1) / Math.pow(10,6);
		this.y = number1;
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
		var x0 = this.x > toUnion.x ? toUnion.x : this.x;
		var y0 = this.y > toUnion.y ? toUnion.y : this.y;
		return new nx3_geom_Rectangle(x0,y0,(this.get_right() < toUnion.get_right() ? toUnion.get_right() : this.get_right()) - x0,(this.get_bottom() < toUnion.get_bottom() ? toUnion.get_bottom() : this.get_bottom()) - y0);
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
	,__properties__: {set_topLeft:"set_topLeft",get_topLeft:"get_topLeft",set_top:"set_top",get_top:"get_top",set_size:"set_size",get_size:"get_size",set_right:"set_right",get_right:"get_right",set_left:"set_left",get_left:"get_left",set_bottomRight:"set_bottomRight",get_bottomRight:"get_bottomRight",set_bottom:"set_bottom",get_bottom:"get_bottom"}
};
var nx3_geom_RectanglesTools = function() { };
$hxClasses["nx3.geom.RectanglesTools"] = nx3_geom_RectanglesTools;
nx3_geom_RectanglesTools.__name__ = ["nx3","geom","RectanglesTools"];
nx3_geom_RectanglesTools.getXIntersection = function(rectsA,rectsB) {
	var rectsB2 = [];
	var _g = 0;
	while(_g < rectsB.length) rectsB2.push(rectsB[_g++].clone());
	var check = function() {
		var _g1 = 0;
		while(_g1 < rectsA.length) {
			var ra = rectsA[_g1++];
			var _g11 = 0;
			while(_g11 < rectsB2.length) {
				var i = ra.intersection(rectsB2[_g11++]);
				var number = i.width;
				number *= Math.pow(10,8);
				number = Math.round(number) / Math.pow(10,8);
				i.width = number;
				if(i.width > 0) {
					return i.width;
				}
			}
		}
		return 0;
	};
	var x = 0;
	var moveX = check();
	while(moveX > 0) {
		x += moveX;
		var _g2 = 0;
		while(_g2 < rectsB2.length) rectsB2[_g2++].offset(moveX,0);
		moveX = check();
	}
	return x;
};
nx3_geom_RectanglesTools.clone = function(rects) {
	if(rects == null) {
		return null;
	}
	var result = [];
	var _g = 0;
	while(_g < rects.length) result.push(rects[_g++]);
	return result;
};
nx3_geom_RectanglesTools.offset = function(rects,x,y) {
	var _g = 0;
	while(_g < rects.length) rects[_g++].offset(x,y);
};
nx3_geom_RectanglesTools.unionAll = function(rects) {
	if(rects == null) {
		return null;
	}
	if(rects.length == 1) {
		return rects[0].clone();
	}
	var r = rects[0].clone();
	var _g1 = 1;
	var _g = rects.length;
	while(_g1 < _g) r = r.union(rects[_g1++]);
	return r;
};
nx3_geom_RectanglesTools.concat = function(rectsA,rectsB) {
	var _g = 0;
	while(_g < rectsB.length) rectsA.push(rectsB[_g++]);
	return rectsA;
};
var nx3_render_ITarget = function() { };
$hxClasses["nx3.render.ITarget"] = nx3_render_ITarget;
nx3_render_ITarget.__name__ = ["nx3","render","ITarget"];
nx3_render_ITarget.prototype = {
	__class__: nx3_render_ITarget
};
var nx3_render_Renderer = function(target,targetX,targetY,interactions) {
	if(targetY == null) {
		targetY = 0;
	}
	if(targetX == null) {
		targetX = 0;
	}
	this.target = target;
	this.targetX = targetX;
	this.targetY = targetY;
	this.scaling = this.target.getScaling();
	this.interactions = interactions != null ? interactions : [];
};
$hxClasses["nx3.render.Renderer"] = nx3_render_Renderer;
nx3_render_Renderer.__name__ = ["nx3","render","Renderer"];
nx3_render_Renderer.prototype = {
	xToUnitX: function(x) {
		return x * (1 / this.scaling.unitX);
	}
	,yToUnitY: function(y) {
		return y * (1 / this.scaling.unitY);
	}
	,renderSystem: function(system,newX,newY) {
		if(newY == null) {
			newY = -1;
		}
		if(newX == null) {
			newX = -1;
		}
		if(newX != -1) {
			this.targetX = newX;
		}
		if(newY != -1) {
			this.targetY = newY;
		}
		this.drawSystem(system);
	}
	,renderScore: function(score,newX,newY,systemwidth) {
		if(systemwidth == null) {
			systemwidth = 400;
		}
		if(newY == null) {
			newY = -1;
		}
		if(newX == null) {
			newX = -1;
		}
		if(newX != -1) {
			this.targetX = newX;
		}
		if(newY != -1) {
			this.targetY = newY;
		}
		this.drawSystems(score.getSystems(systemwidth));
		var tmp = score.getWidth();
		this.target.totalWidth = tmp * this.scaling.unitX;
		var tmp1 = score.getHeight();
		this.target.totalHeight = tmp1 * this.scaling.unitY;
		return { width : score.getWidth() * this.scaling.unitX, height : score.getHeight() * this.scaling.unitY};
	}
	,testText: function() {
		this.target.setFont(nx3_Constants.FONT_TEXT_DEFAULTFORMAT);
		this.target.text(0,0,"ABC abc 123");
		var w = this.target.textwidth("ABC abc 123");
		var h = this.target.textheight("ABC abc 123");
		this.target.rectangle(0,0,new nx3_geom_Rectangle(0,0,w,h),1,16711680);
	}
	,addInteraction: function(interaction) {
		this.interactions.push(interaction);
	}
	,drawSystems: function(systems) {
		var _g = 0;
		while(_g < systems.length) this.drawSystem(systems[_g++]);
	}
	,drawSystemExtras: function(systems,system,nx,ny) {
		if(ny == null) {
			ny = 0;
		}
		if(nx == null) {
			nx = 0;
		}
		var tx = this.targetX + nx * this.scaling.unitX;
		var ty = this.targetY + ny * this.scaling.unitY;
		var _g = 0;
		var _g1 = system.getSystembars();
		while(_g < _g1.length) {
			var systembar = _g1[_g];
			++_g;
			if(systembar == system.getSystembars()[0]) {
				if(system != systems[0]) {
					var idx = systems.indexOf(system);
					var array = (idx <= 0 ? null : systems[idx - 1]).getSystembars();
					var tieconnections = array[array.length - 1].bar.getTieConnections();
					var _g2 = 0;
					while(_g2 < tieconnections.length) {
						var connection = tieconnections[_g2];
						++_g2;
						var fromBarX = systembar.getXPosition();
						var fromNoteX = systembar.getBarMeasurements().getLeftContentMarginXPosition() + connection.from.getXPosition();
						var part = connection.to.getComplex().getPart();
						var party = part.getBar().getParts().indexOf(part) * 20 * this.scaling.unitY;
						var tielevel = 0;
						var _g3 = connection.tie;
						if(_g3._hx_index == 0) {
							tielevel = _g3.level;
						}
						this.drawTie(system,tx,ty + party,new nx3_geom_Rectangle(fromBarX + fromNoteX + -5,connection.level + tielevel,3,1),nx3_EDirectionUD.Down);
					}
				}
			}
			var array1 = system.getSystembars();
			if(systembar == array1[array1.length - 1]) {
				var tieconnections1 = systembar.bar.getTieConnections();
				var _g21 = 0;
				while(_g21 < tieconnections1.length) {
					var connection1 = tieconnections1[_g21];
					++_g21;
					var fromBarX1 = systembar.getXPosition();
					var fromNoteX1 = systembar.getBarMeasurements().getLeftContentMarginXPosition() + connection1.from.getXPosition();
					var toBarX = systembar.getXPosition() + systembar.getBarMeasurements().getTotalWidth();
					var part1 = connection1.to.getComplex().getPart();
					var party1 = part1.getBar().getParts().indexOf(part1) * 20 * this.scaling.unitY;
					var tielevel1 = 0;
					var _g31 = connection1.tie;
					if(_g31._hx_index == 0) {
						tielevel1 = _g31.level;
					}
					this.drawTie(system,tx,ty + party1,new nx3_geom_Rectangle(fromBarX1 + fromNoteX1 + 2,connection1.level + tielevel1,toBarX - (fromBarX1 + fromNoteX1),2),nx3_EDirectionUD.Down);
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
					var party2 = part2.getBar().getParts().indexOf(part2) * 20 * this.scaling.unitY;
					var tielevel2 = 0;
					var _g32 = connection2.tie;
					if(_g32._hx_index == 0) {
						tielevel2 = _g32.level;
					}
					this.drawTie(system,tx,ty + party2,new nx3_geom_Rectangle(fromBarX2 + fromNoteX2 + 2,connection2.level + tielevel2,toBarX1 + toNoteX - (fromBarX2 + fromNoteX2) - 2 - 2,2),nx3_EDirectionUD.Down);
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
		systembars[0].bar.getParts()[0].getBar().getParts();
		var partFirstY = system.getPartY(0) * this.scaling.unitY - 4 * this.scaling.unitY;
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
				var part = _g2[_g1];
				++_g1;
				var part_getYPosition = system.getPartY(part.getBar().getParts().indexOf(part));
				if(part.npart.type._hx_index == 0) {
					var barlineX = tx + (barX + barWidth) * this.scaling.unitX;
					this.target.line(barlineX,ty + (part_getYPosition - 4) * this.scaling.unitY,barlineX,ty + (part_getYPosition + 4) * this.scaling.unitY,1.4,0);
					partY = part_getYPosition;
				}
			}
		}
		this.target.line(tx,ty + partFirstY,tx,ty + (partY + 4) * this.scaling.unitY,2,0);
	}
	,drawBarAttributes: function(system,systembar) {
		var _g = 0;
		var _g1 = systembar.bar.getParts();
		while(_g < _g1.length) {
			var part = _g1[_g];
			++_g;
			var e = part.npart.type;
			if($hxEnums[e.__enum__].__constructs__[e._hx_index] != "Normal") {
				continue;
			}
			var partIdx = systembar.bar.getParts().indexOf(part);
			var partX = this.targetX + systembar.getX() * this.scaling.unitX;
			var partY = this.targetY + (system.getY() + system.getPartY(partIdx)) * this.scaling.unitY;
			this.target.testLines(partX,partY,systembar.getBarMeasurements().getTotalWidth() * this.scaling.unitX);
			this.drawBarAttributeClef(system,systembar,part);
			this.drawBarAttributeKey(system,systembar,part);
			this.drawBarAttributeTime(system,systembar,part);
		}
	}
	,drawBarAttributeTime: function(system,systembar,part) {
		if(!systembar.barConfig.showTime) {
			return;
		}
		var acttime = systembar.actAttributes.time;
		var tx = this.targetX + systembar.getX() * this.scaling.unitX;
		var ty = this.targetY;
		var timeX = systembar.getBarMeasurements().getTimeXPosition() * this.scaling.unitX;
		var partidx = part.getBar().getParts().indexOf(part);
		var part_getYPosition = system.getY() + system.getPartY(partidx);
		var timeChars = nx3_ETimeUtils.toString(acttime).split("/");
		if(timeChars.length == 2) {
			this.target.shape(timeChars[0],tx + timeX,ty + -3 * this.scaling.unitY + part_getYPosition * this.scaling.unitY,this.getSvgNumber(timeChars[0]));
			this.target.shape(timeChars[1],tx + timeX,ty + this.scaling.unitY + part_getYPosition * this.scaling.unitY,this.getSvgNumber(timeChars[1]));
		} else {
			this.target.shape(timeChars[0],tx + timeX,ty + -1 * this.scaling.unitY + part_getYPosition * this.scaling.unitY,this.getSvgNumber(timeChars[0]));
		}
	}
	,drawBarAttributeKey: function(system,systembar,part) {
		if(!systembar.barConfig.showKey) {
			return;
		}
		var partidx = systembar.bar.getParts().indexOf(part);
		var part_getYPosition = system.getPartY(partidx);
		var actkey = systembar.actAttributes.keys[partidx];
		var tx = this.targetX + systembar.getX() * this.scaling.unitX;
		var ty = this.targetY + system.getY() * this.scaling.unitY;
		var keyX = systembar.getBarMeasurements().getKeyXPosition() * this.scaling.unitX;
		var keyCode = nx3_EKeysTools.getSigncode(actkey);
		var svgXmlstr = keyCode == -1 ? nx3_render_svg_SvgElements.signFlat : nx3_render_svg_SvgElements.signSharp;
		var keyLevels = nx3_EKeysTools.getLevels(actkey,systembar.actAttributes.clefs[partidx]);
		var _g = 0;
		while(_g < keyLevels.length) {
			var keyY = keyLevels[_g++] * this.scaling.unitY;
			this.target.shape(keyCode == -1 ? "Flat" : "Sharp",tx + keyX,ty + keyY + part_getYPosition * this.scaling.unitY,svgXmlstr);
			keyX += 2.4 * this.target.getScaling().unitX;
		}
	}
	,drawBarAttributeClef: function(system,systembar,part) {
		if(!systembar.barConfig.showClef) {
			return;
		}
		var partidx = systembar.bar.getParts().indexOf(part);
		var part_getYPosition = system.getPartY(partidx);
		var actclef = systembar.actAttributes.clefs[partidx];
		var tx = this.targetX + systembar.getX() * this.scaling.unitX;
		var ty = this.targetY + system.getY() * this.scaling.unitY;
		var clefX = systembar.getBarMeasurements().getClefXPosition() * this.scaling.unitX;
		var clefY = this.scaling.unitY;
		var svgXmlstr;
		switch(actclef._hx_index) {
		case 0:
			svgXmlstr = nx3_render_svg_SvgElements.clefG;
			break;
		case 1:
			svgXmlstr = nx3_render_svg_SvgElements.clefF;
			break;
		case 2:
			svgXmlstr = nx3_render_svg_SvgElements.clefC;
			break;
		}
		this.target.shape($hxEnums[actclef.__enum__].__constructs__[actclef._hx_index],tx + clefX,ty + clefY + part_getYPosition * this.scaling.unitY,svgXmlstr);
	}
	,drawBarContent: function(system,systembar) {
		var bar = systembar.bar;
		systembar.getX();
		systembar.getBarMeasurements().getContentXPosition();
		systembar.getBarMeasurements().getContentXPosition();
		bar.getContentwidth();
		var _g = 0;
		var _g1 = bar.getParts();
		while(_g < _g1.length) {
			var _g2 = 0;
			var _g3 = _g1[_g++].getVoices();
			while(_g2 < _g3.length) {
				var _g4 = 0;
				var _g5 = _g3[_g2++].getBeamgroups();
				while(_g4 < _g5.length) this.drawBeamgroup(system,systembar,_g5[_g4++]);
			}
		}
		var _g6 = 0;
		var _g11 = bar.getColumns();
		while(_g6 < _g11.length) {
			var _g21 = 0;
			var _g31 = _g11[_g6++].getComplexes();
			while(_g21 < _g31.length) this.drawComplex(system,systembar,_g31[_g21++]);
		}
	}
	,drawNoteHeads: function(system,systembar,note) {
		var _gthis = this;
		var part = note.getComplex().getPart();
		var part_getYPosition = system.getPartY(part.getBar().getParts().indexOf(part));
		var barx = systembar.getX() + systembar.getBarMeasurements().getContentXPosition();
		var x = this.targetX + (barx + note.getComplex().getXPosition()) * this.target.getScaling().unitX;
		var y = this.targetY + (system.getY() + part_getYPosition) * this.target.getScaling().unitY;
		var _g = note.nnote.type;
		switch(_g._hx_index) {
		case 3:
			var pause = _g.pause;
			var sign = _g.sign;
			var level = _g.level;
			var rect = note.getHeadsRects()[0].clone();
			rect.inflate(-0.8,-0.8);
			var color = pause ? 11184810 : 0;
			this.target.filledellipse(x,y,rect,this.scaling.linesWidth * 5,color,16777215);
			var numSvgStr;
			switch((-level + 21) % 7) {
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
				console.log("src/nx3/render/Renderer.hx:581:",numSvgStr);
			}
			var tx = this.scaling == nx3_render_scaling_Scaling.NORMAL ? x - this.scaling.unitX * 5 : x - this.scaling.unitX * 5.5;
			var e = note.getVoice().getPart().npart.type;
			var ty = $hxEnums[e.__enum__].__constructs__[e._hx_index] == "Tplchain" ? y + level * 3 * this.scaling.unitY : y;
			ty += this.scaling.unitY * .4;
			this.target.shape(null,tx,ty,numSvgStr,color);
			var signSvgStr;
			if(sign != null) {
				switch(sign._hx_index) {
				case 2:
					signSvgStr = nx3_render_svg_SvgElements.tplArrowDown;
					break;
				case 3:
					signSvgStr = nx3_render_svg_SvgElements.tplArrowUp;
					break;
				default:
					signSvgStr = nx3_render_svg_SvgElements.tplArrowUp;
				}
			} else {
				signSvgStr = "";
			}
			if(signSvgStr != "") {
				this.target.shape(null,tx,ty,signSvgStr,color);
			}
			break;
		case 4:
			var rect1 = note.getHeadsRects()[0];
			this.target.rectangle(x,y,rect1,1,255);
			this.target.text(x + rect1.x * this.scaling.unitX,y + rect1.y * this.scaling.unitY,_g.text);
			break;
		case 7:
			var rect2 = note.getHeadsRects()[0];
			var nextnote = note.getNext();
			var width = nextnote != null ? nextnote.getXPosition() - note.getXPosition() : systembar.getBarMeasurements().getContentWidth() - note.getXPosition();
			this.target.rectangle(x,y,new nx3_geom_Rectangle(rect2.x,rect2.y,width,rect2.height),3,255);
			break;
		default:
			var svginfo = nx3_render_RendererTools.getHeadSvgInfo(note.nnote);
			var hx1 = x;
			var hx2 = x;
			var _g1 = 0;
			var _g11 = note.getHeadsRects();
			while(_g1 < _g11.length) {
				var rect3 = [_g11[_g1]];
				++_g1;
				this.target.shape(null,x + rect3[0].x * this.scaling.unitX,y + (rect3[0].y + svginfo.y) * this.scaling.unitY,svginfo.xmlStr);
				var tmp = this.target;
				var rect4 = rect3[0];
				var tmp1 = 5 * this.scaling.linesWidth;
				var tmp2 = (function(rect5) {
					return function(activityType) {
						var _g2 = 0;
						var _g3 = _gthis.interactions;
						while(_g2 < _g3.length) _g3[_g2++].handleAction(nx3_action_EActionType.NoteAction(activityType,note,nx3_action_EActionInfo.TargetXY(_gthis.target,x + rect5[0].x * _gthis.scaling.unitX,y + rect5[0].y * _gthis.scaling.unitY)));
					};
				})(rect3);
				tmp.interactiveEllipse(x,y,rect4,tmp1,3585587,null,tmp2);
			}
			var i = 0;
			var _g4 = 0;
			var _g12 = note.getHeadsRects();
			while(_g4 < _g12.length) {
				var rect6 = _g12[_g4];
				++_g4;
				var level1 = note.getHeads()[i].nhead.level;
				if(level1 > 5 || level1 < -5) {
					hx1 = Math.min(hx1,x + (rect6.x - 0.6) * this.scaling.unitX);
					hx2 = Math.max(hx2,x + (rect6.x + rect6.width + 0.6) * this.scaling.unitX);
				}
				++i;
			}
			var _g5 = 0;
			var _g13 = note.getHeads();
			while(_g5 < _g13.length) {
				var level2 = _g13[_g5++].nhead.level;
				if(level2 < 5 && level2 > -5) {
					continue;
				}
				var _g31 = level2 < 0 ? level2 : 5;
				var _g21 = level2 < 0 ? -4 : level2 + 1;
				while(_g31 < _g21) {
					var l = _g31++;
					if((l + 100) % 2 == 1) {
						continue;
					}
					var hy = y + l * this.scaling.unitY;
					this.target.line(hx1,hy,hx2,hy,1,0);
				}
			}
		}
	}
	,drawComplex: function(system,systembar,complex) {
		if(complex == null) {
			return;
		}
		var _g = 0;
		var _g1 = complex.getNotes();
		while(_g < _g1.length) this.drawNoteHeads(system,systembar,_g1[_g++]);
		this.drawComplexSigns(system,systembar,complex);
		this.drawComplexDots(system,systembar,complex);
		this.drawComplexTies(system,systembar,complex);
	}
	,drawComplexTies: function(system,systembar,complex,nx,ny) {
		if(ny == null) {
			ny = 0;
		}
		if(nx == null) {
			nx = 0;
		}
		var part = complex.getPart();
		var part_getYPosition = system.getPartY(part.getBar().getParts().indexOf(part));
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
				rect.width = targetcomplex.getXPosition() + targetAllRect.x - thisx - 0.5;
				this.drawTie(system,x + .5 * this.scaling.unitX,y,rect,direction);
			} else {
				rect.width = 6;
			}
		}
	}
	,drawComplexDots: function(system,systembar,complex,nx,ny) {
		if(ny == null) {
			ny = 0;
		}
		if(nx == null) {
			nx = 0;
		}
		var _g = 0;
		var _g1 = complex.getDotRects();
		while(_g < _g1.length) {
			var r = _g1[_g++];
			var part = complex.getPart();
			var part_getYPosition = system.getPartY(part.getBar().getParts().indexOf(part));
			var barx = systembar.getX() + systembar.getBarMeasurements().getContentXPosition();
			var x = this.targetX + (barx + complex.getXPosition()) * this.target.getScaling().unitX;
			var y = this.targetY + (system.getY() + part_getYPosition) * this.target.getScaling().unitY;
			var crect = r.clone();
			var ddot = crect.width == 3.0;
			crect.offset(0.9,0.2);
			crect.width = 0.7;
			crect.height = 0.6;
			this.target.filledellipse(x,y,crect,0,0,0);
			if(!ddot) {
				continue;
			}
			crect.offset(1.3,0);
			this.target.filledellipse(x,y,crect,0,0,0);
		}
	}
	,drawComplexSigns: function(system,systembar,complex,nx,ny) {
		if(ny == null) {
			ny = 0;
		}
		if(nx == null) {
			nx = 0;
		}
		var part = complex.getPart();
		var part_getYPosition = system.getPartY(part.getBar().getParts().indexOf(part));
		var barx = systembar.getX() + systembar.getBarMeasurements().getContentXPosition();
		var x = this.targetX + (barx + complex.getXPosition()) * this.target.getScaling().unitX;
		var y = this.targetY + (system.getY() + part_getYPosition) * this.target.getScaling().unitY;
		var signs = complex.getVisibleSigns();
		var rects = complex.getSignsRects();
		var _g1 = 0;
		var _g = signs.length;
		while(_g1 < _g) {
			var i = _g1++;
			var rect = rects[i];
			var xmlStr;
			switch(signs[i].sign._hx_index) {
			case 1:
				xmlStr = nx3_render_svg_SvgElements.signNatural;
				break;
			case 2:
				xmlStr = nx3_render_svg_SvgElements.signFlat;
				break;
			case 3:
				xmlStr = nx3_render_svg_SvgElements.signSharp;
				break;
			default:
				xmlStr = null;
			}
			if(xmlStr != null) {
				this.target.shape(null,x + rect.x * this.scaling.unitX,y + (rect.y + 2) * this.scaling.unitY,xmlStr);
			}
		}
	}
	,drawBeamgroup: function(system,systembar,beamgroup) {
		var frame = beamgroup.getFrame();
		if(frame == null) {
			return;
		}
		var barx = systembar.getX() + systembar.getBarMeasurements().getContentXPosition();
		var tx = this.targetX + barx * this.scaling.unitX;
		var ty = this.targetY + system.getY() * this.scaling.unitY;
		var part = beamgroup.getPVoice().getPart();
		var rightY = ty + system.getPartY(part.getBar().getParts().indexOf(part)) * this.target.getScaling().unitY;
		beamgroup.getDirection();
		var firstnote = beamgroup.pnotes[0];
		var leftX = beamgroup.getNotesStemXPositions()[0] * this.scaling.unitX;
		var leftTipY = frame.leftTipY * this.scaling.unitY;
		this.target.line(tx + leftX,rightY + frame.leftInnerY * this.scaling.unitY,tx + leftX,rightY + leftTipY,1,0);
		if(beamgroup.pnotes.length == 1) {
			if(nx3_ENoteValTools.beaminglevel(firstnote.nnote.value) > 0) {
				if(beamgroup.getDirection() == nx3_EDirectionUD.Up) {
					this.target.shape(nx3_ENoteValTools.beaminglevel(firstnote.nnote.value) == 2 ? "Flag16Up" : "Flag8Up",tx + leftX - 0.6 * this.scaling.unitX,rightY + this.scaling.unitY + leftTipY,nx3_ENoteValTools.beaminglevel(firstnote.nnote.value) == 2 ? nx3_render_svg_SvgElements.flagUp16 : nx3_render_svg_SvgElements.flagUp8,0);
				} else {
					this.target.shape(nx3_ENoteValTools.beaminglevel(firstnote.nnote.value) == 2 ? "Flag16Down" : "Flag8Down",tx + leftX - 0.6 * this.scaling.unitX,rightY + -3 * this.scaling.unitY + leftTipY,nx3_ENoteValTools.beaminglevel(firstnote.nnote.value) == 2 ? nx3_render_svg_SvgElements.flagDown16 : nx3_render_svg_SvgElements.flagDown8,0);
				}
			}
		}
		if(beamgroup.pnotes.length < 2) {
			return;
		}
		var storeY = [rightY + leftTipY];
		var storeX = [tx + leftX];
		var array = beamgroup.getNotesStemXPositions();
		var rightX = array[array.length - 1] * this.scaling.unitX;
		var rightTipY = frame.rightTipY * this.scaling.unitY;
		this.target.line(tx + rightX,rightY + frame.rightInnerY * this.scaling.unitY,tx + rightX,rightY + rightTipY,1,0);
		var beamh = 0.95 * this.scaling.unitY;
		beamh = beamgroup.getDirection() == nx3_EDirectionUD.Up ? -beamh : beamh;
		this.target.parallellogram(tx + leftX,rightY + leftTipY - beamh,tx + rightX,rightY + rightTipY - beamh,beamh,0,0,0);
		if(beamgroup.pnotes.length > 2) {
			var _g1 = 1;
			var _g = frame.outerLevels.length - 1;
			while(_g1 < _g) {
				var i = _g1++;
				var midX = beamgroup.getNotesStemXPositions()[i] * this.scaling.unitX;
				var midTipY = leftTipY + (rightTipY - leftTipY) * ((midX - leftX) / (rightX - leftX));
				this.target.line(tx + midX,rightY + frame.innerLevels[i] * this.scaling.unitY,tx + midX,rightY + midTipY,1,0);
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
			var flagtype = _g11[_g2++];
			var adjustY = beamgroup.getDirection() == nx3_EDirectionUD.Up ? 2.1 : -2.1;
			adjustY *= this.scaling.unitY;
			var currX = storeX[idx];
			var currY = storeY[idx] + adjustY;
			var nextX = storeX[idx + 1];
			var nextY = storeY[idx + 1] + adjustY;
			var factor = 2.2 * this.scaling.unitX;
			switch(flagtype._hx_index) {
			case 1:
				this.target.parallellogram(currX,currY - beamh1 / 2,currX + factor,factor / (nextX - currX) * (nextY - currY) + currY - beamh1 / 2,beamh1,0,0,0);
				break;
			case 2:
				var startX = nextX - factor;
				this.target.parallellogram(startX,-((nextX - startX) / (nextX - currX)) * (nextY - currY) + nextY - beamh1 / 2,nextX,nextY - beamh1 / 2,beamh1,0,0,0);
				break;
			case 3:
				this.target.parallellogram(currX,currY - beamh1 / 2,nextX,nextY - beamh1 / 2,beamh1,0,0,0);
				break;
			default:
			}
			++idx;
		}
	}
	,drawBeamgroupX: function(system,beamgroup,nx,ny) {
		if(ny == null) {
			ny = 0;
		}
		if(nx == null) {
			nx = 0;
		}
		var frame = beamgroup.getFrame();
		if(frame == null) {
			return;
		}
		var part = beamgroup.getPVoice().getPart();
		var part_getYPosition = part.getBar().getParts().indexOf(part) * 20;
		var rightY = this.targetY + part_getYPosition * this.target.getScaling().unitY;
		beamgroup.getDirection();
		var firstnote = beamgroup.pnotes[0];
		var leftX = beamgroup.getNotesStemXPositions()[0] * this.scaling.unitX;
		var leftTipY = frame.leftTipY * this.scaling.unitY;
		this.target.line(this.targetX + leftX,rightY + frame.leftInnerY * this.scaling.unitY,this.targetX + leftX,rightY + leftTipY,1,0);
		if(beamgroup.pnotes.length == 1) {
			if(nx3_ENoteValTools.beaminglevel(firstnote.nnote.value) > 0) {
				if(beamgroup.getDirection() == nx3_EDirectionUD.Up) {
					this.target.shape(null,this.targetX + leftX - 0.6 * this.scaling.unitX,rightY + this.scaling.unitY + leftTipY,nx3_ENoteValTools.beaminglevel(firstnote.nnote.value) == 2 ? nx3_render_svg_SvgElements.flagUp16 : nx3_render_svg_SvgElements.flagUp8,0);
				} else {
					this.target.shape(null,this.targetX + leftX - 0.6 * this.scaling.unitX,rightY + -3 * this.scaling.unitY + leftTipY,nx3_ENoteValTools.beaminglevel(firstnote.nnote.value) == 2 ? nx3_render_svg_SvgElements.flagDown16 : nx3_render_svg_SvgElements.flagDown8,0);
				}
			}
		}
		if(beamgroup.pnotes.length < 2) {
			return;
		}
		var storeY = [rightY + leftTipY];
		var storeX = [this.targetX + leftX];
		var array = beamgroup.getNotesStemXPositions();
		var rightX = array[array.length - 1] * this.scaling.unitX;
		var rightTipY = frame.rightTipY * this.scaling.unitY;
		this.target.line(this.targetX + rightX,rightY + frame.rightInnerY * this.scaling.unitY,this.targetX + rightX,rightY + rightTipY,1,0);
		var beamh = 0.95 * this.scaling.unitY;
		beamh = beamgroup.getDirection() == nx3_EDirectionUD.Up ? -beamh : beamh;
		this.target.parallellogram(this.targetX + leftX,rightY + leftTipY - beamh,this.targetX + rightX,rightY + rightTipY - beamh,beamh,0,0,0);
		if(beamgroup.pnotes.length > 2) {
			var _g1 = 1;
			var _g = frame.outerLevels.length - 1;
			while(_g1 < _g) {
				var i = _g1++;
				var midX = beamgroup.getNotesStemXPositions()[i] * this.scaling.unitX;
				var midTipY = leftTipY + (rightTipY - leftTipY) * ((midX - leftX) / (rightX - leftX));
				this.target.line(this.targetX + midX,rightY + frame.innerLevels[i] * this.scaling.unitY,this.targetX + midX,rightY + midTipY,1,0);
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
			var flagtype = _g11[_g2++];
			var adjustY = beamgroup.getDirection() == nx3_EDirectionUD.Up ? 2.1 : -2.1;
			adjustY *= this.scaling.unitY;
			var currX = storeX[idx];
			var currY = storeY[idx] + adjustY;
			var nextX = storeX[idx + 1];
			var nextY = storeY[idx + 1] + adjustY;
			var factor = 2.2 * this.scaling.unitX;
			switch(flagtype._hx_index) {
			case 1:
				this.target.parallellogram(currX,currY - beamh1 / 2,currX + factor,factor / (nextX - currX) * (nextY - currY) + currY - beamh1 / 2,beamh1,0,0,0);
				break;
			case 2:
				var startX = nextX - factor;
				this.target.parallellogram(startX,-((nextX - startX) / (nextX - currX)) * (nextY - currY) + nextY - beamh1 / 2,nextX,nextY - beamh1 / 2,beamh1,0,0,0);
				break;
			case 3:
				this.target.parallellogram(currX,currY - beamh1 / 2,nextX,nextY - beamh1 / 2,beamh1,0,0,0);
				break;
			default:
			}
			++idx;
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
	,getSvgNumber: function(char) {
		switch(char) {
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
		case "AllaBreve":
			return nx3_render_svg_SvgElements.timeAllabreve;
		case "C":
			return nx3_render_svg_SvgElements.timeCommon;
		default:
			return "";
		}
	}
	,getTarget: function() {
		return this.target;
	}
	,interactiveComplex: function(system,complex,nx,ny) {
		if(complex == null) {
			return;
		}
		var part = complex.getPart();
		part.getBar().getParts();
		complex.getXPosition();
		this.target.getScaling();
		this.target.getScaling();
		var _g = 0;
		var _g1 = complex.getNotes();
		while(_g < _g1.length) this.interactiveNote(system,_g1[_g++],nx,ny);
	}
	,interactiveNote: function(system,note,nx,ny) {
		var part = note.getComplex().getPart();
		part.getBar().getParts();
		note.getComplex().getXPosition();
		this.target.getScaling();
		this.target.getScaling();
	}
	,__class__: nx3_render_Renderer
};
var nx3_render_RendererTools = function() { };
$hxClasses["nx3.render.RendererTools"] = nx3_render_RendererTools;
nx3_render_RendererTools.__name__ = ["nx3","render","RendererTools"];
nx3_render_RendererTools.getHeadSvgInfo = function(nnote) {
	switch(nnote.type._hx_index) {
	case 0:
		switch(nx3_ENoteValTools.head(nnote.value)._hx_index) {
		case 1:
			return { xmlStr : nx3_render_svg_SvgElements.noteWhite, y : 0};
		case 2:
			return { xmlStr : nx3_render_svg_SvgElements.noteWhole, y : 0};
		default:
			return { xmlStr : nx3_render_svg_SvgElements.noteBlack, y : 0};
		}
		break;
	case 1:
		switch(nx3_ENoteValTools.beaminglevel(nnote.value)) {
		case 0:
			switch(nx3_ENoteValTools.head(nnote.value)._hx_index) {
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
};
var nx3_render_TargetSvgXml = function(svgId,scaling) {
	this.svgId = svgId;
	this.svg = Xml.createElement("svg");
	this.svg.set("id",svgId);
	this.scaling = scaling != null ? scaling : nx3_render_scaling_Scaling.NORMAL;
	this.font = nx3_Constants.FONT_TEXT_DEFAULTFORMAT;
};
$hxClasses["nx3.render.TargetSvgXml"] = nx3_render_TargetSvgXml;
nx3_render_TargetSvgXml.__name__ = ["nx3","render","TargetSvgXml"];
nx3_render_TargetSvgXml.__interfaces__ = [nx3_render_ITarget];
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
			var cy = y + _g++ * this.scaling.space;
			this.line(x,cy,x + width,cy,this.scaling.linesWidth,0);
		}
	}
	,rect: function(x,y,rect,lineWidth,lineColor) {
	}
	,rectangle: function(x,y,rect,lineWidth,lineColor) {
		if(lineColor == null) {
			lineColor = 0;
		}
		if(lineWidth == null) {
			lineWidth = 1;
		}
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
		r.set("fill","#000");
		r.set("stroke","#000");
		r.set("stroke-width",Std.string(lineWidth * this.scaling.linesWidth));
		r.set("style","fill: #000; stroke: #000; stroke-width: " + lineWidth * this.scaling.linesWidth + "; cursor:pointer;");
		this.svg.addChild(r);
	}
	,line: function(x,y,x2,y2,lineWidth,lineColor) {
		if(lineColor == null) {
			lineColor = 16711680;
		}
		if(lineWidth == null) {
			lineWidth = 1;
		}
		var el = Xml.createElement("line");
		el.set("x1",x == null ? "null" : "" + x);
		el.set("y1",y == null ? "null" : "" + y);
		el.set("x2",x2 == null ? "null" : "" + x2);
		el.set("y2",y2 == null ? "null" : "" + y2);
		el.set("stroke","#000");
		el.set("style","stroke-width:" + lineWidth * this.scaling.linesWidth);
		this.svg.addChild(el);
	}
	,shape: function(shapeId,x,y,xmlStr,fillColor) {
		if(fillColor == null) {
			fillColor = 0;
		}
		var xml = Xml.parse(xmlStr);
		var _this = xml.firstElement();
		if(_this.nodeType != Xml.Document && _this.nodeType != Xml.Element) {
			throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + _this.nodeType);
		}
		var _this1 = _this.children[0];
		if(_this1.nodeType != Xml.Document && _this1.nodeType != Xml.Element) {
			throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + _this1.nodeType);
		}
		var _this2 = _this1.children[0];
		if(_this2.nodeType != Xml.Element) {
			throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + _this2.nodeType);
		}
		var elementTag = _this2.nodeName.toLowerCase();
		var element = Xml.createElement("dummy");
		if(elementTag == "path") {
			element = Xml.createElement("path");
			var _this3 = xml.firstElement();
			if(_this3.nodeType != Xml.Document && _this3.nodeType != Xml.Element) {
				throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + _this3.nodeType);
			}
			var _this4 = _this3.children[0];
			if(_this4.nodeType != Xml.Document && _this4.nodeType != Xml.Element) {
				throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + _this4.nodeType);
			}
			element.set("d",_this4.children[0].get("d"));
			element.set("stroke","none");
			element.set("fill","#000");
		} else if(elementTag == "rect") {
			var _this5 = xml.firstElement();
			if(_this5.nodeType != Xml.Document && _this5.nodeType != Xml.Element) {
				throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + _this5.nodeType);
			}
			var _this6 = _this5.children[0];
			if(_this6.nodeType != Xml.Document && _this6.nodeType != Xml.Element) {
				throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + _this6.nodeType);
			}
			var rectXml = _this6.children[0];
			element = Xml.createElement("rect");
			element.set("x",rectXml.get("x"));
			element.set("y",rectXml.get("y"));
			element.set("width",rectXml.get("width"));
			element.set("height",rectXml.get("height"));
		} else {
			throw new js__$Boot_HaxeError("Shape element " + elementTag + " - UNIMPLEMENTED");
		}
		var sc = this.scaling.svgScale;
		element.set("transform","matrix(" + sc + ",0,0," + sc + ",0,0)");
		var svg = Xml.createElement("svg");
		svg.set("x",Std.string(x + this.scaling.svgX));
		svg.set("y",Std.string(y + this.scaling.svgY));
		svg.addChild(element);
		this.svg.addChild(svg);
	}
	,parallellogram: function(x,y,x2,y2,pheight,lineWidth,lineColor,fillColor) {
		var el = Xml.createElement("path");
		el.set("d","M " + x + " " + y + " L " + x2 + " " + y2 + "  L " + x2 + " " + (y2 + pheight) + "  L " + x + "  " + (y + pheight) + "  L " + x + " " + y);
		el.set("fill","#000");
		el.set("stroke","#000");
		el.set("style","stroke-width:" + lineWidth * this.scaling.linesWidth);
		this.svg.addChild(el);
	}
	,clear: function() {
		this.svg = Xml.createElement("svg");
		this.svg.set("id",this.svgId);
	}
	,polyline: function(x,y,coordinates,lineWidth,lineColor) {
		if(lineColor == null) {
			lineColor = 0;
		}
		if(lineWidth == null) {
			lineWidth = 1;
		}
	}
	,polyfill: function(x,y,coordinates,lineWidth,lineColor,fillColor) {
		if(fillColor == null) {
			fillColor = 255;
		}
		if(lineColor == null) {
			lineColor = 0;
		}
		if(lineWidth == null) {
			lineWidth = 1;
		}
		console.log("src/nx3/render/TargetSvgXml.hx:192:","Polyfill: " + x + " " + y);
		var coord = coordinates.shift();
		var path = "M " + Std.string(coord.x * this.scaling.unitX + x) + " " + Std.string(coord.y * this.scaling.unitY + y) + " ";
		var _g = 0;
		while(_g < coordinates.length) {
			var coord1 = coordinates[_g];
			++_g;
			path += "L " + Std.string(coord1.x * this.scaling.unitX + x) + " " + Std.string(coord1.y * this.scaling.unitY + y) + " ";
		}
		console.log("src/nx3/render/TargetSvgXml.hx:203:",path);
		var el = Xml.createElement("path");
		el.set("d",path);
		el.set("fill","#000");
		el.set("stroke","#000");
		el.set("style","stroke-width:" + lineWidth * this.scaling.linesWidth);
		this.svg.addChild(el);
	}
	,sline: function(x,y,start,end,lineWidth,lineColor) {
	}
	,interactiveEllipse: function(x,y,rect,lineWidth,lineColor,fillColor,cb) {
	}
	,scaleRect: function(rect,inflateX,inflateY) {
		if(inflateY == null) {
			inflateY = 0;
		}
		if(inflateX == null) {
			inflateX = 0;
		}
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
		x += 4 * this.scaling.fontScaling;
		y += (-3 + this.font.size) * this.scaling.fontScaling;
		var txt = Xml.createElement("text");
		txt.set("x",x == null ? "null" : "" + x);
		txt.set("y",y == null ? "null" : "" + y);
		txt.set("font-size",Std.string(this.font.size * this.scaling.fontScaling));
		txt.set("font-family",Std.string(this.font.name));
		txt.addChild(Xml.createPCData(text));
		this.svg.addChild(txt);
	}
	,textwidth: function(text) {
		if(this.context == null) {
			var canvas = window.document.getElementById("CanvasTextMeasurement");
			if(canvas == null) {
				console.log("src/nx3/render/TargetSvgXml.hx:300:","creating a canvas for text measurement");
				canvas = window.document.createElement("canvas");
				canvas.id = "CanvasTextMeasurement";
			}
			this.context = canvas.getContext("2d",null);
		}
		this.context.font = "" + this.font.size * this.scaling.fontScaling + "px " + this.font.name;
		return this.context.measureText(text).width / this.scaling.unitX;
	}
	,textheight: function(text) {
		return this.font.size / 3.8;
	}
	,addToDomElement: function(elementId) {
		var tmp = haxe_xml_Printer.print(this.getXml());
		window.document.getElementById(elementId).innerHTML = tmp;
	}
	,__class__: nx3_render_TargetSvgXml
};
var nx3_render_scaling_Scaling = function() { };
$hxClasses["nx3.render.scaling.Scaling"] = nx3_render_scaling_Scaling;
nx3_render_scaling_Scaling.__name__ = ["nx3","render","scaling","Scaling"];
nx3_render_scaling_Scaling.scaleRect = function(scaling,rect) {
	return new nx3_geom_Rectangle(rect.x * scaling.unitX,rect.y * scaling.unitY,rect.width * scaling.unitX,rect.height * scaling.unitY);
};
var nx3_render_svg_SvgElements = function() { };
$hxClasses["nx3.render.svg.SvgElements"] = nx3_render_svg_SvgElements;
nx3_render_svg_SvgElements.__name__ = ["nx3","render","svg","SvgElements"];
var ui_render_QSyntaxRenderer = function() {
};
$hxClasses["ui.render.QSyntaxRenderer"] = ui_render_QSyntaxRenderer;
ui_render_QSyntaxRenderer.__name__ = ["ui","render","QSyntaxRenderer"];
ui_render_QSyntaxRenderer.__interfaces__ = [ui_render_IStringRenderer];
ui_render_QSyntaxRenderer.prototype = {
	renderFromCode: function(code) {
		var nscore = new nx3_qs_QSParser(code).parse();
		var target = new nx3_render_TargetSvgXml("id",nx3_render_scaling_Scaling.NORMAL);
		new nx3_render_Renderer(target,0,0).renderScore(new nx3_PScore(nscore));
		return haxe_xml_Printer.print(target.getXml());
	}
	,__class__: ui_render_QSyntaxRenderer
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
nx3_PBaseRectCalculator.BASERECT_HEIGHT = 3;
nx3_PBaseRectCalculator.BASERECT_HEIGHT_X_2 = 6.;
nx3_PBaseRectCalculator.BASERECT_MARGIN = 0.6;
nx3_PBaseRectCalculator.BASERECT_MARGIN_X_2 = 1.2;
nx3_PColumnsAllotmentCalculator.delta = 0.5;
nx3_PSystemBarsGenerator.defaultClef = nx3_EClef.ClefF;
nx3_PSystemBarsGenerator.defaultKey = nx3_EKey.Flat2;
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
$s.ui_render_QSyntaxRenderer = ui_render_QSyntaxRenderer; 
})(typeof exports != "undefined" ? exports : typeof window != "undefined" ? window : typeof self != "undefined" ? self : this, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
