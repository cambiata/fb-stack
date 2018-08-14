package markdown.syntax;
import cx.StrTools;
import markdown.ast.FilelinkNode;
import markdown.InlineParser.InlineSyntax;

/**
 * PngSyntax
 * @author Jonas Nyström
 */
class ImgSyntax  extends InlineSyntax
{

	public function new() 
	{
		super(REGEX);
	}
	
	public static var REGEX = '¤image:([ A-Za-z0-9-:%.^¤]*)¤';
	
	override function onMatch(parser:InlineParser):Bool
	{
		var filename = pattern.matched(1);		
		
		//trace('match image');
		/*
		var scaling = '';
		var ix = filename.indexOf('scaling:');
		if (ix > -1) {
			var result = cx.StrTools.pluckValue(filename, 'scaling:');
			scaling = result.value;
			filename = result.str;
			filename = cx.StringTools.trim(filename);
			trace('SCALING: $scaling $filename');
		}		
		*/
		
		var el = new FilelinkNode('image', null, filename, '');
		parser.addNode(el);
		return true;		
	}
}