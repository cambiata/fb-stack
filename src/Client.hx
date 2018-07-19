import haxe.Json;
import haxe.Http;
import haxe.DynamicAccess;
import js.Lib;
import firebase.Firebase;
import mithril.M;
import mithril.M.m;

class Client implements Mithril {
    
    static public function main() {
        new Client();
    }
    
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
                FirebaseUtils.getUserToken().then(token->{
                    // If user is logged in, fetch user data from realtime database /users document
                    return ApiCalls.getUserData(token);
                }).then(userData->{
                    trace('userData result: ' + Json.stringify(userData));
                })
                .catchError(e->{
                    trace('userData Error:' + e);
                });
            } else {
                trace('user == null');
                return null;
            }
		});

        // Setup Mithril ui
        var element = js.Browser.document.querySelector;       
        M.mount(element('main'), this);
      }

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
                FirebaseUtils.getUserToken().then(token->{
                    return ApiCalls.getUserData(token);
                }).then(result->{
                    trace('userData result: ' + Json.stringify(result));
                }).catchError(error->{
                    trace('userData error: ' + error);
                });
            }}, 'Test /api/userData '), 

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
class FirebaseUtils {
    static public function getCurrentUser() return Firebase.auth().currentUser;

    static public function getUserToken():js.Promise<Dynamic> {
        return getCurrentUser() != null ? getCurrentUser().getIdToken() : new js.Promise<Dynamic>((res,rej)->rej("Firebase.auth().currentUser == null")); // returns .then(function(token)->token)
    }
}