const mongoose = require('mongoose')
const constant = require('../utils/constants')

const paymentSchema = new mongoose.Schema({
    bookingId : {
        type : [mongoose.SchemaTypes.ObjectId],
        default : [],
        ref : "booking"
    },
    totalAmount : {
        type : Number,
        required: true
    },
    paymentStatus : {
        type : String,
        required : true,
        default : constant.paymentStatus.failed,
        enum : [constant.paymentStatus.failed, constant.paymentStatus.success]

    },
    createdAt : {
        type : Date,
        immutable : true,
        default : () =>{
            return Date.now()
        }
    },
    updatedAt : {
        type : Date,
        default : () =>{
            return Date.now()
        }
    }
}, {versionKey : false})

module.exports = mongoose.model('payment', paymentSchema)