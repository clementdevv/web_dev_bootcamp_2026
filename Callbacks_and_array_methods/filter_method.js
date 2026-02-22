// filter - creates a NEW array with only the elements that pass a test
// The callback must return true (keep) or false (skip)

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Keep only even numbers
const evens = numbers.filter(num => num % 2 === 0);
console.log(evens); // [2, 4, 6, 8, 10]

// Keep only numbers greater than 5
const bigNumbers = numbers.filter(num => num > 5);
console.log(bigNumbers); // [6, 7, 8, 9, 10]

// Filter strings by length
const words = ['cat', 'elephant', 'dog', 'rhinoceros', 'ox'];
const longWords = words.filter(word => word.length > 4);
console.log(longWords); // ['elephant', 'rhinoceros']

// Filter objects
const students = [
    { name: 'Alice', grade: 92 },
    { name: 'Bob', grade: 55 },
    { name: 'Charlie', grade: 78 },
    { name: 'Diana', grade: 45 },
    { name: 'Eve', grade: 88 },
];

const passing = students.filter(student => student.grade >= 60);
console.log(passing);
// [{ name: 'Alice', grade: 92 }, { name: 'Charlie', grade: 78 }, { name: 'Eve', grade: 88 }]

// Chaining filter with map
const passingNames = students
    .filter(s => s.grade >= 60)
    .map(s => s.name);
console.log(passingNames); // ['Alice', 'Charlie', 'Eve']