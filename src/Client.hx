import firebase.app.App;
import firebase.EventType;
import firebase.database.Reference;
import js.Lib;
import firebase.Firebase;
import mithril.M;
import mithril.M.m;
import ui.ClientUI;
import model.*;
import js.Promise;
import model.UserModel;
import model.ContentModel;

using Lambda;
using dataclass.JsonConverter;

class Client implements Mithril {
    
    static public function main() {
        new Client();
    }

    var stateMonitor:StateMonitor;
    var testUi:TestUI;
    
    public function new() {
        
       // Init Firebase
        var config = {
            apiKey: "AIzaSyBGLErhUSfQHA4wOtkid206KVE-96QEN04",
            authDomain: "fb-stack.firebaseapp.com",
            databaseURL: "https://fb-stack.firebaseio.com",
            projectId: "fb-stack",
            storageBucket: "fb-stack.appspot.com",
            messagingSenderId: "665827748546"
        };

        var app:firebase.app.App = firebase.Firebase.initializeApp(config);

        SiteModel.instance.init();
        ContentModel.instance.init();
        UserModel.instance.init(app);

        // Setup Mithril ui
        this.stateMonitor = new StateMonitor();
        this.testUi = new TestUI();

        var element = js.Browser.document.querySelector;       
        
        M.mount(element('header'), new UIHeader());
        M.mount(element('main'), this);
      }

    public function view() {
        return [
            cast this.testUi.view(),
            cast this.stateMonitor.view(),
        ];
    }
}







enum DataModes<T> {
    Nil;
    Loading;
    Data(d:T);
}

abstract DataMode<T>(DataModes<T>) from DataModes<T> {
    @:to public function toData():T return switch this {
        case Data(d): d;
        case _: null;
    }
    public inline function new(de:DataModes<T>) {
        this = de;
    }

    @:from static public function fromData<T2>(data:T2) return data != null ? new DataMode(DataModes.Data(data)) : new DataMode(DataModes.Nil);
    @:from static public function fromDataModeE<T2>(de:DataModes<T2>) return new DataMode(de);
    static public function loading() return DataModes.Loading;
    static public function nil() return DataModes.Nil;
}

class StateMonitor implements Mithril {
    public function new() {}

    public function view() {
        return [
            m('div.statelabel', 'logs:'),
            m('div.stateitems', ErrorsAndLogs.logs.map(e->m('div.stateitem.statelog', ''+e))),
            m('div.statelabel', 'errors:'),
            m('div.stateitems', ErrorsAndLogs.errors.map(e->m('div.stateitem.stateerror', ''+e))),
            m('div.statelabel', 'content-tree'),
            m('div.stateitems', '' + ContentModel.instance.contentTree),

            new UIContentTree().view(),
        ];
    }
}

