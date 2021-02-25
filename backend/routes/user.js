const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const validate = require('../middleware/password-validator');

const userCtrl = require('../controllers/user');

router.post('/signup', validate, userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/:user_id', auth, userCtrl.modifyProfil);
router.delete('/:user_id', auth, userCtrl.deleteAccount);
router.get('/:user_id/posts', auth, userCtrl.getUserPosts);

module.exports = router;