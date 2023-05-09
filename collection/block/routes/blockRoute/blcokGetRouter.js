const express = require("express");
const Router = express.Router();
const UserMiddleware = require("../../../../middleware/userMiddleware");

const FindMyController = require("../../controller/get/findMy");
const FindByIdController = require("../../controller/get/findById");
const FindMyBlockController = require("../../controller/get/findMyBlock");
const FilterMyBlockController = require("../../controller/get/filterMyBlock");


Router.get("/find_my", UserMiddleware, FindMyController.find);
Router.get("/find_by_id/:id", UserMiddleware, FindByIdController.find);
Router.get("/find_my_block", UserMiddleware, FindMyBlockController.find);
Router.get("/filter_my_block", UserMiddleware, FilterMyBlockController.filter);



module.exports = Router;
