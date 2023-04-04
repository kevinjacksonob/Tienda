const { ProductInOrder } = require('../models');

class ProductInOrderService {

    static async addProduct( data ) {
        try {
            const productInOrder = await ProductInOrder.create(data);
            return productInOrder; 
        } catch( error ) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = ProductInOrderService;