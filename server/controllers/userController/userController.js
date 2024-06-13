const { comparePassword, hashPassword } = require('../../helpers/bcrypt/bcrypt')
const { signToken } = require('../../helpers/jwt/jwt')
const { User } = require('../../models')

class UserController {
  static async getUser(req, res, next) {
    try {
      const user = await User.findAll();
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async postRegister(req, res, next) {
    try {
      let { username, email, password, phoneNumber, address } = req.body;
      let user = await User.create({
        username,
        email,
        password,
        phoneNumber,
        address,
      });

      res
        .status(201)
        .json({ message: `User ${user.username} successfully created`, user });
    } catch (error) {
      next(error);
    }
  }

  static async postLogin(req, res, next) {
    try {
      let { email, password } = req.body;

      if (!email) {
        throw { name: "EmailEmpty" };
      }

      if (!password) {
        throw { name: "PasswordEmpty" };
      }

      let user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user || !comparePassword(password, user.password))
        throw { name: "InvalidLogin" };

      res.status(200).json({
        access_token: signToken({ id: user.id }),
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
