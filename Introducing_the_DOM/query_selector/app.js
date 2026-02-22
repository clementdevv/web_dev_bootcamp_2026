

// querySelector — returns the FIRST element matching the CSS selector (or null)
// querySelectorAll — returns ALL matching elements as a static NodeList

// querySelector examples
const firstItem = document.querySelector('.item');        // first element with class "item"
const specialEl = document.querySelector('#special');     // element with id "special"
const activeEl  = document.querySelector('.item.active'); // element with BOTH classes

console.log(firstItem);  // <div class="item" id="special">
console.log(specialEl);  // <div class="item" id="special">
console.log(activeEl);   // <div class="item active">Active Item</div>

// querySelectorAll — returns a NodeList (static, unlike HTMLCollection)
const allItems   = document.querySelectorAll('.item');
const allActive  = document.querySelectorAll('.active');

console.log(allItems.length);  // 6
console.log(allActive.length); // 2

// NodeList supports forEach directly (unlike HTMLCollection)
allItems.forEach(item => console.log(item.textContent));

function clearHighlights() {
    document.querySelectorAll('.highlighted').forEach(el => el.classList.remove('highlighted'));
}

function selectFirst() {
    clearHighlights();
    // querySelector returns only the FIRST match
    const first = document.querySelector('.item');
    first.classList.add('highlighted');
    console.log('Selected first .item:', first.textContent);
}

function selectById() {
    clearHighlights();
    const el = document.querySelector('#special');
    el.classList.add('highlighted');
    console.log('Selected #special:', el.textContent);
}

function selectAllActive() {
    clearHighlights();
    // querySelectorAll returns ALL matches
    const actives = document.querySelectorAll('.active');
    actives.forEach(el => el.classList.add('highlighted'));
    console.log(`Found ${actives.length} .active elements`);
}

function selectComplex() {
    clearHighlights();
    // CSS combinators work perfectly
    const firstChildren = document.querySelectorAll('.row .item:first-child');
    firstChildren.forEach(el => el.classList.add('highlighted'));
    console.log(`Highlighted ${firstChildren.length} first-child items`);
}

function resetAll() {
    clearHighlights();
}