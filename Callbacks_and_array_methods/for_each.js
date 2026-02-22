
// forEach - executes a provided function once for each array element
// Unlike map, forEach does NOT return a new array — it just runs a side effect

const fruits = ['apple', 'banana', 'cherry', 'date'];

// Basic forEach — log each item
fruits.forEach(function(fruit) {
    console.log(fruit);
});

// forEach with index
fruits.forEach(function(fruit, index) {
    console.log(`${index + 1}. ${fruit}`);
});

// Real-world use: summing values
const prices = [9.99, 4.49, 12.00, 3.50];
let total = 0;

prices.forEach(function(price) {
    total += price;
});

console.log(`Total: $${total.toFixed(2)}`); // Total: $29.98

// forEach does NOT return anything useful
const result = fruits.forEach(fruit => fruit.toUpperCase());
console.log(result); // undefined — use map() if you need a new array