const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const commentCtrl = require('../controllers/comment');

// router.get('/:id', auth, commentCtrl.getCommentNumber);
router.get('/:postId', auth, commentCtrl.getAllComments);
router.post('/', auth, commentCtrl.createComment);
// router.put('/:id', auth, commentCtrl.modifyComment);
router.delete('/:id', auth, commentCtrl.deleteComment);

module.exports = router;