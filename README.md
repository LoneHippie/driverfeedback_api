# Driver Feedback API v1

A simple MongoDB/Express CRUD API with routes for getting and creating entries for drivers by liscense plate number.
Each entry has a license plate number and a country/state. Comments, warnings and general feedback can be created for drivers by anyone.

## Overview

This API makes use of basic model/controller/router architecture with the entry point being **server.js.** Configurations, global middlewares and routes are implimented in **app.js.**

> server.js <-- app.js <-- Error handling (AppError.js, errorController.js) and routers (commentRouter.js, driverRouter.js)

## Documentation

This API has routes for two data sets: drivers and comments. A list of all entries for either set can be accessed like so:

__Get all drivers__

> https://driverfeedback.herokuapp.com/api/v1/drivers

__Get all comments__

> https://driverfeedback.herokuapp.com/api/v1/comments

Data for an individual driver or comment can be accessed via ids:

> https://driverfeedback.herokuapp.com/api/v1/drivers/6094dc7cae0a9718413deb1d

> https://driverfeedback.herokuapp.com/api/v1/comments/6094dd84ae0a9718413deb1f

All comments for a specific driver can be retrieved via the driver id and the comments endpoint:

> https://driverfeedback.herokuapp.com/api/v1/drivers/6094dc7cae0a9718413deb1d/comments