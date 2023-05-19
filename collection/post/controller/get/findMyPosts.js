const PostModelGet = require("../../model/functions/getFunctions");
const PostArraysModelGet = require("../../../postArrays/model/functions/getFunctions");

const find = async (req, res) => {
  try {
    let { postKind, skip, limit } = req.query;
    const myId = req.jwtData._id;
    const myPostArrays = await PostArraysModelGet.findPostArraysByCreatedBy(myId);

    let arrPostsId = [];
    const arr = []
    if (postKind === "PhotoPost") {
      arrPostsId = myPostArrays[0].arrMyPhoto;
    } else if (postKind === "VideoPost") {
      arrPostsId = myPostArrays[0].arrMyVideo;
    } else if (postKind === "TextPost") {
      arrPostsId = myPostArrays[0].arrMyTextPost;
    }
    


    const myPostsArr = await PostModelGet.findPosts(arrPostsId, skip, limit);
    
    res.json({ myPostsArr: myPostsArr });
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
};

module.exports = {
  find,
};
