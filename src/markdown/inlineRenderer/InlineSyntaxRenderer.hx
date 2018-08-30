package markdown.inlineRenderer;

import Markdown;
import markdown.ast.*;
import markdown.AST;
import markdown.InlineParser;

class InlineSyntaxRenderer extends InlineSyntax {
	public function render(parent:Dynamic, code:String) {
		var child:Dynamic = cast {tag: 'h1', attrs: {className: 'error'}, text: ['InlineSyntaxRenderer']};
		parent.children.push(child);
	}
}

class SyntaxRendererNode extends DataNode {}
