package ui;

import mithril.M;
import data.Content;

class RosettaChapter implements Mithril {
    public function new(t:RosettaChaptertype) {
        this.cht = t;
    }
    var cht: RosettaChaptertype;

    public function view() {
        return [
            m('div.specialchapter.rosetta', m('h1', 'Rosetta ' + cht)),
        ];
    }
}