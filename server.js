const express = require("express")
const app = express()
const serverConfig = require('./configs/server.config')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dbConfig = require('./configs/db.config')
const init = require('./init')
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
 * Plug in the routes
 */
require('./routes/movie.route')(app)
require('./routes/theatre.route')(app)

/**
 * start the server
 */
 app.listen(serverConfig.PORT, ()=>{
    console.log("App is running on port ", serverConfig.PORT);
})