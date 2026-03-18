
# Mongo Shell — Updating Documents


- A hands-on walkthrough of update commands directly in mongosh before touching any Node.js code.
Run these commands in order to see exactly what each update method does to your data.

1. mongosh -> Start the Shell & Pick Your Database

2. use movieDB
   Confirm your movies are there before updating anything
   db.movies.find()
   db.movies.countDocuments()   // → 5

3. Step 1: updateOne() 
- Updates the first document that matches the filter. Stops after one.
   
// Syntax:
// db.collection.updateOne( filter, update, options )

// Bump Alien's score
db.movies.updateOne(
  { title: 'Alien' },
  { $set: { score: 9.5 } }
)
// → { acknowledged: true, matchedCount: 1, modifiedCount: 1 }

// Verify the change
db.movies.findOne({ title: 'Alien' })

// Update multiple fields at once with one $set
db.movies.updateOne(
  { title: 'Amelie' },
  { $set: { score: 9.0, rating: 'PG-13' } }
)

// $inc — increment a number instead of replacing it
db.movies.updateOne(
  { title: 'The Iron Giant' },
  { $inc: { score: 0.5 } }   // adds 0.5 to whatever score currently is
)

4. Step 2: updateMany()
- Updates all documents that match the filter.

// Give every R-rated movie a perfect score
db.movies.updateMany(
  { rating: 'R' },
  { $set: { score: 10 } }
)
// → matchedCount: 3, modifiedCount: 3

// Verify
db.movies.find({ rating: 'R' })

// Update all documents — empty filter {} matches everything
// ⚠️  This changes EVERY document in the collection
db.movies.updateMany(
  {},
  { $set: { watched: false } }   // adds a new "watched" field to all docs
)

db.movies.find()   // every movie now has watched: false

// Update all documents — empty filter {} matches everything
// ⚠️  This changes EVERY document in the collection
db.movies.updateMany(
  {},
  { $set: { watched: false } }   // adds a new "watched" field to all docs
)

db.movies.find()   // every movie now has watched: false

5. Step 3: $set vs No $set
- This is one of the most important things to understand about MongoDB updates.

// ✅ CORRECT — using $set only changes the specified fields
db.movies.updateOne(
  { title: 'Alien' },
  { $set: { score: 9.5 } }
)
// Result: title, year, rating are all preserved. Only score changes.


// ❌ DANGEROUS — without $set you REPLACE the whole document
db.movies.updateOne(
  { title: 'Alien' },
  { score: 9.5 }    // no $set!
)
// Result: the entire Alien document is REPLACED with { score: 9.5 }
// title, year, rating are all GONE. Only score remains.


// Fix it — restore Alien from scratch after the bad update
db.movies.updateOne(
  { score: 9.5 },   // find it by score since title is gone
  { $set: { title: 'Alien', year: 1979, score: 9.5, rating: 'R' } }
)

## Important Rule:
- Always use $set (or another operator like $inc, $push) inside the update object.
- Passing a plain object without an operator replaces the entire document.

6. Step 4: findOneAndUpdate()
- Returns the document, before or after the update. Useful when you need to see what changed.

// Returns the document BEFORE the update (default behaviour)
db.movies.findOneAndUpdate(
  { title: 'Stand By Me' },
  { $set: { score: 9.2 } }
)
// → shows Stand By Me with the OLD score


// Returns the document AFTER the update
db.movies.findOneAndUpdate(
  { title: 'Stand By Me' },
  { $set: { score: 9.2 } },
  { returnDocument: 'after' }
)
// → shows Stand By Me with score: 9.2

7. Step 5: Upsert
- If no document matches the filter, insert a new one instead of doing nothing.

// 'Parasite' doesn't exist yet — upsert creates it
db.movies.updateOne(
  { title: 'Parasite' },
  { $set: { year: 2019, score: 8.6, rating: 'R' } },
  { upsert: true }
)
// → upsertedCount: 1

// Run the same command again — now it just updates (modifiedCount: 0 since values are same)
db.movies.updateOne(
  { title: 'Parasite' },
  { $set: { score: 9.0 } },
  { upsert: true }
)
// → matchedCount: 1, modifiedCount: 1  (it found it this time)

8. Step 6: Useful Update Operators Reference

// $set — set a field to a value
{ $set: { score: 9.5 } }

// $unset — remove a field entirely
{ $unset: { watched: '' } }

// $inc — increment (positive) or decrement (negative) a number
{ $inc: { score: 1 } }
{ $inc: { score: -0.5 } }

// $rename — rename a field
{ $rename: { 'rating': 'ageRating' } }

// $push — add a value to an array field
{ $push: { tags: 'classic' } }

// $pull — remove a value from an array field
{ $pull: { tags: 'classic' } }

// $addToSet — like $push but only adds if not already present
{ $addToSet: { tags: 'sci-fi' } }

9. Step 7: Verification Commands
- After every update, confirm the state of your collection.

// See everything
db.movies.find().pretty()

// Find the specific doc you just updated
db.movies.findOne({ title: 'Alien' })

// Check a field was set correctly
db.movies.find({ watched: false })

// Count documents matching a condition
db.movies.countDocuments({ score: { $gte: 9 } })

// Sort to see highest scores at top
db.movies.find().sort({ score: -1 })

10. Reset the Collection (if you want a clean slate)

// Delete all documents and re-seed
db.movies.deleteMany({})

db.movies.insertMany([
  { title: 'Amelie',           year: 2001, score: 8.3, rating: 'R'     },
  { title: 'Alien',            year: 1979, score: 8.1, rating: 'R'     },
  { title: 'The Iron Giant',   year: 1999, score: 7.5, rating: 'PG'    },
  { title: 'Stand By Me',      year: 1986, score: 8.6, rating: 'R'     },
  { title: 'Moonrise Kingdom', year: 2012, score: 7.3, rating: 'PG-13' }
])

db.movies.countDocuments()   // → 5
