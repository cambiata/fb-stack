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
var utils_ClientData = function() { };
utils_ClientData.main = function() {
	console.log("src/utils/ClientData.hx:5:","hello");
};
utils_ClientData.main();
})();
