const PostModelEdit = require("../../model/functions/editFunctions");
const PostArraysModelEdit = require("../../../postArrays/model/functions/editFunctions");

const removeTag = async (req, res) => {
  try {
    const myId = req.jwtData._id;
    const { postId } = req.params;
    const { postKind } = req.query

    await PostModelEdit.removeTag(postId, myId);
    await PostArraysModelEdit.removeTag(myId, postKind, postId);

    res.json({ msg: "You remove your tag" });
  } catch (err) {
    console.log(err)
    res.status(400).json({ status: 400, err: err });
  }
};

module.exports = {
  removeTag,
};
