
import mithril.M;
import mithril.M.m;

import data.ClassMap;

class Main {
    static function main() new Main();
    public function new() {    
        ClassMap.instance.setClass('test', Test);

        haxe.Timer.delay(()->{
            Bundle.load(BundlePage)
            .then(_->{
                ClassMap.instance.setClass('test', BundlePage);
                M.redraw();
            });
        }, 2000);
        M.mount(js.Browser.document.body, new Index());
    }
}


class Index implements Mithril {
    
    static public var fview:Void->Dynamic = function() {
        return m('div', 'fview');
    }

    public function new() {
    }

    public function view()  {                
        [
            m('h1', 'Index'),
            ClassMap.instance.getNew('test').view(),
        ];
    }        
}

class Test implements Mithril {
    public function new() {}
    public function view() {
        m('h1', 'Test');
    }
}

class ClassRepository {
    private function new() {}

    public static var instance(default, null): ClassRepository = new ClassRepository();    
    
    
    var classes:haxe.ds.StringMap<Class<Dynamic>> = new haxe.ds.StringMap();
    public function getNew(cls:String, args:Array<Dynamic>=null) return Type.createInstance(this.classes.get(cls), args);
    public function setClass(name:String, cls:Class<Dynamic>) this.classes.set(name, cls);
}