package model;
import mithril.M;

// Wrapper for api calls
class ApiCalls {
    static public function getAuthRequest(url) {

        return UserModel.instance.getFBUserToken()
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
}