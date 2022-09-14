/**
 * This file will crrate the logic for CRUD operation for theatre
 */
const { findOne } = require('../models/movie.model')
const Theatre = require('../models/theatre.model')

/**
 * Create new theatres
 */
exports.createTheatres = async(req, res)=>{
    // create the theatre object
    const theatreObj = {
        name : req.body.name,
        description : req.body.description,
        city : req.body.city,
        pincode : req.body.pincode,
        showTypes : req.body.showTypes,
        numberOfSeats : req.body.numberOfSeats
    }

    try{
        const theatreCreated = await Theatre.create(theatreObj)

        res.status(201).send(theatreCreated)
        console.log(`New Theatre created : ${theatreCreated.name}`);
    }catch(err){
        console.log("Error while creating new Theatre ", err.message);
        res.status(500).send({
            message : "Internal server error"
        })
    }
}

/**
 * Find a theatre 
 */
exports.findOneTheatre = async(req,res)=>{
    try{
        const theatre = await Theatre.findOne({_id : req.params.id})

        if(theatre){
            return res.status(302).send(theatre)
        }else{
            return res.status(404).send({
                message : "Theatre is not found"
            })
        }
    }catch(err){
        console.log("Error while finding theatre details ", err.message);
        res.status(500).send({
            message : " Internal server Error"
        })
    }
}

/**
 * Update a theatre
 */
exports.updateOneTheatre = async(req, res)=>{
    try{
        const theatre = await Theatre.findOne({_id : req.params.id})

        theatre.name = req.body.name ? req.body.name : theatre.name
        theatre.description = req.body.description ? req.body.description : theatre.description
        theatre.city = req.body.city ? req.body.city : theatre.city
        theatre.pincode = req.body.pincode ? req.body.pincode : theatre.pincode
        theatre.showTypes = req.body.showTypes ? req.body.showTypes : theatre.showTypes
        theatre.numberOfSeats = req.body.numberOfSeats ? req.body.numberOfSeats : theatre.numberOfSeats

        const updatedTheatre = await theatre.save()
        res.status(200).send(updatedTheatre)
    }catch(err){
        console.log("Error while updating theatre details ", err.message);
        res.status(500).send({
            message : " Internal server error"
        })
    }
}

/**
 * Find all theatres
 */
exports.findAllTheatres = async(req, res) =>{
    try{
        const theatres = await Theatre.find()
        res.status(200).send(theatres)
    }catch(err){
        console.log("Error while fetching all theatres ", err.message);
        res.status(500).send({
            message : "Internal server error"
        })
    }
}

/**
 * Delete One theatre
 */
exports.deleteOneTheatre = async(req, res)=>{
    try{
        const theatre = await Theatre.findOne({_id : req.params.id})

        await theatre.remove()
        
        
        res.status(200).send("Theatre is deleted")
        
    }catch(err){
        console.log("Error while delting theatre ", err.message);
        res.status(500).send({
            message : "Internal server error"
        })
    }
}