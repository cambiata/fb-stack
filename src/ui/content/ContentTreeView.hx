package ui.content;

import utils.*;
import mithril.M.Mithril;
import mithril.M;
import mithril.M.m;
import data.Content;

using StringTools;
using data.ContentModel;
using cx.ArrayTools;

// typedef ContentTreeFilter = {
//     filterRooms:Array<String>,
//     filterAccess:Int,
// }
class ContentTreeView implements Mithril {
	public function new(content:Content) {
		// this.filter = filter;
		this.content = content;
	}

	var content:Content;

	// var filter:ContentFilter;
	public function view() {
		var path = this.content.id;
		return m('details[open]', [m('summary', 'Content ' + this.content.id)].concat(this.content.rooms.map(child -> cast new UIRoom(child).view())));
	}
}

class UIRoom implements Mithril {
	public function new(item:Room) {
		this.item = item;
	}

	var item:Room = null;

	public function view() {
		var children = (this.item.shelves != null) ? this.item.shelves : [];
		var anchor = m('a', {href: '/content' + this.item.path, oncreate: M.routeLink}, 'Room:' + this.item.title + ':' + this.item.path);
		return m('details[open]', [m('summary', [anchor])].concat(children.map(child -> cast new UIShelf(child).view())));
	}
}

class UIShelf implements Mithril {
	public function new(item:Shelf) {
		this.item = item;
	}

	var item:Shelf;

	public function view() {
		var books = (this.item.books != null) ? this.item.books : [];
		var css = 'access' + item.access;
		var anchor = m('a', {href: '/content' + this.item.path, oncreate: M.routeLink}, 'Shelf:' + this.item.title + ':' + this.item.path);
		return m('details[openx].$css', [m('summary', [anchor])].concat(books.map(child -> cast new UIBook(child).view())));
	}
}

class UIBook implements Mithril {
	public function new(item:Book) {
		this.item = item;
	}

	var item:Book = null;

	public function view() {
		var chapters = (this.item.chapters != null) ? this.item.chapters : [];
		var css = 'access' + item.access;
		var anchor = m('a', {href: '/content' + this.item.path, oncreate: M.routeLink}, 'Book:' + this.item.title + ':' + this.item.path);
		return m('details[openx].$css', [m('summary', [anchor])].concat(chapters.map(child -> cast new UIChapter(child).view())));
	}
}

class UIChapter implements Mithril {
	public function new(item:Chapter) {
		this.item = item;
	}

	var item:Chapter = null;

	public function view() {
		var chapters = (this.item.subchapters != null) ? this.item.subchapters : [];
		var css = 'access' + item.access;
		var anchor = m('a', {href: '/content' + this.item.path, oncreate: M.routeLink}, 'Chapter:' + this.item.title + ':' + this.item.path + ' ' + this.item
			.type);
		return m('details[openx].$css', [m('summary', [anchor])].concat(chapters.map(child -> cast new UISubchapter(child).view())));
	}
}

class UISubchapter implements Mithril {
	public function new(item:Chapter) {
		this.item = item;
	}

	var item:Chapter = null;

	public function view() {
		var chapters = (this.item.subchapters != null) ? this.item.subchapters : [];
		var css = 'access' + item.access;
		var anchor = m('a', {href: '/content' + this.item.path, oncreate: M.routeLink}, 'Subhapter:' + this.item.title + ':' + this.item.path + ' ' + this.item
			.type);
		return m('details[open].$css', [m('summary', [anchor])].concat(chapters.map(child -> cast new UIChapter(child).view())));
	}
}
