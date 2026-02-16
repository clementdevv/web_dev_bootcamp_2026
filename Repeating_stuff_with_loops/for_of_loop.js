

const planets = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter'];

for (let i = 0; i < planets.length; i++) {
    console.log(`Index ${i}: ${planets[i]}`);
}

console.log("\n"); // Line break


for (let planet of planets) {
    console.log(`Current Planet: ${planet}`);
}

const prices = [19.99, 5.50, 10.00, 2.25];
let total = 0;

for (let price of prices) {
    total += price;
}

console.log(`\nTotal Price: $${total}`);


// for multidimensional array:

const seatingChart = [
    ["Jeff", "Epstein"],
    ["Daniel", "Felicia"],
    ["Rodney", "Andreas"]
];

// Outer loop: iterates through each row array
for (let row of seatingChart) {
    console.log("--- New Row ---");
    
    // Inner loop: iterates through each name inside that row
    for (let student of row) {
        console.log(student);
    }
}