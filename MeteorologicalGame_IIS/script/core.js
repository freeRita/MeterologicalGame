var canvas_x = window.innerWidth - 16;
var canvas_y = window.innerHeight - 50;
var START =
	{
		"runway": false,
		"person": false,
		"weather": false,
		"thunder": false
	}

function ajax(url, fnSucc, fnFaild) {
	//1.创建对象
	var oAjax = null;
	if (window.XMLHttpRequest) {
		oAjax = new XMLHttpRequest();
	} else {
		oAjax = new ActiveXObject("Microsoft.XMLHTTP");
	}
      
	//2.连接服务器  
	oAjax.open('GET', url, true);   //open(方法, url, 是否异步)
	
	//3.发送请求  
	oAjax.send();
      
	//4.接收返回
	oAjax.onreadystatechange = function () {  //OnReadyStateChange事件
		if (oAjax.readyState == 4) {    //4为完成
			if (oAjax.status == 200) {    //200为成功
				fnSucc(oAjax.responseText);
			} else {
				if (fnFaild) {
					fnFaild();
				}
			}
		}
	};
}

function GetJson() {
	if (START.runway == true && START.person == true && START.weather == true && START.thunder == true) {
		return true;
	}
	else {
		return false;
	}
}

window.onload = function () {
	//重力感应，控制person左右行为
	if (window.DeviceOrientationEvent) {
		window.addEventListener("deviceorientation", deviceOrientationListener);
	} else {
		alert("Sorry, your browser doesn't support Device Orientation");
	}
	
	// 点击炮弹，使weatherImpact失效。
	window.addEventListener("click", function (e) {
		var x, y;
		if (event.layerX || event.layerX == 0) {
			x = event.layerX;
			y = event.layerY;
		} else if (event.offsetX || event.offsetX == 0) { // Opera   
			x = event.offsetX;
			y = event.offsetY;
		}
		if (x > getShellsPosition_x && x < getShellsPosition_x + getShellsWidth && y > getShellsPosition_y && y < getShellsPosition_y + getShellsHeight && shellOne == true) {
			onOrOffWeatherImpact[onOrOffWeatherName] = false;
			weatherName = null;
			ctxBG.clearRect(getShellsPosition_x, getShellsPosition_y, getShellsWidth, getShellsHeight);
			shellOne = false;
		}
	});
};

function deviceOrientationListener(event) {
	var move = event.gamma;
	personPosition_x += move;
	console.log('device');
}
	
// 键盘左右键控制
// window.onload = function() {
// 	window.addEventListener("keydown", personLeftRight);
// 	window.addEventListener("keyup", stopPersonLeftRight);
// };
// var move = 5;
// function personLeftRight(event) {
// 	move += 1;
// 	if (event.keyCode == 37) {
// 		personPosition_x -= move;
// 	}
// 	else if (event.keyCode == 39) {
// 		personPosition_x += move;
// 	}
// }
// function stopPersonLeftRight() {
// 		move = 5;
// }
	
// 判断是否碰左右闪电
function winOrLose() {
	if (personPosition_x + personWidth > canvas_x - 20) {
		alert("YOU LOSE!!!");
		replay();
		return;
	}
	else if (personPosition_x < 20) {
		alert("YOU LOSE!!!");
		replay();
		return;
	}
}
	
// 重新初始化程序
function replay() {
	// 初始化person位置
	personPosition_x = (canvas_x - personWidth) / 2;
	personPosition_y = canvas_y - personHeight;
	personLength = 0;
	// 清空天气图标
	ctxBG.clearRect(weatherPosition_x, weatherPosition_y, weatherWidth, weatherHeight);
	// 清空天气影响
	weatherName = null;
	onOrOffWeatherImpact =
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
	// 清空炮弹图标
	ctxBG.clearRect(getShellsPosition_x, getShellsPosition_y, getShellsWidth, getShellsHeight);
	// 清空炮弹功能
	shellOne = false;
}	
	
/////////////////////////////////////////
// 判断是否有天气影响
/////////////////////////////////////////
function weatherImpact() {
	if (weatherName) {
		switch (weatherName) {
			case 'gale1':
				personPosition_x += canvas_x / 50;
				break;
			case 'gale2':
				personPosition_x += canvas_x / 60;
				break;
			case 'gale3':
				personPosition_x += canvas_x / 70;
				break;
			case 'gale4':
				personPosition_x += canvas_x / 80;
				break;
			case 'hail1':
				hailsRandom(7, 7);
				weatherName = null;
				break;
			case 'hail2':
				hailsRandom(5, 5);
				weatherName = null;
				break;
			case 'hail3':
				hailsRandom(3, 3);
				weatherName = null;
				break;
			case 'haze1':
				haze(0.2);
				break;
			case 'haze2':
				haze(0.4);
				break;
			case 'haze3':
				haze(0.6);
				break;
			case 'heat1':
				personLength -= 4;
				break;
			case 'heat2':
				personLength -= 3;
				break;
			case 'heat3':
				personLength -= 2;
				break;
			case 'heat4':
				personLength -= 1;
				break;
			case 'lighting1':
				lightingsRandom(4);
				weatherName = null;
				break;
			case 'lighting2':
				lightingsRandom(3);
				weatherName = null;
				break;
			case 'lighting3':
				lightingsRandom(2);
				weatherName = null;
				break;
			case 'lighting4':
				lightingsRandom(1);
				weatherName = null;
				break;
			case 'rain1':
				rainsRandom(20, 4);
				break;
			case 'rain2':
				rainsRandom(15, 3);
				break;
			case 'rain3':
				rainsRandom(10, 2);
				break;
			case 'rain4':
				rainsRandom(5, 1);
				break;
			case 'road1':
				personPosition_x += 20 - Math.random() * 40;
				break;
			case 'road2':
				personPosition_x += 15 - Math.random() * 30;
				break;
			case 'road3':
				personPosition_x += 10 - Math.random() * 20;
				break;
			case 'road4':
				personPosition_x += 5 - Math.random() * 10;
				break;
			case 'snow1':
				snowsRandom(20, 4);
				break;
			case 'snow2':
				snowsRandom(15, 3);
				break;
			case 'snow3':
				snowsRandom(10, 2);
				break;
			case 'snow4':
				snowsRandom(5, 1);
				break;
		}
	}
	else {
		if (ctxBG.globalAlpha < 1) {
			ctxBG.globalAlpha += 0.1;
		}
		if (ctxRunwayBG.globalAlpha < 1) {
			ctxRunwayBG.globalAlpha += 0.1;
		}
	}
}