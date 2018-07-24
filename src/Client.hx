import firebase.app.App;
import firebase.EventType;
import firebase.database.Reference;
import js.Lib;
import firebase.Firebase;
import mithril.M;
import mithril.M.m;
import ui.ClientUI;
import model.SiteConfig;
import js.Promise;
import model.UserModel;

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

        // Init user model - loading logged in user config data etc.
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



class ErrorsAndLogs {

    static public var logs(default,null):Array<String> = [];
    static public function addLog(log:String) {
        logs.unshift(log);
        M.redraw();
    }

    static public var errors(default,null):Array<String> = [];
    static public function addErrors(err:Array<String>) {
        err.iter(e-> addError(e));
    }
    static public function addError(e:String) {
        errors.unshift(e);
        M.redraw();
    }
  
}

class AppState {
    public static var instance(default, null):AppState = new AppState();
    private function new () {
        this.siteConfig = SiteConfig.defaultValues();
    }  // private constructor

    public var currentUser(default, set):DataMode<CurrentUser> = Nil;
    function set_currentUser(u:DataMode<CurrentUser>) {
        if (this.currentUser == Nil && u == Nil) return null;
        if (this.currentUser == Loading && u == Loading) return null;
        this.currentUser = u;
        ErrorsAndLogs.addLog('CurrentUser:' + this.currentUser);
        M.redraw();
        return u;
    }

    public var siteConfig(default,set):SiteConfig;
    function set_siteConfig(d:SiteConfig)  {
        this.siteConfig = d;
        ErrorsAndLogs.addLog('SiteConfig:' + this.siteConfig);
        M.redraw();
        return d;
    }
}


// Wrapper for api calls
class ApiCalls {
    static public function getAuthRequest(url) {

        return UserModel.instance.getFBUserToken()
        .then(token->{
            var h:haxe.DynamicAccess<String> = {authorization: 'Bearer ' + token };
            var request = {
                method: 'get',
                url: url,
                headers: h
            };
            ErrorsAndLogs.addLog('AuthRequest: $url');
            M.request(request);       
        }); 
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
            // m('div.statelabel', 'CurrentUser:'),
            // m('div.stateitems', '' + AppState.instance.currentUser),
            // m('div.statelabel', 'siteConfig'),
            // m('div.stateitems', '' + AppState.instance.siteConfig),
            m('div.statelabel', 'logs:'),
            m('div.stateitems', ErrorsAndLogs.logs.map(e->m('div.stateitem.statelog', ''+e))),
            m('div.statelabel', 'errors:'),
            m('div.stateitems', ErrorsAndLogs.errors.map(e->m('div.stateitem.stateerror', ''+e))),
        ];
    }
}

class TestUI implements Mithril {
    public function new() {
    }

    public function view() {
        return [
            m('button', { onclick: e -> {
                ApiCalls.getAuthRequest('/api/userdata')
                .then(data->{
                    ErrorsAndLogs.addLog(haxe.Json.stringify(data));
                    trace('userData result: ' + haxe.Json.stringify(data));
                }).catchError(error->{
                    trace('userData error: ' + error);
                    ErrorsAndLogs.addError(error);

                });
            }}, 'Test /api/userData '), 

            m('button', { onclick: e -> {
                ApiCalls.getAuthRequest('/api/userconfig')
                .then(data->{
                    trace('userconfig result: ' + haxe.Json.stringify(data));
                    ErrorsAndLogs.addLog(haxe.Json.stringify(data));
                }).catchError(error->{
                    trace('userconfig error: ' + error);
                    ErrorsAndLogs.addError(error);

                });
            }}, 'Test /api/userConfig '), 
        ];
    }
}