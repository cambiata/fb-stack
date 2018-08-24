package ui;
import data.TestModel;
import audio.scorx.MixerModel;

import mithril.M;
import data.Content;

class ScorxmixerChapter implements Mithril {
    public function new(c:ScorxmixerChaptertype) {
        this.c = c;

        var files = [
            '/assets/mp3/test/100.mp3',
            '/assets/mp3/test/110.mp3',
            '/assets/mp3/test/120.mp3',
            '/assets/mp3/test/130.mp3',
            '/assets/mp3/test/200.mp3',
            ];
        MixerModel.instance.loadFiles('test', files);    
    }
    var c:ScorxmixerChaptertype;

    public function view() {        
        return [
            m('div.specialchapter.scorx ', m('h1', 'ScorX '  + TestModel.instance.counter)),            
            new audio.scorx.ui.PlayerView().view(),
        ];
    }
}