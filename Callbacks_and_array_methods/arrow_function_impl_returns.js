


// Arrow Function Implicit Returns
// When the function body is a single expression, you can omit the curly braces
// AND the return keyword — the value is returned automatically

// Explicit return (standard)
const double = (num) => {
    return num * 2;
};

// Implicit return — same result, one line!
const doubleImplicit = (num) => num * 2;

console.log(double(6));         // 12
console.log(doubleImplicit(6)); // 12

// Works great with map, filter, etc.
const numbers = [1, 2, 3, 4, 5];

const squared = numbers.map(n => n * n);
console.log(squared); // [1, 4, 9, 16, 25]

// Returning an object literal — wrap in parentheses to avoid ambiguity
// (otherwise JS thinks the {} is a function body)
const makeUser = (name, age) => ({ name: name, age: age });

console.log(makeUser('Sara', 28)); // { name: 'Sara', age: 28 }

// Multi-line logic still needs curly braces + explicit return
const clamp = (num, min, max) => {
    if (num < min) return min;
    if (num > max) return max;
    return num;
};
console.log(clamp(15, 0, 10)); // 10