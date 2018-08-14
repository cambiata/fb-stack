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
class AudioSyntax  extends InlineSyntax
{

	public function new() 
	{
		super(REGEX);
	}
	
	public static var REGEX = '¤audio:([A-Za-z0-9-.\\_^¤]*)¤';
	
	override function onMatch(parser:InlineParser):Bool
	{
		var mp3filename = pattern.matched(1);		
		
		var el = new FilelinkNode('audio', null, mp3filename, 'x');
		parser.addNode(el);
		return true;		
	}
}