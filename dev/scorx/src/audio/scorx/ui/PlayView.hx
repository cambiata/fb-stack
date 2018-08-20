package audio.scorx.ui;

import mithril.M;

class PlayView implements Mithril {
    
    public function new() {
        trace('new');

        //  js.Browser.window.setInterval(_->{            
        //     var dur = MixerModel.instance.getDuration();
        //     var pos = MixerModel.instance.getPosition();
        //     var el:js.html.Element = js.Browser.document.querySelector('#posNumber');
        //     if (el != null) {
        //         el.textContent = Std.string(pos).substr(0, 6) + '/' + dur + ' ' + this.positiondragging;
        //     }
        //     var el:js.html.InputElement = cast js.Browser.document.querySelector('#posSlider');
        //     if (el != null) {                
        //         this.sliderpos = (pos / dur)*100;
        //         el.value = '' + sliderpos;
        //     }
        // }, 50);       
    }

    var positiondragging:Bool = false;
    var sliderpos:Float = 0;
    
    function buttonsView() {
        return MixerModel.instance.ready() ? [
            m('button', {onclick: e->{
                trace('button clicked!');
                MixerModel.instance.play();
            }}, 'Start'),
            m('button', {onclick: e->{
                trace('button clicked!');
                MixerModel.instance.stop();
            }}, 'Stop'),

            // m('input#posSlider', {type:'range', min:0, max:100, onchange:e->{
            //     trace('change: ', e.target.value);
            //     // MixerModel.instance.setVolumeOfChannel(this.idx, e.target.value/100);
            // }, onmousedown: e->{
            //     this.positiondragging = true;
            //     trace('MOUSE DOWN ' + this.positiondragging);
            //     M.redraw();
                
            // }, onmouseup: e->{
            //     this.positiondragging = false;
            //     trace('MOUSE UP ' + this.positiondragging);
            //     M.redraw();            

            // }}),
            // m('span#posNumber', '---'),
            // m('div', 'Drag ' + this.positiondragging),

        ] :
        m('div', 'Mixer not ready...');
    }

    public function view() {
        return [
            buttonsView(),
        ];
    }
}