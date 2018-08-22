package audio.pitch;

import js.html.Float32Array;
import audio.*;
import js.html.audio.*;

class PitchA implements IPitchDetector {
    public function new() { 
        this.timeDomainBuffer = new Float32Array( 1024 );   
    }

    public var analyser:AnalyserNode = null;    
    var timeDomainBuffer:Float32Array; 

    public function setupAnalyserNode(source:Dynamic) {
        this.analyser = Audio.instance.context.createAnalyser();
        this.analyser.fftSize = 2048;         
        source.connect(this.analyser);
        return this.analyser;
    }


    public function getHerz():Float {
        if (this.analyser == null) return -2;
        this.analyser.getFloatTimeDomainData( this.timeDomainBuffer );
        var ac = this.autoCorrelate(this.timeDomainBuffer, Audio.instance.context.sampleRate);
        return ac;
    }

    public function autoCorrelate( buf:Float32Array, sampleRate:Float ):Float {                
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

}