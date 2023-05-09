const express = require("express");
const Router = express.Router();

const UserMiddleware = require("../../../../middleware/userMiddleware");
const SendFollowController = require("../../controller/edit/sendFollow");
const RemoveFollowController = require("../../controller/edit/removeFollow");
const RemoveFollowRequestController = require("../../controller/edit/removeFollowRequest");
const RemoveFollowersController = require("../../controller/edit/removeFromMyFollowers")
const AcceptFollowRequestController = require("../../controller/edit/acceptFollowRequest");
const AcceptAllFollowRequestController = require("../../controller/edit/acceptAllFollowRequest");
const RejectFollowRequestController = require("../../controller/edit/rejectFollowRequest");
const RejectAllFollowRequestController = require("../../controller/edit/rejectAllFollowRequest");



Router.patch(
  "/send_follow/:id",
  UserMiddleware,
  SendFollowController.follow
);

Router.patch(
  "/remove_follow/:id",
  UserMiddleware,
  RemoveFollowController.unFollow
);


Router.patch(
  "/remove_follow_request/:id",
  UserMiddleware,
  RemoveFollowRequestController.unFollowRequest
);

Router.patch(
  "/remove_followers/:id",
  UserMiddleware,
  RemoveFollowersController.unFollowers
);



Router.patch(
  "/accept_follow_request/:id",
  UserMiddleware,
  AcceptFollowRequestController.accept
);

Router.patch(
  "/accept_all_follow_request",
  UserMiddleware,
  AcceptAllFollowRequestController.acceptAll
);

Router.patch(
  "/reject_follow_request/:id",
  UserMiddleware,
  RejectFollowRequestController.reject
);

Router.patch(
  "/reject_all_follow_request",
  UserMiddleware,
  RejectAllFollowRequestController.rejectAll
);

module.exports = Router;
