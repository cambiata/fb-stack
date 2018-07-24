package model;

class SiteConfig implements DataClass {
    public var arr:Array<String> = [];
    public var domains:Array<DomainData> = [];

    static public function defaultValues():SiteConfig return new SiteConfig(
        {
            arr:['A'], 
            domains:[
                new DomainData({name:'kak',fullname:'Körakademin',color:'blue'}),
                new DomainData({name:'kantor',fullname:'Kantorsutbildningen',color:'red'}),
            ],
        }
    );
}

class DomainData implements DataClass {
    public var name:String = 'shortname';
    public var fullname:String = 'Fullname'; 
    public var color:String = 'grey';

    static public function getDefault() return new DomainData({name:'default', fullname:'Default domain', color:'yellow'});
}



