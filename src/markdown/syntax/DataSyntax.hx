package markdown.syntax;
import haxe.Json;
import markdown.AST.ElementNode;
import markdown.InlineParser.InlineSyntax;
import markdown.ast.DataNode;
import markdown.ast.ErrorNode;
import tjson.TJSON;
/**
 * DataSyntax
 * @author Jonas Nyström
 */
class DataSyntax  extends InlineSyntax
{
	public function new() 
	{
		super(REGEX);
	}
	
	public static var REGEX = '¤{([ A-Za-z0-9@!&=?+_()#|"\'-:%.^¤]*)}¤';
	
	override function onMatch(parser:InlineParser):Bool
	{		
		var jsonstr = '{' + pattern.matched(1) + '}';				
		var data:Dynamic = null;
		try {			
			data = TJSON.parse(jsonstr);
			var el = new DataNode('data-node', data);
			parser.addNode(el);
		} catch (e:Dynamic) {
			var el = new ErrorNode('error', Std.string(e));
			parser.addNode(el);
		}
		
		return true;		
	}	
	
}