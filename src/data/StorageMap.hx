package data;

import haxe.io.Path;
import haxe.ds.StringMap;
import firebase.storage.Storage;
import mithril.M;

class StorageMap {
	private function new() {
		this.map = new StringMap();
	}

	// static var DEFAULT_URL:String = '/assets/flower.jpg';
	static public var DEFAULT_IMG:String = '/assets/default.jpg';
	static public var DEFAULT_MP3:String = '/assets/default.mp3';
	static public var NONEXISTING:String = 'NONEXISTING';
	public static var instance(default, null):StorageMap = new StorageMap();

	var map:haxe.ds.StringMap<String>;

	public function get(src:String) {
		if (map.exists(src)) {
			trace('Get ' + src + ' from cache');
			return map.get(src);
		}
		trace(src + ' does not exist');
		var storageRef = firebase.Firebase.storage().ref(src);
		storageRef.getDownloadURL().then(downloadUrl -> {
			trace('found ' + src + ':' + downloadUrl);
			map.set(src, downloadUrl);
			M.redraw();
			return downloadUrl;
		}).catchError(e -> {
			trace('error ' + e);
			return NONEXISTING;
		});

		return getDefault(src);
	}

	public function getDefault(src:String) {
		return switch Path.extension(src) {
			case 'mp3': DEFAULT_MP3;
			case _: DEFAULT_IMG;
		}
	}
}
