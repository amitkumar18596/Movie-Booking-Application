/**
 * Create routes for following APIs
 * 
 * POST : /mba/api/v1/movies
 * GET : /mba/api/v1/movies
 * GET : /mba/api/v1/movies/:id
 * PUT : /mba/api/v1/movies/:id
 * DELETE : /mba/api/v1/movies
 */
const movieController = require('../controllers/movie.controller')

module.exports = (app) =>{
    //POST : /mba/api/v1/movies
    app.post('/mba/api/v1/movies', movieController.createMovie)

    //GET : /mba/api/v1/movies
    app.get('/mba/api/v1/movies', movieController.findAllMovies)

    //GET : /mba/api/v1/movies/:id
    app.get('/mba/api/v1/movies/:id', movieController.findSingleMovie)

    //PUT : /mba/api/v1/movies/:id
    app.put('/mba/api/v1/movies/:id', movieController.update)

    //DELETE : /mba/api/v1/movies
    app.delete('/mba/api/v1/movies/:id', movieController.deleteMovie)
}