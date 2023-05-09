const express = require("express");
const Router = express.Router();
const UserMiddleware = require("../../../../middleware/userMiddleware");
const SendLikeController = require("../../controller/edit/sendLike")
const RemoveLikeController = require("../../controller/edit/removeLike")
const EditCommentController = require("../../controller/edit/editComment")


Router.patch("/send_like/:commentId/:postId/:commentIdCreated" , UserMiddleware, SendLikeController.sendLike);

Router.patch("/remove_like/:commentId/:postId/:commentIdCreated" , UserMiddleware, RemoveLikeController.removeLike);

Router.patch("/edit_comment/:postId/:commentId/:commentIdCreated" , UserMiddleware, EditCommentController.edit);



module.exports = Router;
