const jwt = require('jsonwebtoken')
const authConfig = require('../configs/auth.config')
const User = require('../models/user.model')
const constant = require('../utils/constants')

const verifyToken = (req, res, next) => {
    // Read the token from header
    const token = req.headers["x-access-token"]

    //Check the token is present or not
    if (!token) {
        return res.status(403).send({
            message: "No token provided. Access Prohibited"
        })
    }

    //validate the token 
    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized"
            })
        }
        req.userId = decoded.id //extracted the userid from token and store it req.userId
        //when JWT validation successful,encrypted jwt token converted to intial payrol 
        next()
    })
}

//check if the loggedin user is admin or not
const isAdmin = async (req, res, next) => {
    const user = await User.findOne({ userId: req.userId })

    if (user && user.userType == constant.userType.admin) {
        next()
    } else {
        res.status(403).send({
            message: "Admin is only authorized to do this action"
        })
    }
}

// Check userId provided is valid or not user id will be provided in re param
const isValidUserIdInRequestParam = async (req, res, next) => {
    try {
        const user = await User.findOne({ userId: req.params.id })

        if (user) {
            next()
        } else {
            res.status(400).send({
                message: "UserID provided is not valid"
            })
        }
    } catch (err) {
        console.log("Error while validating the user id ", err.message);
        res.status(500).send({
            messsage: "Internal server error"
        })
    }
}

// Check user id provided is user itself or admin or not
const isAdminOrUserItself = async (req, res, next) => {
    try {
        const user = await User.findOne({ userId: req.userId })

        if (user.userType == constant.userType.admin || user.userId == req.params.id) {
            next()
        } else {
            res.status(403).send({
                message: 'Only the owner or admin will be able to perform this action'
            })
        }
    }catch(err){
        console.log('Error while reading the user info', err.message)
        return res.status(500).send({
            message : 'Internal error while reading the user data'
        })
    }
}

module.exports = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isValidUserIdInRequestParam : isValidUserIdInRequestParam,
    isAdminOrUserItself : isAdminOrUserItself
}