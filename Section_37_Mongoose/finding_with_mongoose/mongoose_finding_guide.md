

# Start the shell
mongosh

# Switch to (or create) your database
use movieDB

# Insert test movies directly from the shell
db.movies.insertMany([
  { title: 'Amelie',           year: 2001, score: 8.3, rating: 'R'     },
  { title: 'Alien',            year: 1979, score: 8.1, rating: 'R'     },
  { title: 'The Iron Giant',   year: 1999, score: 7.5, rating: 'PG'    },
  { title: 'Stand By Me',      year: 1986, score: 8.6, rating: 'R'     },
  { title: 'Moonrise Kingdom', year: 2012, score: 7.3, rating: 'PG-13' }
])

# Verify everything is there
db.movies.find()

# Check count
db.movies.countDocuments()   # → 5

# Quick filter test in the shell (raw MongoDB syntax)
db.movies.find({ rating: 'R' })
db.movies.find({ score: { $gt: 8 } })


- Why do this first? The Mongo Shell gives you instant feedback without any Node.js overhead.
- It's the fastest way to verify your data shape before writing Mongoose queries.

# Something on the .then() method:
- .then() comes from JavaScript Promises. Mongoose queries are "thenable" — they execute when you attach .then().
Movie.find({ rating: 'R' })
  .then(data => {
    console.log('Found:', data);
  })
  .catch(err => {
    console.error('Error:', err);
  });

# Chaining the .catch() method:
- If the database is down or the query fails, .catch() handles the error gracefully instead of crashing Node.
Movie.find({ score: { $lt: 5 } })
  .then(movies => {
    if (movies.length === 0) {
      console.log('No movies found with that filter.');
    } else {
      console.log(movies);
    }
  })
  .catch(err => console.error(err));

# Model.findById(): 

// Step 1: get a real _id from the shell first
// mongosh → use movieDB → db.movies.find({}, { _id: 1, title: 1 })
// Copy one of the _id values, e.g. 64f1a2b3c4d5e6f7a8b9c0d1

const id = '64f1a2b3c4d5e6f7a8b9c0d1';  // ← paste your real _id here

Movie.findById(id)
  .then(movie => {
    if (!movie) {
      console.log('No movie found with that ID.');
      return;
    }
    console.log(movie.title, movie.year);
  })
  .catch(err => console.error(err))
  .finally(() => mongoose.connection.close());

  - Mongo Shell equivalent:
  db.movies.findOne({ _id: ObjectId('64f1a2b3c4d5e6f7a8b9c0d1') })

# Model.findOne(): 

// Find the first R-rated movie
Movie.findOne({ rating: 'R' })
  .then(movie => {
    console.log(movie);
  })
  .catch(err => console.error(err));

// Find by exact title
Movie.findOne({ title: 'Alien' })
  .then(movie => {
    console.log(movie?.title, movie?.score);
  })
  .catch(err => console.error(err));

# The exec() method
- .exec() explicitly executes the query and returns a true Promise. This matters when you want proper stack traces on errors.

// Without exec() — works fine, but error stack traces are less useful
Movie.find({ rating: 'R' }).then(data => console.log(data));

// With exec() — same result, better error reporting
Movie.find({ rating: 'R' })
  .exec()
  .then(data => console.log(data))
  .catch(err => console.error(err));

# Using async...await (recommended pattern)
- async/await is the cleanest way to write Mongoose queries. It's just Promise syntax with less nesting.

// find_async/index.js
const mongoose = require('mongoose');
const Movie = require('../models/movie');

async function findMovies() {
  await mongoose.connect('mongodb://127.0.0.1:27017/movieDB');

  // find all
  const all = await Movie.find({});
  console.log('All movies:', all.length);

  // find with filter
  const rRated = await Movie.find({ rating: 'R' });
  console.log('R-rated:', rRated.map(m => m.title));

  // findOne
  const alien = await Movie.findOne({ title: 'Alien' });
  console.log('Found:', alien.title, '— score:', alien.score);

  // findById  (replace with a real _id from your db)
  const id = '64f1a2b3c4d5e6f7a8b9c0d1';
  const byId = await Movie.findById(id);
  console.log('By ID:', byId?.title ?? 'Not found');

  mongoose.connection.close();
}

findMovies().catch(console.error);

- With try-catch error handling:

async function findMovies() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/movieDB');

    const highScored = await Movie.find({ score: { $gte: 8 } });
    console.log('High scored movies:');
    highScored.forEach(m => console.log(`  ${m.title} — ${m.score}`));

  } catch (err) {
    console.error('Something went wrong:', err);
  } finally {
    mongoose.connection.close();
  }
}