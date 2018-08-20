package audio.scorx;

import audio.Audio;
import js.html.ArrayBuffer;
import js.html.audio.AudioBuffer;
import js.html.audio.AudioContext;
import js.html.audio.AnalyserNode;
import js.html.audio.GainNode;
import js.html.XMLHttpRequestResponseType;
import js.html.audio.AudioBufferSourceNode;
import js.html.XMLHttpRequest;

class Mixer implements IPlayback {
    public function new(channels:Array<Channel>) {
        this.channels = channels;
        this.trackVolumeNodes = [];
		this.sampleNodes = [];
		this.masterVolumeNode = Audio.instance.context.createGain();
		this.analyserNode = Audio.instance.context.createAnalyser();        
    }
    public var channels:Array<Channel> = [];
	var sampleNodes: Array<AudioBufferSourceNode>;
	var trackVolumeNodes:Array<GainNode>;
	var masterVolumeNode:GainNode;
	public var analyserNode:AnalyserNode;
	var volume:Float;    
	public var elapsedTimeSinceStart:Float;

	public function play(startTime:Float=0):Void
	{				
		this.buildGraph();				
		this.elapsedTimeSinceStart = startTime;
        this.sampleNodes.map(s->s.start(0, startTime));
	}

	public function stop() 
	{
        this.sampleNodes.map(s->{
            s.stop(0);
            s = null;
        });
	}

	function buildGraph() 
	{        
		var sources = new Array<AudioBufferSourceNode>();
        trace(channels.length);
		for (i in 0...this.channels.length)
		{
			var sample = this.channels[i].buffer;
			sources[i] = Audio.instance.context.createBufferSource();
			sources[i].buffer = sample;
			this.trackVolumeNodes[i] = Audio.instance.context.createGain();
            this.trackVolumeNodes[i].gain.value = this.channels[i].volume;
			sources[i].connect(this.trackVolumeNodes[i], 0, 0);
            this.trackVolumeNodes[i].connect(this.masterVolumeNode, 0, 0);
			this.masterVolumeNode.connect(this.analyserNode, 0, 0);
			this.analyserNode.connect(Audio.instance.context.destination, 0, 0);
		}
		this.sampleNodes = sources;
	}

	public function getDuration() {		
		if (this.channels[0] != null) {
			return this.channels[0].buffer.duration;
		}
		return 0;		
	}

	public function setVolumeOfChannel(idx:Int, volume:Float) {
		if (this.trackVolumeNodes == null || this.trackVolumeNodes == []) return;
		if (this.trackVolumeNodes[idx] == null) return;
		this.trackVolumeNodes[idx].gain.value = volume;		
		this.channels[idx].volume = volume;		
	}
	
	public function setMasterVolume(volume:Float) 
	{
		this.volume = volume;
		this.masterVolumeNode.gain.value = volume;
	}

	public function getPosition():Float {
		return 0;
	}
}

class Channel {
	public var name:String;
	public var buffer:AudioBuffer;
	public var peaks:Float;
	public var volume:Float;
	public var panning:Float;
	public var sampleNode:Dynamic;
	public var volumeNode:Dynamic;
	
	public function new(name:String, buffer:AudioBuffer) {
		this.name = name;
		this.buffer = buffer;
		this.peaks = 0;
		this.volume = 1.0;
		this.panning = 0;
		this.sampleNode = null;
		this.volumeNode = null;
	}	
}

class Loader {
    static public function load(url:String):js.Promise<{url:String, buffer:AudioBuffer}> {        
        return new js.Promise<{url:String, buffer:AudioBuffer}>((res, rej)->{
            var request = new XMLHttpRequest();
            request.open('GET', url, true);
            request.responseType = XMLHttpRequestResponseType.ARRAYBUFFER;
            request.onload = function (_) {        
                Audio.instance.context.decodeAudioData(
                    request.response,
                    function(buffer) {
                        trace('Loaded and decoded track $url');                        
                        if (buffer == null) rej('error decoding file data: ' + url);
                        res({url:url, buffer:buffer});
                    },
                    function() {
                        rej('decodeAudioData error ');		
                    }
                );
            }
            request.send();
        });
    }
}
