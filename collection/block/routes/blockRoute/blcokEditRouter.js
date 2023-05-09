const express = require("express");
const Router = express.Router();
const UserMiddleware = require("../../../../middleware/userMiddleware");
const BlockUserController = require("../../controller/edit/block");
const RemoveBlockRouterEdit = require("../../controller/edit/removeBlock");
const RemoveALLBlockRouterEdit = require("../../controller/edit/removeAllBlock");


Router.patch(
  "/block_user/:id",
  UserMiddleware,
  BlockUserController.block
);

Router.patch(
  "/remove_block_user/:id",
  UserMiddleware,
  RemoveBlockRouterEdit.unBlock
);

Router.patch(
  "/remove_all_block_user",
  UserMiddleware,
  RemoveALLBlockRouterEdit.unBlockAll
);

module.exports = Router;
