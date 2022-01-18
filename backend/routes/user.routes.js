const express = require('express');
//const { route } = require('../app');
const router = express.Router();

const userCtrl = require('../controllers/user.controllers');

router.get('/:id', userCtrl.userInfo);
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/:id', userCtrl.update);
router.delete('/:id', userCtrl.deleteUser);

module.exports = router;
