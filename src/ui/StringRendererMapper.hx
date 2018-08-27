package ui;

import ui.render.IStringRenderer;
import haxe.ds.StringMap;

class StringRendererMapper {
	private function new() {
		this.map = new StringMap();
		this.map.set('default', new DefaultRenderer());
	}

	public var map:StringMap<IStringRenderer>;

	public static var instance(default, null):StringRendererMapper = new StringRendererMapper();

	// public function getNew(cls:String, args:Array<Dynamic> = null) {
	// 	if (this.map.exists(cls))
	// 		return this.map.getNew(cls, args);
	// 	return this.map.getNew('default', ['ViewMapper: can not find class alias "$cls"']);
	// }
	public function set(name:String, renderer:IStringRenderer)
		this.map.set(name, renderer);

	public function get(name:String):IStringRenderer {
		if (this.map.exists(name))
			return this.map.get(name);
		return this.map.get('default');
	}
}

class DefaultRenderer implements IStringRenderer {
	public function new() {}

	public function renderFromCode(code:String)
		return 'DefaultRenderer:getString():$code';
}
