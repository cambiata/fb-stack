package data;

class FirebaseModel {
    public static var instance(default, null):FirebaseModel = new FirebaseModel();
    
    private function new () {}  // private constructor

    public function init() {
       // Init Firebase
        var config = {
            apiKey: "AIzaSyBGLErhUSfQHA4wOtkid206KVE-96QEN04",
            authDomain: "fb-stack.firebaseapp.com",
            databaseURL: "https://fb-stack.firebaseio.com",
            projectId: "fb-stack",
            storageBucket: "fb-stack.appspot.com",
            messagingSenderId: "665827748546"
        };

        this.app = firebase.Firebase.initializeApp(config);   
    }

    public var app:firebase.app.App = null;
}