const PostModelGet = require("../../model/functions/getFunctions");
const PostArraysModelGet = require("../../../postArrays/model/functions/getFunctions");

const find = async (req, res) => {
  try {
    let { postKind, skip, limit } = req.query;
    const myId = req.jwtData._id;
    const myPostArrays = await PostArraysModelGet.findPostArraysByCreatedBy(myId);

    let arrPostsId = [];
    if (postKind === "PhotoPost") {
      arrPostsId = myPostArrays[0].arrTagMePhoto;
    } else if (postKind === "VideoPost") {
      arrPostsId = myPostArrays[0].arrTagMeVideo;
    } else if (postKind === "TextPost") {
      arrPostsId = myPostArrays[0].arrTagMeTextPost;
    }

    const myPostTagArr = await PostModelGet.findPosts(arrPostsId, skip, limit);

    res.json({ myPostTagArr: myPostTagArr });
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
};

module.exports = {
  find,
};
