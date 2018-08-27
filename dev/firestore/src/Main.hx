import haxe.ds.StringMap;
import firebase.storage.Storage;
import mithril.M;
import data.StorageMap;
import ui.media.*;

class Main {
	static function main()
		new Main();

	public function new() {
		data.FirebaseModel.instance.init();

		M.mount(js.Browser.document.querySelector('main'), new Index());
	}
}

class Index implements Mithril {
	public function new() {}

	public function view() {
		return [

			// m('input', {
			// 	type: 'file',
			// 	id: 'file',
			// 	onchange: e -> {
			// 		var file = e.target.files[0];
			// 		State.file = file;
			// 		trace(file);
			// 	}
			// }),

			// m('h1', 'Hello from Mithril'),
			// m('div', '' + haxe.Json.stringify(State.file)),
			// m('button', {
			// 	onclick: e -> {
			// 		try {
			// 			var gsReference = untyped __js__("firebase.storage().refFromURL('gs://bucket/testchor2.png');");
			// 			trace(gsReference);

			// 			var storageRef = firebase.Firebase.storage().ref('testchoir2.png');
			// 			storageRef.getDownloadURL().then(url -> {
			// 				trace(url);
			// 			});
			// 			return null;
			// 		} catch (e:Dynamic) {
			// 			trace('error: ' + e);
			// 		}
			// 		return null;
			// 	}
			// }, 'ref'),			// m('input', {
			// 	type: 'file',
			// 	id: 'file',
			// 	onchange: e -> {
			// 		var file = e.target.files[0];
			// 		State.file = file;
			// 		trace(file);
			// 	}
			// }),

			// m('h1', 'Hello from Mithril'),
			// m('div', '' + haxe.Json.stringify(State.file)),
			// m('button', {
			// 	onclick: e -> {
			// 		try {
			// 			var gsReference = untyped __js__("firebase.storage().refFromURL('gs://bucket/testchor2.png');");
			// 			trace(gsReference);

			// 			var storageRef = firebase.Firebase.storage().ref('testchoir2.png');
			// 			storageRef.getDownloadURL().then(url -> {
			// 				trace(url);
			// 			});
			// 			return null;
			// 		} catch (e:Dynamic) {
			// 			trace('error: ' + e);
			// 		}
			// 		return null;
			// 	}
			// }, 'ref'),		// 		try {
			// 			var gsReference = untyped __js__("firebase.storage().refFromURL('gs://bucket/testchor2.png');");
			// 			trace(gsReference);

			// 			var storageRef = firebase.Firebase.storage().ref('testchoir2.png');
			// 			storageRef.getDownloadURL().then(url -> {
			// 				trace(url);
			// 			});
			// 			return null;
			// 		} catch (e:Dynamic) {
			// 			trace('error: ' + e);
			// 		}
			// 		return null;
			// 	}
			// }, 'ref'),
			new StorageMedia('/test/choir.png').view(),
			new StorageMedia('/test/choirX.png').view(),
			new StorageMedia('/test/Carolamedley-VERSION-1A.mp3').view(),
			new StorageMedia('/test/video.mp4').view(),
			new StorageMedia('/test/test.png').view(),
		];
	}
}
