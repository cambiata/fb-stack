package client2;

import mithril.M;

class PageSearch {
	private function new() {}

	public static var instance(default, null):PageSearch = new PageSearch();

	public function init() {
		M.mount(js.Browser.document.querySelector('#page-search'), new SearchView());
	}
}

class SearchView implements Mithril {
	public function new() {}

	public function view() {
		return [m('div', 'SearchView'), new UIFilters().view()];
	}
}

class UIFilters implements Mithril {
	public function new() {}

	public function view() {
		var f = FilterManager.instance.filterContent;
		var s:String = f != null ? '${f.roomId}/${f.shelfId}/${f.bookId}/${f.chapterId}/${f.subchapterId}' : 'null';
		var filterContentView = m('div', 'filter: $s');

		return m('.border', [
			filterContentView,
			m('span', '' + FilterManager.instance.getBook()),
			m('span', '' + FilterManager.instance.getChapter()),
			m('span', '' + FilterManager.instance.getSubchapter()),
		]);
	}
}
