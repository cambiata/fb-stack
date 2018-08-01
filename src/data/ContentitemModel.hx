package data;

import haxe.Timer;
import haxe.ds.StringMap;
import data.Contentitem;
import mithril.M;
using Lambda;
using StringTools;

class PipeTool {
    static public function toPipe(path:String):String {
        var pipeId = path.replace('/', '|');
        if (pipeId.startsWith('|')) pipeId = pipeId.substr(1);
        return pipeId;        
    }
}

class ContentitemModel {
    public static var instance(default, null):ContentitemModel = new ContentitemModel();
    
    private function new () {
        this.chapterContent = new StringMap();
    }  // private constructor

    var chapterContent:haxe.ds.StringMap<String>;
    public function setChapterContentItem(pipeId:String, content:String) {
        trace(pipeId + ' ' + content);
        this.chapterContent.set(pipeId, content);
        M.redraw();

    }

    public function getChapterContent(path:String):String {

        var pipeId = PipeTool.toPipe(path);

        if (this.chapterContent.exists(pipeId)) return this.chapterContent.get(pipeId);
        
        ApiCalls.getRequest('/api/test/$pipeId')
        .then(d->{
            var data:Dynamic = cast d;
            trace(data);
            var a:Array<Dynamic> = data.items;
            trace(a);
            var items = a.map(item -> {id:item.id, content:item.content});
            trace(items);
            trace('set chapterContent');
            
            items.iter(item->{
                // if (item.content == null) item.content = '404: ' + item.id;
                this.chapterContent.set(item.id, item.content);
            });

            // var items = new Contentitems(cast data.items);
            // ContentitemModel.instance.setCacheFromItems(items);
            return null;
        })

        .catchError(e->{
            ErrorsAndLogs.addError(e);
            trace('ERror' + e);
            return null;
        });  
     
        return 'This chapter does not exist in the cache $pipeId';

    }


    // public function setCache(id:String, content:String) {

    //     this.cache.set(id, content);
    //     trace('setCache: ' + id + ' ' + content);    

    //     // M.redraw();
    // }

    // public function setCacheFromItems(items:Array<{id:String, content:String}>) {
    //     trace(items);
    //     items.iter(item->setCache(item.id, item.content));
    // }


}