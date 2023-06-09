const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});
postSchema.pre('save', function (next) {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  next();
});
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
