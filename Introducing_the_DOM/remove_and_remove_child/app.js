// remove() and removeChild() — two ways to delete elements from the DOM

const grid  = document.getElementById('card-grid');
const output = document.getElementById('output');
let selectedCard = null;

function log(msg) { output.textContent = msg; }

// Let users click cards to select them
grid.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (!card) return;

    // Deselect previous
    if (selectedCard) selectedCard.classList.remove('selected');

    selectedCard = card;
    selectedCard.classList.add('selected');
    log(`Selected: #${card.id} — now press a remove button.`);
});

// el.remove() — modern method, called directly on the element itself
// No need to reference the parent at all
function removeSelected() {
    if (!selectedCard) {
        log('No card selected. Click a card first!');
        return;
    }

    const id = selectedCard.id;
    selectedCard.classList.add('removing');

    setTimeout(() => {
        selectedCard.remove(); // ← clean, simple, no parent needed
        log(`el.remove() — #${id} removed from the DOM.`);
        selectedCard = null;
    }, 280);
}

// parent.removeChild(el) — classic method, requires a reference to the PARENT
// Must be called on the parent node, passing the child to remove
// Returns the removed node (you can re-insert it elsewhere if needed!)
function removeChildFirst() {
    const first = grid.firstElementChild;
    if (!first) { log('No cards left!'); return; }

    first.classList.add('removing');
    setTimeout(() => {
        const removed = grid.removeChild(first); // ← parent.removeChild(child)
        log(`removeChild — removed first child: #${removed.id}\nremoveChild returns the removed node, so you can re-use it.`);
        if (selectedCard === removed) selectedCard = null;
    }, 280);
}

function removeChildLast() {
    const last = grid.lastElementChild;
    if (!last) { log('No cards left!'); return; }

    last.classList.add('removing');
    setTimeout(() => {
        const removed = grid.removeChild(last);
        log(`removeChild — removed last child: #${removed.id}`);
        if (selectedCard === removed) selectedCard = null;
    }, 280);
}

// Restore the original four cards
function restoreCards() {
    grid.innerHTML = `
        <div class="card" id="card-a">Card A</div>
        <div class="card" id="card-b">Card B</div>
        <div class="card" id="card-c">Card C</div>
        <div class="card" id="card-d">Card D</div>
    `;

    // Re-attach click listeners — innerHTML wipes all existing nodes
    selectedCard = null;
    log('All cards restored.');
}