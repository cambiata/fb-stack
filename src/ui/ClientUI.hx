package ui;

import model.SiteModel;
import js.Browser;
import firebase.Firebase;
import utils.*;
import mithril.M.Mithril;
import mithril.M;
import mithril.M.m;
import Client;
import model.UserModel;
import model.ContentModel;
import model.ErrorsAndLogs;
import model.ApiCalls;

using StringTools;
using model.ContentModel;
using cx.ArrayTools;

class ClientUI {
    
    static public var VALID_COLOR='white';
    static public var INVALID_COLOR='#faa';    
    
    public static var instance(default, null):ClientUI = new ClientUI();
    
    private function new () {}  // private constructor

    public function init() {
        
        var element = js.Browser.document.querySelector;       
        M.mount(element('header'), new UIHeader());
        M.mount(element('main'), new UIMain());

        var routeHandler:SimpleRouteResolver = { 
            onmatch: function(args, path) {
                trace(args);
                trace(path);
                return null;
            },
            render:function(vnode) {
                return m('div', 'RouteHandler');
            }
        }

        var routes = {
            "/": routeHandler,
            "/yxa": routeHandler,
        }       
        
        M.route(element('#routes'), '/', routes); 
    }

}

typedef SimpleRouteResolver = {
	function onmatch(args : haxe.DynamicAccess<String>, requestedPath : String) : Dynamic;
	function render(vnode : Null<Vnode<Dynamic>>) : Vnodes;
}


enum abstract Colors(String) to String {
    var Valid = 'white';
    var Invalid = '#fcc';
}

class UIMain implements Mithril {
    public function new() {
    }
    
    public function view() {

        var filter = switch UserModel.instance.currentUser {
            case Data(currentUser):
                {filterRooms: [currentUser.userConfig.domain], filterAccess: currentUser.userData.access};
            case _:
                {filterRooms: [SiteModel.instance.siteConfig.domains.first().name] , filterAccess: 0};
        }

        return [
            new UIContentTree(filter).view(),
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
            m('div.stateitems', '' + ContentModel.instance.contentTree),
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
        return m('form', [
            m('div', ''),
            m('h2', 'Välkommen, ' + userData.firstname + ' ' + userData.lastname + '!' + ' access:' + userData.access + ' active domain:' + this.clientUser.userConfig.domain),
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

typedef ContentTreeFilter = {
    filterRooms:Array<String>, 
    filterAccess:Int,
}

class UIContentTree implements Mithril {

    public function new(filter:ContentTreeFilter=null) {
        this.filter = filter;
    }

    var filter:ContentTreeFilter;

    public function view() {
        return switch ContentModel.instance.contentTree {
            case Nil: m('h1', 'Nil');
            case Loading: m('h1', 'Loading');
            case Data(ct): 
                //var ct = (this.filter != null && this.filter.filterRooms != null) ? contentTree.filterContentTree(this.filter.filterRooms) : contentTree;
                var path = '/tree/' + ct.id;
                m('details[open]', [m('summary', 'ContentTree ' + ct.id)].concat(ct.children.map(child-> cast new UIRoom(child, path, filter).view() )) );
        }
    }
}

class UIRoom implements Mithril {
    public function new(item:Room, parentPath:String, filter:ContentTreeFilter) {
        this.item = item;
        this.path = parentPath + '/' + item.id;
        this.filter = filter;
    }
    var filter:ContentTreeFilter;
    var path:String;
    var item:Room = null;
    public function view() {

        var showItem = (filter != null && filter.filterRooms.has(item.id));
        var cssClass = showItem ? '.open' : '.protected';

        var children = (this.item.children != null) ? this.item.children : [];
        var anchor = m('a', {href:this.path, oncreate: M.routeLink }, 'Room ' + item.id );
        return m('details[open]$cssClass', [m('summary', [anchor])].concat(children.map(child-> cast new UIShelf(child, this.path, this.filter).view() )) );
    }
}

class UIShelf implements Mithril {
    public function new(item:Shelf, parentPath:String, filter:ContentTreeFilter) {
        this.item = item;
        this.path = parentPath + '/' + item.id;
        this.filter = filter;
    }
    var  filter:ContentTreeFilter;
    var path:String;
    var item:Shelf;
    public function view() {

        var showItem = (filter != null && filter.filterAccess >= item.access);
        var cssClass = showItem ? '.open' : '.protected';

        var children = (this.item.children != null) ? this.item.children : [];
        var anchor = m('a', {href:this.path, oncreate: M.routeLink }, 'Shelf ' + item.title + ':'  + item.id + ' access:' + item.access);
        return m('details[open].$cssClass', [m('summary',[anchor])].concat(children.map(child-> cast new UIBook(child, this.path, this.filter).view() )) );
    }
}

class UIBook implements Mithril {
    public function new(item:Book, parentPath:String, filter:ContentTreeFilter) {
        this.item = item;
        this.path = parentPath + '/' + item.id;
        this.filter = filter;
    }
    var filter:ContentTreeFilter;
    var path:String;
    var item:Book = null;
    public function view() {

        var showItem = (filter != null && filter.filterAccess >= item.access);
        var cssClass = showItem ? '.open' : '.protected';

        var children = (this.item.children != null) ? this.item.children : [];
        var anchor = m('a', {href:this.path, oncreate: M.routeLink }, 'Book ' + item.title + ':'  + item.id + ' access:' + item.access);
        return m('details[open].$cssClass', [m('summary', [anchor])].concat(children.map(child-> cast new UIChapter(child, this.path, this.filter).view() )) );
    }
}

class UIChapter implements Mithril {
    public function new(item:Chapter, parentPath:String, filter:ContentTreeFilter) {
        this.item = item;
        this.path = parentPath + '/' + item.id;
        this.filter = filter;
    }
    var filter:ContentTreeFilter;
    var path:String;
    var item:Chapter = null;
    public function view() {

        var showItem = (filter != null && filter.filterAccess >= item.access);
        var cssClass = showItem ? '.open' : '.protected';

        var children = (this.item.children != null) ? this.item.children : [];
        var anchor = m('a', {href:this.path, oncreate: M.routeLink }, 'Chapter ' + item.title + ':'  + item.id + ' access:' + item.access);
        return m('details[open]$cssClass', [m('summary', [anchor])].concat(children.map(child-> cast new UIChapter(child, this.path, this.filter).view() )) );
    }
}