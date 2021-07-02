const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const userCtrl = require('../controllers/user');

router.get('/:id', userCtrl.getOneUser);
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/:id', auth, userCtrl.modifyPassword);
//router.delete('/:id', auth, userCtrl.deleteAccount);
router.delete('/:id', userCtrl.deleteAccount);

module.exports = router;