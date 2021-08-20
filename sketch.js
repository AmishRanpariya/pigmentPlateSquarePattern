let l = 120;
let rows, cols;
const params = new URLSearchParams(window.location.search);
let colString;
if (params.has("c")) {
	colString = params.get("c");
} else {
	colString = "000000ffffff000000ffffff";
}
function setup() {
	pixelDensity(1);
	let canvas = createCanvas(1080, 1080);
	cols = (width - 120) / l;
	rows = (height - 120) / l;
	canvas.mousePressed(stopr);

	noStroke();
	fill(0, 255, 100);
	background(255);
	translate(60, 60);

	for (let j = 0; j < cols; j++) {
		for (let i = 0; i < rows; i++) {
			randomFill("");
			rect(i * l, j * l, l, l);
			randomFill();
			randomShape(i * l, j * l, l, l);
		}
	}
}
function stopr() {
	noLoop();
	saveCanvas(canvas, "TrouchetTiles");
}
function randomFill() {
	let colorHex = colString;
	let code = random([
		colorHex.slice(0, 6),
		colorHex.slice(6, 12),
		colorHex.slice(12, 18),
		colorHex.slice(18, 24),
	]);
	fill("#" + code);
	return code;
}

function chooseDiffThen(oldCol) {
	while (randomFill() === oldCol) {}
}

function draw() {
	noLoop();
}

function randomPI() {
	return random([0, PI / 2, (3 * PI) / 2]);
}
function randomShape(x, y, w, h, colString) {
	let r = random(0, 1);
	if (r < 0.25) {
		let bgCol = randomFill();
		arc(x + w, y + h, w * 2, h * 2, PI, (3 * PI) / 2); //bg
		chooseDiffThen(bgCol);
		arc(x, y, w * 2, h * 2, 0, PI / 2);
	} else if (r < 0.5) {
		let bgCol = randomFill();
		arc(x, y + h, w * 2, h * 2, -PI / 2, 0);
		chooseDiffThen(bgCol);
		arc(x + w, y, w * 2, h * 2, PI / 2, PI);
	} else if (r < 0.75) {
		let bgCol = randomFill();
		arc(x + w, y, w * 2, h * 2, PI / 2, PI);
		chooseDiffThen(bgCol);
		arc(x, y + h, w * 2, h * 2, -PI / 2, 0);
	} else {
		let bgCol = randomFill();
		arc(x, y, w * 2, h * 2, 0, PI / 2);
		chooseDiffThen(bgCol);
		arc(x + w, y + h, w * 2, h * 2, PI, (3 * PI) / 2);
	}
}
