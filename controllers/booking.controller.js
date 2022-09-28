const Booking = require('../models/booking.model')
const User = require('../models/user.model')
const constant = require('../utils/constants')

// Create a new Booking
exports.createBooking = async(req, res) =>{
    const user = await User.findOne({userId : req.userId})

    const bookingObj = {
        userId : user._id,
        movieId : req.body.movieId,
        theatreId : req.body.theatreId,
        noOfSeats : req.body.noOfSeats,
        totalCost : req.body.noOfSeats * constant.ticketPrice,
        bookingTime : req.body.bookingTime
    }

    try{
        const createdBooking = await Booking.create(bookingObj)
        res.status(201).send(createdBooking)

        user.myBookings.push(createdBooking._id)
        await user.save()
    }catch(err){
        console.log("Error while creating a new Booking ", err.message);
        res.status(500).send({
            message : "Internal server error"
        })
    }
}

// Get all bookings
exports.getAllBookings = async(req, res) =>{
    const user = await User.findOne({userId : req.userId}) 
    
    const queryObj = {}

    //to be clarified what does this line of code is doing
    if(user.userType != constant.userType.admin){
        queryObj._id = user._id
    }
    

    const bookings = await Booking.find(queryObj)
    
    res.status(200).send(bookings)
    
}