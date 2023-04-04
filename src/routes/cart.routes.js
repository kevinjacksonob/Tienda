const { Router } = require('express');
const { addProductToCart, getCartByUserId, buyProductsInCart } = require('../controllers/cart.controller');

const router = Router();

router
    .post('/carts/add-products', addProductToCart )
    .get('/user/:id/carts', getCartByUserId )
    .post('/carts/buy-products', buyProductsInCart ); 

module.exports = router;