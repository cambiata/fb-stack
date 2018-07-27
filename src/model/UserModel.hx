package model;

import js.Browser;
import firebase.Firebase;
import utils.Profile;
import Client;
import js.Promise;
import utils.UserEmail;
import utils.UserPassword;
import mithril.M;
using dataclass.JsonConverter;

using StringTools;

class UserModel {

    public static var instance(default, null):UserModel = new UserModel();
    
    private function new () {}  // private constructor

    public var currentUser(default, set):DataMode<CurrentUser> = Nil;
    function set_currentUser(u:DataMode<CurrentUser>) {
        if (this.currentUser == Nil && u == Nil) return null;
        if (this.currentUser == Loading && u == Loading) return null;
        this.currentUser = u;
        // ErrorsAndLogs.addLog('CurrentUser:' + this.currentUser);
        M.redraw();
        return u;
    }


    public function load(app:firebase.app.App) {
        UserModel.instance.currentUser = Loading;
        app.auth().onAuthStateChanged(user -> {
            if (user != null) {
                ErrorsAndLogs.addLog('Browser session user found.');
                UserModel.instance.currentUser = Loading;
                ApiCalls.getAuthRequest('/api/userconfig')
                .then(data->{
                    UserModel.instance.currentUser = Data(new CurrentUser(cast data));
                    ErrorsAndLogs.addLog('UserModel loaded' + Profile.instance.msString());
                    ErrorsAndLogs.addErrors(data.errors);
                }).catchError(error->{
                    ErrorsAndLogs.addError('Could not load userconfig for browser session user');
                    ErrorsAndLogs.addError(error);
                });
            } else {
                ErrorsAndLogs.addLog('No browser session user found.');
                UserModel.instance.currentUser = Nil;
                return null;
            }
        }, error -> {
            ErrorsAndLogs.addLog('Error: ' + error);
            UserModel.instance.currentUser = Nil;
        });

        
    }

    public function loadRealtimeUpdate() {

        haxe.Timer.delay(()->{
            
            try {
                if (this.currentUser.getData() != null) { 
                    var userEmail:utils.UserEmail = this.currentUser.getData().userData.email;
                    trace(userEmail);
                    
                    var dbpath = 'users/' + userEmail.toPiped();
                    trace('dbpath: ' + dbpath);
                    Firebase.database().ref(dbpath).on(firebase.EventType.Value, (snap, str)->{
                        var userCopy:CurrentUser = this.currentUser.getData();
                        var data:Dynamic = snap.val();
                        data.email = userEmail;
                        ErrorsAndLogs.addLog('UserModel UserData realtime update active');
                        userCopy.userData = UserData.fromJson(data);
                        this.currentUser = Data(userCopy);
                    }); 
                    
                    var dbpath = 'user-config/' + userEmail.toPiped();
                    Firebase.database().ref(dbpath).on(firebase.EventType.Value, (snap, str)->{
                        ErrorsAndLogs.addLog('UserModel User Config realtime update active');
                        var data:Dynamic = snap.val();
                        var userCopy:CurrentUser = this.currentUser.getData();
                        userCopy.userConfig = UserConfig.fromJson(data);
                        this.currentUser = Data(userCopy);
                    }); 
                } else {
                    ErrorsAndLogs.addLog('Can not use Realtime data for anonymous user.');
                    return null;
                }
                
            } catch (e:Dynamic) {
                ErrorsAndLogs.addError('initRealtimeDatabase error: ' + e);
                return null;    
            }
        }, 3000);
    }


    public function signIn(email:String, password:String) {
        validate(email, password)
        .then(valid->{
            UserModel.instance.currentUser = Loading;
            return cast firebase.Firebase.auth().signInWithEmailAndPassword(email, password);
        })
        .then(user->{
            trace('USER ' + user);
            return null;
        })
        .catchError(error->{
            trace('ERROR' + error);
            ErrorsAndLogs.addError('error:' + error);
            UserModel.instance.currentUser = Nil;
            return null;
        });
    }

    public function signOut() {
        firebase.Firebase.auth().signOut();
    }

    function validate(email:String, password:String) {
        return new Promise<Bool>((res,rej)->{
            try {
                if (!UserEmail.isValid(email)) throw 'User email is not valid: $email';
                if (!UserPassword.isValid(password)) throw 'User password is not valid: $password';
                res(true);
            } catch(e:Dynamic) {
                rej(e);
            }
        });
    }    

    // Firebase specific 
    
    public function getFBCurrentUser() return firebase.Firebase.auth().currentUser;

    public function getFBUserToken():js.Promise<Dynamic> {
        return getFBCurrentUser() != null ? getFBCurrentUser().getIdToken() : new js.Promise<Dynamic>((res,rej)->rej("Firebase.auth().currentUser == null")); // returns .then(function(token)->token)
    }

}

class CurrentUser implements DataClass {
    public var userData:UserData;
    public var userConfig:UserConfig;
}


class UserData implements DataClass {
    public var firstname:String;
    public var lastname:String;
    public var email:UserEmail;
    public var domains:Array<String> = ['kak'];
    public var access:Int = 1;
}

class UserConfig implements DataClass {
    public var domain:String;
}



