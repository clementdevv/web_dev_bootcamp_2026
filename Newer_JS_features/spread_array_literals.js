

// Spread with Array Literals
// Use spread (...) to expand arrays inline when building new arrays

const first = [1, 2, 3];
const second = [4, 5, 6];

// Combine two arrays — no .concat() needed
const combined = [...first, ...second];
console.log(combined); // [1, 2, 3, 4, 5, 6]

// Add items before, between, or after
const withExtras = [0, ...first, 3.5, ...second, 7];
console.log(withExtras); // [0, 1, 2, 3, 3.5, 4, 5, 6, 7]

// Copy an array (shallow copy) — avoids mutating the original
const original = ['a', 'b', 'c'];
const copy = [...original];
copy.push('d');
console.log(original); // ['a', 'b', 'c'] — untouched
console.log(copy);     // ['a', 'b', 'c', 'd']

// Spread a string into an array of characters
const letters = [..."hello"];
console.log(letters); // ['h', 'e', 'l', 'l', 'o']

// Practical: merge and deduplicate with Set
const a = [1, 2, 3, 2];
const b = [3, 4, 5];
const unique = [...new Set([...a, ...b])];
console.log(unique); // [1, 2, 3, 4, 5]