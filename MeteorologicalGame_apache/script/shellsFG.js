var shellsFG = document.getElementById("shellsFG");
shellsFG.width = canvas_x;
shellsFG.height = canvas_y;
var ctxShellsFG = shellsFG.getContext("2d");

//shells.png 长：100 宽：100

//产生随机shells位置，长宽
function shellsSize() {
	var array = [];
	var shellsWidth = Math.floor(Math.random() * 50);
	while (shellsWidth < 10) {
		shellsWidth = Math.floor(Math.random() * 50);
	}
	array.push(shellsWidth);

	var shellsHeight = 30;
	array.push(shellsHeight);

	var shellsPosition_x = Math.floor(Math.random() * (canvas_x - shellsWidth));
	array.push(shellsPosition_x);

	var shellsPosition_y = -shellsHeight;
	array.push(shellsPosition_y);

	var shellsSpeed = Math.floor(Math.random() * 50); //定义shells下降速度
	while (shellsSpeed < 10) {
		shellsSpeed = Math.floor(Math.random() * 50);
	}
	array.push(shellsSpeed);

	return array;
}

//
var imgShells = new Image();
imgShells.src = "../source/shells.png";

// 定义每个shells的位置，大小
function shells(shellsPosition_x, shellsPosition_y, shellsWidth, shellsHeight, shellsSpeed) {
	this.x = shellsPosition_x;
	this.y = shellsPosition_y;
	this.w = shellsWidth;
	this.h = shellsHeight;
	this.s = shellsSpeed;
}

// 每个炮弹的移动
shells.prototype.moveShells = function () {
	ctxShellsFG.clearRect(this.x, this.y - this.s, this.w, this.h);
	ctxShellsFG.drawImage(imgShells, 0, 0, 100, 100, this.x, this.y, this.w, this.h);

	this.y += this.s;
}

// 吃到炮弹后，炮弹出现的位置
var getShellsPosition_x = (canvas_x - runwayWidth) / 6;
var getShellsPosition_y = canvas_y - 30 - personHeight - 20;
var getShellsWidth = 50;
var getShellsHeight = 50;
var shellOne = false;
shells.prototype.getShells = function () {
	ctxBG.clearRect(getShellsPosition_x, getShellsPosition_y, getShellsWidth, getShellsHeight);
	ctxBG.drawImage(imgShells, 0, 0, 100, 100, getShellsPosition_x, getShellsPosition_y, getShellsWidth, getShellsHeight);
	shellOne = true;
}

// 显示移动的炮弹，并判断是否吃到炮弹
function showShells(shellObject) {
	shellObject.moveShells();

	if (shellObject.y - shellObject.s + shellObject.h > personPosition_y && personPosition_x + personWidth > shellObject.x && personPosition_x < shellObject.x + shellObject.w) {
		ctxShellsFG.clearRect(shellObject.x, shellObject.y - shellObject.s, shellObject.w, shellObject.h);

		shellObject.getShells();
		return;
	}
	else if (shellObject.y - shellObject.s + shellObject.h > canvas_y) {
		ctxShellsFG.clearRect(shellObject.x, shellObject.y - shellObject.s, shellObject.w, shellObject.h);
		return;
	}

	setTimeout(function () {
		showShells(shellObject);
	}, 50);
}

//产生随机时间，随机生成炮弹
function shellsRandom() {
	var t = Math.floor(Math.random() * 4000);
	while (t < 2000) {
		t = Math.floor(Math.random() * 4000);
	}

	var array = shellsSize();
	var shellObject = new shells(array[2], array[3], array[0], array[1], array[4]);

	showShells(shellObject);

	setTimeout(function () {
		shellsRandom();
	}, t);
}

shellsRandom();
