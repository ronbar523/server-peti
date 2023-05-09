const express = require("express");
const Router = express.Router();
const UserRouterGet = require('./userRoute/userGetRouter')
const UserRouterPost = require('./userRoute/userPostRouter');
const UserRouterEdit = require("./userRoute/userEditRouter");
const UserRouterDelete = require("./userRoute/userDeleteRouter");


Router.use("/get", UserRouterGet )
Router.use("/post", UserRouterPost);
Router.use("/edit", UserRouterEdit);
Router.use("/delete", UserRouterDelete);




module.exports = Router;
