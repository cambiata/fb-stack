package ui;

// import model.SiteModel;
import js.Browser;
import firebase.Firebase;
import utils.*;
import mithril.M.Mithril;
import mithril.M;
import mithril.M.m;
import Client;
import model.UserModel;
import model.ContentTreeModel;
import model.ErrorsAndLogs;
import model.ApiCalls;
import ui.content.ContentTreeView;
import ui.content.ContentItemView;

using StringTools;
using model.ContentTreeModel;
using cx.ArrayTools;

class ClientUI {
    
    // static public var VALID_COLOR='#dfd';
    // static public var INVALID_COLOR='white';    
    
    public static var instance(default, null):ClientUI = new ClientUI();
    
    private function new () {}  // private constructor

    public function init() {
        
        var element = js.Browser.document.querySelector;       
        M.mount(element('header'), new UIHeader());
        M.mount(element('main'), new UIMain());



        // var routeHandler:SimpleRouteResolver = { 
        //     onmatch: function(args, path) {
        //         trace(args);
        //         trace(path);
        //         ErrorsAndLogs.addLog('RouteResolver:$path: ' + args + '');
        //         return null;
        //     },
        //     render:function(vnode) {
        //         return m('div', 'RouteHandler');
        //     }
        // }

        // var routes = {
        //     "/": routeHandler,
        //     "/yxa": routeHandler,
        //     "/shelf/:tree/:room/:shelf": routeHandler,
        // }       
        
        // M.route(element('#routes'), '/', routes); 
    }

}



enum abstract Colors(String) to String {
    var Valid = '#dfd';
    var Invalid = 'white';
}

class UIMain implements Mithril {
    public function new() {
    }
    
    public function view() {
        var filter = switch UserModel.instance.currentUser {
            case Data(currentUser):
                {filterRooms: [currentUser.userConfig.domain], filterAccess: currentUser.userData.access};
            case _:
                {filterRooms: ['kak'] , filterAccess: 0};
        }

        return [
            new ContentTreeView(filter).view(),
            new ContentItemView().view(),
            new StateMonitor().view(),
        ];
    }
}

class StateMonitor implements Mithril {
    public function new() {}

    public function view() {
        return m('div', [
            m('div.statelabel', 'logs:'),
            m('div.stateitems', ErrorsAndLogs.logs.map(e->m('div.stateitem.statelog', ''+e))),
            m('div.statelabel', 'errors:'),
            m('div.stateitems', ErrorsAndLogs.errors.map(e->m('div.stateitem.stateerror', ''+e))),
            m('div.statelabel', 'content-tree'),
            m('div.stateitems', '' + ContentTreeModel.instance.contentTree),
            // new UIContentTree().view(),
        ]);
    }
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
        var homeroom:Room = ContentTreeModel.instance.contentTree.getData().filterHomeRoom();
        return m('form', [
            m('div', ''),
            m('h3', {style:{color:homeroom.textcolor}},'Välkommen, ' + userData.firstname + ' ' + userData.lastname + '!' + ' access:' + userData.access + ' active domain:' + this.clientUser.userConfig.domain),
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

        var homeroom:Room = ContentTreeModel.instance.contentTree.getData().filterHomeRoom();
        var element = js.Browser.document.querySelector; 
        var elHeader:js.html.Element = element('header');
        elHeader.style.backgroundColor = homeroom.color;

        var userView = switch UserModel.instance.currentUser {
                case Data(d): cast this.logoutform.setUser(d).view() ;
                case Loading: m('h2', {style:{textAlign:'right', paddingRight:'1em'}}, 'Loading user data...');
                case Nil: cast this.loginform.view();
            };
        return [
            m('h1', {style:{color:homeroom.textcolor}}, '' + homeroom.title),
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

