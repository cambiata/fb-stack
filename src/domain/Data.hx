package domain;

class Data {}


class UserData implements DataClass {
    public var firstname:String;
    public var lastname:String;
    public var email:utils.UserEmail;
    public var domains:Array<String> = ['default'];
    public var access:Int = 2;
}

class UserDataResponse implements DataClass {
    public var userData:UserData;
    public var errors:Array<String>;
}

class SiteConfigData implements DataClass {
    public var arr:Array<String> = [];
    public var domains:Array<DomainData> = [];

    // static public var defaultValue(default,null):SiteConfigData = new SiteConfigData(
    //     {
    //         arr:['A'], 
    //         domains:[new DomainData({
    //             name:'default-domain',
    //             fullname:'Default domain',
    //             color:'gray',
    //         })]
    //     }
    // );
}

class DomainData implements DataClass {
    public var name:String = 'shortname';
    public var fullname:String = 'Fullname'; 
    public var color:String = 'grey';

    static public function getDefault() return new DomainData({name:'default', fullname:'Default domain', color:'yellow'});
}

class UserConfigData implements DataClass {
    public var domain:String;
}