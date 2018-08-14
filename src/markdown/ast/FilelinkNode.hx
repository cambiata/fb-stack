package markdown.ast;
import markdown.AST.ElementNode;
import markdown.AST;
/**
 * Mp3Node
 * @author Jonas Nyström
 */
class FilelinkNode extends ElementNode {
	public var scaling:String;
	
	public var filename:String;
	
	public function new(tag:String, children:Array<Node>, filename:String, scaling:String) {
		super(tag, children);
		this.scaling = scaling;
		this.filename = filename;
		
	}	
}
