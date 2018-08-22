import mithril.M;
using cx.ArrayTools;

class Testkeyboard implements Mithril {
    
    static public function main() {
        new Testkeyboard();            
    }
    
    public function new() {
        trace('hello');
        var a = ArrayTools;
        $type(a);

    }
    public function view() {
        return [
            
        ];
    }
}