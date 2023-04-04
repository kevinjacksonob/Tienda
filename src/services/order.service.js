const { Order, ProductInOrder, Product } = require('../models');

class OrderService {
    static async create(data) {
        try {
            const cart = await Order.create(data);
            return cart;
        } catch( error ) {
            throw error;
        }
    }
    static async getOrdersByUserId( userId ) {
        try {
            const orders = await Order.findAll({
                include: [{
                    model: ProductInOrder,
                    required: true,
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "orderId", "productId"],
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
            return orders;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = OrderService;