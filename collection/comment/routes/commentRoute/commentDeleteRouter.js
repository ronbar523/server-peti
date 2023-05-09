const express = require("express");
const Router = express.Router();
const UserMiddleware = require("../../../../middleware/userMiddleware");
const DeleteCommentController = require("../../controller/delete/deleteComment");
const DeleteCommentOnCommentController = require("../../controller/delete/deleteCommentOnComment");

Router.delete(
  "/delete_comment/:postId/:commentId",
  UserMiddleware,
  DeleteCommentController.deleteComment
);

Router.delete(
  "/delete_comment_on_comment/:postId/:commentIdCreated/:commentId",
  UserMiddleware,
  DeleteCommentOnCommentController.deleteComment
);

module.exports = Router;
