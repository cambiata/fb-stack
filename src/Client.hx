import haxe.Json;
import haxe.Http;
import haxe.DynamicAccess;
import js.Lib;
import firebase.Firebase;
import mithril.M;
import mithril.M.m;


class Client {
    static public function main() {
        trace('hello');
        var config = {
            apiKey: "AIzaSyBGLErhUSfQHA4wOtkid206KVE-96QEN04",
            authDomain: "fb-stack.firebaseapp.com",
            databaseURL: "https://fb-stack.firebaseio.com",
            projectId: "fb-stack",
            storageBucket: "fb-stack.appspot.com",
            messagingSenderId: "665827748546"
        };

        var app:firebase.app.App = firebase.Firebase.initializeApp(config);

        app.database().ref('test').on(firebase.EventType.Value, (snap, str)->{
            trace('database value changed:' + snap.val());
        });

        app.auth().onAuthStateChanged(user -> {			
			if (user != null) {
				trace(user.email);
				
			} else {
				trace('user == null');
			}			
		});

        var element = js.Browser.document.querySelector;       
        M.mount(element('main'), new Main());
    }
}

// class State {
//     public var text:String = 'Hello from state!';
// }

class Main implements Mithril {
    public function new() {}
    public function view() {
        return [
            m('div', 'Hejsan hoppsan i lingonskogen'),
			m("button", { onclick: e -> {
				firebase.Firebase.auth().signInWithEmailAndPassword('jonasnys@gmail.com', '123456');
			}}, 'Login'),
			
			m("button", { onclick: e -> {
				firebase.Firebase.auth().signOut();
			}}, 'Logout'),     

            m("button", { onclick: e -> {
                trace('Request');
                this.authenticatedRequest('get', '/api', null)
                .then(result->{
                    trace('Success:' + Json.stringify(result));
                }).catchError(e->{
                    trace('Error:' + e);
                });

            }}, '/api'),                

            m("button", { onclick: e -> {
                trace('Request');
                this.authenticatedRequest('get', '/auth', null)
                .then(result->{
                    trace('Success:' + Json.stringify(result));
                }).catchError(e->{
                    trace('Error:' + e);
                });                
            }}, '/auth'),                


        ];
    }

    function authenticatedRequest(method:String, url:String, body:String) {
        if (Firebase.auth().currentUser == null) {
            throw 'Not authenticated. Make sure you\'re signed in!';
        }

        var promise:js.Promise<Dynamic> = Firebase.auth().currentUser.getIdToken().then(function(token) {
            var h:DynamicAccess<String> = {authorization: 'Bearer ' + token };
            var request = {
                method: method,
                url: url,
                //dataType: 'string',
                headers: h
            };
            trace('Making authenticated request:', method, url);
            return M.request(request);            
        });

        return promise;
    }
}


