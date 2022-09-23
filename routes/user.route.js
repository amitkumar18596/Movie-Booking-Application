const userController  = require('../controllers/user.controller')
const {authjwt} = require('../middlewares')

module.exports = (app) =>{
    app.get('/mba/api/v1/users', [authjwt.verifyToken, authjwt.isAdmin], userController.findAllUsers)

    app.get('/mba/api/v1/users/:id', [authjwt.verifyToken, authjwt.isValidUserIdInRequestParam, authjwt.isAdminOrUserItself], userController.findUserById)

    app.put('/mba/api/v1/users/:id', [authjwt.verifyToken, authjwt.isValidUserIdInRequestParam, authjwt.isAdminOrUserItself], userController.update)

    //to be worked on
    app.put('/mba/api/v1/users/pwd/:id', [authjwt.verifyToken, authjwt.isValidUserIdInRequestParam], userController.updatePassword)
}