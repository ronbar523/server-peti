const UserModelGet = require("../../model/functions/getFunctions");
const NodemailerJS = require("../../../../config/nodeMailer");
const logger = require("../../../../config/winston");

function sendMailFunction(to, verifySecureNumber) {
  return {
    from: process.env.AUTH_EMAIL,
    to: to,
    subject: "Confirmation your account",
    html: htmlMail(to, verifySecureNumber),
  };
}

function htmlMail(to, verifySecureNumber) {
  return `
  <img src="https://i.imagesup.co/images2/81619ce5c68af9670497153fb7cfe384f29bbf18.png">
  <br /><br />
  <a href='http://localhost:3000/verify/?email=${to}&verifySecureNumber=${verifySecureNumber} '> Please Click Here For Confirm Your Account </a>`;
}

const resend = async (req, res) => {
  try {
    const user = await UserModelGet.findUserById(req.jwtData._id);

    if (!user.verify) {
      if (!user.block) {
        
        let options = sendMailFunction(user.email, user.verifySecureNumber );
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
          msg: "We send you mail with verify link",
        });
      } else {
        throw "You account it's blocked";
      }
    } else {
      res.status(203).json({ msg: "You user already verified"})
    }
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
};

module.exports = {
  resend,
};
