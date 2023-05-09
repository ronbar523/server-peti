const express = require("express");
const Router = express.Router();

const UserMiddleware = require("../../../../middleware/userMiddleware");
const FindMyController = require("../../controller/get/findMyFollow");
const FindMyFollowingController = require("../../controller/get/findMyFollowing");
const FindMyFollowersController = require("../../controller/get/findMyFollowers");
const FindMyRequestFollowersController = require("../../controller/get/findMyRequestFollowers");
const FindMyLengthFollowController = require("../../controller/get/findLengthMyFollow");
const FindByUserNameController = require("../../controller/get/findByUserName");
const FindByIdController = require("../../controller/get/findById");
const FindFollowersController = require("../../controller/get/findFollowers");
const FindFollowingController = require("../../controller/get/findFollowing");
const FindLengthUserFollowController = require("../../controller/get/findLengthUserFollow");

const FilterMyFollowersController = require("../../controller/get/filterMyFollowers")
const FilterMyFollowersRequestsController = require("../../controller/get/filterMyFollowersRequest")
const FilterMyFollowingController = require("../../controller/get/filterMyFollowing")

const FilterFollowersController = require("../../controller/get/filterFollowers")
const FilterFollowingController = require("../../controller/get/filterFollowing")


Router.get("/find_my", UserMiddleware, FindMyController.find);

Router.get("/find_my_following", UserMiddleware, FindMyFollowingController.find);

Router.get("/find_my_followers", UserMiddleware, FindMyFollowersController.find);

Router.get("/find_my_request", UserMiddleware, FindMyRequestFollowersController.find)

Router.get("/find_my_length_follow", UserMiddleware, FindMyLengthFollowController.find)

Router.get("/find_by_id/:id", FindByIdController.find);

Router.get("/find_by_user_name/:userName", FindByUserNameController.find);

Router.get("/find_followers/:id", FindFollowersController.find);

Router.get("/find_following/:id", FindFollowingController.find);

Router.get("/find_length_follow/:id", FindLengthUserFollowController.find)

Router.get("/filter_followers/:id" , FilterFollowersController.filterFollowers )

Router.get("/filter_followers/:id" , FilterFollowingController.filterFollowing )

Router.get("/filter_my_followers", UserMiddleware, FilterMyFollowersController.filterFollowers )

Router.get("/filter_my_following", UserMiddleware, FilterMyFollowingController.filterFollowing )

Router.get("/filter_my_followers_request", UserMiddleware, FilterMyFollowersRequestsController.filterFollowersRequest )

module.exports = Router;
