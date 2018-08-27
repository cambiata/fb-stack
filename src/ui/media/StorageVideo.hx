package ui.media;

import mithril.M;
import data.StorageMap;

class StorageVideo extends StorageItem {
	override public function getItemView(src) {
		return m('video', {src: src, controls: true, style: {width: '100%', objectFit: 'contain', backgroundColor: 'black'}});
	}
}
