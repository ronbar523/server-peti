const express = require("express");
const Router = express.Router();

const FollowRouterGet = require("./followRoute/followGetRouter");
const FollowRouterEdit = require("./followRoute/followEditRouter");


Router.use("/get", FollowRouterGet);
Router.use("/edit", FollowRouterEdit);





module.exports = Router;
