package audio;

import audio.Audio;
import js.html.ArrayBuffer;
import js.html.audio.AudioBuffer;
import js.html.audio.AudioContext;
import js.html.audio.AnalyserNode;
import js.html.audio.GainNode;
import js.html.audio.AudioBufferSourceNode;
import js.html.XMLHttpRequestResponseType;
import js.html.XMLHttpRequest;

typedef BufferAndUrl = {url:String, buffer:AudioBuffer};

class AudioBufferLoader {
    static public function load(url:String):js.Promise<BufferAndUrl> {        
        return new js.Promise<{url:String, buffer:AudioBuffer}>((res, rej)->{
            trace('load $url');
            var request = new XMLHttpRequest();
            request.open('GET', url, true);
            request.responseType = XMLHttpRequestResponseType.ARRAYBUFFER;
            request.onload = function (_) {        
                Audio.instance.context.decodeAudioData(
                    request.response,
                    function(buffer:AudioBuffer) {
                        trace('Loaded and decoded track $url');                        
                        if (buffer == null) rej('error decoding file data: ' + url);
                        res({url:url, buffer:buffer});
                    },
                    function() {
                        rej('decodeAudioData error ');		
                    }
                );
            }
            request.send();
        });
    }
}
