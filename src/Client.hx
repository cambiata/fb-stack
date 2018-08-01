
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

        ContentModel.instance.init();
        UserModel.instance.init();
        
        haxe.Timer.delay(()->{
            ContentLoader.instance.load();
            UserLoader.instance.load();
            haxe.Timer.delay(()->{  
                UserLoader.instance.loadRealtimeUpdate();
                ContentLoader.instance.loadRealtimeUpdate();
            }, 3000);
        }, 3000);

        ClientUI.instance.init();
        Routes.instance.init();

        // ContentitemLoader.instance.loadRealtimeDatabase();
    }
}




