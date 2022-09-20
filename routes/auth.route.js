const authController = require('../controllers/auth.controller')

module.exports = (app) =>{
    // Routr for sign up
    app.post('/mba/api/v1/auth/signup', authController.signup)

    // Route for sign in
    app.post('/mba/api/v1/auth/signin', authController.signin)
}