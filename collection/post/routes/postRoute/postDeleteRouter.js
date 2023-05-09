const express = require("express");
const Router = express.Router();
const UserMiddleware = require("../../../../middleware/userMiddleware");
const DeletePostController = require("../../controller/delete/deletePost");


Router.delete("/delete_post/:postId", UserMiddleware, DeletePostController.deletePost);


module.exports = Router;