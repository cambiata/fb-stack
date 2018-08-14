package markdown;

import cx.StrTools;
import nx3.qs.QSParser;
import web.dom.*;
import hxdom.Elements;
import hxdom.HtmlSerializer;
import markdown.AST;
import markdown.ast.FilelinkNode;
import markdown.ast.EScoreNode;
import markdown.InlineParser;
import Markdown;
using cx.StringTools;
using hxdom.DomTools;


/**
 * HxdomRenderer
 * @author Jonas Nyström
 */
class HxdomRenderer implements NodeVisitor 
{

	static var BLOCK_TAGS = new EReg('blockquote|h1|h2|h3|h4|h5|h6|hr|p|pre', '');
	
	public static function markdownToHtml(markdown:String, additionalInlineSyntaxes:Array<InlineSyntax>=null):String {
		var blocks = HxdomRenderer.getBlocks(markdown, additionalInlineSyntaxes);
		var dom:EHtml = cast new HxdomRenderer().render(blocks, new EHtml());			
		var html = HtmlSerializer.run(dom);
		return html;
	}
	
	public static function markdownToElements(markdown:String, additionalInlineSyntaxes:Array<InlineSyntax> = null):VirtualElement<Dynamic> {
		var blocks = HxdomRenderer.getBlocks(markdown, additionalInlineSyntaxes);
		var dom:EDiv = cast new HxdomRenderer().render(blocks, new EDiv());			
		return dom;		
	}
	
	static public function getBlocks(markdown:String, additionalInlineSyntaxes:Array<InlineSyntax>=null) {
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
			return null;
		}		
	}
	

	public function new() 
	{
		
	}
	
	public function render(nodes:Array<Node>, domParent:VirtualElement<Dynamic>): hxdom.Elements.VirtualElement<Dynamic>
	{
		if (domParent == null) return null;
		if (nodes == null) return null;
		/*
		buffer = new StringBuf();
		for (node in nodes) node.accept(this);
		return buffer.toString();
		*/
		
		for (node in nodes) {
			
			var domnode: VirtualElement<Dynamic> = null;
			
			if (Std.is(node, ElementNode)) {
				var enode:ElementNode = cast node;
				//trace('* ELEMENT NODE: ${enode.tag}');
				
				var domnode: VirtualElement<Dynamic> = switch enode.tag {
					case 'p': domnode = new EParagraph();
					case 'h1': domnode = new EHeader1();
					case 'h2': domnode = new EHeader2();
					case 'h3': domnode = new EHeader3();
					case 'h4': domnode = new EHeader4();
					case 'a': domnode = new EAnchor().setAttr('target', '_blank');
					case 'img': domnode = new EImage();	
					case 'strong': domnode = new EStrong();
					case 'em': domnode = new EEmphasis();
					case 'ul': domnode = new EUnorderedList();
					case 'ol': domnode = new EOrderedList();
					case 'li': domnode = new EListItem();					
					case 'blockquote': domnode = new EBlockQuote();					
					case 'table': domnode = new ETable();					
					case 'thead': domnode = new ETableHeader();					
					case 'th': domnode = new ETableHeaderCell();					
					case 'tbody': domnode = new ETableBody();					
					case 'tr': domnode = new ETableRow();					
					case 'td': domnode = new ETableRow();					
					case 'div': domnode = new EDiv();										
					
					case 'ilink': {
						var cnode:FilelinkNode = cast enode;
						domnode = new EInternalLink(cnode.filename);						
						domnode;
					}
					
					case 'qscore': {
						var cnode:EScoreNode = cast enode;
						
						domnode = new EDiv();						
						
						if (cnode.interactive) {
							domnode.append(new QScoreInteractive(cnode.code, cnode.showScore, cnode.showPlayer, cnode.tempo, cnode.metronome, cnode.countin));														
						} else {
							if (cnode.showPlayer) { 
								var code = cnode.code.trim();
								code = QSParserTools.urlEncode(code);
								code = code.trim();							
								domnode.append(new EAudioPlayer('/qplay/' + cx.StringTools.urlEncode(code)));	
							}
							if (cnode.showScore) {
								domnode.append(new QScoreSyntax(cnode.code));
							}
						}

						domnode;						
					}
					
					case 'audio': {
						var mp3Node:FilelinkNode = cast enode;
						var domnode:EAudio = new EAudio();
						domnode.node.controls = true;
						domnode.setAttr('src', '/audio/' + mp3Node.filename);	
						domnode.setAttr('controls', 'true');
						domnode.setAttr('preload', 'auto');
						domnode;						
					}
					
					case 'video': {
						var mp3Node:FilelinkNode = cast enode;
						var domnode:EVideo = new EVideo();
						domnode.node.controls = true;
						domnode.setAttr('src', '/video/' + mp3Node.filename);	
						domnode.setAttr('controls', 'controls');
						domnode.setAttr('preload', 'none');
						//domnode.setAttr('src', '/assets/video/m');						
						domnode;						
					}		
					
					case 'image': {
						var node:FilelinkNode = cast enode;
						var domnode:EImageExt = new EImageExt('/image/' + node.filename, node.scaling);						
						//domnode.setAttr('src', '/image/' + node.filename);						
						domnode;													
					}
					
					
					case _:  {
						var d = new ESpan();
						d.setAttr('style', 'border: 1px solid red;');
						
						d.setHtml(enode.tag);
						d;
					}
				}
				
				var attributeNames = [for (k in enode.attributes.keys()) k];
				attributeNames.sort(sortAttributes);
				for (name in attributeNames)
				{					
					domnode.setAttr(name, enode.attributes.get(name));
				}				
				
				if (domnode != null) domParent.append(domnode);
				this.render(enode.children, domnode);					
				
			} else {
				
				var tnode: TextNode = cast node;
				//trace('* TEXT NODE: ${tnode.text}');
				var domnode = new ESpan();
				domnode.setText(tnode.text);
				domParent.append(domnode);
				//domParent.setText(tnode.text);
			}
			
		}
		return domParent;
	}	
	
	
	/* INTERFACE markdown.AST.NodeVisitor */
	public function visitText(text:TextNode):Void
	{
	}

	public function visitElementBefore(element:ElementNode):Bool
	{
		return false;
	}

	public function visitElementAfter(element:ElementNode):Void
	{
	}

	static var attributeOrder = ['src', 'alt'];

	static function sortAttributes(a:String, b:String)
	{
		var ia = attributeOrder.indexOf(a);
		var ib = attributeOrder.indexOf(a);
		if (ia > -1 && ib > -1) return ia - ib;
		return Reflect.compare(a, b);
	}
	
}