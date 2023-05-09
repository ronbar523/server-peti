const UserModelEdit = require("../../model/functions/editFunctions");
const UserModelGet = require("../../model/functions/getFunctions");
const UserValidation = require("../../validation/userValidation");
const PostModelEdit = require("../../../post/model/functions/editFunctions");
const CommentModelEdit = require("../../../comment/model/functions/editFunctions");

const changeUserName = async (req, res) => {
  try {
    const id = req.jwtData._id;

    const requestBody = await UserValidation.editUserNameSchema.validateAsync(
      req.body,
      { abortEarly: false }
    );

    const userNameExist = await UserModelGet.findUserByUserName(
      requestBody.userName
    );

    if (userNameExist.length === 0) {
      await UserModelEdit.editUserName(id, requestBody);
      await PostModelEdit.editUserName(id, requestBody.userName);
      await CommentModelEdit.editUserName(id, requestBody.userName);

      res.json({
        status: 200,
        msg: `The user name changed`,
        requestBody: requestBody,
      });
    } else if (userNameExist[0]._id.toString() === req.jwtData._id) {
      await UserModelEdit.editUserName(id, requestBody);
      await PostModelEdit.editUserName(id, requestBody.userName);
      await CommentModelEdit.editUserName(id, requestBody.userName);

      res.json({
        status: 200,
        msg: `The user name changed`,
        requestBody: requestBody,
      });
    } else {
      throw "User Name exist";
    }
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
};

module.exports = {
  changeUserName,
};
