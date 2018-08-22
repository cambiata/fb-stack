package web.view;

import mithril.M;

import cx.Response;
import cx.StrTools;
import haxe.ds.IntMap;
import haxe.ds.StringMap;
import mithril.M;
import nx3.NBar;
import nx3.NHead;
import nx3.NNote;
import nx3.*;
import nx3.render.Renderer;
import nx3.render.TargetSvgXml;
import nx3.render.scaling.Scaling;
import nx3.render.scaling.TScaling;

using cx.ArrayTools;
using Lambda;
/**
 * SingleNote
 * @author Jonas Nyström
 */
class SingleNote implements Mithril
{
	var state:AppState;

	public function new(state:AppState) 
	{
		this.state = state;		
	}
	
	public function view() {
		
		var svgStr = '';
		
		var firstkey = (this.state.keysHover.length > 0) ? this.state.keysHover[0] : 0;
		
		return [
				(this.state.keysHover.length > 0) ? m('div.svg', M.trust(SingleNoteCache.getSvg(firstkey))) :  m('div', '-'),
		];		
	}
	
}

class SingleNoteCache {
	
	static public var cache:IntMap<String>;

	static public function createNotes(lowestNr:Int, highestNr:Int) {
		cache = new IntMap<String>();
		for (i in lowestNr ... highestNr) {
			
			var cleafsAndHeads = noteToHead(i);
			var bars = [];
			for (cah in cleafsAndHeads) {
				var clef = cah.clef;
				var heads = cah.heads;
				var names = cah.names;
				var notes = cah.heads.map(function (head) return new NNote([head], ENoteVal.Nv1));
				var key:EKey = EKey.Natural;
				var str = String.fromCharCode(178) + 'Hej';
				
				var namenotes = cah.names.map(function(name) return new NNote(ENoteType.Lyric(name), ENoteVal.Nv1));
				
				var bar = new NBar([
						new NPart([new NVoice(notes)], clef, key),
						new NPart([new NVoice(namenotes)], EPartType.Lyrics),
						], EAllotment.Equal);
				bars.push(bar);
			}
			var score = new NScore(bars);
			
			var pscore = new PScore(score);
			var target = new  TargetSvgXml('svg', Scaling.NORMAL);
			var renderer = new Renderer(target, 0, 0);
			renderer.renderScore(pscore, 0, 0, 400);
			var svg = target.getXml();			
			var svgStr = svg.toString();
			cache.set(i, svgStr);
			
		
		}
	}
	
	static public function getSvg(noteNr:Int):String {
		return cache.exists(noteNr) ? cache.get(noteNr) : 'Note nr $noteNr does note exists in cache';		
	}
	
	static public function noteToHead(noteNr:Int):Array<{heads:NHeads, clef:EClef, names:Array<String>}> {
		
		if (noteNr == 0) return [];
		
		function getHeads(noteNr:Int, clef:EClef) {
			var octave = Math.floor(noteNr / 12) ;
			var noteInOctave = noteNr % 12;
			var level: Int = 0  + (-7 * (octave - 4));
			if (clef == EClef.ClefF) level += -12;
			#if js trace(octave); #end
			
			var heads:NHeads = switch noteInOctave {
				case 11: [new NHead(level)] ;
				case 10:[
					new NHead(level + 1, ESign.Sharp),
					new NHead(level, ESign.Flat), 
					];
				case 9: [new NHead(level+1)] ;
				case 8:[
					new NHead(level + 2, ESign.Sharp),
					new NHead(level + 1, ESign.Flat), 
					];
				case 7: [new NHead(level+2)] ;
				case 6:[
					new NHead(level + 3, ESign.Sharp),
					new NHead(level + 2, ESign.Flat), 
					];
				case 5: [new NHead(level+3)] ;
				case 4: [new NHead(level+4)] ;
				case 3:[
					new NHead(level + 5, ESign.Sharp),
					new NHead(level + 4, ESign.Flat), 
					];
				case 2: [new NHead(level+5)] ;
				case 1:[
					new NHead(level + 6, ESign.Sharp),
					new NHead(level + 5, ESign.Flat), 
					];
				case 0: [new NHead(level+6)] ;
				case _: [];
			}
			return heads;
		}
		
		function getNames(noteNr:Int) {
			var noteInOctave = noteNr % 12;
			var names = switch noteInOctave {
				case 11: ['b'] ;
				case 10:['aiss', 'bess'];
				case 9:  ['a'] ;
				case 8:['giss', 'ass'];
				case 7: ['g'] ;
				case 6:['fiss', 'gess'];
				case 5: ['f'] ;
				case 4:['e'] ;
				case 3:['diss', 'ess'];
				case 2:['d'] ;
				case 1:['ciss', 'dess'];
				case 0:['d'] ;
				case _: [];
			}
			
			// Stora, Kontra, Subkontra
			if (noteNr < 36) names = names.map(function(name) return StrTools.upperCaseFirst(name));
			
			if (noteNr >= 0 && noteNr <= 11) names = names.map(function(name) return name + StrTools.SUBSCRIPT_TWO);
			if (noteNr >= 12 && noteNr <= 23) names = names.map(function(name) return name + StrTools.SUBSCRIPT_ONE);
			if (noteNr >= 48 && noteNr <= 59) names = names.map(function(name) return name + StrTools.SUPERSCRIPT_ONE);
			if (noteNr >= 60 && noteNr <= 71) names = names.map(function(name) return name + StrTools.SUPERSCRIPT_TWO);
			if (noteNr >= 72 && noteNr <= 83) names = names.map(function(name) return name + StrTools.SUPERSCRIPT_TWO);
			return names;				
		}
		
		var result = [];
		
		if (noteNr < 41) {
			result = [ { heads:getHeads(noteNr, EClef.ClefF), clef:EClef.ClefF, names:getNames(noteNr) }  ];
		} else if (noteNr >= 41 && noteNr <= 55) {
			result = [ 
				{heads:getHeads(noteNr, EClef.ClefF), clef:EClef.ClefF, names:getNames(noteNr) }, 
				{heads:getHeads(noteNr, EClef.ClefG), clef:EClef.ClefG, names:getNames(noteNr) }, 
			];
		} else {
			result = [ { heads:getHeads(noteNr, EClef.ClefG), clef:EClef.ClefG, names:getNames(noteNr) } ];
		}
		
		return result;
		//var heads = getHeads(noteNr);
		//var clef = EClef.ClefF;		
		//return [{heads:heads, clef:clef}];
	}
	
	
}

