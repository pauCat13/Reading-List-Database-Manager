const mongoose = require('mongoose');

const landlordSchema = mongoose.Schema({
    title : {
        type: String,
        required: [true]
    },
    fname : {
        type: String,
        required: [true]
    },
    lname : {
        type: String,
        required: [true]
    }, 
    mobile : {
        type: Number,
        required: [true]
    }, 
    email : {
        type: String,
        required: [true],
        unique: [true]
    },
    dob : {
        type: String,
        required: [true]
    },
    permit : {
        type: String,
        required: [true],
        enum: {
            values: ['Y', 'N'],
            message: '{VALUE} is not supported'
        }
    },
    emailContact : {
        type: String,
        required: [true],
        enum: {
            values: ['Y', 'N'],
            message: '{VALUE} is not supported'
        }
    },
    addressID : {
        type: mongoose.Types.ObjectId,
        required : [true]
    }
});

const landlord = mongoose.model('landlords', landlordSchema);

module.exports = landlord;