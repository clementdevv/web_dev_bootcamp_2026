

// setTimeout and setInterval
// Both are built-in functions for scheduling code to run after a delay

// ------- setTimeout -------
// Runs a function ONCE after a specified delay (in milliseconds)

console.log('Before timeout');

setTimeout(function() {
    console.log('This runs after 2 seconds');
}, 2000);

console.log('After timeout (this logs immediately!)');
// Notice: JS doesn't pause — it continues and runs the callback later

// setTimeout with an arrow function
setTimeout(() => {
    console.log('Arrow timeout fired after 1 second');
}, 1000);

// Cancelling a timeout
const timeoutId = setTimeout(() => {
    console.log('You will never see this');
}, 5000);

clearTimeout(timeoutId); // Cancels the timeout before it fires

// ------- setInterval -------
// Runs a function REPEATEDLY every X milliseconds

let count = 0;

const intervalId = setInterval(() => {
    count++;
    console.log(`Interval tick #${count}`);

    if (count === 3) {
        clearInterval(intervalId); // Stop after 3 ticks
        console.log('Interval stopped.');
    }
}, 1000);

// Output (over 3 seconds):
// Interval tick #1
// Interval tick #2
// Interval tick #3
// Interval stopped.