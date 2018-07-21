package domain;

class Data {}


class UserData implements DataClass {
    public var firstname:String;
    public var lastname:String;
    public var email:utils.UserEmail;
    public var access:Access = Access.Admin;
    public var domains:Domains = [Domain.Kak, Domain.Kantor];
    static public function fromJson(json) return dataclass.JsonConverter.fromJson(UserData, json);
    public function toJson() return dataclass.JsonConverter.toJson(this);
}

class UserDataResponse implements DataClass {
    public var userData:UserData;
    public var errors:Array<String>;
}

enum abstract Access(String) to String {
    var Student = 'student';
    var Admin = 'admin';
    inline public function new(v:String) this = cx.AbstractEnumTools.getValues(Access).indexOf(cast v) > -1 ? v : throw 'Domain value error - can not have a value of "$v"!'; 
    @:from static public function fromString(v:String) return new Access(v); 
}

enum abstract Domain(String) to String {
    var Kak = 'kak';
    var Kantor = 'kantor';
    inline public function new(v:String) this = cx.AbstractEnumTools.getValues(Domain).indexOf(cast v) > -1 ? v : throw 'Domain value error - can not have a value of "$v"!'; 
    @:from static public function fromString(v:String) return new Domain(v); 
    static public function getValues() return cx.AbstractEnumTools.getValues(Domain);
    public function getFullName() return switch this {
        case Kak:'Körakademin';
        case Kantor: 'Kantorsutbildningen';
        case _: 'Unspecified-fullname-for-domain-$this';
    }
    static public function getFullNames() return getValues().map(v->v.getFullName());
}

abstract Domains(Array<Domain>) to Array<Domain> from Array<Domain> {
    inline public function new(v:Array<Domain>) this = v;
    @:from static public function fromStrings(v:Array<String>) return new Domains(v.map(y->new Domain(y)));
}

// {
//   "errors": [
//     "UserEmail1 error: Error: Credential implementation provided to initializeApp() via the \"credential\" property has insufficient permission to access the requested resource. See https://firebase.google.com/docs/admin/setup for details on how to authenticate this SDK with appropriate permissions."
//   ],
//   "userData": {
//     "firstname": "Jonas",
//     "lastname": "Nyström",
//     "email": "jonasnys@gmail.com"
//   }
// }

class SiteConfigData implements DataClass {
    public var arr:Array<String>;
    public var domains:Array<DomainData>;

    static public var defaultValue(default,null):SiteConfigData = new SiteConfigData(
        {
            arr:['A'], 
            domains:[new DomainData({
                name:'default-domain',
                fullname:'Default domain',
                color:'gray',
            })]
        }
    );
}

class DomainData implements DataClass {
    public var name:String = 'shortname';
    public var fullname:String = 'Fullname'; 
    public var color:String = 'grey';
}

class UserConfigData implements DataClass {
    public var domain:String;
}