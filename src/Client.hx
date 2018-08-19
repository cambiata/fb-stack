
import markdown.MithrilTools;
import js.Promise;
import firebase.Firebase;
// import mithril.M;
// import mithril.M.m;
import ui.*;
import data.*;
// import utils.*;
using cx.ArrayTools;

class Client {
    
    static public function main() new Client();

    public function new() {
        FirebaseModel.instance.init();        
        Routes.instance.init();        
        
        ClientUI.instance.init();
        UserModel.instance.init();
        
        ContentLoader.instance.loadContent();
        UserLoader.instance.startSession();
    }
}




