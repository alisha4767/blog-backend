const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    user: req.user.userId
  });

  await post.save();
  res.json(post);
};

exports.getPosts = async (req, res) => {
  const posts = await Post.find().populate('user', 'email');
  res.json(posts);
};