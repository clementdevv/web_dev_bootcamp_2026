

# All documents
db.movies.find()

# Pretty print
db.movies.find().pretty()

# Filter by field
db.movies.find({ rating: 'PG' })

# Comparison operators
db.movies.find({ score: { $gt: 8 } })    # greater than
db.movies.find({ score: { $gte: 8 } })   # greater than or equal
db.movies.find({ year:  { $lt: 2000 } }) # less than
db.movies.find({ year:  { $in: [1979, 1986, 1999] } })

# Find one
db.movies.findOne({ title: 'Amelie' })

# Find by _id
db.movies.findOne({ _id: ObjectId('your-id-here') })

# Only return specific fields (projection)
db.movies.find({}, { title: 1, score: 1, _id: 0 })

# Sort results
db.movies.find().sort({ score: -1 })     # descending
db.movies.find().sort({ year: 1 })       # ascending

# Limit results
db.movies.find().limit(3)

# Count matches
db.movies.countDocuments({ rating: 'R' })