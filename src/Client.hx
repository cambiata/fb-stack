import firebase.app.App;
import firebase.Firebase;
import mithril.M;
import mithril.M.m;
import ui.ClientUI;
import model.*;
import utils.*;

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

        Profile.instance.init();
        SiteModel.instance.init();
        ContentModel.instance.init();
        ContentModel.instance.initRealtimeUpdate();
        UserModel.instance.init(app);
        UserModel.instance.initRealtimeUpdate();

        ClientUI.instance.init();

        // var element = js.Browser.document.querySelector;       
        // M.mount(element('header'), new UIHeader());
        // M.mount(element('main'), new UIMain());

        // var routeHandler:SimpleRouteResolver = { 
        //     onmatch: function(args, path) {
        //         trace(args);
        //         trace(path);
        //         return null;
        //     },
        //     render:function(vnode) {
        //         return m('div', 'Hehe');
        //     }
        // }
        // $type(routeHandler);

        // var routes = {
        //     "/": routeHandler,
        // }       
        
        // M.route(element('#routes'), '/', routes); 
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



