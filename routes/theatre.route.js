/**
 * POST /mba/api/v1/theaters
 * PUT /mba/api/v1/theaters/:id
 * GET /mba/api/v1/theaters/:id
 * GET /mba/api/v1/theaters
 * DELETE /mba/api/v1/theaters/:id
 */
const theatreController = require('../controllers/theatre.controller')
const {authjwt, validateTheatreRequestBody} = require('../middlewares')

module.exports = (app) =>{
    //POST /mba/api/v1/theaters
    app.post('/mba/api/v1/theaters', [authjwt.verifyToken,authjwt.isAdmin, validateTheatreRequestBody.newTheatreValidation], theatreController.createTheatres)

    //GET /mba/api/v1/theaters/:id
    app.get('/mba/api/v1/theaters/:id',[authjwt.verifyToken], theatreController.findOneTheatre)

    //PUT /mba/api/v1/theaters/:id
    app.put('/mba/api/v1/theaters/:id',[authjwt.verifyToken, authjwt.isAdmin, validateTheatreRequestBody.newTheatreValidation], theatreController.updateOneTheatre)

    //GET /mba/api/v1/theaters
    app.get('/mba/api/v1/theaters',[authjwt.verifyToken], theatreController.findAllTheatres)

    //DELETE /mba/api/v1/theaters/:id
    app.delete('/mba/api/v1/theaters/:id',[authjwt.verifyToken, authjwt.isAdmin, validateTheatreRequestBody.newTheatreValidation], theatreController.deleteOneTheatre)

    //PUT /mba/api/v1/theatres/:id/movies
    app.put('/mba/api/v1/theatres/:id/movies',[authjwt.verifyToken, authjwt.isAdmin, validateTheatreRequestBody.newTheatreValidation], theatreController.editMoviesInTheatre)

    //GET /mba/api/v1/theatres/:id/movies
    app.get('/mba/api/v1/theatres/:id/movies',[authjwt.verifyToken], theatreController.getMoviesInTheatre)
}

/**
 * I want to get the list of all the movies running in a theatre
 * 
 *      GET /mba/api/v1/theatres/:id/movies
 * 
 * Add/Remove a movie inside a theatre - Adding or removing multiple movies at a time
 *      PUT /mba/api/v1/theatres/:id/movies
 * 
 * 
 */
