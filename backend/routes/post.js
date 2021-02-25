const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const postCtrl = require('../controllers/post');

router.get('/', auth, postCtrl.getAllPosts);
router.get('/:post_id', auth, postCtrl.getOnePost);
router.post('/', auth, postCtrl.createPost);
router.put('/:post_id', auth, postCtrl.modifyPost);
router.delete('/:post_id', auth, postCtrl.deletePost);
router.get('/:post_id/reactions', auth, postCtrl.getPostReactions);
router.post('/:post_id/reactions', auth, postCtrl.newPostReaction);

module.exports = router;