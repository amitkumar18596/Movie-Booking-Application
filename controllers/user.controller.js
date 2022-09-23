/**
 * This controller file is for user resource
 */
const User = require('../models/user.model')
const objectConverter = require('../utils/objectConverter')

//Get the list of all the users
exports.findAllUsers = async(req, res)=>{
    const queryObj = {}
    //Reading the optional query params

    const userTypeQP = req.query.userType
    const userStatusQP = req.query.userStatus

    if(userTypeQP){
        queryObj.userType = userTypeQP
    }

    if (userStatusQP) {
        queryObj.userStatus = userStatusQP
    }

    try{
        const users = await User.find(queryObj)
        res.status(200).send(objectConverter.userResponse(users))

    }catch(err){
        console.log("Error while fetching all the users ", err.message);
        res.status(500).send({
            message : "Internal server Error"
        })
    }
}

exports.findUserById = async(req, res) =>{
    try{
        const user = await User.find({userId : req.params.id})

        res.status(200).send(objectConverter.userResponse(user))
    }catch(err){
        console.log("Error while fetching its user details by id ", err.message);
        res.status(500).send({
            message : "Internal server error"
        })
    }
}

// Update user attributes
exports.update = async(req, res)=>{
    try{
        const user = await User.findOne({userId : req.params.id})

        user.userStatus = req.body.userStatus ? req.body.userStatus : user.userStatus
        user.name = req.body.name ? req.body.name : user.name
        user.userType = req.body.userType ? req.body.userType : user.userType

        const updatedUser = await user.save()

        res.status(200).send({
            name : updatedUser.name,
            userid : updatedUser.userId,
            email : updatedUser.email,
            userType : updatedUser.userType,
            userStatus : updatedUser.userStatus,
            // createdAt: updatedUser.createdAt,
            updatedAt: updatedUser.updatedAt
        })
    }catch(err){
        console.log("Error while user attributes ", err.message);
        res.status(500).send({
            message : "Internal server error"
        })
    }
}