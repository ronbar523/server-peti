const express = require("express");
const Router = express.Router();
const UserMiddleware = require("../../../../middleware/userMiddleware");
const CreatePostController = require("../../controller/post/createPost");


Router.post("/create_post", UserMiddleware, CreatePostController.create);



module.exports = Router;
