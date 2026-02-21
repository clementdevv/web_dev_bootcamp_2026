


function makeMysteryFunc() {
    const rand = Math.random();
    
    if (rand > 0.5) {
        return function() {
            console.log("Congrats, I am a GOOD function!");
            console.log("You win a digital cookie.");
        };
    } else {
        return function() {
            alert("BEWARE: I am a BAD function!");
            console.log("I just do annoying things.");
        };
    }
}
const mystery = makeMysteryFunc();
mystery();




function makeBetweenFunc(min, max) {
    // We return a brand new function that "remembers" min and max
    return function(num) {
        return num >= min && num <= max;
    };
}

// Now we can manufacture specific validation functions:
const isChild = makeBetweenFunc(0, 17);
const isAdult = makeBetweenFunc(18, 64);
const isSenior = makeBetweenFunc(65, 120);

// Usage:
console.log("Is 10 a child?", isChild(10));    // true
console.log("Is 25 a child?", isChild(25));    // false
console.log("Is 40 an adult?", isAdult(40));   // true



function createMultiplier(factor) {
    return function(value) {
        return value * factor;
    };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log("Double 5:", double(5)); // 10
console.log("Triple 5:", triple(5)); // 15