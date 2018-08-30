package markdown;

import haxe.ds.StringMap;
import markdown.MithrilRenderer;
import markdown.inlineRenderer.*;

class MithrilRendererCache {
	var cache:haxe.ds.StringMap<Dynamic>;

	private function new() {
		this.cache = new StringMap();
	}

	public function clearCache() {
		for (key in this.cache.keys()) {
			trace('clear markdown dache');
			this.cache.remove(key);
		}
	}

	public function clearCacheKey(key:String) {
		if (this.cache.exists(key)) {
			// trace('remove cache key ');
			this.cache.remove(key);
		}
	}

	public function markdownToView(id:String, md:String, syntaxRenderers:Array<InlineSyntaxRenderer> = null) {
		if (this.cache.exists(id)) {
			// trace('get $id from cache!');
			return this.cache.get(id);
		}

		var view = MithrilRenderer.instance.markdownToView(md, syntaxRenderers);
		trace('save $id to cache');
		this.cache.set(id, view);

		return view;
	}

	public static var instance(default, null):MithrilRendererCache = new MithrilRendererCache();
}
