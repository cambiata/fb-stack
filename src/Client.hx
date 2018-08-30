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
		ContentLoader.instance.loadContent();
		UserModel.instance.init();
		UserLoader.instance.startSession();
		initBundledClasses();
	}

	function initBundledClasses() {
		haxe.Timer.delay(() -> {
			Promise.all([
				Bundle.load(RosettaChapter),
				Bundle.load(PdfChapter),
				Bundle.load(VideoChapter),
				Bundle.load(PitchChapter),
				Bundle.load(ScorxmixerChapter),
			]).then(_ -> {
				trace('ALL LOADED');
				ViewMapper.instance.set('ui.RosettaChapter', ui.RosettaChapter);
				ViewMapper.instance.set('ui.PdfChapter', ui.PdfChapter);
				ViewMapper.instance.set('ui.VideoChapter', ui.VideoChapter);
				ViewMapper.instance.set('ui.PitchChapter', ui.PitchChapter);
				ViewMapper.instance.set('ui.ScorxmixerChapter', ui.ScorxmixerChapter);
				ui.ChapterTypeViewCache.instance.clearCache();
				M.redraw();
			});

			Bundle.load(ui.render.QSyntaxRenderer).then(_ -> {
				ui.StringRendererMapper.instance.set('score', cast new ui.render.QSyntaxRenderer());
				markdown.MithrilRendererCache.instance.clearCache();
				trace('QSyntaxRenderer loaded');
				M.redraw();
			});
		}, 2000);
	}
}
