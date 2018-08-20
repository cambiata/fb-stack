package ui;

import mithril.M;
import data.Content;

class VideoChapter implements Mithril {
    public function new(c:VideoChaptertype) {
        this.c = c;
    }
    var c:VideoChaptertype;

    public function view() {        
        return [
            m('div.specialchapter.video', m('h1', 'Video')),
            m('video', {src:c.url, controls:true, style:{width:'100%', objectFit:'contain', backgroundColor:'black'}})
        ];
    }
}