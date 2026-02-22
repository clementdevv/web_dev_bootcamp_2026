
// append vs appendChild — two ways to insert nodes into the DOM

const list  = document.getElementById('item-list');
const input = document.getElementById('item-input');
let counter = 3;

function getInputValue() {
    const val = input.value.trim() || `Item ${counter}`;
    input.value = '';
    return val;
}

// appendChild — classic method, adds a single Node, returns the appended node
function useAppendChild() {
    const text = getInputValue();

    const li = document.createElement('li'); // 1. Create the element
    li.textContent = `[appendChild] ${text}`;// 2. Set its content
    li.classList.add('new-item');

    const appended = list.appendChild(li);   // 3. Append to parent
    // appendChild returns the inserted element
    console.log('appendChild returned:', appended);

    counter++;
}

// append — modern method, accepts multiple args, can accept strings directly
function useAppend() {
    const text = getInputValue();

    const li = document.createElement('li');
    li.classList.add('new-item');

    // append can take a Node OR a plain string
    li.append(`[append] ${text}`); // ← passing a string directly, no textContent needed

    list.append(li); // append doesn't return anything (undefined)
    counter++;
}

// append can add MULTIPLE nodes/strings in one call
function appendMultiple() {
    const li1 = document.createElement('li');
    li1.textContent = '[multi] First new item';
    li1.classList.add('new-item');

    const li2 = document.createElement('li');
    li2.textContent = '[multi] Second new item';
    li2.classList.add('new-item');

    // Add both in a single call — appendChild can't do this!
    list.append(li1, li2);
    counter += 2;
}

// prepend — same API as append, but inserts at the BEGINNING
function prependItem() {
    const text = getInputValue();
    const li = document.createElement('li');
    li.textContent = `[prepend] ${text} ← added to front`;
    li.classList.add('prepended');
    list.prepend(li);
    counter++;
}

function resetList() {
    list.innerHTML = '<li>Existing Item 1</li><li>Existing Item 2</li>';
    counter = 3;
}