package audio.pitch;

class PitchSmoother {
    public function new() {
        this.pitchHistory = [];
        this.nPitchValues = 5;
        this.allowedHzDifference = 5;
    }
    
    public static var instance(default, null): PitchSmoother = new PitchSmoother();

    var pitchHistory:Array<Float>;
    var nPitchValues:Float; // Number of pitches for pitch averaging logic
    var allowedHzDifference:Float;
    var timeout = null;
    public function getSmoothHz(hz:Float):Float {

        if (hz > 0) {            
            if (this.pitchHistory.length >= nPitchValues) this.pitchHistory.shift();
            
            // Octave jumping fix: if current pitch is around twice the previous detected pitch, halve its value
            if (this.pitchHistory.length > 0 && Math.abs((hz/2.0)-this.pitchHistory[pitchHistory.length-1]) < allowedHzDifference) hz = hz/2.0;

            var roundHz = Math.round(hz*10)/10;
            this.pitchHistory.push(roundHz);

            // Take the pitch history median as the current pitch            
            var sortedPitchHistory = this.pitchHistory.copy();
            sortedPitchHistory.sort((a,b)->Std.int(a-b));            
            var smoothHz = sortedPitchHistory[Math.floor((sortedPitchHistory.length-1)/2)];
            // trace(Math.round(hz) + ' ' + Math.round(smoothHz));
            return smoothHz;
        } else {
            if (pitchHistory.length > 0 && this.timeout == null) {
            // if (this.timeout == null) {
                this.timeout = js.Browser.window.setTimeout(function() {
                    trace('clear pitchHistory');
                    this.pitchHistory = [];
                    this.timeout = null;
                }, 200);
            }
        }
            
        return hz;    
    }

}
