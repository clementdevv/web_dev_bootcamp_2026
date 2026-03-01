const p1Button = document.querySelector('#p1Button');
const p2Button = document.querySelector('#p2Button');
const resetButton = document.querySelector('#reset');
const p1Display = document.querySelector('#p1Display');
const p2Display = document.querySelector('#p2Display');
const winningScoreSelect = document.querySelector('#playto');

let p1Score = 0;
let p2Score = 0;
let winningScore = 3; // Set initial default to match HTML selection
let isGameOver = false;

p1Button.addEventListener('click', function () {
    if (!isGameOver) {
        p1Score += 1;
        if (p1Score === winningScore) {
            isGameOver = true;
            // Add winner class to p1, loser class to p2
            p1Display.classList.add('has-text-success'); //
            p2Display.classList.add('has-text-danger'); //
            // We can also disable buttons
            p1Button.disabled = true;
            p2Button.disabled = true;
        }
        p1Display.textContent = p1Score;
    }
});

p2Button.addEventListener('click', function () {
    if (!isGameOver) {
        p2Score += 1;
        if (p2Score === winningScore) {
            isGameOver = true;
            // Add winner class to p2, loser class to p1
            p1Display.classList.add('has-text-danger'); //
            p2Display.classList.add('has-text-success'); //
            // We can also disable buttons
            p1Button.disabled = true;
            p2Button.disabled = true;
        }
        p2Display.textContent = p2Score;
    }
});

winningScoreSelect.addEventListener('change', function () {
    winningScore = parseInt(this.value); // 'this' refers to winningScoreSelect
    reset(); // Reset the game automatically when goal changes
});

resetButton.addEventListener('click', reset);

function reset() {
    isGameOver = false;
    p1Score = 0;
    p2Score = 0;
    p1Display.textContent = 0;
    p2Display.textContent = 0;
    // Remove winner/loser classes
    p1Display.classList.remove('has-text-success', 'has-text-danger'); //
    p2Display.classList.remove('has-text-success', 'has-text-danger'); //
    // Re-enable buttons
    p1Button.disabled = false;
    p2Button.disabled = false;
}