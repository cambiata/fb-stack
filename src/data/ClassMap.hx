package data;

class ClassMap {
    public function new() {
        this.map = new haxe.ds.StringMap();
    }

    public static var instance(default, null): ClassMap = new ClassMap();    

  
    var map:haxe.ds.StringMap<Class<Dynamic>>;

    public function getNew(cls:String, args:Array<Dynamic>=null) return Type.createInstance(this.map.get(cls), args);
    public function getNewWithFallback(cls:String, args:Array<Dynamic>=null, fallback:Class<Dynamic>) {
        if (this.map.exists(cls)) return Type.createInstance(this.map.get(cls), args);
        return Type.createInstance(fallback, args);
    }
    
    
    public function set(name:String, cls:Class<Dynamic>) this.map.set(name, cls);
    public function exists(name:String) return this.map.exists(name);
}