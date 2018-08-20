package ui;

import mithril.M;
import data.Content;

class PitchChapter implements Mithril {
    public function new(c:PitchChaptertype) {
        this.c = c;
    }
    var c:PitchChaptertype;

    public function view() {        
        return [
            m('div.specialchapter.pitch', m('h1', 'Pitch')),            
        ];
    }
}