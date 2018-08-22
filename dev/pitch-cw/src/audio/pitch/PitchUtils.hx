package audio.pitch;

class PitchUtils {


    // static public function smoothing() {

       // Pitch smoothing logic
        var minUpdateDelay = 75;
        var silenceTimeout = null;
        var pitchHistory = [];
        var nPitchValues = 5; // Number of pitches for pitch averaging logic

        var allowedHzDifference = 5;
        if (pitchInHz != 0) {
            clearTimeout(this.silenceTimeout);
            this.silenceTimeout = null;
            if (this.pitchHistory.length >= nPitchValues) this.pitchHistory.shift();
            
            // Octave jumping fix: if current pitch is around twice the previous detected pitch, halve its value
            if (this.pitchHistory.length && Math.abs((pitchInHz/2.0)-this.pitchHistory[pitchHistory.length-1]) < allowedHzDifference) pitchInHz = pitchInHz/2.0;
            pitchInHz = Math.round(pitchInHz*10)/10;
            this.pitchHistory.push(pitchInHz);
            // Take the pitch history median as the current pitch
            var sortedPitchHistory = this.pitchHistory.slice(0).sort(function(a,b) {return a-b});
            pitchInHz = sortedPitchHistory[Math.floor((sortedPitchHistory.length-1)/2)];

            updateGui(pitchInHz, getClosestNoteIndex(pitchInHz), (maxVolume-128) / 128);

            if (pitchHistory.length < nPitchValues) {
                window.requestAnimationFrame(updatePitch);
            } else {
                setTimeout(function() {
                    window.requestAnimationFrame(updatePitch);
                }, minUpdateDelay);
            }
        } else {
        	if (this.silenceTimeout === null) {
        		this.silenceTimeout = setTimeout(function() {
        			pitchHistory = [];
        		}, 500);
        	}        	
        }


        
    // }


}