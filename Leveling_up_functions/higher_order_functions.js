// Higher Order Functions:
// These are functions that operate on/with other functions
// They can accept other functions as arguments or return other functions as their return type

// 1. Functions as Arguments (The Callback Pattern) 

const add = (a, b) => a + b;
const multiply = (a, b) => a * b;


const calculate = (num1, num2, operation) => {
    console.log("Preparing calculation...");
    return operation(num1, num2);
};

console.log("Addition HOF:", calculate(5, 5, add)); // 10
console.log("Multiplication HOF:", calculate(5, 5, multiply)); // 25


// 2. Built-in Array HOFs (The most common use case)

const numbers = [1, 2, 3, 4, 5];

// .map() is a HOF; it takes an anonymous function as an argument
const squared = numbers.map(num => num * num);
console.log("Squared array:", squared);


// 3. Functions Returning Functions (The Factory Pattern)

function createGreeting(greetingWord) {
    return function(name) {
        return `${greetingWord}, ${name}!`;
    };
}

// We "bake" specific versions of the function
const sayHello = createGreeting("Hello");
const sayHowdy = createGreeting("Howdy");

console.log(sayHello("Alice")); // "Hello, Alice!"
console.log(sayHowdy("Bob"));   // "Howdy, Bob!"


// 4. Abstracting Logic (Filtering) 

const isEven = (n) => n % 2 === 0;

// .filter() is a HOF that uses our 'isEven' logic
const evenNumbers = numbers.filter(isEven);
console.log("Filtered even numbers:", evenNumbers);