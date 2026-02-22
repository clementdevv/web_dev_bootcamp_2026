

// Arrow Functions — Wrap Up
// A summary of everything: syntax variations, use cases, and limitations

// 1. Syntax recap
const noParams    = () => 'No parameters needed';
const oneParam    = x => x * 10;              // parens optional for one param
const twoParams   = (x, y) => x + y;         // parens required for 2+
const multiLine   = (x, y) => {              // curly braces for multi-line
    const sum = x + y;
    return sum * 2;
};
const returnsObj  = name => ({ name });      // wrap object in () for implicit return

console.log(noParams());          // 'No parameters needed'
console.log(oneParam(5));         // 50
console.log(twoParams(3, 7));     // 10
console.log(multiLine(4, 6));     // 20
console.log(returnsObj('Maya'));  // { name: 'Maya' }

// 2. Arrow functions shine as callbacks
const words = ['hello', 'world', 'javascript'];
const upper = words.map(w => w.toUpperCase());
const long  = words.filter(w => w.length > 5);
console.log(upper); // ['HELLO', 'WORLD', 'JAVASCRIPT']
console.log(long);  // ['javascript']

// 3. Arrow functions are NOT suited for everything
// - Cannot be used as constructors (no `new`)
// - Do not have their own `arguments` object
// - Do not have their own `this` (they inherit from surrounding scope)

// Use regular functions when you need `this` to refer to the calling object
const timer = {
    label: 'Timer',
    start: function() {
        // Arrow function here inherits `this` from start(), which is `timer`
        setTimeout(() => {
            console.log(`${this.label} done!`); // works correctly
        }, 500);
    }
};

timer.start(); // 'Timer done!' after 500ms