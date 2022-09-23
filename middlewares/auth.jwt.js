const jwt = require('jsonwebtoken')
const authConfig = require('../configs/auth.config')
const User = require('../models/user.model')
const constant = require('../utils/constants')

const verifyToken = (req, res, next) =>{
    // Read the token from header
    const token = req.headers["x-access-token"]

    //Check the token is present or not
    if(!token){
        return res.status(403).send({
            message : "No token provided. Access Prohibited"
        })
    }

    //validate the token 
    jwt.verify(token, authConfig.secret, (err, decoded)=>{
        if(err){
            return res.status(401).send({
                message : "Unauthorized"
            })
        }
        req.userId = decoded.id //extracted the userid from token and store it req.userId
                                //when JWT validation successful,encrypted jwt token converted to intial payrol 
        next()
    })
}

//check if the loggedin user is admin or not
const isAdmin = async(req, res, next)=>{
    const user = await User.findOne({userId : req.userId})

    if(user && user.userType == constant.userType.admin){
        next()
    }else {
        res.status(403).send({
            message : "Admin is only authorized to do this action"
        })
    }
}

module.exports = {
    verifyToken : verifyToken,
    isAdmin : isAdmin
}