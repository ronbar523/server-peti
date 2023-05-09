const UserModelEdit = require("../../model/functions/editFunctions");
const UserModelGet = require("../../model/functions/getFunctions");

const NodemailerJS = require("../../../../config/nodeMailer");
const Bcryptjs = require("../../../../config/bcrypt");
const UserValidation = require("../../validation/userValidation");
const logger = require("../../../../config/winston");
const Jwt = require("../../../../config/jwt");

const reset = async (req, res) => {
  function sendMailFunction(to) {
    return {
      from: process.env.AUTH_EMAIL,
      to: to,
      subject: "Your password is changed",
      html: htmlMail(),
    };
  }

  function htmlMail() {
    return `<img src="https://i.imagesup.co/images2/81619ce5c68af9670497153fb7cfe384f29bbf18.png">
    <br /><br /><h1> Your password has been successfully changed </h1>`;
  }

  try {
    let { email, passowrdSecureNumber } = req.query;
    const user = await UserModelGet.findUserByEmail(email);

    if (user.length > 0) {
      if (user[0].passowrdSecureNumber === passowrdSecureNumber) {
        const nowDT = new Date();

        if (nowDT.getTime() <= user[0].dateSecureNumber.getTime()) {
          const { password } =
            await UserValidation.editPasswordSchema.validateAsync(req.body);

          const hashPassword = await Bcryptjs.createHash(password);
          await UserModelEdit.resetPassword(email, hashPassword);
          let options = sendMailFunction(email);
          NodemailerJS.transporter.sendMail(options, (err, info) => {
            if (err) {
              res.statusCode = 500;
              logger.fatal(err.message);

              res.json({ error: err.message });
            } else {
              res.statusCode = 200;
              res.json(info);
            }
          });

          const token = await Jwt.createToken({
            _id: user[0]._id,
          });

          res.json({ msg: "password updated", token: token });
        } else {
          throw "The link it's expired";
        }
      } else {
        throw "The random number it's wrong";
      }
    } else {
      throw "The user it's not exist";
    }
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
};

module.exports = {
  reset,
};
