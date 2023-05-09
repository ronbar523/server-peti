const PostModelEdit = require("../../model/functions/editFunctions");
const PostArraysModelEdit = require("../../../postArrays/model/functions/editFunctions");

const removeTag = async (req, res) => {
  try {


    const myId = req.jwtData._id;
    const { postId } = req.params;

    await PostModelEdit.removeTag(postId, myId)
    await PostArraysModelEdit.remoevTag(myId, postId)
    

    res.json({msg: "You remove your tag"})
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
};

module.exports = {
  removeTag,
};
