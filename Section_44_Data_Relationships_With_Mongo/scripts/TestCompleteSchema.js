const mongoose = require('mongoose');
require('dotenv').config();
const { Post, Comment, View } = require('../models/BlogModels');

// Reuse User model from earlier
const userSchema = new mongoose.Schema({ name: String, email: String });
const User = mongoose.model('User', userSchema);

async function testCompleteSchema() {
  console.log('\n🎯 TESTING COMPLETE SCHEMA DESIGN\n');
  
  // Create test user
  const author = await User.create({ name: 'Expert Dev', email: 'dev@example.com' });
  console.log('1. Created author');
  
  // Create post with embedded tags (one-to-few)
  const post = await Post.create({
    title: 'MongoDB Schema Design Mastery',
    content: 'Learn all about data relationships...',
    author: author._id,
    tags: [
      { name: 'mongodb', slug: 'mongodb' },
      { name: 'database', slug: 'database' },
      { name: 'tutorial', slug: 'tutorial' }
    ],
    status: 'published',
    publishedAt: new Date()
  });
  console.log('2. Created post with embedded tags:', post.tags.length, 'tags');
  
  // Add comments (one-to-many)
  const comment1 = await Comment.create({
    content: 'Great tutorial!',
    author: author._id,
    post: post._id
  });
  const comment2 = await Comment.create({
    content: 'Very helpful!',
    author: author._id,
    post: post._id
  });
  console.log('3. Added 2 comments (one-to-many relationship)');
  
  // Update post's comment count (denormalized)
  post.stats.commentsCount = 2;
  await post.save();
  
  // Add views (one-to-bajillions)
  await View.create({ post: post._id, ipHash: 'abc123', userAgent: 'Chrome' });
  await View.create({ post: post._id, ipHash: 'def456', userAgent: 'Firefox' });
  await View.create({ post: post._id, ipHash: 'ghi789', userAgent: 'Safari' });
  console.log('4. Added 3 views (separate collection for scalability)');
  
  // Query with populations
  const fullPost = await Post.findById(post._id)
    .populate('author', 'name');
  
  const recentComments = await Comment.find({ post: post._id })
    .populate('author', 'name')
    .sort('-createdAt')
    .limit(10);
  
  const viewCount = await View.countDocuments({ post: post._id });
  
  console.log('\n📊 RESULTS:');
  console.log(`Post: "${fullPost.title}" by ${fullPost.author.name}`);
  console.log(`Tags: ${fullPost.tags.map(t => t.name).join(', ')}`);
  console.log(`Comments: ${recentComments.length}`);
  console.log(`Views: ${viewCount}`);
  
  // Performance check
  console.log('\n⚡ Performance notes:');
  console.log('- Tags loaded in same query (embedded)');
  console.log('- Comments loaded separately (avoid huge documents)');
  console.log('- Views in separate collection with indexes (supports millions)');
}

mongoose.connect(process.env.MONGODB_URI)
  .then(() => testCompleteSchema())
  .then(() => mongoose.disconnect())
  .catch(console.error);