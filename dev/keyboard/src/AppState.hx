package;

/**
 * AppState
 * @author Jonas Nyström
 */
import haxe.ds.IntMap;

typedef AppState = { text:String, keysActive:KeysActive, keyboard:KeyboardDef, keysHover:KeysHover, keysPressed:KeysPressed };

typedef KeysActive = IntMap<String>;

typedef KeysHover = Array<Int>;

typedef KeysPressed = Array<Int>;

typedef KeyboardDef = {
	lowestKey:Int,
	highestKey:Int,	
}