
# Depricated .remove() method and the .load() shell command
- Two things that often confuse learners coming from older Mongoose tutorials:
    1. The deprecated .remove() method
    2. The mongosh .load() command for running JS files.


## Part 1: The Deprecated .remove() Method
- In older versions of Mongoose (before v6), .remove() was the standard way to delete documents.

// OLD — deprecated as of Mongoose v6, removed in v7+
Movie.remove({ title: 'Alien' })

// Also deprecated
Movie.remove({})   // would delete everything

- You will see this in YouTube tutorials and blog posts from 2019–2021.
- Do not use it. It still technically runs in some Mongoose v6 environments but throws
deprecation warnings and is gone entirely in v7+.

- Why it was deprecated:
    * The .remove() method had confusing behaviour since it behaved differently depending on whether
    you called it on a Model vs on a document instance, and it gave no clear signal
    about how many documents were affected. Mongoose replaced it with three explicit methods
    that each do one thing clearly.

- Modern replacements:
        Depricated                          Modern replacement                      Key difference
   * Movie.remove({ title: 'X' })        Movie.deleteOne({ title: 'X' })         Deletes one, returns count
   * Movie.remove({})                    Movie.deleteMany({})                    Deletes all matches, returns count
   * doc.remove() (on an instance)       doc.deleteOne()                         Called on a fetched document


// deleteOne() — replaces Model.remove() for single deletions
const result = await Movie.deleteOne({ title: 'Alien' });
console.log(result.deletedCount);   // → 1


// deleteMany() — replaces Model.remove() for bulk deletions
const result = await Movie.deleteMany({ rating: 'R' });
console.log(result.deletedCount);   // → 3


// findOneAndDelete() — replaces findOneAndRemove()
// Returns the deleted document, useful for confirming what was removed
const deleted = await Movie.findOneAndDelete({ title: 'Amelie' });
console.log(deleted.title);   // → 'Amelie'


// On a document instance — call deleteOne() on the fetched doc
const movie = await Movie.findOne({ title: 'Alien' });
await movie.deleteOne();   // deletes that specific document

### The findOneAndRemove() -> deprecated too
- findOneAndRemove() is also deprecated for the same reasons.
- Replace it with findOneAndDelete() which works identically.

// OLD
Movie.findOneAndRemove({ title: 'Alien' })

// NEW
Movie.findOneAndDelete({ title: 'Alien' })

## Part 2: The .load() Command in mongosh
- .load() is a mongosh shell command that lets you run a .js file directly inside the Mongo Shell. 
- Think of it as node index.js but for the shell environment.















## Quick example: Load a cleanup script

// scripts/reset.js
use('movieDB');

const deleted = db.movies.deleteMany({});
print('Deleted ' + deleted.deletedCount + ' documents');

db.movies.insertMany([
  { title: 'Amelie',           year: 2001, score: 8.3, rating: 'R'     },
  { title: 'Alien',            year: 1979, score: 8.1, rating: 'R'     },
  { title: 'The Iron Giant',   year: 1999, score: 7.5, rating: 'PG'    },
  { title: 'Stand By Me',      year: 1986, score: 8.6, rating: 'R'     },
  { title: 'Moonrise Kingdom', year: 2012, score: 7.3, rating: 'PG-13' }
]);

print('Collection reset. Total: ' + db.movies.countDocuments());

// In mongosh
load('scripts/reset.js')
// Deleted 7 documents
// Collection reset. Total: 5

- This is extremely useful during development when you keep modifying/deleting documents
  and need to restore a clean known state quickly without leaving the shell.ShareContent

