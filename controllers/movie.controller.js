/**
 * This file should have controller methods to perform crud operation 
 * of movie resorce
 */

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

    console.log(`New movie created : ${movieCreated.name}`);

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
        console.log("Some error happened while new movie creation", err.message);
        res.status(501).send({
            message : "Internal server error"
        })
    }
}

/**
 * Get all movies
 */
exports.findAllMovies = async(req,res)=>{
    
    try{
        const movies = await Movie.find()
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
exports.findSingleMovie = async(req, res)=>{
    try{
        const movie = await Movie.findOne({_id : req.params.id})
        if (!movie){
            return res.status(404).send({
                message : "The movie is not found"
            })
            
        }else {
            return res.status(200).send(movie)
        }

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
        const movie = await Movie.findOne({_id : req.params.id})

        movie.name = req.body.name ? req.body.name : movie.name
        movie.description = req.body.description ? req.body.description : movie.description
        movie.casts = req.body.casts ? req.body.casts : movie.casts
        movie.trailerURL = req.body.trailerURL ? req.body.trailerURL : movie.trailerURL
        movie.language = req.body.language ? req.body.language : movie.language
        movie.releaseDate = req.body.releaseDate ? req.body.releaseDate : movie.releaseDate
        movie.releaseStatus = req.body.releaseStatus ? req.body.releaseStatus : movie.releaseStatus
        movie.imdbRating = req.body.imdbRating ? req.body.imdbRating : movie.imdbRating
        movie.genre = req.body.genre ? req.body.genre : movie.genre

        const updatedMovie = await movie.save()
        res.status(200).send(updatedMovie)
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
        const movie = await Movie.findOne({_id : req.params.id})
        
        await movie.remove()
        console.log(`${movie.name} is deleted`);
        res.status(200).send("Movie is deleted")
    }catch(err){
        console.log("Error while deleting movie ", err.message);
        res.status(500).send({
            message : "Internal server error"
        })
    }
}