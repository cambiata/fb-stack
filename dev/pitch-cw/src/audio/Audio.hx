package audio;


import js.html.audio.AudioContext;

class Audio {
    public static var instance(default, null): Audio = new Audio();
    private function new() {
        this.context = new AudioContext();        
    }
    public var context(default, null):AudioContext;

}

interface IPlayback {
    function play(startTime:Float=0):Void;
    function stop():Void;
    function getDuration():Float;
    function setVolumeOfChannel(idx:Int, volume:Float):Void;
    function setMasterVolume(volume:Float):Void;
    function getPosition():Float;
}