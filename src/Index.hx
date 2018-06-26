import js.npm.Express;
import js.Node.exports;
import firebase.Admin;
import functions.Functions;

class Index {
    static public function main() {
        Admin.initializeApp(Functions.config().firebase);
        
        exports.helloWorld = Functions.https.onRequest((request, response) -> response.send("Hello from Haxe!"));
        
        var app = new Express();
        app.get('/timestamp', function(req, res) {           
            res.send('Haxe and Express serving! ' + Date.now().getTime());
        });
        exports.app = Functions.https.onRequest(app);  
    }
}