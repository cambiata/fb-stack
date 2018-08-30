package client2;

import data.ClientUser;
import data.ApiCalls;
import firebase.Firebase;
import js.Promise;
import utils.*;

using dataclass.JsonConverter;

class UserManager {
	private function new() {}

	public static var instance(default, null):UserManager = new UserManager();

	public var user(get, never):UserData;

	function get_user():UserData
		return this.userState.toData();

	public var userState(default, set):UserState = Anonymous;

	public function set_userState(state:UserState) {
		this.userState = state;
		mithril.M.redraw();
		return this.userState;
	}

	public function init() {
		this.userState = Anonymous;
		#if start_user
		this.userState = User(new UserData({
			lastname: 'Nyström',
			firstname: 'Jonas',
			email: 'jonasnys@gmail.com',
			domains: ['kak'],
			access: 2
		}));
		#end
		trace(this.user);
	}

	// onAuthStateChanged as promise!
	// https://github.com/firebase/firebase-js-sdk/issues/462
	public function getCurrentBrowserUser() {
		return new js.Promise((resolve, reject) -> {
			var unsubscribe:Dynamic = null;
			unsubscribe = Firebase.app().auth().onAuthStateChanged(user -> {
				unsubscribe();
				resolve(cast user);
			}, reject);
		});
	}

	public function startSession() {
		this.userState = Loading;

		return this.getCurrentBrowserUser().then(browserUser -> {
			if (browserUser == null) {
				this.userState = Anonymous;
				return null;
			}
			trace('Browser user found');
			return ApiCalls.getAuthRequest('/api/userconfig');
		}).then(dataResponse -> {
			trace(dataResponse);
			if (dataResponse == null)
				return null;
			var data:Dynamic = dataResponse;
			this.userState = User(UserData.fromJson(data.userData));
			// this.setLoadedUserFromData(data);
			trace('------------------------------------');
			trace('UserModelLoaded');
		}).then(val -> {
			return this.setupOnAuthChange();
		}).then(val -> {
			trace('finished User loading!');
			return js.Promise.resolve(true);
		});
	}

	public function setupOnAuthChange() {
		haxe.Timer.delay(() -> {
			firebase.Firebase.app().auth().onAuthStateChanged(user -> {
				if (user != null) {
					trace('--- Browser session user found.');

					trace('compare:' + user.email + ' ' + this.userState.toData().email);
					if (user.email == this.userState.toData().email)
						return null;

					this.userState = Loading;
					ApiCalls.getAuthRequest('/api/userconfig').then(dataResponse -> {
						var data:Dynamic = dataResponse;
						// this.setLoadedUserFromData(data);
						trace('------------------------------------');
						trace('UserModelLoaded : onAuthStateChanged');
						trace('' + data);
						var data:Dynamic = dataResponse;
						this.userState = User(UserData.fromJson(data.userData));
					}).catchError(error -> {
						trace('--- Could not load userconfig for browser session user');
						trace(error);
					});

					return null;
				} else {
					trace('--- No browser session user found.');
					this.userState = Anonymous;
					return null;
				}
			}, error -> {
				trace('--- Error: ' + error);
				this.userState = Anonymous;
			});
		}, 2000);

		return Promise.resolve(true);
	}

	public function signIn(email:String, password:String) {
		validate(email, password).then(valid -> {
			// UserModel.instance.setLoadingUser();
			this.userState = Loading;
			return cast firebase.Firebase.auth().signInWithEmailAndPassword(email, password);
		}).then(user -> {
			trace('USER ' + user);
			return null;
		}).catchError(error -> {
			trace('ERROR' + error);
			trace('error:' + error);
			this.userState = Anonymous;
			return null;
		});
	}

	public function signOut() {
		firebase.Firebase.auth().signOut();
		this.userState = Anonymous;
	}

	function validate(email:String, password:String) {
		return new js.Promise<Bool>((res, rej) -> {
			try {
				if (!UserEmail.isValid(email))
					throw 'User email is not valid: $email';
				if (!UserPassword.isValid(password))
					throw 'User password is not valid: $password';
				res(true);
			} catch (e:Dynamic) {
				rej(e);
			}
		});
	}
}

abstract UserState(UserMode) from UserMode to UserMode {
	public inline function new(mode:UserMode) {
		this = mode;
	}

	@:to public function toData():UserData
		return switch this {
			case Anonymous: anonymousUser();
			case Loading: anonymousUser();
			case User(user): user;
		}

	@:from static public function fromData(val:UserData)
		return new UserState(User(val));

	static inline function anonymousUser():Dynamic {
		return {
			userData: {
				firstname: 'Anonymous',
				lastname: 'Anonymousson',
				email: 'anon@anon.abc',
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
