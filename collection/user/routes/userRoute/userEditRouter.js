const express = require("express");
const Router = express.Router();
const UploadFile = require("../../../../config/uploadFile");
const UserMiddleware = require("../../../../middleware/userMiddleware");
const VerifyController = require("../../controller/edit/verify")
const ChangeProfilePhotoController = require("../../controller/edit/changeProfilePhoto");
const ChangeNameUserController = require("../../controller/edit/changeNameUser");
const ChangeUserNameController = require("../../controller/edit/changeUserName");
const ChangeBioController = require("../../controller/edit/changeBio");
const ChangePasswordController = require("../../controller/edit/changePassword");
const ChangeEmailController = require("../../controller/edit/changeEmail");
const ChangePublicController = require("../../controller/edit/changePublic");
const ForgetPasswordController = require("../../controller/edit/forgetPassword");
const ResetPasswordController = require("../../controller/edit/resetPassword")
const SendLikeController = require("../../controller/edit/sendLikeAccount");

Router.patch(
  "/verify",
  VerifyController.verify
);

Router.patch(
  "/change_user_name",
  UserMiddleware,
  ChangeUserNameController.changeUserName
);

Router.patch(
  "/change_name",
  UserMiddleware,
  ChangeNameUserController.changeName
);

Router.patch(
  "/change_profile_photo",
  UserMiddleware,
  UploadFile.upload.single("photo"),
  ChangeProfilePhotoController.changePhoto
);

Router.patch(
  "/change_bio",
  UserMiddleware,
  ChangeBioController.changeBio
);

Router.patch(
  "/change_password",
  UserMiddleware,
  ChangePasswordController.changePassword
);

Router.patch(
  "/change_email",
  UserMiddleware,
  ChangeEmailController.changeEmail
);

Router.patch("/change_public", UserMiddleware, ChangePublicController.changePublic);

Router.patch("/forget_password", ForgetPasswordController.sendRecoveryMail )

Router.patch("/reset_password", ResetPasswordController.reset )






Router.patch(
  "/send_like/:userName",
  UserMiddleware,
  SendLikeController.sendLikeAccount
);




module.exports = Router;
