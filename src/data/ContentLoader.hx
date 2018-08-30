package data;

import haxe.Json;
import js.Promise;
import firebase.Firebase;
import firebase.EventType;
import data.ContentModel;

using dataclass.TypedJsonConverter;

class ContentLoader {
	public static var instance(default, null):ContentLoader = new ContentLoader();

	private function new() {} // private constructor

	/*
		public function load() {
			ApiCalls.getRequest(/api/content-tree)
			.then(item->{
				var itemm:Dynamic = item;
				ErrorsAndLogs.addErrors(itemm.errors);
				ContentModel.instance.content = Content.fromJson(itemm.data);
				ErrorsAndLogs.addLog(Content-tree loaded ); // + Profile.instance.msString());
				return null;
			})
			.catchError(error->{
				ErrorsAndLogs.addError(Content-tree error: $error);
			});
		}
	 */
	public function loadRealtimeUpdate() {
		Firebase.database().ref('content-tree').on(EventType.Value, (snap, str) -> {
			try {
				trace('Realtime content loaded!'); // + Profile.instance.msString());
				var val:Dynamic = snap.val();
				ContentModel.instance.content = Content.fromTypedJson(val);
			} catch (e:Dynamic) {
				trace('Could not insantiate content from loaded Realtime data $e');

				return null;
			}
		});
	}

	#if local_content
	public function loadContent() {
		var json = '
{
  "id": "tree0",
  "rooms": [
    {
      "id": "room0",
      "shelves": [
        {
          "id": "home",
          "title": "Homeshelf Room0",
          "access": 0,
          "info": "defaultShelfInfo",
          "books": [],
          "sort": 0,
          "type": "homepage"
        },
        {
          "id": "sh0",
          "title": "Shelf01",
          "access": 0,
          "info": "defaultShelfInfo",
          "books": [
            {
              "id": "book0",
              "title": "Bok 0",
              "access": 0,
              "type": "standard",
              "info": "defaultBookInfo",
              "chapters": [
                {
                  "id": "chapter0",
                  "title": "Kapitel 1",
                  "access": 1,
                  "type": "article",
                  "info": "defaultChapterInfo",
                  "text": "defaultChapterText",
                  "subchapters": [
                    {
                      "id": "sub0",
                      "title": "Sub0",
                      "access": 0,
                      "type": "article",
                      "info": "defaultChapterInfo",
                      "text": "defaultChapterText",
                      "subchapters": [],
                      "sort": 0
                    },
                    {
                      "id": "sub1",
                      "title": "Sub1",
                      "access": 0,
                      "type": "article",
                      "info": "defaultChapterInfo",
                      "text": "defaultChapterText",
                      "subchapters": [],
                      "sort": 0
                    }
                  ],
                  "sort": 0
                },
                {
                  "id": "chapter1",
                  "title": "Kapitel 2",
                  "access": 0,
                  "type": "article",
                  "info": "defaultChapterInfo",
                  "text": "defaultChapterText",
                  "subchapters": [
                    {
                      "id": "sub0",
                      "title": "Sub0",
                      "access": 0,
                      "type": "article",
                      "info": "defaultChapterInfo",
                      "text": "defaultChapterText",
                      "subchapters": [],
                      "sort": 0
                    },
                    {
                      "id": "sub1",
                      "title": "Sub1",
                      "access": 0,
                      "type": "article",
                      "info": "defaultChapterInfo",
                      "text": "defaultChapterText",
                      "subchapters": [],
                      "sort": 0
                    },
                    {
                      "id": "sub2",
                      "title": "Sub2",
                      "access": 0,
                      "type": "article",
                      "info": "defaultChapterInfo",
                      "text": "defaultChapterText",
                      "subchapters": [],
                      "sort": 0
                    }
                  ],
                  "sort": 0
                },
                {
                  "id": "chapter3",
                  "title": "Kapitel 3",
                  "access": 0,
                  "type": "article",
                  "info": "defaultChapterInfo",
                  "text": "defaultChapterText",
                  "subchapters": [],
                  "sort": 0
                }
              ],
              "sort": 0
            },
            {
              "id": "book1",
              "title": "Bok 1",
              "access": 1,
              "type": "standard",
              "info": "defaultBookInfo",
              "chapters": [
                {
                  "id": "chapter0",
                  "title": "Kapitel 1",
                  "access": 1,
                  "type": "article",
                  "info": "defaultChapterInfo",
                  "text": "defaultChapterText",
                  "subchapters": [
                    {
                      "id": "sub0",
                      "title": "Sub0",
                      "access": 0,
                      "type": "article",
                      "info": "defaultChapterInfo",
                      "text": "defaultChapterText",
                      "subchapters": [],
                      "sort": 0
                    },
                    {
                      "id": "sub1",
                      "title": "Sub1",
                      "access": 0,
                      "type": "article",
                      "info": "defaultChapterInfo",
                      "text": "defaultChapterText",
                      "subchapters": [],
                      "sort": 0
                    }
                  ],
                  "sort": 0
                }
              ],
              "sort": 0
            }
          ],
          "sort": 0,
          "type": "content"
        },
        {
          "id": "sh1",
          "title": "Shelf1",
          "access": 1,
          "info": "defaultShelfInfo",
          "books": [],
          "sort": 0,
          "type": "content"
        },
        {
          "id": "sh2",
          "title": "Shelf2",
          "access": 0,
          "info": "defaultShelfInfo",
          "books": [
            {
              "id": "book0",
              "title": "Book 0",
              "access": 0,
              "type": "standard",
              "info": "defaultBookInfo",
              "chapters": [
                {
                  "id": "chapter0",
                  "title": "Chapter Access 0",
                  "access": 0,
                  "type": "article",
                  "info": "defaultChapterInfo",
                  "text": "defaultChapterText",
                  "subchapters": [],
                  "sort": 0
                },
                {
                  "id": "chapter1",
                  "title": "Chapter Access 1",
                  "access": 1,
                  "type": "article",
                  "info": "defaultChapterInfo",
                  "text": "defaultChapterText",
                  "subchapters": [],
                  "sort": 0
                },
                {
                  "id": "chapter2",
                  "title": "Chapter Access 2",
                  "access": 2,
                  "type": "article",
                  "info": "defaultChapterInfo",
                  "text": "defaultChapterText",
                  "subchapters": [],
                  "sort": 0
                }
              ],
              "sort": 0
            }
          ],
          "sort": 0,
          "type": "content"
        },
        {
          "id": "home",
          "title": "Home shelf",
          "access": 999,
          "info": "defaultShelfInfo",
          "books": [
            {
              "id": "homebook0",
              "title": "Home Book 0",
              "access": 999,
              "type": "standard",
              "info": "defaultBookInfo",
              "chapters": [],
              "sort": 0
            },
            {
              "id": "homebook1",
              "title": "Home Book 1",
              "access": 999,
              "type": "standard",
              "info": "defaultBookInfo",
              "chapters": [],
              "sort": 0
            }
          ],
          "sort": 0,
          "type": "homepage"
        }
      ],
      "title": "TestRoom",
      "sort": 0
    },
    {
      "id": "room1",
      "shelves": [
        {
          "id": "home",
          "title": "Homeshelf Room1",
          "access": 0,
          "info": "defaultShelfInfo",
          "books": [
            {
              "id": "b0",
              "title": "Book0",
              "access": 0,
              "type": "standard",
              "info": "defaultBookInfo",
              "chapters": [],
              "sort": 0
            },
            {
              "id": "b1",
              "title": "Book1",
              "access": 0,
              "type": "standard",
              "info": "defaultBookInfo",
              "chapters": [],
              "sort": 0
            }
          ],
          "sort": 0,
          "type": "homepage"
        },
        {
          "id": "sh0",
          "title": "Shelf0 of Room1",
          "access": 0,
          "info": "defaultShelfInfo",
          "books": [
            {
              "id": "b0",
              "title": "Book0",
              "access": 0,
              "type": "standard",
              "info": "defaultBookInfo",
              "chapters": [],
              "sort": 0
            },
            {
              "id": "b1",
              "title": "Book1",
              "access": 0,
              "type": "standard",
              "info": "defaultBookInfo",
              "chapters": [],
              "sort": 0
            }
          ],
          "sort": 0,
          "type": "content"
        }
      ],
      "title": "Room1",
      "sort": 0
    }
  ]
}

        ';

		var obj = Json.parse(json);
		return new js.Promise<Bool>((res, rej) -> {
			haxe.Timer.delay(() -> {
				ContentModel.instance.content = Content.fromTypedJson(obj);
				res(true);
			}, 1000);
		});
	}
	#else
	public function loadContent() {
		return ApiCalls.getRequest('/api/content-tree').then(item -> {
			var itemm:Dynamic = item;
			ContentModel.instance.content = Content.fromTypedJson(itemm.data);
			return Promise.resolve(true);
		}).catchError(e -> {
			trace('ContentLoader loadContent error: ' + e);
		});
	}
	#end
}
