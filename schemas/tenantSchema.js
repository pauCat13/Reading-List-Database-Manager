const mongoose = require('mongoose');
const tenantSchema = mongoose.Schema({
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
    addressID : {
        type: mongoose.Types.ObjectId,
        required : [true]
    }
});

const tenant = mongoose.model('tenants', tenantSchema);

module.exports = tenant;