
// Select elements
const input = document.querySelector('#input');
const output = document.querySelector('#output');
const heading = document.querySelector('h1');

// Keydown event
input.addEventListener('keydown', function (event) {
  console.log('Key Down:', event.key);
});

// Keyup event
input.addEventListener('keyup', function (event) {
  output.textContent = 'You released: ' + event.key;
});

// Keypress event
input.addEventListener('keypress', function (event) {
  console.log('Key Pressed:', event.key);
});

// Using event object on heading
heading.addEventListener('click', function (event) {
  console.log(event);
  heading.style.color = 'blue';
});