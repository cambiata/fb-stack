package ui;

import mithril.M;

import data.ClassMap;

class ViewMapper {
    private function new() {
        this.map = new ClassMap();
        this.map.set('default', DefaultView);
    }

    public var map:ClassMap;
    public static var instance(default, null): ViewMapper = new ViewMapper();
    
    public function getNew(cls:String, args:Array<Dynamic>=null) {
        if (this.map.exists(cls)) return this.map.getNew(cls, args);
        return this.map.getNew('default', ['ViewMapper: can not find class alias "$cls"']);
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

