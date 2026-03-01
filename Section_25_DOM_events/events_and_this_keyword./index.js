const buttons = document.querySelectorAll('button');
const box = document.querySelector('.box');

// Reusable handler function
function changeColor() {
  // "this" refers to the element that triggered the event
  this.style.backgroundColor = makeRandColor();
  this.style.color = 'white';
}

// Attach event listeners to all buttons
for (let button of buttons) {
  button.addEventListener('click', changeColor);
}

// Mouse event on the div
box.addEventListener('mouseenter', function () {
  this.style.backgroundColor = makeRandColor();
});

box.addEventListener('mouseleave', function () {
  this.style.backgroundColor = 'lightgray';
});

// Utility function
function makeRandColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}
