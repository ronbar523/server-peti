const Jwt = require("../config/jwt");
const UserModelGet = require("../collection/user/model/functions/getFunctions");

module.exports = async (req, res, next) => {
  try {
    
    req.jwtData = await Jwt.verifyToken(req.headers.token);

    const user = await UserModelGet.findUserById(req.jwtData._id);

    if (user[0].verify || user[0].isAdmin) {
      next();
    } else {
      throw "Your user it's not verify";
    }
  } catch (err) {
    res.status(401).json({ status: 401, msg: "you must verify your user" });
  }
};
