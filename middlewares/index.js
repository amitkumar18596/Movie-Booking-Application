const validateUser = require('./verifySignUp')
const authjwt = require('./auth.jwt')
const validateMovieRequestBody = require('./validateMovieRequestBody')
const validateTheatreRequestBody = require('./validateTheatreRequestBody')

module.exports = {
    validateUser,
    authjwt,
    validateMovieRequestBody,
    validateTheatreRequestBody
}