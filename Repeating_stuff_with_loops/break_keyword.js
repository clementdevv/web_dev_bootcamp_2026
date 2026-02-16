

const TARGET_NUMBER = 7;
let attempts = 0;

console.log("Starting the number guessing game...");

while (true) { 
    let guess = prompt("Guess a number between 1 and 10 (or type 'exit' to quit):");
    attempts++;

    // 1. Check for manual exit
    if (guess === "exit") {
        console.log("User chose to quit the game.");
        break; // Immediately exits the while loop
    }

    // 2. Convert string input to a number
    let numGuess = Number(guess);

    // 3. Check if the guess is correct
    if (numGuess === TARGET_NUMBER) {
        alert(`Correct! It took you ${attempts} attempts.`);
        break; // Immediately exits the while loop
    }

    console.log(`Attempt ${attempts}: ${numGuess} was wrong. Keep trying!`);
}

console.log("The loop has ended. You are now outside the curly braces.");