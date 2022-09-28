/**
 * This file will contain model for Booking of movie
 */
const mongoose = require('mongoose')
const constant = require('../utils/constants')


const bookingSchema = new mongoose.Schema({
    theatreId : {
        type : [mongoose.SchemaTypes.ObjectId],
        default : [],
        ref : "theatre"
    },
    movieId : {
        type : [mongoose.SchemaTypes.ObjectId],
        default : [],
        ref : "movie"
    },
    userId : {
        type : [mongoose.SchemaTypes.ObjectId],
        default : [],
        ref : "user"
    },
    totalCost : {
        type : Number,
        required : true
    },
    bookingTime : {
        type : Date,
        immutable : true,
        default : () =>{
            return Date.now()
        }
    },
    noOfSeats : {
        type : Number,
        required : true
    },
    bookingStatus : {
        type : String,
        default : constant.bookingStatus.inprogress,
        enum : [
            constant.bookingStatus.inprogress,
            constant.bookingStatus.booked,
            constant.bookingStatus.failed,
            constant.bookingStatus.cancelled
        ]
    }
}, {timestamps : true, versionKey : false})

module.exports = mongoose.model('booking', bookingSchema)