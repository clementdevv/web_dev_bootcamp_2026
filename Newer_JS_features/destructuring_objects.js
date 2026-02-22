


// Destructuring Parameters
// Destructure directly in a function's parameter list — no need to extract inside the body

// --- Array destructuring in params ---
function getFirst([first, second]) {
    console.log(`1st: ${first}, 2nd: ${second}`);
}
getFirst([10, 20, 30]); // 1st: 10, 2nd: 20

// --- Object destructuring in params ---
// Instead of receiving the whole object and doing obj.name, obj.age...
function printUser({ name, age, role = 'user' }) {
    console.log(`${name} (${age}) — ${role}`);
}
printUser({ name: 'Jordan', age: 25 });               // Jordan (25) — user
printUser({ name: 'Morgan', age: 32, role: 'admin' }); // Morgan (32) — admin

// Very common with API responses or config objects
function createServer({ host = 'localhost', port = 3000, ssl = false } = {}) {
    console.log(`Starting server at ${ssl ? 'https' : 'http'}://${host}:${port}`);
}
createServer({ port: 8080 });   // Starting server at http://localhost:8080
createServer({ ssl: true });    // Starting server at https://localhost:3000
createServer();                 // Starting server at http://localhost:3000 (uses all defaults)

// Destructuring in arrow functions — same idea
const greet = ({ firstName, lastName }) =>
    console.log(`Hello, ${firstName} ${lastName}!`);

greet({ firstName: 'Sam', lastName: 'Rivera' }); // Hello, Sam Rivera!

// Practical: forEach/map callbacks with object arrays
const products = [
    { name: 'Keyboard', price: 79 },
    { name: 'Mouse', price: 39 },
    { name: 'Monitor', price: 299 }
];

products.forEach(({ name, price }) => {
    console.log(`${name}: $${price}`);
});
// Keyboard: $79
// Mouse: $39
// Monitor: $299