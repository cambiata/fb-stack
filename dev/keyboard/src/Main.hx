package;

import haxe.ds.IntMap;
import mithril.M;
import mithril.M.m;
import mithril.MithrilNodeRender;
import web.view.Keyboard;
import web.view.SingleNote;

using cx.ArrayTools;

/**
 * ...
 * @author Jonas Nyström
 */

 
 class Main
{	 
	 static public function main() 
	{
			var appState:AppState = { text:'Server', keysActive:null, keyboard:{lowestKey: 40, highestKey: 62}, keysHover:[], keysPressed:[] };
		// #if sys
		// 	var index = new Index(appState);
		// 	var html = new MithrilNodeRender().render(index.layout());
		// 	Sys.println(html); 
		// 	sys.io.File.saveContent('test.html', html);
		// #else 
			// var appState:AppState = haxe.Unserializer.run(untyped appstate);	
			appState.text = 'Client';
			var index = new Index(appState);			
			haxe.Timer.delay( function() {
				mithril.M.mount(js.Browser.document.body, index);
			}, 1000);			
		// #end
	}	
}

class Index implements Mithril  {
	public var appState:AppState;
	public function new(appState:AppState) {
		SingleNoteCache.createNotes(20, 80);
		#if js
		//var pitch = PitchRecognizer.getInstance();
		//pitch.onPitch = this.onPitch;
		#end
		
		this.appState = appState;	
	}	
	
	public function layout() [
		m('html', [
			m('meta', { charset: 'utf-8' } ),
			m('link', {href:'style.css', rel:'stylesheet'}),
			m('body', view()),
			m('script#appstate', M.trust('appstate="' + haxe.Serializer.run(this.appState) + '"')),
			m('script', { src:'mithril.min.js'}),
			m('script', { src:'client.js' } ),
		]),
	 ];
	 
	public function view() [
		m('div', ''+ this.appState),
		cast new KeyboardRandom(this.appState).view(),
		m('button', { onclick:function(e) {
			#if js
			var pitch = audio.waa.PitchRecognizer.getInstance();
			pitch.onPitch = this.onPitch;
			#end
		}}, 'Pitch recognition'),
		m('hr'),
		m('div', {style:'float:left; overflow:auto;'}, [		
			cast new Keyboard(this.appState).view(),
		]),		
		m('div', {style:'float:left; overflow:auto;padding:8px;'}, [		
			cast new SingleNote(this.appState).view(),
		]),
		
		
	];
	
	public function onPitch(currentFreq:Float, closestIndex:Int, maxVolume:Float) {
		trace(closestIndex);
		var midinote = closestIndex + 10;
		this.appState.keysHover = [midinote];
		this.appState.keysActive = [midinote => 'lime'];
		M.redraw();
	}
}



