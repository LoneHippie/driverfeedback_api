const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: [true, 'Comment must contain some text'],
        trim: true,
        minLength: 2,
        maxLength: 1000
    },
    commentType: {
        type: String,
        required: [true, 'Comment must be categorized']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    driver: {
        type: mongoose.Schema.ObjectId,
        ref: 'Driver',
        required: [true, 'Comment must belong to a driver']
    }
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;