const Comment = require('./../models/commentModel');
const factory = require('./handlerFactory');

//for middleware in routes
exports.setDriverIds = (req, res, next) => {
    //req body driver can still be manually inputted but if not it will come from the url params
    if (!req.body.driver) {
        req.body.driver = req.params.driverId
    };

    next();
};

exports.getAllComments = factory.getAll(Comment);
exports.getComment = factory.getOne(Comment);
exports.createComment = factory.createOne(Comment);
exports.deleteComment = factory.deleteOne(Comment);