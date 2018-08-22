package ;

import js.html.Navigator;
import audio.*;
import js.html.audio.*;
import js.html.Float32Array;
import js.html.MediaStream;



class App {
    var theBuffer:AudioBuffer = null;
    var isPlaying:Bool = false;
    var sourceNode:Dynamic; //cx.OneOf<OscillatorNode, AudioBufferSourceNode> = null; // OscillatorNode, AudioBufferSourceNode
    var analyser:AnalyserNode = null;
    var mediaStreamSource:MediaStreamAudioSourceNode = null;
    var rafID = null;
    var isLiveInput:Bool = false;
    var buf = new Float32Array( 1024 ); 

    var window = null;
    var document = null;
    var detectorElem: js.html.Element;
	var canvasElem: js.html.CanvasElement;
	var waveCanvas: js.html.CanvasRenderingContext2D;
	var DEBUGCANVAS: js.html.CanvasElement;
	var pitchElem: js.html.Element;
	var noteElem: js.html.Element;
	var detuneElem: js.html.Element;
	var detuneAmount: js.html.Element;

    public function new() {
        this.document = js.Browser.document;
        this.window = js.Browser.window;        
        if (window.cancelAnimationFrame == null) trace ('cancelAnimationFrame error');

        setupUI();
        loadSoundFile('/sounds/whistling3.ogg');
    }

    function setupUI() {
        this.detectorElem = document.getElementById( "detector" );
        this.canvasElem = cast document.getElementById( "output" );
        this.DEBUGCANVAS = cast document.getElementById( "waveform" );
        if (DEBUGCANVAS != null) {
            this.waveCanvas = cast this.DEBUGCANVAS.getContext2d();
            this.waveCanvas.strokeStyle = "black";
            this.waveCanvas.lineWidth = 1;
        }
        this.pitchElem = document.getElementById( "pitch" );
        this.noteElem = document.getElementById( "note" );
        this.detuneElem = document.getElementById( "detune" );
        this.detuneAmount = document.getElementById( "detune_amt" );
    }

    function loadSoundFile(url:String) {
        AudioBufferLoader.load(url)
        .then(bufferAndUrl->{            
            trace('loaded');
            this.theBuffer = bufferAndUrl.buffer;
        })
        .catchError(err->{
            trace(err);
        });  
    }

    function getUserMedia(dictionary, callback) {
        var promise:js.Promise<js.html.MediaStream> = untyped navigator.mediaDevices.getUserMedia(dictionary);
        promise
        .then(stream->callback(stream))
        .catchError(e->trace(e.name + ' ' + e.message));    
    }

    function gotStream(stream:MediaStream) {
        this.mediaStreamSource = Audio.instance.context.createMediaStreamSource(stream);
        this.analyser = Audio.instance.context.createAnalyser();
        this.analyser.fftSize = 2048;
        this.mediaStreamSource.connect(analyser);
        updatePitch();
        return null;
    }

    public function togglePlayback() {
        if (isPlaying) {
            //stop playing and return
            sourceNode.stop( 0 );
            sourceNode = null;
            analyser = null;
            isPlaying = false;            
            window.cancelAnimationFrame( rafID );
            return;
        }

        sourceNode = Audio.instance.context.createBufferSource();

        sourceNode.buffer = theBuffer;
        sourceNode.loop = true;
        analyser = Audio.instance.context.createAnalyser();
        analyser.fftSize = 2048;
        sourceNode.connect( analyser );
        analyser.connect(Audio.instance.context.destination);
        sourceNode.start(0);
        isPlaying = true;
        isLiveInput = false;
        updatePitch();
    }

    public function toggleOscillator() {
        if (isPlaying) {
            //stop playing and return
            sourceNode.stop( 0 );
            sourceNode = null;
            analyser = null;
            isPlaying = false;
            window.cancelAnimationFrame( rafID );     
            return;       
        }

        sourceNode = Audio.instance.context.createOscillator();

        analyser = Audio.instance.context.createAnalyser();
        analyser.fftSize = 2048;
        sourceNode.connect( analyser );
        analyser.connect( Audio.instance.context.destination );
        sourceNode.start(0);
        isPlaying = true;
        isLiveInput = false;
        updatePitch();        
    }

    public function toggleLiveInput() {
        if (isPlaying) {
            sourceNode.stop( 0 );
            sourceNode = null;
            analyser = null;
            isPlaying = false;
            window.cancelAnimationFrame( rafID );
            return;
        }
        getUserMedia(
            {
                "audio": {
                    "mandatory": {
                        "googEchoCancellation": "false",
                        "googAutoGainControl": "false",
                        "googNoiseSuppression": "false",
                        "googHighpassFilter": "false"
                    },
                    "optional": []
                },
        }, gotStream);
    }

    public function updatePitch( time:Float=null) {
        analyser.getFloatTimeDomainData( this.buf );
        var ac = autoCorrelate(buf, Audio.instance.context.sampleRate);
        trace(ac);
        pitchElem.innerText = Std.string(ac);
        drawWaveform(buf);
        this.rafID = this.window.requestAnimationFrame(updatePitch);
    }    

    var MIN_SAMPLES = 0;  // will be initialized when AudioContext is created.
    var GOOD_ENOUGH_CORRELATION = 0.9; // this is the "bar" for how close a correlation needs to be

    function autoCorrelate( buf:Float32Array, sampleRate:Float ):Float {        
        var MIN_SAMPLES = 0;  
        var GOOD_ENOUGH_CORRELATION = 0.9; 
        var SIZE = buf.length;
        var MAX_SAMPLES = Math.floor(SIZE/2);
        var best_offset = -1;
        var best_correlation:Float = 0;
        var rms:Float = 0;
        var foundGoodCorrelation = false;
    
        var correlations = untyped __js__('new Array(MAX_SAMPLES);');

        for (i in 0...SIZE) {
            var val:Float = untyped buf[i];
            rms += val*val;
        }

        rms = Math.sqrt(rms/SIZE);
        if (rms<0.01) // not enough signal
            return -1;

        var lastCorrelation:Float=1;
        for (offset in MIN_SAMPLES...MAX_SAMPLES) {
            var correlation:Float = 0;

            for (i in 0...MAX_SAMPLES) {
                correlation += Math.abs((untyped buf[i])-(untyped buf[i+offset]));
            }
            correlation = 1 - (correlation/MAX_SAMPLES);
            correlations[offset] = correlation; // store it, for the tweaking we need to do below.
            if ((correlation>GOOD_ENOUGH_CORRELATION) && (correlation > lastCorrelation)) {
                foundGoodCorrelation = true;
                if (correlation > best_correlation) {
                    best_correlation = correlation;
                    best_offset = offset;
                }
            } else if (foundGoodCorrelation) {
                var shift = (correlations[best_offset+1] - correlations[best_offset-1])/correlations[best_offset];  
                return sampleRate/(best_offset+(8*shift));
            }
            lastCorrelation = correlation;
        }
        if (best_correlation > 0.01) {
            return sampleRate/best_offset;
        }
        return -1;
    }

    function drawWaveform(buf:Float32Array) {
        if (this.DEBUGCANVAS == null) return;
        waveCanvas.clearRect(0,0,512,256);
        waveCanvas.strokeStyle = "red";
        waveCanvas.beginPath();
        waveCanvas.moveTo(0,0);
        waveCanvas.lineTo(0,256);
        waveCanvas.moveTo(128,0);
        waveCanvas.lineTo(128,256);
        waveCanvas.moveTo(256,0);
        waveCanvas.lineTo(256,256);
        waveCanvas.moveTo(384,0);
        waveCanvas.lineTo(384,256);
        waveCanvas.moveTo(512,0);
        waveCanvas.lineTo(512,256);
        waveCanvas.stroke();
        waveCanvas.strokeStyle = "black";
        waveCanvas.beginPath();
        waveCanvas.moveTo(0,buf[0]);
        for (i in 1...512) {
            waveCanvas.lineTo(i,128+(buf[i]*128));
        }
        waveCanvas.stroke();
    }






}