

// Default Parameters
// You can assign default values to function parameters in case no argument is passed

// Without default params — risky
function greet(name) {
    console.log(`Hello, ${name}!`);
}
greet('Alice'); // "Hello, Alice!"
greet();        // "Hello, undefined!" — not ideal

// With default params
function greetDefault(name = 'Stranger') {
    console.log(`Hello, ${name}!`);
}
greetDefault('Alice'); // "Hello, Alice!"
greetDefault();        // "Hello, Stranger!"

// Default params work with any expression
function rollDice(sides = 6) {
    return Math.floor(Math.random() * sides) + 1;
}
console.log(rollDice());   // random number 1–6
console.log(rollDice(20)); // random number 1–20

// Multiple default params
function createUser(name = 'Anonymous', role = 'viewer', isActive = true) {
    return { name, role, isActive };
}
console.log(createUser());                    // { name: 'Anonymous', role: 'viewer', isActive: true }
console.log(createUser('Maya', 'admin'));     // { name: 'Maya', role: 'admin', isActive: true }
console.log(createUser('Leo', 'editor', false)); // { name: 'Leo', role: 'editor', isActive: false }

// Passing undefined explicitly also triggers the default
greetDefault(undefined); // "Hello, Stranger!"
greetDefault(null);      // "Hello, null!" — null does NOT trigger the default