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
using Lambda;
using dataclass.JsonConverter;



class Client implements Mithril {
    
    static public function main() {
        new Client();
    }

    var stateMonitor:StateMonitor;
    var developUI:DevelopUI;
    
    public function new() {
        
        ClientInit.initApplication();

        // // Init Firebase
        // var config = {
        //     apiKey: "AIzaSyBGLErhUSfQHA4wOtkid206KVE-96QEN04",
        //     authDomain: "fb-stack.firebaseapp.com",
        //     databaseURL: "https://fb-stack.firebaseio.com",
        //     projectId: "fb-stack",
        //     storageBucket: "fb-stack.appspot.com",
        //     messagingSenderId: "665827748546"
        // };

        // var app:firebase.app.App = firebase.Firebase.initializeApp(config);

        // // Test clientside realtime database connection
        // app.database().ref('test').on(firebase.EventType.Value, (snap, str)->{
        //     trace('database value changed:' + snap.val());
        // });

        // app.database().ref(DBRefs.SiteConfig).on(firebase.EventType.Value, (snap, str)->{
        //     trace('Site config data:' + snap.val());
        //     try {
        //         if (snap.val() == null) throw 'No site config data in ${DBRefs.SiteConfig}';
        //         State.setSiteConfig(SiteConfigData.fromJson(snap.val()));
        //     } catch (e:Dynamic) {
        //         State.setErrors(['Can not find site-configx data', '$e']);
        //     }
        // });

        // // Login/logout event handler
        // app.auth().onAuthStateChanged(user -> {			
        //     if (user != null) {
        //         State.userData(StateMode.Loading);
        //         FirebaseUser.getUserToken().then(token->{
        //             // If user is logged in, fetch user data from realtime database /users document
        //             return ApiCalls.getUserData(token);
        //         }).then(data->{
        //             trace(data);
        //             var errors:Array<String> = data.errors;
        //             State.setErrors(errors);
        //             var userData:Dynamic = data.userData;
        //             State.userData(StateMode.Data(new UserData(userData)));
        //         })
        //         .catchError(e->{
        //             trace('userData Error:' + e);
        //             // State.userData = null;
        //             State.setErrors(['User == null', '$e']);
        //             State.userData(StateMode.None);
        //         });
        //     } else {
        //         trace('user == null');
        //         // State.userData = null;
        //         State.setErrors(['User == null']);
        //         State.userData(StateMode.None);
        //         return null;
        //     }
		// });

        // Setup Mithril ui
        this.stateMonitor = new StateMonitor();
        this.developUI = new DevelopUI();

        var element = js.Browser.document.querySelector;       
        M.mount(element('main'), this);
      }

    public function view() {
        return [
            cast this.developUI.view(),
            cast this.stateMonitor.view(),

        ];
    }
}


// Wrapper for api calls
class ApiCalls {
    static public function getUserData(token) {
        trace('User token: ' + Std.string(token).substr(0, 20));
        var h:DynamicAccess<String> = {authorization: 'Bearer ' + token };
        var request = {
            method: 'get',
            url: '/api/userdata',
            headers: h
        };
        return M.request(request);
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

        // Test clientside realtime database connection
        app.database().ref('test').on(firebase.EventType.Value, (snap, str)->{
            trace('database value changed:' + snap.val());
        });

        app.database().ref('site-config').on(firebase.EventType.Value, (snap, str)->{
            trace('Site config data:' + snap.val());
            try {
                if (snap.val() == null) throw 'No site config data in site-config';
                State.addLog('site-config loaded!');
                State.setSiteConfig(SiteConfigData.fromJson(snap.val()));
            } catch (e:Dynamic) {
                State.setErrors(['Can not find site-configx data', '$e']);
            }
        });

        // Login/logout event handler
        app.auth().onAuthStateChanged(user -> {			
            if (user != null) {
                State.setUserData(StateMode.Loading);
                FirebaseUser.getUserToken().then(token->{
                    // If user is logged in, fetch user data from realtime database /users document
                    return ApiCalls.getUserData(token);
                }).then(data->{
                    trace(data);
                    State.addLog('user loaded!');
                    var errors:Array<String> = data.errors;
                    State.setErrors(errors);
                    var userData:UserData = new UserData(data.userData);
                    State.setUserData(StateMode.Data(userData));

                    var dbref = 'user-config/' + userData.email.toPiped();    
                    app.database().ref(dbref).once(EventType.Value, (snap, str) -> {
                        trace('user-config loaded! ' + snap.val());
                        try {
                            if (snap.val() == null) throw 'Could not load $dbref';
                            State.addLog('user-config loaded: ' + snap.val());
                            var config:UserConfigData = new UserConfigData(snap.val());
                            State.setUserConfig(config);
                        } catch (e:Dynamic) {
                            State.setErrors(['$e']);
                        }
                    });
                    


                })
                .catchError(e->{
                    trace('userData Error:' + e);
                    // State.userData = null;
                    State.setErrors(['User == null', '$e']);
                    State.setUserData(StateMode.None);
                    State.setUserConfig(null);
                });
            } else {
                trace('user == null');
                // State.userData = null;
                State.addLog('User == null');
                State.setUserData(StateMode.None);
                State.setUserConfig(null);
                return null;
            }
		});


    }
}

class State {
    // static public var userData:UserData ;

    static public var logs(default,null):Array<String> = [];
    static public function addLog(log:String) {
        logs.unshift(log);
        M.redraw();
    }

    static public var errors(default,null):Array<String> = [];
    static public function setErrors(err:Array<String>) {
        err.iter(e->errors.push(e));
        M.redraw();
    }
    
    // static public var userData(default,null):UserState = None;
    // static public function setUserData(state:UserState) {
    //     userData = state;
    //     M.redraw();
    // }

    static public var userData(default,null):StateMode<UserData> = None;
    static public function setUserData(state:StateMode<UserData>) {
        userData = state;
        M.redraw();
    }    

    static public var userConfig(default,null):UserConfigData = null;
    static public function setUserConfig(config:UserConfigData) {
        userConfig = config;
        M.redraw();
    }

    static public var siteConfig(default,null):SiteConfigData = SiteConfigData.defaultValue;
    static public function setSiteConfig(config:SiteConfigData) {
        siteConfig = config;
        M.redraw();
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
			}}, 'Login'),
			
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

                    var d = Json.parse(Json.stringify(data));
                    trace(d.errors);
                    var errors:Array<String> = d.errors;
                    errors.iter(e->State.errors.unshift(e));
                }).catchError(error->{
                    trace('userData error: ' + error);
                });
            }}, 'Test /api/userData '), 
        ];
    }
}