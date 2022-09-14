const mongoose = require('mongoose')
const constant = require ('../utils/constants')

const theatreSchema  = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    pincode : {
        type : Number,
        required : true
    },
    showTypes : {
        type : [String],
        required : true,
        enum : [
            constant.showTypes.morning, 
            constant.showTypes.noon, 
            constant.showTypes.evening,
            constant.showTypes.night
        ]
    },
    numberOfSeats : {
        type : Number,
        required : true
    }
}, {timestamps : true, versionKey : false})

module.exports = mongoose.model("theatre", theatreSchema)