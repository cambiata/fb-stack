package model;

import model.ContentTreeModel;
import mithril.M;

class ContentItemModel {
    public static var instance(default, null):ContentItemModel = new ContentItemModel();

    private function new () {}  // private constructor

    public var contentItem(default, set):ContentItemType = ContentItemType.RoomType({treeId:'active-tree', roomId:'kak'});

    function set_contentItem(item:ContentItemType) {
        this.contentItem = item;
        M.redraw();
        return this.contentItem;
    } 
}

enum ContentItemType {
    RoomType(ref:RoomRef);
    ShelfType(ref:ShelfRef);
    BookType(ref:BookRef);
    ChapterType(ref:ChapterRef);
    SubchapterType(ref:SubchapterRef);
    HomeType;
    BlaBla;
    Loading;
}

