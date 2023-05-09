const express = require("express");
const Router = express.Router();

const BlockRouterEdit = require("./blockRoute/blcokEditRouter");
const BlockRouterGet = require("./blockRoute/blcokGetRouter");


Router.use("/edit", BlockRouterEdit);
Router.use("/get", BlockRouterGet);






module.exports = Router;
