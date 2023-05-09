const CommentModelDelete = require("../../model/functions/deleteFunctions");
const CommentModelGet = require("../../model/functions/getFunctions");
const PostModelGet = require("../../../post/model/functions/getFunctions");
const PostModelDelete = require("../../../post/model/functions/deleteFunctions");
const UserModelGet = require("../../../user/model/functions/getFunctions");

const deleteComment = async (req, res) => {
  try {
    const { commentId, postId, commentIdCreated } = req.params;
    const myId = req.jwtData._id;

    const comment = await CommentModelGet.findCommentById(commentId);

    if (comment !== null) {
      const mainCommentId = comment.commentIdCreated;

      const post = await PostModelGet.findPostById(postId);

      if (comment.createdBy.toString() !== myId) {
        if (post.createdBy.toString() !== myId) {
          const user = await UserModelGet.findUserById(myId);
          if (!user.isAdmin) {
            throw res
              .status(401)
              .json({ msg: "You not alowed to delete this comment" });
          }
        }
      }

      await PostModelDelete.deleteCommentOnComment(postId, commentId);
      await CommentModelDelete.deleteCommentOnComment(mainCommentId, commentId);
      await CommentModelDelete.deleteComment(commentId);
      res.json({ msg: "Comments deleted" });
      // delete tag
    } else {
      const post = await PostModelGet.findPostById(postId);

      if (post !== null) {
        const commentMain = await CommentModelGet.findCommentById(
          commentIdCreated
        );

        if (commentMain === null) {
          res.status(410).json({ msg: "Comment main deleted" });
        } else {
          res.status(410).json({ msg: "Comment deleted" });
        }
      } else {
        res.status(410).json({ msg: "Post deleted" });
      }
    }
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
};

module.exports = {
  deleteComment,
};
