package data;
import utils.UserEmail;
import utils.UserPassword;

class UserData implements DataClass {
    public var firstname:String;
    public var lastname:String;
    public var email:UserEmail;
    public var domains:Array<String> = ['kak'];
    public var access:Int = 1;
}

class UserConfig implements DataClass {
    public var domain:String;
}

class ClientUser implements DataClass {
    public var userData:UserData;
    public var userConfig:UserConfig;    
}
// 

class CurrentUser implements DataClass {
    public var userData:UserData;
    public var userConfig:UserConfig;
}