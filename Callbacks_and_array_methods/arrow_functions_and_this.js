


// Arrow Functions and 'this'
// The key difference: regular functions get their OWN 'this' based on how they're called.
// Arrow functions do NOT — they INHERIT 'this' from their surrounding (lexical) scope.

// --- Regular function: 'this' is determined at call time ---
const person = {
    name: 'Jordan',
    greet: function() {
        console.log(`Hi, I'm ${this.name}`); // 'this' is 'person'
    }
};
person.greet(); // "Hi, I'm Jordan"

// --- The problem: 'this' breaks inside nested regular functions ---
const team = {
    name: 'Dream Team',
    members: ['Alice', 'Bob', 'Charlie'],
    showMembers: function() {
        this.members.forEach(function(member) {
            // 'this' here is undefined (strict mode) or the global object
            // It is NOT the 'team' object anymore!
            console.log(`${member} is on ${this.name}`); // this.name is undefined
        });
    }
};
team.showMembers();
// "Alice is on undefined"
// "Bob is on undefined"
// "Charlie is on undefined"

// --- The fix: use an arrow function ---
const crew = {
    name: 'Space Crew',
    members: ['Luna', 'Sol', 'Mars'],
    showMembers: function() {
        this.members.forEach(member => {
            // Arrow function inherits 'this' from showMembers — which is 'crew'
            console.log(`${member} is on ${this.name}`);
        });
    }
};
crew.showMembers();
// "Luna is on Space Crew"
// "Sol is on Space Crew"
// "Mars is on Space Crew"

// --- Gotcha: Don't use arrow functions AS methods ---
const robot = {
    name: 'R2D2',
    speak: () => {
        // Arrow function as a method — 'this' is inherited from the outer scope
        // which here is the global/module scope, NOT 'robot'
        console.log(`I am ${this.name}`); // undefined
    }
};
robot.speak(); // "I am undefined" — use a regular function for methods!