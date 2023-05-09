const express = require("express");
const Router = express.Router();
const UserMiddleware = require("../../../../middleware/userMiddleware");
const CreateCommentController = require("../../controller/post/createComment");


Router.post("/create_comment/:postId/:commentId", UserMiddleware, CreateCommentController.create);



module.exports = Router;
