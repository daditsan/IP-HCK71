const { where } = require("sequelize");
const {
  comparePassword,
  hashPassword,
} = require("../../helpers/bcrypt/bcrypt");
const { signToken } = require("../../helpers/jwt/jwt");
const { User } = require("../../models");

class UserController {
  static async getUser(req, res, next) {
    try {
      const user = await User.findAll();
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async getUserById(req, res, next) {
    try {
      let { id } = req.user;

      // console.log(req.user);
      // console.log(id);

      const userById = await User.findByPk(id);
      if (!userById) throw { name: "NotFound" };

      res.status(200).json({
        username: userById.username,
        email: userById.email,
      });
    } catch (error) {
      next(error);
    }
  }

  static async postRegister(req, res, next) {
    try {
      let { username, email, password } = req.body;
      let user = await User.create({
        username,
        email,
        password,
      });

      res.status(201).json({ message: `${user.username} successfully created`, user });
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
        message: "Login successful!",
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateUserById(req, res, next) {
    try {
      let { id } = req.user;
      const findUserById = await User.findByPk(id)
      
      let { username, email} = req.body;

      await findUserById.update(
        {
          username,
          email,
        },
      );

      res.status(200).json({ message: "Update success!"});
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async deleteUserById(req, res, next) {
    try {
      let { id } = req.user;
      let findUserById = await User.findByPk(id);
  
      await findUserById.destroy();

      res.status(200).json({ message: `${findUserById.username} account deleted.` });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = UserController;
