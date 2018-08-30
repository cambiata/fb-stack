package markdown;

import haxe.ds.Either;
import Markdown;
import markdown.ast.*;
import markdown.inlineRenderer.InlineSyntaxRenderer;
import markdown.AST;
import markdown.InlineParser;
import mithril.M;
import mithril.M.m;
import haxe.ds.StringMap;

class MithrilRenderer {
	// var cache:haxe.ds.StringMap<Dynamic>;
	private function new() {
		// this.cache = new StringMap();
	}

	// public function clearCache() {
	//     for(key in this.cache.keys()) {
	//         this.cache.remove(key);
	//     }
	// }
	// public function clearCacheKey(key:String) {
	//     if (this.cache.exists(key)) {
	//         trace('remove cache key ');
	//         this.cache.remove(key);
	//     }
	// }
	public static var instance(default, null):MithrilRenderer = new MithrilRenderer();

	public function markdownToView(md:String, syntaxRenderers:Array<InlineSyntaxRenderer> = null) {
		// if (this.cache.exists(md)) {
		//     trace('get from cache!');
		//     return this.cache.get(md);
		// }

		this.syntaxRenderers = syntaxRenderers;
		var blocks = MarkdownTools.getBlocks(md, cast this.syntaxRenderers);
		var view = this.buildView(blocks, cast {tag: 'div', attrs: {className: 'markdown'}, children: []});

		// trace('save view to cache');
		// this.cache.set(md, view);

		return view;
	}

	var syntaxRenderers:Array<InlineSyntaxRenderer> = [];

	public function buildView(mdNodes:Array<Node>, parent:Vnode<Dynamic> = null):Dynamic {
		for (mdNode in mdNodes) {
			switch Type.getClass(mdNode) {
				case ElementNode:
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

					var child:Vnode<Dynamic> = cast {tag: node.tag, attrs: attributes, children: []};
					parent.children.push(child);
					buildView(node.children, child);

				case TextNode:
					var node:TextNode = cast mdNode;
					parent.children.push(cast {tag: 'span', text: node.text});

				case SyntaxRendererNode:
					var node:SyntaxRendererNode = cast mdNode;
					try {
						var syntaxRenderer:InlineSyntaxRenderer = this.syntaxRenderers.filter(sr -> {
							return node.tag == Type.getClassName(Type.getClass(sr));
						})[0];
						syntaxRenderer.render(parent, node.data);
					} catch (e:Dynamic) {
						trace('error: ' + e);
					}
			}
		}
		return parent;
	}
}
// class InlineSyntaxRenderer extends InlineSyntax {
// 	public function render(parent:Dynamic, code:String) {
// 		var child:Dynamic = cast {tag: 'h1', attrs: {className: 'error'}, text: ['InlineSyntaxRenderer']};
// 		parent.children.push(child);
// 	}
// }
// class SyntaxRendererNode extends DataNode {}
// class QInlineSyntaxRenderer extends InlineSyntaxRenderer {
// 	public function new()
// 		super(REGEX);
// 	public static var REGEX = '/@score ([0-9a-zA-Z ]*)@/';
// 	override function onMatch(parser:InlineParser):Bool {
// 		var code = pattern.matched(1);
// 		var el = new SyntaxRendererNode(Type.getClassName(Type.getClass(this)), code);
// 		parser.addNode(el);
// 		return true;
// 	}
// 	override public function render(parent:Dynamic, code:String) {
// 		var renderer:ui.render.IStringRenderer = ui.StringRendererMapper.instance.get('score');
// 		var svg = renderer.renderFromCode(code);
// 		var child:Dynamic = cast {tag: 'div', attrs: {className: 'score'}, text: ['Hello from QSyntaxRenderer ']};
// 		parent.children.push(child);
// 		var child = m('div', M.trust(renderer.renderFromCode(code)));
// 		parent.children.push(child);
// 	}
// }
