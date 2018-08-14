package markdown.syntax;

import markdown.AST;
import markdown.ast.FilelinkNode;
import markdown.InlineParser;
using Lambda;
using cx.StringTools;
/**
 * Mp3Syntax
 * @author Jonas Nyström
 */
class VideoSyntax  extends InlineSyntax
{

	public function new() 
	{
		super(REGEX);
	}
	
	public static var REGEX = '¤video:([A-Za-z0-9-.\\_^¤]*)¤';
	
	override function onMatch(parser:InlineParser):Bool
	{
		var mp4filename = pattern.matched(1);		
		
		var el = new FilelinkNode('video', null, mp4filename, 'x');
		parser.addNode(el);
		return true;		
	}
	
	
}