package data;

import js.Promise;
import firebase.Firebase;
import firebase.EventType;
import data.ContentModel;

using dataclass.JsonConverter;

class ContentLoader {
    public static var instance(default, null):ContentLoader = new ContentLoader();
    
    private function new () {}  // private constructor

    public function load() {
        ApiCalls.getRequest('/api/content-tree')
        .then(item->{
            var itemm:Dynamic = item;
            ErrorsAndLogs.addErrors(itemm.errors);
            // ContentModel.instance.content = new Content(cast item.data);
            ContentModel.instance.content = Content.fromJson(itemm.data);
            ErrorsAndLogs.addLog('Content-tree loaded '); // + Profile.instance.msString());
            return null;
        })
        .catchError(error->{
            ErrorsAndLogs.addError('Content-tree error: $error');
        });
    }

    public function loadRealtimeUpdate() {
        Firebase.database().ref('content-tree').on(EventType.Value, (snap, str)->{
            try {
                trace('Realtime content loaded!'); // + Profile.instance.msString());

                var val:Dynamic = snap.val();

                ContentModel.instance.content = Content.fromJson(val);
            } catch (e:Dynamic) {
                trace('Could not insantiate content from loaded Realtime data $e');

                return null;
            }
        });
    }

    public function startup() {
        ContentModel.instance.init();
        return ApiCalls.getRequest('/api/content-tree')
        .then(item->{
            var itemm:Dynamic = item;
            
            // ContentModel.instance.content = new Content(cast item.data);
            
            
            ContentModel.instance.content = Content.fromJson(itemm.data);
            
            return Promise.resolve(true);
        });

    }


}