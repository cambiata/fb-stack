package ui;


import mithril.M;

import data.ClassMap;

class Ykkas {
    private function new() {
        this.map = new ClassMap();
        this.map.set('default', DefaultView);
    }

    public var map:ClassMap;
    public static var instance(default, null): Ykkas = new Ykkas();
    
    
    public function getNew(cls:String, args:Array<Dynamic>=null) {
        if (this.map.exists(cls)) return this.map.getNew(cls, args);
        return this.map.getNew('default');
    }

    public function set(name:String, cls:Class<Dynamic>) this.map.set(name, cls);


}


class DefaultView implements Mithril {
    public function new(msg:String='message') {
        this.msg = msg;
    }
    var msg:String;
    public function view() {
        return [
            m('div', 'DefaultView: $msg'),
        ];
    }
}

class Test implements Mithril {
    public function new(msg:String='message') {
        this.msg = msg;
    }
    var msg:String;
    public function view() {
        return [
            m('div', 'Test: $msg'),
        ];
    }
}


