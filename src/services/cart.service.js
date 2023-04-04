const { Cart, ProductInCart, Product } = require('../models');
const { Op } = require("sequelize");

class CartService {
    static async create(data) {
        try {
            const cart = await Cart.create(data);
            return cart;
        } catch( error ) {
            throw error;
        }
    }
    static async getCartByUserId( userId ) {
        try {
            const cart = await Cart.findOne({
                include: [{
                    model: ProductInCart,
                    required: true,
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "carId", "productId"],
                    },
                    where: {
                        status: {
                            [Op.not]: 'purchased'
                        }
                    },
                    include: [{
                        model: Product,
                        attributes: {
                            exclude: ["createdAt", "updatedAt", "userId", "productImage"],
                        }
                    }]
                }],
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
                where: { userId }
            });
            return cart;
        } catch (error) {
            throw error;
        }
    }
    static async getCartById( id ) {
        try {
            const cart = await Cart.findOne({
                include: [{
                    model: ProductInCart,
                    required: true,
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "carId", "productId"],
                    },
                    where: {
                        status: {
                            [Op.not]: 'purchased'
                        }
                    },
                    include: [{
                        model: Product,
                        attributes: {
                            exclude: ["createdAt", "updatedAt", "userId", "productImage"],
                        }
                    }]
                }],
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
                where: { id }
            });
            return cart;
        } catch (error) {
            throw error;
        }
    }
    static async update(id, data) {
        try {
            const cart = Cart.update(data, {
                where: { id }
            });
            return cart;
        } catch (error) {
            throw error;
        }
    }
    static async buy( id ) {
        try {
            const cart = await Cart.update({status: 'purchased'}, {
                where: { id }
            });
            return cart;
        } catch(error) {
            throw error; 
        }
    }
} 

module.exports = CartService;