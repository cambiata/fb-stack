package audio.pitch;

import js.html.Float32Array;
import audio.*;
import js.html.Uint8Array;
import js.html.audio.*;


class PitchB implements IPitchDetector {

    public function new(useFilters:Bool = true) { 
        this.useFilters = useFilters;
        this.sampleRate = Audio.instance.context.sampleRate;
        this.inputBuffer = new Uint8Array(fftSize);
    }
    var useFilters:Bool;
    var sampleRate:Float;

    var volumeThreshold = 134; // Amplitude threshold for detecting sound/silence [0-255], 128 = silence
    var analyserNode:AnalyserNode = null;
    
    var fftSize = 2048;
    public function setupAnalyserNode(source:Dynamic):AnalyserNode {
        var audioContext:AudioContext = Audio.instance.context;
        this.analyserNode = audioContext.createAnalyser();
        this.analyserNode.fftSize = fftSize;
        if (this.useFilters) {
            var lowestFreq = 30; // Minimum tune = 44100/1024 = 43.07Hz
            var highestFreq = 4200; // Maximum tune C8 (4186.02 Hz)

            this.analyserNode.smoothingTimeConstant = 0.8;
            var gainNode = audioContext.createGain();
            gainNode.gain.value = 1.5; // Set mic volume to 150% by default
            var lowPassFilter1 = audioContext.createBiquadFilter();
            var lowPassFilter2 = audioContext.createBiquadFilter();
            var highPassFilter1 = audioContext.createBiquadFilter();
            var highPassFilter2 = audioContext.createBiquadFilter();
            lowPassFilter1.Q.value = 0;
            lowPassFilter1.frequency.value = highestFreq;
            lowPassFilter1.type = BiquadFilterType.LOWPASS; //"lowpass";
            lowPassFilter2.Q.value = 0;
            lowPassFilter2.frequency.value = highestFreq;
            lowPassFilter2.type = BiquadFilterType.LOWPASS;
            highPassFilter1.Q.value = 0;
            highPassFilter1.frequency.value = lowestFreq;
            highPassFilter1.type = BiquadFilterType.HIGHPASS;
            highPassFilter2.Q.value = 0;
            highPassFilter2.frequency.value = lowestFreq;
            highPassFilter2.type = BiquadFilterType.HIGHPASS;
            
            source.connect(lowPassFilter1);
            lowPassFilter1.connect(lowPassFilter2);
            lowPassFilter2.connect(highPassFilter1);
            highPassFilter1.connect(highPassFilter2);
            highPassFilter2.connect(gainNode);
            gainNode.connect(analyserNode);
        } else {
            source.connect(analyserNode);
        }
        return this.analyserNode;
    }

    public function getHerz():Float {
        if (this.analyserNode == null) return -2;
        return analyse();        
    }

    var maxVolume = 128;
    var volumeCheck = false;
    var inputBuffer:Uint8Array;

    function analyse():Float {
        // var pitchInHz = 0.0;
        this.analyserNode.getByteTimeDomainData(inputBuffer);
        var bufferMax = 0.0;

        for (i in 0...inputBuffer.length) {
            bufferMax  = Math.max(bufferMax, inputBuffer[i]);		
        }

        // find volume...        
        var bufLenDiv4:Int = Std.int(inputBuffer.length / 4);
        for (i in 0...bufLenDiv4) {        
            if (maxVolume < inputBuffer[i]) maxVolume = inputBuffer[i];
            if (!volumeCheck && inputBuffer[i] > this.volumeThreshold) {
                volumeCheck = true;
            }
        }
        
        if (volumeCheck) {
            return this.Yin_pitchEstimation(inputBuffer, this.sampleRate);
        }
        return -1;

        // Pitch smoothing logic
        // var minUpdateDelay = 75;
        // var silenceTimeout = null;
        // var pitchHistory = [];
        // var nPitchValues = 5; // Number of pitches for pitch averaging logic

        // var allowedHzDifference = 5;
        // if (pitchInHz != 0) {
        //     clearTimeout(this.silenceTimeout);
        //     this.silenceTimeout = null;
        //     if (this.pitchHistory.length >= nPitchValues) this.pitchHistory.shift();
            
        //     // Octave jumping fix: if current pitch is around twice the previous detected pitch, halve its value
        //     if (this.pitchHistory.length && Math.abs((pitchInHz/2.0)-this.pitchHistory[pitchHistory.length-1]) < allowedHzDifference) pitchInHz = pitchInHz/2.0;
        //     pitchInHz = Math.round(pitchInHz*10)/10;
        //     this.pitchHistory.push(pitchInHz);
        //     // Take the pitch history median as the current pitch
        //     var sortedPitchHistory = this.pitchHistory.slice(0).sort(function(a,b) {return a-b});
        //     pitchInHz = sortedPitchHistory[Math.floor((sortedPitchHistory.length-1)/2)];

        //     updateGui(pitchInHz, getClosestNoteIndex(pitchInHz), (maxVolume-128) / 128);

        //     if (pitchHistory.length < nPitchValues) {
        //         window.requestAnimationFrame(updatePitch);
        //     } else {
        //         setTimeout(function() {
        //             window.requestAnimationFrame(updatePitch);
        //         }, minUpdateDelay);
        //     }
        // } else {
        // 	if (this.silenceTimeout === null) {
        // 		this.silenceTimeout = setTimeout(function() {
        // 			pitchHistory = [];
        // 		}, 500);
        // 	}        	
        // }
    }

    function Yin_pitchEstimation(inputBuffer, sampleRate):Float {

        untyped __js__('
        var yinThreshold = 0.15; // allowed uncertainty (e.g 0.05 will return a pitch with ~95% probability)
        var yinProbability = 0.0; // READONLY: contains the certainty of the note found as a decimal (i.e 0.3 is 30%)

        var yinBuffer = new Float32Array(Math.floor(inputBuffer.length/2));
        yinBuffer[0] = 1;
        var runningSum = 0;
        var pitchInHz = 0.0;
        var foundTau = false;
        var minTauValue;
        var minTau = 0;

        for (var tau=1; tau<Math.floor(inputBuffer.length/2); tau++) {
            // Step 1: Calculates the squared difference of the signal with a shifted version of itself.
            yinBuffer[tau] = 0;
            for (var i=0; i<Math.floor(inputBuffer.length/2); i++) {
                yinBuffer[tau] += Math.pow(((inputBuffer[i]-128)/128)-((inputBuffer[i+tau]-128)/128),2);
            }
            // Step 2: Calculate the cumulative mean on the normalised difference calculated in step 1.
            runningSum += yinBuffer[tau];
            yinBuffer[tau] = yinBuffer[tau]*(tau/runningSum);

            // Step 3: Check if the current normalised cumulative mean is over the threshold.
            if (tau > 1) {
                if (foundTau) {
                    if (yinBuffer[tau] < minTauValue) {
                        minTauValue = yinBuffer[tau];
                        minTau = tau;
                    }
                    else break;
                }
                else if (yinBuffer[tau] < yinThreshold) {
                    foundTau = true;
                    minTau = tau;
                    minTauValue = yinBuffer[tau];
                }
            }
        }

        if (minTau == 0) {
            yinProbability = 0;
            pitchInHz = 0.0;
        } else {
            // Step 4: Interpolate the shift value (tau) to improve the pitch estimate.
            minTau += (yinBuffer[minTau+1]-yinBuffer[minTau-1])/(2*((2*yinBuffer[minTau])-yinBuffer[minTau-1]-yinBuffer[minTau+1]));
            pitchInHz = sampleRate/minTau;
            yinProbability = 1-minTauValue;
        }

        return pitchInHz;
        ');
        return 0;
    }


    




}