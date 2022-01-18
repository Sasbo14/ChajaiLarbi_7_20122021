const express = require('express');

const router = express.Router();

const commentaryCtrl = require('../controllers/commentary.controllers');

router.post('/', commentaryCtrl.create);
router.get('/', commentaryCtrl.getAllCommentary);
router.get('/:id', commentaryCtrl.getOneCommentary);
router.put('/:id', commentaryCtrl.updateCommentary);
router.delete('/:id', commentaryCtrl.deleteCommentary);

module.exports = router;
