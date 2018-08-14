package markdown;

import markdown.InlineParser;
import markdown.AST;
import Markdown;

/**
 * MarkdownTools
 * @author Jonas Nyström
 */
class MarkdownTools 
{

	static public function getBlocks(markdown:String, additionalInlineSyntaxes:Array<InlineSyntax>=null):Array<markdown.Node> {
		// create document
		var document = new Document();

		if (additionalInlineSyntaxes != null)
			for (s in additionalInlineSyntaxes) document.inlineSyntaxes.push(s);
		
		var blocks = null;
		try
		{
			// replace windows line endings with unix, and split
			var lines = ~/(\r\n|\r)/g.replace(markdown, '\n').split("\n");

			// parse ref links
			document.parseRefLinks(lines);

			// parse ast
			blocks = document.parseLines(lines);
			
			return blocks; 
		}
		catch (e:Dynamic)
		{
			trace(e);
			return null;
		}		
	}
	
}