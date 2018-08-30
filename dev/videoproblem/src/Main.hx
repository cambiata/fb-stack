import mithril.M;
import data.Content;

class Main {
	static function main()
		new Main();

	public function new() {
		var chaptertype = new VideoChaptertype({url: '/assets/tada.mp4'});
		var videochapter = new ui.VideoChapter(chaptertype);
		M.mount(js.Browser.document.body, new Index(videochapter));
	}
}

class Index implements Mithril {
	public function new(videochapter) {
		this.videochapter = videochapter;
	}

	var videochapter:ui.VideoChapter;

	public function view() {
		return [
			m('h1', 'Hello from Mithril'),

			m('video', {controls: true, src: '/assets/tada.mp4'}),
		];
	}
}
