

const mongoose = require('mongoose');
const Movie = require('../models/movie');

// ─────────────────────────────────────────────────────────────────────────────
// MONGOOSE — DELETING DOCUMENTS
// Methods: deleteOne(), deleteMany(), findOneAndDelete()
// ─────────────────────────────────────────────────────────────────────────────

async function runDeletes() {
  await mongoose.connect('mongodb://127.0.0.1:27017/movieDB');
  console.log('✅ Connected to movieDB\n');

  try {

    // ── 1. deleteOne() ───────────────────────────────────────────────────────
    // Deletes the FIRST document that matches the filter.
    // Returns a result object — NOT the deleted document.

    const result1 = await Movie.deleteOne({ title: 'Amelie' });
    console.log('deleteOne result:', result1);
    // → { acknowledged: true, deletedCount: 1 }
    // deletedCount: 0 means nothing matched the filter


    // ── 2. deleteMany() ──────────────────────────────────────────────────────
    // Deletes ALL documents that match the filter.
    // ⚠️  deleteMany({}) with an empty filter deletes EVERY document — be careful.

    const result2 = await Movie.deleteMany({ rating: 'R' });
    console.log('deleteMany result:', result2);
    // → { acknowledged: true, deletedCount: 3 }  (Alien, Stand By Me, Amelie)

    // Delete with a comparison operator
    const result3 = await Movie.deleteMany({ score: { $lt: 8 } });
    console.log('Deleted low-scored movies:', result3);


    // ── 3. findOneAndDelete() ────────────────────────────────────────────────
    // Finds the first matching document, DELETES it, and RETURNS the document.
    // This is the key difference from deleteOne() — you get the deleted doc back,
    // which is useful for confirming what was removed or logging it.

    const deleted = await Movie.findOneAndDelete({ title: 'Alien' });
    if (!deleted) {
      console.log('No movie found to delete');
    } else {
      console.log('Deleted document:', deleted.title, deleted.year);
    }


    // ── 4. Verify deletion in the same session ───────────────────────────────
    // Good habit: query after deleting to confirm the state of your collection

    const remaining = await Movie.find({});
    console.log('\nMovies remaining after deletions:');
    remaining.forEach(m => console.log(`  ${m.title} (${m.year})`));
    console.log('Total remaining:', remaining.length);


    // ── 5. Safe delete pattern ───────────────────────────────────────────────
    // Always check deletedCount to confirm something was actually removed.

    const safeDelete = await Movie.deleteOne({ title: 'Film That Does Not Exist' });
    if (safeDelete.deletedCount === 0) {
      console.log('\nNothing was deleted — no match found');
    } else {
      console.log('\nDocument successfully deleted');
    }

  } catch (err) {
    console.error('Delete error:', err);
  } finally {
    mongoose.connection.close();
    console.log('\n🔌 Connection closed');
  }
}

runDeletes();