import mithril.M;

class Main {
    static function main() new Main();
    public function new() {
        M.mount(js.Browser.document.querySelector('main'), new Index());
    }
}


class Index implements Mithril {
    public function new() {}
    public function view() {
        return [
           m('h1', 'Hello from Mithril' ),           
           m('app-drawer', 'Hi'),
        ];
    }
}