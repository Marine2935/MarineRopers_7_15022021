const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postCtrl = require('../controllers/post');

router.get('/', auth, postCtrl.getAllPosts);
router.get('/:post_id', auth, postCtrl.getOnePost);
router.post('/', auth, multer, postCtrl.createPost);
router.put('/:post_id', auth, multer, postCtrl.modifyPost);
router.delete('/:post_id/:user_id/:is_admin', auth, postCtrl.deletePost);
router.get('/:post_id/answers', auth, postCtrl.getAllPostCommentsAnswersCount);
router.get('/:post_id/reactions', auth, postCtrl.getPostReactions);
router.post('/:post_id/reactions', auth, postCtrl.newPostReaction);
router.delete('/:post_id/reactions/:user_id/:is_admin', auth, postCtrl.cancelPostReaction);

module.exports = router;