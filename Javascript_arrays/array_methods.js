// Most common array methods in JS:
// Pop 
// Push 
// Shift 
// Unshift 


// Adding and removing elements
let tasks = ['Email', 'Coding'];

// Push: Adds to the END
tasks.push('Meeting'); 
console.log(tasks); // ['Email', 'Coding', 'Meeting']

// Pop: Removes from the END (and returns that element)
let lastTask = tasks.pop();
console.log(lastTask); // 'Meeting'
console.log(tasks);    // ['Email', 'Coding']

// Unshift: Adds to the START
tasks.unshift('Exercise');
console.log(tasks); // ['Exercise', 'Email', 'Coding']

// Shift: Removes from the START (and returns it)
let firstTask = tasks.shift();
console.log(firstTask); // 'Exercise'
console.log(tasks);     // ['Email', 'Coding']