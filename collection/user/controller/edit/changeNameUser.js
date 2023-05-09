const UserModelEdit = require("../../model/functions/editFunctions");
const UserValidation = require("../../validation/userValidation");
const PostModelEdit = require("../../../post/model/functions/editFunctions");
const CommentModelEdit = require("../../../comment/model/functions/editFunctions");

const changeName = async (req, res) => {
  try {
    const id = req.jwtData._id;

    const requestBody = await UserValidation.editNameSchema.validateAsync(
      req.body,
      { abortEarly: false }
    );

    await UserModelEdit.editNameUser(id, requestBody);
    await PostModelEdit.editFullName(id, requestBody.fullName);
    await CommentModelEdit.editUserFullName(id, requestBody.fullName);

    res.json({
      status: 200,
      msg: `The name changed`,
      requestBody: requestBody,
    });
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
};

module.exports = {
  changeName,
};
