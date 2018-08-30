package client2;

import mithril.M;

class Footer {
	private function new() {}

	public static var instance(default, null):Footer = new Footer();

	public function init() {
		M.mount(js.Browser.document.querySelector('#buttons'), new FooterView());
	}
}

class FooterView implements Mithril {
	public function new() {}

	public function view() {
		return [
			m('button', {
				onclick: e -> SidewaysManager.instance.pageIdx = 0
			}, 'Home'),
			m('button', {
				onclick: e -> SidewaysManager.instance.pageIdx = 1
			}, 'Shelves'),
			m('button', {
				onclick: e -> SidewaysManager.instance.pageIdx = 2
			}, 'Book'),
			m('button', {
				onclick: e -> SidewaysManager.instance.pageIdx = 3
			}, 'Search'),

		];
	}
}
