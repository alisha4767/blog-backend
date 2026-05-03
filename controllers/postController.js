const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  try {
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      image: req.file ? req.file.filename : null,
      user: req.user.userId
    });

    await post.save();
    res.json(post);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPosts = async (req, res) => {
  const posts = await Post.find().populate('user', 'email');
  res.json(posts);
};
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // ❌ If post not found
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // 🔐 Check owner
    if (post.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not allowed" });
    }

    // ✏️ Update
    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;

    await post.save();

    res.json(post);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // 🔐 Check owner
    if (post.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await post.deleteOne();

    res.json({ message: "Post deleted" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const userId = req.user.userId;

    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter(id => id.toString() !== userId);
      await post.save();
      return res.json({ message: "Post unliked" });
    } else {
      post.likes.push(userId);
      await post.save();
      return res.json({ message: "Post liked" });
    }

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};