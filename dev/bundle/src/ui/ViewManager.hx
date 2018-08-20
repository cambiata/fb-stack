package ui;

import mithril.M;
import Foobar;

import data.ClassMap;

class ViewManager {
    private function new() {
        this.map = new ClassMap();
        this.map.setClass('default', DefaultView);
    }

    public var map:ClassMap<Dynamic>;
    public static var instance(default, null): ViewManager = new ViewManager();
    public function getNew(cls:String, args:Array<Dynamic>=null) {
        if (this.map.exists(cls)) return this.map.getNew(cls, args);
        trace('get new');
        haxe.Timer.delay(()->{
            
            var clazz = Type.resolveClass('Foobar');
            trace(clazz);
            // var instance = Type.createInstance(clazz, []);
    
            // Bundle.load(Type.resolveClass(cls))
            // .then(_->{
            //     ClassMap.instance.setClass(cls, clazz);
            //     M.redraw();
            // });
        }, 1000);


        return this.map.getNew('default', []);
    }
    public function setClass(name:String, cls:Class<Dynamic>) this.map.setClass(name, cls);



}


class DefaultView implements Mithril {
    public function new() {}
    public function view() {
        return [
            m('div', 'DefaultView'),
        ];
    }
}

class DefaultView2 implements Mithril {
    public function new() {}
    public function view() {
        return [
            m('div', 'DefaultView'),
        ];
    }
}