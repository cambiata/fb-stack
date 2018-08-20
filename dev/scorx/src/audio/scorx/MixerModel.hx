package audio.scorx;

import audio.Audio;
import audio.scorx.Mixer;
import mithril.M;

using Lambda;

class MixerModel implements IPlayback  {
    private function new() {


    }

    var deltaTime:Float = 0;

    public static var instance(default, null): MixerModel = new MixerModel();
    public var mixer:Mixer;
    public var files:Array<String> = [];
    public var volumes:Array<Float> = [];
    public var masterVolume:Float;
    public var playing:Bool = false;
    public inline function ready() return this.mixer != null;

    public function loadFiles(files:Array<String>) {
        this.mixer = null;
        this.files = files;
        this.volumes = this.files.map(f->0.7);
        M.redraw();
        js.Promise.all(files.map(f->Loader.load(f)))
        .then(buffers->{                  
            return js.Promise.resolve(buffers.map(b->new Channel(b.url, b.buffer)));
        })
        .then(channels->{
            trace('all channels loaded!');
            this.mixer = new Mixer(channels);            
            M.redraw();
        });
    }

    public function play(startTime:Float=0) {
        this.deltaTime = Audio.instance.context.currentTime;
        trace('Delta:' + this.deltaTime);
        if (ready()) {
            // this.volumes.map(v)->this.mixer.setVolumeOfChannel(this.volumes.indexOf(v), v));
            // this.mixer.setMasterVolume(this.masterVolume);
            this.mixer.stop();
            this.mixer.play(startTime);
            this.playing = true;
        }
    }
    
    public function stop():Void {
        if (ready()) this.mixer.stop();
        this.playing = false;
    }
    
    public function getDuration():Float {
        return (ready()) ? this.mixer.getDuration() : 0;
    }
    
    public function setVolumeOfChannel(idx:Int, volume:Float):Void {
        this.volumes[idx] = volume;
        if (ready()) this.mixer.setVolumeOfChannel(idx, volume);
    }
    
    public function setMasterVolume(volume:Float):Void {
        this.masterVolume = volume;
        if ((ready())) this.mixer.setMasterVolume(volume);
    }

    public function getPosition():Float {
        var pos = Audio.instance.context.currentTime - this.deltaTime;
        return ready() && this.playing ? pos : 0;
    }


}
