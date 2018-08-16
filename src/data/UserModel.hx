package data;

import data.ClientUser;
using dataclass.JsonConverter;
import firebase.Firebase;
import utils.UserEmail;
import utils.UserPassword;

class UserModel {
    public static var instance(default, null):UserModel = new UserModel();
 
    private function new () {}  // private constructor

    public var user(get, never):UserData;
    function get_user():UserData return this.userState.toData();

    public var userState(default, set):UserState = Anonymous;
    public function set_userState(state:UserState) {
        this.userState = state;
        mithril.M.redraw();
        return this.userState;
    }

    public function init() {
        this.userState = Anonymous;
        #if start_user
        this.userState = User(new UserData({lastname:'Nyström', firstname:'Jonas', email:'jonasnys@gmail.com', domains:['kak'], access:2}));
        #end
    }
}

abstract UserState(UserMode) from UserMode to UserMode {
    
    public inline function new(mode:UserMode) {
        this = mode;
    }
    
    @:to public function toData():UserData return switch this {
        case Anonymous: anonymousUser();
        case Loading: anonymousUser();
        case User(user): user;
    }
    
    @:from static public function fromData(val:UserData) return new UserState(User(val));

    static inline function anonymousUser():Dynamic {
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
}

enum UserMode {
    Anonymous;
    Loading;
    User(user:UserData);
}

