package client2;

import mithril.M;

class PageContent {
	private function new() {}

	public static var instance(default, null):PageContent = new PageContent();

	public function init() {
		M.mount(js.Browser.document.querySelector('#page-content'), new ContentView());
	}
}

class ContentView implements Mithril {
	public function new() {}

	public function view() {
		return [cast new ui.content.ContentTreeView(ContentManager.instance.content).view(),];
	}
}
