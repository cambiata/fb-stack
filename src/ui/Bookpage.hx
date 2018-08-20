package ui;

import ui.ViewMapper;

import mithril.M;
import data.Content;
import data.FilterModel;
import haxe.DynamicAccess;
import markdown.MithrilTools;
import firebase.Firebase;


using cx.ArrayTools;

class Bookpage implements Mithril {
    public function new() {
        bpcount++;
        trace('bookpage new: ' + bpcount + ' ' + FilterModel.instance.getBook().path);
    }
    
    static public var bpcount:Int = 0;

    function chapterView(chapter:Chapter) {
        return try {     
            if (chapter == null)  return null; //???
            if (chapter.type == null || Std.is(chapter.type,StandardChaptertype))
            {
                return m('section', [
                    m('h1', '' + chapter.title),
                    // m('p', '' + chapter.text),
                    MithrilTools.markdownToView(chapter.text),
                ]);
            } else {
                return null; //m('section', 'Do not show standad chapter stuff');
            }
        } catch (e:Dynamic) {
            m('div.error', 'chapterView: ' + e);
        }
    }

    function chaptersView(chapters:Array<Chapter>, book:Book) {
        return try {            
            m('nav',
            [
                m('a.btn', {href:'/content' + FilterModel.instance.getShelf().path, oncreate:M.routeLink}, '<<'),
                m('img', {src:'/assets/books/${book.id}.jpg'}),
                m('h3', 'Innehåll:'),
                // m('div.border', 'Chapters length:' + chapters.length),
                m('ul', chapters.map(chap->{
                    var selected = (chap == FilterModel.instance.getChapter()) ? '.selected' : '';
                    m('li',
                        m('a$selected', {href:'/content' + chap.path, oncreate:M.routeLink}, '' + chap.title)
                    );
                })),
            ]);
        } catch (e:Dynamic) {
            m('div.error', 'chaptersView: ' + e);
        }
    }

    // function subchapterView(subchapter:Chapter) {
    //     return try {
    //         if (subchapter == null) return null; //m('div', 'No subchapter selected')
    //         m('section', [
    //             m('h2', '' + subchapter.title),
    //             // m('p', '' + subchapter.text),
    //             MithrilTools.markdownToView(subchapter.text),
    //         ]);
    //     } catch (e:Dynamic) {
    //        m('div.error', 'subchapterView: ' + e);            
    //     }
    // }

    function subchaptersView(subchapters:Array<Chapter>) {
        if (subchapters == null || subchapters.length==0) return null; //m('div', 'no subchpaters');
        return try {            
                m('menu', [
                    subchapters.map(sub->{
                        var selected = (sub == FilterModel.instance.getSubchapter()) ? '.selected' : '';
                        m('a$selected', {href:'/content' + sub.path, oncreate:M.routeLink}, '' + sub.title);
                    }),
                ]);
        } catch (e:Dynamic) {
            m('div.error', 'subchaptersView: ' + e);
        }
    }

    function editChapterView(chapter:Chapter) {
        if (chapter == null ) return null; //m('div', 'no chapter');
       return try {
            m('details', [
                m('textarea', {style:{width:"100%", height:"300px"}, 
                    oninput: e->chapter.text = e.target.value,
                    value: chapter.text
                }),
                m('button', {onclick: e->{
                    trace(chapter.dbpath);
                    Firebase.database().ref(chapter.dbpath).update({text:chapter.text}, e->{
                        trace('after update ' + e);
                    });
                }}, 'Save'),
            ]);
        } catch(e:Dynamic) {
            m('div.error', 'editChapterView: ' + e);
        }
    }

    function editSubchapterView(chapter:Chapter) return try {
        if (chapter.subchapters == null || chapter.subchapters == []) return null; //m('div', 'no subchapter');
        m('details', [
            m('textarea', {style:{width:"100%", height:"300px"}, 
                oninput: e->chapter.text = e.target.value,
                value: chapter.text
            }),
            m('button', {onclick: e->{
                trace(chapter.dbpath);
                Firebase.database().ref(chapter.dbpath).update({text:chapter.text}, e->{
                    trace('after update ' + e);
                });
            }}, 'Save'),
        ]);
    } catch(e:Dynamic) {
        m('div.error', 'editSubchapterView: ' + e);
    }


    function headerView(book:Book) try {
        return (book != null) ?  m('header', [m('div', book.title)]) : cast 'No book selected';        
    } catch(e:Dynamic) {
        return m('div.error', 'headerView: ' + e);
    }

    function specialChapterView(chapter:Chapter) try {
        
        if (chapter == null || chapter.type == null) return null; //m('div', 'No special chapter');
                

        return switch Type.getClass(chapter.type) {
            case VideoChaptertype: ViewMapper.instance.getNew('ui.VideoChapter', [chapter.type]).view();
            case RosettaChaptertype: ViewMapper.instance.getNew('ui.RosettaChapter', [chapter.type]).view();
            case PdfChaptertype: ViewMapper.instance.getNew('ui.PdfChapter', [chapter.type]).view();
            case PitchChaptertype: ViewMapper.instance.getNew('ui.PitchChapter', [chapter.type]).view();
            case ScorxmixerChaptertype: ViewMapper.instance.getNew('ui.ScorxmixerChapter', [chapter.type]).view();
            case _: return m('div', 'Undefined special chapter: ' + chapter.type);
        }
        return m('div', 'Undefined special chapter: ' + chapter.type);
    } catch(e:Dynamic) {
        return m('div.error', 'specialChapterView: ' + e);
    }

    public function view() {
        var book = FilterModel.instance.getBook();
        var chapter = FilterModel.instance.getChapter();
        var chapters = FilterModel.instance.getChapters();
        var subchapter = FilterModel.instance.getSubchapter();
        var subchapters = FilterModel.instance.getSubchapters();

        return m('div.book', [
            headerView(book),
            chaptersView(chapters, book),
            m('article', [
                editChapterView(chapter),
                chapterView(chapter),
                
                specialChapterView(chapter),

                subchaptersView(subchapters),
                editChapterView(subchapter),
                chapterView(subchapter),
                specialChapterView(subchapter),                
            ]),
        ]);
    }

}