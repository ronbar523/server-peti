const express = require("express");
const Router = express.Router();
const PostArraysRouterGet = require('./postArraysRoute/postArraysGetRouter')
const PostArraysRouterPost = require('./postArraysRoute/postArraysPostRouter');
const PostArraysRouterEdit = require("./postArraysRoute/postArraysEditRouter");
const PostArraysRouterDelete = require("./postArraysRoute/postArraysDeleteRouter");


Router.use("/get", PostArraysRouterGet )
Router.use("/post", PostArraysRouterPost);
Router.use("/edit", PostArraysRouterEdit);
Router.use("/delete", PostArraysRouterDelete);



module.exports = Router;
