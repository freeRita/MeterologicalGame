var weatherFG = document.getElementById("weatherFG");
weatherFG.width = canvas_x;
weatherFG.height = canvas_y;
var ctxWeatherFG = weatherFG.getContext("2d");

// 天气影响部分
var onOrOffWeatherImpact =
	{
		"gale": false,
		"hail": false,
		"haze": false,
		"heat": false,
		"lighting": false,
		"rain": false,
		"road": false,
		//"sand": false,
		"snow": false,
		//"typhoon": false,
	};
	
///////////////////////////////////////
// 冰雹
///////////////////////////////////////
//产生随机hails位置
function hailsSize(speed) {
	var array = [];
	var hailsWidth = 30;
	array.push(hailsWidth);

	var hailsHeight = 30;
	array.push(hailsHeight);

	var hailsPosition_x = Math.floor(Math.random() * (canvas_x - hailsWidth));
	array.push(hailsPosition_x);

	var hailsPosition_y = -hailsHeight;
	array.push(hailsPosition_y);

	var hailsSpeed = speed; //定义hails下降速度
	array.push(hailsSpeed);

	return array;
}

//
var imghails = new Image();
imghails.src = "../source/hails.png";

// 定义每个hails的位置，大小
function hails(hailsPosition_x, hailsPosition_y, hailsWidth, hailsHeight, hailsSpeed) {
	this.x = hailsPosition_x;
	this.y = hailsPosition_y;
	this.w = hailsWidth;
	this.h = hailsHeight;
	this.s = hailsSpeed;
}

// 每个hails的移动
hails.prototype.movehails = function () {
	ctxWeatherFG.clearRect(this.x, this.y - this.s, this.w, this.h);
	ctxWeatherFG.drawImage(imghails, 50, 50, 50, 50, this.x, this.y, this.w, this.h);

	this.y += this.s;
}

// 碰到hails，游戏结束
hails.prototype.gethails = function () {
	alert("YOU LOSE!!!");
	replay();
}

// 显示移动的hails，并判断是否碰到hails
function showhails(hailObject) {
	if (onOrOffWeatherImpact.hail == true) {
		hailObject.movehails();

		if (hailObject.y - hailObject.s + hailObject.h > personPosition_y && personPosition_x + personWidth > hailObject.x && personPosition_x < hailObject.x + hailObject.w) {
			ctxWeatherFG.clearRect(hailObject.x, hailObject.y - hailObject.s, hailObject.w, hailObject.h);

			hailObject.gethails();
			return;
		}
		else if (hailObject.y - hailObject.s + hailObject.h > canvas_y) {
			ctxWeatherFG.clearRect(hailObject.x, hailObject.y - hailObject.s, hailObject.w, hailObject.h);
			return;
		}

		setTimeout(function () {
			showhails(hailObject);
		}, 50);
	}
	else {
		ctxWeatherFG.clearRect(hailObject.x, hailObject.y - hailObject.s, hailObject.w, hailObject.h);
		return;
	}
}

//产生随机时间，随机生成hails
var hailsCount = 0;
function hailsRandom(speed, num) {
	if (hailsCount == num || onOrOffWeatherImpact.hail == false) {
		hailsCount = 0;
		return;
	}
	hailsCount += 1;

	var array = hailsSize(speed + Math.random() * 10);
	var hailObject = new hails(array[2], array[3], array[0], array[1], array[4]);

	showhails(hailObject);

	setTimeout(function () {
		hailsRandom(speed, num);
	}, 3000 / num);
}

/////////////////////////////////////////
// 雾霾
/////////////////////////////////////////
function haze(num) {
	if (onOrOffWeatherImpact.haze == true) {
		if (ctxBG.globalAlpha >= num) {
			ctxBG.globalAlpha -= 0.1; // 雾霾影响速度
			ctxRunwayBG.globalAlpha -= 0.1;
		}
	}
	else {
		ctxBG.golbalAlpha = 1;
		ctxRunwayBG.globalAlpha = 1;
	}
}

//////////////////////////////////////////////////
// 雷电 49*447
/////////////////////////////////////////////////
// 产生随机lightings位置
function lightingsSize() {
	var array = [];
	var lightingsWidth = 49;
	array.push(lightingsWidth);

	var lightingsHeight = 0;
	array.push(lightingsHeight);

	var lightingsPosition_x = Math.floor(Math.random() * (canvas_x - lightingsWidth));
	array.push(lightingsPosition_x);

	var lightingsPosition_y = 0;
	array.push(lightingsPosition_y);

	var lightingsSpeed = 30; //定义lightings下降速度
	array.push(lightingsSpeed);

	var lightingsCanvasHeight = 0;
	array.push(lightingsCanvasHeight);

	var lightingsCanvasSpeed = canvas_y / (447 / lightingsSpeed);
	array.push(lightingsCanvasSpeed);

	return array;
}

var imglightings = new Image();
imglightings.src = "../source/lighting.png";

// 定义每个lightings的位置，大小
function lightings(lightingsPosition_x, lightingsPosition_y, lightingsWidth, lightingsHeight, lightingsSpeed, lightingsCanvasHeight, lightingsCanvasSpeed) {
	this.x = lightingsPosition_x;
	this.y = lightingsPosition_y;
	this.w = lightingsWidth;
	this.h = lightingsHeight;
	this.s = lightingsSpeed;
	this.ch = lightingsCanvasHeight;
	this.cs = lightingsCanvasSpeed;
}

// 每个lightings的移动
lightings.prototype.movelightings = function () {
	ctxWeatherFG.clearRect(this.x, this.y, this.w, this.ch - this.cs);
	ctxWeatherFG.drawImage(imglightings, 0, 0, 49, this.h, this.x, this.y, this.w, this.ch);

	this.h += this.s;
	this.ch += this.cs;
}

// 碰到lightings，游戏结束
lightings.prototype.getlightings = function () {
	alert("YOU LOSE!!!");
	replay();
}

// 显示移动的lightings，并判断是否碰到lightings
function showlightings(lightingObject) {
	if (onOrOffWeatherImpact.lighting == true) {
		lightingObject.movelightings();

		if (personPosition_x + personWidth > lightingObject.x && personPosition_x < lightingObject.x + lightingObject.w && lightingObject.ch - lightingObject.cs > personPosition_y) {
			ctxWeatherFG.clearRect(lightingObject.x, lightingObject.y, lightingObject.w, lightingObject.ch - lightingObject.cs);

			lightingObject.getlightings();
			return;
		}
		else if (lightingObject.ch - 2*lightingObject.cs > canvas_y) {
			ctxWeatherFG.clearRect(lightingObject.x, lightingObject.y, lightingObject.w, lightingObject.ch - lightingObject.cs);
			return;
		}

		setTimeout(function () {
			showlightings(lightingObject);
		}, 50);
	}
	else {
		ctxWeatherFG.clearRect(lightingObject.x, lightingObject.y, lightingObject.w, lightingObject.ch - lightingObject.cs);
		return;
	}
}

//产生随机时间，随机生成lightings
var lightingsCount = 0;
function lightingsRandom(num) {
	if (lightingsCount == num) {
		lightingsCount = 0;
		return;
	}
	lightingsCount += 1;

	var array = lightingsSize();
	var lightingObject = new lightings(array[2], array[3], array[0], array[1], array[4], array[5], array[6]);

	showlightings(lightingObject);

	setTimeout(function () {
		lightingsRandom(num);
	}, 3000 / num);
}

////////////////////////////////////////////////
// 雨 10*10
////////////////////////////////////////////////
//产生随机rains位置
function rainsSize(speed) {
	var array = [];
	var rainsWidth = 10;
	array.push(rainsWidth);

	var rainsHeight = 10;
	array.push(rainsHeight);

	var rainsPosition_x = Math.floor(Math.random() * (canvas_x - rainsWidth));
	array.push(rainsPosition_x);

	var rainsPosition_y = -rainsHeight;
	array.push(rainsPosition_y);

	var rainsSpeed = speed; //定义rains下降速度
	array.push(rainsSpeed);

	return array;
}

//
var imgrains = new Image();
imgrains.src = "../source/rain.png";

// 定义每个rains的位置，大小
function rains(rainsPosition_x, rainsPosition_y, rainsWidth, rainsHeight, rainsSpeed) {
	this.x = rainsPosition_x;
	this.y = rainsPosition_y;
	this.w = rainsWidth;
	this.h = rainsHeight;
	this.s = rainsSpeed;
}

// 每个rains的移动
rains.prototype.moverains = function () {
	ctxWeatherFG.clearRect(this.x, this.y - this.s, this.w, this.h);
	ctxWeatherFG.drawImage(imgrains, 0, 0, this.w, this.h, this.x, this.y, this.w, this.h);

	this.y += this.s;
}

// 显示移动的rains
function showrains(rainObject) {
	if (onOrOffWeatherImpact.rain == true) {
		rainObject.moverains();

    if (rainObject.y - rainObject.s + rainObject.h > canvas_y) {
			ctxWeatherFG.clearRect(rainObject.x, rainObject.y - rainObject.s, rainObject.w, rainObject.h);
			return;
		}

		setTimeout(function () {
			showrains(rainObject);
		}, 50);
	}
	else {
		ctxWeatherFG.clearRect(rainObject.x, rainObject.y - rainObject.s, rainObject.w, rainObject.h);
		return;
	}
}

//产生随机时间，随机生成rains
var rainsCount = 0;
function rainsRandom(speed, num) {
	if (rainsCount == num || onOrOffWeatherImpact.rain == false || weatherName == null) {
		rainsCount = 0;
		return;
	}
	rainsCount += 1;

	var array = rainsSize(speed + Math.random() * 10);
	var rainObject = new rains(array[2], array[3], array[0], array[1], array[4]);

	showrains(rainObject);

	setTimeout(function () {
		rainsRandom(speed, num);
	}, 3000 / num);
}

//////////////////////////////////////////////
// 雪 10*10
//////////////////////////////////////////////
//产生随机snows位置
function snowsSize(speed) {
	var array = [];
	var snowsWidth = 10;
	array.push(snowsWidth);

	var snowsHeight = 10;
	array.push(snowsHeight);

	var snowsPosition_x = Math.floor(Math.random() * (canvas_x - snowsWidth));
	array.push(snowsPosition_x);

	var snowsPosition_y = -snowsHeight;
	array.push(snowsPosition_y);

	var snowsSpeed = speed; //定义snows下降速度
	array.push(snowsSpeed);

	return array;
}

//
var imgsnows = new Image();
imgsnows.src = "../source/snow.png";

// 定义每个snows的位置，大小
function snows(snowsPosition_x, snowsPosition_y, snowsWidth, snowsHeight, snowsSpeed) {
	this.x = snowsPosition_x;
	this.y = snowsPosition_y;
	this.w = snowsWidth;
	this.h = snowsHeight;
	this.s = snowsSpeed;
}

// 每个snows的移动
snows.prototype.movesnows = function () {
	ctxWeatherFG.clearRect(this.x, this.y - this.s, this.w, this.h);
	ctxWeatherFG.drawImage(imgsnows, 0, 0, this.w, this.h, this.x, this.y, this.w, this.h);

	this.y += this.s;
}

// 显示移动的snows，并判断是否碰到snows
function showsnows(snowObject) {
	if (onOrOffWeatherImpact.snow == true) {
		snowObject.movesnows();

    if (snowObject.y - snowObject.s + snowObject.h > canvas_y) {
			ctxWeatherFG.clearRect(snowObject.x, snowObject.y - snowObject.s, snowObject.w, snowObject.h);
			return;
		}

		setTimeout(function () {
			showsnows(snowObject);
		}, 50);
	}
	else {
		ctxWeatherFG.clearRect(snowObject.x, snowObject.y - snowObject.s, snowObject.w, snowObject.h);
		return;
	}
}

//产生随机时间，随机生成snows
var snowsCount = 0;
function snowsRandom(speed, num) {
	if (snowsCount == num || onOrOffWeatherImpact.snow == false || weatherName == null) {
		snowsCount = 0;
		return;
	}
	snowsCount += 1;

	var array = snowsSize(speed + Math.random() * 10);
	var snowObject = new snows(array[2], array[3], array[0], array[1], array[4]);

	showsnows(snowObject);

	setTimeout(function () {
		snowsRandom(speed, num);
	}, 3000 / num);
}
