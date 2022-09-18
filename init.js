/**
 * Initialize the DB with few seed movie data
 */
const Movie = require('./models/movie.model')
const Theatre = require('./models/theatre.model')
const constant = require('./utils/constants')
 
module.exports = async ()=>{
    try{
        await  Movie.collection.drop()
        await Theatre.collection.drop()
    // create some movie seed data
    const movies = []
    movies[0] = await Movie.create({
        name : "Kick",
        description : "One man Army",
        casts : ["Salman", "Jacqline","Mithun"],
        trailerURL : ["xyz.com"],
        posterURL : ["abc.com"],
        language : "Hindi",
        releaseStatus : constant.releaseStatus.coming_soon
    })

    movies[1] = await Movie.create({
        name : "Bramahsta",
        description : "Part 1",
        casts : ["Ranbir Kapoor", "Alia Bhatt","Mouni Roy"],
        trailerURL : ["trailerBrahmastra.com"],
        posterURL : ["posterBrahmastra.com"],
        language : "Hindi",
        releaseStatus : constant.releaseStatus.released
    })

    movies[2] = await Movie.create({
        name : "Stree",
        description : "Wo Stree Kal Anna",
        casts : ["Raj Kumar Rao", "Shradha Kapoor","Pankaj Tripathi"],
        trailerURL : ["trailerStree.com"],
        posterURL : ["posterStree.com"],
        language : "Hindi",
        releaseStatus : constant.releaseStatus.blocked
    })

    console.log(`Movies created 1. ${movies[0].name} 2. ${movies[1].name} 3. ${movies[2].name}`);

    // crreate some theatre seed data
    const theatres = []
    theatres[0]= await Theatre.create({
        name : "INOX",
        description : "INOX CUTTACK",
        city : "CUTTACK",
        pincode : 754201,
        showTypes : [constant.showTypes.noon, constant.showTypes.morning],
        numberOfSeats : 200
    })

    theatres[1]= await Theatre.create({
        name : "PVR",
        description : "PVR CUTTACK",
        city : "CUTTACK",
        pincode : 754233,
        showTypes : [constant.showTypes.morning, constant.showTypes.noon, constant.showTypes.evening, constant.showTypes.night],
        numberOfSeats : 300
    })

    theatres[2]= await Theatre.create({
        name : "Jayashree",
        description : "Jayashree CUTTACK",
        city : "CUTTACK",
        pincode : 754203,
        showTypes : [constant.showTypes.morning, constant.showTypes.noon, constant.showTypes.evening, constant.showTypes.night],
        numberOfSeats : 100
    })

    console.log(`Theatres created 1. ${theatres[0].name} 2. ${theatres[1].name} 3. ${theatres[1].name}`);

    }
    
    catch(err){
        console.log("Error while db connection ", err.message);
    }
}