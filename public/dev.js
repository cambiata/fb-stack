// Generated by Haxe 4.0.0-preview.4+1e3e5e016
(function () { "use strict";
var $hxEnums = {};
var HxOverrides = function() { };
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var utils_Dev = function() { };
utils_Dev.main = function() {
	console.log("src/utils/Dev.hx:5:","hello");
};
utils_Dev.main();
})();