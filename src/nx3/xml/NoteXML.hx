package nx3.xml;
import cx.EnumTools;
import nx3.EDirectionUAD;
import nx3.EDirectionUD;
import nx3.ELyricContinuation;
import nx3.ENoteArticulation;
import nx3.ENoteAttributes;
import nx3.ENoteVal;
import nx3.NHead;
import nx3.NNote;
import nx3.ENoteType;
import nx3.ENotationVariant;
import nx3.EPosition;


using nx3.xml.HeadXML;
using nx3.ENoteValTools;
/**
 * ...
 * @author 
 */
class NoteXML
{
	static public inline var XNOTE								:String = "note";
	static public inline var XPAUSE								:String = "pause";
	static public inline var XPAUSE_LEVEL						:String = "level";

	static public inline var XLYRIC								:String = "lyric";
	static public inline var XLYRIC_TEXT						:String = "text";
	static public inline var XUNDEFINED							:String = "undefined";
	
	static public inline var XPITCH							:String = "pitch";
	static public inline var XPITCH_LEVEL							:String = "level";
	static public inline var XPITCH_MIDINOTE							:String = "midinote";
	
	static public inline var XTPL							:String = "tpl";
	static public inline var XTPL_LEVEL							:String = "level";
	static public inline var XTPL_SIGN							:String = "sign";

	
	
	
	static public inline var XNOTE_TYPE							:String = "type";
	static public inline var XNOTE_TYPE_NOTE					:String = "note";
	static public inline var XNOTE_TYPE_NOTATION_VARIANT		:String = "variant";
	static public inline var XNOTE_VALUE						:String = "value";
	static public inline var XNOTE_VAL						:String = "val";
	static public inline var XNOTE_DIRECTION					:String = "direction";
	static public inline var XNOTE_TYPE_PAUSE					:String = "pause";
	static public inline var XNOTE_TYPE_NOTE_ARTICULATIONS		:String = "articulations";
	static public inline var LIST_DELIMITER						:String = ";";
	static public inline var XNOTE_TYPE_NOTE_ATTRIBUTES			:String = "attributes";
	static public inline var XOFFSET							:String = "offset";
	static public inline var XLYRIC_CONTINUATION				:String = "continuation";
	static public inline var XLYRIC_FORMAT						:String = "format";
	static public inline var XTPL_PAUSE						:String = "pause";

	static public function toXml(note:NNote):Xml
	{
		var xml:Xml = null; 
		
		// type
		switch(note.type)
		{
			//---------------------------------------------------------------------------------------------------------------------------
			case (ENoteType.Note(heads, variant, articulations, attributes)):
				xml = Xml.createElement(XNOTE);		
						
				for (head in heads) {
					var headXml = head.toXml();
					xml.addChild(headXml);
				}				
				
				if (variant != null) xml.set(XNOTE_TYPE_NOTATION_VARIANT, Std.string(variant));
				
				if (articulations != null)
				{
					var articulationStrings:Array<String>= [];
					for (articulation in articulations)
					{
						articulationStrings.push(Std.string(articulation));						
					}
					xml.set(XNOTE_TYPE_NOTE_ARTICULATIONS, articulationStrings.join(LIST_DELIMITER));
				}
				
				if (attributes != null )
				{
					var attributesStrings:Array<String> = [];
					for (attribute in attributes)
					{
						attributesStrings.push(Std.string(attribute));
					}
					xml.set(XNOTE_TYPE_NOTE_ATTRIBUTES, attributesStrings.join(LIST_DELIMITER));
				}
				
			//---------------------------------------------------------------------------------------------------------------------------	
			case (ENoteType.Pause(level)):				
				xml = Xml.createElement(XPAUSE);		
				if (level != 0) xml.set(XPAUSE_LEVEL, Std.string(level));
			
			//---------------------------------------------------------------------------------------------------------------------------	
			case(ENoteType.Lyric(text, offset, continuation, format)):				
				xml = Xml.createElement(XLYRIC);		
				xml.set(XLYRIC_TEXT, text);
				if (continuation != null) xml.set(XLYRIC_CONTINUATION, Std.string(continuation));
				if (offset != null) xml.set(XOFFSET, Std.string(offset));
				if (format != null) xml.set(XLYRIC_FORMAT, Std.string(format));
				
			case (ENoteType.Pitch(level, midinote)):
				xml = Xml.createElement(XPITCH);
				if (level != 0) xml.set(XPITCH_LEVEL, Std.string(level));
				if (midinote != 0) xml.set(XPITCH_MIDINOTE, Std.string(midinote));
			
			case (ENoteType.Tpl(level, sign, pause)): 
				xml = Xml.createElement(XTPL);
				xml.set(XTPL_LEVEL, Std.string(level));
				// sign		
				if (sign != ESign.None) xml.set(XTPL_SIGN, Std.string(sign));						
				if (pause == true) xml.set(XTPL_PAUSE, 'true');
				
			default:
				xml = Xml.createElement(XUNDEFINED);	
		}
		
		// value
		if (note.value.value() != ENoteVal.Nv4.value())
		{
			//xml.set(XNOTE_VALUE, Std.string(note.value.value()));
			xml.set(XNOTE_VAL, Std.string(note.value.toValString()));			
		}
		
		// direction		
		if (note.direction != EDirectionUAD.Auto) xml.set(XNOTE_DIRECTION, Std.string(note.direction));
		
		return xml;
	}
	
	static public function fromXmlStr(xmlStr:String):NNote
	{
		var xml = Xml.parse(xmlStr).firstElement();		
		
		var xmlType:String = xml.nodeName;	
		var type:ENoteType = null;
		
		switch(xmlType)
		{
			
			//---------------------------------------------------------------------------------------------------------------------------
			case XNOTE:
				var heads:Array<NHead> = [];				
				for (h in xml.elementsNamed(HeadXML.XHEAD)) 
				{
					var head = HeadXML.fromXmlStr(h.toString());
					heads.push(head);
				}				
				
				var variant:ENotationVariant = EnumTools.createFromString(ENotationVariant, xml.get(XNOTE_TYPE_NOTATION_VARIANT));			
				//if (variant == null) variant = ENoteVariant.Normal;
				
				var articulations:Array<ENoteArticulation> = [];
				var articulationsStr:String = xml.get(XNOTE_TYPE_NOTE_ARTICULATIONS);				
				if (articulationsStr != null)
				{
					var articulationStrings:Array<String> = articulationsStr.split(LIST_DELIMITER);
					for (articulationStr in articulationStrings)
					{
						articulations.push(EnumTools.createFromString(ENoteArticulation, articulationStr));
					}
				}
				if (articulations.length == 0) articulations = null;
				
				var attributes:Array<ENoteAttributes> = [];
				var attributesStr:String = xml.get(XNOTE_TYPE_NOTE_ATTRIBUTES);				
				if (attributesStr != null)
				{
					var attributesStrings:Array<String> = attributesStr.split(LIST_DELIMITER);
					for (attributeStr in attributesStrings)
					{
						attributes.push(EnumTools.createFromString(ENoteAttributes, attributeStr));
					}
				}				
				if (attributes.length == 0) attributes = null;
				
				type = ENoteType.Note(heads, variant, articulations, attributes);

			//---------------------------------------------------------------------------------------------------------------------------
			case XPAUSE:				
				var pauseLevelStr = xml.get(XPAUSE_LEVEL);
				var levelInt:Int = (pauseLevelStr == null) ? 0 : Std.parseInt(pauseLevelStr);
				type = ENoteType.Pause(levelInt);
				
			//---------------------------------------------------------------------------------------------------------------------------
			case XLYRIC:
				var text = xml.get(XLYRIC_TEXT);								
				var offsetStr = xml.get(XOFFSET);
				var offset:EPosition = EnumTools.createFromString(EPosition, offsetStr);
				var continuationStr = xml.get(XLYRIC_CONTINUATION);				
				var continuation:ELyricContinuation = EnumTools.createFromString(ELyricContinuation, continuationStr);
				
				//var formatStr = xml.get(XLYRIC_FORMAT);
				//var format:ELyricFormat = EnumTools.createFromString(ELyricFormat, formatStr);				
				//TODO!
				type = ENoteType.Lyric(text, offset, continuation);
				
			case XPITCH:	
				var levelstr = xml.get(XPITCH_LEVEL);
				var level = (levelstr != null) ? Std.parseInt(levelstr) : 0;
				var midinotestr = xml.get(XPITCH_MIDINOTE);
				var midinote = (midinotestr != null) ? Std.parseInt(midinotestr) : 0;
				type = ENoteType.Pitch(level, midinote);
				
			case XTPL:
				var levelstr = xml.get(XTPL_LEVEL);
				var level = (levelstr != null) ? Std.parseInt(levelstr) : 0;
				var sign:ESign = EnumTools.createFromString(ESign, xml.get(XTPL_SIGN));
				var pausestr = xml.get(XTPL_PAUSE);
				var pause:Bool = (pausestr != null && pausestr.toLowerCase() == 'true');
				
				type = ENoteType.Tpl(level, sign, pause);
				
		}
		
		// value
		//var valStr = xml.get(XNOTE_VALUE);
		//var val:Int = (valStr == null) ? ENoteVal.Nv4.value() : Std.parseInt(xml.get(XNOTE_VALUE));
		//var value:ENoteVal = ENoteValue.getFromValue(val);
		
		var valStr = xml.get(XNOTE_VAL);
		var value:ENoteVal = ENoteValTools.fromValString(valStr);
		
		
		//var value:ENoteVal = ENoteValTools.getFromValue(val);
		
		// direction		
		var direction:EDirectionUAD = EnumTools.createFromString(EDirectionUAD, xml.get(XNOTE_DIRECTION));
		
		return new  NNote(type, value, direction);
	}
	
	static public function test(item:NNote):Bool
	{
		var str = toXml(item).toString();		
		var item2 = fromXmlStr(str);
		var str2 = toXml(item2).toString();
		trace(str);
		trace(str2);
		return (str == str2);
	}
	
	static public function clone(nnote:NNote):NNote
	{
		return NoteXML.fromXmlStr(NoteXML.toXml(nnote).toString());		
	}
	
	
}