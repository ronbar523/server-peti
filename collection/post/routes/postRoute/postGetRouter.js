const express = require("express");
const Router = express.Router();
const UserMiddleware = require("../../../../middleware/userMiddleware");
const findMyPostsController = require("../../controller/get/findMyPosts");
const findMySavePostsController = require("../../controller/get/findMySavePosts");
const findMyTagPostsController = require("../../controller/get/findMyTagPost");
const findUserTagPostsController = require("../../controller/get/findUserTagPost");

const findUserPostsController = require("../../controller/get/findUserPosts");
const findPostByIdController = require("../../controller/get/findPostById");
const findPostsController = require("../../controller/get/findPost");
const findPostsLikesController = require("../../controller/get/findLikes");
const findPostsLikesAfterFilterController = require("../../controller/get/filterLikes");



Router.get("/find_my_post", UserMiddleware, findMyPostsController.find);

Router.get("/find_my_save_post", UserMiddleware, findMySavePostsController.find);

Router.get("/find_my_tag_post", UserMiddleware, findMyTagPostsController.find);

Router.get("/find_user_tag_post/:id", findUserTagPostsController.find);


Router.get("/find_user_post/:id" , findUserPostsController.find);

Router.get("/find_post" , findPostsController.find);

Router.get("/find_post_by_id/:id" , findPostByIdController.find);

Router.get("/find_likes/:id" , findPostsLikesController.findLikes);

Router.get("/find_likes_after_filter/:id" , findPostsLikesAfterFilterController.filterLikes);


module.exports = Router;