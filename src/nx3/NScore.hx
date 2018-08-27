package nx3;
import nx3.NBars;
//import thx.core.Uuid;
using Lambda;
/**
 * ...
 * @author Jonas Nyström
 */
@:access(nx3.NBar)
 
class NScore
{
	public var guid(default, null):String;
	public var nbars(default, null):NBars;

	public var configuration(default, default): Dynamic;
	
	public function new(nbars:NBars) 
	{
		this.nbars = nbars;
		for (bar in nbars) bar.nscore = this;
		this.configuration = { };
		this.configuration.test = 123;
		this.configuration.rtempo = 80;
		this.configuration.rlength = 3;		
		this.guid = cx.GUID.create();
		
		this.playbackSounds = [];
	}
	
	
	public var playbackSounds:Array<String>;
	public var playbackTempo:Int;
	
	
	public function getNBar(idx:Int):NBar return (idx < 0 || idx > this.nbars.length) ? null : this.nbars[idx];
	
	public function iterator() return this.nbars.iterator();
	public var length (get, null):Int;
	private function get_length():Int return this.nbars.length;		
	
	var tag:String = null;
	public function getTag():String {
		if (tag != null) return tag;
		var bartags = '';
		this.nbars.iter(function(nbar) bartags += nbar.getTag());
		return tag = '#$bartags';			
	}
	
}