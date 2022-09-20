/**
 * This file will contain logic for new user regidtration and login
 *  A customer can sign up and login
 *  A theatre owner can sign up and login once theatre owner status is approved by admin
 *  An admin will be created from backend
 */
const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const constant = require('../utils/constants')
const jwt = require('jsonwebtoken')
const authConfig = require('../configs/auth.config')

exports.signup = async (req, res) => {
    try {
        //by default user status of all usertype will be APPROVED other than theatreowner, only admin can do
        if (req.body.userType == constant.userType.theatreOwner)
            req.body.userStatus = constant.userStatus.pending

        // 
        const userCreated = await User.create({
            name: req.body.name,
            userId: req.body.userId,
            email: req.body.email,
            userType: req.body.userType,
            password: bcrypt.hashSync(req.body.password, 8), // password to be encrypted
            userStatus: req.body.userStatus
        })

        const response = {
            name: userCreated.name,
            userId: userCreated.userId,
            email: userCreated.email,
            userType: userCreated.userType,
            userStatus: userCreated.userStatus,
            createdAt: userCreated.createdAt,
            updatedAt: userCreated.updatedAt
        }

        res.status(201).send(response)
    } catch (err) {
        console.log("Error while new user creation ", err.message);
        res.status(500).send({
            message: "Internal server error"
        })
    }
}

exports.signin = async (req, res) => {
    try {
        // if userid passed is correct
        const user = await User.findOne({ userId: req.body.userId })
        if (user == null) {
            return res.status(400).send({
                message: 'UserID passed doesnot exist'
            })
        }

        // password passed is correct
        const passwordIsValid = await bcrypt.compareSync(req.body.password, user.password)
        if (!passwordIsValid) {
            return res.status(401).send({
                message: 'Wrong Password'
            })
        }

        /**
        * check if user is in pending state, then don't login
        */
        if (user.userStatus == constant.userStatus.pending) {
            return res.status(400).send({
                message: 'Failed : Not yet approved from the admin. Get the status approved by admin to login'
            })
        }

        // create JWT token
        const token = jwt.sign({ id : user.userId }, authConfig.secret, { expiresIn : 600 })

        // return the response
        res.status(200).send({
            name: user.name,
            userId: user.userId,
            email: user.email,
            userType: user.userType,
            userStatus: user.userStatus,
            accessToken: token
        })

    } catch (err) {
        console.log("Error while user signin ", err.message);
        res.status(500).send({
            message: "Internal server error"
        })
    }
}