
// Attributes — read, write, check, and remove HTML attributes

const link = document.getElementById('demo-link');
const img  = document.getElementById('demo-img');
const output = document.getElementById('output');

function log(text) { output.textContent = text; }

// getAttribute — read an attribute's current value
function getAttr() {
    const href     = link.getAttribute('href');
    const target   = link.getAttribute('target');
    const category = link.getAttribute('data-category'); // custom data attributes too!

    log(`getAttribute examples:\nhref     → "${href}"\ntarget   → "${target}"\ndata-cat → "${category}"`);
}

// setAttribute — create or update an attribute
function setAttr() {
    link.setAttribute('href', 'https://developer.mozilla.org');
    link.setAttribute('data-category', 'updated');
    link.textContent = 'Link updated! (now points to MDN)';
    log('setAttribute:\nhref changed to "https://developer.mozilla.org"\ndata-category changed to "updated"');
}

// hasAttribute — returns a boolean
function hasAttr() {
    const hasTarget = link.hasAttribute('target');
    const hasDisabled = link.hasAttribute('disabled');
    log(`hasAttribute examples:\nhasAttribute("target")   → ${hasTarget}\nhasAttribute("disabled") → ${hasDisabled}`);
}

// removeAttribute — completely removes the attribute from the element
function removeAttr() {
    link.removeAttribute('target');
    log('removeAttribute("target"):\nThe link will now open in the same tab.\nhasAttribute("target") → ' + link.hasAttribute('target'));
}

// setAttribute to swap an image source
function changeImg() {
    img.setAttribute('src', 'https://placehold.co/300x120/1a2e1a/4caf50?text=New+Image!');
    img.setAttribute('alt', 'Updated image');
    log('img src updated via setAttribute');
}

function resetAll() {
    link.setAttribute('href', 'https://example.com');
    link.setAttribute('target', '_blank');
    link.setAttribute('data-category', 'demo');
    link.textContent = "I'm a link — inspect my attributes!";
    img.setAttribute('src', 'https://placehold.co/300x120/1a1a2e/7c6cfc?text=Original+Image');
    img.setAttribute('alt', 'Demo image');
    log('Reset to original state.');
}