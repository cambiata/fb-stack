package data;

class Contentitem implements DataClass {
    public var    id:String; 
    public var    content:String = 'contentDefault';
}

class Contentitems implements DataClass {
    public var items:Array<Contentitem> = [];
}