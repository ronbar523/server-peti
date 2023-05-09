const UserModelEdit = require("../../model/functions/editFunctions");
const UserModelGet = require("../../model/functions/getFunctions");
const UserValidation = require("../../validation/userValidation");
const NodemailerJS = require("../../../../config/nodeMailer");
const Bcryptjs = require("../../../../config/bcrypt");
const logger = require("../../../../config/winston");

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
  <br /><br />
  <h1> Your password has been successfully changed </h1>`;
}

const changePassword = async (req, res) => {
  try {
    const id = req.jwtData._id;

    const { password } = await UserValidation.editPasswordSchema.validateAsync(
      req.body
    );

    const user = await UserModelGet.findUserById(id);

    await Bcryptjs.createHash(password).then((hashedPass) => {
      UserModelEdit.editPassword(id, hashedPass)

        .then((updateRes) => {
          let options = sendMailFunction(user.email);
          NodemailerJS.transporter.sendMail(options, (err, info) => {
            if (err) {
              res.statusCode = 500;
              logger.fatal(err.message);
              res.json({ error: err.message });
            } else {
              res.statusCode = 200;
              res.json({ msg: "Password changed" });
            }
          });
        })
        .catch((e) => {
          res.statusCode = 500;
          logger.fatal(err.message);
          res.json({ msg: "Error" });
        });
    });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

module.exports = {
  changePassword,
};
