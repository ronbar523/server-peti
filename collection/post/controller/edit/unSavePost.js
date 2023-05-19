const PostModelEdit = require("../../model/functions/editFunctions");
const PostModelGet = require("../../model/functions/getFunctions");
const PostArraysModelEdit = require("../../../postArrays/model/functions/editFunctions");

const unSavePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const myId = req.jwtData._id;

    const post = await PostModelGet.findPostById(postId);

    if (post !== null) {
      const postKind = post.postKind;

      await PostModelEdit.unSavePost(postId, myId);
      await PostArraysModelEdit.unSavePhotoPost(myId, postKind, postId);
      res.json({ msg: "Post Remvoe from you save list" });
    } else {
      res.status(410).json({ msg: "Post deleted" });
    }
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
};

module.exports = {
  unSavePost,
};
