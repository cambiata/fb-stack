package utils;

class Tests {
    static public function main() {
        trace ('Nisse');
        var e:UserEmail = 'jonas.nys@gmail.com';
        trace(e);
        trace(e.toPiped());
        var piped = e.toPiped();
        trace(piped);
        var unpiped = UserEmail.fromPiped(piped);
        trace(unpiped);
    }
}