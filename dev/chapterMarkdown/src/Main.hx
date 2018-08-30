import mithril.M;
import markdown.MithrilRendererCache;
import markdown.MithrilRenderer;
import markdown.inlineRenderer.*;

class Main {
	static function main()
		new Main();

	public function new() {
		js.Browser.window.setInterval(_ -> {
			State.counter++;
			M.redraw();
		}, 2000);

		haxe.Timer.delay(() -> {
			ui.StringRendererMapper.instance.set('score', cast new ui.render.QSyntaxRenderer());
			markdown.MithrilRendererCache.instance.clearCache();
			M.redraw();
		}, 3000);

		M.mount(js.Browser.document.body, new Index());
	}
}

class State {
	static public var counter:Int = 0;
	static public var md:String = '#Hej
    
Tomtebobarnen, av Elsa Beskow.

/@score a b c @/

Här är lite text.';
}

class Index implements Mithril {
	public function new() {}

	public function view() {
		var id = '/hej/hopp/galopp';

		return [
			m('h1', 'Hello from Mithril ' + State.counter),
			m('textarea', {
				style: {width: '300px', height: '200px'},
				value: State.md,
				oninput: e -> {
					MithrilRendererCache.instance.clearCacheKey(id);
					State.md = e.target.value;
				}
			}),
			MithrilRendererCache.instance.markdownToView(id, State.md, [new QInlineSyntaxRenderer()]),
		];
	}
}
