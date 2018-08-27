package ui.media;

import mithril.M;
import data.StorageMap;

class StorageMedia {
	public function new(src:String) {
		this.src = src;
		this.item = switch haxe.io.Path.extension(src) {
			case 'mp3':
				new StorageAudio(src);
			case 'mp4':
				new StorageVideo(src);
			case _:
				new StorageImage(src);
		}
	}

	var item:StorageItem;
	var src:String;

	public function view()
		return item.view();
}
