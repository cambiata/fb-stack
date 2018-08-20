import mithril.M;

class Main {
    static function main() new Main();
    public function new() {
        M.mount(js.Browser.document.querySelector('footer'), new Index());
    }
}

class Index implements Mithril {
    public function new() {}
    public function view() {
        return [
           m('h1', 'Hello from Mithril' ),           
            m('button', {onclick: e->{
                var el:js.html.Element = js.Browser.document.querySelector('scroller-main');
                el.style.gridTemplateColumns = '5em auto 10em';
            }}, 'ClickMe'),
        ];
    }
}