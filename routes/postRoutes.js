const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createPost, getPosts, updatePost, deletePost } = require('../controllers/postController');

router.post('/posts', auth, createPost);
router.get('/posts', getPosts);
router.put('/posts/:id', auth, updatePost);
router.delete('/posts/:id', auth, deletePost);
router.post('/posts/:id/like', auth, likePost);

module.exports = router;