package cx;

class ArrayTools {
   	inline static public function has<T>(a:Array<T>, item:T) return a.indexOf(item) != -1;


	public inline static function next<T>(a:Array<T>, item:T):Null<T> {
		var idx = a.indexOf(item);
		if (idx == -1) return null;
		if (idx == a.length - 1) return null;
		return a[idx + 1];		
	}
	
	public inline static function prev<T>(a:Array<T>, item:T):Null<T> {
		var idx = a.indexOf(item);
		if (idx <= 0) return null;
		return a[idx - 1];		
	}	

	inline static public function first<T>(array:Array<T>): T {
		return array[0];
	}
	
	inline static public function isFirst<T>(array:Array<T>, item:T) :Bool {
		return (array[0] == item);
	}
	

	inline static public function last<T>(array:Array<T>): T {
		return array[array.length-1];
	}
	
	inline static public function isLast<T>(array:Array<T>, item:T) :Bool {
		return (array[array.length-1] == item);
	}	

}