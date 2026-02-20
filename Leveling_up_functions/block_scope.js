
/*
- A "block" is anything between curly braces {}.
- Unlike 'var' (which is function-scoped), 'let' and 'const' are bound to the block they are defined in.
*/



if (true) {
    var status = "Available"; 
    let secret = "Keep it secret, keep it safe.";
    
    console.log("Inside if-block:", secret);
}

console.log("Outside if-block (var):", status); // Works


for (var i = 0; i < 3; i++) {
    // This 'i' is leaked to the outer scope
}
console.log("Value of i after var loop:", i); // 3

for (let j = 0; j < 3; j++) {
    // This 'j' only exists inside this loop
}
// console.log(j); // ReferenceError: j is not defined


// Shadowing
let fruit = "Apple";
{
    // This is a completely different 'fruit' variable
    let fruit = "Banana"; 
    console.log("Inside block:", fruit); // Banana
}
console.log("Outside block:", fruit); // Apple