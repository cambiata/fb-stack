package ui;

import mithril.M;
import data.ErrorsAndLogs;
import data.*;

using data.Content.ContentFilters;

class ClientUI implements Mithril { 
    public static var instance(default, null):ClientUI = new ClientUI();
    private function new () {}  // private constructor
    public function init() {
        var element = js.Browser.document.querySelector;       
        M.mount(element('header'), new UIHeader());
        M.mount(element('main'), new UIMain());
    }    
}

class UIMain implements Mithril {
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
