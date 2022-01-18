const express = require('express');

const router = express.Router();

const postCtrl = require('../controllers/post.controllers');

router.post('/', postCtrl.create);
router.get('/', postCtrl.getAllPost);
router.get('/:id', postCtrl.getOnePost);
router.put('/:id', postCtrl.updatePost);
router.delete('/:id', postCtrl.deletePost);

module.exports = router;
