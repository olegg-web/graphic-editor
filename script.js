window.addEventListener("load", function onWindowLoad() {
	let canvas = document.querySelector('#canvas');
	let context = canvas.getContext('2d');	
	let boxPoint = document.querySelector('#boxPoint');
	let range = document.querySelector('#range');
	let coordinates = document.querySelector('#coordinates');
	let myColor;
	let drawLineMode, drawLine;
	let lx, ly, ldx, ldy;
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	context.lineCap = "round";
	generatePalette(document.querySelector("#palette"));


	document.querySelector('#color').oninput = function changeColor(e) {
		myColor = e.target.value;
	}


	document.querySelector(".eraser").onclick = function setWhiteColor() {
		myColor = 'white';
	}

	document.querySelector(".line").onclick = function drawLine() {
		drawLineMode = true;
		drawLine = true;
	}

	canvas.addEventListener('click', function drawLines(e) {
		if (drawLineMode) {
			if (drawLine) {
				lx = e.offsetX;
				ly = e.offsetY;
				drawLine = false;
			} else {
				ldx = e.offsetX;
				ldy = e.offsetY;
				context.beginPath();
				context.moveTo(lx, ly);
				context.lineTo(ldx, ldy);
				context.strokeStyle = myColor;
				context.stroke();
				context.closePath();
				drawLine = true;
			}
		}
	});


	// выполняется при движение мыши 
	canvas.onmousemove = function mouseMove(e) {
		let x = e.offsetX;
		let y = e.offsetY;
		let dx = e.movementX;
		let dy = e.movementY;

		coordinates.innerHTML = "X : " + x + " px " + "&nbsp;" + " Y : " + y + " px";

		// Проверяем зажата кнопка мыши
		if (e.which == 1) {
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

	document.querySelector("#buttonClear").onclick = function clearBtn() {
		clear();
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

	download_img = function (e) {
		let image = canvas.toDataURL("image/jpg");
		e.href = image;
	}
	//генерация цветов

	function generatePalette(palette) {
		for (let r = 0, max = 2; r <= max; r++) {
			for (let g = 0; g <= max; g++) {
				for (let b = 0; b <= max; b++) {
					let paletteBlock = document.createElement('div');
					paletteBlock.className = 'paletteBox';
					paletteBlock.addEventListener('click', function changeColor(e) {
						myColor = e.target.style.backgroundColor;
						drawLineMode = false;
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
