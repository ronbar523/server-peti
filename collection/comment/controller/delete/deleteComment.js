const CommentModelDelete = require("../../model/functions/deleteFunctions");
const CommentModelGet = require("../../model/functions/getFunctions");
const PostModelGet = require("../../../post/model/functions/getFunctions");
const PostModelDelete = require("../../../post/model/functions/deleteFunctions");
const UserModelGet = require("../../../user/model/functions/getFunctions");

const deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const myId = req.jwtData._id;
    let countDelete = 1;

    const comment = await CommentModelGet.findCommentById(commentId);

    if (comment !== null) {
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

      const arrCommentsOnComments = comment.arrComments;

      for (let x = 0; x < arrCommentsOnComments.length; x++) {
        await PostModelDelete.deleteCommentOnComment(
          postId,
          arrCommentsOnComments[x]
        );
        countDelete = countDelete + 1;
      }

      await PostModelDelete.deleteComment(postId, commentId);
      await CommentModelDelete.deleteAllCommentsInComment(commentId);
      await CommentModelDelete.deleteComment(commentId);
      res.json({ msg: "Comments deleted", countDelete });
      // delete tag
    } else {
      const post = await PostModelGet.findPostById(postId);

      if (post === null) {
        res.status(410).json({ msg: "Post deleted" });
      } else {
        res.status(410).json({ msg: "Comment deleted" });
      }
    }
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
};

module.exports = {
  deleteComment,
};
