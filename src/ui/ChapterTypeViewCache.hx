package ui;

import data.Content;
import mithril.M;
import mithril.M.m;

class ChapterTypeViewCache {
	var cache:haxe.ds.StringMap<Dynamic>;

	private function new() {
		this.cache = new haxe.ds.StringMap();
	}

	public static var instance(default, null):ChapterTypeViewCache = new ChapterTypeViewCache();

	public function clearCache() {
		for (key in this.cache.keys()) {
			// trace('clear markdown dache');
			this.cache.remove(key);
		}
	}

	public function clearCacheKey(key:String) {
		if (this.cache.exists(key)) {
			// trace('remove cache key ');
			this.cache.remove(key);
		}
	}

	public function getTypeView(chapter:Chapter):Dynamic {
		var path = chapter.path;

		if (this.cache.exists(path)) {
			trace('get $path from cache');
			return this.cache.get(path);
		}

		var view:Dynamic = null;
		if (chapter == null || chapter.type == null) {
			view = null;
		} else {
			view = switch Type.getClass(chapter.type) {
				case VideoChaptertype:
					ViewMapper.instance.getNew('ui.VideoChapter', [chapter.type]).view();
				// new ui.VideoChapter(cast chapter.type).view();
				case RosettaChaptertype:
					ViewMapper.instance.getNew('ui.RosettaChapter', [chapter.type]).view();
				case PdfChaptertype:
					ViewMapper.instance.getNew('ui.PdfChapter', [chapter.type]).view();
				case PitchChaptertype:
					ViewMapper.instance.getNew('ui.PitchChapter', [chapter.type]).view();
				case ScorxmixerChaptertype:
					ViewMapper.instance.getNew('ui.ScorxmixerChapter', [chapter.type]).view();
				case _:
					return m('div', 'Undefined special chapter: ' + chapter.type);
			}
			this.cache.set(path, view);
		}

		return view;
	}
}
