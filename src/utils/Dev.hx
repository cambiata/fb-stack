package utils;

import data.Content;
using dataclass.JsonConverter;

class Dev {
    static public function main() {
        trace('hello');

        var home:Home = new Home();
        trace(home.toJson());
        
        var section:DomItem = new DomItem();
        trace(section.toJson());
        var section:DomItem = DomItem.fromJson({tag:'section'});
        trace(section.toJson());

        var home:Home = Home.fromJson({children:[{tag:'section'}]});
        trace(home.toJson());

        trace(home.vnodes());



    }

	static public function vnode(tag : Dynamic, key, attrs0, children : Dynamic, text, dom) : Dynamic {
		return { 
			tag: tag, key: key, attrs: attrs0, children: children, text: text, 
			dom: dom, domSize: 0,
			state: {}, events: null, instance: null, skip: false			
		}
	}

}