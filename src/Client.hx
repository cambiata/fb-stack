
import markdown.MithrilTools;
import js.Promise;
import firebase.Firebase;
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
        
        FirebaseModel.instance.init();
        
        Routes.instance.init();
        js.Promise.all([
            UserLoader.instance.startup(),
            ContentLoader.instance.startup()
            .then(val->{

                Promise.resolve(true);
            }),
        ])
        .then(val->{
            trace('ALL STARTED');
            // UserLoader.instance.loadRealtimeUpdate();
            //ContentLoader.instance.loadRealtimeUpdate();   
                ClientUI.instance.init();
                
                                     
        })
        .catchError(e->{
            trace('Error:' + e);
        });       

        

        // ContentitemLoader.instance.loadRealtimeDatabase();
    }
}




