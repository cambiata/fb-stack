package web.view;

import cx.StrTools;
import haxe.ds.IntMap;
import mithril.M;
import mithril.M.m;

using cx.ArrayTools;

/**
 * Keyboard
 * @author Jonas Nyström
 */
 
class Keyboard implements Mithril {
	var appState:AppState;
	
	static var b1 = StrTools.SUBSCRIPT_ONE;
	static var b2 = StrTools.SUBSCRIPT_TWO;
	static var p1 = StrTools.SUPERSCRIPT_ONE;
	static var p2 = StrTools.SUPERSCRIPT_TWO;
	static var p3 = StrTools.SUPERSCRIPT_THREE;
	static var p4 = StrTools.SUPERSCRIPT_FOUR;
	
	static var octaveLabels =  ['subkontra (C$b2-B$b2)' , 'kontra (C$b1-B$b1)', 'stora (C-B)', 'lilla (c-b)', 'ettstrukna (c$p1-b$p1)', 'tvåstrukna (c$p2-b$p2)', 'trestrukna (c$p3-b$p3)', 'fyrstrukna (c$p4-b$p4)'];
	
	public function new(appState:AppState) {		
		
		this.appState = appState;
	}
	
	function getKeyboard() {
		var keybOctaves:Array<KeyboarOctaveExt>;
		if (this.appState.keyboard == null) return [];
		var lowestKey = this.appState.keyboard.lowestKey;
		var highestKey = this.appState.keyboard.highestKey;
		
		var lowestOctave = Math.floor(lowestKey / 12);
		var highestOctave = Math.ceil(highestKey / 12);

		var excludeKeys = [];
		for (i in (lowestOctave * 12)...(highestOctave * 12)) {
			if (i < lowestKey || i > highestKey) excludeKeys.push(i);
		}
		keybOctaves = [];
		for (oct in lowestOctave...highestOctave) {			
			var keyboard = new KeyboarOctaveExt(appState, oct, excludeKeys, octaveLabels[oct]);			
			keybOctaves.push(
				keyboard
			);			
		}	
		return keybOctaves;
	}
	
	public function view() {
		return [ m('div.keyboard', 		
			this.getKeyboard().map(function(item) return item.view())		
		)];
	}
}


class KeyboarOctaveExt extends KeyboardOctave {
	var keyboardOctave:KeyboardOctave;
	var toplabel:String;
	
	public function new(appState:AppState, octave:Int=0, excludeKeyNumbers:Array<Int> = null, ?keyDistance = 24, ?keyHeight = 50, labels:IntMap<String> = null, colorKeys:IntMap<String>=null, toplabel:String = 'Toplabel') {
		super(appState, octave, excludeKeyNumbers, keyDistance, keyHeight, labels, colorKeys);
		this.toplabel = toplabel;
	}
	
	override public function view() {
		return [ 
			m('div.keyboard-ext', [
				m('div.keyboard-toplabel', toplabel),
				cast super.view(),
			]),
		];
	}
}


class KeyboardOctave implements Mithril {
	
	var keyDistance:Int;
	var keyHeight:Int;
	var excludeKeyNumbers:Array<Int>;
	var colorKeys:IntMap<String>;
	var appState:AppState;
	public var labels:IntMap<String>;
	
	public var octave: Int = 0;
	
	public function new(appState:AppState, octave:Int=3, excludeKeyNumbers:Array<Int>=null, ?keyDistance=20, ?keyHeight=50, labels:IntMap<String>=null, colorKeys:IntMap<String>=null) {
		this.appState = appState;
		this.colorKeys = colorKeys;
		this.labels = labels;
		this.keyDistance = keyDistance;
		this.keyHeight = keyHeight;
		
		this.octave = octave;
		
		this.excludeKeyNumbers = (excludeKeyNumbers == null) ? []:  excludeKeyNumbers.map(function(nr) return nr - (octave * 12)) ;		
		//trace(excludeKeyNumbers);
	}
	
	dynamic public function onMouseDown(idx:Int) { 
		//trace('onMouseDown ' + idx);
		this.appState.keysPressed = [idx];
	}
	dynamic public function onMouseUp(idx:Int) { 
		//trace('onMouseUp ' + idx);
		this.appState.keysPressed = [];
		
	}
	dynamic public function onMouseOver(idx:Int) { 
		//trace('onMouseOver ' + idx);
		this.appState.keysHover = [idx];
		
	}
	dynamic public function onMouseOut(idx:Int) { 
		//trace('onMouseOut ' + idx);
		this.appState.keysHover = [];
	}
	
	public function getOctave() {
		var keyWidth = keyDistance - 3;
		var keys = [];
		
		var keyLeft = 0.0;
		var keyBlack = '#333';
		var keyWhite = '#fff';
		
		var widht = keyWidth;
		var height = this.keyHeight;
		var blackHeight = Math.round(this.keyHeight * (4/7));
		var blackWidth = Math.round(this.keyDistance * (3/5));
		
		for (keyNumber in 0 ... 12) {
			var keyColor = keyWhite;
			var left = 0.0;
			widht = keyWidth;
			height = this.keyHeight;
			
			var black = [1, 3, 6, 8, 10].has(keyNumber);
		
			var keyType = (black) ? '.key-black': '.key-white';
			
			if (black) {
				keyColor = keyBlack;
				widht = blackWidth;
				height = blackHeight;				
			}
			
			switch keyNumber {
				case 0:		
					//keyColor = keyWhite;
				case 1:
					left = 0.6 * keyDistance;
				case 2:
					left = 1 * keyDistance;
				case 3:	
					left = 1.7 * keyDistance;
				case 4:
					left = 2 * keyDistance;
				case 5:
					left = 3 * keyDistance;
				case 6:
					left = 3.6 * keyDistance;					
				case 7:
					left = 4 * keyDistance;
				case 8:
					left = 4.6 * keyDistance;					
				case 9:
					left = 5 * keyDistance;
				case 10:
					left = 5.7 * keyDistance;					
				case 11:
					left = 6 * keyDistance;
			}
			
			var markColor:String = null;
			
			//var activeKeyNumbers = this.appState.keysActive.map(function(n) return n - (this.octave * 12));
			
			var octKeyNumber = keyNumber + octave * 12;
			if (this.appState.keysActive != null && this.appState.keysActive.exists(octKeyNumber)) {
				keyColor = '';
				markColor = 'background-color:' + this.appState.keysActive.get(octKeyNumber);				
			}
			
			var st = ' position: absolute; left: ${left}px; width:${widht}px; height:${height}px;top:0;$markColor;';
			
			var shift = octave * 12;
			
			var keyExclude = (this.excludeKeyNumbers.has(keyNumber)) ? '.key-exclude': '';			
				keys.push(m('div.key${keyType}${keyExclude}', { style: st, 
				onmousedown:function(e) { this.onMouseDown(keyNumber+shift); },
				onmouseup:function(e) { this.onMouseUp(keyNumber+shift); },
				onmouseover:function(e) { this.onMouseOver(keyNumber+shift); },
				onmouseout:function(e) { this.onMouseOut(keyNumber+shift); },
				
			},  
				(this.labels != null && this.labels.exists(keyNumber)) ?   [m('div.key-label', { style: { minWidth:'${keyDistance-3}px', minHeight:'${keyDistance-5}px' }}, this.labels.get(keyNumber)), ] : ''		
			 ));
			
		}		
		return keys;
	}
	
	public function view() {		
		return m('div.keyboard', { style: { position: 'relative', float:'left',  width:'${7 * this.keyDistance}px', height: '${this.keyHeight+7}px',  border:'0px solid red' }}, this.getOctave());
	}
	
}

class KeyboardRandom implements Mithril {
	var appState:AppState;
	
	public function new(appState:AppState) {
		this.appState = appState;
	}
	
	public function view() {		
		return [
			m('button', { onmousedown: function(e) {			
				var numKeys = cx.Random.int(1, 5);
				var keys = [];
				for (i in 0 ... numKeys) keys.push(cx.Random.int(this.appState.keyboard.lowestKey, this.appState.keyboard.highestKey));
				var keyColors = new IntMap<String>();
				for (k in keys) keyColors.set(k, cx.Random.fromArray(['red', 'yellow', 'green', 'blue']));
				this.appState.keysActive = keyColors;
				//this.appState.keysActive = [20=>'red', 22=>'yellow', 26=>'blue', 40=>'green'];
			}, onmouseup: function(e) {
				this.appState.keysActive = null;
			}}, 'Random keys'),
			m('button', { onmousedown: function(e) { this.appState.keyboard.lowestKey = cx.Random.int(20, 40); this.appState.keyboard.highestKey = cx.Random.int(50,70); }}, 'Random keyboard'),		
		];
	}
	
}