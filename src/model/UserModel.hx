package model;

import Client;
import js.Promise;
import utils.UserEmail;
import utils.UserPassword;
import mithril.M;

using StringTools;


class UserModel {

    public static var instance(default, null):UserModel = new UserModel();
    
    private function new () {}  // private constructor

    public var currentUser(default, set):DataMode<CurrentUser> = Nil;
    function set_currentUser(u:DataMode<CurrentUser>) {
        if (this.currentUser == Nil && u == Nil) return null;
        if (this.currentUser == Loading && u == Loading) return null;
        this.currentUser = u;
        ErrorsAndLogs.addLog('CurrentUser:' + this.currentUser);
        M.redraw();
        return u;
    }


    public function init(app:firebase.app.App) {
        var starttime = Date.now().getTime();

        UserModel.instance.currentUser = Loading;

        app.auth().onAuthStateChanged(user -> {
            if (user != null) {
                ErrorsAndLogs.addLog('Browser session user found.');
                UserModel.instance.currentUser = Loading;
                ApiCalls.getAuthRequest('/api/userconfig')
                .then(data->{
                    ErrorsAndLogs.addLog('User config loaded ms:' + (Date.now().getTime() - starttime));
                    UserModel.instance.currentUser = Data(new CurrentUser(cast data));
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



