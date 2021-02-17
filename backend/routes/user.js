const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const validate = require('../middleware/password-validator');

const userCtrl = require('../controllers/user');

router.post('/signup', validate, userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/:id', auth, userCtrl.modifyProfil);
router.delete('/:id', auth, userCtrl.deleteAccount);

module.exports = router;