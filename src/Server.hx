import firebase.EventType;
import haxe.Json;
import js.npm.express.Request;
import js.npm.express.Response;
import js.npm.Express;
import js.Node.exports;
import firebase.Admin;
import functions.Functions;

class Server {
    static public function main() {


        // Init Firebase admin
        Admin.initializeApp(Functions.config().firebase);
        
        //exports.helloWorld = Functions.https.onRequest((request, response) -> response.send("Hello from Haxe!"));
        
        // Setup express server
        var app = new Express();

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

        exports.app = Functions.https.onRequest(app);  
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
            var dbpath = 'users/' + userEmail.toPiped();
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

