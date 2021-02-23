const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const postCtrl = require('../controllers/post');

router.get('/', postCtrl.getAllPosts);
router.get('/:post_id', postCtrl.getOnePost);
router.post('/', postCtrl.createPost);
router.put('/:post_id', auth, postCtrl.modifyPost);
router.delete('/:post_id', auth, postCtrl.deletePost);
router.get('/:post_id/reactions', postCtrl.getPostReactions);
router.post('/:post_id/reactions', postCtrl.newPostReaction);

module.exports = router;