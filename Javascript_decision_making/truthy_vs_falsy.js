// console.log("Hello manze!!!")

// Falsy values in JS:
/*
- false
- 0 
- "" (empty string)
- null
- undefined
- NaN
*/
// Everything else is truthy
const userInput = prompt("Enter Something") 

if (userInput) {
    console.log("TRUTHY!")
} else {
    console.log("FALSY")
}