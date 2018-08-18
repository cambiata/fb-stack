// import mithril.M;

using dataclass.TypedJsonConverter;

class Main {
    static function main() new Main();
    public function new() {        
        // var b:Book = new Book({chapters:[new ComplexChapter(), new SimpleChapter()]});
        // var json = b.toTypedJson();
        // trace(b.toTypedJson());

        // sys.io.File.saveContent('test.json', haxe.Json.stringify(json));
        // var json2 = haxe.Json.parse(sys.io.File.getContent('test.json'));
        // var b2:Book = Book.fromTypedJson(json2);
        // trace(b2.toTypedJson());

        
        var content = datax.ContentModel.instance.init();
        sys.io.File.saveContent('content.json', haxe.Json.stringify(content.toTypedJson()));

    }
}

interface IChapter extends DataClass
{
	public var info(default, set) : String;
}

class SimpleChapter implements IChapter
{
	public var info : String = 'simple info';
	public var text : String = 'simple';
}

class ComplexChapter implements IChapter
{
	public var info : String = 'complex info';
	public var markdown : String = 'markdown';
    public var number:Int = 123;
}

class Book implements DataClass {
	public var chapters : Array<IChapter> = [];
	public var name : String = 'This is a book';
}