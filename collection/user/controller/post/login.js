const UserModelGet = require("../../model/functions/getFunctions");
const UserValidation = require("../../validation/userValidation");
const Bcryptjs = require("../../../../config/bcrypt");
const Jwt = require("../../../../config/jwt");

const connectUser = async (req, res) => {
  try {
    const requestBody = await UserValidation.loginSchema.validateAsync(
      req.body,
      { abortEarly: false }
    );

    const user = await UserModelGet.findUserByEmail(requestBody.email);

    // Check If Email Existing
    if (user.length != 0) {
      // Compare The Password
      const rightPassword = await Bcryptjs.compareHash(
        requestBody.password,
        user[0].password
      );

      if (rightPassword === true) {
        if (user[0].block === false) {
          const token = await Jwt.createToken({
            _id: user[0]._id,
          });

          res.json({
            status: 200,
            msg: `Welcome Back ${user[0].userName}`,
            token: token,
          });
        } else {
          throw "Your user is block";
        }
      } else {
        throw "Wrong password";
      }
    } else {
      throw "Email Not exist";
    }
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
};

module.exports = {
  connectUser,
};
