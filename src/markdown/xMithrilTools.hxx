package markdown;
import Markdown;
import haxe.ds.Either;
import markdown.AST;
import markdown.InlineParser;
import mithril.M;
import mithril.M.m;
import markdown.ast.*;
import Mithril.

/**
 * MithrilRenderer
 * @author Jonas Nyström
 */

 class MithrilTools  
{
	static public function markdownToView(md:String, additionalInlineSyntaxes:Array<InlineSyntax>=null) {
		return MithrilTools.buildView(MarkdownTools.getBlocks(md, additionalInlineSyntaxes));
	}
		
	static public function buildView(mdNodes:Array<Node>, parent:Vnode<Dynamic>=null):Vnode<Dynamic> {
		//trace(Std.string(parent));
		
		
		if (parent == null) parent = cast { tag: 'div', attrs: { className: 'markdown' }, children: [] };		


		//var par:Vnode<Dynamic> = cast parent;		
		for (mdNode in mdNodes) {
			switch Type.getClass(mdNode) {
				case ElementNode:			
					//trace('Element node');
					var node:ElementNode = cast mdNode;
					
					
					// Attributes - like href for anchor tags
					var attributes = { };
					var attributeNames = [for (k in node.attributes.keys()) k];
					for (name in attributeNames) Reflect.setField(attributes, name, node.attributes.get(name));
										
					// Tweaks
					switch node.tag {
						case 'a': Reflect.setField(attributes, 'target', '_blank');
					}
					
					var child:Vnode<Dynamic> = cast { tag: node.tag, attrs: attributes, children: [] };

					//if (child != null) {
					parent.children.push(child); 
					//}					
					buildView(node.children, child);										
					
				case TextNode:	
					
					var node: TextNode = cast mdNode;
					//trace('TextNode node:' + node.text);
					parent.children.push(cast {tag:'span', text: node.text});		

				case DataNode:
					//trace('DataNode node');
					var node: DataNode = cast mdNode;
					var child:Vnode<Dynamic> = cast { tag: 'h3', attrs: { }, children: [{tag:'span', text: 'data-node: ' + node.data}] };
					parent.children.push(child); 
					
				case ErrorNode:
					var node: ErrorNode = cast mdNode;
					var child:Vnode<Dynamic> = cast { tag: 'span', attrs: {className:'error' }, children: ['Error: ' + node.msg] };
					parent.children.push(child); 	
				default:
					trace('OTHER NODE');				
			}
		}		
		return parent;
	}	

	/*
	static var attributeOrder = ['src', 'alt'];

	static function sortAttributes(a:String, b:String) {
		var ia = attributeOrder.indexOf(a);
		var ib = attributeOrder.indexOf(a);
		if (ia > -1 && ib > -1) return ia - ib;
		return Reflect.compare(a, b);
	}	
	*/
}


