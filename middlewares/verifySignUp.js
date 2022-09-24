/**
 * This file will contanin the logic for verifying signup
 */
const User = require('../models/user.model')
const constant = require('../utils/constants')

const validateSignUpRquestBody = async (req, res, next) => {
    //Check if user name is provided or not
    if (!req.body.name) {
        return res.status(400).send({
            message: "User name is not provided"
        })
    }

    // Check if userid is provided or not
    if (!req.body.userId) {
        return res.status(400).send({
            message: "UserId is not provided"
        })
    }

    //Check the userId is not a duplicate one
    try {
        const user = await User.findOne({ userId: req.body.userId })
        if (user) {
            return res.status(400).send({
                message: "UserId is already taken. Try a new One!"
            })
        }
    }catch(err){
        return res.status(500).send({
            message : 'Internal server error while validating the request'
        })
    }

    /**
     * Check the password present is valid or not
     * Alphabet, numeric, special character atleast one
     */
    // Chck password is provided or not
    if(!req.body.password){
        return res.status(400).send({
            message : "Password is not provided"
        })
    }

    //Check password is valid or not
    if(!isValidPassword(req.body.password)){
        return res.status(400).send({
            message : "Password is not of valid format"
        })
    }

    //Check email is provided or not
    if(!req.body.email){
        return res.status(400).send({
            message : "Email is not provided"
        })
    }

    //check email provided is valid or not
    if(!isValidEmail(req.body.email)){
        return res.status(400).send({
            message : "Email is not of valid format"
        })
    }

    // Check email is unique or not
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).send({
                message: "This email is already registered. Try a new One!"
            })
        }
    }catch(err){
        return res.status(500).send({
            message : 'Internal server error while validating the request'
        })
    }

    // validate if the usertype is present and valid
    if(!req.body.userType){
        return res.status(400).send({
            message : 'userType is not provided'
        })
    }

    //Admin users should be created from backend
    if (req.body.userType == constant.userType.admin){
        return res.status(400).send({
            message : 'Admin can not be passed'
        })
    }

    //Check correct user type is provided or not
    const userType = [constant.userType.theatreOwner, constant.userType.customer]
    if(!userType.includes(req.body.userType)){
        return res.status(400).send({
            message : 'Usertype provided is not correct. Possible correct values are : Customer, Theatre Owner'
        })
    }

    next() // 

}

const isValidEmail = (email)=>{
    return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
}

const isValidPassword = (password)=>{
    return password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{10,25}$/)
}

// Login a user
const validateSignInRequestBody = (req, res, next)=>{
    //Check if user id is provided or not
    if(!req.body.userId){
        res.status(400).send({
            message : "User ID is not provided"
        })
    }

    // Check if password is provided or not
    if(!req.body.password){
        res.status(400).send({
            message : "Password is not provided"
        })
    }

    next()
}


const validateUser = {
    validateSignUpRquestBody : validateSignUpRquestBody,
    validateSignInRequestBody : validateSignInRequestBody
}

module.exports = validateUser

