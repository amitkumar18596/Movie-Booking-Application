const paymentController = require('../controllers/payment.controller')

module.exports = (app) =>{
    app.post('/mba/api/v1/payments', paymentController.createPayment)
}