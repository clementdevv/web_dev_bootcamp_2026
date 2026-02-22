

// some() and every() — boolean checks on arrays

// some() — returns TRUE if AT LEAST ONE element passes the test
// every() — returns TRUE if ALL elements pass the test

const numbers = [1, 2, 3, 4, 5, 6];

// some()
console.log(numbers.some(n => n > 5));  // true  (6 passes)
console.log(numbers.some(n => n > 10)); // false (none pass)

// every()
console.log(numbers.every(n => n > 0));  // true  (all positive)
console.log(numbers.every(n => n > 3));  // false (1, 2, 3 fail)

// Practical example — checking user permissions
const users = [
    { name: 'Alice', isAdmin: true },
    { name: 'Bob', isAdmin: false },
    { name: 'Charlie', isAdmin: true },
];

const hasAnyAdmin = users.some(user => user.isAdmin);
console.log(`Has at least one admin: ${hasAnyAdmin}`); // true

const allAdmins = users.every(user => user.isAdmin);
console.log(`All users are admins: ${allAdmins}`); // false

// Validating form inputs
const passwords = ['abc123', 'secure!', 'pass'];
const allLongEnough = passwords.every(p => p.length >= 6);
console.log(`All passwords valid: ${allLongEnough}`); // false

const hasShort = passwords.some(p => p.length < 6);
console.log(`At least one password too short: ${hasShort}`); // true

// Note: both methods short-circuit — they stop as soon as the result is determined