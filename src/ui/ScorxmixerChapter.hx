package ui;


import mithril.M;
import data.Content;

class ScorxmixerChapter implements Mithril {
    public function new(c:ScorxmixerChaptertype) {
        this.c = c;
    }
    var c:ScorxmixerChaptertype;

    public function view() {        
        return [
            m('div.specialchapter.pitch', m('h1', 'Pitch')),            
        ];
    }
}