package ui;
import mithril.M;
import utils.*;
import Client;
import data.*;
import data.ClientUser;
import data.UserModel;

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

    function loginView() return try {
        m('form', [
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
    } catch (e:Dynamic) { 
        trace('error $e');
        m('div.error', e); 
    }

    function loggedinView() return try {

        var selectvalues:Array<Array<String>> = ContentModel.instance.content.rooms.map(room->[room.id, 'Gå till ' + room.title]);
        selectvalues.push(['logout', 'Logga ut']);
        selectvalues.unshift(['user', UserModel.instance.user.firstname + ' ' + UserModel.instance.user.lastname]);

        m('div', [
            // m('div', 'Välkommen, ' + UserModel.instance.user.firstname + ' ' + UserModel.instance.user.lastname),            
            // m("button[type=button]", { onclick: e -> {
            //     UserLoader.instance.signOut();
            // }}, 'Logga ut'), 

           m('select.loggedin', {onchange:e->{                    
                    
                    
                    trace(e.target.selectedIndex);
                    trace(e.target.value);
                    // var roomIdx = e.target.selectedIndex;
                    // var roomId = ContentModel.instance.content.rooms[roomIdx].id;
                    // FilterModel.instance.setFilterContent({roomId:roomId, bookId:null, shelfId:null, chapterId:null, subchapterId:null});
                    switch e.target.value {
                        case 'user': 
                        case 'logout':  UserLoader.instance.signOut();
                        case _: 
                            var roomId = e.target.value;
                            FilterModel.instance.setFilterContent({roomId:roomId, bookId:null, shelfId:null, chapterId:null, subchapterId:null});                                                    
                    }
                    e.target.selectedIndex = 0;


                }}, selectvalues.map(kv->{                
                m('option', {value:kv[0], key:kv[1]}, kv[1]);
            })),


        ]);
    } catch (e:Dynamic) { 
        trace('error $e');
        m('div.error', e); 
    }

    function userView() return try {
        switch UserModel.instance.userState {
            case Loading: m('div', 'Loading...');
            case Anonymous: m('div', [
                loginView(),
            ]);
            case User(user): m('div', [
                loggedinView(),
            ]);   
        }    
    } catch (e:Dynamic) { 
        trace('error $e');
        m('div.error', e); 
    }



    public function view() {
        // var loginView = m('form', [
        //     m("input[type=input][placeholder='Email']", {
        //         oninput: e->this.email = e.target.value,
        //         value: this.email,
        //     }),
        //     m("input[type=password][placeholder='Password']", {
        //         oninput: e->this.pass = e.target.value,
        //         value: this.pass,
        //     }),
		// 	m("button[type=button]", { onclick: e -> {
		// 		UserLoader.instance.signIn(this.email, this.pass);
		// 	}}, 'Logga in')
        // ]);

        // var logoutView = m('form', [
        //    m('div', 'Välkommen, ' + UserModel.instance.user.firstname + ' ' + UserModel.instance.user.lastname),
        //     // m('h3', {style:{color:homeroom.textcolor}},'Välkommen, ' + userData.firstname + ' ' + userData.lastname + '!' + ' access:' + userData.access + ' active domain:' + this.clientUser.userConfig.domain),
		// 	m("button[type=button]", { onclick: e -> {
		// 		UserLoader.instance.signOut();
		// 	}}, 'Logga ut'), 
        // ]);

        // var userView = switch UserModel.instance.userState {
        //     case Loading: m('div', 'Loading...');
        //     case Anonymous: m('div', [
        //         loginView(),
        //     ]);
        //     case User(user): m('div', [
        //         loggedinView(),
        //     ]);
        // }

        return [
            m('h2', '' + FilterModel.instance.getRoom().title),
            userView(),
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