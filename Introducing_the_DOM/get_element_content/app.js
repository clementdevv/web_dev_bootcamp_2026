

// innerHTML, innerText, textContent — three ways to get/set element content

const htmlBox    = document.getElementById('html-box');
const textBox    = document.getElementById('text-box');
const contentBox = document.getElementById('content-box');
const output     = document.getElementById('output');

function log(label, value) {
    output.textContent = `[${label}]\n${JSON.stringify(value)}`;
}

// --- innerHTML ---
// Gets/sets the raw HTML markup inside an element (tags included)
function readInnerHTML() {
    log('innerHTML', htmlBox.innerHTML);
    // → 'Hello, <strong>World</strong>! <span class="tag">I have tags.</span>'
}

function writeInnerHTML() {
    htmlBox.innerHTML = '<em>New content</em> written with <strong style="color:#f6a05b">innerHTML</strong> 🎉';
    // innerHTML can INSERT real HTML elements — powerful but use with care!
    // NEVER pass user-supplied strings to innerHTML without sanitizing (XSS risk)
}

// --- innerText ---
// Gets only the VISIBLE rendered text — honours CSS (display:none is excluded)
function readInnerText() {
    log('innerText', textBox.innerText);
    // → 'Hello, World!' — the hidden span text is NOT included
}

function writeInnerText() {
    textBox.innerText = 'Text written with innerText. <strong>Tags become literal text.</strong>';
    // Writing tags with innerText renders them as plain characters, NOT as HTML
}

// --- textContent ---
// Gets ALL text including hidden nodes — faster than innerText, ignores styling
function readTextContent() {
    log('textContent', contentBox.textContent);
    // → 'Hello, World! Hidden text' — INCLUDES the hidden span's text
}

function writeTextContent() {
    contentBox.textContent = 'Content written with textContent. <em>Tags are just text.</em>';
    // Like innerText when writing — tags treated as literal characters
}

// Key differences summary:
// innerHTML   → raw HTML string, parses tags on write, XSS risk
// innerText   → visible text only, respects CSS, slower (triggers layout)
// textContent → all text nodes, ignores CSS, fastest, safest