var runwayBG = document.getElementById("runwayBG");
runwayBG.width = canvas_x;
runwayBG.height = canvas_y;
var ctxRunwayBG = runwayBG.getContext("2d");

//获取runway图片json
// $.ajax(
// 	{
// 		type: "GET",
// 		url: '../source/runway.json',
// 		data: 'json',
// 		content: "application/json",
// 		cache: false,
// 		success: function (result) {
// 			var frames_runway = [];
// 			result = result.frames;
// 			$.each(result, function (index, value) {
// 				frames_runway.push(result[index]);
// 			});
// 			START.runway = true;
// 			runway(frames_runway);
// 		},
// 		error: function (xhr) {
// 			alert(xhr.responseText);
// 			console.log(xhr.responseText);
// 		}
// 	});
ajax('../source/runway.json', function(result){
	var frames_runway = [];
	result = JSON.parse(result);
	result = result.frames;
	for(var index in result)
	{
		frames_runway.push(result[index]);
	}
	START.runway = true;
	runway(frames_runway);
});	
//定义runway位置，长宽
var runwayWidth = 50;
var runwayHeight = canvas_y;
var runwayPosition_x = (canvas_x - runwayWidth) / 2;
var runwayPosition_y = 0;

var imgRunway = new Image();
imgRunway.src = "../source/runway.png";
var countRunway = 0;
function runway(frames_runway) {
	if (GetJson()) {
		var x = frames_runway[countRunway].frame.x;
		var y = frames_runway[countRunway].frame.y;
		var w = frames_runway[countRunway].frame.w;
		var h = frames_runway[countRunway].frame.h;

		countRunway += 1;
		if (countRunway > 2) {
			countRunway = 0;
		}

		ctxRunwayBG.clearRect(runwayPosition_x, runwayPosition_y, runwayWidth, runwayHeight);
		ctxRunwayBG.drawImage(imgRunway, x, y, w, h, runwayPosition_x, runwayPosition_y, runwayWidth, runwayHeight);
	}

	setTimeout(function () {
		runway(frames_runway);
	}, 100);
}