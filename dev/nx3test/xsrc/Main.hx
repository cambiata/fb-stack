import nx3.render.scaling.Scaling;
import nx3.render.TargetSvgXml;
import mithril.M;

class Main {
	static function main()
		new Main();

	public function new() {
		var qscore = "|4/4 /### a+ p8 b-,d A2 | c+ e8 b_ b16 g a e +f8. d16 | e2.,A p4";
		var parser = new nx3.qs.QSParser(qscore);
		var nscore = parser.parse();

		M.mount(js.Browser.document.body, new Index());
	}
}

class Index implements Mithril {
	public function new() {}

	public function view() {
		return [
			m('h1', 'Hello from Mithril'),
			new RenderQScore("|4/4 /### a+ p8 b-,d A2 | c+ e8 b_ b16 g a e +f8. d16 | e2.,A p4").view(),
		];
	}
}

class RenderQScore implements Mithril {
	public function new(qs:String) {
		this.qs = qs;
	}

	var qs:String;

	public function view() {
		var parser = new nx3.qs.QSParser(qs);
		var nscore = parser.parse();
		var target = new TargetSvgXml('id', Scaling.NORMAL);
		var renderer = new nx3.render.Renderer(target, 0, 0);
		renderer.renderScore(new nx3.PScore(nscore));

		return [m('nisse', this.qs), m('test', 'Hello'), M.trust(target.getXml().toString())];
	}
}
