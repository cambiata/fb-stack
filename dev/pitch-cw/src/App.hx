package ;

import js.html.Navigator;
import audio.*;
import js.html.audio.*;
import js.html.Float32Array;
import js.html.MediaStream;
import audio.pitch.*;


class App {

    var playbackAudioBuffer:AudioBuffer = null;
    var isPlaying:Bool = false;
    var playbackSourceNode:AudioBufferSourceNode;
    var oscillatorSourceNode: OscillatorNode;
    
    // var pitch:PitchA = new PitchA();
    var pitch:PitchB = new PitchB();

    var rafID = null;
    var timeDomainBuffer = new Float32Array( 1024 ); 

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
            this.playbackAudioBuffer = bufferAndUrl.buffer;
            togglePlayback();
        })
        .catchError(err->{
            trace(err);
        });  
    }

    function stopAnyting() {
        if (this.playbackSourceNode != null) {
            this.playbackSourceNode.stop(0);
            this.playbackSourceNode = null;
        }
        if (this.oscillatorSourceNode != null) {
            this.oscillatorSourceNode.stop(0);
            this.oscillatorSourceNode = null;
        }
        // this.pitch.analyser = null;

        isPlaying = false;            
        window.cancelAnimationFrame( rafID );        
    }

    public function togglePlayback() {
        function startPlayback() {
            this.playbackSourceNode = Audio.instance.context.createBufferSource();
            this.playbackSourceNode.buffer = this.playbackAudioBuffer;
            this.playbackSourceNode.loop = true;            
            
            var a = this.pitch.getAnalyser(this.playbackSourceNode)
            .connect(Audio.instance.context.destination)
            ;
            
            this.playbackSourceNode.start(0);
            isPlaying = true;
            this.updatePitch();
        }

        if (isPlaying) stopAnyting() else startPlayback();
    }

    public function toggleOscillator() {
        function startOscillator() {
            this.oscillatorSourceNode = Audio.instance.context.createOscillator();            
            
            this.pitch.getAnalyser(this.oscillatorSourceNode)
            .connect( Audio.instance.context.destination)
            ;
            
            this.oscillatorSourceNode.start(0);
            isPlaying = true;
            this.updatePitch();        
        }
        
        if (isPlaying) stopAnyting() else startOscillator();
    }

    public function toggleLiveInput() {
        function startLiveInput() {
            function gotStreamA(stream:MediaStream) {
                var mediaStreamSource = Audio.instance.context.createMediaStreamSource(stream);                
                var a = this.pitch.getAnalyser(mediaStreamSource)
                //.connect( Audio.instance.context.destination) // Do not connect to avoid sound output from mikrophone!
                ;
                this.updatePitch();   
                return null;             
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
            }, gotStreamA);
        }

        if (isPlaying) stopAnyting() else startLiveInput();        
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

    public function updatePitch( time:Float=null) {
        var hz = this.pitch.getHerz();
        pitchElem.innerText = Std.string(hz);        
        this.rafID = this.window.requestAnimationFrame(updatePitch);
    }    

    function getUserMedia(dictionary, callback) {
        var promise:js.Promise<js.html.MediaStream> = untyped navigator.mediaDevices.getUserMedia(dictionary);
        promise
        .then(stream->callback(stream))
        .catchError(e->trace(e.name + ' ' + e.message));    
    }
}


// class PitchA {
//     public function new() { 
//         this.timeDomainBuffer = new Float32Array( 1024 ); 
//         // this.analyser = Audio.instance.context.createAnalyser();
//         // this.analyser.fftSize = 2048;        
//     }

//     public var analyser:AnalyserNode = null;    
//     var timeDomainBuffer:Float32Array; 

//     public function getAnalyser(source:Dynamic) {
//         this.analyser = Audio.instance.context.createAnalyser();
//         this.analyser.fftSize = 2048;         
//         source.connect(this.analyser);
//         return this.analyser;
//     }


//     public function getPitch() {
//         this.analyser.getFloatTimeDomainData( this.timeDomainBuffer );
//         var ac = this.autoCorrelate(this.timeDomainBuffer, Audio.instance.context.sampleRate);
//         return ac;
//     }

//     public function autoCorrelate( buf:Float32Array, sampleRate:Float ):Float {        
//         var MIN_SAMPLES = 0;  
//         var GOOD_ENOUGH_CORRELATION = 0.9; 
//         var SIZE = buf.length;
//         var MAX_SAMPLES = Math.floor(SIZE/2);
//         var best_offset = -1;
//         var best_correlation:Float = 0;
//         var rms:Float = 0;
//         var foundGoodCorrelation = false;
//         var correlations = untyped __js__('new Array(MAX_SAMPLES);');
//         for (i in 0...SIZE) {
//             var val:Float = untyped buf[i];
//             rms += val*val;
//         }

//         rms = Math.sqrt(rms/SIZE);
//         if (rms<0.01) // not enough signal
//             return -1;

//         var lastCorrelation:Float=1;
//         for (offset in MIN_SAMPLES...MAX_SAMPLES) {
//             var correlation:Float = 0;

//             for (i in 0...MAX_SAMPLES) {
//                 correlation += Math.abs((untyped buf[i])-(untyped buf[i+offset]));
//             }
//             correlation = 1 - (correlation/MAX_SAMPLES);
//             correlations[offset] = correlation; // store it, for the tweaking we need to do below.
//             if ((correlation>GOOD_ENOUGH_CORRELATION) && (correlation > lastCorrelation)) {
//                 foundGoodCorrelation = true;
//                 if (correlation > best_correlation) {
//                     best_correlation = correlation;
//                     best_offset = offset;
//                 }
//             } else if (foundGoodCorrelation) {
//                 var shift = (correlations[best_offset+1] - correlations[best_offset-1])/correlations[best_offset];  
//                 return sampleRate/(best_offset+(8*shift));
//             }
//             lastCorrelation = correlation;
//         }
//         if (best_correlation > 0.01) {
//             return sampleRate/best_offset;
//         }
//         return -1;
//     }

// }