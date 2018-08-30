package storage;

class StorageSource {
	private function new() {}

	public static var instance(default, null):StorageSource = new StorageSource();

	public function getUrl(storagePath:String):firebase.Promise<String> {
		trace('download ' + storagePath);
		return firebase.Firebase.storage().ref(storagePath).getDownloadURL();
	}

	public function getUrls(storagePaths:Array<String>) {
		return js.Promise.all(storagePaths.map(sp -> getUrl(sp)));
	}
}
