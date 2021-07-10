const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
var canvas = document.getElementById("canvas");
faceColor = "#000000";
bgColor = "#FFFFFF";
var ctx = canvas.getContext("2d");
ctx.canvas.height = window.innerHeight;
ctx.canvas.width = window.innerHeight;
var radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.9;
setInterval(drawClock, 1);

function drawClock() {
	if (darkThemeMq.matches) {
		faceColor = "#EBEBEB";
		bgColor = "#2F3437";
	} else {
		faceColor = "#0D0D0d";
		bgColor = "#FFFFFF";
	}
	drawFace(ctx, radius);
	drawNumbers(ctx, radius);
	drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
	ctx.beginPath();
	ctx.arc(0, 0, radius, 0, 2 * Math.PI);
	ctx.fillStyle = bgColor;
	ctx.fill();

	ctx.beginPath();
	ctx.arc(0, 0, 8, 0, 2 * Math.PI);
	ctx.fillStyle = faceColor;
	ctx.fill();
}

function drawNumbers(ctx, radius) {
	var num;
	var l;

	for (num = 1; num < 13; num++) {
		ctx.rotate((30 * Math.PI) / 180);
		ctx.fillStyle = faceColor;
		l = (2 * num * num + 2) % 3;
		ctx.fillRect(radius * 0.85, 0, l * 10, 1.5);
	}
}

function drawTime(ctx, radius) {
	var now = new Date();
	var day = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(now);

	var hours = now.getHours();
	var minutes = now.getMinutes();
	var second = now.getSeconds();
	var millisecond = now.getMilliseconds();
	//hour
	var hour_ampm = hours % 12 ? hours % 12 : 12;
	var ampm = hours + minute / 60 + second / 3600 > 12 ? "PM" : "AM";
	var hour =
		((hours % 12) * Math.PI) / 6 +
		(minutes * Math.PI) / (6 * 60) +
		(second * Math.PI) / (360 * 60) +
		(millisecond * Math.PI) / (360 * 60 * 1000);
	drawMinuteHour(ctx, hour, radius * 0.75, 3);
	//minute
	var minute =
		(minutes * Math.PI) / 30 +
		(second * Math.PI) / (30 * 60) +
		(millisecond * Math.PI) / (30 * 60 * 1000);
	drawMinuteHour(ctx, minute, radius * 0.9, 2);
	// second
	second = (second * Math.PI) / 30 + (millisecond * Math.PI) / (30 * 1000);
	drawSecond(ctx, second, radius * 0.9, 1);
	minutes = minutes < 10 ? "0" + minutes : minutes;
	time = hour_ampm + ":" + minutes + " " + ampm;
	drawDigitalClock(ctx, day, time);
	console.log(hour);
	console.log(hours);
}

function drawMinuteHour(ctx, pos, length, width) {
	ctx.beginPath();
	ctx.lineWidth = width;
	ctx.strokeStyle = faceColor;
	ctx.moveTo(0, 0);
	ctx.rotate(pos);
	ctx.lineTo(0, -length);
	ctx.stroke();
	ctx.rotate(-pos);
}
function drawSecond(ctx, pos, length, width) {
	ctx.beginPath();
	ctx.lineWidth = width;
	ctx.strokeStyle = faceColor;
	ctx.moveTo(0, 0);
	ctx.rotate(pos);
	ctx.lineTo(0, -length);
	ctx.lineTo(0, 40);
	ctx.stroke();
	ctx.rotate(-pos);
}

function drawDigitalClock(ctx, day, time) {
	ctx.font = radius * 0.12 + "px calibri";
	ctx.textBaseline = "middle";
	ctx.textAlign = "center";

	ctx.fillText(time, 0, radius * 0.3);

	ctx.fillText(day, 0, radius * 0.45);
}
