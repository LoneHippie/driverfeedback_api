const AppError = require('../utilities/appError');

const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new AppError(message, 400);
};

const handleDuplicateFieldsDB = err => {
    const value = err.errmsg.match(/(["'"])(\\?.)*?\1/);
    const message = `Duplicate field value: ${value}`;
    return new AppError(message, 400);
};

const handleValidationErrorDB = err => {
    const errors = Object.values(err.errors).map(el => el.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        stack: err.stack
    });
};

const sendErrorProduction = (err, res) => {
    //operational error response
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    //programming or unknown error response
    } else {
        console.error('ERROR', err);

        res.status(500).json({
            status: 'error',
            message: 'Something went wrong'
        });
    };
};


module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500; //500 is server error
    err.status = err.status || 'error'; //500 status code = 'error', 400 = 'fail'

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res);
    } else if (process.env.NODE_ENV === 'production') {
        let error = { ...err };

        //more readable error for invalid ID/query
        if (error.name === 'CastError') { error = handleCastErrorDB(error) }
        //more readable error for duplicate field values
        if (error.code === 11000) { error = handleDuplicateFieldsDB(error) }
        //more readable error for validation errors
        if (error.name === 'ValidationError') { error = handleValidationErrorDB(error) }

        sendErrorProduction(error, res);
    };  
};