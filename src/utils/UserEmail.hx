package utils;
using StringTools;

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

  static function makePiped(email:String) return email.replace('@', '||').replace('.', '|');

  public function toPiped() return makePiped(this);
  
  static public function fromPiped(pipedEmail:String) {
      var pa = pipedEmail;
      pa = StringTools.replace(pa, '||', '@');
      pa = StringTools.replace(pa, '|', '.');
      return new UserEmail(pa);
  }

}