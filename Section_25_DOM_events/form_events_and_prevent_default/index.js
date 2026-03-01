
// Select elements
const form = document.querySelector('#myForm');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const message = document.querySelector('#message');

// Submit event
form.addEventListener('submit', function (event) {

  // Prevent page refresh
  event.preventDefault();

  console.log('Form submitted');

  // Get input values
  const usernameValue = username.value;
  const emailValue = email.value;

  // Display message
  message.textContent = 
    'Username: ' + usernameValue + ' | Email: ' + emailValue;

});