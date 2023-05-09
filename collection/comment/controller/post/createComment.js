const CommentModelPost = require("../../model/functions/postFunctions");
const CommentModelGet = require("../../model/functions/getFunctions");
const CommentArraysModelPost = require("../../../commentArrays/model/functions/postFunctions")
const UserModelGet = require("../../../user/model/functions/getFunctions");
const PostModelPost = require("../../../post/model/functions/postFunctions");
const PostModelGet = require("../../../post/model/functions/getFunctions");
const CommentValidation = require("../../validation/commentValidation");

const create = async (req, res) => {
  try {
    const myId = req.jwtData._id;
    let { postId, commentId } = req.params;
    

    const requestBody = await CommentValidation.createSchema.validateAsync(
      req.body,
      { abortEarly: false }
    );

    const post = await PostModelGet.findPostById(postId);

    if (post !== null) {
      let comment = {};
      let allComments = []

      // change the undefined
      if (commentId !== "undefined") {
        comment = await CommentModelGet.findCommentById(commentId);
      }

      if (comment !== null) {
        const user = await UserModelGet.findUserById(myId);

        if (!user.block || user.userName !== "User Not Available") {
          let newComment = {}

          if (commentId === "undefined") {
            newComment = await CommentModelPost.createComment(
              user.userName,
              user.fullName,
              user.photo,
              requestBody.description,
              requestBody.shortDescription,
              requestBody.arrTag,
              post._id,
              user._id,
            );
          } else {

            newComment = await CommentModelPost.createComment(
              user.userName,
              user.fullName,
              user.photo,
              requestBody.description,
              requestBody.shortDescription,
              requestBody.arrTag,
              post._id,
              user._id,
              commentId
            );

            const arrComments = comment.arrComments
            allComments = await CommentModelGet.findCommentComments(arrComments, 0, comment.arrComments.length)
          }

          if (Object.keys(comment).length !== 0) {
            await CommentModelPost.createCommentForComment(
              commentId,
              newComment._id
            );

            await PostModelPost.createCommentForComment(postId, newComment._id);
          } else {
            await PostModelPost.createComment(postId, newComment._id);
          }

          if (requestBody.arrTag.length > 0) {
            arrUserIdTag = requestBody.arrTag;
            for (let x = 0; x < arrUserIdTag.length; x++) {
              await CommentArraysModelPost.tagMe(
                arrUserIdTag[x],
                newComment._id
              );
            }
          }

          res.status(201).json({ newComment: newComment, allComments: allComments });
        } else {
          res.status(401).json({ msg: "You not allow to publish post" });
        }
      } else {
        res.status(410).json({ msg: "Comment main deleted" });
      }
    } else {
      res.status(410).json({ msg: "Post deleted" });
    }
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
};

module.exports = {
  create,
};
