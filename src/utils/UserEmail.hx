package utils;

abstract UserEmail(String) to String {
    static var ereg = ~/^[\w-\.]{2,}@[\w-\.]{2,}\.[a-z]{2,6}$/i;

    static public function isValid(address:String):Bool {
      return ereg.match(address);
    }
  inline public function new(address:String) {
    if (isValid(address)) throw 'EmailAddress "$address" is invalid';
    this = address.toLowerCase();
  }

  @:from inline static public function fromString(address:String) {
    return new UserEmail(address);
  }

    public function toPiped() {
        var pa = this;
        pa = StringTools.replace(pa, '@', '||');
        pa = StringTools.replace(pa, '.', '|');
        return pa;
    }
    
    static public function fromPiped(pipedEmail:String) {
        var pa = pipedEmail;
        pa = StringTools.replace(pa, '||', '@');
        pa = StringTools.replace(pa, '|', '.');
        return new UserEmail(pa);
    }
}