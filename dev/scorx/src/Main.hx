import mithril.M;

import audio.scorx.ui.PlayerView;
import audio.scorx.MixerModel;

class Main {
    static function main() new Main();
    public function new() {
        var files = [
            '/assets/mp3/test/100.mp3',
            '/assets/mp3/test/110.mp3',
            '/assets/mp3/test/120.mp3',
            '/assets/mp3/test/130.mp3',
            '/assets/mp3/test/200.mp3',
            ];
        MixerModel.instance.loadFiles(files);
        M.mount(js.Browser.document.body, new Index());
    }
}


class Index implements Mithril {
    public function new() {}
    public function view() {


        return [
           m('h1', 'Hello from Mithril' ),           
           cast new PlayerView().view(),
        ];
    }
}

