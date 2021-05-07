const express = require('express');

const driverController = require('./../controllers/driverController');

const commentRouter = require('./commentRoutes');

const router = express.Router();

//if a url route like this is detected, it will be rerouted to the comment router
router.use('/:driverId/comments', commentRouter);

router.route('/')
    .get(driverController.getAllDrivers)
    .post(driverController.createDriver);

router.route('/:id')
    .get(driverController.getDriver);

module.exports = router;