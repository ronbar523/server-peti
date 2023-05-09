const express = require("express");
const Router = express.Router();
const UserMiddleware = require("../../../../middleware/userMiddleware");
const deleteMyUserController = require("../../controller/delete/deleteUser");

Router.patch(
  "/delete_my_user",
  UserMiddleware,
  deleteMyUserController.deleteUser
);

module.exports = Router;
