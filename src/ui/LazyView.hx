package ui;

import mithril.M;

class LazyView implements Mithril {
    public function new() {}
    public function view() {
        return [
            m('h1', 'Lazy View'),
        ];
    }
}