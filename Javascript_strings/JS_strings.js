let favouriteFood = 'Chapati' 
console.log(favouriteFood)

// Strings are indexed, just like arrays and collections

let animal = "Hippopotomus" 
let specificChar = animal[0]
console.log(specificChar)

specificChar = animal[1]
console.log(specificChar)

specificChar = animal[2]
console.log(specificChar)

console.log(animal.length)

// String concatenation 
let venue = "Paradise"
console.log("Welcome " + "to " + venue)

// JS_object.method() - executes a method on the Object (instance of that JS class)
// JS_object.method - accesses a property on the Object. Examples:

let message = "Messi is the GOAT"
let upperCaseMessage = message.toUpperCase() // This is a metho execution
let lowerCaseMessage = message.toLowerCase() // This is a method execution as well
let charSize = message.length // This is the use of a method to access a specific property
console.log(upperCaseMessage)
console.log(lowerCaseMessage)
console.log(charSize)