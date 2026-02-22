

// Spread with Function Calls
// The spread operator (...) expands an iterable (array, string) into individual arguments

const nums = [3, 1, 4, 1, 5, 9, 2, 6];

// Without spread — Math.max doesn't accept an array
console.log(Math.max(nums));    // NaN — doesn't work
console.log(Math.max(...nums)); // 9 — spread unpacks the array into individual args

// Same as writing: Math.max(3, 1, 4, 1, 5, 9, 2, 6)
console.log(Math.min(...nums)); // 1

// Spread with a custom function
function sum(a, b, c) {
    return a + b + c;
}
const values = [10, 20, 30];
console.log(sum(...values)); // 60 — equivalent to sum(10, 20, 30)

// Mixing spread with other arguments
function introduce(greeting, firstName, lastName) {
    console.log(`${greeting}, I'm ${firstName} ${lastName}`);
}
const name = ['Jordan', 'Lee'];
introduce('Hey', ...name); // "Hey, I'm Jordan Lee"

// Spread works with strings too — each character becomes an argument
console.log(Math.max(...'54321')); // 5 — spreads into 5, 4, 3, 2, 1