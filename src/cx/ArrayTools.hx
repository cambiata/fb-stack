package cx;

#if (flash)
import flash.Vector;
#end

/**
 * ...
 * @author Jonas Nyström
 */
using Lambda;
using StringTools;

class ArrayTools {
	// inline static public function has<T>(a:Array<T>, item:T)
	// 	return a.indexOf(item) != -1;
	// public inline static function next<T>(a:Array<T>, item:T):Null<T> {
	// 	var idx = a.indexOf(item);
	// 	if (idx == -1)
	// 		return null;
	// 	if (idx == a.length - 1)
	// 		return null;
	// 	return a[idx + 1];
	// }
	// public inline static function prev<T>(a:Array<T>, item:T):Null<T> {
	// 	var idx = a.indexOf(item);
	// 	if (idx <= 0)
	// 		return null;
	// 	return a[idx - 1];
	// }
	// inline static public function first<T>(array:Array<T>):T {
	// 	return array[0];
	// }
	// inline static public function isFirst<T>(array:Array<T>, item:T):Bool {
	// 	return (array[0] == item);
	// }
	// inline static public function last<T>(array:Array<T>):T {
	// 	return array[array.length - 1];
	// }
	// inline static public function isLast<T>(array:Array<T>, item:T):Bool {
	// 	return (array[array.length - 1] == item);
	// }
	// inline static public function indexOrNull<T>(a:Array<T>, idx:Int):T {
	// 	return (a == null) ? null : (idx < 0 || idx > a.length - 1) ? null : a[idx];
	// }
	inline static public function sortA<T>(a:Array<T>, fn:T->T->Int):Array<T> {
		var copy = a.copy();
		copy.sort(fn);
		return copy;
	}

	public inline static function str<T>(a:Array<T>):String
		return Std.string(a);

	public inline static function next<T>(a:Array<T>, item:T):Null<T> {
		var idx = a.indexOf(item);
		if (idx == -1)
			return null;
		if (idx == a.length - 1)
			return null;
		return a[idx + 1];
	}

	public inline static function prev<T>(a:Array<T>, item:T):Null<T> {
		var idx = a.indexOf(item);
		if (idx <= 0)
			return null;
		return a[idx - 1];
	}

	inline static public function reverse<T>(a:Array<T>):Array<T> {
		var result = [];
		for (item in a)
			result.unshift(item);
		return result;
	}

	inline static public function copyUntil<T>(a:Array<T>, f:T->Bool):Array<T> {
		var result = [];
		for (item in a) {
			if (f(item))
				break;
			result.push(item);
		}
		return result;
	}

	inline static public function copyUntilIncluding<T>(a:Array<T>, f:T->Bool):Array<T> {
		var result = [];
		for (item in a) {
			result.push(item);
			if (f(item))
				break;
		}
		return result;
	}

	inline static public function has<T>(a:Array<T>, item:T)
		return a.indexOf(item) != -1;

	inline static public function nextOrNull<T>(a:Array<T>, item:T) {
		return indexOrNull(a, a.indexOf(item) + 1);
	}

	inline static public function indexOrNull<T>(a:Array<T>, idx:Int):Null<T> {
		if (a == null)
			return null;
		return (idx < 0 || idx > a.length - 1) ? null : a[idx];
	}

	inline static public function nullOrEmpty<T>(a:Array<T>)
		return (a == null || a.length == 0);

	inline static public function indexOrValue<T>(a:Array<T>, idx:Int, fallbackValue:T) {
		// #if (neko  ) if (a == null) return null; #end
		return (indexOrNull(a, idx) != null) ? a[idx] : fallbackValue;
	}

	inline static public function equals<T>(a:Array<T>, b:Array<T>):Bool
		return (a.toString() == b.toString());

	static public function unique<T>(arr:Array<T>):Array<T> {
		var result = new Array<T>();
		for (item in arr)
			if (!Lambda.has(result, item))
				result.push(item);
		result.sort(function(a, b) {
			return Reflect.compare(a, b);
		});
		return result;
	}

	static public function fromIterator<T>(it:Iterator<T>):Array<T> {
		var result = [];
		for (v in it)
			result.push(v);
		return result;
	}

	static public function fromIterables<T>(it:Iterable<T>):Array<T> {
		return fromIterator(it.iterator());
	}

	static public function fromHashKeys<T>(it:Iterator<T>):Array<T> {
		return ArrayTools.fromIterator(it);
	}

	static public function allNull<T>(it:Array<T>):Bool {
		for (v in it)
			if (v != null)
				return false;
		return true;
	}

	#if (flash)
	static public function fromVector<T>(v:Vector<T>):Array<T> {
		var result = [];
		for (value in v) {
			trace(value);
			// result.push(value);
		}
		return result;
	}
	#end

	static public function doOverlap(array1:Array<Dynamic>, array2:Array<Dynamic>):Bool {
		for (item in array1) {
			if (Lambda.has(array2, item))
				return true;
		}
		return false;
	}

	static public function overlap<T>(array1:Array<T>, array2:Array<T>):Array<T> {
		return Lambda.array(array1.filter(function(value1) {
			var ret = (array2.has(value1));
			return ret;
		}));
	}

	static public function diff<T>(array1:Array<T>, array2:Array<T>):Array<T> {
		var result = new Array<T>();

		for (item in array1) {
			if (!Lambda.has(array2, item))
				result.push(item);
		}
		for (item in array2) {
			if (!Lambda.has(array1, item))
				result.push(item);
		}
		return result;
	}

	static public function hasNot<T>(array1:Array<T>, array2:Array<T>):Array<T> {
		var result = new Array<T>();

		for (item in array2) {
			if (!Lambda.has(array1, item))
				result.push(item);
		}

		return result;
	}

	static public function hasOtherThan<T>(array1:Array<T>, array2:Array<T>):Bool {
		for (item2 in array2) {
			if (!Lambda.has(array1, item2))
				return true;
		}
		return false;
	}

	inline static public function first<T>(array:Array<T>):T {
		return array[0];
	}

	inline static public function isFirst<T>(array:Array<T>, item:T):Bool {
		return (array[0] == item);
	}

	inline static public function last<T>(array:Array<T>):T {
		return array[array.length - 1];
	}

	inline static public function isLast<T>(array:Array<T>, item:T):Bool {
		return (array[array.length - 1] == item);
	}

	inline static public function secondLast<T>(array:Array<T>):T {
		return array[array.length - 2];
	}

	static public function index<T>(array:Array<T>, item:T) {
		return Lambda.indexOf(array, item);
	}

	inline static public function second<T>(array:Array<T>):T {
		return array[1];
	}

	inline static public function third<T>(array:Array<T>):T {
		return array[2];
	}

	inline static public function fourth<T>(array:Array<T>):T {
		return array[3];
	}

	inline static public function fifth<T>(array:Array<T>):T {
		return array[4];
	}

	inline static public function sixth<T>(array:Array<T>):T {
		return array[5];
	}

	inline static public function seventh<T>(array:Array<T>):T {
		return array[6];
	}

	inline static public function eighth<T>(array:Array<T>):T {
		return array[7];
	}

	inline static public function nineth<T>(array:Array<T>):T {
		return array[8];
	}

	public static function shuffle<T>(a:Array<T>):Array<T> {
		var t = range(a.length);
		var arr = [];
		while (t.length > 0) {
			var pos = Std.random(t.length), index = t[pos];
			t.splice(pos, 1);
			arr.push(a[index]);
		}
		return arr;
	}

	static public function countItem<T>(a:Array<T>, item:T):Int {
		var cnt = 0;
		for (ai in a) {
			if (ai == item)
				cnt++;
		}
		return cnt;
	}

	//-----------------------------------------------------------------------------------------------------
	static public function sorta<T>(a:Array<T>):Array<T> {
		a.sort(function(a, b) {
			return Reflect.compare(a, b);
		});
		return a;
	}

	//-----------------------------------------------------------------------------------------------------
	public static function range(start:Int, ?stop:Int, step = 1):Array<Int> {
		if (null == stop) {
			stop = start;
			start = 0;
		}
		if ((stop - start) / step == Math.POSITIVE_INFINITY)
			throw "infinite range";
		var range = [], i = -1, j;
		if (step < 0)
			while ((j = start + step * ++i) > stop)
				range.push(j);
		else
			while ((j = start + step * ++i) < stop)
				range.push(j);
		return range;
	}

	public static function intsMin(a:Array<Int>):Int {
		var r = a[0];
		for (v in a) {
			if (v < r)
				r = v;
		}
		return r;
	}

	public static function trimStrings(a:Array<String>):Array<String> {
		return a.map(function(s) return s.trim());
	}

	static public function cleaveL<T>(a:Array<T>, f:T->Bool) {
		var l = [];
		var r = a.copy();
		for (a1 in a) {
			l.push(a1);
			r.shift();
			if (f(a1))
				break;
		}
		return {left: l, right: r};
	}

	static public function cleaveR<T>(a:Array<T>, f:T->Bool) {
		var l = [];
		var r = a.copy();
		for (a1 in a) {
			if (f(a1))
				break;
			l.push(a1);
			r.shift();
		}
		return {left: l, right: r};
	}
}
