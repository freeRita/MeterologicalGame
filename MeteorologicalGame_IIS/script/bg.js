var bg = document.getElementById("bg");
bg.width = canvas_x;
bg.height = canvas_y;
var ctxBG = bg.getContext("2d");

//定义字体
ctxBG.font = 'bold 60px consolas';
ctxBG.textAlign = 'left';
ctxBG.textBaseline = 'top';
ctxBG.strokeStyle = '#DF5326';

//判断person是否在runway内部，在则计分，不在则停止计分
function runLength(personPosition_x) {
	if (personPosition_x + personWidth >= runwayPosition_x && personPosition_x <= runwayPosition_x + runwayWidth) {
		personLength += 1;
	}
	
	// 数字的位置
	ctxBG.clearRect(20, weatherPosition_y + weatherHeight + 20, canvas_x - 20 * 2, 60);
	ctxBG.strokeText(personLength, 20, weatherPosition_y + weatherHeight + 20);
}

//获取thunder图片json
// $.ajax(
// 	{
// 		type: "GET",
// 		url: '../source/thunder.json',
// 		data: 'json',
// 		content: "application/json",
// 		cache: false,
// 		success: function (result) {
// 			var frames_thunder = [];
// 			result = result.frames;
// 			$.each(result, function (index, value) {
// 				frames_thunder.push(result[index]);
// 			});
// 			START.thunder = true;
// 			thunder(frames_thunder);
// 		},
// 		error: function (xhr) {
// 			alert(xhr.responseText);
// 			console.log(xhr.responseText);
// 		}
// 	});

ajax('../source/thunder.json', function(result){
	var frames_thunder = [];
	result = JSON.parse(result);
	console.log(typeof(result));
	result = result.frames;
	for(var index in result)
	{
		frames_thunder.push(result[index]);
	}
	START.thunder = true;
	thunder(frames_thunder);
});

//定义thunder位置，长宽
var thunderWidth = 20;
var thunderHeight = canvas_y;
var thunderPosition_x1 = 0;
var thunderPosition_y1 = 0;
var thunderPosition_x2 = canvas_x - 20;
var thunderPosition_y2 = 0;

var imgthunder = new Image();
imgthunder.src = "../source/thunder.png";
var countthunder = 0;
function thunder(frames_thunder) {
	if (GetJson()) {
		var x = frames_thunder[countthunder].frame.x;
		var y = frames_thunder[countthunder].frame.y;
		var w = frames_thunder[countthunder].frame.w;
		var h = frames_thunder[countthunder].frame.h;

		countthunder += 1;
		if (countthunder > 4) {
			countthunder = 0;
		}

		ctxBG.clearRect(thunderPosition_x1, thunderPosition_y1, thunderWidth, thunderHeight);
		ctxBG.drawImage(imgthunder, x, y, w, h, thunderPosition_x1, thunderPosition_y1, thunderWidth, thunderHeight);

		ctxBG.clearRect(thunderPosition_x2, thunderPosition_y2, thunderWidth, thunderHeight);
		ctxBG.drawImage(imgthunder, x, y, w, h, thunderPosition_x2, thunderPosition_y2, thunderWidth, thunderHeight);
	}

	setTimeout(function () {
		thunder(frames_thunder);
	}, 100);
}

//获取weather图片json
// $.ajax(
// 	{
// 		type: "GET",
// 		url: '../source/weather.json',
// 		data: 'json',
// 		content: "application/json",
// 		cache: false,
// 		success: function (result) {
// 			var frames_weather = [];
// 			result = result.frames;
// 			$.each(result, function (index, value) {
// 				frames_weather.push(result[index]);
// 			});
// 			START.weather = true;
// 			weather(frames_weather);
// 			// setTimeout(weather(frames_weather), 100);
// 		},
// 		error: function (xhr) {
// 			alert(xhr.responseText);
// 			console.log(xhr.responseText);
// 		}
// 	});
	
ajax('../source/weather.json', function(result){
	var frames_weather = [];
	result = JSON.parse(result);
	result = result.frames;
	for(var index in result)
	{
		frames_weather.push(result[index]);
	}
	START.weather = true;
	weather(frames_weather);
});	

//定义weather位置，长宽
var weatherWidth = (canvas_x - runwayWidth) / 3; //宽度为runway左边的2/3
var weatherHeight = canvas_y / 4;
var weatherPosition_x = 20;
var weatherPosition_y = 0;
var weatherName;
var onOrOffWeatherName;

var imgWeather = new Image();
imgWeather.src = "../source/weather.png";
function weather(frames_weather) {
	if (GetJson()) {
		// var countweather = Math.floor(Math.random() * 28) + 1;
		var countweather = 15;
		var name = frames_weather[countweather].filename;
		weatherName = name.substring(0, name.indexOf('.'));

		var x = frames_weather[countweather].frame.x;
		var y = frames_weather[countweather].frame.y;
		var w = frames_weather[countweather].frame.w;
		var h = frames_weather[countweather].frame.h;

		ctxBG.clearRect(weatherPosition_x, weatherPosition_y, weatherWidth, weatherHeight);
		ctxBG.drawImage(imgWeather, x, y, w, h, weatherPosition_x, weatherPosition_y, weatherWidth, weatherHeight);

		onOrOffWeatherName = name.substring(0, name.indexOf('.') - 1);
		onOrOffWeatherImpact[onOrOffWeatherName] = true;
		
		//weather影响时间为3秒
		setTimeout(function () {
			ctxBG.clearRect(weatherPosition_x, weatherPosition_y, weatherWidth, weatherHeight);
			weatherName = null;
		}, 3000);
	}	
		//设置weather出现的时间间隔为随机数
		var weatherRandom = Math.floor(Math.random() * 10000);
		while (weatherRandom < 5000) {
		weatherRandom = Math.floor(Math.random() * 10000);
		}

	setTimeout(function () {
		weather(frames_weather);
	}, weatherRandom);
}