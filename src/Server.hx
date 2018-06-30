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
        app.get('/timestamp', function(req:Request, res) {           
            res.send('Haxe and Express test! ' + Date.now().getTime());
        });

        app.get('/auth', function(req:Request, res:Response) {          
            try {
                var tokenId = req.get('Authorization').split('Bearer ')[1];
                Admin.auth().verifyIdToken(tokenId)
                .then(verified->return Admin.auth().getUser(verified.uid))
                .then(user -> {
                    res.send('Verified User: ' + user.email);
                    res.end();
                }).catchError(e->res.send('error2:' + e));
            } catch (e:Dynamic) {
                res.send('error:' + e);
            }
        }G);



        exports.app = Functions.https.onRequest(app);  
    }
}