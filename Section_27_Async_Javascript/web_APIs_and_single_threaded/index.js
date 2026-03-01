// JS is single threaded - it has one Call Stack and can only do one thing at a time.

console.log("1. I'm the first customer in line.");

setTimeout(() => {
    console.log("2. I'm the callback. I waited for the stack to clear!");
}, 0);

console.log("3. I'm the third customer, but I'll finish before the callback.");