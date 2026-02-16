
// for (let i = 1; i <= 3; i++) {
//     console.log(`--- Outer Loop (i = ${i}) ---`);

//     for (let j = 1; j <= 3; j++) {
//         // This inner loop runs 3 times for EVERY 1 time the outer loop runs
//         console.log(`Inner Loop (j = ${j}) -> Result: ${i * j}`);
//     }
// }


const seatingChart = [
    ["Jeff", "Epstein"],
    ["Daniel", "Felicia"],
    ["Rodney", "Andreas"]
];

for (let i = 0; i < seatingChart.length; i++) {
    const row = seatingChart[i]
    console.log(`Row #${i + 1}`)
    for (let j = 0; j < grid[row].length; j++) {
        console.log(row[j]);
    }
}