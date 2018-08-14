package markdown.syntax;

import cx.StrTools;
import markdown.AST;
import markdown.ast.FilelinkNode;
import markdown.InlineParser;
using Lambda;
using cx.StringTools;
/**
 * Mp3Syntax
 * @author Jonas Nyström
 */
class LinkSyntax  extends InlineSyntax
{

	public function new() 
	{
		super(REGEX);
	}
	
	public static var REGEX = '¤link:([ A-Za-z0-9-.:åäöÅÄÖ?!/|^¤]*)¤';
	
	override function onMatch(parser:InlineParser):Bool
	{
		var link = pattern.matched(1);		
		var el = new FilelinkNode('ilink', null, link, 'x');
		parser.addNode(el);
		return true;		
	}
}

