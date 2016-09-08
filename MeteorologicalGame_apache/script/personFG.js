var personFG = document.getElementById("personFG");
personFG.width = canvas_x;
personFG.height = canvas_y;
var ctxPersonFG = personFG.getContext("2d");
	
//获取person图片json
// $.ajax(
// 	{
// 		type: "GET",
// 		url: '../source/person.json',
// 		data: 'json',
// 		content: "application/json",
// 		cache: false,
// 		success: function (result) {
// 			var frames_person = [];
// 			result = result.frames;
// 			$.each(result, function (index, value) {
// 				frames_person.push(result[index]);
// 			});
// 			START.person = true;
// 			person(frames_person);
// 		},
// 		error: function (xhr) {
// 			alert(xhr.responseText);
// 			console.log(xhr.responseText);
// 		}
// 	});
ajax('../source/person.json', function(result){
	var frames_person = [];
	result = JSON.parse(result);
	result = result.frames;
	for(var index in result)
	{
		frames_person.push(result[index]);
	}
	START.person = true;
	person(frames_person);
});	
	

//定义person位置，长宽
var personWidth = 30;
var personHeight = 30;
var personPosition_x = (canvas_x - personWidth) / 2;
var personPosition_y = canvas_y - personHeight;
var personLength = 0; //定义跑的公里数

var imgPerson = new Image();
imgPerson.src = "../source/person.png";
var countPerson = 0;
function person(frames_person) {
	if (GetJson()) {
		var x = frames_person[countPerson].frame.x;
		var y = frames_person[countPerson].frame.y;
		var w = frames_person[countPerson].frame.w;
		var h = frames_person[countPerson].frame.h;

		countPerson += 1;
		if (countPerson > 7) {
			countPerson = 2;
		}

		weatherImpact();
		
		// 因为不能清除掉runway，所以分两部分清楚
		ctxPersonFG.clearRect(0, personPosition_y, canvas_x, personHeight); //清楚runway前面的一部分
		ctxPersonFG.drawImage(imgPerson, x, y, w, h, personPosition_x, personPosition_y, personWidth, personHeight);

		runLength(personPosition_x);
		winOrLose();
	}

	setTimeout(function () {
		person(frames_person);
	}, 50);
}

