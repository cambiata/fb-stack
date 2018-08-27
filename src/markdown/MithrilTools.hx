package markdown;

import ui.StringRendererMapper;
import ui.render.IStringRenderer;
import ui.Bookpage;
import markdown.syntax.TestcodeSyntax;
import Markdown;
import haxe.ds.Either;
import markdown.AST;
import markdown.InlineParser;
import mithril.M;
import mithril.M.m;
import markdown.ast.*;

// class QScoreSyntax extends InlineSyntax {
// 	public function new()
// 		super(REGEX);
// 	public static var REGEX = '/@score ([0-9a-zA-Z ]*)@/';
// 	override function onMatch(parser:InlineParser):Bool {
// 		var code = pattern.matched(1);
// 		var el = new DataNode('testcode', code);
// 		parser.addNode(el);
// 		return true;
// 	}
// }
class MithrilTools {
	static public function markdownToView(md:String, additionalInlineSyntaxes:Array<InlineSyntax> = null) {
		return MithrilTools.buildView(MarkdownTools.getBlocks(md, additionalInlineSyntaxes));
	}

	static var cache:cx.Cache<Dynamic> = new cx.Cache(5);

	static public function buildView(mdNodes:Array<Node>, parent:Dynamic = null):Dynamic {
		// trace(Std.string(parent));
		// trace(mdNodes);

		if (parent == null)
			parent = cast {tag: 'div', attrs: {className: 'markdown'}, children: []};

		// var par:Vnode<Dynamic> = cast parent;
		for (mdNode in mdNodes) {
			switch Type.getClass(mdNode) {
				case ElementNode:
					// trace('Element node');
					var node:ElementNode = cast mdNode;

					// Attributes - like href for anchor tags
					var attributes = {};
					var attributeNames = [for (k in node.attributes.keys()) k];
					for (name in attributeNames)
						Reflect.setField(attributes, name, node.attributes.get(name));

					// Tweaks
					switch node.tag {
						case 'a': Reflect.setField(attributes, 'target', '_blank');
					}

					var child:Dynamic = cast {tag: node.tag, attrs: attributes, children: []};

					// if (child != null) {
					parent.children.push(child);
					// }
					buildView(node.children, child);

				case TextNode:
					var node:TextNode = cast mdNode;
					// trace('TextNode node:' + node.text);
					parent.children.push(cast {tag: 'span', text: node.text});

				case DataNode:
					// trace('DataNode node');
					var node:DataNode = cast mdNode;

					var child:Dynamic = cache.get(node.data);
					if (child == null) {
						// trace('build cache: ' + node.data);
						child = cast {tag: 'h3', attrs: {}, children: [{tag: 'span', text: 'data-node: ' + node.data}]};
						cache.set(node.data, child);
					} else {
						// trace('get from cache: ' + node.data);
					}

					parent.children.push(child);

				case ErrorNode:
					var node:ErrorNode = cast mdNode;
					var child:Dynamic = cast {tag: 'span', attrs: {className: 'error'}, children: ['Error: ' + node.msg]};
					parent.children.push(child);

				case StringRenderNode:
					var node:StringRenderNode = cast mdNode;
					var code = node.code;
					var renderer = StringRendererMapper.instance.get('score');
					var child = m('div', M.trust(renderer.renderFromCode(code)));
					parent.children.push(child);

				// case XNode:

				// 	var node: XNode = cast mdNode;
				// 	var code:String = node.data;
				// 	// var child:Dynamic = cast { tag: 'h1', attrs: { }, children: [{tag:'span', text: 'xnode: ' + node.data}] };
				// 	var child:Dynamic = cache.get(node.data);
				// 	if (child == null) {
				// 		var sys = new TestSystem(code);
				// 		child = TestSystemRenderer.render(sys);
				// 		trace('save to cache: ' + node.data);
				// 		cache.set(node.data, child);
				// 	} else {
				// 		trace('get from cache: ' + node.data);
				// 	}

				// 	parent.children.push(child);
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

class XNode extends ElementNode {
	public var data(default, null):Dynamic;

	public function new(data:Dynamic) {
		super('xnode', []);
		this.data = data;
	}
}
