package nx3;

/**
 * NPartUtils
 * @author Jonas Nyström
 */
class NPartUtils 
{
	static public function createPausePart(beats:Int=4):NPart 
	{
		var notes = [];
		for (i in 0 ... beats) {
			notes.push(new NNote(ENoteType.Pause(0), [new NHead(0)], ENoteVal.Nv4));
			
		}
		return new NPart([new NVoice(notes)]);
	}
	
}