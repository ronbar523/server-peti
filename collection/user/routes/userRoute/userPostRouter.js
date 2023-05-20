const express = require("express");
const Router = express.Router();
const UserMiddleware = require("../../../../middleware/userMiddleware");
const UploadFile = require("../../../../config/uploadFile");
const RegisterController = require("../../controller/post/register");
const LoginController = require("../../controller/post/login");
const ResendVerifyController = require("../../controller/post/resendVerifyMail");
const ResendForgetPasswordController = require("../../controller/post/resendForgetPassowrdMail");
const UploadProfileMediaController = require("../../controller/post/uploadMedia");

Router.post("/register", RegisterController.createUser);
Router.post("/login", LoginController.connectUser);

Router.post(
  "/upload_media",
  UserMiddleware,
  UploadFile.upload.single("photo"),
  UploadProfileMediaController.uploadMedia
);

Router.post(
  "/resend_verify_mail",
  UserMiddleware,
  ResendVerifyController.resend
);

Router.post(
  "/resend_forget_password/:email",
  ResendForgetPasswordController.resend
);

module.exports = Router;
