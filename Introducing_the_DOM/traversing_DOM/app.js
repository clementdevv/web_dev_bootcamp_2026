

// DOM Traversal — navigate between related elements without using querySelector
// We start from Child 2 and navigate around the tree

const child2      = document.getElementById('child-2');
const grandparent = document.getElementById('grandparent');
const parent      = document.getElementById('parent');
const output      = document.getElementById('output');

function clearHighlights() {
    document.querySelectorAll('.highlighted').forEach(el => el.classList.remove('highlighted'));
}

function log(msg) { output.textContent = msg; }

// parentElement — moves UP one level in the tree
function goParent() {
    clearHighlights();
    const p = child2.parentElement;        // → <div id="parent">
    const gp = child2.parentElement.parentElement; // → <div id="grandparent">
    p.classList.add('highlighted');
    log(`child2.parentElement → #${p.id}\nchild2.parentElement.parentElement → #${gp.id}`);
}

// children — the direct child ELEMENTS of a node (HTMLCollection)
function goChildren() {
    clearHighlights();
    const kids = parent.children;   // → [child-1, child-2, child-3] (excluding .node-label span? no, includes all elements)
    // Note: children returns element nodes only, not text nodes
    [...kids].forEach(k => k.classList.add('highlighted'));
    const names = [...kids].map(k => k.id || k.tagName).join(', ');
    log(`parent.children (${kids.length} elements) → ${names}`);
}

// firstElementChild / lastElementChild
function goFirstChild() {
    clearHighlights();
    const first = parent.firstElementChild;
    first.classList.add('highlighted');
    log(`parent.firstElementChild → "${first.textContent.trim()}"`);
}

function goLastChild() {
    clearHighlights();
    const last = parent.lastElementChild;
    last.classList.add('highlighted');
    log(`parent.lastElementChild → "${last.textContent.trim()}"`);
}

// previousElementSibling — the sibling immediately before
function goPrevSibling() {
    clearHighlights();
    const prev = child2.previousElementSibling; // → child-1
    if (prev) {
        prev.classList.add('highlighted');
        log(`child2.previousElementSibling → "${prev.textContent.trim()}"`);
    } else {
        log('No previous sibling!');
    }
}

// nextElementSibling — the sibling immediately after
function goNextSibling() {
    clearHighlights();
    const next = child2.nextElementSibling; // → child-3
    if (next) {
        next.classList.add('highlighted');
        log(`child2.nextElementSibling → "${next.textContent.trim()}"`);
    } else {
        log('No next sibling!');
    }
}

function resetAll() {
    clearHighlights();
    log('Click a button to traverse from Child 2...');
}

// Note: There are also text-node-aware versions: parentNode, childNodes,
// firstChild, lastChild, previousSibling, nextSibling — but these include
// whitespace text nodes. The Element versions above are usually preferred.