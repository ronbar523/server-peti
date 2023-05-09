const PostModelGet = require("../../model/functions/getFunctions");
const PostArraysModelGet = require("../../../postArrays/model/functions/getFunctions");

const find = async (req, res) => {
  try {
    const { id } = req.params;
    let = { postKind, skip, limit } = req.query;

    const myPostArrays = await PostArraysModelGet.findPostArraysById(id);

    let arrPostsId = [];
    if (postKind === "PhotoPost") {
      arrPostsId = myPostArrays.arrMyPhoto;
    } else if (postKind === "VideoPost") {
      arrPostsId = myPostArrays.arrMyVideo;
    } else if (postKind === "TextPost") {
      arrPostsId = myPostArrays.arrMyTextPost;
    }

    const userPostsArr = await PostModelGet.findPosts(arrPostsId, skip, limit);

    res.json({ userPostsArr: userPostsArr });
  } catch  {
    res.status(400).json({ status: 400, err: err });
  }
};

module.exports = {
  find,
};
