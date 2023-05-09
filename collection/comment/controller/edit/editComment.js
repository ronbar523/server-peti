const CommentModelEdit = require("../../model/functions/editFunctions");
const CommentModelGet = require("../../model/functions/getFunctions");
const CommentValidation = require("../../validation/commentValidation");
const PostModelGet = require("../../../post/model/functions/getFunctions");

const edit = async (req, res) => {
  try {
    let { commentId, postId, commentIdCreated } = req.params;
    const myId = req.jwtData._id;
    const comment = await CommentModelGet.findCommentById(commentId);

    if (comment !== null) {
      if (comment.createdBy.toString() === myId) {
        const requestBody = await CommentValidation.editSchema.validateAsync(
          req.body,
          { abortEarly: false }
        );

        //   let lastArrTag = comment.arrTag;
        //   let newArrTag = requestBody.arrTag;

        // add tag option

        const commentUpdate = await CommentModelEdit.editComment(
          commentId,
          requestBody.description,
          requestBody.shortDescription,
          requestBody.arrTag,
          requestBody.lastUpdate
        );

        res.json({ commentUpdate: commentUpdate });
      } else {
        res.status(401).json({ msg: "You not alowed to edit this comment" });
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
    res.status(400).json({ status: 400, err: err });
  }
};

module.exports = {
  edit,
};
