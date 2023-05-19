const PostModelGet = require("../../model/functions/getFunctions");
const PostModelDelete = require("../../model/functions/deleteFunctions");
const UserModelGet = require("../../../user/model/functions/getFunctions");
const PostArraysModelDelete = require("../../../postArrays/model/functions/deleteFunctions");
const CommentModelDelete = require("../../../comment/model/functions/deleteFunctions");

const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    let myId = req.jwtData._id;

    const post = await PostModelGet.findPostById(postId);

    if (post !== null) {
      const postCreatedBy = post.createdBy;
      if (myId !== postCreatedBy.toString()) {
        const user = await UserModelGet.findUserById(myId);
        if (!user.isAdmin) {
          throw res
            .status(401)
            .json({ msg: "You not alowed to delete this post" });
        }
      }

      const userCrearedId = post.createdBy;
      const postTags = post.arrTag;
      const postSave = post.arrSaves
      const postKind = post.postKind

    
      // remove tag
      for (let x = 0; x < postTags.length; x++) {
        const userId = postTags[x];
        await PostArraysModelDelete.removeTagByCreatedBy(userId, postKind, postId);
      }

      // remove Save
      for(let x = 0; x < postSave.length; x++){
        const userId = postSave[x];
        await PostArraysModelDelete.unSavePhotoPostByCreatedBy(userId, postKind, postId)
      }

      // delete Comment
      await CommentModelDelete.deleteAllCommentsInPost(postId);


      await PostModelDelete.deletePostById(postId);
      await PostArraysModelDelete.removePost(
        userCrearedId,
        post.postKind,
        postId
      );

      res.json({ msg: "Post deleted" });
    } else {
      res.status(410).json({ msg: "Post already deleted" });
    }
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
};

module.exports = {
  deletePost,
};
