package client2;

import data.ClientUser;
import client2.UserManager;
import mithril.M;

class Header {
	private function new() {}

	public static var instance(default, null):Header = new Header();

	public function init() {
		M.mount(js.Browser.document.querySelector('#userinfo'), new UserView());
	}
}

// class HeaderView implements Mithril {
// 	public function new() {}
// 	public function view() {
// 		return [m('div', 'HeaderView')];
// 	}
// }
class UserViewX implements Mithril {
	public function new() {}

	public function view() {
		return [m('div', 'Mitrhil UserView')];
	}
}

class UserView implements Mithril {
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

	function loginView()
		return try {
			m('form', [
				m("input[type=input][placeholder='Email']", {
					oninput: e -> this.email = e.target.value,
					value: this.email,
				}),
				m("input[type=password][placeholder='Password']", {
					oninput: e -> this.pass = e.target.value,
					value: this.pass,
				}),
				m("button[type=button]", {
					onclick: e -> {
						UserManager.instance.signIn(this.email, this.pass);
					}
				}, 'Logga in')
			]);
		} catch (e:Dynamic) {
			trace('error $e');
			m('div.error', e);
		}

	function loggedinView()
		return try {
			var selectvalues:Array<Array<String>> = ContentManager.instance.content.rooms.map(room -> [room.id, 'Gå till ' + room.title]);
			selectvalues.push(['logout', 'Logga ut']);
			selectvalues.unshift([
				'user',
				UserManager.instance.user.firstname + ' ' + UserManager.instance.user.lastname
			]);
			m('form', [
				// m('div', 'Välkommen, ' + UserModel.instance.user.firstname + ' ' + UserModel.instance.user.lastname),
				// m("button[type=button]", { onclick: e -> {
				//     UserLoader.instance.signOut();
				// }}, 'Logga ut'),
				m('select.loggedin', {
					onchange: e -> {
						trace(e.target.selectedIndex);
						trace(e.target.value);
						// var roomIdx = e.target.selectedIndex;
						// var roomId = ContentModel.instance.content.rooms[roomIdx].id;
						// FilterModel.instance.setFilterContent({roomId:roomId, bookId:null, shelfId:null, chapterId:null, subchapterId:null});
						switch e.target.value {
							case 'user':
							case 'logout':
								UserManager.instance.signOut();
							case _:
								var roomId = e.target.value;
								// FilterModel.instance.setFilterContent({
								// 	roomId: roomId,
								// 	bookId: null,
								// 	shelfId: null,
								// 	chapterId: null,
								// 	subchapterId: null
								// });
						}
						e.target.selectedIndex = 0;
					}
				}, selectvalues.map(kv -> {
						m('option', {value: kv[0], key: kv[1]}, kv[1]);
					})),
			]);
		} catch (e:Dynamic) {
			trace('error $e');
			m('div.error', e);
		}

	function userView()
		return try {
			switch UserManager.instance.userState {
				case Loading: m('div', 'Loading...');
				case Anonymous: m('div', [loginView(),]);
				case User(user): m('div', [loggedinView(),]);
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
			// m('h2', '' + (FilterModel.instance.getRoom() != null ? FilterModel.instance.getRoom().title : 'No room loaded!')),
			userView(),
		];
	}
}
