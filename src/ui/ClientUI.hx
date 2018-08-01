package ui;

import ui.content.ContentTreeView.UIShelf;
import mithril.M;
import data.ErrorsAndLogs;
import data.*;
import data.Content;

using data.Content.ContentFilters;
using cx.ArrayTools;
using dataclass.JsonConverter;
using data.FilterModel.FilterTools;

class ClientUI implements Mithril { 
    public static var instance(default, null):ClientUI = new ClientUI();
    private function new () {}  // private constructor
    public function init() {
        var element = js.Browser.document.querySelector;       
        M.mount(element('header'), new UIHeader());
        M.mount(element('div#buttons'), new UIDevbuttons());
        M.mount(element('main#develop'), new UIDevelop());
        M.mount(element('main#content'), new UIContent());
    }    
}

class UIContent implements Mithril {
    public function new() { //(state:T) {

    }
    public function view() {
        var homeroom:Room = FilterModel.instance.getHomeroom();
        return [
            new UIContentHomepage(homeroom).view(),
            new UIContentFilteredShelves(homeroom).view(),
            new UIContentBook().view(),
            new UIContentSearch().view(),
        ];
    }
}

class UIContentHomepage implements Mithril {
    public function new(homeRoom:Room) { 
        this.homeRoom = homeRoom;
    }
    
    var homeRoom:Room;

    public function view() {
        return try {
            // var firstRoom:Room = ContentModel.instance.content.rooms.first();
            // var homeRoom:Room = data.FilterModel.instance.getRoom().fallbackRoomIfNull();
            trace(homeRoom);
            m('.border', [
                m('h1', homeRoom.title + ' (' + homeRoom.id + ')'),
                // m('div', 'UIContentHomepage ' + firstRoom.toJson()),
                m('h2', 'Home shelf'),
                new UIHomeShelf(homeRoom).view(),
                m('h2', 'Other shelves'),
                new UIShelvesList(homeRoom.shelves.getShelvesExcludeType(Homepage)).view(),

            ]);


        } catch (e:Dynamic) {
            ErrorsAndLogs.addError('Can not find book: $e');
            m('.error', 'ERROR $e');
        } 
    }
}

class UIHomeShelf implements Mithril {
    public function new(room:Room) { 

        // Plocka fram shelf ot type home
        var homeShelves = room.shelves.getShelvesOfType(Homepage);
        this.homeshelf = homeShelves.length>0 ? room.shelves.first() : null;

        this.otherShelves = room.shelves.getShelvesExcludeType(Homepage);

    }
    var homeshelf:Shelf;
    var otherShelves:Array<Shelf>;

    public function view() {
        if (this.homeshelf == null) return m('div.error', 'This Room does not have a Home Shelf');
        return [
                    m('div.border.grid1', 'HomeShelf ' +  this.homeshelf.path),
                    m('div', 'Other shelves overview:'),
                    m('div.grid2', this.otherShelves.map(shelf->{
                            m('div.border', 'Shelf ' + shelf.path);
                    })),
        ];
    }
    
}

class UIHomeShelvesPresenter implements Mithril {


}

class UIShelvesList implements Mithril {
    public function new(shelves:Array<Shelf>) { //(state:T) {
        this.shelves = shelves;
    }
    var shelves:Array<Shelf>;
    
    public function view() {
        return m('div.grid1', this.shelves.map(shelf->{
            m('div.border', 'Shelf:' + shelf.path);
        }) );
    }
    
}

class UIContentFilteredShelves implements Mithril {
    public function new(homeroom:Room) { 
        this.homeroom = homeroom;
    }
    
    var homeroom:Room;
    
    public function view() {
        return try {
            m('div.border', [
                m('h2', 'UIContentFilteredShelves'),
                new UIShelvesList(this.homeroom.shelves).view(),
            ]);
        } catch (e:Dynamic) {
            ErrorsAndLogs.addError('UIContentFilteredShelves:' + e);
            m('.error', 'UIContentFilteredShelves $e');

        }
    }
}

class UIContentBook implements Mithril {
    public function new() { 
    
    }
    
    public function view() {
        return m('.border', 'UIContentBook');
        
    }
}

class UIContentSearch implements Mithril {
    public function new() { 
    
    }
    
    public function view() {
        return m('.border', 'UIContentSearch');
    }
}



//-----------------------------------------------------------------------------------------------------------------------------

class UIDevbuttons implements Mithril {

    public function new() { //(state:T) {

    }
    
    public function view() {
        return [
            m("button[type=button]", {onclick:e->{
                data.UserLoader.instance.signIn('jonasnys@gmail.com', '123456');
            }}, 'Log in as Jonas'),
            m("button[type=button]", {onclick:e->{
                FilterModel.instance.setRoom({treeId:null, roomId:'room1'});
            }}, 'Set room as room1'),
            m("button[type=button]", {onclick:e->{
                FilterModel.instance.setRoom({treeId:null, roomId:'room0'});
            }}, 'Set room as room0'),
            m("button[type=button]", {onclick:e->{
                FilterModel.instance.setRoom({treeId:null, roomId:'x'});
            }}, 'Set room as x'),
            m("button[type=button]", {onclick:e->{
                M.redraw();
            }}, 'M.redraw()'),
            
            m("button[type=button]", {onclick:e->{
                ContentLoader.instance.load();
                haxe.Timer.delay(()->{  
                    ContentLoader.instance.loadRealtimeUpdate();
                }, 3000);                
            }}, 'Load Content'),

            m("button[type=button]", {onclick:e->{
                UserLoader.instance.load();
                haxe.Timer.delay(()->{  
                    UserLoader.instance.loadRealtimeUpdate();
                }, 3000);                
            }}, 'Load User'),            
        ];
    }
}


class UIDevelop implements Mithril {
    public function new() { 
    
    }
    
    public function view() {
        return [
            new ui.content.ContentTreeView(ContentModel.instance.content).view(),
            new ui.content.ContentTreeView(ContentModel.instance.content.sort()).view(),
            new ui.content.ContentTreeView(ContentModel.instance.content.fiterRoomAndShelfHome()).view(),
        ];
    }
}


class StateMonitor implements Mithril {
    public function new() {}

    public function view() {
        return m('div', [
            m('div', 'Statemonitor'),
            // m('div.statelabel', 'logs:'),
            // m('div.stateitems', ErrorsAndLogs.logs.map(e->m('div.stateitem.statelog', ''+e))),
            // m('div.statelabel', 'errors:'),
            // m('div.stateitems', ErrorsAndLogs.errors.map(e->m('div.stateitem.stateerror', ''+e))),
            // m('div.statelabel', 'content-tree'),
            // m('div.stateitems', '' + ContentModel.instance.content),
            // new UIContent().view(),
        ]);
    }
}
