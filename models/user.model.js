const mongoose = require('mongoose')
const constant = require('../utils/constants')

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    userId : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    email :{
        type : String,
        required : true,
        lowercase : true,
        minLength : 10,
        unique : true
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
    },
    userType : {
        type : String,
        required : true,
        default : constant.userType.customer,
        enum : [constant.userType.customer, constant.userType.admin, constant.userType.theatreOwner]
        // eum is used when a variable has fixed amount of values
    },
    userStatus : {
        type : String,
        required : true,
        default : constant.userStatus.approved,
        enum : [constant.userStatus.approved, constant.userStatus.pending, constant.userStatus.rejected]
    },
    myBookings : {
        type : [mongoose.SchemaTypes.ObjectId],
        default : [],
        ref : "booking"
    },
    myPayments : {
        type : [mongoose.SchemaTypes.ObjectId],
        default : [],
        ref : "payment"
    }
}, { versionKey : false})

module.exports = mongoose.model('user', userSchema)