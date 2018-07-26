package utils;

class Profile {
    public static var instance(default, null):Profile = new Profile();
    private function new () {
        init(); 
    }  // private constructor
    var starttime:Float;

    public function init() this.starttime = Date.now().getTime();
    public function ms() return Date.now().getTime() - starttime;
    public function msString() return ' (ms:' + ms() + ')';

}