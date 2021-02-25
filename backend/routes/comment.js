const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const commentCtrl = require('../controllers/comment');

router.get('/:post_id/comments/', auth, commentCtrl.getAllComments);
router.post('/:post_id/comments/', auth, commentCtrl.createComment);
//router.put('/:post_id/comments/:id', auth, commentCtrl.modifyComment);
router.delete('/:post_id/comments/:comment_id', auth, commentCtrl.deleteComment);
router.get('/:post_id/comments/:comment_id/reactions', auth, commentCtrl.getCommentReactions);
router.post('/:post_id/comments/:comment_id/reactions', auth, commentCtrl.newCommentReaction);

module.exports = router;