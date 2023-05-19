const CommentModelEdit = require("../../model/functions/editFunctions");
const CommentModelGet = require("../../model/functions/getFunctions");
const PostModelGet = require("../../../post/model/functions/getFunctions");
const LikeModelEdit = require("../../../like/model/functions/editFunctions")

const sendLike = async (req, res) => {
  try {
    const { commentId, postId, commentIdCreated } = req.params;
    const myId = req.jwtData._id;

    const comment = await CommentModelGet.findCommentById(commentId);
    if (comment !== null) {
      const arrLikes = comment.arrLikes;
      let flagLike = false;

      for (let x = 0; x < arrLikes.length; x++) {
        if (arrLikes[x].toString() === myId) {
          flagLike = true;
          break;
        }
      }

      if (!flagLike) {
        await CommentModelEdit.likePost(commentId, myId);
        await LikeModelEdit.newLikeComment(myId, commentId)
        res.json({ msg: "New like" });
      } else {
        res.status(203).json({ msg: "You already did like for this post" });
      }
    } else {
      const post = await PostModelGet.findPostById(postId);

      if (post !== null) {
        if (commentIdCreated !== "undefined") {
          const commentMain = await CommentModelGet.findCommentById(
            commentIdCreated
          );

          if (commentMain === null) {
            res.status(410).json({ msg: "Comment main deleted" });
          } else {
            res.status(410).json({ msg: "Comment deleted" });
          }
        } else {
          res.status(410).json({ msg: "Comment deleted" });
        }
      } else {
        res.status(410).json({ msg: "Post deleted" });
      }
    }
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

module.exports = {
  sendLike,
};
