package data;

class ClassMap {
    private function new() {}

    public static var instance(default, null): ClassMap = new ClassMap();    
    
    var classes:haxe.ds.StringMap<Class<Dynamic>> = new haxe.ds.StringMap();
    
    public function getNew(cls:String, args:Array<Dynamic>=null) return Type.createInstance(this.classes.get(cls), args);
    public function setClass(name:String, cls:Class<Dynamic>) this.classes.set(name, cls);
}