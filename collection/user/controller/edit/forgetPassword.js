const UserModelEdit = require("../../model/functions/editFunctions");
const UserModelGet = require("../../model/functions/getFunctions");
const NodemailerJS = require("../../../../config/nodeMailer");
const logger = require("../../../../config/winston");
const RandomNumber = require("../../../../util/randomNumber");
const URL = process.env.SERVER_APP_REACT_URL;

function sendMailFunction(to, passowrdSecureNumber) {
  return {
    from: process.env.AUTH_EMAIL,
    to: to,
    subject: "Reset your password",
    html: htmlMail(to, passowrdSecureNumber),
  };
}

function htmlMail(to, passowrdSecureNumber) {
  return `<img src="https://i.imagesup.co/images2/81619ce5c68af9670497153fb7cfe384f29bbf18.png">
  <br /><br />
  <a href='${URL}/new_password/?email=${to}&passowrdSecureNumber=${passowrdSecureNumber}'> Reset password </a>`;
}

const sendRecoveryMail = async (req, res) => {
  try {
    let { email } = req.body;

    const user = await UserModelGet.findUserByEmail(email);

    if (user.length > 0) {
      if (!user[0].block) {
        const passowrdSecureNumber = RandomNumber(100_000, 999_999);

        // 30 * 60 * 1000 = 1_800_800 = 30 mins
        const expDate = new Date(Date.now() + 1_800_800);

        await UserModelEdit.editRecoveryParams(email, passowrdSecureNumber, expDate);
        let options = sendMailFunction(email, passowrdSecureNumber);
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
        res.json({
          status: 200,
          msg: "We send you a email with link for reset your password",
        });
      } else {
        throw "You account it's blocked";
      }
    } else {
      throw "The email doesn't exist";
    }
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
};

module.exports = { sendRecoveryMail };
