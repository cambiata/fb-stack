package nx3.qs;

import nx3.ENoteVal;
import nx3.ESign;
import nx3.qs.BarParser;
import nx3.qs.QuickSyntaxParser;
import nx3.qs.ContentMode;
import nx3.qs.ModeParser;
import nx3.NHead;
import nx3.NNote;
import nx3.qs.QSyntaxNotes;
//using cx.StringTools;
/**
 * ...
 * @author Jonas Nyström
 */
class QuickSyntaxParser
{
	var str:String;
	var tokens:Array<String>;
	var qsnotes:QSyntaxNotes;
	
	/*
	var barIndex:Int;
	var partIndex:Int;
	var voiceIndex:Int;
	var modefunctions:Map < String, Void->Void > ;
	var contentmodeOctave:Int;
	//var contentmode:ContentMode;
	var notefunctions:Map < String, String->String> ;
	//public var nnotes:Array<NNote>;
	*/
	
	var modeparser:ModeParser;
	var barparser:BarParser;
	var noteparser:NoteParser;
	var lyricsparser:LyricsParser;
	var mode:ContentMode;
	
	
	public function new(str:String) 
	{
		str = QSyntaxTools.removeComments(str);
		str = QSyntaxTools.removeSpaces(str);
		this.str = str;
		this.tokens = parseTokens(this.str);
		
		this.qsnotes = new QSyntaxNotes();
		
		this.modeparser = new ModeParser(this);
		this.barparser = new BarParser(this);
		this.noteparser = new NoteParser(this);
		this.lyricsparser = new LyricsParser(this);
		
		this.mode = ContentMode.Notes;
		//this.modeparser.sendEvent(ParserEvents.SetOctave(123));
		
	}
	
	public function parseToQSyntaxNotes():QSyntaxNotes
	{
		for (token in this.tokens)
		{
			//trace('TOKEN >$token<');
			
			var testtoken = token;			
			testtoken = this.modeparser.parse(token, this);
			if (testtoken == '') continue;
			testtoken = this.barparser.parse(token, this);
			if (testtoken == '') continue;			
			switch this.mode
			{
				case ContentMode.Notes:
					testtoken = this.noteparser.parse(token, this);
					if (testtoken == '') continue;
				case ContentMode.Lyrics:
					trace('LYYYRICS');
					testtoken = this.lyricsparser.parse(token, this);
				default:
			}
			
		}
		return this.qsnotes;
	}
	
	function parseTokens(str:String) :Array<String>
	{
		var result:Array<String> = [];
		result = str.split(' ');
		return result;
	}
	
	public function addNote(nnote:NNote, ?bpvIndex:QSyntaxBPV=null)
	{
		if (bpvIndex == null)  bpvIndex = this.barparser.getBpvIndex();
		
		var bpvString = QSyntaxTools.bpvToString(bpvIndex);
		
		 if (! this.qsnotes.exists(bpvString)) this.qsnotes.set(bpvString, new NNotes());
		 this.qsnotes.get(bpvString).push(nnote);
		 
		 //trace(['Note added to ', bpvIndex.barIndex, bpvIndex.partIndex, bpvIndex.voiceIndex, nnote]);
	 }
	 
	 public function passEvent(event:ParserEvents)
	 {
		 this.modeparser.recieveEvent(event);
		 this.barparser.recieveEvent(event);
		 this.noteparser.recieveEvent(event);
		 
		 switch event
		 {
			 case ParserEvents.SetMode(mode):
				 this.mode = mode;
			default:
		 }
	 }
}



//typedef BPVIndex = { barIndex:Int, partIndex:Int, voiceIndex:Int };








