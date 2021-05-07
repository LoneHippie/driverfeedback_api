const Driver = require('./../models/driverModel');
const factory = require('./handlerFactory');

exports.getAllDrivers = factory.getAll(Driver);
exports.getDriver = factory.getOne(Driver, { path: 'comments' });
exports.createDriver = factory.createOne(Driver);