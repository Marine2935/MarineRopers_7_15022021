const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const validate = require('../middleware/password-validator');

const userCtrl = require('../controllers/user');

router.post('/signup', multer, validate, userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/', auth, userCtrl.getAllUsers);
router.get('/:user_id', auth, userCtrl.getOneUser);
router.put('/:user_id', auth, multer, userCtrl.modifyUser);
router.delete('/:user_id/:is_admin', auth, userCtrl.deleteAccount);
router.get('/:user_id/posts', auth, userCtrl.getUserPosts);

module.exports = router;