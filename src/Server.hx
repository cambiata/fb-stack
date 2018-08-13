import firebase.auth.UserRecord;
import firebase.admin.App;
import js.Lib;
import firebase.EventType;
import haxe.Json;
import js.npm.express.Request;
import js.npm.express.Response;
import js.npm.Express;
import js.Node.exports;
import firebase.Admin;
import functions.Functions;

using StringTools;

class Server {

    // static final USER_TABLE = '/user';

    static public function main() {

        // Init Firebase admin
        Admin.initializeApp(Functions.config().firebase);        

        // Setup express server
        var app = new Express();
        setupRoutes(app);
        setupTriggers(app);  
        setupTestRoutes(app);
        exports.app = Functions.https.onRequest(app);       
    }

    static public function setupRoutes(app:js.npm.Express) {
       // Get authorized userData from realtime database /users document
        app.get('/api/userdata', AppMiddlewares.mwErrors, AppMiddlewares.mwToken, AppMiddlewares.mwUserEmail, AppMiddlewares.mwUserData, (req:Request, res:Response)->{            
            trace('Route /api/userdata' + ' ---------------------------------');
            res.json({errors:res.locals.errors, userData:res.locals.userData});
            res.end();
        });

        app.get('/api/userconfig', AppMiddlewares.mwErrors, AppMiddlewares.mwToken, AppMiddlewares.mwUserEmail, AppMiddlewares.mwUserData, (req:Request, res:Response)->{            
            var userEmail:utils.UserEmail = res.locals.userEmail;
            var dbpath = 'user-config/' + userEmail.toPiped();
            Admin.database().ref(dbpath).once(firebase.EventType.Value, (snap)->{
                var userconfigdata = snap.val();
                trace('userconfigdata: ' + userconfigdata);
                res.json({userData:res.locals.userData, userConfig :userconfigdata, dbpath:dbpath, errors:res.locals.errors});
                res.end();
            }, failure-> {
                res.json({userData:res.locals.userData, userConfig:null, dbpath:dbpath, errors:res.locals.errors});
                res.end();
            });

        });

        app.get('/api/content-tree', (req:Request, res:Response)->{ 
            var dbpath = 'content-tree';
            Admin.database().ref(dbpath).once(firebase.EventType.Value, (snap)->{
                res.json({errors:[], data:snap.val()});
                res.end();
            }); 
        });

        app.get('/api/test/:items', (req:Request, res:Response)->{ 
            var data = [];
            var items:Array<String> = Std.string(req.params.items).split(',').map(s->s.trim()).filter(s->s.length>0);
            trace(items);
            var promises = items.map(s-> Admin.database().ref('content-item').child(s).once(EventType.Value)
            .then(snap->{
                trace('id:$s content:'+ snap.val());
                return js.Promise.resolve({id:s, content:snap.val()});
            }));
            
            return js.Promise.all(promises)
            .then(items->{
                res.json({items:items, errors:[]});
            }).catchError(e->{
                res.json({items:[], errors:[e]});
            });
        });

         





    }

    static public function setupTriggers(app:js.npm.Express) {
   
        exports.usersOnCreate = Functions.database.ref('/user/{dbId}').onCreate((snapshot, context)->{
            trace('haxe fnDbRefSyncusersOnWrite on Create');
            var object:Dynamic = snapshot.val();                        
            var dbId = context.params.dbId;
            var user = {        
                email: object.email,
                emailVerified: false,
                password: object.pass,
                photoURL: "http://www.example.com/12345678/photo.png",
                disabled: false              
            };
            return Admin.auth().createUser(user);
        });

        exports.usersOnDelete = Functions.database.ref('/user/{dbId}').onDelete((snapshot, context)->{            
            trace('Delete!');
            var dbId = context.params.dbId;
            var email = dbId.replace('||', '@').replace('|', '.');
            trace('email' + email);
            return Admin.auth().getUserByEmail(email)
            .then(data->{
                var userRecord:UserRecord = data;
                var uid = userRecord.uid;
                trace('uid:' + uid);
                return Admin.auth().deleteUser(uid);
            });
        });
    }
    
    static public function setupTestRoutes(app:js.npm.Express) {
        app.get('/api/test/:par1', (req:Request, res:Response)->{
            var par1 = Std.string(req.params.par1);
            res.json('Api test ' + par1);
            res.end();
        });       
    }

}

class AppMiddlewares {

    static public function mwErrors(req:Request, res:Response, next:Dynamic) {
        res.locals.errors = [];
        next();
    }

    static public function mwToken(req:Request, res:Response, next:Dynamic) {
        trace('Middleware mwToken ***************************');
        var token:String = null;
        try {
            token = req.get('Authorization').split('Bearer ')[1];
            trace('token: ' + token.substr(0, 50) + '...');
        } catch (e:Dynamic) {
            res.locals.errors.push('Middleware mwToken error: ' + e);
        }
        res.locals.token = token;
        next();
    }    

    static public function mwUserEmail(req:Request, res:Response, next:Dynamic) {
        trace('Middleware mwUserEmail ***************************');
        var userEmail:Dynamic = null;
        try {
            var token = res.locals.token;
            Admin.auth().verifyIdToken(token)
            .then(verified->return Admin.auth().getUser(verified.uid))
            .then(user -> {
                res.locals.userEmail = user.email;
                trace('userEmail = ' + res.locals.userEmail);
                next();    
            }).catchError(e->{
                res.locals.errors.push('Middleware mwUserEmail error 1: ' + e);
                // Hack to work localhost
                if (Std.string(e).indexOf('Error: Credential implementation') >-1 ) {
                    trace('localhost error!');
                    res.locals.userEmail = 'jonasnys@gmail.com';
                }
                next();
            });
        } catch (e:Dynamic) {
            res.locals.errors.push('Middleware mwUserEmail error 2: ' + e);
            next();    
        }
    }

    static public function mwUserData(req:Request, res:Response, next:Dynamic) {
        trace('Middleware mwUserData ***************************');
        try {
            var userEmail:utils.UserEmail = res.locals.userEmail;
            // trace('mw userdata' + userEmail);
            var dbpath = 'user/' + userEmail.toPiped();
            trace('dbpath: ' + dbpath);
            Admin.database().ref(dbpath).once(firebase.EventType.Value, (snap)->{
                // trace('mw snap: ----------------');
                res.locals.userData = snap.val();
                res.locals.userData.email = userEmail;
                trace('User data: ' + res.locals.userData);
                next();
            }, failure-> {
                trace('Middleware mwUserData error 1: ' + failure);
                res.locals.userData = null;
                res.locals.errors.push(''+failure);
                next();
            });
        } catch (e:Dynamic) {
            trace('Middleware mwUserData error 2: ' + e);
            res.locals.userData = null;
            res.locals.errors.push(''+e);        
            next();
        }
    }

}

