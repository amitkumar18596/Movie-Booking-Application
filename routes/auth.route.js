const authController = require('../controllers/auth.controller')
const {validateUser} = require('../middlewares')

module.exports = (app) =>{
    // Routr for sign up
    app.post('/mba/api/v1/auth/signup', [validateUser.validateSignUpRquestBody], authController.signup)

    // Route for sign in
    app.post('/mba/api/v1/auth/signin', [validateUser.validateSignInRequestBody], authController.signin)
}

