const express = require("express");
const Router = express.Router();

const PostRouterGet = require('./postRoute/postGetRouter')
const PostRouterPost = require('./postRoute/postPostRouter');
const PostRouterEdit = require("./postRoute/postEditRouter");
const PostRouterDelete = require("./postRoute/postDeleteRouter");


Router.use("/get", PostRouterGet )
Router.use("/post", PostRouterPost);
Router.use("/edit", PostRouterEdit);
Router.use("/delete", PostRouterDelete);

module.exports = Router;