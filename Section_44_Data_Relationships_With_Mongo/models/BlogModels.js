const mongoose = require('mongoose');

// ONE-TO-FEW: Tags (embedded - few, always with post)
const tagSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: String
});

// ONE-TO-MANY: Comments (referenced - many, queried separately)
const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost', required: true, index: true },
  createdAt: { type: Date, default: Date.now },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // One-to-few within comment
});

// ONE-TO-BAJILLIONS: Post views (separate collection)
const viewSchema = new mongoose.Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost', index: true },
  ipHash: String, // Hashed for privacy
  userAgent: String,
  viewedAt: { type: Date, default: Date.now, index: true }
});
viewSchema.index({ post: 1, viewedAt: -1 }); // For time-based queries

// MAIN POST SCHEMA - combining all patterns
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  tags: [tagSchema], // ONE-TO-FEW: embedded
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  publishedAt: Date,
  // Denormalized counts for performance (updated via hooks)
  stats: {
    likesCount: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
    viewsCount: { type: Number, default: 0 }
  }
}, { timestamps: true });

// Index for efficient queries
postSchema.index({ status: 1, publishedAt: -1 });
postSchema.index({ 'stats.likesCount': -1 }); // For sorting by popular

const Post = mongoose.model('BlogPost', postSchema);
const Comment = mongoose.model('Comment', commentSchema);
const View = mongoose.model('View', viewSchema);

module.exports = { Post, Comment, View };