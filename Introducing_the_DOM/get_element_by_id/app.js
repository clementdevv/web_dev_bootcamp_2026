
// getElementById — returns the ONE element matching the given ID
// IDs must be unique on a page. Returns null if not found.

const box = document.getElementById('demo-box');
const boxText = document.getElementById('box-text');

console.log(box);      // <div id="demo-box" ...>
console.log(boxText);  // <p id="box-text" ...>
console.log(document.getElementById('nope')); // null

function changeText() {
    boxText.textContent = '✅ Text changed using getElementById!';
}

function changeColor() {
    box.style.background = '#1a2e1a';
    box.style.borderColor = '#4caf50';
    boxText.style.color = '#4caf50';
}

function toggleVisibility() {
    // We can read and set any property on the selected element
    if (box.style.opacity === '0') {
        box.style.opacity = '1';
    } else {
        box.style.opacity = '0';
    }
}

function resetBox() {
    box.style.background = '';
    box.style.borderColor = '';
    box.style.opacity = '1';
    boxText.style.color = '';
    boxText.textContent = "I'm the original text. Click a button to change me!";
}