const httpStatus = require("../helpers/httpStatus");
let jwt = require('../helpers/generateToken')
let bcryptjs = require('bcryptjs');
const UserRepository = require("../repository/user.repository");

class Auth {
    static async login(req,res){
        res.status(httpStatus.OK).json({
            msg : 'login'
        })
    }

    static async processLogin(req, res){
        let { email, password} = req.body
        let user ;

        try {
            user = await UserRepository.findUser({email})
        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                msg: error
            })
        }

        if(!user){
            return res.status(httpStatus.BAD_REQUEST).json({
                msg : 'User not found'
            })
        }
        if (!bcryptjs.compareSync(password, user.password)) {
            return res.status(httpStatus.BAD_REQUEST).json({
                msg : 'Credentials incorrect'
            })
        }

        let token = jwt.tokenSign(user)

        return res.status(httpStatus.OK).json({
            msg : 'Successful login',
            token : token,
            user
        })
    }

    static async register (req, res){
        let {name, password, email} = req.body;
        let user = {
            name, 
            password : bcryptjs.hashSync(password, 10),
            email : email.trim(),
        }
        try {
            user = await UserRepository.createUser(user)
        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                msg: error
            })
        }

        if (!user) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                msg: 'Something went wrong, the server was unable to complete your request'
            })
        }

        let token = jwt.tokenSign(user);
        res.status(httpStatus.CREATED).json({
            msg : 'User succesfelly created',
            token,
            user
        })
    }
}


module.exports = Auth