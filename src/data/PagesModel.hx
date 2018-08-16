package data;

import js.html.ShadowElement;
import mithril.M;
import data.Content;

class PagesModel {


    private function new() {}
    public static var instance(default, null): PagesModel = new PagesModel();

    public var pageIdx(default, set):Int = 0;
    function set_pageIdx(val:Int) {
        #if ! no_page_scrolling
        this.pageIdx = val;
        #else 
        trace('no page scrolling');
        #end
        M.redraw();
        return this.pageIdx;
    }

    public var pageWidth(default, set):String = '50%';
    function set_pageWidth(val:String) {
        this.pageWidth = val;
        
        M.redraw();
        return this.pageWidth;
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


}