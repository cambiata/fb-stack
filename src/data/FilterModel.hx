package data;

import data.Content;
import mithril.M;

using cx.ArrayTools;

class FilterModel {
    public static var instance(default, null):FilterModel = new FilterModel();
    


    private function new () {}  // private constructor

    public var contentRoomRef:RoomRef = {treeId: null, roomId: null};

    public var contentShelvesRef:ShelfRef = null;

    public var contentBookRef:BookRef = null;

    public function getContent():Content {
        return ContentModel.instance.content;
    }

    public function getRoom():Room {
        try {
            return getContent().rooms.filter(room->room.id == contentRoomRef.roomId).first();
        } catch (e:Dynamic) {
            ErrorsAndLogs.addError('Can not find room with id from contentRoomRef: ' + contentBookRef + ' $e');
        }
        return getContent().rooms.first();
    }

    public function setRoom(ref:RoomRef) {
        this.contentRoomRef = ref;
        M.redraw();
    }


    // public function getShelvesOfType(type:data.Content.Shelftype) {
    //     return this.getRoom().shelves.filter(shelf->shelf.type == type);         
    // }

    // public function getShelvesExcludeType(type:data.Content.Shelftype) {
    //     return this.getRoom().shelves.filter(shelf->shelf.type != type);         
    // }
}

class FilterTools {

    static public function fallbackRoomIfNull(room:Room):Room {
        return room == null ? {
            ErrorsAndLogs.addLog('Fallback to first room');
            ContentModel.instance.content.rooms.first();
        } : room;
    }

    static public function getShelvesOfType(shelves:Array<Shelf>, type:data.Content.Shelftype) {
        return shelves.filter(shelf->shelf.type == type);         
    }

    static public function getShelvesExcludeType(shelves:Array<Shelf>, type:data.Content.Shelftype) {
        return shelves.filter(shelf->shelf.type != type);         
    }

}