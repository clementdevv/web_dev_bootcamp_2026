
// getElementsByTagName — returns all elements with a given HTML tag
// getElementsByClassName — returns all elements with a given class name
// Both return a LIVE HTMLCollection (not an array, but iterable with for...of or spread)

// Grab all <li> elements on the page
const listItems = document.getElementsByTagName('li');
console.log(listItems);        // HTMLCollection(4) [li, li, li, li]
console.log(listItems.length); // 4
console.log(listItems[0]);     // <li>Apple</li>

// Grab all elements with class "card"
const cards = document.getElementsByClassName('card');
console.log(cards);        // HTMLCollection(4) [div.card, ...]
console.log(cards.length); // 4

function styleAllListItems() {
    // Loop over HTMLCollection with for...of
    for (let item of listItems) {
        item.style.background = '#2e4a1e';
        item.style.borderColor = '#4caf50';
        item.style.color = '#90ee90';
    }
}

function styleByClassName() {
    // Spread into array so we can use forEach
    [...cards].forEach((card, index) => {
        card.style.background = `hsl(${120 + index * 15}, 40%, 20%)`;
        card.style.borderColor = '#4caf50';
        card.style.transform = 'scale(1.03)';
    });
}

function resetAll() {
    [...listItems].forEach(item => {
        item.style.background = '';
        item.style.borderColor = '';
        item.style.color = '';
    });
    [...cards].forEach(card => {
        card.style.background = '';
        card.style.borderColor = '';
        card.style.transform = '';
    });
}