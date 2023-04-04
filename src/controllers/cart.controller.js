const CartService = require("../services/cart.service");
const OrderService = require("../services/order.service"); 
const ProductInCartService = require("../services/productInCart.service");
const ProductInOrderService = require("../services/productInOrder.service");
const UserService = require('../services/users.service');
const { Cart, sequelize } = require('../models');
const transporter = require("../utils/mailer");

const createCart = async (req, res, next) => {
    try {
        const data = req.body;
        const cart = await CartService.create(data);
        res.status(201).json(cart); 
    } catch ( error ) {
        next(error);
    }
}

const getCartByUserId = async(req, res, next) => {
    try {
        const { id } = req.params;
        const cart = await CartService.getCartByUserId(id);
        res.status(201).json(cart); 
    } catch ( error ) {
        next(error);
    }
}

const addProductToCart = async(req, res, next) => {
    try {
        const { cartId, productId, quantity, price } = req.body;
        await ProductInCartService.addProduct({cartId, productId, quantity, price});
        
        const totalPrice = quantity * price;
;
        const cart = await Cart.increment({totalPrice}, {where: { id: cartId } });
        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
} 

const buyProductsInCart = async(req, res, next) => {
    try {
        const { cartId, userId } = req.body;
        const result = await sequelize.transaction(async (t) => {
            const cart = await CartService.getCartById( cartId );

            await CartService.buy(cartId);
            for await(const product of cart.ProductInCarts) {
                await ProductInCartService.buyProduct(product.id);
            }

            const order = await OrderService.create({totalPrice: cart.totalPrice, userId: cart.userId});
            for await(const product of cart.ProductInCarts) {
                await ProductInOrderService.addProduct({orderId: order.id, productId: product.Product.id, quantity: product.quantity, price: product.price});
            }
            await Cart.increment({totalPrice: cart.totalPrice}, {where: { id: cartId } });
        });
        const user = await UserService.getUserById(userId);
        await transporter.sendMail({
            from: "<Kevinjacksonob9@gmail.com>",
            to: user.email,
            subject: "Excellent!!!",
            text: `Hello ${user.username}`,
            html: `<h1>Hello ${user.username}</h1>
                   <h4>you have made a successful purchase</h4>`,
        });
        res.send('Compra exitosa');
    } catch (error) {
        throw error;
    }
} 

module.exports = {
    createCart,
    getCartByUserId,
    addProductToCart,
    buyProductsInCart 
}