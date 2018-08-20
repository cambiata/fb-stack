package test;

import mithril.M;

class TestPage implements Mithril {
    public function new() {}
    public function view() {
        return [
            m('h1', 'This is a testpage'),
        ];
    }
}
