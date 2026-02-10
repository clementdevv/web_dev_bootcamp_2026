// Logical operators in JS are only 3: 
/* 
 && - logical AND
 || - logical OR
 ! - logical NOT
*/


// Logical AND illustration:
// const password = prompt("Enter password"); 
// if (password.length >= 6 && password.indexOf(' ') === -1) {
//     console.log("Valid Password") 
// } else {
//     console.log("Incorrect format for passwords")
// }

// Logical OR illustration:
const age = 89; 
if ( age >= 0 && age <  5 || age >= 65) {
    console.log("FREE")
} else if(age < 10) {
    console.log("$10")
} else if (age < 65 ) {
    console.log("$20")
}

//Logical NOT illustration
const isBanned = true;
const hasCoverCharge = true;

if (!isBanned && hasCoverCharge) {
    console.log("Welcome to the club!");
} else {
    console.log("Sorry, you're not getting in tonight.");
}

// The Double Bang trick:
const username = ""; // An empty string is "falsy"
const isLoggedIn = !username;  // true (The username IS empty)
const hasName = !!username;    // false (The username is NOT NOT empty)