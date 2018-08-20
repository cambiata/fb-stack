package audio.scorx.ui;

import mithril.M;

class PlayerView implements Mithril {

    public function new() {
        
    }
    
    public function view() {
        var files = MixerModel.instance.files;
        return m('div.scorx', [            
            cast new PlayView().view(),
            cast files.map(f->new ChannelView(files.indexOf(f), f).view()),
        ]);
    }



}

