import storage.StorageSource;
import js.html.VideoElement;
import js.Browser;
import mithril.M;
import data.Content;
import data.ContentUtils;

class Main {
	static function main()
		new Main();

	public function new() {
		data.FirebaseModel.instance.init();
		BookModel.instance.init();

		M.mount(js.Browser.document.querySelector('main'), new Index());
		M.mount(js.Browser.document.querySelector('#debug'), new Debug());
		haxe.Timer.delay(() -> {
			ui.StringRendererMapper.instance.set('score', cast new ui.render.QSyntaxRenderer());
			markdown.MithrilRendererCache.instance.clearCache();
			trace('QSyntaxRenderer loaded');
			M.redraw();
		}, 3000);
	}
}

class Model {
	private function new() {
		js.Browser.window.setInterval(_ -> {
			this.counter++;
			M.redraw();
		}, 1000);
	}

	public static var instance(default, null):Model = new Model();

	public var counter = 0;
}

class Index implements Mithril {
	public function new() {}

	public function view() {
		return [
			m('h1', 'Hello from Mithril ' + Model.instance.counter),
			m('button', {
				onclick: e -> {
					M.mount(js.Browser.document.querySelector('#bookheader'), new Test());
					M.mount(js.Browser.document.querySelector('#bookleft'), new BookTOC());
					M.mount(js.Browser.document.querySelector('#chaptercontent'), new ChapterContent());
					M.mount(js.Browser.document.querySelector('#subchaptercontent'), new SubchapterContent());
				}
			}, 'ClickMe'),

			m('button', {
				onclick: e -> {
					M.mount(js.Browser.document.querySelector('#bookheader'), new Test2());
				}
			}, 'ClickMe'),

		];
	}
}

class Test implements Mithril {
	public function new() {}

	public function view() {
		return [m('h3', 'Test ' + Model.instance.counter),];
	}
}

class Test2 implements Mithril {
	public function new() {}

	public function view() {
		return [m('h1', 'Test2 ' + Model.instance.counter),];
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
		this.chapter = null;
		this.subchapter = null;
		M.redraw();
		return book;
	}

	function set_chapter(chapter:Chapter):Chapter {
		this.chapter = chapter;
		this.subchapter = null;
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

	public function getBook():Book {
		return this.book;
	}

	public function getChapter():Chapter {
		if (this.chapter != null)
			return this.chapter;

		var chapter = this.getBook().chapters[0];

		return chapter;
	}

	public function getSubchapter():Chapter {
		if (this.subchapter != null)
			return this.subchapter;
		var subchapter = this.getChapter().subchapters[0];
		return subchapter;
	}
}

class BookTOC implements Mithril {
	public function new() {}

	public function view() {
		return m('#booktoc', BookModel.instance.getBook().chapters.map(ch -> {
			var selected = BookModel.instance.getChapter() == ch ? '.selected' : '';
			m('button.#booktocitem$selected', {
				onclick: e -> {
					trace('click');
					BookModel.instance.chapter = ch;

					M.redraw();
				}
			}, ch.title);
		}));
	}
}

class ChapterTOC implements Mithril {
	public function new() {}

	public function view() {
		return m('#chaptertoc', BookModel.instance.getChapter().subchapters.map(sub -> {
			var selected = BookModel.instance.getSubchapter() == sub ? '.selected' : '';
			m('button.#chaptertocitem$selected', {
				onclick: e -> {
					BookModel.instance.subchapter = sub;
				}
			}, sub.title);
		}));
	}
}

class ChapterContent implements Mithril {
	// static var syntaxRenderers:Array<markdown.inlineRenderer.InlineSyntaxRenderer> = [new markdown.inlineRenderer.QInlineSyntaxRenderer()];
	public function new() {}

	public function view() {
		var chapter = BookModel.instance.getChapter();
		ChapterTypeModel.instance.setChapter(chapter);
		var md = chapter.text;
		var id = chapter.id;
		return markdown.MithrilRendererCache.instance.markdownToView(id, md, [new markdown.inlineRenderer.QInlineSyntaxRenderer()]);
	}
}

class SubchapterContent implements Mithril {
	public function new() {}

	public function view() {
		var subchapter = BookModel.instance.getSubchapter();
		SubchapterTypeModel.instance.setChapter(subchapter);
		var md = subchapter.text;
		var id = subchapter.id;

		return cast [
			cast new ChapterTOC().view(),
			markdown.MithrilRendererCache.instance.markdownToView(id, md, [new markdown.inlineRenderer.QInlineSyntaxRenderer()]),
		];
	}
}

class Debug implements Mithril {
	public function new() {}

	public function view() {
		return [
			m('details', m('p', '' + BookModel.instance.getBook())),
			m('details', m('p', '' + BookModel.instance.getChapter())),
			m('details', m('p', '' + BookModel.instance.getSubchapter())),
		];
	}
}

class TypeModel {
	public var currentChapter:Chapter = null;

	function createUI(targetSelector:String, type:IChaptertype) {
		var target = Browser.document.querySelector(targetSelector);
		target.textContent = this.currentChapter.title;
		switch Type.getClass(type) {
			case VideoChaptertype:
				var el:js.html.VideoElement = js.Browser.document.createVideoElement();
				el.src = ''; // '/assets/video/tada.mp4';
				el.controls = true;
				el.style.width = '100%';
				target.appendChild(el);
				storage.StorageSource.instance.getUrl('/test/Klaver.mp4').then(url -> {
					trace(url);
					el.src = url;
				});

			case ScorxmixerChaptertype:
				var scorxType:ScorxmixerChaptertype = cast type;
				var paths = scorxType.paths;

				var el:js.html.DivElement = js.Browser.document.createDivElement();
				el.textContent = 'Scorx ' + paths;
				var btnPlay = js.Browser.document.createButtonElement();
				btnPlay.textContent = 'Play';
				var btnStop = js.Browser.document.createButtonElement();
				btnStop.textContent = 'Stop';
				target.appendChild(btnPlay);
				target.appendChild(btnStop);

				target.appendChild(el);
				StorageSource.instance.getUrls(paths).then(_urls -> {
					var urls:Array<String> = cast _urls;
					trace(urls);
					audio.scorx.MixerModel.instance.createMixer('test', urls).then(_mixer -> {
						var mixer:audio.scorx.Mixer = _mixer;
						el.textContent = 'Mixer ready';

						btnPlay.onclick = e -> {
							mixer.play();
						};
						btnStop.onclick = e -> {
							mixer.stop();
						};
					});
				});
			case _:
		}
	}
}

class ChapterTypeModel extends TypeModel {
	private function new() {}

	public static var instance(default, null):ChapterTypeModel = new ChapterTypeModel();

	// public var currentChapter:Chapter = null;
	public function setChapter(chapter:Chapter) {
		if (chapter == null)
			return;

		if (chapter == currentChapter)
			return;
		this.currentChapter = chapter;

		var type:IChaptertype = this.currentChapter.type;
		createUI('#chaptertype', type);
	}
}

class SubchapterTypeModel extends TypeModel {
	private function new() {}

	public static var instance(default, null):SubchapterTypeModel = new SubchapterTypeModel();

	public function setChapter(chapter:Chapter) {
		if (chapter == null)
			return;

		if (chapter == currentChapter)
			return;
		this.currentChapter = chapter;

		var type:IChaptertype = this.currentChapter.type;
		createUI('#subchaptertype', type);
	}
}
