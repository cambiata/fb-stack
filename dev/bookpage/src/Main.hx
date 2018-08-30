import ui.VideoChapter;
import markdown.MithrilRenderer;
import markdown.MithrilRendererCache;
import markdown.inlineRenderer.*;
import mithril.M;
import mithril.M.m;
import data.Content;
import data.FirebaseModel;

using data.ContentUtils;
using dataclass.TypedJsonConverter;

class Main {
	static function main()
		new Main();

	public function new() {
		FirebaseModel.instance.init();

		BookModel.instance.init();
		trace(BookModel.instance.book);

		M.mount(js.Browser.document.body, new Index());

		haxe.Timer.delay(() -> {
			ui.StringRendererMapper.instance.set('score', cast new ui.render.QSyntaxRenderer());
			markdown.MithrilRendererCache.instance.clearCache();
			trace('QSyntaxRenderer loaded');
			M.redraw();
		}, 3000);
	}

	static public function getVidewView() {
		return [
			m('div.specialchapter.video', m('h1', 'Video')),
			m('video', {
				config: function persist(el, isInit, context) {
					context.retain = true;
				},

				src: '/assets/video/tada.mp4',
				controls: true,
				style: {width: '100%', objectFit: 'contain', backgroundColor: 'black'}
			}),
		];
	}
}

class Index implements Mithril {
	public function new() {}

	public function view() {
		return [
			m('div.centered', [new BookPage2( /*BookModel.instance.book, null, null*/ ).view()]),
		];
	}
}

class BookPage2 implements Mithril {
	public function new() {
		this.syntaxRenderers = [new markdown.inlineRenderer.QInlineSyntaxRenderer()];
	}

	var syntaxRenderers:Array<InlineSyntaxRenderer>;

	public function view() {
		return [m('#bookpage', [this.header(), this.left(), this.bookContent(),]),];
	}

	function header() {
		return m('#bookheader', 'BookHeader');
	}

	function left() {
		return m('#bookleft', [
			m('#booktoc', BookModel.instance.book.chapters.map(ch -> {
				var selected = getSelectedChapter() == ch ? '.selected' : '';
				m('button.#booktocitem$selected', {
					onclick: e -> {
						BookModel.instance.chapter = ch;
						BookModel.instance.subchapter = null;
						M.redraw();
					}
				}, ch.title);
			})),
		]);
	}

	function bookContent() {
		return m('#bookcontent', [getChapterMarkup(), getSubchapterNav(), getSubchapterMarkup()]);
	}

	function getChapterMarkup() {
		var id = this.getSelectedChapter().id;
		var md = this.getSelectedChapter().text;
		return [
			m('details', {open: false}, [
				m('textarea', {
					value: md,
					oninput: e -> {
						markdown.MithrilRendererCache.instance.clearCacheKey(id);
						this.getSelectedChapter().text = e.target.value;
					},
					style: {
						width: '90%',
						height: '140px',
					}
				}),
			]),
			getChaptertype(this.getSelectedChapter()),
			markdown.MithrilRendererCache.instance.markdownToView(id, md, this.syntaxRenderers),
		];
	}

	function getSubchapterMarkup() {
		var id = this.getSelectedChapter().id + '/' + this.getSelectedSubchapter().id;
		var md = this.getSelectedSubchapter().text;
		return [
			m('details', {open: false}, [
				m('textarea', {
					value: md,
					oninput: e -> {
						markdown.MithrilRendererCache.instance.clearCacheKey(id);
						this.getSelectedSubchapter().text = e.target.value;
					},
					style: {
						width: '90%',
						height: '140px',
					}
				}),
			]),
			getChaptertype(this.getSelectedSubchapter()),
			markdown.MithrilRendererCache.instance.markdownToView(id, md, this.syntaxRenderers),
		];
	}

	function getChaptertype(chapter:Chapter) {
		var type:IChaptertype = chapter.type;
		return switch Type.getClass(type) {
			case VideoChaptertype: new VideoChapter(cast type).view(); // Main.getVidewView();
			case _: m('div#chaptertype', '' + chapter.type);
		}
	}

	function getSubchapterNav() {
		m('#chaptertoc', getSelectedChapter().subchapters.map(sub -> {
			var selected = getSelectedSubchapter() == sub ? '.selected' : '';
			m('button.#chaptertocitem$selected', {
				onclick: e -> {
					BookModel.instance.subchapter = sub;
				}
			}, sub.title);
		}));
	}

	function getSelectedChapter():Chapter {
		return try {
			if (BookModel.instance.chapter != null)
				return BookModel.instance.chapter;

			BookModel.instance.book.chapters[0];
		} catch (e:Dynamic) {
			trace('error: ' + e);
			null;
		}
	}

	function getSelectedSubchapter():Chapter {
		return try {
			if (BookModel.instance.subchapter != null)
				return BookModel.instance.subchapter;

			return getSelectedChapter().subchapters[0];
		} catch (e:Dynamic) {
			trace('error: ' + e);
			null;
		}
	}
}

class BookModel {
	private function new() {}

	public static var instance(default, null):BookModel = new BookModel();

	public var book(default, set):Book;
	public var chapter(default, set):Chapter;
	public var subchapter(default, set):Chapter;

	function set_book(book:Book):Book {
		this.book = book;
		M.redraw();
		return book;
	}

	function set_chapter(chapter:Chapter):Chapter {
		this.chapter = chapter;
		M.redraw();
		return chapter;
	}

	function set_subchapter(subchapter:Chapter):Chapter {
		this.subchapter = subchapter;
		M.redraw();
		return subchapter;
	}

	public function randomBook() {
		var book = ContentUtils.randomBooks(1)[0];
		this.book = book;
	}

	public function init() {
		this.randomBook();
	}
}
