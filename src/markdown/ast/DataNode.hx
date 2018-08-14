package markdown.ast;
import markdown.AST.ElementNode;
import markdown.AST.Node;
import markdown.AST.NodeVisitor;
import markdown.AST.TextNode;

/**
 * DataNode
 * @author Jonas Nyström
 */
class DataNode extends ElementNode
{
	public var data(default, null):Dynamic;

	public function new(tag:String, data:Dynamic) {
		super(tag, []);
		this.data = data;		
	}

}
