const User = require('../database/models/user')

class UserRepository{
    static async findUser(option){
        let user;
        try {
            user = await User.findOne(option)
        } catch (error) {
            console.log(error)
            return null            
        }
        return user
    }

    /**
     * 
     * @param option is object {key.object.search : value.search}
     * @returns 
     */
    static async existUser(option){
        let user;
        try {
            user = await this.findUser(option)
        } catch (error) {
            console.log(error)
            return null
        }

        if (user) {
            return true
        }
        return false
    }

    static async createUser(data){
        let user = new User({
            ...data
        })

        try {
            await user.save()
        } catch (error) {
            console.log(error)
            return null
        }

        return data
    }
}


module.exports = UserRepository