const UserService = require('../services/users.service');
const CartService = require('../services/cart.service');
const transporter = require("../utils/mailer");

const createUser = async (req, res, next) => {
    try {
        const body = req.body;
        const user = await UserService.create(body);
        if( !user ) {
            next("error");
        } 
        const car = await CartService.create({userId: user.id});
        await transporter.sendMail({
            from: "<Kevinjacksonob9@gmail.com>",
            to: user.email,
            subject: "Welcome!!!",
            text: `Hello ${user.username}`,
            html: `<h1>Hello ${user.username}</h1>
                   <h4>You have successfully registered in our virtual store</h4>`,
        });
        res.status(201).json(user);
    } catch ( error ) {
        next(error);
    }
}

const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { username, avatar } = req.body;
        const user = await UserService.update(id, { username, avatar });
        res.status(200).json(user);
    } catch ( error ) {
        next(error);
    }
}

const getUsers = async (req, res, next) => {
    try {
        const users = await UserService.getUsers();
        res.status(200).json(users);
    } catch ( error ) {
        next(error);
    }
}

module.exports = {
    createUser,
    updateUser,
    getUsers
}