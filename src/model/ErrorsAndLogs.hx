package model;
import mithril.M;

using Lambda;

class ErrorsAndLogs {

    static public var logs(default,null):Array<String> = [];
    static public function addLog(log:String) {
        logs.unshift(log);
        M.redraw();
    }

    static public var errors(default,null):Array<String> = [];
    static public function addErrors(err:Array<String>) {
        err.iter(e-> addError(e));
    }
    static public function addError(e:String) {
        errors.unshift(e);
        M.redraw();
    }
    static public function addErrorsIfAny(err:Array<String>) {
        if (err != null && err.length > 0) addErrors(err);
    }
  
}