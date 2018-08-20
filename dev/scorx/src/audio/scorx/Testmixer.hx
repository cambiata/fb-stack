package audio.scorx;

import audio.scorx.Mixer;

class Testmixer {

    static public function main() new Testmixer();
    
    public function new() {
        var filename = '/mp3/100.mp3';
        var files = [
            '/assets/mp3/test/100.mp3',
            '/assets/mp3/test/110.mp3',
            '/assets/mp3/test/120.mp3',
            '/assets/mp3/test/130.mp3',
            '/assets/mp3/test/200.mp3',
            ];
        js.Promise.all(files.map(f->Loader.load(f)))
        .then(buffers->{                  
            return js.Promise.resolve(buffers.map(b->new Channel(b.url, b.buffer)));
        })
        .then(channels->{
            var mixer:Mixer = new Mixer(channels);
            mixer.setMasterVolume(1);
            mixer.play(0);
            js.Browser.window.setInterval(()->{
                trace('time: ' + Audio.instance.context.currentTime);
            }, 100);
        });
    }
}