

let colors = ['Red', 'Green', 'Blue', 'Yellow'];
let extraColors = ['Purple', 'Orange'];

// 1. concat: Merges two arrays (returns a NEW array)
let allColors = colors.concat(extraColors);

// 2. includes: Checks if an element exists (returns true/false)
console.log(colors.includes('Blue')); // true

// 3. indexOf: Finds the index of an element (-1 if not found)
console.log(colors.indexOf('Green')); // 1

// 4. join: Creates a string from the array
console.log(colors.join(' - ')); // "Red - Green - Blue - Yellow"

// 5. reverse: Flips the array (mutates the original!)
colors.reverse();
console.log(colors); // ['Yellow', 'Blue', 'Green', 'Red']

// 6. slice: Extracts a portion (start, end-not-included)
// Does NOT change the original array
let primary = colors.slice(1, 3); 
console.log(primary); // ['Blue', 'Green']

// 7. splice: The "Swiss Army Knife" (start, deleteCount, itemsToAdd)
// Changes the original array. Let's remove 1 element at index 1 and add 'Pink'
colors.splice(1, 1, 'Pink');
console.log(colors); // ['Yellow', 'Pink', 'Green', 'Red']

// 8. sort: Alphabetical or numerical sorting
let alpha = ['Z', 'A', 'M'];
alpha.sort();
console.log(alpha); // ['A', 'M', 'Z']