package ;

import audio.AnimationFrame.AnimationTimer;
import js.html.Navigator;
import audio.*;
import js.html.audio.*;
import js.html.Float32Array;
import js.html.MediaStream;
import audio.pitch.*;
import audio.AnimationFrame;


class App {
    var playbackAudioBuffer:AudioBuffer = null;
    var isPlaying:Bool = false;
    var playbackSourceNode:AudioBufferSourceNode;
    var oscillatorSourceNode: OscillatorNode;
    
    // var pitch:PitchA = new PitchA();
    var pitch:PitchB = new PitchB();

    var animation:IAnimationHandler;

    public function new() {        
        this.animation = new AnimationTimer(50);
        this.animation.addCallback(this.eachFrame);
        loadSoundFile('/sounds/whistling3.ogg');
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
        this.animation.stop();  
    }

    public function togglePlayback() {
        function startPlayback() {
            this.playbackSourceNode = Audio.instance.context.createBufferSource();
            this.playbackSourceNode.buffer = this.playbackAudioBuffer;
            this.playbackSourceNode.loop = true;            
            
            var a = this.pitch.setupAnalyserNode(this.playbackSourceNode)
            .connect(Audio.instance.context.destination)
            ;
            
            this.playbackSourceNode.start(0);
            isPlaying = true;
            this.animation.start();  
        }

        if (isPlaying) stopAnyting() else startPlayback();
    }

    public function toggleOscillator() {
        function startOscillator() {
            this.oscillatorSourceNode = Audio.instance.context.createOscillator();            
            
            this.pitch.setupAnalyserNode(this.oscillatorSourceNode)
            .connect( Audio.instance.context.destination)
            ;
            
            this.oscillatorSourceNode.start(0);
            isPlaying = true;
            this.animation.start();       
        }
        
        if (isPlaying) stopAnyting() else startOscillator();
    }

    public function toggleLiveInput() {
        function startLiveInput() {
            function gotStreamA(stream:MediaStream) {
                var mediaStreamSource = Audio.instance.context.createMediaStreamSource(stream);                
                var a = this.pitch.setupAnalyserNode(mediaStreamSource)
                //.connect( Audio.instance.context.destination) // Do not connect to avoid sound output from mikrophone!
                ;
                this.animation.start();  
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


    function getUserMedia(dictionary, callback) {
        var promise:js.Promise<js.html.MediaStream> = untyped navigator.mediaDevices.getUserMedia(dictionary);
        promise
        .then(stream->callback(stream))
        .catchError(e->trace(e.name + ' ' + e.message));    
    }

    // function eachFrame() {        
    //     var hz = this.pitch.getHerz();
    //     js.Browser.document.getElementById("pitch").innerText = Std.string(hz);        
    //     trace(hz);
    // }



    var minUpdateDelay = 75;
    var pitchHistory:Array<Float> = [];
    var nPitchValues = 5; // Number of pitches for pitch averaging logic
    var allowedHzDifference = 5;

    var timeout = null;
    function eachFrame() {        
        var hz = this.pitch.getHerz();
        var smoothHz = PitchSmoother.instance.getSmoothHz(hz);
        js.Browser.document.getElementById("pitch").innerText = Math.round(hz) + ' ' + Math.round(smoothHz);        
        trace(Math.round(hz) + ' ' + Math.round(smoothHz));        
    }

}

