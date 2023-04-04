const { Router } = require('express');
const { createProduct, getProducts, updateProduct } = require('../controllers/products.controller');

const router = Router();

router
    .get('/products', getProducts )
    .post('/products', createProduct )
    .put('/products/:id', updateProduct);

module.exports = router;