const express = require("express");
const Router = express.Router();
const UserMiddleware = require("../../../../middleware/userMiddleware");
const FindByIdController = require("../../controller/get/findUserById");
const FindByEmailController = require("../../controller/get/findUserByEmail");
const FindByUserNameController = require("../../controller/get/findUserByUserName");
const FindByNameController = require("../../controller/get/findByName");
const FindForTagController = require("../../controller/get/findForTag")
const FindMyFollowersController = require("../../controller/get/findFromMyFollowing")
const FindTagController = require("../../controller/get/findTag")
const FindForTagCommentController = require("../../controller/get/findForTagComment")



Router.get("/find_by_id/:id", UserMiddleware, FindByIdController.findUser);

Router.get("/find_by_email/:email", FindByEmailController.findUser);

Router.get("/find_by_user_name/:userName", FindByUserNameController.findUser);

Router.get("/find_by_name", FindByNameController.findUsers);

Router.get("/find_for_tag", UserMiddleware, FindForTagController.findUsers);

Router.get("/find_form_my_following", UserMiddleware, FindMyFollowersController.findUsers);

Router.get("/find_tags", FindTagController.findUsers);

Router.get("/find_tag_comment", UserMiddleware, FindForTagCommentController.findUsers);



module.exports = Router;
