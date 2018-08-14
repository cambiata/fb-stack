package cx;
using cx.ArrayTools;

class Cache<T> {
    var cache: haxe.ds.StringMap<T>;
    var prio:Array<String>;
    var max:Int;    
    public function new(maxItems:Int=3) {
        this.cache = new haxe.ds.StringMap();
        this.prio = [];
        this.max = maxItems;
    }

    public function set(key:String, value:T) {
        this.cache.set(key, value);
        this.prio.push(key);
        // trace('Set1 $key:' + this.prio);        
        while (this.prio.length > this.max) {
            this.cache.remove(this.prio.shift());
        }
        // trace('Set2 $key:' + this.prio);
    }

    public function get(key:String):T {
        if (!this.cache.exists(key)) return null;
        // trace('Get1 $key:' + this.prio);    
        if (this.prio.last() != key) {
            // trace('reorder...');
            this.prio.remove(key);
            this.prio.push(key);
        }
        // trace('Get2 $key:' + this.prio);
        return this.cache.get(key);
    }
}

class CacheSingle<T> {
    var cache:T;
    var key:String;
    public function new() {
        this.cache = null;
        this.key = null;
    }

    public function set(key:String, value:T) {
        if (key != this.key) this.cache = value;
    }

    public function get(key:String):T {
        return (this.key == key) ? this.cache : null;        
    }
}