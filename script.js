window.addEventListener("load", function onWindowLoad() {
	let canvas = document.querySelector('#canvas');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	let context = canvas.getContext('2d');
	context.lineCap = "round";
	let boxPoint = document.querySelector('#boxPoint');
	let range = document.querySelector('#range');
	let coordinates = document.querySelector('#coordinates');
	let myColor;
	generatePalette(document.querySelector("#palette"));


	document.querySelector('#color').oninput = function changeColor(e) {
		myColor = e.target.value;
	}


	document.querySelector(".eraser").onclick = function setWhiteColor() {
		myColor = 'white';


	}

	// выполняется при движение мыши 
	canvas.onmousemove = function mouseMove(e) {
		let x = e.offsetX;
		let y = e.offsetY;
		let dx = e.movementX;
		let dy = e.movementY;

		coordinates.innerHTML = "X : " + x + " px " + "&nbsp;" + " Y : " + y + " px";

		// Проверяем зажата ли какая-нибудь кнопка мыши
		if (e.buttons > 0) {
			context.beginPath();
			context.moveTo(x, y);
			context.lineTo(x - dx, y - dy);
			context.strokeStyle = myColor;
			context.stroke();
			context.closePath();
		}
	}

	range.oninput = function boxPointNumber(e) {
		boxPoint.innerHTML = e.target.value;
		context.lineWidth = e.target.value;
	}

	// document.querySelector('#buttonClear').onclick = clear();

	// document.keydown = function (e) {
	// 	if (e.keyCode == 32) {
	// 		clear();
	// 	}
	// }

	// function clear() {
	// 	context.clearRect(0, 0, canvas.width, canvas.height);
	// }

	document.getElementById("buttonClear").onclick = function clear() {
		context.clearRect(0, 0, canvas.width, canvas.height);
	};

	function clear() {
		context.clearRect(0, 0, canvas.width, canvas.height);
	}

	document.addEventListener('keydown', function (e) {
		if (e.keyCode == 68) {
			clear();
		};
	})

	//сохранение
	// document.getElementById("buttonSave").onclick = function save(){
	download_img = function (e) {
		var image = canvas.toDataURL("image/jpg");
		e.href = image;

	}

	function generatePalette(palette) {
		for (var r = 0, max = 2; r <= max; r++) {
			for (var g = 0; g <= max; g++) {
				for (var b = 0; b <= max; b++) {
					var paletteBlock = document.createElement('div');
					paletteBlock.className = 'paletteBox';
					paletteBlock.addEventListener('click', function changeColor(e) {
						myColor = e.target.style.backgroundColor;
					});

					paletteBlock.style.backgroundColor = (
						'rgb(' + Math.round(r * 255 / max) + ", " +
						Math.round(g * 255 / max) + ", " +
						Math.round(b * 255 / max) + ")"
					);

					palette.appendChild(paletteBlock);
				}
			}
		}
	}
});







