package audio;

interface IAnimationHandler {
    function addCallback(cb:Void->Void):Void;
    function clearCallbacks():Void;
    function start():Void;
    function stop():Void;
    function onFrame(time:Float=null):Void;
}

class AnimationFrame implements IAnimationHandler {
    var frameID = null;

    public function new() {
        this.callbacks = [];
    }
    
    public function addCallback(cb:Void->Void) this.callbacks.push(cb);

    public function clearCallbacks() this.callbacks = [];

    var callbacks:Array<Void->Void>;
    public static var instance(default, null): AnimationFrame = new AnimationFrame();

    public function start() {
        this.onFrame();        
    }

    public function stop() {
        js.Browser.window.cancelAnimationFrame(this.frameID);   
    }

    public function onFrame( time:Float=null) {
        this.callbacks.map(cb->cb());
        this.frameID = js.Browser.window.requestAnimationFrame(onFrame);
    }    

}

class AnimationTimer implements IAnimationHandler {    

    public function new(delayMs:Int=100) {
        this.callbacks = [];
        this.delayMs = delayMs;
    }
    var delayMs:Int;

    public function addCallback(cb:Void->Void) this.callbacks.push(cb);

    public function clearCallbacks() this.callbacks = [];

    var callbacks:Array<Void->Void>;
    public static var instance(default, null): AnimationTimer = new AnimationTimer();

    public function start() {
        this.onFrame();        
    }

    public function stop() {
        if (this.timeout != null) js.Browser.window.clearTimeout(this.timeout);
        this.timeout = null;        
    }

    var timeout = null;
    public function onFrame( time:Float=null) {
        this.callbacks.map(cb->cb());
        this.timeout = js.Browser.window.setTimeout(function() {
            onFrame();
        }, delayMs);        
    }    

}