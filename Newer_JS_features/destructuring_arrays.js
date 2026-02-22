

// Destructuring Arrays
// Extract values from arrays into variables — positional, left to right

const scores = [95, 82, 74, 61, 55];

// Traditional way
const first = scores[0];
const second = scores[1];

// Destructuring way
const [gold, silver, bronze] = scores;
console.log(gold, silver, bronze); // 95 82 74

// Skip elements using commas
const [, , third] = scores;
console.log(third); // 74

// Use rest to collect the remainder
const [top, ...rest] = scores;
console.log(top);  // 95
console.log(rest); // [82, 74, 61, 55]

// Default values in case the array is too short
const [a = 0, b = 0, c = 0, d = 0, e = 0, f = 0] = [10, 20];
console.log(a, b, c, d, e, f); // 10 20 0 0 0 0

// Swap variables — no temp variable needed!
let x = 'hello';
let y = 'world';
[x, y] = [y, x];
console.log(x, y); // world hello

// Destructuring from a function return value
function getCoords() {
    return [40.7128, -74.0060];
}
const [lat, lng] = getCoords();
console.log(`Lat: ${lat}, Lng: ${lng}`); // Lat: 40.7128, Lng: -74.006

// Nested array destructuring
const matrix = [[1, 2], [3, 4]];
const [[r1c1, r1c2], [r2c1, r2c2]] = matrix;
console.log(r1c1, r1c2, r2c1, r2c2); // 1 2 3 4