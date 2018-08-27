package ui.render;

class QSyntaxRenderer implements IStringRenderer {
	public function new() {}

	public function renderFromCode(code:String):String {
		var parser = new nx3.qs.QSParser(code);
		var nscore = parser.parse();
		var target = new nx3.render.TargetSvgXml('id', nx3.render.scaling.Scaling.NORMAL);
		var renderer = new nx3.render.Renderer(target, 0, 0);
		renderer.renderScore(new nx3.PScore(nscore));
		var svg = target.getXml();
		return svg.toString();
	}
}
