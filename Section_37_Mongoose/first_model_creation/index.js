

const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title:  String,
  year:   Number,
  score:  Number,
  rating: String
});

const Movie = mongoose.model('Movie', movieSchema);

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/movieDB');
  console.log('✅ Connected to movieDB!');
  mongoose.connection.close();
}

main().catch(console.error);

