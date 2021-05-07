# Driver Feedback API v1

A simple MongoDB/Express CRUD API with routes for getting and creating entries for drivers by liscense plate number.
Each entry has a license plate number and a country/state. Comments, warnings and general feedback can be created for drivers by anyone.

## Overview

This API makes use of basic model/controller/router architecture with the entry point being **server.js.** Configurations, global middlewares and routes are implimented in **app.js.**

> server.js <-- app.js <-- Error handling (AppError.js, errorController.js) and routers (commentRouter.js, driverRouter.js)
