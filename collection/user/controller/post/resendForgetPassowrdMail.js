const UserModelGet = require("../../model/functions/getFunctions");
const UserModelEdit = require("../../model/functions/editFunctions");
const NodemailerJS = require("../../../../config/nodeMailer");
const logger = require("../../../../config/winston");

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
  <br /><br /><a href='http://localhost:3000/new_password/?email=${to}&passowrdSecureNumber=${passowrdSecureNumber}'> Reset password </a>`;
}

const resend = async (req, res) => {
  try {
    let { email } = req.params;
    const user = await UserModelGet.findUserByEmail(email);

    if (user.length > 0) {
      if (!user[0].block) {
        const nowDT = new Date();
        if (user[0].dateSecureNumber !== null) {
          const passowrdSecureNumber = user[0].passowrdSecureNumber;
          if (nowDT.getTime() + 600_000 >= user[0].dateSecureNumber.getTime()) {
            const expDate = nowDT(Date.now() + 1_800_800);

            await UserModelEdit.editRecoveryParams(
              email,
              passowrdSecureNumber,
              expDate
            );
          }

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
          throw "Request not available";
        }
      } else {
        throw "You account it's blocked";
      }
    } else {
      throw "Request not available";
    }
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
};

module.exports = { resend };
