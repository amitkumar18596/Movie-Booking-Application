/**
 * This file will have logic for validation of theatre request body
 */
const Theatre = require('../models/theatre.model')
const newTheatreValidation = async(req, res, next)=>{
    try{
        //Check if Theatre name is provided or not
        if (!req.body.name) {
            return res.status(400).send({
                message: "Theatre name is not provided"
            })
        }

        //Check if Theatre description is provided or not
        if (!req.body.description) {
            return res.status(400).send({
                message: "Theatre description is not provided"
            })
        }

        //Check if city information is provided or not
        if (!req.body.city) {
            return res.status(400).send({
                message: "city information is not provided"
            })
        }

        //Check if area pincode is provided or not
        if (!req.body.pincode) {
            return res.status(400).send({
                message: "Area pincode is not provided"
            })
        }

        // Check if same theatre is present at same location
        const theatre = await Theatre.findOne({name : req.body.name, pincode : req.body.pincode})

        if(theatre != null){
            return res.status(400).send({
                message: "same theatre is already present in this pincode"
            })
        }

        //Check if show types in theatre is provided or not
        if (!req.body.showTypes) {
            return res.status(400).send({
                message: "show types in theatre is not provided"
            })
        }

        //Check if number of seats info is provided or not
        if (!req.body.numberOfSeats) {
            return res.status(400).send({
                message: "number of seats in theatre is not provided"
            })
        }

        next()
    }catch(err){
        console.log("Error while Theatre validation ", err.message);
        res.status(500).send({
            message : "Internal server Error"
        })
    }
}

const validateTheatreRequestBody = {
    newTheatreValidation : newTheatreValidation
}

module.exports = validateTheatreRequestBody