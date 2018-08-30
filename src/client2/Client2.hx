package client2;

import client2.SidewaysManager;
import mithril.M;
import mithril.M.m;

class Client2 {
	static function main()
		new Client2();

	public function new() {
		client2.SidewaysManager.instance.init();
		data.FirebaseModel.instance.init();
		client2.ContentManager.instance.init();
		client2.UserManager.instance.init();
		client2.UserManager.instance.startSession();
		client2.RoutesManager.instance.init();
		initUI();
		initBundledClasses();
	}

	public function initUI() {
		client2.Header.instance.init();
		client2.Footer.instance.init();
		client2.PageHome.instance.init();
		client2.PageBook.instance.init();
		client2.PageShelves.instance.init();
		client2.PageSearch.instance.init();
		client2.PageContent.instance.init();
	}

	function initBundledClasses() {
		haxe.Timer.delay(() -> {
			Bundle.load(ui.render.QSyntaxRenderer).then(_ -> {
				ui.StringRendererMapper.instance.set('score', cast new ui.render.QSyntaxRenderer());
				markdown.MithrilRendererCache.instance.clearCache();
				trace('QSyntaxRenderer loaded');
				M.redraw();
			});
		}, 2000);
	}
}

class Logo implements Mithril {
	public function new() {}

	public function view() {
		return [m('button', {
			onclick: e -> SidewaysManager.instance.init()
		}, 'Sideways'),];
	}
}
