package data;
import utils.*;
import data.ClientUser;
using dataclass.JsonConverter;

class UserLoader {
    public static var instance(default, null):UserLoader = new UserLoader();
    
    private function new () {}  // private constructor

    public function load() {
        // this.setLoadingUser();
       firebase.Firebase.app().auth().onAuthStateChanged(user -> {
            if (user != null) {
                ErrorsAndLogs.addLog('Browser session user found.');
                UserModel.instance.setLoadingUser();
                ApiCalls.getAuthRequest('/api/userconfig')
                .then(data->{
                     UserModel.instance.setLoadedUserFromData(data);
                    ErrorsAndLogs.addErrors(data.errors);
                    trace('UserModelLoaded');
                }).catchError(error->{
                    ErrorsAndLogs.addError('Could not load userconfig for browser session user');
                    ErrorsAndLogs.addError(error);
                });
            } else {
                ErrorsAndLogs.addLog('No browser session user found.');
                UserModel.instance.setAnonymousUser();
                return null;
            }
        }, error -> {
            ErrorsAndLogs.addLog('Error: ' + error);
            UserModel.instance.setAnonymousUser();
        });
    }  

    public function loadRealtimeUpdate() {
        try {
            if ( UserModel.instance.clientUser != null) { 
                var userEmail:utils.UserEmail = UserModel.instance.clientUser.userData.email;
                trace(userEmail);
                
                var dbpath = 'users/' + userEmail.toPiped();
                trace('dbpath: ' + dbpath);
                firebase.Firebase.database().ref(dbpath).on(firebase.EventType.Value, (snap, str)->{
                    var userCopy:ClientUser = UserModel.instance.clientUser;
                    var data:Dynamic = snap.val();
                    data.email = userEmail;
                    ErrorsAndLogs.addLog('UserModel UserData realtime update active');
                    userCopy.userData = UserData.fromJson(data);
                    UserModel.instance.clientUser = userCopy;
                }); 
                
                var dbpath = 'user-config/' + userEmail.toPiped();
                firebase.Firebase.database().ref(dbpath).on(firebase.EventType.Value, (snap, str)->{
                    ErrorsAndLogs.addLog('UserModel User Config realtime update active');
                    var data:Dynamic = snap.val();
                    var userCopy:ClientUser = UserModel.instance.clientUser;
                    userCopy.userConfig = UserConfig.fromJson(data);
                    UserModel.instance.clientUser = userCopy;
                }); 
                return null;
            } else {
                ErrorsAndLogs.addLog('Can not use Realtime data for anonymous user.');
                return null;
            }
            
        } catch (e:Dynamic) {
            ErrorsAndLogs.addError('initRealtimeDatabase error: ' + e);
            return null;    
        }
    }    

    public function signIn(email:String, password:String) {
        validate(email, password)
        .then(valid->{
            UserModel.instance.setLoadingUser();
            return cast firebase.Firebase.auth().signInWithEmailAndPassword(email, password);
        })
        .then(user->{
            trace('USER ' + user);
            return null;
        })
        .catchError(error->{
            trace('ERROR' + error);
            ErrorsAndLogs.addError('error:' + error);
            UserModel.instance.setAnonymousUser();
            return null;
        });
    }

    public function signOut() {
        firebase.Firebase.auth().signOut();
    }

    function validate(email:String, password:String) {
        return new js.Promise<Bool>((res,rej)->{
            try {
                if (!UserEmail.isValid(email)) throw 'User email is not valid: $email';
                if (!UserPassword.isValid(password)) throw 'User password is not valid: $password';
                res(true);
            } catch(e:Dynamic) {
                rej(e);
            }
        });
    }       

} 