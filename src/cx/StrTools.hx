package cx;
using StringTools;
using Lambda;
/**
 * StrTools
 * @author 
 */
class StrTools extends StringTools
{

    static public function slug(str:String, allowDash:Bool=true):String { 
		if (str == null) return null;
		str = str.toLowerCase();
    	var from = 	"åàáäâèéëêìíïîòóöôùúüûñç·/_,:;";
		var to = 	"aaaaaeeeeiiiioooouuuunc------";  
        for (i in 0 ... from.length) str = str.replace(from.charAt(i), to.charAt(i));
    	str = ~/[^a-z0-9 -]/g.replace(str, '');
       	str = str.trim();
        str = ~/\s+/g.replace(str, '-');
    	str = ~/-+/g.replace(str, '-');
        if (!allowDash) str = str.split('-').join('');
		
        return str;
    }

	static public function replaceAll(str:String, search:String, replace:String):String {
		str = str.split(search).join(replace);
		return str;
	}
	
	inline static public function splitTrim(str:String, delimiter:String = ','):Array<String> {
		return str.split(delimiter).map(function(segment) return segment.trim());
	}

	inline static public function trimChar(str:String, char:String):String {
		if (str.startsWith(char)) str = str.substr(char.length);
		if (str.endsWith(char)) str = str.substr(0, str.length-char.length);
		return str;
	}
	
	inline static public function has(str:String, needle:String):Bool {
		return (str.indexOf(needle) > -1);
	}	
	
	static public function hasAny(str:String, needles:Array<String>):Bool {
		//for (needle in needles)  if (str.indexOf(needle) > -1) return true;
		needles.iter(n -> (str.indexOf(n) > -1) ? return true : null);
		return false;
	}
	
	static public function removeDoubleBlanks(s:String, blanks:String = '  '):String {
		function remove(s:String) return StringTools.replace(s, '  ', ' ');
		var s2 = remove(s);
		while (s2 != s) {
			s2 = s;
			s = remove(s);
		}
		return s2;
	}
	
	inline static public function upperCaseFirst(str:String):String return str.substr(0, 1).toUpperCase() + str.substr(1);

	inline static public function after(str:String, needle:String, until:String = '') 
		return str.substring(str.indexOf(needle) + needle.length, (until !='') ? (str.indexOf(until) > str.indexOf(needle)) ? str.indexOf(until): null: null);
	/*
	static  public function pluckValue(str:String, key:String): {str:String, value:String} {
		var keypos = str.indexOf(key);
		var keylength = key.length;
		var valuestart = keypos + keylength;
		var checkpos = valuestart;        
		var valueend = {
			while(checkpos < str.length && str.charAt(checkpos) != ' ') checkpos++;
			checkpos;
		}
		var value = str.substr(valuestart, valueend-valuestart);
		var newstr = str.substr(0, keypos) + str.substr(valueend);        
		return {value: value, str:StringTools.trim(newstr)};
	}
	*/
	
	static public var SUPERSCRIPT_ZERO = String.fromCharCode(8304);
	static public var SUPERSCRIPT_ONE = String.fromCharCode(185);
	static public var SUPERSCRIPT_TWO = String.fromCharCode(178); 
	static public var SUPERSCRIPT_THREE = String.fromCharCode(8307);
	static public var SUPERSCRIPT_FOUR = String.fromCharCode(8308);
	static public var SUPERSCRIPT_FIVE = String.fromCharCode(8309);
	static public var SUPERSCRIPT_SIX = String.fromCharCode(8310);
	static public var SUPERSCRIPT_SEVEN = String.fromCharCode(8311);
	static public var SUPERSCRIPT_EIGHT = String.fromCharCode(8312);
	static public var SUPERSCRIPT_NINE = String.fromCharCode(8313);
	
	static public var SUBSCRIPT_ZERO = String.fromCharCode(8320);
	static public var SUBSCRIPT_ONE = String.fromCharCode(8321);
	static public var SUBSCRIPT_TWO = String.fromCharCode(8322); 
	static public var SUBSCRIPT_THREE = String.fromCharCode(8323);
	static public var SUBSCRIPT_FOUR = String.fromCharCode(8324);
	static public var SUBSCRIPT_FIVE = String.fromCharCode(8325);
	static public var SUBSCRIPT_SIX = String.fromCharCode(8326);
	static public var SUBSCRIPT_SEVEN = String.fromCharCode(8327);
	static public var SUBSCRIPT_EIGHT = String.fromCharCode(8328);
	static public var SUBSCRIPT_NINE = String.fromCharCode(8329);	
	
	
}