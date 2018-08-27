package ui.media;

import mithril.M;
import data.StorageMap;

class StorageImage extends StorageItem {
	override public function getItemView(src) {
		return [m('img', {src: src})];
		// return [m('img', {src: StorageMap.instance.get(src)})];
	}
}
