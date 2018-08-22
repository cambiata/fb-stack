// Generated by Haxe 4.0.0-preview.4+1e3e5e016
(function ($global) { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); },$hxEnums = {},$_;
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var App = function() {
	this.document = null;
	this.window = null;
	this.timeDomainBuffer = new Float32Array(1024);
	this.rafID = null;
	this.pitch = new audio_pitch_PitchB();
	this.isPlaying = false;
	this.playbackAudioBuffer = null;
	this.document = window.document;
	this.window = window;
	if(this.window.cancelAnimationFrame == null) {
		console.log("src/App.hx:38:","cancelAnimationFrame error");
	}
	this.setupUI();
	this.loadSoundFile("/sounds/whistling3.ogg");
};
App.__name__ = true;
App.prototype = {
	setupUI: function() {
		this.detectorElem = this.document.getElementById("detector");
		this.canvasElem = this.document.getElementById("output");
		this.DEBUGCANVAS = this.document.getElementById("waveform");
		if(this.DEBUGCANVAS != null) {
			this.waveCanvas = this.DEBUGCANVAS.getContext("2d",null);
			this.waveCanvas.strokeStyle = "black";
			this.waveCanvas.lineWidth = 1;
		}
		this.pitchElem = this.document.getElementById("pitch");
		this.noteElem = this.document.getElementById("note");
		this.detuneElem = this.document.getElementById("detune");
		this.detuneAmount = this.document.getElementById("detune_amt");
	}
	,loadSoundFile: function(url) {
		var _gthis = this;
		audio_AudioBufferLoader.load(url).then(function(bufferAndUrl) {
			console.log("src/App.hx:62:","loaded");
			_gthis.playbackAudioBuffer = bufferAndUrl.buffer;
			_gthis.togglePlayback();
			return;
		})["catch"](function(err) {
			console.log("src/App.hx:67:",err);
			return;
		});
	}
	,stopAnyting: function() {
		if(this.playbackSourceNode != null) {
			this.playbackSourceNode.stop(0);
			this.playbackSourceNode = null;
		}
		if(this.oscillatorSourceNode != null) {
			this.oscillatorSourceNode.stop(0);
			this.oscillatorSourceNode = null;
		}
		this.isPlaying = false;
		this.window.cancelAnimationFrame(this.rafID);
	}
	,togglePlayback: function() {
		var _gthis = this;
		var startPlayback = function() {
			_gthis.playbackSourceNode = audio_Audio.instance.context.createBufferSource();
			_gthis.playbackSourceNode.buffer = _gthis.playbackAudioBuffer;
			_gthis.playbackSourceNode.loop = true;
			_gthis.pitch.getAnalyser(_gthis.playbackSourceNode).connect(audio_Audio.instance.context.destination);
			_gthis.playbackSourceNode.start(0);
			_gthis.isPlaying = true;
			_gthis.updatePitch();
		};
		if(this.isPlaying) {
			this.stopAnyting();
		} else {
			startPlayback();
		}
	}
	,toggleOscillator: function() {
		var _gthis = this;
		var startOscillator = function() {
			_gthis.oscillatorSourceNode = audio_Audio.instance.context.createOscillator();
			_gthis.pitch.getAnalyser(_gthis.oscillatorSourceNode).connect(audio_Audio.instance.context.destination);
			_gthis.oscillatorSourceNode.start(0);
			_gthis.isPlaying = true;
			_gthis.updatePitch();
		};
		if(this.isPlaying) {
			this.stopAnyting();
		} else {
			startOscillator();
		}
	}
	,toggleLiveInput: function() {
		var _gthis = this;
		var startLiveInput = function() {
			var gotStreamA = function(stream) {
				var mediaStreamSource = audio_Audio.instance.context.createMediaStreamSource(stream);
				_gthis.pitch.getAnalyser(mediaStreamSource);
				_gthis.updatePitch();
				return null;
			};
			_gthis.getUserMedia({ "audio" : { "mandatory" : { "googEchoCancellation" : "false", "googAutoGainControl" : "false", "googNoiseSuppression" : "false", "googHighpassFilter" : "false"}, "optional" : []}},gotStreamA);
		};
		if(this.isPlaying) {
			this.stopAnyting();
		} else {
			startLiveInput();
		}
	}
	,drawWaveform: function(buf) {
		if(this.DEBUGCANVAS == null) {
			return;
		}
		this.waveCanvas.clearRect(0,0,512,256);
		this.waveCanvas.strokeStyle = "red";
		this.waveCanvas.beginPath();
		this.waveCanvas.moveTo(0,0);
		this.waveCanvas.lineTo(0,256);
		this.waveCanvas.moveTo(128,0);
		this.waveCanvas.lineTo(128,256);
		this.waveCanvas.moveTo(256,0);
		this.waveCanvas.lineTo(256,256);
		this.waveCanvas.moveTo(384,0);
		this.waveCanvas.lineTo(384,256);
		this.waveCanvas.moveTo(512,0);
		this.waveCanvas.lineTo(512,256);
		this.waveCanvas.stroke();
		this.waveCanvas.strokeStyle = "black";
		this.waveCanvas.beginPath();
		this.waveCanvas.moveTo(0,buf[0]);
		var _g = 1;
		while(_g < 512) {
			var i = _g++;
			this.waveCanvas.lineTo(i,128 + buf[i] * 128);
		}
		this.waveCanvas.stroke();
	}
	,updatePitch: function(time) {
		var hz = this.pitch.getHerz();
		this.pitchElem.innerText = hz == null ? "null" : "" + hz;
		this.rafID = this.window.requestAnimationFrame($bind(this,this.updatePitch));
	}
	,getUserMedia: function(dictionary,callback) {
		var promise = navigator.mediaDevices.getUserMedia(dictionary);
		promise.then(function(stream) {
			return callback(stream);
		})["catch"](function(e) {
			console.log("src/App.hx:183:",e.name + " " + e.message);
			return;
		});
	}
};
var mithril_Mithril = function() { };
mithril_Mithril.__name__ = true;
var Main = function() {
	this.app = new App();
};
Main.__name__ = true;
Main.__interfaces__ = [mithril_Mithril];
Main.main = function() {
	m.mount(window.document.querySelector("main"),new Main());
};
Main.prototype = {
	view: function() {
		var _gthis = this;
		if(arguments.length > 0 && arguments[0].tag != this) return arguments[0].tag.view.apply(arguments[0].tag, arguments);
		return [m.m("h1","Hello from Mithril"),m.m("button",{ onclick : function(e) {
			console.log("src/Main.hx:22:","button1 clicked!");
			_gthis.app.togglePlayback();
			return;
		}},"Btn1"),m.m("button",{ onclick : function(e1) {
			console.log("src/Main.hx:26:","button2 clicked!");
			_gthis.app.toggleLiveInput();
			return;
		}},"Btn2"),m.m("button",{ onclick : function(e2) {
			console.log("src/Main.hx:30:","button3 clicked!");
			_gthis.app.toggleOscillator();
			return;
		}},"Btn13")];
	}
};
Math.__name__ = true;
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
var audio_Audio = function() {
	this.context = new AudioContext();
};
audio_Audio.__name__ = true;
var audio_IPlayback = function() { };
audio_IPlayback.__name__ = true;
var audio_AudioBufferLoader = function() { };
audio_AudioBufferLoader.__name__ = true;
audio_AudioBufferLoader.load = function(url) {
	return new Promise(function(res,rej) {
		console.log("src/audio/AudioBufferLoader.hx:18:","load " + url);
		var request = new XMLHttpRequest();
		request.open("GET",url,true);
		request.responseType = "arraybuffer";
		request.onload = function(_) {
			audio_Audio.instance.context.decodeAudioData(request.response,function(buffer) {
				console.log("src/audio/AudioBufferLoader.hx:26:","Loaded and decoded track " + url);
				if(buffer == null) {
					rej("error decoding file data: " + url);
				}
				res({ url : url, buffer : buffer});
			},function() {
				rej("decodeAudioData error ");
			});
		};
		request.send();
		return;
	});
};
var audio_pitch_PitchB = function(useFilters) {
	if(useFilters == null) {
		useFilters = true;
	}
	this.volumeCheck = false;
	this.maxVolume = 128;
	this.fftSize = 2048;
	this.analyserNode = null;
	this.volumeThreshold = 134;
	this.useFilters = useFilters;
	this.sampleRate = audio_Audio.instance.context.sampleRate;
	this.inputBuffer = new Uint8Array(this.fftSize);
};
audio_pitch_PitchB.__name__ = true;
audio_pitch_PitchB.prototype = {
	getAnalyser: function(source) {
		var audioContext = audio_Audio.instance.context;
		this.analyserNode = audioContext.createAnalyser();
		this.analyserNode.fftSize = this.fftSize;
		if(this.useFilters) {
			this.analyserNode.smoothingTimeConstant = 0.8;
			var gainNode = audioContext.createGain();
			gainNode.gain.value = 1.5;
			var lowPassFilter1 = audioContext.createBiquadFilter();
			var lowPassFilter2 = audioContext.createBiquadFilter();
			var highPassFilter1 = audioContext.createBiquadFilter();
			var highPassFilter2 = audioContext.createBiquadFilter();
			lowPassFilter1.Q.value = 0;
			lowPassFilter1.frequency.value = 4200;
			lowPassFilter1.type = "lowpass";
			lowPassFilter2.Q.value = 0;
			lowPassFilter2.frequency.value = 4200;
			lowPassFilter2.type = "lowpass";
			highPassFilter1.Q.value = 0;
			highPassFilter1.frequency.value = 30;
			highPassFilter1.type = "highpass";
			highPassFilter2.Q.value = 0;
			highPassFilter2.frequency.value = 30;
			highPassFilter2.type = "highpass";
			source.connect(lowPassFilter1);
			lowPassFilter1.connect(lowPassFilter2);
			lowPassFilter2.connect(highPassFilter1);
			highPassFilter1.connect(highPassFilter2);
			highPassFilter2.connect(gainNode);
			gainNode.connect(this.analyserNode);
		} else {
			source.connect(this.analyserNode);
		}
		return this.analyserNode;
	}
	,getHerz: function() {
		if(this.analyserNode == null) {
			return -2;
		}
		return this.analyse();
	}
	,analyse: function() {
		this.analyserNode.getByteTimeDomainData(this.inputBuffer);
		var bufferMax = 0.0;
		var _g1 = 0;
		var _g = this.inputBuffer.length;
		while(_g1 < _g) bufferMax = Math.max(bufferMax,this.inputBuffer[_g1++]);
		var bufLenDiv4 = this.inputBuffer.length / 4 | 0;
		var _g11 = 0;
		while(_g11 < bufLenDiv4) {
			var i = _g11++;
			if(this.maxVolume < this.inputBuffer[i]) {
				this.maxVolume = this.inputBuffer[i];
			}
			if(!this.volumeCheck && this.inputBuffer[i] > this.volumeThreshold) {
				this.volumeCheck = true;
			}
		}
		if(this.volumeCheck) {
			return this.Yin_pitchEstimation(this.inputBuffer,this.sampleRate);
		}
		return -1;
	}
	,Yin_pitchEstimation: function(inputBuffer,sampleRate) {
		
        var yinThreshold = 0.15; // allowed uncertainty (e.g 0.05 will return a pitch with ~95% probability)
        var yinProbability = 0.0; // READONLY: contains the certainty of the note found as a decimal (i.e 0.3 is 30%)

        var yinBuffer = new Float32Array(Math.floor(inputBuffer.length/2));
        yinBuffer[0] = 1;
        var runningSum = 0;
        var pitchInHz = 0.0;
        var foundTau = false;
        var minTauValue;
        var minTau = 0;

        for (var tau=1; tau<Math.floor(inputBuffer.length/2); tau++) {
            // Step 1: Calculates the squared difference of the signal with a shifted version of itself.
            yinBuffer[tau] = 0;
            for (var i=0; i<Math.floor(inputBuffer.length/2); i++) {
                yinBuffer[tau] += Math.pow(((inputBuffer[i]-128)/128)-((inputBuffer[i+tau]-128)/128),2);
            }
            // Step 2: Calculate the cumulative mean on the normalised difference calculated in step 1.
            runningSum += yinBuffer[tau];
            yinBuffer[tau] = yinBuffer[tau]*(tau/runningSum);

            // Step 3: Check if the current normalised cumulative mean is over the threshold.
            if (tau > 1) {
                if (foundTau) {
                    if (yinBuffer[tau] < minTauValue) {
                        minTauValue = yinBuffer[tau];
                        minTau = tau;
                    }
                    else break;
                }
                else if (yinBuffer[tau] < yinThreshold) {
                    foundTau = true;
                    minTau = tau;
                    minTauValue = yinBuffer[tau];
                }
            }
        }

        if (minTau == 0) {
            yinProbability = 0;
            pitchInHz = 0.0;
        } else {
            // Step 4: Interpolate the shift value (tau) to improve the pitch estimate.
            minTau += (yinBuffer[minTau+1]-yinBuffer[minTau-1])/(2*((2*yinBuffer[minTau])-yinBuffer[minTau-1]-yinBuffer[minTau+1]));
            pitchInHz = sampleRate/minTau;
            yinProbability = 1-minTauValue;
        }

        return pitchInHz;
        ;
		return 0;
	}
};
var haxe__$Int64__$_$_$Int64 = function(high,low) {
	this.high = high;
	this.low = low;
};
haxe__$Int64__$_$_$Int64.__name__ = true;
var haxe_io_Error = $hxEnums["haxe.io.Error"] = { __ename__ : true, __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"]
	,Blocked: {_hx_index:0,__enum__:"haxe.io.Error",toString:$estr}
	,Overflow: {_hx_index:1,__enum__:"haxe.io.Error",toString:$estr}
	,OutsideBounds: {_hx_index:2,__enum__:"haxe.io.Error",toString:$estr}
	,Custom: ($_=function(e) { return {_hx_index:3,e:e,__enum__:"haxe.io.Error",toString:$estr}; },$_.__params__ = ["e"],$_)
};
var haxe_io_FPHelper = function() { };
haxe_io_FPHelper.__name__ = true;
haxe_io_FPHelper.i32ToFloat = function(i) {
	haxe_io_FPHelper.helper.setInt32(0,i,true);
	return haxe_io_FPHelper.helper.getFloat32(0,true);
};
haxe_io_FPHelper.floatToI32 = function(f) {
	haxe_io_FPHelper.helper.setFloat32(0,f,true);
	return haxe_io_FPHelper.helper.getInt32(0,true);
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	if(Error.captureStackTrace) {
		Error.captureStackTrace(this,js__$Boot_HaxeError);
	}
};
js__$Boot_HaxeError.__name__ = true;
js__$Boot_HaxeError.wrap = function(val) {
	if((val instanceof Error)) {
		return val;
	} else {
		return new js__$Boot_HaxeError(val);
	}
};
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
});
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.__string_rec = function(o,s) {
	if(o == null) {
		return "null";
	}
	if(s.length >= 5) {
		return "<...>";
	}
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) {
		t = "object";
	}
	switch(t) {
	case "function":
		return "<function>";
	case "object":
		if(o.__enum__) {
			var e = $hxEnums[o.__enum__];
			var n = e.__constructs__[o._hx_index];
			var con = e[n];
			if(con.__params__) {
				s += "\t";
				var tmp = n + "(";
				var _g = [];
				var _g1 = 0;
				var _g2 = con.__params__;
				while(_g1 < _g2.length) {
					var p = _g2[_g1];
					++_g1;
					_g.push(js_Boot.__string_rec(o[p],s));
				}
				return tmp + _g.join(",") + ")";
			} else {
				return n;
			}
		}
		if((o instanceof Array)) {
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			var _g11 = 0;
			var _g3 = l;
			while(_g11 < _g3) {
				var i1 = _g11++;
				str += (i1 > 0 ? "," : "") + js_Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e1 ) {
			var e2 = (e1 instanceof js__$Boot_HaxeError) ? e1.val : e1;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				return s2;
			}
		}
		var k = null;
		var str1 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str1.length != 2) {
			str1 += ", \n";
		}
		str1 += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str1 += "\n" + s + "}";
		return str1;
	case "string":
		return o;
	default:
		return String(o);
	}
};
var js_html_compat_ArrayBuffer = function(a) {
	if((a instanceof Array) && a.__enum__ == null) {
		this.a = a;
		this.byteLength = a.length;
	} else {
		var len = a;
		this.a = [];
		var _g1 = 0;
		while(_g1 < len) this.a[_g1++] = 0;
		this.byteLength = len;
	}
};
js_html_compat_ArrayBuffer.__name__ = true;
js_html_compat_ArrayBuffer.sliceImpl = function(begin,end) {
	var u = new Uint8Array(this,begin,end == null ? null : end - begin);
	var result = new ArrayBuffer(u.byteLength);
	new Uint8Array(result).set(u);
	return result;
};
js_html_compat_ArrayBuffer.prototype = {
	slice: function(begin,end) {
		return new js_html_compat_ArrayBuffer(this.a.slice(begin,end));
	}
};
var js_html_compat_DataView = function(buffer,byteOffset,byteLength) {
	this.buf = buffer;
	this.offset = byteOffset == null ? 0 : byteOffset;
	this.length = byteLength == null ? buffer.byteLength - this.offset : byteLength;
	if(this.offset < 0 || this.length < 0 || this.offset + this.length > buffer.byteLength) {
		throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
	}
	this.byteLength = this.length;
	this.byteOffset = this.offset;
	this.buffer = this.buf;
};
js_html_compat_DataView.__name__ = true;
js_html_compat_DataView.prototype = {
	getInt8: function(byteOffset) {
		var v = this.buf.a[this.offset + byteOffset];
		if(v >= 128) {
			return v - 256;
		} else {
			return v;
		}
	}
	,getUint8: function(byteOffset) {
		return this.buf.a[this.offset + byteOffset];
	}
	,getInt16: function(byteOffset,littleEndian) {
		var v = this.getUint16(byteOffset,littleEndian);
		if(v >= 32768) {
			return v - 65536;
		} else {
			return v;
		}
	}
	,getUint16: function(byteOffset,littleEndian) {
		if(littleEndian) {
			return this.buf.a[this.offset + byteOffset] | this.buf.a[this.offset + byteOffset + 1] << 8;
		} else {
			return this.buf.a[this.offset + byteOffset] << 8 | this.buf.a[this.offset + byteOffset + 1];
		}
	}
	,getInt32: function(byteOffset,littleEndian) {
		var p = this.offset + byteOffset;
		var a = this.buf.a[p++];
		var b = this.buf.a[p++];
		var c = this.buf.a[p++];
		var d = this.buf.a[p++];
		if(littleEndian) {
			return a | b << 8 | c << 16 | d << 24;
		} else {
			return d | c << 8 | b << 16 | a << 24;
		}
	}
	,getUint32: function(byteOffset,littleEndian) {
		var v = this.getInt32(byteOffset,littleEndian);
		if(v < 0) {
			return v + 4294967296.;
		} else {
			return v;
		}
	}
	,getFloat32: function(byteOffset,littleEndian) {
		var i = this.getInt32(byteOffset,littleEndian);
		var sign = 1 - (i >>> 31 << 1);
		var e = i >> 23 & 255;
		if(e == 255) {
			if((i & 8388607) == 0) {
				if(sign > 0) {
					return Infinity;
				} else {
					return -Infinity;
				}
			} else {
				return NaN;
			}
		} else {
			return sign * (e == 0 ? (i & 8388607) << 1 : i & 8388607 | 8388608) * Math.pow(2,e - 150);
		}
	}
	,getFloat64: function(byteOffset,littleEndian) {
		var a = this.getInt32(byteOffset,littleEndian);
		var b = this.getInt32(byteOffset + 4,littleEndian);
		var lo = littleEndian ? a : b;
		var hi = littleEndian ? b : a;
		var sign = 1 - (hi >>> 31 << 1);
		var e = hi >> 20 & 2047;
		if(e == 2047) {
			if(lo == 0 && (hi & 1048575) == 0) {
				if(sign > 0) {
					return Infinity;
				} else {
					return -Infinity;
				}
			} else {
				return NaN;
			}
		} else {
			var m1 = 2.220446049250313e-16 * ((hi & 1048575) * 4294967296. + (lo >>> 31) * 2147483648. + (lo & 2147483647));
			if(e == 0) {
				m1 *= 2.0;
			} else {
				m1 += 1.0;
			}
			return sign * m1 * Math.pow(2,e - 1023);
		}
	}
	,setInt8: function(byteOffset,value) {
		this.buf.a[byteOffset + this.offset] = value < 0 ? value + 128 & 255 : value & 255;
	}
	,setUint8: function(byteOffset,value) {
		this.buf.a[byteOffset + this.offset] = value & 255;
	}
	,setInt16: function(byteOffset,value,littleEndian) {
		this.setUint16(byteOffset,value < 0 ? value + 65536 : value,littleEndian);
	}
	,setUint16: function(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p++] = value & 255;
			this.buf.a[p] = value >> 8 & 255;
		} else {
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p] = value & 255;
		}
	}
	,setInt32: function(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,value,littleEndian);
	}
	,setUint32: function(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p++] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >>> 24;
		} else {
			this.buf.a[p++] = value >>> 24;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value & 255;
		}
	}
	,setFloat32: function(byteOffset,value,littleEndian) {
		var tmp;
		if(value == 0) {
			tmp = 0;
		} else {
			var af = value < 0 ? -value : value;
			var exp = Math.floor(Math.log(af) / 0.6931471805599453);
			if(exp > 127) {
				tmp = 2139095040;
			} else {
				if(exp <= -127) {
					exp = -127;
					af *= 7.1362384635298e+44;
				} else {
					af = (af / Math.pow(2,exp) - 1.0) * 8388608;
				}
				tmp = (value < 0 ? -2147483648 : 0) | exp + 127 << 23 | Math.round(af);
			}
		}
		this.setUint32(byteOffset,tmp,littleEndian);
	}
	,setFloat64: function(byteOffset,value,littleEndian) {
		var i64 = haxe_io_FPHelper.i64tmp;
		if(value == 0) {
			i64.low = 0;
			i64.high = 0;
		} else if(!isFinite(value)) {
			i64.low = 0;
			i64.high = value > 0 ? 2146435072 : -1048576;
		} else {
			var av = value < 0 ? -value : value;
			var exp = Math.floor(Math.log(av) / 0.6931471805599453);
			if(exp > 1023) {
				i64.low = -1;
				i64.high = 2146435071;
			} else {
				if(exp <= -1023) {
					exp = -1023;
					av /= 2.2250738585072014e-308;
				} else {
					av = av / Math.pow(2,exp) - 1.0;
				}
				var sig = Math.round(av * 4503599627370496.);
				i64.low = sig | 0;
				i64.high = (value < 0 ? -2147483648 : 0) | exp + 1023 << 20 | (sig / 4294967296.0 | 0);
			}
		}
		if(littleEndian) {
			this.setUint32(byteOffset,i64.low,true);
			this.setUint32(byteOffset + 4,i64.high,true);
		} else {
			this.setUint32(byteOffset,i64.high,false);
			this.setUint32(byteOffset + 4,i64.low,false);
		}
	}
};
var js_html_compat_Float32Array = function() { };
js_html_compat_Float32Array.__name__ = true;
js_html_compat_Float32Array._new = function(arg1,offset,length) {
	var arr;
	if(typeof(arg1) == "number") {
		arr = [];
		var _g1 = 0;
		var _g = arg1;
		while(_g1 < _g) {
			var i = _g1++;
			arr[i] = 0;
		}
		arr.byteLength = arr.length << 2;
		arr.byteOffset = 0;
		var _g2 = [];
		var _g21 = 0;
		var _g11 = arr.length << 2;
		while(_g21 < _g11) {
			var i1 = _g21++;
			_g2.push(0);
		}
		arr.buffer = new js_html_compat_ArrayBuffer(_g2);
	} else if((arg1 instanceof js_html_compat_ArrayBuffer)) {
		var buffer = arg1;
		if(offset == null) {
			offset = 0;
		}
		if(length == null) {
			length = buffer.byteLength - offset >> 2;
		}
		arr = [];
		var _g12 = 0;
		var _g3 = length;
		while(_g12 < _g3) {
			var i2 = _g12++;
			var val = buffer.a[offset++] | buffer.a[offset++] << 8 | buffer.a[offset++] << 16 | buffer.a[offset++] << 24;
			arr.push(haxe_io_FPHelper.i32ToFloat(val));
		}
		arr.byteLength = arr.length << 2;
		arr.byteOffset = offset;
		arr.buffer = buffer;
	} else if((arg1 instanceof Array) && arg1.__enum__ == null) {
		arr = arg1.slice();
		var buffer1 = [];
		var _g4 = 0;
		while(_g4 < arr.length) {
			var f = arr[_g4];
			++_g4;
			var i3 = haxe_io_FPHelper.floatToI32(f);
			buffer1.push(i3 & 255);
			buffer1.push(i3 >> 8 & 255);
			buffer1.push(i3 >> 16 & 255);
			buffer1.push(i3 >>> 24);
		}
		arr.byteLength = arr.length << 2;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(buffer1);
	} else {
		throw new js__$Boot_HaxeError("TODO " + Std.string(arg1));
	}
	arr.subarray = js_html_compat_Float32Array._subarray;
	arr.set = js_html_compat_Float32Array._set;
	return arr;
};
js_html_compat_Float32Array._set = function(arg,offset) {
	if(offset == null) {
		offset = 0;
	}
	if((arg.buffer instanceof js_html_compat_ArrayBuffer)) {
		var a = arg;
		if(arg.byteLength + offset > this.byteLength) {
			throw new js__$Boot_HaxeError("set() outside of range");
		}
		var _g1 = 0;
		var _g = arg.byteLength;
		while(_g1 < _g) {
			var i = _g1++;
			this[i + offset] = a[i];
		}
	} else if((arg instanceof Array) && arg.__enum__ == null) {
		var a1 = arg;
		if(a1.length + offset > this.byteLength) {
			throw new js__$Boot_HaxeError("set() outside of range");
		}
		var _g11 = 0;
		var _g2 = a1.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			this[i1 + offset] = a1[i1];
		}
	} else {
		throw new js__$Boot_HaxeError("TODO");
	}
};
js_html_compat_Float32Array._subarray = function(start,end) {
	var a = js_html_compat_Float32Array._new(this.slice(start,end));
	a.byteOffset = start * 4;
	return a;
};
var js_html_compat_Uint8Array = function() { };
js_html_compat_Uint8Array.__name__ = true;
js_html_compat_Uint8Array._new = function(arg1,offset,length) {
	var arr;
	if(typeof(arg1) == "number") {
		arr = [];
		var _g1 = 0;
		var _g = arg1;
		while(_g1 < _g) {
			var i = _g1++;
			arr[i] = 0;
		}
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else if((arg1 instanceof js_html_compat_ArrayBuffer)) {
		var buffer = arg1;
		if(offset == null) {
			offset = 0;
		}
		if(length == null) {
			length = buffer.byteLength - offset;
		}
		if(offset == 0) {
			arr = buffer.a;
		} else {
			arr = buffer.a.slice(offset,offset + length);
		}
		arr.byteLength = arr.length;
		arr.byteOffset = offset;
		arr.buffer = buffer;
	} else if((arg1 instanceof Array) && arg1.__enum__ == null) {
		arr = arg1.slice();
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else {
		throw new js__$Boot_HaxeError("TODO " + Std.string(arg1));
	}
	arr.subarray = js_html_compat_Uint8Array._subarray;
	arr.set = js_html_compat_Uint8Array._set;
	return arr;
};
js_html_compat_Uint8Array._set = function(arg,offset) {
	if(offset == null) {
		offset = 0;
	}
	if((arg.buffer instanceof js_html_compat_ArrayBuffer)) {
		var a = arg;
		if(arg.byteLength + offset > this.byteLength) {
			throw new js__$Boot_HaxeError("set() outside of range");
		}
		var _g1 = 0;
		var _g = arg.byteLength;
		while(_g1 < _g) {
			var i = _g1++;
			this[i + offset] = a[i];
		}
	} else if((arg instanceof Array) && arg.__enum__ == null) {
		var a1 = arg;
		if(a1.length + offset > this.byteLength) {
			throw new js__$Boot_HaxeError("set() outside of range");
		}
		var _g11 = 0;
		var _g2 = a1.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			this[i1 + offset] = a1[i1];
		}
	} else {
		throw new js__$Boot_HaxeError("TODO");
	}
};
js_html_compat_Uint8Array._subarray = function(start,end) {
	var a = js_html_compat_Uint8Array._new(this.slice(start,end));
	a.byteOffset = start;
	return a;
};
var $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
String.__name__ = true;
Array.__name__ = true;
Object.defineProperty(js__$Boot_HaxeError.prototype,"message",{ get : function() {
	return String(this.val);
}});
var ArrayBuffer = $global.ArrayBuffer || js_html_compat_ArrayBuffer;
if(ArrayBuffer.prototype.slice == null) {
	ArrayBuffer.prototype.slice = js_html_compat_ArrayBuffer.sliceImpl;
}
var DataView = $global.DataView || js_html_compat_DataView;
var Float32Array = $global.Float32Array || js_html_compat_Float32Array._new;
var Uint8Array = $global.Uint8Array || js_html_compat_Uint8Array._new;
try {
var __varName = window.m;
(function(m) {
			if (m.m) return;
			m.m = function() {
				try { 
					for(var i=0; i < arguments.length; ++i) if(arguments[i] instanceof List) {
						var list = arguments[i].h; arguments[i] = [];
						while(list != null) { arguments[i].push(l[0]); list = l[1]; }
					}
				} catch(e) {}
				return m.apply(this, arguments);
			}
		})(__varName);
} catch(_) {}
try {
GLOBAL.m = require("mithril");
var __varName1 = GLOBAL.m;
(function(m) {
			if (m.m) return;
			m.m = function() {
				try { 
					for(var i=0; i < arguments.length; ++i) if(arguments[i] instanceof List) {
						var list = arguments[i].h; arguments[i] = [];
						while(list != null) { arguments[i].push(l[0]); list = l[1]; }
					}
				} catch(e) {}
				return m.apply(this, arguments);
			}
		})(__varName1);
} catch(_) {}
audio_Audio.instance = new audio_Audio();
haxe_io_FPHelper.i64tmp = new haxe__$Int64__$_$_$Int64(0,0);
haxe_io_FPHelper.helper = new DataView(new ArrayBuffer(8));
js_html_compat_Float32Array.BYTES_PER_ELEMENT = 4;
js_html_compat_Uint8Array.BYTES_PER_ELEMENT = 1;
Main.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
