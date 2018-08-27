package ui.media;

import mithril.M;
import data.StorageMap;

class StorageAudio extends StorageItem {
	override public function getItemView(src) {
		return m('audio', {controls: true}, m('source', {src: src}));
	}
}
