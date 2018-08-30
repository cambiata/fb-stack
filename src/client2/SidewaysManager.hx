package client2;

import mithril.M;
import data.Content;

class SidewaysManager {
	private function new() {
		this._sideways = untyped sideways;
	}

	var _sideways:Dynamic;

	public static var instance(default, null):SidewaysManager = new SidewaysManager();

	public var pageIdx(default, set):Int = 0;

	function set_pageIdx(val:Int) {
		if (!this.inited)
			return val;
		trace('SET PG IDX ' + val);
		val = cast Math.min(3, val);
		this.pageIdx = val;
		this.moveToPage(this.pageIdx);
		M.redraw();
		return this.pageIdx;
	}

	public function setPageFromContentRef(ref:ContentRef) {
		var pageIndex = 0;
		if (ref.subchapterId != null) {
			pageIndex = 2;
		} else if (ref.chapterId != null) {
			pageIndex = 2;
		} else if (ref.bookId != null) {
			pageIndex = 2;
		} else if (ref.shelfId != null) {
			pageIndex = 1;
		} else if (ref.roomId != null) {
			pageIndex = 0;
		}
		this.pageIdx = pageIndex;
	}

	var inited = false;

	public function init() {
		this._sideways.init(0);
		this.inited = true;
	}

	function moveToPage(pageNr:Int) {
		this._sideways.moveToPage2(pageNr);
	}
}
