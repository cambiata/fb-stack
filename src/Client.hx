import markdown.MithrilTools;
import js.Promise;
import firebase.Firebase;
import mithril.M;
import mithril.M.m;
import ui.*;
import data.*;

using cx.ArrayTools;

class Client {
	static public function main()
		new Client();

	public function new() {
		FirebaseModel.instance.init();
		Routes.instance.init();
		ClientUI.instance.init();
		// ContentLoader.instance.loadContent();
		UserModel.instance.init();
		UserLoader.instance.startSession();
		initBundledClasses();
	}

	function initBundledClasses() {
		haxe.Timer.delay(() -> {
			Bundle.load(ui.LazyView).then(_ -> {
				ViewMapper.instance.set('test', ui.LazyView);
				M.redraw();
			});

			Bundle.load(ui.RosettaChapter).then(_ -> {
				ViewMapper.instance.set('ui.RosettaChapter', ui.RosettaChapter);
				M.redraw();
			});

			Bundle.load(ui.PdfChapter).then(_ -> {
				ViewMapper.instance.set('ui.PdfChapter', ui.PdfChapter);
				M.redraw();
			});

			Bundle.load(ui.VideoChapter).then(_ -> {
				ViewMapper.instance.set('ui.VideoChapter', ui.VideoChapter);
				M.redraw();
			});

			Bundle.load(ui.PitchChapter).then(_ -> {
				ViewMapper.instance.set('ui.PitchChapter', ui.PitchChapter);
				M.redraw();
			});

			Bundle.load(ui.ScorxmixerChapter).then(_ -> {
				ViewMapper.instance.set('ui.ScorxmixerChapter', ui.ScorxmixerChapter);
				M.redraw();
			});

			Bundle.load(ui.render.QSyntaxRenderer).then(_ -> {
				// ViewMapper.instance.set('ui.ScorxmixerChapter', ui.ScorxmixerChapter);
				StringRendererMapper.instance.set('score', cast new ui.render.QSyntaxRenderer());

				M.redraw();
			});
		}, 2000);
	}
}
