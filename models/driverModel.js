const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
    plateNumber: {
        type: String,
        required: [true, 'A driver needs a plate number'],
        unique: true,
        minLength: 2,
        maxLength: 10
    },
    country: {
        type: String,
        required: [true, 'A license plate needs to belong to a country'],
    },
    state: {
        type: String
    },
    createdAt: {
        type: Date, //Date is being used as a native JS type
        default: Date.now(),
        select: false //createdAt will always be excluded from client res
    }
},
{ //schema options object
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

//virtual populate driver with comments on res
driverSchema.virtual('comments', {
    ref: 'Comment',
    foreignField: 'driver',
    localField: '_id'
});

const Driver = mongoose.model('Driver', driverSchema);

module.exports = Driver;