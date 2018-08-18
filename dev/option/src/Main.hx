import mithril.M;

class Main {
    static function main() new Main();
    public function new() {

        M.mount(js.Browser.document.body, new Index());
    }
}


class Index implements Mithril {
    public function new() {}
    public function view() {

        var values = [['aaa','Alternativ A'],['bbb','Alternativ B'],['ccc','Alternativ C'],];

        return [
           m('h1', 'Hello from Mithril' ),           

            //var values = [['aaa','Alternativ A'],['bbb','Alternativ B'],['ccc','Alternativ C'],];
            m('select', {onchange:e->trace(e.target.selectedIndex)}, values.map(v->{
                trace(v);
                m('option', {value:v[0], key:v[0]}, v[1]);
            })),
            
        ];
    }
}