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

//Updatebooking by Id
exports.updateBookingById = async(req, res) =>{
    const booking = await Booking.findOne({_id : req.params.id})

    if(!booking){
        return res.status(400).send("Booking id is not found")
    }

    booking.theatreId = req.body.theatreId != undefined ? req.body.theatreId : booking.theatreId
    booking.movieId = req.body.movieId != undefined ? req.body.movieId : booking.movieId
    booking.userId = req.body.userId != undefined ? req.body.userId : booking.userId
    booking.noOfSeats = req.body.noOfSeats != undefined ? req.body.noOfSeats : booking.noOfSeats
    booking.totalCost = booking.noOfSeats * constant.ticketPrice
    booking.bookingStatus =  req.body.bookingStatus != undefined ? req.body.bookingStatus : booking.status

    try{
        const updatedBooking = await booking.save()
        res.status(200).send(updatedBooking)

    }catch(err){
        console.log("Error while updating the booking ", err.message);
        res.status(500).send({
            message : " Internal server error"
        })
    }

}