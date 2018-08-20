package audio.scorx.ui;

import mithril.M;

class ChannelView implements Mithril {
    public function new(idx:Int, filename:String) {
        this.filename = filename;
        this.idx = idx;
    }

    var filename:String;
    var idx:Int;

    public function view() {
        var m = MixerModel.instance;
        return m('div.channelview', [
            m('span', this.idx + ':' + this.filename),
            m('input', {type:'range', min:0, max:100, value:m.volumes[this.idx]*100, onchange:e->{
                trace('change: ', e.target.value);
                MixerModel.instance.setVolumeOfChannel(this.idx, e.target.value/100);

            }}),
        ]);
    }
}

