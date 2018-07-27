package ui.content;

import mithril.M;

class ShelfView implements Mithril {
    public function new() { //(state:T) {
        // this.state = state;
    }
    // var state:T;
    
    public function view() {
        return m('div', [
            m('h1', 'Shelf'),

        ] );
    }
    
}