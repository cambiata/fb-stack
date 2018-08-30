(function ($hx_exports, $global) { "use-strict";
var $s = $global.$hx_scope, $_;
var $hxClasses = $s.a, haxe_Log = $s.e, ui_ChapterTypeViewCache = $s.f, mithril_Mithril = $s.b;
var audio_Audio = function() {
	this.context = new AudioContext();
};
$hxClasses["audio.Audio"] = audio_Audio;
audio_Audio.__name__ = ["audio","Audio"];
audio_Audio.prototype = {
	__class__: audio_Audio
};
var audio_IPlayback = function() { };
$hxClasses["audio.IPlayback"] = audio_IPlayback;
audio_IPlayback.__name__ = ["audio","IPlayback"];
var audio_scorx_Mixer = function(channels) {
	this.channels = [];
	this.channels = channels;
	this.trackVolumeNodes = [];
	this.sampleNodes = [];
	this.masterVolumeNode = audio_Audio.instance.context.createGain();
	this.analyserNode = audio_Audio.instance.context.createAnalyser();
};
$hxClasses["audio.scorx.Mixer"] = audio_scorx_Mixer;
audio_scorx_Mixer.__name__ = ["audio","scorx","Mixer"];
audio_scorx_Mixer.__interfaces__ = [audio_IPlayback];
audio_scorx_Mixer.prototype = {
	play: function(startTime) {
		if(startTime == null) {
			startTime = 0;
		}
		this.buildGraph();
		this.elapsedTimeSinceStart = startTime;
		this.sampleNodes.map(function(s) {
			s.start(0,startTime);
			return;
		});
	}
	,stop: function() {
		this.sampleNodes.map(function(s) {
			s.stop(0);
			s = null;
			return s;
		});
	}
	,buildGraph: function() {
		var sources = [];
		haxe_Log.trace(this.channels.length,{ fileName : "src/audio/scorx/Mixer.hx", lineNumber : 47, className : "audio.scorx.Mixer", methodName : "buildGraph"});
		var _g1 = 0;
		var _g = this.channels.length;
		while(_g1 < _g) {
			var i = _g1++;
			var sample = this.channels[i].buffer;
			sources[i] = audio_Audio.instance.context.createBufferSource();
			sources[i].buffer = sample;
			this.trackVolumeNodes[i] = audio_Audio.instance.context.createGain();
			this.trackVolumeNodes[i].gain.value = this.channels[i].volume;
			sources[i].connect(this.trackVolumeNodes[i],0,0);
			this.trackVolumeNodes[i].connect(this.masterVolumeNode,0,0);
			this.masterVolumeNode.connect(this.analyserNode,0,0);
			this.analyserNode.connect(audio_Audio.instance.context.destination,0,0);
		}
		this.sampleNodes = sources;
	}
	,setVolumeOfChannel: function(idx,volume) {
		if(this.trackVolumeNodes == null || this.trackVolumeNodes == []) {
			return;
		}
		if(this.trackVolumeNodes[idx] == null) {
			return;
		}
		this.trackVolumeNodes[idx].gain.value = volume;
		this.channels[idx].volume = volume;
	}
	,__class__: audio_scorx_Mixer
};
var audio_scorx_Channel = function(name,buffer) {
	this.name = name;
	this.buffer = buffer;
	this.peaks = 0;
	this.volume = 1.0;
	this.panning = 0;
	this.sampleNode = null;
	this.volumeNode = null;
};
$hxClasses["audio.scorx.Channel"] = audio_scorx_Channel;
audio_scorx_Channel.__name__ = ["audio","scorx","Channel"];
audio_scorx_Channel.prototype = {
	__class__: audio_scorx_Channel
};
var audio_scorx_Loader = function() { };
$hxClasses["audio.scorx.Loader"] = audio_scorx_Loader;
audio_scorx_Loader.__name__ = ["audio","scorx","Loader"];
audio_scorx_Loader.load = function(url) {
	return new Promise(function(res,rej) {
		var request = new XMLHttpRequest();
		request.open("GET",url,true);
		request.responseType = "arraybuffer";
		request.onload = function(_) {
			audio_Audio.instance.context.decodeAudioData(request.response,function(buffer) {
				haxe_Log.trace("Loaded and decoded track " + url,{ fileName : "src/audio/scorx/Mixer.hx", lineNumber : 118, className : "audio.scorx.Loader", methodName : "load"});
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
var audio_scorx_MixerModel = function() {
	this.loadId = null;
	this.playing = false;
	this.volumes = [];
	this.files = [];
	this.deltaTime = 0;
};
$hxClasses["audio.scorx.MixerModel"] = audio_scorx_MixerModel;
audio_scorx_MixerModel.__name__ = ["audio","scorx","MixerModel"];
audio_scorx_MixerModel.__interfaces__ = [audio_IPlayback];
audio_scorx_MixerModel.prototype = {
	loadFiles: function(id,files) {
		var _gthis = this;
		return new Promise(function(res,rej) {
			if(_gthis.loadId == id) {
				res(true);
				return;
			}
			_gthis.loadId = id;
			_gthis.mixer = null;
			_gthis.files = files;
			_gthis.volumes = _gthis.files.map(function(f) {
				return 0.7;
			});
			m.redraw();
			Promise.all(files.map(function(f1) {
				return audio_scorx_Loader.load(f1);
			})).then(function(buffers) {
				return Promise.resolve(buffers.map(function(b) {
					return new audio_scorx_Channel(b.url,b.buffer);
				}));
			}).then(function(channels) {
				haxe_Log.trace("all channels loaded!",{ fileName : "src/audio/scorx/MixerModel.hx", lineNumber : 42, className : "audio.scorx.MixerModel", methodName : "loadFiles"});
				_gthis.mixer = new audio_scorx_Mixer(channels);
				res(true);
				return;
			});
			return;
		});
	}
	,play: function(startTime) {
		if(startTime == null) {
			startTime = 0;
		}
		this.deltaTime = audio_Audio.instance.context.currentTime;
		haxe_Log.trace("Delta:" + this.deltaTime,{ fileName : "src/audio/scorx/MixerModel.hx", lineNumber : 53, className : "audio.scorx.MixerModel", methodName : "play"});
		if(this.mixer != null) {
			this.mixer.stop();
			this.mixer.play(startTime);
			this.playing = true;
		}
	}
	,stop: function() {
		if(this.mixer != null) {
			this.mixer.stop();
		}
		this.playing = false;
	}
	,setVolumeOfChannel: function(idx,volume) {
		this.volumes[idx] = volume;
		if(this.mixer != null) {
			this.mixer.setVolumeOfChannel(idx,volume);
		}
	}
	,__class__: audio_scorx_MixerModel
};
var audio_scorx_ui_ChannelView = function(idx,filename) {
	this.filename = filename;
	this.idx = idx;
};
$hxClasses["audio.scorx.ui.ChannelView"] = audio_scorx_ui_ChannelView;
audio_scorx_ui_ChannelView.__name__ = ["audio","scorx","ui","ChannelView"];
audio_scorx_ui_ChannelView.__interfaces__ = [mithril_Mithril];
audio_scorx_ui_ChannelView.prototype = {
	view: function() {
		var _gthis = this;
		if(arguments.length > 0 && arguments[0].tag != this) return arguments[0].tag.view.apply(arguments[0].tag, arguments);
		var m1 = audio_scorx_MixerModel.instance;
		return m.m("div.channelview",[m.m("span",this.idx + ":" + this.filename),m.m("input",{ type : "range", min : 0, max : 100, value : m1.volumes[this.idx] * 100, onchange : function(e) {
			haxe_Log.trace("change: ",{ fileName : "src/audio/scorx/ui/ChannelView.hx", lineNumber : 19, className : "audio.scorx.ui.ChannelView", methodName : "view", customParams : [e.target.value]});
			audio_scorx_MixerModel.instance.setVolumeOfChannel(_gthis.idx,e.target.value / 100);
			return;
		}})]);
	}
	,__class__: audio_scorx_ui_ChannelView
};
var audio_scorx_ui_PlayView = function() {
	haxe_Log.trace("new",{ fileName : "src/audio/scorx/ui/PlayView.hx", lineNumber : 8, className : "audio.scorx.ui.PlayView", methodName : "new"});
};
$hxClasses["audio.scorx.ui.PlayView"] = audio_scorx_ui_PlayView;
audio_scorx_ui_PlayView.__name__ = ["audio","scorx","ui","PlayView"];
audio_scorx_ui_PlayView.__interfaces__ = [mithril_Mithril];
audio_scorx_ui_PlayView.prototype = {
	buttonsView: function() {
		if(audio_scorx_MixerModel.instance.mixer != null) {
			return [m.m("button",{ onclick : function(e) {
				haxe_Log.trace("button clicked!",{ fileName : "src/audio/scorx/ui/PlayView.hx", lineNumber : 31, className : "audio.scorx.ui.PlayView", methodName : "buttonsView"});
				audio_scorx_MixerModel.instance.play();
				return;
			}},"Start"),m.m("button",{ onclick : function(e1) {
				haxe_Log.trace("button clicked!",{ fileName : "src/audio/scorx/ui/PlayView.hx", lineNumber : 35, className : "audio.scorx.ui.PlayView", methodName : "buttonsView"});
				audio_scorx_MixerModel.instance.stop();
				return;
			}},"Stop")];
		} else {
			return m.m("div","Mixer not ready...");
		}
	}
	,view: function() {
		if(arguments.length > 0 && arguments[0].tag != this) return arguments[0].tag.view.apply(arguments[0].tag, arguments);
		return [this.buttonsView()];
	}
	,__class__: audio_scorx_ui_PlayView
};
var audio_scorx_ui_PlayerView = function() {
};
$hxClasses["audio.scorx.ui.PlayerView"] = audio_scorx_ui_PlayerView;
audio_scorx_ui_PlayerView.__name__ = ["audio","scorx","ui","PlayerView"];
audio_scorx_ui_PlayerView.__interfaces__ = [mithril_Mithril];
audio_scorx_ui_PlayerView.prototype = {
	view: function() {
		if(arguments.length > 0 && arguments[0].tag != this) return arguments[0].tag.view.apply(arguments[0].tag, arguments);
		var files = audio_scorx_MixerModel.instance.files;
		return m.m("div.scorx",[new audio_scorx_ui_PlayView().view(),files.map(function(f) {
			return new audio_scorx_ui_ChannelView(files.indexOf(f),f).view();
		})]);
	}
	,__class__: audio_scorx_ui_PlayerView
};
var data_TestModel = function() {
	this.counter = 0;
};
$hxClasses["data.TestModel"] = data_TestModel;
data_TestModel.__name__ = ["data","TestModel"];
data_TestModel.prototype = {
	__class__: data_TestModel
};
var ui_ScorxmixerChapter = function(c) {
	this.c = c;
	if(audio_scorx_MixerModel.instance.mixer == null) {
		audio_scorx_MixerModel.instance.loadFiles("test",["/assets/mp3/test/100.mp3","/assets/mp3/test/110.mp3","/assets/mp3/test/120.mp3","/assets/mp3/test/130.mp3","/assets/mp3/test/200.mp3"]).then(function(_) {
			haxe_Log.trace("SCORX LOADED",{ fileName : "src/ui/ScorxmixerChapter.hx", lineNumber : 22, className : "ui.ScorxmixerChapter", methodName : "new"});
			ui_ChapterTypeViewCache.instance.clearCache();
			m.redraw();
			return;
		});
	}
};
$hxClasses["ui.ScorxmixerChapter"] = ui_ScorxmixerChapter;
ui_ScorxmixerChapter.__name__ = ["ui","ScorxmixerChapter"];
ui_ScorxmixerChapter.__interfaces__ = [mithril_Mithril];
ui_ScorxmixerChapter.prototype = {
	view: function() {
		if(arguments.length > 0 && arguments[0].tag != this) return arguments[0].tag.view.apply(arguments[0].tag, arguments);
		return [m.m("div.specialchapter.scorx ",m.m("h1","ScorX " + data_TestModel.instance.counter)),new audio_scorx_ui_PlayerView().view()];
	}
	,__class__: ui_ScorxmixerChapter
};
function $getIterator(o) { if( o instanceof Array ) return HxOverrides.iter(o); else return o.iterator(); }
var $fid = 0;
var __map_reserved = {};
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
audio_scorx_MixerModel.instance = new audio_scorx_MixerModel();
data_TestModel.instance = new data_TestModel();
$s.ui_ScorxmixerChapter = ui_ScorxmixerChapter; 
})(typeof exports != "undefined" ? exports : typeof window != "undefined" ? window : typeof self != "undefined" ? self : this, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
