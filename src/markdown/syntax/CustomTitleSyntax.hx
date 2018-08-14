package markdown.syntax;
import markdown.AST;
import markdown.InlineParser;
using Lambda;
using cx.StringTools;
/**
 * ...
 * @author Jonas Nyström
 */
class CustomTitleSyntax extends InlineSyntax
{
	public function new()
	{
		super(REGEX);
	}

	override function onMatch(parser:InlineParser):Bool
	{
		var title = pattern.matched(1);
		trace(title);
		
		var el = ElementNode.text('span', title); 
		el.attributes.set('class', 'hidden');
		parser.addNode(el);
		
		
		return true;
	}
	
	public static var REGEX = '¤title:([a-z0-9 åäöÅÄÖüÜéÉèÈ.,;!?^¤]*)¤';
}


