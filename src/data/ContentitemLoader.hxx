package data;

import firebase.EventType;
import firebase.Firebase;
import data.Contentitem.Contentitems;

using dataclass.JsonConverter;
using StringTools;
using Lambda;

class ContentitemLoader {
    public static var instance(default, null):ContentitemLoader = new ContentitemLoader();
    
    private function new () {}  // private constructor

    public function load(ids:Array<String>) {
        var idsParameter = ids.map(id->id.trim()).join(',');
        trace(idsParameter);
        ApiCalls.getRequest('/api/test/$idsParameter')
        .then(d->{
            var data:Dynamic = cast d;
            trace(data);
            var a:Array<Dynamic> = data.items;
            trace(a);
            var items = a.map(item -> {id:item.id, content:item.content});
            trace(items);

            // var items = new Contentitems(cast data.items);
            // ContentitemModel.instance.setCacheFromItems(items);
            return null;
        })
        .catchError(e->{
            ErrorsAndLogs.addError(e);
            trace('ERror' + e);
            return null;
        });
        return null;
    }

    public function loadRealtimeDatabase() {

        return Firebase.database().ref('content-item').on(EventType.Value, (snap, str)->{
            try {
                var data = snap.val();
                trace('content-item ---------------------------------------------------');
                trace(data);
            } catch (e:Dynamic) {
                ErrorsAndLogs.addError('Could not insantiate content-item from loaded Realtime data $e');

                return null;
            }
        });
    }

    public function createItem(path:String, content:String) {
        var pipeId = ContentitemModel.PipeTool.toPipe(path);
        Firebase.database().ref('content-item').child(pipeId).set(content);
        ContentitemModel.instance.setChapterContentItem(pipeId, content);
    }
}