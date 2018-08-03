package data;

import data.ClientUser;
using dataclass.JsonConverter;
import firebase.Firebase;
import utils.UserEmail;
import utils.UserPassword;

class UserModel {
    public static var instance(default, null):UserModel = new UserModel();
 
    private function new () {}  // private constructor

    public var clientUser(default, set):ClientUser;
    function set_clientUser(val:ClientUser) {
        this.clientUser = val;
        ErrorsAndLogs.addLog('ClientUser:' + this.clientUser);
        mithril.M.redraw();
        return this.clientUser;
    }

    public var clientUserState(default, null):ClientUserState;

    public function init() {
        ErrorsAndLogs.addLog('UserModel.instance.init()');
        // this.setAnonymousUser();
        this.setLoadingUser();
    }

    public function setAnonymousUser() {
        this.clientUserState = Anonymous;
        this.clientUser = new ClientUser(anonymousUser());
    }

    public function setLoadedUserFromData(data:Dynamic) {
        try {
            this.clientUser = new ClientUser(cast data);
            this.clientUserState = User;
        } catch (e:Dynamic) {
            ErrorsAndLogs.addError('Could not create ClientUser from data: ' + e);
            this.setAnonymousUser();
        }
    }

    public function setLoadingUser() {
        this.clientUserState = Loading;
        mithril.M.redraw();
    }

    function anonymousUser():Dynamic {
        return {
                userData: {
                    firstname:'Anonymous',
                    lastname:'Anonymousson',
                    email:'anon@anon.abc',
                    domains: ['domain1'],
                    access: 0,
                },
                userConfig: {
                    domain: 'domain1',
                }
        };
    }

    //---------------------------------------------------
}



enum ClientUserState {
    Anonymous;
    Loading;
    User;
}
