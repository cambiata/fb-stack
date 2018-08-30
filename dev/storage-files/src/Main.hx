import audio.scorx.MixerModel;
import js.Promise;
import data.FirebaseModel;
import storage.StorageSource;
import mithril.M;
import audio.scorx.Mixer;

class Main {
	static function main()
		new Main();

	public function new() {
		FirebaseModel.instance.init();
		try {
			StorageSource.instance.getUrl('/test/choir.png').then(url -> {
				trace('Url:' + url);
			}).catchError(e -> {
				trace(e);
			});
		} catch (e:Dynamic) {
			trace('error: ' + e);
		}
		var getUrl = StorageSource.instance.getUrl;

		StorageSource.instance.getUrls(['/scorx/_test/200.mp3', '/scorx/_test/100.mp3', '/scorx/_test/110.mp3',]).then(urls -> {
			var files:Array<String> = cast urls;
			MixerModel.instance.createMixer('id', files);
		}).then(mx -> {
			var mixer:Mixer = mx;
		}).catchError(e -> {
			trace('Error:' + e);
		});

		M.mount(js.Browser.document.body, new Index());
	}
}

class Index implements Mithril {
	public function new() {}

	public function view() {
		return [m('h1', 'Hello from Mithril'),];
	}
}
