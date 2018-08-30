package client2;

import mithril.M;
import data.Content;
import haxe.DynamicAccess;

using cx.ArrayTools;

class PageHome {
	private function new() {}

	public static var instance(default, null):PageHome = new PageHome();

	public function init() {
		M.mount(js.Browser.document.querySelector('#page-home'), new HomvView());
	}
}

class HomvView implements Mithril {
	public function new() {}

	public function shelvesView()
		return try {
			[
				m('div.vsection.light', m('div.center.homeshelves', [
					m('header', m('h1', 'Innehåll')),
					FilterManager.instance.getRoom().shelves.map(shelf -> {
						var selected = shelf == FilterManager.instance.getShelf() ? '.selected' : '';
						m('nav.homeshelfitem$selected', m('a', {href: '/content' + shelf.path, oncreate: M.routeLink}, [
							m('img', {src: '/assets/shelves/${shelf.id}.jpg'}),
							m('div.homeshelfitemtext', [m('h2', shelf.title), m('p', shelf.info),]),
						]));
					}),
				])),
			];
		} catch (e:Dynamic) {
			m('h3.error', '404 - can not show other shelves for room  ' + FilterManager.instance.filterContent);
		}

	public function cellsView(s:SectionCells)
		return try {
			var header = s.title > '' ? m('header', m('h1', s.title)) : null;
			var dense = {gridAutoFlow: 'dense'};
			m('div.vsection.dark', m('div.center.homecells', [
				header,
				s.cells.sortA((a, b) -> a.sort - b.sort).map(c -> {
					return switch Type.getClass(c) {
						case VideoCell:
							var c:VideoCell = cast c;
							var styles = new DynamicAccess<String>();
							if (c.gridColumn > '') styles.set('gridColumn', c.gridColumn);
							if (c.gridRow > '') styles.set('gridRow', c.gridRow);
							m('article.homecell', {style: styles}, m('video', {
								src: c.video,
								controls: true,
								style: {width: '100%', height: '100%', backgroundColor: 'black'}
							}));
						case _:
							var c:TextCell = cast c;
							var styles = new DynamicAccess<String>();
							var aTag = c.url > '' ? 'a' : 'div';
							var aHref = c.url > '' ? {href: c.url, oncreate: M.routeLink} : null;
							var image = c.image > '' ? m('img', {src: c.image}) : null;
							if (c.color > '') styles.set('color', c.color);
							if (c.bgcolor > '') styles.set('backgroundColor', c.bgcolor);
							if (c.bgimage > '') styles.set('backgroundImage', 'url("' + c.bgimage + '")');
							if (c.gridColumn > '') styles.set('gridColumn', c.gridColumn);
							if (c.gridRow > '') styles.set('gridRow', c.gridRow);
							m('article.homecell', {style: styles}, m(aTag, aHref, [image, markdown.MithrilTools.markdownToView(c.text),]));
					}
				}),
			]));
		} catch (e:Dynamic) {
			trace('error: ' + e);
			m('div.error', 'Error:' + e);
		}

	public function homeView()
		return try {
			var home:Home = FilterManager.instance.getRoom().home;
			if (home == null)
				return shelvesView();
			cast [
				home.sections.sortA((a, b) -> a.sort - b.sort).map(s -> {
					switch Type.getClass(s) {
						case SectionShelves:
							shelvesView();
						case SectionCells:
							cellsView(cast s);
						case _:
							m('div', 'unknown shelf');
					}
				}),
			];
		} catch (e:Dynamic) {
			return m('section', m('div', 'Homeview error: $e'));
		}

	public function view() {
		[homeView(),];
	}
}
