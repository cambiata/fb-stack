package markdown.ast;
import markdown.AST;

/**
 * CodeNode
 * @author Jonas Nyström
 */
class EScoreNode extends ElementNode {
	public var showScore:Bool;
	public var showPlayer:Bool;
	public var interactive:Bool;
	public var code:String;
	public var tempo:Int;
	public var metronome:Int;
	public var countin:Int;
	
	public function new(tag:String, children:Array<Node>, code:String, showScore:Bool=true, showPlayer:Bool=false, interactive:Bool=false, tempo:Int = 80, metronome:Int=0, countin:Int = 0) {
		super(tag, children);
		this.showPlayer = showPlayer;
		this.showScore = showScore;
		this.interactive = interactive;
		this.code = code;
		this.tempo = tempo;
		this.metronome = metronome;
		this.countin = countin;
	}	
}
