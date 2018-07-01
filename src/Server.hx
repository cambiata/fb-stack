import haxe.Json;
import js.npm.express.Request;
import js.npm.express.Response;
import js.npm.Express;
import js.Node.exports;
import firebase.Admin;
import functions.Functions;

class Server {
    static public function main() {

        Admin.initializeApp(Functions.config().firebase);
        
        exports.helloWorld = Functions.https.onRequest((request, response) -> response.send("Hello from Haxe!"));
        
        var app = new Express();

        function log(req:Request, res:Response, next:Dynamic) {
            trace(Date.now().getTime() + ' ' + 'logging');
            //untyped req.test = 'abc';
            next();
        }

        // Todo: Untyped
        app.use(log);

        app.get('/timestamp', function(req:Request, res) {           
            res.send('Haxe and Express test! ' + Date.now().getTime());
        });

        app.get('/auth', function(req:Request, res:Response) {    
            try {
                var tokenId = req.get('Authorization').split('Bearer ')[1];
                Admin.auth().verifyIdToken(tokenId)
                .then(verified->return Admin.auth().getUser(verified.uid))
                .then(user -> {
                    res.send(Json.stringify({verifiedUser:user.email}));                    
                    res.end();
                }).catchError(e->res.send('error2:' + e));
            } catch (e:Dynamic) {
                res.send('error:' + e);
            }
        });

        // Todo: Untyped
        app.get('/api', (req:Request, res:Response)->{            
            res.send('Hello from api');
            res.end();
        });

        // app.get('/api/test', (req:Request, res:Response)->{
        //     res.send('api/test');
        //     res.end();
        // });

        exports.app = Functions.https.onRequest(app);  
    }
}

