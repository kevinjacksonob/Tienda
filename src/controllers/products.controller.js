const ProductService = require('../services/products.service');

const createProduct = async (req, res, next) => {
    try {
        const data = req.body;
        const product = await ProductService.create(data);
        res.status(201).json(product); 
    } catch ( error ) {
        next(error);
    }
}

const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const product = await ProductService.update(id, { description });
        res.status(200).json(product); 
    } catch ( error ) {
        next(error);
    }
}

const getProducts = async (req, res, next) => {
    try {
        const products = await ProductService.getProducts();
        res.status(200).json(products); 
    } catch ( error ) {
        next(error);
    }
}

module.exports = {
    createProduct,
    updateProduct,
    getProducts  
}