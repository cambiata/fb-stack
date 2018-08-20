package ui;

import data.FilterModel;
import mithril.M;

class BookpageCache {
    private function new() {}
    public static var instance(default, null): BookpageCache = new BookpageCache();

    var currentPath:String = null;
    var currentBookpage:Bookpage = null;

    public function getBookpageView():Vnodes {
        var book = FilterModel.instance.getBook();
        var path = book.path;
        if (book == null) return null;
        if (currentPath == path && currentBookpage != null) {
            trace('get bookpage from cache');
            return currentBookpage.view();
        }
        trace('create new bookpage ');

        this.currentBookpage = new Bookpage();
        this.currentPath = book.path;
        
        return this.currentBookpage.view();
    }



}