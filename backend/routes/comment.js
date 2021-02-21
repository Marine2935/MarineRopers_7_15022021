const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const commentCtrl = require('../controllers/comment');

router.get('/:post_id/comments/', commentCtrl.getAllComments);
router.post('/:post_id/comments/', commentCtrl.createComment);
//router.put('/:post_id/comments/:id', auth, commentCtrl.modifyComment);
router.delete('/:post_id/comments/:id', auth, commentCtrl.deleteComment);
router.post('/:post_id/comments/:id/reaction', auth, commentCtrl.reactComment);

module.exports = router;