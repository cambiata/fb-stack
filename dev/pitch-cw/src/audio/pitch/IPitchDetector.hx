package audio.pitch;

interface IPitchDetector {
    function setupAnalyserNode(source:Dynamic):js.html.audio.AnalyserNode;
    function getHerz():Float;
}


