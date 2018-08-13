
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


        UserLoader.instance.getCurrentUser()
        .then(user->{
            trace('getCurrentUser ' + user);
            ErrorsAndLogs.addLog('getUserPromise: User' + Std.string(user != null));
            if (user != null) {

                ErrorsAndLogs.addLog('User session found!');
                ApiCalls.getAuthRequest('/api/userconfig')
                .then(dataResponse->{
                    var data:Dynamic = dataResponse;
                    UserModel.instance.setLoadedUserFromData(data);

                    ErrorsAndLogs.addLog('UserResponse: ' + data);
                });
                return null;

            } else {
                ErrorsAndLogs.addLog('No User session found!');
                return null;
            }
            return null;
            //ApiCalls.getAuthRequest('/api/userconfig')
        })
        // .then(data->{
        //     //UserModel.instance.setLoadedUserFromData(data);
        //     ErrorsAndLogs.addErrors(data.errors);
        //     trace('UserModelLoaded');
        // });
        .catchError(e->{
            ErrorsAndLogs.addError('Error: ' + e);
        })
        ;


        ContentModel.instance.init();
        UserModel.instance.init();
        // UserLoader.instance.load();
        
        // // haxe.Timer.delay(()->{
        //     ContentLoader.instance.load();
        //     UserLoader.instance.load();
        //     haxe.Timer.delay(()->{  
        //         UserLoader.instance.loadRealtimeUpdate();
        //         ContentLoader.instance.loadRealtimeUpdate();
        //     }, 3000);
        // // }, 0);

        ClientUI.instance.init();
        // Routes.instance.init();

        // ContentitemLoader.instance.loadRealtimeDatabase();
    }
}




