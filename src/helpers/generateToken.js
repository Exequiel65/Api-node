const jwt = require('jsonwebtoken')
require('dotenv').config()
class generateToken{

    // genera el token y con los datos del usuario
    static tokenSign(user){
        return jwt.sign(
            {
                _id:user._id,
                email : user.email,
                admin: user.admin
            },
            process.env.JWT_SECRET,
            {
            expiresIn:"1h"
            }
        )
    }
    // verifica que sean los mismos codigos del token
    static async verifyToken(token){
        try{
            return jwt.verify(token,process.env.JWT_SECRET)
        } catch(e){
            return null
        }
    
    }

    static async  getBearer(bearer) {
        const accessToken = (bearer !== undefined ? bearer : '').replace('Bearer ', '');
      
        const data = this.verifyToken(accessToken);
      
        return data
      }

}


module.exports=generateToken