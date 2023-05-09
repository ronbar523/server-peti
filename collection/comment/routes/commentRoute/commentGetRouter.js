const express = require("express");
const Router = express.Router();
const FindByPostIdController = require("../../controller/get/findByPostId");
const FindByCommentIdController = require("../../controller/get/findByCommentId");
const findCommentLikesController = require("../../controller/get/findLikes");
const findCommentLikesAfterFilterController = require("../../controller/get/filterLikes");



Router.get("/find_by_post_id/:postId", FindByPostIdController.find);

Router.get("/find_by_comment_id/:postId/:commentId" , FindByCommentIdController.find);

Router.get("/find_likes/:postId/:commentId/:commentIdCreated" , findCommentLikesController.findLikes);

Router.get("/find_likes_after_filter/:postId/:commentId/:commentIdCreated" , findCommentLikesAfterFilterController.filterLikes);


module.exports = Router;
