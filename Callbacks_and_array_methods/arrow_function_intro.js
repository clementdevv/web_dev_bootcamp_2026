

// Intro to Arrow Functions
// Arrow functions are a shorter syntax for writing functions in JavaScript

// Traditional function expression
const add = function(x, y) {
    return x + y;
};
console.log(add(3, 4)); // 7

// Arrow function — same thing, cleaner syntax
const addArrow = (x, y) => {
    return x + y;
};
console.log(addArrow(3, 4)); // 7

// Single parameter — parentheses are optional
const square = num => {
    return num * num;
};
console.log(square(5)); // 25

// No parameters — parentheses are required
const greet = () => {
    return 'Hello!';
};
console.log(greet()); // Hello!

// Arrow functions used with array methods
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map((num) => {
    return num * 2;
});
console.log(doubled); // [2, 4, 6, 8, 10]