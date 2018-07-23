import firebase.EventType;
import firebase.database.Reference;
import dataclass.JsonConverter;
import haxe.Json;
import haxe.Http;
import haxe.DynamicAccess;
import js.Lib;
import firebase.Firebase;
import mithril.M;
import mithril.M.m;
import domain.Data;
import ClientUI;
using Lambda;
using dataclass.JsonConverter;

class Client implements Mithril {
    
    static public function main() {
        new Client();
    }

    var stateMonitor:StateMonitor;
    var developUI:DevelopUI;
    var uiUserData:UIUserData;
    
    public function new() {
        
        ClientInit.initApplication();

        // Setup Mithril ui
        this.uiUserData = new UIUserData();
        this.stateMonitor = new StateMonitor();
        this.developUI = new DevelopUI();

        var element = js.Browser.document.querySelector;       
        M.mount(element('main'), this);
      }

    public function view() {
        return [
            cast this.uiUserData.view(),
            cast this.developUI.view(),
            cast this.stateMonitor.view(),
        ];
    }
}


// Wrapper for api calls
class ApiCalls {

    static public function getAuthRequest(token, url) {
        var h:DynamicAccess<String> = {authorization: 'Bearer ' + token };
        var request = {
            method: 'get',
            url: url,
            headers: h
        };
        return M.request(request);        
    }

    static public function getUserData(token) {
        return getAuthRequest(token, '/api/userdata');
    }

    static public function getUserConfig(token) {
        return getAuthRequest(token, '/api/userconfig');
    }
}

// Firebase user related stuff
class FirebaseUser {
    static public function getCurrentUser() return Firebase.auth().currentUser;
    static public function getUserToken():js.Promise<Dynamic> {
        return getCurrentUser() != null ? getCurrentUser().getIdToken() : new js.Promise<Dynamic>((res,rej)->rej("Firebase.auth().currentUser == null")); // returns .then(function(token)->token)
    }
}

class ClientInit {
    static public function initApplication() {

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

        var starttime:Float = Date.now().getTime();
       
        app.database().ref('site-config').on(firebase.EventType.Value, (snap, str)->{
           State.addLog('Site config ms:' + (Date.now().getTime() - starttime));
           State.setSiteConfig(SiteConfigData.fromJson(snap.val()));
        });

        app.auth().onAuthStateChanged(user -> {
            State.addLog('Auth changed ms:' + (Date.now().getTime() - starttime));
            if (user != null) {

                // Hämta user token
                FirebaseUser.getUserToken()
                .then(token->{
                    return ApiCalls.getUserConfig(token);
                }).then(data->{
                    State.addLog('User config loaded ms:' + (Date.now().getTime() - starttime));
                    trace(data);
                    var userConfig = UserConfigData.fromJson(data.userConfig);
                    var userData = UserData.fromJson(data.userData);
                    State.setUserConfig(userConfig);
                    State.setUserData(StateMode.Data(userData));
                }).catchError(error->{
                    State.setError(error);
                });
            } else {
                State.setError('No user!');
                State.setUserData(StateMode.None);
                return null;
            }

        }, error -> {
            State.addLog('Error: ' + error);
        });

    }
}

class State {
    static public var logs(default,null):Array<String> = [];
    static public function addLog(log:String) {
        logs.unshift(log);
        M.redraw();
    }

    static public var errors(default,null):Array<String> = [];
    static public function setErrors(err:Array<String>) {
        err.iter(e-> setError(e));
    }
    static public function setError(e:String) {
        errors.push(e);
        M.redraw();
    }
    
    static public var userData(default,null):StateMode<UserData> = Loading;
    static public function setUserData(state:StateMode<UserData>) {
        userData = state;
        M.redraw();
    }    

    static public var userConfig(default,null):UserConfigData = null;
    static public function setUserConfig(config:UserConfigData) {
        userConfig = config;
        if (userConfig != null) {
            setCurrentDomain(userConfig.domain);
        } else {
            State.siteCurrentDomain = DomainData.getDefault();
        }

        M.redraw();
    }

    static public var siteConfig(default,null):SiteConfigData = null;
    static public function setSiteConfig(config:SiteConfigData) {
        siteConfig = config;
        M.redraw();
    }

    static public var siteCurrentDomain(default,null):DomainData = DomainData.getDefault();
    static public function setCurrentDomain(domainName:String) {
        var domains:Array<DomainData> = siteConfig.domains;
        try {
            var domainData = domains.filter(d -> d.name == domainName)[0];
            siteCurrentDomain = domainData;
            M.redraw();
        } catch (e:Dynamic) {
            
        }
        
    }
}

enum StateMode<T> {
    None;
    Loading;
    Data(data:T);
}


class StateMonitor implements Mithril {
    public function new() {}

    public function view() {
        return [
            m('div.statelabel', 'userData:'),
            m('div.stateitems', '' + State.userData),
            m('div.statelabel', 'userConfig'),
            m('div.stateitems', '' + State.userConfig),
            m('div.statelabel', 'siteConfig'),
            m('div.stateitems', '' + State.siteConfig),
            m('div.statelabel', 'siteCurrentDomain'),
            m('div.stateitems', '' + State.siteCurrentDomain),
            m('div.statelabel', 'logs:'),
            m('div.stateitems', State.logs.map(e->m('div.stateitem.statelog', 'Log:'+e))),
            m('div.statelabel', 'errors:'),
            m('div.stateitems', State.errors.map(e->m('div.stateitem.stateerror', 'Error:'+e))),
        ];
    }
}




class DevelopUI implements Mithril {
    public function new() {}
    public function view() {
        return [
            // login
			m("button", { onclick: e -> {
				firebase.Firebase.auth().signInWithEmailAndPassword('jonasnys@gmail.com', '123456');
                State.setUserData(StateMode.Loading);
			}}, 'Login'),
			m("button", { onclick: e -> {
				firebase.Firebase.auth().signInWithEmailAndPassword('jonasnysx@gmail.com', 'x123456');
			}}, 'Login error'),
			
            // logout
			m("button", { onclick: e -> {
				firebase.Firebase.auth().signOut();
			}}, 'Logout'),     

            // test authenticated api call 
            m('button', { onclick: e -> {
                FirebaseUser.getUserToken().then(token->{
                    return ApiCalls.getUserData(token);
                }).then(data->{
                    trace('userData result: ' + Json.stringify(data));
                }).catchError(error->{
                    trace('userData error: ' + error);
                });
            }}, 'Test /api/userData '), 

            m('button', { onclick: e -> {
                FirebaseUser.getUserToken().then(token->{
                    // return ApiCalls.getUserData(token);
                    return ApiCalls.getAuthRequest(token, '/api/userconfig');
                }).then(data->{
                    trace('userconfig result: ' + Json.stringify(data));
                }).catchError(error->{
                    trace('userconfig error: ' + error);
                });
            }}, 'Test /api/userConfig '), 

        ];
    }
}