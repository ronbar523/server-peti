const PostModelGet = require("../../model/functions/getFunctions");
const PostArraysModelGet = require("../../../postArrays/model/functions/getFunctions");

const find = async (req, res) => {
  try {
    let { postKind, skip, limit } = req.query;
    const myId = req.jwtData._id;
    const myPostArrays = await PostArraysModelGet.findPostArraysByCreatedBy(myId);

    let arrPostsId = [];
    if (postKind === "PhotoPost") {
      arrPostsId = myPostArrays[0].arrMySavePhoto;
    } else if (postKind === "VideoPost") {
      arrPostsId = myPostArrays[0].arrMySaveVideo;
    } else if (postKind === "TextPost") {
      arrPostsId = myPostArrays[0].arrMySaveTextPost;
    }

    const myPostSaveArr = await PostModelGet.findPosts(arrPostsId, skip, limit);

    res.json({ myPostSaveArr: myPostSaveArr });
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
};

module.exports = {
  find,
};
