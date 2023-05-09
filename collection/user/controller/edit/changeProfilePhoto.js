const UserModelEdit = require("../../model/functions/editFunctions");
const PostModelEdit = require("../../../post/model/functions/editFunctions");
const CommentModelEdit = require("../../../comment/model/functions/editFunctions");

const changePhoto = async (req, res) => {
  try {
    // const url = req.protocol + "://" + req.get("host");

    // const email = req.jwtData.email;

    // const photo = url + "/public/" + req.file.filename;

    const { photo } = req.body;

    const id = req.jwtData._id;

    await UserModelEdit.editUserProfilePhoto(id, photo);
    await PostModelEdit.editUserPhoto(id, photo);
    await CommentModelEdit.editUserPhoto(id, photo);

    res.json({ status: 200, msg: `The photo changed` });
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
};

module.exports = {
  changePhoto,
};
