package markdown.syntax;
import markdown.AST;
import markdown.InlineParser;
using Lambda;
using cx.StringTools;
/**
 * ...
 * @author Jonas Nyström
 */
class CustomTagSyntax extends InlineSyntax
{
	public function new()
	{
		super(REGEX);
	}

	override function onMatch(parser:InlineParser):Bool
	{
		var url = pattern.matched(1);
		var tagsStr = pattern.matched(3);
		var tags = tagsStr.split(',').map(function(s) return cx.StringTools.trim(s));
		var text = pattern.matched(4);
		var el = ElementNode.text('a', text); 
		
		el.attributes.set('data', tags.toString());
		el.attributes.set('class', 'tags');
		el.attributes.set('href', '#');
		parser.addNode(el);

		return true;
	}
	
	public static var REGEX = '¤((tags:)([^:]*):([^¤]*))¤';
}


