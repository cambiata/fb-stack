package ui;

import js.Browser;
import firebase.Firebase;
import utils.*;
import mithril.M;
import mithril.M.m;
import Client;
import model.UserModel;
import model.ContentModel;
import model.ErrorsAndLogs;
import model.ApiCalls;

using StringTools;

class ClientUI {
    static public var VALID_COLOR='white';
    static public var INVALID_COLOR='#faa';
}

enum abstract Colors(String) to String {
    var Valid = 'white';
    var Invalid = '#fcc';
}

class MInputEmail<T:{email:String, validEmail:Bool}> implements Mithril {
    public var state:T;
    public function new(state:T) {
        this.state = state;
    };
    public function view() return m("input[type=input][placeholder='Email']#email", {style:{backgroundColor:state.validEmail ? ''+Colors.Valid : ''+Colors.Invalid }, onkeyup:e->validate(e), onchange:e->validate(e), autofill:e->validate(e)});
    function validate(e) {
        var str = e.target.value;
        var valid = UserEmail.isValid(str);
        trace ('$str Is valid email: ' + valid);
        state.email = str;
        state.validEmail = valid;
        M.redraw();
        return valid;
    }
}

class MInputPassword<T:{password:String,validPassword:Bool}> implements Mithril {
    public var state:T;
    public function new(state:T) {
        this.state = state;
    };
    public function view() return m("input[type=password][placeholder='Password']#password", {style:{backgroundColor:state.validPassword ? ''+Colors.Valid : ''+Colors.Invalid }, onkeyup:e->validate(e), onchange:e->validate(e), autofill:e->validate(e)});
    function validate(e) {
        var str = e.target.value;
        var valid = UserPassword.isValid(str);
        trace ('$str Is valid password: ' + valid);
        state.password = str;
        state.validPassword = valid;
        M.redraw();
        return valid;
    }
}

class MLoginForm implements Mithril {

    public var state:{email:String, validEmail:Bool, password:String,validPassword:Bool} = null;
    public function new() {
        this.state = {email:'', validEmail:false, password:'', validPassword:false};
    }
    public function view() {
        var enabled = state.validEmail && state.validPassword;
        var disabledString = enabled ? '' : '[disabled]';
        return m('form', [
            cast new MInputEmail(this.state).view(),
            cast new MInputPassword(this.state).view(),
            m('button[type=button]$disabledString', {onclick:e->{ submitCallback(state.email, state.password); }}, 'Logga in'),
            // m('div', '' + this.state),
        ]);
    }

    public var submitCallback : (email:String, password:String)->Void = (email, password)->{
        trace('callback $email, $password');
    };
}

class MLogoutForm implements Mithril {
    
    public function new(clientUser:CurrentUser=null) {
        this.clientUser = clientUser;
    }
    var clientUser:CurrentUser;

    public function view() {
        if (this.clientUser == null) return m('div', 'clientUser == null');
        var userData:UserData = this.clientUser.userData;
        return m('form', [
            m('div', ''),
            m('h2', 'Välkommen, ' + userData.firstname + ' ' + userData.lastname + '!'),
			m("button[type=button]", { onclick: e -> {
				UserModel.instance.signOut();
			}}, 'Logout'), 
            // m('div',''+clientUser),
        ]);
    }

    public function setUser(u:CurrentUser) {
        this.clientUser = u;
        return this;
    }
}

class UIHeader implements Mithril {

    var loginform:MLoginForm = null;
    var logoutform:MLogoutForm = null;
    public function new() {
        this.loginform = new MLoginForm();
        this.logoutform = new MLogoutForm();
        this.loginform.submitCallback = (email, password)->UserModel.instance.signIn(email, password);
    }

    public function view() {
        var userView = switch UserModel.instance.currentUser {
                case Data(d): cast this.logoutform.setUser(d).view() ;
                case Loading: m('h2', {style:{textAlign:'right', paddingRight:'1em'}}, 'Loading user data...');
                case Nil: cast this.loginform.view();
            };
        return [
            m('h2', 'Header'),
            userView,
        ];
    }

}



class TestUI implements Mithril {
    public function new() {
    }

    public function view() {
        return [
            m('button', { onclick: e -> {
                ApiCalls.getAuthRequest('/api/userdata')
                .then(data->{
                    ErrorsAndLogs.addLog(haxe.Json.stringify(data));
                    trace('userData result: ' + haxe.Json.stringify(data));
                }).catchError(error->{
                    trace('userData error: ' + error);
                    ErrorsAndLogs.addError(error);

                });
            }}, 'Test /api/userData '), 

            m('button', { onclick: e -> {
                ApiCalls.getAuthRequest('/api/userconfig')
                .then(data->{
                    trace('userconfig result: ' + haxe.Json.stringify(data));
                    ErrorsAndLogs.addLog(haxe.Json.stringify(data));
                }).catchError(error->{
                    trace('userconfig error: ' + error);
                    ErrorsAndLogs.addError(error);

                });
            }}, 'Test /api/userConfig '), 

            m('button', { onclick: e -> {
                ApiCalls.getRequest('/api/content-tree')
                .then(data->{
                    trace('content-tree result: ' + haxe.Json.stringify(data));
                    ErrorsAndLogs.addLog(haxe.Json.stringify(data));
                }).catchError(error->{
                    trace('content-tree error: ' + error);
                    ErrorsAndLogs.addError(error);

                });
            }}, 'Test /api/content-treeB '), 
        ];
    }

}

class UIContentTree implements Mithril {

    public function new() {

    }

    public function view() {
        return switch ContentModel.instance.contentTree {
            case Nil: m('h1', 'Nil');
            case Loading: m('h1', 'Loading');
            case Data(d): [
                m('div', 'ContentTree ' + d.id ),
                m('div.padleft', d.rooms.map(room-> new UIRoom(room).view() )),
            ];
        }
    }
}

class UIRoom implements Mithril {
    public function new(room:Room) {
        this.room = room;
    }
    var room:Room = null;
    public function view() {
        return [
            m('div', 'Room ' + this.room.id ),
            m('div.padleft', this.room.shelves.map(shelf -> new UIShelf(shelf).view())),
        ];
    }
}

class UIShelf implements Mithril {
    public function new(item:Shelf) {
        this.item = item;
    }
    var item:Shelf = null;
    public function view() {
        return [
            m('div', 'Shelf ' + this.item.id ),
            m('div.padleft', this.item.books.map(item2 -> new UIBook(item2).view())),
        ];
    }
}

class UIBook implements Mithril {
    public function new(item:Book) {
        this.item = item;
    }
    var item:Book = null;
    public function view() {
        return [
            m('div', 'Book ' + this.item.id ),
            m('div', this.item.chapters.map(item2 -> new UIChapter(item2).view())),
        ];
    }
}

class UIChapter implements Mithril {
    public function new(item:Chapter) {
        this.item = item;
    }
    var item:Chapter = null;
    public function view() {
        return [
            m('div', 'Chapter ' + this.item.id ),
            this.item.chapters != null ? m('div.padleft', this.item.chapters.map(item2 -> new UIChapter(item2).view())) : null,
        ];
    }
}