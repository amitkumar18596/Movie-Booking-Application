/**
 * This file should have controller methods to perform crud operation 
 * of movie resorce
 */
const { deleteOne } = require('../models/movie.model')
const Movie = require('../models/movie.model')

/**
 * Create movie entries
 */
exports.createMovie = async(req,res)=>{
    // create a movie object for inserting into mongoDB
    const movieObj = {
        name : req.body.name,
        description : req.body.description,
        casts : req.body.casts,
        trailerURL : req.body.trailerURL,
        posterURL : req.body.posterURL,
        language : req.body.language,
        releaseDate : req.body.releaseDate,
        releaseStatus : req.body.releaseStatus,
        imdbRating : req.body.imdbRating,
        genre : req.body.genre
    }

    try{
        //insert the data into mongoDB and return the response
    const movieCreated = await Movie.create(movieObj)

    // Return the response 
    const response = {
        name : movieCreated.name,
        description : movieCreated.description,
        casts : movieCreated.casts,
        trailerURL : movieCreated.trailerURL,
        posterURL : movieCreated.posterURL,
        language : movieCreated.language,
        releaseDate : movieCreated.releaseDate,
        releaseStatus : movieCreated.releaseStatus,
        imdbRating : movieCreated.imdbRating,
        genre : movieCreated.genre,
        createdAt : movieCreated.createdAt
    }
    res.status(201).send(response)
    }catch(err){
        console.log("Some error happened ", err.message);
        res.status(501).send({
            message : "Internal server error"
        })
    }
}

/**
 * Get all movies
 */
exports.findAllMovies = async(req,res)=>{
    const queryObj = {}

    try{
        const movies = await Movie.find(queryObj)
        res.status(200).send(movies)
    }catch(err){
        console.log("Error while fetching all the movies ", err.message);
        res.status(500).send({
            message : "Internal server error"
        })
    }
}

/**
 * Get the movie by Id
 */
exports.findMovieByName = async(req, res)=>{
    try{
        const movie = await Movie.find({name : req.params.id})

        return res.status(200).send(movie)
    }catch(err){
        console.log("Error while searching the movie ", err.message);
        res.status(500).send({
            message : "Internal server error"
        })
    }
}

/**
 * Update the movie
 */
exports.update = async(req, res)=>{
    try{
        const movie = await Movie.findOne({name : req.params.id})

        movie.releaseDate = req.body.releaseDate ? req.body.releaseDate : movie.releaseDate
        movie.releaseStatus = req.body.releaseStatus ? req.body.releaseStatus : movie.releaseStatus

        const updatedMovie = await movie.save()
        res.status(200).send({
            name : req.params.id,
            releaseDate : updatedMovie.releaseDate,
            releaseStatus : updatedMovie.releaseStatus
        })
    }catch(err){
        console.log("Error while updating movie ", err.message);
        res.status(500).send({
            message : "Internal server error"
        })
    }
}

/**
 * Delete the movie
 */
exports.deleteMovie = async (req, res)=>{
    try{
        const movie = await Movie.deleteOne({name : req.params.id})
        res.status(200).send("Movie is deleted")
        await movie.save()
    }catch(err){
        console.log("Error while deleting movie ", err.message);
        res.status(500).send({
            message : "Internal server error"
        })
    }
}