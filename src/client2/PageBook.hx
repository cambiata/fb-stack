package client2;

import mithril.M;
import data.Content;

class PageBook {
	private function new() {}

	public static var instance(default, null):PageBook = new PageBook();

	public function init() {
		// M.mount(js.Browser.document.querySelector('#bookheader'), new Test());
		M.mount(js.Browser.document.querySelector('#bookleft'), new BookTOC());
		M.mount(js.Browser.document.querySelector('#chaptercontent'), new ChapterContent());
		M.mount(js.Browser.document.querySelector('#subchaptercontent'), new SubchapterContent());
	}
}

class BookView implements Mithril {
	public function new() {}

	public function view() {
		return [m('div', 'BookView')];
	}
}

class BookTOC implements Mithril {
	public function new() {}

	public function view() {
		return try {
			m('#booktoc', FilterManager.instance.getBook().chapters.map(ch -> {
				var selected = FilterManager.instance.getChapter() == ch ? '.selected' : '';
				// m('button.#booktocitem$selected', {
				// 	onclick: e -> {
				// 		trace('click');
				// 		// FilterManager.instance.chapter = ch;

				// 		M.redraw();
				// 	}
				// }, ch.title);
				var href = '/content' + ch.path;
				m('a.linkbutton$selected', {href: href, oncreate: M.routeLink}, ch.title);
			}));
		} catch (e:Dynamic) {
			m('div', 'Error ' + e);
		}
	}
}

class ChapterTOC implements Mithril {
	public function new() {}

	public function view() {
		return try {
			m('#chaptertoc', FilterManager.instance.getChapter().subchapters.map(sub -> {
				var selected = FilterManager.instance.getSubchapter() == sub ? '.selected' : '';
				// m('button.#chaptertocitem$selected', {
				// 	onclick: e -> {
				// 		// BookModel.instance.subchapter = sub;
				// 	}
				// }, sub.title);

				var href = '/content' + sub.path;
				m('a.linkbutton$selected', {href: href, oncreate: M.routeLink}, sub.title);
			}));
		} catch (e:Dynamic) {
			m('div', 'Error ' + e);
		}
	}
}

class ChapterContent implements Mithril {
	// static var syntaxRenderers:Array<markdown.inlineRenderer.InlineSyntaxRenderer> = [new markdown.inlineRenderer.QInlineSyntaxRenderer()];
	public function new() {}

	public function view() {
		return try {
			var chapter = FilterManager.instance.getChapter();
			ChapterTypeModel.instance.setChapter(chapter);
			var md = chapter.text;
			var id = chapter.path;
			return markdown.MithrilRendererCache.instance.markdownToView(id, md, [new markdown.inlineRenderer.QInlineSyntaxRenderer()]);
		} catch (e:Dynamic) {
			m('div', 'Error ' + e);
		}
	}
}

class SubchapterContent implements Mithril {
	public function new() {}

	public function view() {
		return try {
			var subchapter = FilterManager.instance.getSubchapter();
			SubchapterTypeModel.instance.setChapter(subchapter);
			var md = subchapter.text;
			var id = subchapter.path;

			return cast [
				cast new ChapterTOC().view(),
				markdown.MithrilRendererCache.instance.markdownToView(id, md, [new markdown.inlineRenderer.QInlineSyntaxRenderer()]),
			];
		} catch (e:Dynamic) {
			m('div', 'Error ' + e);
		}
	}
}

class TypeModel {
	public var currentChapter:Chapter = null;

	function createUI(targetSelector:String, type:IChaptertype) {
		var target = js.Browser.document.querySelector(targetSelector);
		target.textContent = this.currentChapter.title;
		switch Type.getClass(type) {
			case VideoChaptertype:
				var videoType:VideoChaptertype = cast type;
				var el:js.html.VideoElement = js.Browser.document.createVideoElement();
				el.src = ''; // '/assets/video/tada.mp4';
				el.controls = true;
				el.style.width = '100%';
				target.appendChild(el);
				storage.StorageSource.instance.getUrl(videoType.url).then(url -> {
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
				storage.StorageSource.instance.getUrls(paths).then(_urls -> {
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
