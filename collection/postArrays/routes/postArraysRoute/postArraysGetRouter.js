const express = require("express");
const Router = express.Router();
const UserMiddleware = require("../../../../middleware/userMiddleware");
const findMyController = require("../../controller/get/findMy")
const findUserController = require("../../controller/get/findUser")



Router.get("/find_my", UserMiddleware, findMyController.find);

Router.get("/find_user/:id", findUserController.find);

module.exports = Router;
