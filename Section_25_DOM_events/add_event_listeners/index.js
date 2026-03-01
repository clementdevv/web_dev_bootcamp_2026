
// Select elements
const btn = document.querySelector('#btn');
const btn2 = document.querySelector('#btn2');
const heading = document.querySelector('h1');

// Click event
btn.addEventListener('click', function () {
  alert('You clicked the button');
});

// Double click event
btn2.addEventListener('dblclick', function () {
  console.log('Button was double-clicked');
});

// Mouse enter event
btn.addEventListener('mouseenter', function () {
  console.log('Mouse entered the button');
});

// Click event on h1
heading.addEventListener('click', function () {
  heading.style.color = 'red';
});
