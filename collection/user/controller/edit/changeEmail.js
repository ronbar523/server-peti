const UserModelEdit = require("../../model/functions/editFunctions");
const UserModelGet = require("../../model/functions/getFunctions");
const UserValidation = require("../../validation/userValidation");
const NodemailerJS = require("../../../../config/nodeMailer");
const logger = require("../../../../config/winston");
const RandomNumber = require("../../../../util/randomNumber");

function sendMailToNewEmail(to, verifySecureNumber) {
  return {
    from: process.env.AUTH_EMAIL,
    to: to,
    subject: "Confirmation your email",
    html: htmlMailForNewMail(to, verifySecureNumber),
  };
}

function htmlMailForNewMail(to, verifySecureNumber) {
  return `<img src="https://i.imagesup.co/images2/81619ce5c68af9670497153fb7cfe384f29bbf18.png">
  <br /><br />
  <a href='http://localhost:3000/verify/?email=${to}&verifySecureNumber=${verifySecureNumber}'> Please Click Here For Confirm Your Account </a>`;
}

function sendMailToLastEmail(to, newEmail) {
  return {
    from: process.env.AUTH_EMAIL,
    to: to,
    subject: "Confirmation your account",
    html: htmlMailForLastMail(newEmail),
  };
}

function htmlMailForLastMail(newEmail) {
  return `<img src="https://i.imagesup.co/images2/81619ce5c68af9670497153fb7cfe384f29bbf18.png">
  <br /><br />
  <h4> Your Email has been successfully changed To ${newEmail}, 
    If you didn't make the change, please contact us </h4>`;
}

const changeEmail = async (req, res) => {
  try {
    const id = req.jwtData._id;

    const requestBody = await UserValidation.editEmailSchema.validateAsync(
      req.body,
      { abortEarly: false }
    );

    const ifEmailExist = await UserModelGet.findUserByEmail(requestBody.email);

    if (ifEmailExist.length === 0) {
      const user = await UserModelGet.findUserById(id);

      if (requestBody.email !== user.email) {
        const verifySecureNumber = RandomNumber(100_000, 999_999);

        let options = sendMailToNewEmail(requestBody.email, verifySecureNumber);
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

        let options2 = sendMailToLastEmail(user.email, requestBody.email);
        NodemailerJS.transporter.sendMail(options2, (err, info) => {
          if (err) {
            res.statusCode = 500;
            logger.fatal(err.message);
            res.json({ error: err.message });
          } else {
            res.statusCode = 200;
            res.json(info);
          }
        });

        await UserModelEdit.editEmail(id, requestBody, verifySecureNumber);

        res.json({
          status: 200,
          msg: `The email changed`,
          requestBody: requestBody,
        });
      } else {
        throw "You fill the same email";
      }
    } else {
      throw "Email exist";
    }
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
};

module.exports = {
  changeEmail,
};
