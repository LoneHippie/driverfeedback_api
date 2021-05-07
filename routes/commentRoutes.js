const express = require('express');

const commentController = require('./../controllers/commentController');

const router = express.Router({ mergeParams: true });

router.route('/')
    .get(commentController.getAllComments)
    .post(
        commentController.setDriverIds,
        commentController.createComment
    );

router.route('/:id')
    .get(commentController.getComment);

module.exports = router;