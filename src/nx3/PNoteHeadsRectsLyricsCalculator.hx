package nx3;
using cx.ArrayTools;
/**
 * ...
 * @author Jonas Nyström
 */
			import nx3.geom.Rectangle;
			import nx3.geom.Rectangles;
 
		/*	
 		#if  (flash || openfl || nme)

			import nx3.render.TargetSprite;
		#elseif js
			import nx3.render.TargetSvg;
		#else
			//trace('non possible!');
		#end
		*/
		
class PNoteHeadsRectsLyricsCalculator
{
	var note:PNote;
	var text:String;
	var font:TFontInfo;

	public function new(note:PNote, text:String, font:TFontInfo) 
	{
		this.note = note;
		this.text = text;
		this.font = font;
	}
	
	public function getHeadsRects(): Rectangles
	{	
			var tightchars = ['i', 'l', 't', 'j'];
			var widechars = ['m', 'M', 'w', 'W'];
			
			var totalW = 0;
			for (i in 0 ... this.text.length) {
				var char = this.text.charAt(i);
				
				if (tightchars.has(char)) {
					totalW += 2;
				} else if (widechars.has(char)) {
					totalW += 5;
				} else {
					totalW += 3;
				}
			}
			
			totalW += 2;
			
		
		
			//var width =  (3.0 * text.length) + 1; //target.textwidth(this.text);
			var width =  totalW;
			var height =  6; // target.textheight(this.text);
			return [new Rectangle( -width / 2, -height / 2, width, height)];		
		
		/*	
		#if  (flash || openfl || nme)
			var target = new TargetSprite();
			if (this.font != null) target.setFont(font);
			var width = target.textwidth(this.text);
			var height = target.textheight(this.text);
			return [new Rectangle( -width / 2, -height / 2, width, height)];						
		#elseif js
		
			var width = font.size * 10 * text.length; //target.textwidth(this.text);
			var height = font.size * 10; // target.textheight(this.text);
			return [new Rectangle( -width / 2, -height / 2, width, height)];
			
		#else
			trace('non possible!');
		#end
		*/
		
		//return null;		
	}
	
}