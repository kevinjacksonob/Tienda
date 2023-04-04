const { Product, User } = require('../models');
const { Op } = require("sequelize");

class ProductService {
    
    static async getProducts() {
        try {
            const products = await Product.findAll({
                include: [{
                    model: User,
                    required: true,
                    attributes: ["username"]
                }],
                attributes: {
                    exclude: ["createdAt", "updatedAt", "userId"],
                },
                where: { 
                    availableQty:{
                        [Op.gt]: 0
                    }
                }
            });
            return products
        } catch ( error ) {
            throw error;
        }
    }
    static async create( data ) {
        try {
            const product = await Product.create(data);
            return product;
        } catch ( error ) {
            throw error;
        }
    }
    static async update( id, data ) {
        try {
            const product = await Product.update(data, {
                where: { id },
            });
            return product;
        } catch ( error ) {
            throw error;
        }
    }
}

module.exports = ProductService;