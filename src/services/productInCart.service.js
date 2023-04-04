const { ProductInCart } = require('../models');

class ProductInCartService {

    static async addProduct( data ) {
        try {
            const productInCart = await ProductInCart.create(data);
            return productInCart; 
        } catch( error ) {
            throw error;
        }
    }
    static async buyProduct( productId ) {
        try {
            const productInCart = await ProductInCart.update({status: 'purchased'}, {
                where: { productId }
            });
            return productInCart;
        } catch ( error ) {
            throw error;
        }
    }
}

module.exports = ProductInCartService;