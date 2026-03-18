
const mongoose = require('mongoose');
const Movie = require('../models/movie');

// ─────────────────────────────────────────────────────────────────────────────
// MONGOOSE — UPDATING DOCUMENTS
// Methods: updateOne(), updateMany(), findOneAndUpdate()
// ─────────────────────────────────────────────────────────────────────────────

async function runUpdates() {
  await mongoose.connect('mongodb://127.0.0.1:27017/movieDB');
  console.log('✅ Connected to movieDB\n');

  try {

    // ── 1. updateOne() ───────────────────────────────────────────────────────
    // Updates the FIRST document that matches the filter.
    // Returns an update result object — NOT the document itself.

    const result1 = await Movie.updateOne(
      { title: 'Alien' },          // filter — which doc to find
      { $set: { score: 9.5 } }     // update — what to change
    );
    console.log('updateOne result:', result1);
    // → { acknowledged: true, matchedCount: 1, modifiedCount: 1 }
    // matchedCount = how many docs matched the filter
    // modifiedCount = how many docs were actually changed


    // ── 2. updateMany() ──────────────────────────────────────────────────────
    // Updates ALL documents that match the filter.

    const result2 = await Movie.updateMany(
      { rating: 'R' },                     // filter — all R-rated movies
      { $set: { score: 10, year: 2023 } }  // update — change multiple fields
    );
    console.log('updateMany result:', result2);
    // → { acknowledged: true, matchedCount: 3, modifiedCount: 3 }


    // ── 3. findOneAndUpdate() ────────────────────────────────────────────────
    // Finds the first matching document, updates it, and RETURNS THE DOCUMENT.
    // This is the key difference from updateOne() — you get the doc back.
    //
    // By default it returns the document BEFORE the update.
    // Pass { new: true } to return the document AFTER the update.

    const updatedMovie = await Movie.findOneAndUpdate(
      { title: 'Amelie' },          // filter
      { $set: { score: 9.9 } },     // update
      { new: true }                 // option: return the updated doc
    );
    console.log('findOneAndUpdate result:', updatedMovie);
    // → the full Amelie document with score now 9.9


    // ── 4. Common $set operators ─────────────────────────────────────────────
    // $set      — set a field to a value (most common)
    // $inc      — increment a number field
    // $push     — add an item to an array field
    // $pull     — remove an item from an array field
    // $unset    — remove a field entirely

    // Example: increment score by 0.5
    await Movie.updateOne(
      { title: 'The Iron Giant' },
      { $inc: { score: 0.5 } }
    );
    console.log('Incremented Iron Giant score by 0.5');

    // Example: add a new field that didn't exist before
    // $set creates the field if it doesn't exist
    await Movie.updateOne(
      { title: 'Stand By Me' },
      { $set: { watched: true } }
    );
    console.log('Added watched:true to Stand By Me');


    // ── 5. Upsert option ─────────────────────────────────────────────────────
    // { upsert: true } — if no document matches the filter,
    // INSERT a new document instead of doing nothing.

    const upsertResult = await Movie.updateOne(
      { title: 'Parasite' },                               // no match in DB
      { $set: { year: 2019, score: 8.6, rating: 'R' } },  // fields to set
      { upsert: true }                                     // insert if not found
    );
    console.log('Upsert result:', upsertResult);
    // → upsertedCount: 1 (a new document was created)


    // ── 6. async/await with findOneAndUpdate — full pattern ──────────────────
    const movie = await Movie.findOneAndUpdate(
      { title: 'Moonrise Kingdom' },
      { $set: { score: 8.0 } },
      { new: true, runValidators: true }
      // runValidators: true — ensures the update respects your schema rules
    );
    if (!movie) {
      console.log('Movie not found');
    } else {
      console.log(`Updated: ${movie.title} → new score: ${movie.score}`);
    }

  } catch (err) {
    console.error('Update error:', err);
  } finally {
    mongoose.connection.close();
    console.log('\n🔌 Connection closed');
  }
}

runUpdates();