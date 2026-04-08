

const Like = require('../models/Like');
const Post = require('../models/Post');
const User = require('../models/User');

async function demoOneToBajillions() {
  console.log('\n--- ONE-TO-BAJILLIONS DEMO ---');

  const post = await Post.findOne();
  const user = await User.findOne();

  const like = await Like.create({
    post: post._id,
    user: user._id
  });

  const count = await Like.countDocuments({ post: post._id });

  console.log(`Likes: ${count}`);
}

module.exports = demoOneToBajillions;