package markdown.ast;
import markdown.AST.ElementNode;

/**
 * ErrorNode
 * @author Jonas Nyström
 */
class ErrorNode extends ElementNode
{
	public var msg(default, null):String;

	public function new(tag:String, msg:String) {
		super(tag, []);
		this.msg = msg;		
	}

}
