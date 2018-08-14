package ui;
import mithril.M;
import utils.*;
import Client;
import data.*;
import data.ClientUser;
import data.UserModel;

/*
class MInputEmail<T:{email:String, validEmail:Bool}> implements Mithril {
    public var state:T;
    public function new(state:T) {
        this.state = state;
    };
    public function view() return m("input[type=input][placeholder='Email']#email", {style:{backgroundColor:state.validEmail ? ''+Colors.Valid : ''+Colors.Invalid }, onkeyup:e->validate(e), onchange:e->validate(e), autofill:e->validate(e)});
    function validate(e) {
        var str = e.target.value;
        var valid = UserEmail.isValid(str);
        // trace ('$str Is valid email: ' + valid);
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
        // trace ('$str Is valid password: ' + valid);
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
    
    public function new(clientUser:ClientUser=null) {
        this.clientUser = clientUser;
    }
    var clientUser:ClientUser;

    public function view() {
        if (this.clientUser == null) return m('div', 'clientUser == null');
        var userData:UserData = this.clientUser.userData;
        // var homeroom:Room = ContentTreeModel.instance.contentTree.getData().filterHomeRoom();
        return m('form', [


            m('div', 'Välkommen, ' + userData.firstname + ' ' + userData.lastname + '!' + ' access:' + userData.access),
            // m('h3', {style:{color:homeroom.textcolor}},'Välkommen, ' + userData.firstname + ' ' + userData.lastname + '!' + ' access:' + userData.access + ' active domain:' + this.clientUser.userConfig.domain),
			m("button[type=button]", { onclick: e -> {
				UserLoader.instance.signOut();
			}}, 'Logga ut'), 
            // m('div',''+clientUser),
        ]);
    }

    public function setUser(u:ClientUser) {
        this.clientUser = u;
        return this;
    }
}
*/

class UIHeader implements Mithril {

    // var loginform:MLoginForm = null;
    // var logoutform:MLogoutForm = null;
    public function new() {
        // this.loginform = new MLoginForm();
        // this.logoutform = new MLogoutForm();
        // this.loginform.submitCallback = (email, password)->UserLoader.instance.signIn(email, password);
        this.email = '';
        this.pass = '';        
    }

    var email:String = '';
    var pass:String = '';

    public function view() {

        // var homeroom:Room = ContentTreeModel.instance.contentTree.getData().filterHomeRoom();
        // var element = js.Browser.document.querySelector; 
        // var elHeader:js.html.Element = element('header');
        // elHeader.style.backgroundColor = homeroom.color;

        // var userView = switch UserModel.instance.userState {
        //         case User(user): 
        //             var user = UserModel.instance.clientUser;
        //             cast this.logoutform.setUser(user).view() ;
        //         case Loading: m('div', 'Loading user data...');
        //         case Anonymous: cast this.loginform.view();
        //     };

        var loginView = m('form', [
            m("input[type=input][placeholder='Email']", {
                oninput: e->this.email = e.target.value,
                value: this.email,
            }),
            m("input[type=password][placeholder='Password']", {
                oninput: e->this.pass = e.target.value,
                value: this.pass,
            }),
			m("button[type=button]", { onclick: e -> {
				UserLoader.instance.signIn(this.email, this.pass);
			}}, 'Logga in')
        ]);

        var logoutView = m('form', [
           m('div', 'Välkommen, ' + UserModel.instance.user.firstname + ' ' + UserModel.instance.user.lastname),
            // m('h3', {style:{color:homeroom.textcolor}},'Välkommen, ' + userData.firstname + ' ' + userData.lastname + '!' + ' access:' + userData.access + ' active domain:' + this.clientUser.userConfig.domain),
			m("button[type=button]", { onclick: e -> {
				UserLoader.instance.signOut();
			}}, 'Logga ut'), 
        ]);

        var userView = switch UserModel.instance.userState {
            case Loading: m('div', 'Loading...');
            case Anonymous: m('div', [
                loginView,
            ]);
            case User(user): m('div', [
                logoutView,
            ]);
        }

        return [
            m('h3', '' + UserModel.instance.userState),
            userView,
        ];
    }
}


// class UIHeaderX implements Mithril {

//     var loginform:MLoginForm = null;
//     var logoutform:MLogoutForm = null;
//     public function new() {
//         this.loginform = new MLoginForm();
//         this.logoutform = new MLogoutForm();
//         this.loginform.submitCallback = (email, password)->UserModel.instance.signIn(email, password);
//     }

//     public function view() {

//         // var homeroom:Room = ContentTreeModel.instance.contentTree.getData().filterHomeRoom();
//         var element = js.Browser.document.querySelector; 
//         var elHeader:js.html.Element = element('header');
//         // elHeader.style.backgroundColor = homeroom.color;

//         var userView = switch UserModel.instance.currentUser {
//                 case Data(d): cast this.logoutform.setUser(d).view() ;
//                 case Loading: m('h2', {style:{textAlign:'right', paddingRight:'1em'}}, 'Loading user data...');
//                 case Nil: cast this.loginform.view();
//             };
//         return [
//             m('h1', 'Headertext'),
//             userView,
//         ];
//     }
// }