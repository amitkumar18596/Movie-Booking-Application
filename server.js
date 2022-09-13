const express = require("express")
const app = express()
const serverConfig = require('./configs/server.config')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dbConfig = require('./configs/db.config')
const Movie = require('./models/movie.model')
const constant = require('./utils/constants')

//Register the body-parser mddleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))


/**
 * DB Connection
 */
mongoose.connect(dbConfig.DB_URL)
const db = mongoose.connection
db.on("error", ()=>{
    console.log("Error while connection to mongoDB");
})
db.once("open", ()=>{
    console.log("Successfully connected to mongoDB");
    init()
})

/**
 * Initialize the DB with few seed movie data
 */
async function init(){
    try{
        // check if any movie is present in DB or not
    let movie = await Movie.findOne({name : "Kick"})

    if(movie){
        console.log("At least one movie is present in database");
        return 
    }

    movie = await Movie.create({
        name : "Kick",
        description : "One man Army",
        casts : ["Salman", "Jacqline","Mithun"],
        trailerURL : ["xyz.com"],
        posterURL : ["abc.com"],
        language : "Hindi",
        releaseStatus : constant.releaseStatus.coming_soon
    })

    console.log(movie);
    }catch(err){
        console.log("Error while db connection ", err.message);
    }
}

/**
 * Plug in the routes
 */
require('./routes/movie.route')(app)

/**
 * start the server
 */
 app.listen(serverConfig.PORT, ()=>{
    console.log("App is running on port ", serverConfig.PORT);
})