const bookingController = require('../controllers/booking.controller')
const {authjwt, validateUser} = require('../middlewares')

module.exports = (app) =>{
    app.post('/mba/api/v1/bookings',[authjwt.verifyToken], bookingController.createBooking)

    app.get('/mba/api/v1/bookings', [authjwt.verifyToken], bookingController.getAllBookings)
}