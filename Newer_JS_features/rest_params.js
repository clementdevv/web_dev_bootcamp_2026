

// Rest Parameters
// The rest operator (...) collects all remaining arguments into a real array
// It looks like spread but works in the OPPOSITE direction — gathering, not expanding

// Accept any number of arguments
function sum(...nums) {
    return nums.reduce((total, n) => total + n, 0);
}
console.log(sum(1, 2));           // 3
console.log(sum(1, 2, 3, 4, 5)); // 15
console.log(sum(10, 20, 30));     // 60

// Rest collects only the REMAINING args — fixed params come first
function introduce(firstName, lastName, ...hobbies) {
    console.log(`Name: ${firstName} ${lastName}`);
    console.log(`Hobbies: ${hobbies.join(', ')}`);
}
introduce('Jamie', 'Rivera', 'coding', 'hiking', 'chess');
// Name: Jamie Rivera
// Hobbies: coding, hiking, chess

// Rest parameter must be LAST
// function bad(a, ...rest, b) {} // SyntaxError!

// Practical: a logger that accepts a level + any number of messages
function log(level, ...messages) {
    messages.forEach(msg => console.log(`[${level.toUpperCase()}] ${msg}`));
}
log('info', 'Server started', 'Listening on port 3000');
log('error', 'Database connection failed');
// [INFO] Server started
// [INFO] Listening on port 3000
// [ERROR] Database connection failed

// Rest vs arguments object
// 'arguments' is old, not a real array, and unavailable in arrow functions
// Rest params ARE a real array — you can use map, filter, reduce on them directly
function oldWay() {
    console.log(arguments); // array-like, not an actual Array
}
const newWay = (...args) => {
    console.log(args); // a proper Array
};