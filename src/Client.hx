
// import mithril.M;
// import mithril.M.m;
import ui.*;
import data.*;
// import utils.*;

class Client {
    
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

        ContentModel.instance.init();
        UserModel.instance.init();
        
        // haxe.Timer.delay(()->{
        //     ContentLoader.instance.load();
        //     UserLoader.instance.load(app);
        //     haxe.Timer.delay(()->{  
        //         UserLoader.instance.loadRealtimeUpdate();
        //         ContentLoader.instance.loadRealtimeUpdate();
        //     }, 3000);
        // }, 3000);

        ClientUI.instance.init();
        // Routes.instance.init();
    }


}

enum DataModes<T> {
    Nil;
    Loading;
    Data(d:T);
}

abstract DataMode<T>(DataModes<T>) from DataModes<T> {
    @:to public function getData():T return switch this {
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



