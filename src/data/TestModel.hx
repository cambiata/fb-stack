package data;

import mithril.M;

class TestModel {
	private function new() {
		this.init();
	}

	public static var instance(default, null):TestModel = new TestModel();

	public var counter = 0;

	public function init() {
		// js.Browser.window.setInterval(_ -> {
		// 	this.counter++;
		// 	M.redraw();
		// 	trace('TestModel redraw');
		// }, 1000);
	}
}
