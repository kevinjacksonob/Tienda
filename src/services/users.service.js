const { User } = require('../models');

class UserService {
    static async create( data ) {
        try {
            const user = await User.create(data);
            return user;  
        } catch ( error ) {
            throw error;
        }
    }
    static async getUserByEmail( email ) {
        try {
            const user = await User.findOne({
                where: { email },
            });
            return user
        } catch ( error ) {
            throw error;
        }
    }
    static async getUserById( id ) {
        try {
            const user = await User.findOne({
                where: { id },
            });
            return user
        } catch ( error ) {
            throw error;
        }
    }
    static async update( id, data ) {
        try {
            const user = await User.update(data, {
                where: { id },
            });
            return user;
        } catch ( error ) {
            throw error;
        }
    }
    static async getUsers() {
        try {
            const users = await User.findAll({
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                }
            });
            return users;
        } catch ( error ) {
            throw error;
        }
    }
}

module.exports = UserService;