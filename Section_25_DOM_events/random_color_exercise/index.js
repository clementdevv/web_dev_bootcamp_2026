
const button = document.querySelector('#colorBtn');
const heading = document.querySelector('h1');
const body = document.querySelector('body');

function makeRandColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  const rgbColor = `rgb(${r}, ${g}, ${b})`;

  body.style.backgroundColor = rgbColor;
  heading.innerText = rgbColor;

  // Calculate brightness (perceived luminance)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // If background is dark, make text white; else black
  if (brightness < 128) {
    body.style.color = 'white';
  } else {
    body.style.color = 'black';
  }
}

// Event listener using saved function reference
button.addEventListener('click', makeRandColor);
