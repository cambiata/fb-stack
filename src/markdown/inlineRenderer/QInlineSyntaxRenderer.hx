package markdown.inlineRenderer;

import Markdown;
import markdown.ast.*;
import markdown.AST;
import markdown.InlineParser;
import markdown.inlineRenderer.InlineSyntaxRenderer;
import mithril.M;
import mithril.M.m;

class QInlineSyntaxRenderer extends InlineSyntaxRenderer {
	public function new()
		super(REGEX);

	public static var REGEX = '/@score ([0-9a-zA-Z ]*)@/';

	override function onMatch(parser:InlineParser):Bool {
		var code = pattern.matched(1);
		var el = new SyntaxRendererNode(Type.getClassName(Type.getClass(this)), code);
		parser.addNode(el);
		return true;
	}

	override public function render(parent:Dynamic, code:String) {
		var renderer:ui.render.IStringRenderer = ui.StringRendererMapper.instance.get('score');
		var svg = renderer.renderFromCode(code);
		var child:Dynamic = cast {tag: 'div', attrs: {className: 'score'}, text: ['Hello from QSyntaxRenderer ']};
		parent.children.push(child);

		var child = m('div', M.trust(renderer.renderFromCode(code)));
		parent.children.push(child);
	}
}
