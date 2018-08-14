package markdown;

/**
 * MarkdownView
 * @author Jonas Nyström
 */
class MarkdownView  {
	var md:String;	
	public function new(md:String) {
		this.md = md;		
	}
	public function view() [cast  MithrilTools.markdownToView(md)];	
}
	
