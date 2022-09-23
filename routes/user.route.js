const userController  = require('../controllers/user.controller')
const {authjwt} = require('../middlewares')

module.exports = (app) =>{
    app.get('/mba/api/v1/users', [authjwt.verifyToken, authjwt.isAdmin], userController.findAllUsers)
}