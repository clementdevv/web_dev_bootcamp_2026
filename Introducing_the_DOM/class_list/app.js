
// classList — a DOMTokenList for cleanly managing CSS classes
// Much better than manually manipulating el.className as a string

const card      = document.getElementById('demo-card');
const classSpan = document.getElementById('class-list');
const output    = document.getElementById('output');

function updateDisplay() {
    // classList is iterable — spread it to see all current classes
    classSpan.textContent = [...card.classList].join(', ');
}

function log(msg) { output.textContent = msg; }

// add — adds one or more classes (ignores if already present)
function addClass() {
    card.classList.add('highlighted');
    // Can add multiple at once: card.classList.add('highlighted', 'featured')
    updateDisplay();
    log('classList.add("highlighted") — class added.');
}

// remove — removes a class (no error if not present)
function removeClass() {
    card.classList.remove('highlighted');
    updateDisplay();
    log('classList.remove("highlighted") — class removed.');
}

// toggle — adds if missing, removes if present. Returns true if now present.
function toggleClass() {
    const isNowActive = card.classList.toggle('active');
    updateDisplay();
    log(`classList.toggle("active") → class is now ${isNowActive ? 'ADDED' : 'REMOVED'}`);
}

// contains — check if a class is present (returns boolean)
function checkContains() {
    const hasActive = card.classList.contains('active');
    log(`classList.contains("active") → ${hasActive}`);
}

// replace — swap one class for another
function replaceClass() {
    // Note: this demo adds 'pill' in addition to 'card' conceptually
    card.classList.add('pill');
    updateDisplay();
    log('classList.add("pill") — border-radius changed to pill shape!');
}

function resetCard() {
    // Remove everything except the base 'card' class
    card.className = 'card';
    document.getElementById('card-label').textContent = "I'm a plain card. Try the buttons!";
    updateDisplay();
    log('Reset — all added classes removed.');
}
