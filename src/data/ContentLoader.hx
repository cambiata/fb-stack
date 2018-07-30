package data;

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
            ErrorsAndLogs.addErrors(item.errors);
            // ContentModel.instance.content = new Content(cast item.data);
            ContentModel.instance.content = Content.fromJson(item.data);
            ErrorsAndLogs.addLog('Content-tree loaded '); // + Profile.instance.msString());
        })
        .catchError(error->{
            ErrorsAndLogs.addError('Content-tree error: $error');
        });
    }

    public function loadRealtimeUpdate() {
        Firebase.database().ref('content-tree').on(EventType.Value, (snap, str)->{
            try {
                ErrorsAndLogs.addLog('Realtime content loaded!'); // + Profile.instance.msString());
                ContentModel.instance.content = Content.fromJson(snap.val());
            } catch (e:Dynamic) {
                ErrorsAndLogs.addError('Could not insantiate content from loaded Realtime data $e');

                return null;
            }
        });
    }
}