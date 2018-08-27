package ui.media;

import firebase.storage.Storage;
import mithril.M;
import data.StorageMap;

class StorageItem implements Mithril {
	public function new(src:String) {
		this.src = src;
	}

	static var file:js.html.File = null;

	var src:String;

	public function view() {
		var storageUrl = StorageMap.instance.get(src);

		var itemView = null;
		if (storageUrl == StorageMap.instance.getDefault(src))
			itemView = getLoadingView(src);
		else if (storageUrl == StorageMap.NONEXISTING)
			itemView = getUploadView(src);
		else
			itemView = getItemView(StorageMap.instance.get(src));

		return itemView;
	}

	public function getLoadingView(src) {
		return m('div', {
			style: {
				border: '2px solid blue',
				padding: '1em'
			}
		}, 'Loading ' + src + '...');
	}

	public function getItemView(src) {
		return [m('img', {src: StorageMap.instance.get(src)})];
	}

	public function getUploadView(src) {
		return m('div', {
			style: {
				border: '2px solid green',
				padding: '1em'
			}
		}, [
				m('span', 'Upload file: ' + src),

				m('input', {
					type: 'file',
					id: 'file',
					onchange: e -> {
						file = e.target.files[0];
						trace(file);
					}
				}),
				m('button', {
					onclick: e -> {
						trace('upload');
						trace(file);
						if (file == null)
							return;

						var fileref = src;
						var storageRef = firebase.Firebase.storage().ref(fileref);
						trace(storageRef);
						var uploadTask = storageRef.put(file);

						uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, snap -> {
							trace('uploading ' + src + '...');
							return null;
						}, error -> {
							trace('error2 ' + e);
							// return null;
						}, () -> {
							trace('hehe');
							M.redraw();
						});

						var i = 0;
					}
				}, 'Upload'),
				m('span', file + ''),

			]);
	}
}
