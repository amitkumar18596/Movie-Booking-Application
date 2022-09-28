const Payment = require('../models/payment.model')
const Booking = require('../models/booking.model')
const constant = require('../utils/constants')

//Create Payment
exports.createPayment = async (req, res) => {
    const booking = await Booking.findOne({ _id: req.body.bookingId })

    var bookingTime = booking.createdAt
    var currentTime = Date.now()

    var minutes = Math.floor(((currentTime - bookingTime) / 1000) / 60)

    if (minutes > 2) {
        return res.status(200).send({
            message: "Can't do the payment as the booking is delayed and expired"
        })
    }

    var paymentObj = {
        bookingId: req.body.bookingId,
        totalAmount: req.body.totalAmount,
        paymentStatus: constant.paymentStatus.success
    }

    try {
        const paymentCreated = await Payment.create(paymentObj)

        booking.bookingStatus = constant.bookingStatus.booked
        await booking.save()

        res.status(201).send(paymentCreated)

        
    }catch(err){
        console.log("Error while Payment ", err.message);
        res.status(500).send({
            message : "Internal server error"
        })
    }
}

//Get all payment details
exports.getAllPayments = (req, res) => {
    const queryObj = {}

    if(user.userType != constant.userType.admin){
        queryObj._id = user._id
    }

}

//Get payment on Id
exports.getPaymentOnId = (req, res) => {

}

