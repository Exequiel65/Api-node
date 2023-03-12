const httpStatus = require("../helpers/httpStatus")
const UserRepository = require("../repository/user.repository")

class AuthMiddleware {
    static async searchEmailUser(req, res, next) {
        let { email } = req.body
        try {
            let existUser = await UserRepository.existUser({ email })
            if (existUser) {
                return res.status(httpStatus.BAD_REQUEST).json({
                    msg: 'email already registered'
                })
            }
        } catch (error) {
            console.log(error)
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                msg: 'Something went wrong, the server was unable to complete your request'
            })
        }

        next()
    }
}

module.exports = AuthMiddleware