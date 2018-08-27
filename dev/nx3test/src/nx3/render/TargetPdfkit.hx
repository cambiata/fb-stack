package nx3.render;
import cx.SvgTools;
import js.html.IFrameElement;
import nx3.geom.Pnts;
import nx3.TFontInfo;
import nx3.geom.Rectangles;
import nx3.geom.Rectangle;
import nx3.render.scaling.Scaling;
import nx3.render.scaling.TScaling;
import nx3.action.EActivityType;
import pdfkit.PDFDocument;
using StringTools;

/**
 * TargetPdfkit
 * @author Jonas Nyström
 */
class TargetPdfkit implements ITarget 
{
	var blobStream:Dynamic;
	var iframe:js.html.Element;
	var doc:pdfkit.PDFDocument;
	var scaling:TScaling;
	
	public var totalHeight:Float;
	public var totalWidth:Float;		
	
	public function new(?scaling:TScaling) {
		
		this.scaling = (scaling != null) ? scaling : Scaling.NORMAL;	
		
		this.blobStream = untyped js.Browser.window.blobStream();				
		before();		
		
		//testRender();
	}
	
	function testRender() 
	{
		doc.fontSize(25);
		//doc.text('Hello', 100, 100);
		
		doc.save()
		.moveTo(100, 150)
		.lineTo(100, 250)
		.lineTo(200, 250)
		.fill('#ff3300');
		
		doc.circle(280, 200, 50)
		   .fill("#6600FF");		
		
		/*  
		doc.scale(0.6)
		   .translate(40, 130)
		   .path('m 95.72971,266.7949 c -5.57504,2.79274 -12.48498,4.1891 -20.72511,4.1891 -9.69981,0 -18.99938,-1.66998 -27.91049,-5.00757 -8.90876,-3.33996 -16.75807,-7.86163 -23.54558,-13.56975 -6.78751,-5.70339 -12.24248,-12.38094 -16.36254,-20.03029 -4.12007,-7.64934 -6.1801,-15.78458 -6.1801,-24.40572 0,-29.26234 20.72746,-61.31506 62.18472,-96.1605 -1.3349,-5.34251 -2.33313,-10.74399 -2.99941,-16.209153 -0.66627,-5.460449 -1.00058,-11.107236 -1.00058,-16.938007 0,-8.010226 0.66392,-15.871864 1.99646,-23.582532 1.3302,-7.710668 3.23955,-14.935434 5.72336,-21.674325 2.48617,-6.738864 5.54208,-12.869193 9.17715,-18.393316 3.63272,-5.5265031 7.814,-10.1708424 12.53677,-13.9306366 16.47555,22.8253826 24.71097,44.6247216 24.71097,65.3862176 0,13.480109 -3.18069,26.321 -9.54442,38.522682 -6.36138,12.20404 -16.32959,24.07079 -29.90225,35.60967 l 7.99763,38.42834 c 4.36256,-0.35616 6.78751,-0.53307 7.2725,-0.53307 6.05767,0 11.72453,1.09209 16.99586,3.27863 5.27368,2.18418 9.88109,5.18919 13.82693,9.01269 3.94349,3.82349 7.07003,8.34517 9.37727,13.56502 2.30488,5.21986 3.4585,10.86193 3.46085,16.93329 -0.002,4.36836 -0.78869,8.68011 -2.36374,12.92581 -1.57504,4.25042 -3.814,8.28856 -6.72159,12.10969 -2.90994,3.82586 -6.36373,7.34272 -10.36137,10.55766 -3.99764,3.21965 -8.42141,5.98172 -13.26896,8.28856 0,-0.24294 0.18129,0.45523 0.54385,2.09218 0.36492,1.63932 0.8193,3.79048 1.36315,6.46291 0.5462,2.67008 1.18187,5.64443 1.90935,8.92306 0.72749,3.27626 1.36316,6.43224 1.90936,9.46556 0.5462,3.03568 1.02884,5.73878 1.45497,8.10222 0.42378,2.37052 0.63567,3.97681 0.63567,4.82595 0,5.70576 -1.21248,10.92561 -3.63508,15.65957 -2.42495,4.73396 -5.69746,8.80041 -9.81988,12.19933 -4.12006,3.39656 -8.90875,6.03833 -14.36136,7.9206 -5.45497,1.88226 -11.21364,2.82339 -17.27602,2.82339 -4.60506,0 -8.90641,-0.72885 -12.90875,-2.18654 -4,-1.45769 -7.515,-3.52157 -10.54502,-6.18929 -3.02765,-2.67244 -5.422,-5.91568 -7.18068,-9.73918 -1.75632,-3.82113 -2.63449,-8.03853 -2.63449,-12.64984 0,-3.27862 0.54621,-6.37563 1.63626,-9.2863 1.09005,-2.91066 2.60623,-5.39912 4.54384,-7.463 1.93996,-2.06389 4.3037,-3.7032 7.09122,-4.91323 2.78987,-1.21474 5.81989,-1.82329 9.09004,-1.82329 2.90994,0 5.63625,0.66988 8.18127,2.00492 2.54502,1.33503 4.72748,3.06634 6.54502,5.18919 1.81754,2.12521 3.27251,4.5547 4.36491,7.2861 1.09005,2.72905 1.63626,5.49111 1.63626,8.28384 0,6.31431 -2.33314,11.4752 -7.00176,15.48267 -4.66627,4.00512 -10.51205,6.37328 -17.54441,7.09976 5.57504,2.79509 11.329,4.19146 17.2666,4.1891 4.8452,0.002 9.57268,-0.87745 14.17773,-2.64177 4.6027,-1.75961 8.62859,-4.12777 12.08474,-7.10212 3.45379,-2.97436 6.24131,-6.43932 8.3602,-10.38547 2.11889,-3.94614 3.18069,-8.16354 3.18069,-12.65692 0,-1.70299 -0.18365,-3.58526 -0.54385,-5.64914 L 95.72971,266.7949 z M 95.18821,27.488123 c -1.21483,-0.243068 -2.30724,-0.365597 -3.27486,-0.365597 -3.75986,0 -7.24661,1.912917 -10.46026,5.738777 -3.21365,3.823478 -6.00352,8.80275 -8.36726,14.933079 -2.36374,6.132684 -4.21188,13.022518 -5.54914,20.671856 -1.33254,7.649365 -2.00117,15.298698 -2.00117,22.948042 0,3.158334 0.12478,6.194011 0.36492,9.10704 0.24485,2.91538 0.67333,5.70811 1.2831,8.37819 24.73216,-21.976242 37.09942,-41.768292 37.09942,-59.373819 0,-8.378205 -3.03237,-15.723276 -9.09475,-22.037568 z m 3.814,231.850857 c 5.94467,-4.37072 10.46026,-9.16837 13.55619,-14.39058 3.09123,-5.21986 4.63802,-10.86429 4.63802,-16.93801 0,-3.76216 -0.63802,-7.4347 -1.91171,-11.01996 -1.27134,-3.57818 -3.08887,-6.76718 -5.45497,-9.56227 -2.36609,-2.78801 -5.18657,-5.03588 -8.46143,-6.7318 -3.27486,-1.69828 -6.85108,-2.54506 -10.72865,-2.54506 -0.24249,0 -0.72749,0.0307 -1.45497,0.0873 -0.72513,0.0613 -1.75633,0.15097 -3.08887,0.2689 l 12.90639,60.83151 z M 81.56374,199.26225 c -3.75749,0.48354 -7.2725,1.42468 -10.545,2.82104 -3.27251,1.39637 -6.08828,3.12767 -8.45202,5.19155 -2.36374,2.06389 -4.24249,4.43205 -5.63625,7.10212 -1.39376,2.67244 -2.09064,5.58546 -2.09064,8.7438 0,9.34762 4.96527,17.11962 14.88874,23.31127 -8.24013,-1.33503 -14.84636,-4.52167 -19.81634,-9.56227 -4.96997,-5.03823 -7.45378,-11.38084 -7.45378,-19.03255 0,-4.49101 0.93937,-8.83106 2.81812,-13.02016 1.87875,-4.18909 4.39317,-7.95598 7.54325,-11.30065 3.15479,-3.34703 6.85108,-6.23647 11.09121,-8.66595 4.24249,-2.43421 8.72748,-4.13721 13.45261,-5.10664 l -7.63507,-36.42579 c -17.08768,12.86684 -30.02468,25.49546 -38.81101,37.88112 -8.78633,12.38567 -13.1795,24.64868 -13.1795,36.79139 0,6.67755 1.48322,12.99421 4.45438,18.94292 2.97115,5.95106 6.9735,11.14026 12.00469,15.5723 5.03119,4.4344 10.85107,7.92531 17.45966,10.47274 6.60623,2.55214 13.60563,3.82821 20.9982,3.82821 4.24249,0 8.18127,-0.39627 11.81634,-1.18408 3.63743,-0.79017 7.03001,-2.03558 10.1801,-3.73386 L 81.56374,199.26225 z')
		   .fill('red', 'even-odd')
		   .restore();		   
		  */ 
		   
		var sharp = "m 31.526296,208.23455 -17.48556,5.8284 0.0157,31.51021 17.46908,-5.82841 0,-31.5102 z m 4.52736,-43.89588 0.0131,26.0474 9.44083,-3.09464 0,16.5724 -9.4526,3.097 0,31.50785 9.4526,-3.09701 0,16.57476 -9.4526,3.09701 0,28.59482 -4.52736,0 0,-27.32111 -17.48556,5.82841 0,27.31875 -4.52736,0 0,-26.04268 -9.4526,3.09464 0,-16.57239 9.4526,-3.09701 -0.0131,-31.50785 -9.43847,3.09465 0,-16.5724 9.4526,-3.09701 0,-28.59482 4.52736,0 0.0157,27.32111 17.46908,-5.82841 0,-27.32347 4.52736,0 z" ;			  
		 doc.path(scalePath(sharp, 0.3, 10, 10)).fill('#000');  		
		
		 var flat = "m 0.119631,150.69109 5.81283,0 -1.25721,57.37598 c 3.63742,-5.96993 9.26898,-8.95607 16.901689,-8.95371 2.66507,-0.002 5.23835,0.45287 7.72451,1.3657 2.48383,0.91046 4.63332,2.15823 6.45084,3.73622 1.8152,1.58034 3.27018,3.46025 4.36022,5.64914 1.09004,2.18654 1.63625,4.55234 1.63625,7.10684 -0.24254,3.52158 -1.54679,7.44178 -3.90817,11.75353 -2.36373,4.3141 -6.39435,8.53622 -12.08944,12.66399 l -25.631519,18.95235 0,-109.65004 z m 16.901689,55.71308 c -5.082969,0 -8.960559,2.55214 -11.620919,7.65407 -0.71102,6.92521 -1.06652,12.87863 -1.06652,17.86026 0,8.62586 0.29665,14.63825 0.88758,18.03953 2.30253,-1.45769 4.75337,-3.61121 7.35491,-6.46763 2.603867,-2.85641 4.991139,-5.89445 7.171249,-9.11175 2.17775,-3.21966 3.96469,-6.43696 5.35609,-9.65898 1.39141,-3.21966 2.08592,-6.04541 2.08827,-8.47254 -0.002,-2.79509 -0.96997,-5.13494 -2.90523,-7.0172 -1.93762,-1.88463 -4.35784,-2.82576 -7.26543,-2.82576 z";
		  doc.path(flat).stroke();  		
		  
		doc.text('And here is some wrapped text...', 100, 300);
		
		doc.font('Times-Roman', 13);
		
		
		doc  .moveDown()
		   .text('Hejsan hoppsan', {
			 width: 412,
			 align: 'justify',
			 indent: 30,
			 columns: 2,
			 height: 300,
			 ellipsis: true
		   });			
	}
	
	/* INTERFACE nx3.render.ITarget */
	
	public function getScaling():TScaling 
	{
		return this.scaling;
	}
	
	public function clear():Void 
	{
		
	}
	
	public function testLines(x:Float, y:Float, width:Float):Void 
	{
		for (i in -2...3)
		{
			var cy = y + i * scaling.space;
			this.line(x, cy, x + width, cy, scaling.linesWidth, 0x000000);
		}			
	}
	
	public function rect(x:Float, y:Float, rect:Rectangle, ?lineWidth:Float, ?lineColor:Int):Void 
	{
		
	}
	
	public function rectangle(x:Float, y:Float, rect:Rectangle, ?lineWidth:Float, ?lineColor:Int):Void 
	{
		var x = (x + rect.x * scaling.unitX);
		var y = (y + rect.y * scaling.unitY);
		var width = (rect.width * scaling.unitX);
		var height = (rect.height * scaling.unitY);		
		
		trace([x, y, width, height]);
		
		doc.rect(x, y, width, height).fill('#000');
	}
	
	public function rectangles(x:Float, y:Float, rects:Rectangles, ?lineWidth:Float, ?lineColor:Int):Void 
	{
		
	}
	
	public function filledrectangle(x:Float, y:Float, rect:Rectangle, ?lineWidth:Float, ?lineColor:Int, ?fillColor:Int):Void 
	{
		
	}
	
	public function filledellipse(x:Float, y:Float, rect:Rectangle, ?lineWidth:Float, ?lineColor:Int, ?fillColor:Int):Void 
	{
		var cx = (x + (rect.x + rect.width/2) * scaling.unitX);
		var cy = (y + (rect.y + rect.height/2) * scaling.unitY);
		var rx = ((rect.width/2) * scaling.unitX);
		var ry = ((rect.height/2) * scaling.unitY);		
		
		this.doc.ellipse(cx, cy, rx, ry).fill('#000');
		/*
		var ellipse = new Ellipse();
		ellipse.setState( { cx:cx, cy:cy, rx:rx, ry:ry, stroke:'#000', strokeWidth:(lineWidth * this.scaling.linesWidth) } );
		this.children.push(ellipse);		
		*/
		
		
	}
	
	public function line(x:Float, y:Float, x2:Float, y2:Float, ?lineWidth:Float, ?lineColor:Int):Void 
	{
		this.doc.moveTo(x, y).lineTo(x2, y2).stroke();
	}
	
	inline static var SVG_SCALE = 0.178;
	
	public function shape(?shapeId:String, x:Float, y:Float, xmlStr:String, ?fillColor:Int):Void 
	{
		var xml = Xml.parse(xmlStr);
		var elementTag = xml.firstElement().firstChild().firstChild().nodeName.toLowerCase();		
		switch elementTag {
			case 'path':
				
				var pathD = xml.firstElement().firstChild().firstChild().get('d');
				/*
				var segments = SvgTools.toSegments(pathD);
				segments = SvgTools.scaleSegments(segments,SVG_SCALE, SVG_SCALE);
				segments = SvgTools.moveSegments(segments, x + this.scaling.svgX, y + this.scaling.svgY);
				var pathScaled = SvgTools.getPath(segments);	
				*/
				this.doc
					.path(scalePath(pathD, SVG_SCALE, x + this.scaling.svgX, y + this.scaling.svgY  ))					
					.fill('#000')
					;  	
			case 'rect':
				var rectXml = xml.firstElement().firstChild().firstChild();
				var rx = Std.parseFloat(rectXml.get('x')) * SVG_SCALE; 
				var ry = Std.parseFloat(rectXml.get('y')) * SVG_SCALE;
				var width = Std.parseFloat(rectXml.get('width')) * SVG_SCALE * 0.25;
				var height = Std.parseFloat(rectXml.get('height')) * SVG_SCALE * 0.25;		
				
				this.rectangle(x, y, new Rectangle(0, 0.3, width, height) );
				
			case _:
				
		}			
		
	}
	
	public function text(x:Float, y:Float, text:String):Void 
	{
		
	}
	
	public function textwidth(text:String):Float 
	{
		return 0;
	}
	
	public function textheight(text:String):Float 
	{
		return 0;
	}
	
	public function setFont(font:TFontInfo):Void 
	{
		
	}
	
	public function parallellogram(x:Float, y:Float, x2:Float, y2:Float, pheight:Float, ?lineWidth:Float, ?lineColor:Int, ?fillColor:Int):Void 
	{
		var pathStr = 'M ${x} ${y} L ${x2} ${ y2}  L ${x2} ${ y2 + pheight}  L ${x}  ${ y + pheight}  L ${x} ${ y}';
		
		this.doc
		.path(pathStr)
		.fill('#000')
		;
		
	}
	
	public function polyline(x:Float, y:Float, coordinates:Pnts, ?lineWidth:Float = 1, ?lineColor:Int = 0x000000):Void 
	{
		
	}
	
	public function polyfill(x:Float, y:Float, coordinates:Pnts, ?lineWidth:Float = 1, ?lineColor:Int = 0x000000, fillColor:Int = 0x000000):Void 
	{

		var coord = coordinates.shift();
		var pathStr = 'M ' +  Std.string((coord.x * scaling.unitX) + x) + ' ' + Std.string((coord.y * scaling.unitY) + y) +' ';
		for (coord in coordinates) {
			pathStr += 'L ' +  Std.string((coord.x * scaling.unitX) + x) + ' ' + Std.string((coord.y * scaling.unitY) + y) +' ';
		}		
		this.doc
		//.lineWidth(2)
		.path(pathStr)		
		.stroke()
		.fill('#000')
		
		;
		
	}
	
	public function interactiveEllipse(x:Float, y:Float, rect:Rectangle, ?lineWidth:Float, ?lineColor:Int, ?fillColor:Int, cb:EActivityType->Void = null):Void 
	{
		
	}
	
	public function scaleRect(rect:Rectangle, inflateX:Float = 0, inflateY:Float = 0):Rectangle 
	{
		return null;
	}
	
	public function tooltipShow(rect:Rectangle, text:String):Void 
	{
		
	}
	
	public function tooltipHide():Void 
	{
		
	}
	
	function after() 
	{
		//#if hxnodejs
		//	doc.pipe(js.node.Fs.createWriteStream('test2.pdf'));
		//#else
		if (this.iframe == null) throw 'No target iframe';
		
		var stream = doc.pipe(this.blobStream);			
		stream.on('finish', function() {			
			this.iframe.setAttribute('src', stream.toBlobURL('application/pdf'));
		});					
		//#end			
		
		this.doc.end();		
	}
	
	function before() 
	{
		this.doc = new pdfkit.PDFDocument();
		this.doc.scale(0.7);
	}	
	
	
	public function renderToIframe(iframeId:String) {
		this.iframe = js.Browser.document.getElementById(iframeId);
		this.after();		
	}
	
	function scalePath(path:String, factor:Float, moveX:Float=0, moveY:Float=0):String {
		var correctHack = path.startsWith('m 31.526296,208.23455') || path.startsWith('m 0.119631,150.69109 5.81283,0');
		var segments = SvgTools.toSegments(path, correctHack);
		segments = SvgTools.scaleSegments(segments, factor, factor);	
		segments = SvgTools.moveSegments(segments, moveX, moveY);

		var path = SvgTools.getPath(segments);		
		return path;
	}
	
	
}