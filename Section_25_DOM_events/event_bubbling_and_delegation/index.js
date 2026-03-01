
// Select elements
const parent = document.querySelector('#parent');
const children = document.querySelectorAll('.child');



// Add event to each child
children.forEach(function (child) {
  child.addEventListener('click', function () {
    console.log('Child clicked:', this.textContent);
  });
});

// Add event to parent
parent.addEventListener('click', function () {
  console.log('Parent clicked');
});



// Comment out the bubbling child listeners above
// and use this instead:

/*
parent.addEventListener('click', function (event) {

  // Check if a child was clicked
  if (event.target.classList.contains('child')) {
    console.log('Delegation:', event.target.textContent);
    event.target.style.background = 'yellow';
  }

});
*/