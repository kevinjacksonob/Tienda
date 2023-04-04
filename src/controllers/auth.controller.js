const UserService = require("../services/users.service");
const AuthService = require("../services/auth.service");
const bcrypt = require("bcrypt");

const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserService.getUserByEmail(email);
    // verifico si existe un usuario
    if (!user) {
      return next({
        status: 400,
        message: "Invalid email",
        errorName: "User not found",
      });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return next({
        status: 400,
        message: "The password doesn't match with email user",
        errorName: "Invalid password",
      });
    }

    const { id, name, lastname, username } = user;
    // TODO genera un token y enviarlo al usuario
    const token = AuthService.genToken({ id, username });
    res.json({
      id,
      username,
      email,
      token,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};


module.exports = {
  userLogin
};