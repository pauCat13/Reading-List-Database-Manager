const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const contractSchema = mongoose.Schema({
    date : {
        type: String,
        required: [true]
    },
    tenants : {
        type: [mongoose.Types.ObjectId],
        required: [true],
        validate: [arrayLimit, '{PATH} exceeds the limit of 3']
    }, 
    landlord : {
        type: mongoose.Types.ObjectId,
        required: [true]
    }, 
    fee : {
        type: Number,
        required: [true]
    },
    contractLength : {
        type: String,
        required: [true],
        enum: {
            values: ['Month', 'Year', 'Permanent'],
            message: '{VALUE} is not supported'
        }
    },
    propertyType : {
        type: String,
        required: [true]
    },
    addressID : {
        type: mongoose.Types.ObjectId,
        required : [true]
    }
});

function arrayLimit(val) {
    return val.length <= 3;
}

const contract = mongoose.model('contracts', contractSchema);

module.exports = contract;