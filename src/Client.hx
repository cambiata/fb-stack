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



class Client implements Mithril {
    
    static public function main() {
        new Client();
    }

    var stateMonitor:StateMonitor;
    var developUI:DevelopUI;
    
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


        // Test clientside realtime database connection
        app.database().ref('test').on(firebase.EventType.Value, (snap, str)->{
            trace('database value changed:' + snap.val());
        });

        // Login/logout event handler
        app.auth().onAuthStateChanged(user -> {			
            if (user != null) {
                FirebaseUser.getUserToken().then(token->{
                    // If user is logged in, fetch user data from realtime database /users document
                    return ApiCalls.getUserData(token);
                }).then(data->{
                    trace(data);
                    var userData:Dynamic = data.userData;
                    State.userData = new UserData(userData);
                    var errors:Array<String> = data.errors;
                    errors.iter(e->State.errors.unshift(e));
                })
                .catchError(e->{
                    trace('userData Error:' + e);
                    State.userData = null;
                    State.errors.unshift(e);
                });
            } else {
                trace('user == null');
                State.userData = null;
                State.errors.unshift('User == null');
                return null;
            }
		});

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

class State {
    static public var userData:UserData ;
    static public var errors:Array<String> = [];
}

class StateMonitor implements Mithril {
    public function new() {}

    public function view() {
        return [
            m('div', 'State.userData:'),
            m('div', '' + State.userData),
            m('div', 'State.errors:'),
            m('div', State.errors.map(e->m('div', 'Error:'+e))),
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