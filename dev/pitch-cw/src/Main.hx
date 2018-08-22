import mithril.M;

import App;



class Main implements Mithril {

    static function main() {
        M.mount(js.Browser.document.querySelector('main'), new Main());
    }
    public function new() {
        this.app = new App();
    }
    
    var app:App;

    public function view() {
        return [
           m('h1', 'Hello from Mithril' ),        
           m('button', {onclick: e->{
               trace('button1 clicked!');
               this.app.togglePlayback();
           }}, 'Btn1'),   
           m('button', {onclick: e->{
               trace('button2 clicked!');
               this.app.toggleLiveInput();
           }}, 'Btn2'),   
           m('button', {onclick: e->{
               trace('button3 clicked!');
               this.app.toggleOscillator();
           }}, 'Btn13'),   
        ];
    }    



}


