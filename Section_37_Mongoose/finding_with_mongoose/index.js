

const mongoose = require('mongoose');
const Movie = require('../models/movie');

// ─── 1. Model.find() with .then() ────────────────────────────────────────────

// Find ALL movies
Movie.find({})
  .then(movies => console.log('All movies:', movies))
  .catch(err => console.error(err));

// Find only R-rated movies
Movie.find({ rating: 'R' })
  .then(movies => console.log('R-rated:', movies.map(m => m.title)))
  .catch(err => console.error(err));

// Find movies scored above 8 — using MongoDB comparison operator
Movie.find({ score: { $gt: 8 } })
  .then(movies => console.log('Score > 8:', movies.map(m => m.title)))
  .catch(err => console.error(err));


// ─── 2. Model.findOne() ──────────────────────────────────────────────────────

// Returns a single document (or null), not an array
Movie.findOne({ title: 'Alien' })
  .then(movie => console.log('findOne result:', movie))
  .catch(err => console.error(err));


// ─── 3. Model.findById() ─────────────────────────────────────────────────────

// Replace this string with a real _id from: mongosh → db.movies.find({}, {_id:1, title:1})
const someId = 'PASTE_A_REAL_ID_HERE';

Movie.findById(someId)
  .then(movie => {
    if (!movie) return console.log('No movie found with that ID');
    console.log('findById result:', movie.title);
  })
  .catch(err => console.error(err));


// ─── 4. Using .exec() for a true Promise ─────────────────────────────────────

Movie.find({ rating: 'PG' })
  .exec()
  .then(movies => console.log('PG movies via exec():', movies.map(m => m.title)))
  .catch(err => console.error(err));


// ─── 5. async / await — the recommended modern pattern ───────────────────────

async function findMovies() {
  await mongoose.connect('mongodb://127.0.0.1:27017/movieDB');
  console.log('✅ Connected');

  try {
    // find() — array result
    const all = await Movie.find({});
    console.log('\nTotal movies:', all.length);

    // find() with filter + sort
    const topRated = await Movie.find({ score: { $gte: 8 } }).sort({ score: -1 });
    console.log('\nTop rated (score ≥ 8):');
    topRated.forEach(m => console.log(`  ${m.title} — ${m.score}`));

    // findOne() — single doc
    const first = await Movie.findOne({ rating: 'R' });
    console.log('\nFirst R-rated movie:', first.title);

    // findById()  ← paste a real _id string here
    // const byId = await Movie.findById('PASTE_A_REAL_ID_HERE');
    // console.log('\nFound by ID:', byId?.title ?? 'Not found');

  } catch (err) {
    console.error('Query error:', err);
  } finally {
    mongoose.connection.close();
  }
}

findMovies();


// Mongo Shell Equivalent:
/*
db.movies.find({})
db.movies.find({ rating: 'R' })
db.movies.find({ score: { $gt: 8 } })
*/