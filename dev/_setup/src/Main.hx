import mithril.M;

class Main {
	static function main()
		new Main();

	public function new() {
		data.FirebaseModel.instance.init();
		M.mount(js.Browser.document.body, new Index());
	}
}

class Index implements Mithril {
	public function new() {}

	public function view() {
		return [m('h1', 'Hello from Mithril'),];
	}
}
