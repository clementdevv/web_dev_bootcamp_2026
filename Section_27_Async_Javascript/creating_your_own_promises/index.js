

const light = document.querySelector('#light');
const btn = document.querySelector('#start');

/**
 * Our custom Promise creator.
 * It changes the light color after a delay.
 */
const delayedColorChange = (color, delay) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Logic to check for potential errors
            if (!color) {
                reject("No color provided!");
            } else {
                light.style.backgroundColor = color;
                // We call resolve() to trigger the next .then()
                resolve(`Changed to ${color}`);
            }
        }, delay);
    });
};

// --- Execution ---

btn.addEventListener('click', () => {
    // We "Chain" our custom promises
    delayedColorChange('red', 1000)
        .then((msg) => {
            console.log(msg);
            return delayedColorChange('orange', 1000);
        })
        .then((msg) => {
            console.log(msg);
            return delayedColorChange('green', 1000);
        })
        .then((msg) => {
            console.log(msg + " - Sequence Complete!");
        })
        .catch((err) => {
            console.error("Oops:", err);
        });
});