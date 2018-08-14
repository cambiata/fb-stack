package data;
import js.Browser;
import js.html.DivElement;
import mithril.M;

using Lambda;

class ErrorsAndLogs {

    static var element = js.Browser.document.querySelector;
    static public var logs(default,null):Array<String> = [];
    static public function addLog(log:String) {
        logs.unshift(log);
        trace(log);
        // var el = Browser.document.createDivElement();
        // el.textContent = log;
        // element('#logs').appendChild(el);
    }

    static public var errors(default,null):Array<String> = [];
    static public function addErrors(err:Array<String>) {
        err.iter(e-> addError(e));
    }
    static public function addError(e:String) {
        errors.unshift(e);
        trace(e);
        // var el = Browser.document.createDivElement();
        // el.textContent = e;
        // element('#errors').appendChild(el);
    }
    static public function addErrorsIfAny(err:Array<String>) {
        if (err != null && err.length > 0) addErrors(err);
    }
  
}