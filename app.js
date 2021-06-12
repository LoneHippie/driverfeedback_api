const express = require('express');

//middleware packages
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
// const hpp = require('hpp');
const cors = require('cors');

//error handling modules
const AppError = require('./utilities/appError');
const globalErrorHandler = require('./controllers/errorController');

//router imports
const driverRouter = require('./routes/driverRoutes');
const commentRouter = require('./routes/commentRoutes');

//start express app
const app = express();

/////////// Middlewares

//enabling cors for use on other domains
app.use(cors());
app.options('*', cors());

//limit reqs from unique IPs
const limiter = rateLimit({ //limits req per IP to 100 per hour
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests recieved from this IP, please try again in 1 hour'
});
//apply limiter to all routes that start with /api
app.use('/api', limiter);

//body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' })); //important: this line lets everything be returned properly as JSON

//data sanitization against NoSQL data injection
app.use(mongoSanitize());

//data santization against XSS (cross site scripting attacks)
app.use(xss());

//router mounting parent route/url
app.use('/api/v1/drivers', driverRouter);
app.use('/api/v1/comments', commentRouter);

//middleware for handling all undefined routes. Returns proper JSON formatted error to user
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl}`, 404));
});

//enable custom global error messages and handlers
app.use(globalErrorHandler);

//////////EXPORT

module.exports = app;