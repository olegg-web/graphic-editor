"use strict";
window.addEventListener("load", function onWindowLoad() {
  let canvas = document.querySelector('#canvas');
  let context = canvas.getContext('2d');
  let boxPoint = document.getElementById('boxPoint');
  let range = document.getElementById('range');
  let coordinates = document.getElementById('coordinates');
  generatePalette(document.getElementById("palette"));

  let myColor;

  document.getElementById('color').oninput = function () {
    myColor = this.value;
  };

  document.getElementById('palette').onclick = function () {
    myColor = this.value;
  };

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  context.lineCap = "round";
  // выполняется при движение мыши 
  canvas.onmousemove = function mouse(e) {

    let x = e.offsetX;
    let y = e.offsetY;
    let dx = e.movementX;
    let dy = e.movementY;

    coordinates.innerHTML = "X : " + x + " px " + "&nbsp;&nbsp;" + " Y : " + y + " px";

    // Проверяем зажата ли какая-нибудь кнопка мыши
    if (e.buttons > 0) {
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(x - dx, y - dy);
      context.strokeStyle = myColor;
      context.stroke();
      context.closePath();
    }
  };
  range.onchange = function sizePoint(e) {
    context.lineWidth = e.target.value;
  }
  range.oninput = function boxPointNumber(e) {
    boxPoint.innerHTML = e.target.value;
  }

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

  function generatePalette(palette) {

    for (var r = 0, max = 2; r <= max; r++) {
      for (var g = 0; g <= max; g++) {
        for (var b = 0; b <= max; b++) {
          var paletteBlock = document.createElement('div');
          paletteBlock.className = 'paletteBox';
          paletteBlock.addEventListener('click', function changeColor(e) {
            context.strokeStyle = e.target.style.backgroundColor;
          });

          paletteBlock.style.backgroundColor = (
            'rgb(' + Math.round(r * 255 / max) + ", "
            + Math.round(g * 255 / max) + ", "
            + Math.round(b * 255 / max) + ")"
          );

          palette.appendChild(paletteBlock);
        }
      }
    }
  };

});








// context.globalCompositeOperation = 'destination-out'; // 
// context.fillStyle="rgba(255,255,255,1)"; // зададим белый цвет
// context.beginPath(); 
// context.arc(120, 80, 70, 0, Math.PI*2, FALSE); 
// context.closePath(); 
// context.fill(); 
// context.globalCompositeOperation = "source-over"; // 

