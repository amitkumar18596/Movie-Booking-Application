const mongoose = require('mongoose')
const constant = require('../utils/constants')

const movieSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    casts : {
        type : [String],
        required : true
    },
    trailerURL : {
        type : [String], // can have multiple trailer so array
        required : true
    },
    posterURL : {
        type : [String],
        required : true
    },
    language : {
        type : String,
        required : true
    },
    releaseDate : {
        type : Date
    },
    releaseStatus : {
        type : String,
        required : true,
        enum : [constant.releaseStatus.released, constant.releaseStatus.coming_soon, constant.releaseStatus.blocked]
    },
    imdbRating : {
        type : Number
    },
    genre : {
        type : [String],
        enum : [
            constant.genre.comedy, 
            constant.genre.romcom, 
            constant.genre.drama, 
            constant.genre.scifi,
            constant.genre.offbeat
        ]
        
    }
}, {timestamps : true, versionKey : false})

module.exports = mongoose.model("movie", movieSchema)