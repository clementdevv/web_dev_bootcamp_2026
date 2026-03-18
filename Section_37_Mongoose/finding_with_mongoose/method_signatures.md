

Model.find(filter)                  // → array
Model.find(filter, projection)      // → array, only selected fields
Model.findOne(filter)               // → single doc or null
Model.findById(id)                  // → single doc or null

// Chaining (all return a Query object — lazy until awaited or .then'd)
Movie.find({ rating: 'R' }).sort({ score: -1 }).limit(3)
Movie.find({}).select('title score')   // projection in Mongoose style
Movie.find({}).exec()                  // explicit Promise execution