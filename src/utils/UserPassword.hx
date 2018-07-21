package utils;

abstract UserPassword(String) to String from String {
    static public function isValid(str:String) return str.length > 3;
}