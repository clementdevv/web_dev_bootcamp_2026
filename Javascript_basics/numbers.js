//JS has one number type, which could be one of: positive, negative, whole and decimal numbers
//Js does not have types like int, double and decimal, but JS has the number type only

//Addition
console.log(3 + 5)

//Subtraction
console.log(3 - 5)

//Division 
console.log(15 / 3)

//Multiplication - (BODMAS is respected)
console.log(3 + 1 * 9) // 12
console.log((3 + 1) * 9) // 36

//Modulus (Remai) - gives the remainder c, value a is divided by b such that a % b = c
console.log(89 % 3) // Answer is 2 since 87 / 3 is 29 with a remainder of 2
console.log(6 % 3) // Answer is 0 since there's no remainder left after division in this case
console.log(5 % 2) // Answer is 1

//Exponentiation - raising a value to a certain power 
console.log( 4 ** 2) // This is 4 raised to power 2 which is usually 16
console.log( 2 ** 3) // This is 2 raised to power 3 which is usually 8
console.log( 7 ** 2) // This is 7 raised to power 2 which is usually 49

// The NaN concept:
console.log('go' / 5) // returns NaN

console.log((13 % 5) ** 2) // 9
console.log(1200 + 0/0) // NaN
