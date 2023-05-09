const UserModelEdit = require("../../model/functions/editFunctions");
const UserValidation = require("../../validation/userValidation");

const changeBio = async (req, res) => {
  try {
    const id = req.jwtData._id;

    const requestBody = await UserValidation.editBioSchema.validateAsync(
      req.body,
      { abortEarly: false }
    );

    await UserModelEdit.editBio(id, requestBody);

    res.json({
      status: 200,
      msg: `The bio changed`,
      requestBody: requestBody,
    });
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
};

module.exports = {
  changeBio,
};
