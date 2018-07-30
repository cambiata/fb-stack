package cx;
using StringTools;
/**
 * ...
 * @author Jonas Nyström
 */
//using cx.StringTools;
class EnumTools 
{
	public static macro function extract(value:haxe.macro.Expr.ExprOf<EnumValue>, pattern:haxe.macro.Expr):haxe.macro.Expr {
		
		/*
		// Usage:
		var opt = haxe.ds.Option.Some(10);
		var val = opt.extract(Some(v) => v);
		trace(val == 10); // true
		*/		
		
		switch (pattern) {
			case macro $a => $b:
				return macro switch ($value) {
					case $a: $b;
					default: throw "no match";
				}
			default:
				throw new haxe.macro.Expr.Error("Invalid enum value extraction pattern", pattern.pos);
		}
	}	
	
	static public function createFromString<T>(e:Enum<T>, str:String): T {		
		try {
			var type = str;
			var params:Array<String> = [];
			if (str.indexOf('(')>-1) {
				var parIdx = str.indexOf('(');
				type = str.substr(0, parIdx);
				params = str.substr(parIdx).replace('(', '').replace(')', '').split(',');
			}
			return Type.createEnum(e, type, params);	
		} catch(e:Dynamic) {}
		return null;
	}
	

	
}