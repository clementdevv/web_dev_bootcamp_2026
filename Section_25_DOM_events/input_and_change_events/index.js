
// Select elements
const textInput = document.querySelector('#textInput');
const liveOutput = document.querySelector('#liveOutput');
const colorSelect = document.querySelector('#colorSelect');
const colorOutput = document.querySelector('#colorOutput');


// Fires EVERY TIME you type
textInput.addEventListener('input', function (event) {
  console.log(event.target.value);
  liveOutput.textContent = 'Live typing: ' + event.target.value;
});


// Fires when selection changes (after user selects)
colorSelect.addEventListener('change', function (event) {

  const selectedColor = event.target.value;

  colorOutput.textContent = 'You selected: ' + selectedColor;

  // Change page background
  document.body.style.backgroundColor = selectedColor;

});