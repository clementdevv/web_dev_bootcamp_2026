

// 1. Generate a random number between 1 and 10
// Math.random() gives 0 to 0.99... 
// Multiplied by 10 gives 0 to 9.99...
// Math.floor rounds it down to 0-9
// Adding 1 gives us a final range of 1 to 10
const targetNumber = Math.floor(Math.random() * 10) + 1;

console.log("Cheating? The secret number is: " + targetNumber);

let attempts = 0;

// 2. Start the game loop
while (true) {
    let input = prompt("Guess a number (1-10) or type 'q' to quit:");

    // 3. Handle Quitting
    if (input === 'q' || input === null) {
        alert("Game Over. You gave up!");
        break; // Exit the loop
    }

    // 4. Convert input to an actual number
    let guess = parseInt(input);
    attempts++;

    // 5. Logic Checks
    if (isNaN(guess)) {
        alert("That's not a valid number! Try again.");
    } else if (guess === targetNumber) {
        alert(`CONGRATULATIONS! ${targetNumber} was correct! \nAttempts: ${attempts}`);
        break; // Exit the loop because they won
    } else if (guess > targetNumber) {
        alert("Too high! Try again.");
    } else {
        alert("Too low! Try again.");
    }
}

console.log("The program has finished executing.");