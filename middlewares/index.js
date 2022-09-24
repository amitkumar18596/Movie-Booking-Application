const validateUser = require('./verifySignUp')
const authjwt = require('./auth.jwt')
const validateMovieRequestBody = require('./validateMovieRequestBody')

module.exports = {
    validateUser,
    authjwt,
    validateMovieRequestBody
}