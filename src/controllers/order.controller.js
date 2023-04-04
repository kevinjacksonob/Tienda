const OrderService = require('../services/order.service');

const getOrdersByUserId = async(req, res, next) => {
    try {
        const { id } = req.params;
        const orders = await OrderService.getOrdersByUserId(id);
        res.status(201).json(orders);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getOrdersByUserId
}