package utils;

import sys.io.File;
using StringTools;
class CleanupIndex {

    public static function main() {
        trace('******** functions/index.js cleanup **********');
        var file = 'functions/index.js';
        var content = File.getContent(file);
        File.saveContent(file + '.old', content);

        var search = '.once("value",null,function';
        var replace = '.once("value",function';
        while (content.indexOf(search)>-1) {
            content = content.replace(search, replace);
        }
        File.saveContent(file, content);
    }

}