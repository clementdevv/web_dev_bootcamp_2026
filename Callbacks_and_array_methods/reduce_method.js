

// The Notorious reduce()
// reduce() boils an array down to a SINGLE value by applying a function
// cumulatively. It's the most powerful — and most misunderstood — array method.

// Signature: array.reduce(callback(accumulator, currentValue), initialValue)
//   accumulator  — the running result
//   currentValue — the current element being processed
//   initialValue — the starting value of the accumulator

const numbers = [1, 2, 3, 4, 5];

// 1. Sum all numbers
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log(sum); // 15

// 2. Multiply all numbers (product)
const product = numbers.reduce((acc, num) => acc * num, 1);
console.log(product); // 120

// 3. Find the max value
const max = numbers.reduce((acc, num) => (num > acc ? num : acc), -Infinity);
console.log(max); // 5

// 4. Flatten an array of arrays
const nested = [[1, 2], [3, 4], [5, 6]];
const flat = nested.reduce((acc, arr) => acc.concat(arr), []);
console.log(flat); // [1, 2, 3, 4, 5, 6]

// 5. Count occurrences of values
const votes = ['yes', 'no', 'yes', 'yes', 'no', 'yes'];
const tally = votes.reduce((acc, vote) => {
    acc[vote] = (acc[vote] || 0) + 1;
    return acc;
}, {});
console.log(tally); // { yes: 4, no: 2 }

// 6. Build an object from an array
const people = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
];
const byId = people.reduce((acc, person) => {
    acc[person.id] = person.name;
    return acc;
}, {});
console.log(byId); // { '1': 'Alice', '2': 'Bob', '3': 'Charlie' }

// Key insight: the accumulator can be anything — a number, string, array, or object!