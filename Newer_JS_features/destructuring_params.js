

// Destructuring Objects
// Extract properties from objects into variables by matching key names

const movie = {
    title: 'Inception',
    director: 'Christopher Nolan',
    year: 2010,
    rating: 8.8
};

// Traditional way
const title1 = movie.title;
const director1 = movie.director;

// Destructuring way — variable names must match the key names
const { title, director, year, rating } = movie;
console.log(title, director, year, rating);
// Inception Christopher Nolan 2010 8.8

// Rename variables while destructuring
const { title: movieTitle, year: releaseYear } = movie;
console.log(movieTitle, releaseYear); // Inception 2010

// Default values for missing keys
const { title: t, budget = 'Unknown' } = movie;
console.log(t, budget); // Inception Unknown

// Nested object destructuring
const user = {
    name: 'Alex',
    address: {
        city: 'Austin',
        state: 'TX',
        zip: '78701'
    }
};
const { name, address: { city, state } } = user;
console.log(name, city, state); // Alex Austin TX

// Rest in object destructuring
const { title: filmTitle, rating: filmRating, ...details } = movie;
console.log(filmTitle);   // Inception
console.log(filmRating);  // 8.8
console.log(details);     // { director: 'Christopher Nolan', year: 2010 }