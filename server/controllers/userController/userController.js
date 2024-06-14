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

  static async postRegister(req, res, next) {
    try {
      let { username, email, password } = req.body;
      let user = await User.create({
        username,
        email,
        password,
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

  static async updateUserById(req, res, next) {
    try {
      let { id } = req.params;
      let { username, email, password } = req.body;
      password = hashPassword(password);
      let user = await User.findByPk(id);

      if (!user) {
        throw { name: "NotFound" };
      }

      await user.update(
        {
          username,
          email,
          password,
        },
        {
          where: { id },
        }
      );

      res.status(200).json({ message: "Update success", user });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async deleteUserById(req, res, next) {
    try {
      let { id } = req.params;
      let findId = await User.findByPk(id);
      console.log(findId);
      let deleteUserById = await User.destroy({
        where: { id },
      });

      if (!deleteUserById) {
        throw { name: "NotFound" };
      }

      res.status(200).json({ message: `${findId.username} deleted.` });
    } catch (error) {
        console.log(error);
      next(error);
    }
  }

  
}

module.exports = UserController;
