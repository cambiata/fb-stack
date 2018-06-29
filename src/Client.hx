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
			trace(user);
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
				untyped firebase.Firebase.auth().signInWithEmailAndPassword('jonasnys@gmail.com', '123456');
			}}, 'Login'),
			
			m("button", { onclick: e -> {
				untyped  firebase.Firebase.auth().signOut();
			}}, 'Logout'),            
        ];
    }
}


