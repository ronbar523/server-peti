const express = require("express");
const Router = express.Router();

const CommentRouterPost = require('./commentRoute/commentPostRouter');
const CommentRouterGet = require('./commentRoute/commentGetRouter');
const CommentRouterEdit = require('./commentRoute/commentEditRouter');
const CommentRouterDelete = require('./commentRoute/commentDeleteRouter');


Router.use("/get",  CommentRouterGet)
Router.use("/post", CommentRouterPost);
Router.use("/edit", CommentRouterEdit);
Router.use("/delete", CommentRouterDelete);

module.exports = Router;