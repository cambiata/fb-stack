package markdown.syntax;

import markdown.AST;
import markdown.ast.DataNode;
import markdown.InlineParser;

class TestcodeSyntax extends InlineSyntax {
	public function new()
		super(REGEX);

	public static var REGEX = '/@test ([0-9a-zA-Z ]*)@/';

	override function onMatch(parser:InlineParser):Bool {
		var code = pattern.matched(1);
		var el = new DataNode('testcode', code);
		parser.addNode(el);
		return true;
	}
}
