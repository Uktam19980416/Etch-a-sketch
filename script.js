const color = document.querySelector('.color');
const colorMode = document.querySelector('.color__mode');
const rainbowMode = document.querySelector('.rainbowe__mode');
const eraser = document.querySelector('.eraser__mode');
const clearMode = document.querySelector('.clear__mode');
const sizeSlider = document.querySelector('.size__slider');
const blockSize = document.querySelector('.block__size');
const paperBlock = document.querySelector('.paper__block');

let currentColor = '#000000';
let currentMode = 'color';
let currentSize = 10;
let mousedown = false;

document.body.addEventListener('mousedown', () => mousedown = true);
document.body.addEventListener('mouseup', () => mousedown = false);

const setcurrentColor = (newColor) => {
  currentColor = newColor;
}

const setcurrentMode = (newMode) => {
  activateMode(newMode);
  currentMode = newMode;
}

const setcurrentSize = (newSize) => {
  currentSize = newSize;
}

function activateMode(newMode) {
  if (currentMode === "color") {
    colorMode.classList.remove("active");
  } else if (currentMode === "rainbow") {
    rainbowMode.classList.remove("active");
  } else if (currentMode === "eraser") {
    eraser.classList.remove("active");
  }

  if (newMode === "color") {
    colorMode.classList.add("active");
  } else if (newMode === "rainbow") {
    rainbowMode.classList.add("active");
  } else if (newMode === "eraser") {
    eraser.classList.add("active");
  }
}

color.addEventListener('input', (event) => { 
  setcurrentColor(event.target.value);
  console.log(event.target.value)
});
colorMode.addEventListener('click', () => {
  setcurrentMode("color");
});
rainbowMode.addEventListener('click', () => {
  setcurrentMode("rainbow");
});
eraser.addEventListener('click', () => {
  setcurrentMode("eraser");
});
clearMode.addEventListener('click', reloadBlock);
sizeSlider.addEventListener('mousemove', (e) => {
  changeSliderSize(e.target.value);
});
sizeSlider.addEventListener('change', (e) => {
  changeSize(e.target.value);
});

function setBlock(size) {
  paperBlock.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  paperBlock.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  for (let i = 0; i < size * size; i++) {
    const block = document.createElement('div');
    block.classList.add('block-element');
    block.addEventListener('mouseover', changeColorBlock);
    block.addEventListener('mousedown', changeColorBlock);
    paperBlock.appendChild(block);
  }
}

function changeColorBlock(e) {
  if (e.type === "mouseover" && !mousedown) { return; }
  if (currentMode === "color") {
    e.target.style.backgroundColor = currentColor;
  } else if (currentMode === "rainbow") {
    e.target.style.backgroundColor =
      `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  } else if (currentMode === "eraser") {
    e.target.style.backgroundColor = "#fff";
  }
}

function reloadBlock() {
  clearBlok();
  setBlock(currentSize);
}

function clearBlok() {
  paperBlock.innerHTML = '';
}

function changeSliderSize(value) {
  blockSize.innerHTML = `${value} x ${value}`;
}

function changeSize(value) {
  setcurrentSize(value);
  changeSliderSize(value);
  reloadBlock();
}

window.onload = () => {
  setBlock(10)
  activateMode("color")
}