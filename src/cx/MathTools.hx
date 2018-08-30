package cx;
import haxe.Int64;
using Lambda;
/**
 * ...
 * @author Jonas Nyström
 */
class MathTools
{

	static inline var  EPSILON = 0.0000000000009;
	static var PI2Over360 = 2 * Math.PI / 360; 
	
	static public function rotate(x:Float, y:Float, angleDegrees:Float) {
		var angleRadians = angleDegrees * PI2Over360;
		var s = Math.sin(angleRadians);
		if (Math.abs(s) <= EPSILON) s = 0; 
		var c = Math.cos(angleRadians);
		var xnew = x * c - y * s;
		var ynew = x * s + y * c;
		return { x:xnew, y:ynew };
	}
	
	static inline public function round2(number:Float, precision:Int=6): Float {
		number = number * Math.pow(10, precision);
		number = Math.round( number ) / Math.pow(10, precision);
		return number;
	}	
	
	static inline public function floatEquals(a:Float, b:Float):Bool
	{		
		return (Math.abs(a - b) <= EPSILON);		
	}		
	
	static inline public function intClamp(val:Int, min:Int, max:Int) return (val < min) ? min : (val > max) ? max : val;
	

	
}