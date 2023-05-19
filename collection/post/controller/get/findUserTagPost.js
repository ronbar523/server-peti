const PostModelGet = require("../../model/functions/getFunctions");
const PostArraysModelGet = require("../../../postArrays/model/functions/getFunctions");

const find = async (req, res) => {
  try {
    let { postKind, skip, limit } = req.query;
    const { id } = req.params
    const userPostArrays = await PostArraysModelGet.findPostArraysById(id);

    let arrPostsId = [];
    if (postKind === "PhotoPost") {
      arrPostsId = userPostArrays.arrTagMePhoto;
    } else if (postKind === "VideoPost") {
      arrPostsId = userPostArrays.arrTagMeVideo;
    } else if (postKind === "TextPost") {
      arrPostsId = userPostArrays.arrTagMeTextPost;
    }

    const userPostTagArr = await PostModelGet.findPosts(arrPostsId, skip, limit);

    res.json({ userPostTagArr: userPostTagArr });
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
};

module.exports = {
  find,
};
