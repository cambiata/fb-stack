package markdown.syntax;
import cx.MathTools;
import cx.StrTools;
import markdown.AST;
import markdown.ast.EScoreNode;
import markdown.InlineParser;
/*
import nx3.PScore;
import nx3.qs.QSParser;
import nx3.render.Renderer;
import nx3.render.scaling.Scaling;
import nx3.render.TargetSvgXml;
import nx3.xml.ScoreXML;
*/
using cx.StringTools;

/**
 * MusicSyntax
 * @author 
 */
class QScoreSyntax extends InlineSyntax
{
	public function new()
	{
		super('¤((qscore):([^¤]*))¤');
	}

	override function onMatch(parser:InlineParser):Bool
	{
		var url = pattern.matched(1);
		var qscore:String = pattern.matched(3);
		
		var showScore = true;
		var playScore = false;
		var interactive = false;
		var metronome:Int = 0;
		var countin: Int = 0;
		var tempo:Int = 60;
		
		if (qscore.toLowerCase().indexOf('play') > -1) {
			playScore = true;
			qscore = qscore.replace('play', '');
		}
		
		if (qscore.toLowerCase().indexOf('hide') > -1) {
			showScore = false;
			qscore = qscore.replace('hide', '');
		}
		
		if (qscore.toLowerCase().indexOf('iact') > -1) {
			interactive = true;
			//playScore = false;
			//showScore = false;
			qscore = qscore.replace('iact', '');
		}		
		
		var ix = qscore.toLowerCase().indexOf('metronome:');
		if (ix > -1) {
			metronome = Std.parseInt(qscore.substr(ix + 10));			
			trace('METRONOME: $metronome');		
			qscore = qscore.substr(0, ix) + qscore.substr(ix+12);
		}
		
		var ix = qscore.toLowerCase().indexOf('countin:');
		if (ix > -1) {
			countin = Std.parseInt(qscore.substr(ix + 8));			
			trace('COUNTIN: $countin');					
			qscore = qscore.substr(0, ix) + qscore.substr(ix+10);
		}	
		
		var ix = qscore.toLowerCase().indexOf('tempo:');
		if (ix > -1) {
			var strvalue = StrTools.pluckValue(qscore, 'tempo:');
			qscore = strvalue.str;
			tempo = MathTools.intClamp(Std.parseInt(strvalue.value), 40, 220);
			
		}
		trace('TEMPO: $tempo $qscore');
		
		
		//trace(qscore);
		//trace([showScore, playScore, interactive]);
		
		var el = new EScoreNode('qscore', null, qscore, showScore, playScore, interactive, tempo, metronome, countin);
		parser.addNode(el);		
		return true;
	}
	
	
	
}

