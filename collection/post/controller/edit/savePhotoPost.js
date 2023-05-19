const PostModelEdit = require("../../model/functions/editFunctions");
const PostModelGet = require("../../model/functions/getFunctions");
const PostArraysModelGet = require("../../../postArrays/model/functions/getFunctions");
const PostArraysModelEdit = require("../../../postArrays/model/functions/editFunctions");

const savePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const myId = req.jwtData._id;

    const post = await PostModelGet.findPostById(postId);

    if (post !== null) {
      const arrSavePost = post.arrSaves;
      const postKind = post.postKind
      const myPostArrays = await PostArraysModelGet.findPostArraysByCreatedBy(
        myId
      );
      const myPostArraysSavePhotoPost = myPostArrays[0].arrMySavePhoto;

      let flag = false;

      if (arrSavePost.length > 0 && myPostArraysSavePhotoPost.length > 0) {
        if (arrSavePost.length >= myPostArraysSavePhotoPost.length) {
          for (let x = 0; x < arrSavePost.length; x++) {
            if (arrSavePost[x].toString() === myId) {
              flag = true;
              break;
            }
          }
        } else {
          for (let x = 0; x < myPostArraysSavePhotoPost.length; x++) {
            if (myPostArraysSavePhotoPost[x].toString() === postId) {
              flag = true;
              break;
            }
          }
        }
      }

      if(!flag){
        await PostModelEdit.savePost(postId, myId)
        await PostArraysModelEdit.savePhotoPost(myId, postKind, postId)
        res.json({ msg: "You save the post" });
      } else {
        res.status(203).json({ msg: "You already save the post" });
      }
    } else {
      res.status(410).json({ msg: "Post deleted" });
    }

    
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
};

module.exports = {
  savePost,
};
