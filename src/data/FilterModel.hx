package data;

import data.Content;
import mithril.M;

using cx.ArrayTools;
using FilterModel.FilterTools;

class FilterModel {
    public static var instance(default, null):FilterModel = new FilterModel();
    


    private function new () {}  // private constructor

    public var filterRoomRef:RoomRef = {treeId: null, roomId: null};

    public var filterShelvesRef:ShelfRef = null;

    public var filterBookRef:BookRef = null;

    public function getContent():Content {
        return ContentModel.instance.content;
    }

    public function getRoom():Room {
        try {
            return getContent().rooms.filter(room->room.id == filterRoomRef.roomId).first();
        } catch (e:Dynamic) {
            ErrorsAndLogs.addError('Can not find room with id from filterRoomRef: ' + filterBookRef + ' $e');
        }
        return getContent().rooms.first();
    }

    public function getHomeroom():Room {
        return getRoom().fallbackRoomIfNull();
    }


    public function setRoom(ref:RoomRef) {
        this.filterRoomRef = ref;
        M.redraw();
    }

    // public function getShelves():Array<Shelf> {
    //     return try {
    //         (filterShelvesRef != null && filterShelvesRef != null) ? getRoom().shelves.filter(shelf->shelf.id == filterShelvesRef.shelfId) : getRoom().shelves;
    //     } catch (e:Dynamic) {
    //         ErrorsAndLogs.addError('Can not filter shelves to ' + filterShelvesRef);
    //         getRoom().shelves;
    //     }
    // }


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