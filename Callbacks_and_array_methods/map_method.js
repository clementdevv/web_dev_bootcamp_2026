// map - creates a NEW array by applying a function to every element
// The original array is NOT modified

const numbers = [1, 2, 3, 4, 5];

// Double every number
const doubled = numbers.map(function(num) {
    return num * 2;
});
console.log(doubled);   // [2, 4, 6, 8, 10]
console.log(numbers);   // [1, 2, 3, 4, 5] — original unchanged

// Transform strings
const names = ['alice', 'bob', 'charlie'];
const capitalized = names.map(function(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
});
console.log(capitalized); // ['Alice', 'Bob', 'Charlie']

// Map over objects to extract a specific field
const movies = [
    { title: 'Inception', year: 2010 },
    { title: 'Interstellar', year: 2014 },
    { title: 'Tenet', year: 2020 }
];

const titles = movies.map(function(movie) {
    return movie.title;
});
console.log(titles); // ['Inception', 'Interstellar', 'Tenet']

// map always returns an array of the same length as the original
const lengths = names.map(function(name) {
    return name.length;
});
console.log(lengths); // [5, 3, 7]