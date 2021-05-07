const catchAsync = require('./../utilities/catchAsync');
const AppError = require('./../utilities/appError');
const APIFeatures = require('./../utilities/apiFeatures');

///////// factory functions to be used for CRUD ops in all controllers //////////

exports.deleteOne = Model => catchAsync (async (req, res, next) => {  

    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
        return next(new AppError('No document found with this ID', 404));
    };

    res.status(204).json({
        status: 'success',
        message: `Deleted doc: ${doc.name}`
    });
});

exports.updateOne = Model => catchAsync (async (req, res, next) => {

    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true, //new updated doc is what's returned
        runValidators: true //uses schema validations on updated props
    });

    if (!doc) {
        return next(new AppError('No document found with this ID', 404));
    };

    res.status(200).json({
        status: 'success',
        data: {
            data: doc
        }
    });
});

exports.createOne = Model => catchAsync (async (req, res, next) => {

    const doc = await Model.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            data: doc
        }
    });
});

exports.getOne = (Model, populateOptions) => catchAsync (async (req, res, next) => {

    let query = Model.findById(req.params.id);

    if (populateOptions) { query = query.populate(populateOptions) };

    const doc = await query;

    if (!doc) {
        return next(new AppError('No document found with this ID', 404));
    };

    res.status(200).json({
        status: 'success',
        data: {
            data: doc
        }
    });
});

exports.getAll = Model => catchAsync (async (req, res, next) => {

    //to allow for nested GET comments on driver
    let filter = {};
    //for something like GET url/drivers/driver id/comments. Gets all comments for that driver id
    if (req.params.driverId) { filter = { driver: req.params.driverId } };

    //chained query class methods
    const features = new APIFeatures(Model.find(filter), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

    //query execution
    const doc = await features.query;
    //const doc = await features.query.explain(); //use this version for query performance stats in res

    //sending response
    res.status(200).json({
        status: 'success',
        results: doc.length,
        data: {
            data: doc
        }
    });
});