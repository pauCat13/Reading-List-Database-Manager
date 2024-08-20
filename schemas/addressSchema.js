const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({
        addressLine1 : {
            type : String,
            require: [true, 'Please enter your Address Line 1'],
        },
        addressLine2 : {
            type : String,
            require: [false],
        },
        town : {
            type : String,
            require: [true, 'Please enter your town'],
        },
        county : {
            type : String,
            require: [true, 'Please enter your city/county'],
        },
        eircode : {
            type : String,
            require: [false],
        }
});

const address = mongoose.model('addresses', addressSchema);

module.exports = address;