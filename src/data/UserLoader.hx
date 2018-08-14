package data;
import js.Promise;
import utils.*;
import data.ClientUser;
import firebase.Firebase;
using dataclass.JsonConverter;
import data.UserModel;

class UserLoader {
    public static var instance(default, null):UserLoader = new UserLoader();
    
    private function new () {}  // private constructor

    public function startup() {
        
        UserModel.instance.userState = Loading;

        return UserLoader.instance.getCurrentBrowserUser()
        .then(browserUser->{
            if (browserUser == null) {
                UserModel.instance.userState = Anonymous;
                return null;
            }

            trace('Browser user found');
            return ApiCalls.getAuthRequest('/api/userconfig');
        })
        .then(dataResponse->{
            trace(dataResponse);
            if (dataResponse == null) return null;
            var data:Dynamic = dataResponse;
            UserModel.instance.userState = User(UserData.fromJson(data.userData));
            //UserModel.instance.setLoadedUserFromData(data);  
            trace('------------------------------------');                    
            trace('UserModelLoaded');

        })
        .then(val->{
            return UserLoader.instance.setupOnAuthChange(); 
        })
        .then(val->{
            trace('finished User loading!');
            return js.Promise.resolve(true);
        });

        
    }

    public function signIn(email:String, password:String) {
        validate(email, password)
        .then(valid->{
            //UserModel.instance.setLoadingUser();
            UserModel.instance.userState = Loading;
            return cast firebase.Firebase.auth().signInWithEmailAndPassword(email, password);
        })
        .then(user->{
            trace('USER ' + user);
            return null;
        })
        .catchError(error->{
            trace('ERROR' + error);
            ErrorsAndLogs.addError('error:' + error);
            UserModel.instance.userState = Anonymous;
            return null;
        });
    }

    public function signOut() {
        firebase.Firebase.auth().signOut();
        UserModel.instance.userState = Anonymous;
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


    // onAuthStateChanged as promise!
    // https://github.com/firebase/firebase-js-sdk/issues/462
    public function getCurrentBrowserUser() {        
        return new js.Promise((resolve, reject) -> {
            var unsubscribe:Dynamic = null;
            unsubscribe = Firebase.app().auth().onAuthStateChanged(user -> {
                unsubscribe();
                resolve(cast user);
            }, reject);
        });
    }       


    public function setupOnAuthChange() {
        haxe.Timer.delay(()->{ 
            firebase.Firebase.app().auth().onAuthStateChanged(user -> {
                    if (user != null) {
                        trace('--- Browser session user found.');

                        trace('compare:' + user.email + ' ' + UserModel.instance.userState.toData().email);
                        if (user.email == UserModel.instance.userState.toData().email) return null;

                        UserModel.instance.userState = Loading;
                        ApiCalls.getAuthRequest('/api/userconfig')
                        .then(dataResponse->{
                            var data:Dynamic = dataResponse;
                            //UserModel.instance.setLoadedUserFromData(data);  
                            trace('------------------------------------');                    
                            trace('UserModelLoaded : onAuthStateChanged');
                            trace('' + data);
                            var data:Dynamic = dataResponse;
                            UserModel.instance.userState = User(UserData.fromJson(data.userData));


                        }).catchError(error->{
                            trace('--- Could not load userconfig for browser session user');
                            trace(error);
                        });

                        return null;

                    } else {
                        trace('--- No browser session user found.');
                        UserModel.instance.userState = Anonymous;
                        return null;
                    }
                }, error -> {
                    trace('--- Error: ' + error);
                    UserModel.instance.userState = Anonymous;
                });
        }, 2000);

        return Promise.resolve(true);
    }        

    public function load() {

       firebase.Firebase.app().auth().onAuthStateChanged(user -> {
            if (user != null) {
                //ErrorsAndLogs.addLog('Browser session user found.');
                UserModel.instance.userState = Loading;
                ApiCalls.getAuthRequest('/api/userconfig')
                .then(data->{
                    //UserModel.instance.setLoadedUserFromData(data);
                    var d:Dynamic = data;
                    trace('------------------------------------');                    
                    trace('UserModelLoaded');
                    trace('' + d);
                    
                }).catchError(error->{
                    trace('Could not load userconfig for browser session user');
                    trace(error);
                });
            } else {
                trace('No browser session user found.');
                UserModel.instance.userState = Anonymous;
                return null;
            }
        }, error -> {
            trace('Error: ' + error);
            UserModel.instance.userState = Anonymous;
        });



    } 

}



/*
class XUserLoader {
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
                    //userCopy.userConfig = UserConfig.fromJson(data);
                    //UserModel.instance.clientUser = userCopy;
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


    // onAuthStateChanged as promise!
    // https://github.com/firebase/firebase-js-sdk/issues/462
    public function getCurrentBrowserUser() {        
        return new js.Promise((resolve, reject) -> {
            var unsubscribe:Dynamic = null;
            unsubscribe = Firebase.app().auth().onAuthStateChanged(user -> {
                unsubscribe();
                resolve(cast user);
            }, reject);
        });
    }    

    public function setUserStateLoading() {        
        UserModel.instance.setLoadingUser();
        return Promise.resolve(true);
    }

    public function setupOnAuthChange() {
       firebase.Firebase.app().auth().onAuthStateChanged(user -> {
            if (user != null) {
                trace('--- Browser session user found.');

                trace('compare:' + user.email + ' ' + UserModel.instance.clientUser.userData.email);
                if (user.email == UserModel.instance.clientUser.userData.email) return null;

                UserModel.instance.setLoadingUser();
                ApiCalls.getAuthRequest('/api/userconfig')
                .then(data->{
                    UserModel.instance.setLoadedUserFromData(data);
                    trace(data.errors);
                    trace('--- UserModelLoaded');
                }).catchError(error->{
                    trace('--- Could not load userconfig for browser session user');
                    trace(error);
                });

                return null;

            } else {
                trace('--- No browser session user found.');
                UserModel.instance.setAnonymousUser();
                return null;
            }
        }, error -> {
            trace('--- Error: ' + error);
            UserModel.instance.setAnonymousUser();
        });

        return Promise.resolve(true);
    }

    public function startup() {
        UserModel.instance.init();        
        return UserLoader.instance.setUserStateLoading()
        .then(val->{
            return UserLoader.instance.getCurrentBrowserUser();
        })
        .then(browserUser->{
            if (browserUser == null) {
                UserModel.instance.setAnonymousUser();
                return null;
            }

            trace('Browser user found');
            return ApiCalls.getAuthRequest('/api/userconfig');
        })
        .then(dataResponse->{
            trace(dataResponse);
            if (dataResponse == null) return null;
            var data:Dynamic = dataResponse;
            UserModel.instance.setLoadedUserFromData(data);  
        })
        .then(val->{
            return UserLoader.instance.setupOnAuthChange(); 
        })
        .then(val->{
            trace('finished User loading!');
            return js.Promise.resolve(true);
        });
    }

} 
*/