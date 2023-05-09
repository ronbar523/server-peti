const UserModelPost = require("../../model/functions/postFunctions");
const UserModelGet = require("../../model/functions/getFunctions");
const UserValidation = require("../../validation/userValidation");
const FollowModelPost = require("../../../follow/model/functions/postFunctions");
const BlockModelPost = require("../../../block/model/functions/postFunctions");
const PostArrayModelPost = require("../../../postArrays/model/functions/postFunctions");
const CommentArrayModelPost = require("../../../commentArrays/model/functions/postFunctions");

const Bcryptjs = require("../../../../config/bcrypt");
const NodemailerJS = require("../../../../config/nodeMailer");
const logger = require("../../../../config/winston");
const RandomNumber = require("../../../../util/randomNumber");

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
  
  <a href='http://localhost:3000/verify/?email=${to}&verifySecureNumber=${verifySecureNumber}'> Please Click Here For Confirm Your Account </a>`;
}

const createUser = async (req, res) => {
  try {
    const requestBody = await UserValidation.registerSchema.validateAsync(
      req.body,
      { abortEarly: false }
    );

    requestBody.password = await Bcryptjs.createHash(requestBody.password);

    const userNameExist = await UserModelGet.findUserByUserName(
      requestBody.userName
    );

    if (userNameExist.length === 0) {
      const emailExist = await UserModelGet.findUserByEmail(requestBody.email);

      if (emailExist.length === 0) {
        const verifySecureNumber = RandomNumber(100_000, 999_999);

        let { email } = req.body;
        let options = sendMailFunction(email, verifySecureNumber);
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

        const user = await UserModelPost.createUser(
          requestBody.firstName,
          requestBody.lastName,
          requestBody.fullName,
          requestBody.userName,
          requestBody.bio,
          requestBody.phone,
          requestBody.dateOfBirth,
          requestBody.gender,
          requestBody.email,
          requestBody.photo,
          requestBody.password,
          verifySecureNumber
        );

        await FollowModelPost.createFollow(user._id),
          await BlockModelPost.createBlock(user._id);
        await PostArrayModelPost.createPostArrays(user._id);
        await CommentArrayModelPost.createCommentArrays(user._id);

        res.json({
          status: 201,
          msg: "You've successfully registered",
          response: user,
        });
      } else {
        throw "Email exist";
      }
    } else {
      throw "User Name exist";
    }
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
};

module.exports = {
  createUser,
};
