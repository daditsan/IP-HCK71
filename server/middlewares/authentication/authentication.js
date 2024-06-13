const { signToken, verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    let tokenAccess = req.headers.authorization;
    if (!tokenAccess) throw { name: "InvalidToken" };

    const [bearer, token] = tokenAccess.split(" ");
    if (bearer !== "Bearer") throw { name: "InvalidToken" };

    const payload = verifyToken(token);
    const user = await User.findByPk(payload.id);

    if (!user) throw { name: "InvalidToken" };
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
