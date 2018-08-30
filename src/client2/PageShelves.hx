package client2;

import mithril.M;

class PageShelves {
	private function new() {}

	public static var instance(default, null):PageShelves = new PageShelves();

	public function init() {
		M.mount(js.Browser.document.querySelector('#page-shelves'), new ShelvesView());
	}
}

class ShelvesView implements Mithril {
	public function new() {}

	public function view() {
		var shelves = FilterManager.instance.getShelves().map(shelf -> {
			var books = shelf.books.map(book -> {
				var selected = book == FilterManager.instance.getBook() ? '.selected' : '';
				m('nav$selected', m('a', {href: '/content' + book.path, oncreate: M.routeLink}, [m('img', {src: '/assets/books/${book.id}.jpg'}), m('div', book
					.title),]));
			});

			m('section', [m('header', m('h1', shelf.title)), books,]);
		});

		var view = try {
			m('div.shelves', [
				m('section', m('header', [
					m('a.btn', {href: '/content' + FilterManager.instance.getRoom().path, oncreate: M.routeLink}, '<<'),
					m('a.btn', {href: '/content' + FilterManager.instance.getRoom().path + '/shelves', oncreate: M.routeLink}, 'Visa alla'),
				])),
				shelves,
			]);
		} catch (e:Dynamic) {
			m('div', 'error ' + e);
		}

		return view;
	}
}
