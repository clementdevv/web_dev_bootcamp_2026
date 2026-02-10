// If - else statement 

// let random = Math.random(); 
// if(random < 0.5) {
//     console.log("It's lss than 0.5")
// } else if(random == 0.5){
//     console.log("It's 0.5")
// } else {
//     console.log("It's greater than 0.5")
// }

// console.log(random)

// Conditionals
const age = 32;

if (age < 5) {
    console.log("You're a baby")
} else if (age < 10) {
    console.log("You're a child")
} else if (age < 18) {
    console.log("You're an adult")
} else {
    console.log("You're a senior, pay $40")
}

// Nested conditionals

const password = prompt("Please enter your password");
if (password.length >= 6) {
    if (password.indexOf(' ') === -1) {
        console.log("Valid password")
    } else {
        console.log("Password cannot contain spaces")
    }
    console.log("Long enough password")
} else {    
    console.log("Password too short!")
}

