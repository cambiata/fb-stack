package data;
import mithril.M;

// Wrapper for api calls
class ApiCalls {
    static public function getAuthRequest(url) {

        return getFBUserToken()
        .then(token->{
            var h:haxe.DynamicAccess<String> = {authorization: 'Bearer ' + token };
            var request = {
                method: 'get',
                url: url,
                headers: h
            };
            ErrorsAndLogs.addLog('AuthRequest: $url');
            M.request(request);       
        }); 
    }

    static public function getRequest(url) {
            var request = {
            method: 'get',
            url: url,
            // headers: h
        };
        ErrorsAndLogs.addLog('Request: $url');
        return M.request(request);            
    }

    static public function getFBCurrentUser() return firebase.Firebase.auth().currentUser;

    static public function getFBUserToken():js.Promise<Dynamic> {
        return getFBCurrentUser() != null ? getFBCurrentUser().getIdToken() : new js.Promise<Dynamic>((res,rej)->rej("Firebase.auth().currentUser == null")); // returns .then(function(token)->token)
    }

}