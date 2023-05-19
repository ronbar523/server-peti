const express = require("express");
const Router = express.Router();
const UserMiddleware = require("../../../../middleware/userMiddleware");
const EditPostController = require("../../controller/edit/editPost")
const RemoveMyTagController = require("../../controller/edit/removeMyTag")
const SendLikeController = require("../../controller/edit/sendLike")
const RemoveLikeController = require("../../controller/edit/removeLike")
const SavePhotoPostController = require("../../controller/edit/savePhotoPost")
const UnSavePhotoPostController = require("../../controller/edit/unSavePost")



Router.patch("/edit_post/:postId" , UserMiddleware, EditPostController.edit);

Router.patch("/remove_my_tag/:postId" , UserMiddleware, RemoveMyTagController.removeTag);

Router.patch("/send_like/:postId" , UserMiddleware, SendLikeController.sendLike);

Router.patch("/remove_like/:postId" , UserMiddleware, RemoveLikeController.removeLike);

Router.patch("/save_photo_post/:postId" , UserMiddleware, SavePhotoPostController.savePost);

Router.patch("/un_save_photo_post/:postId" , UserMiddleware, UnSavePhotoPostController.unSavePost);




module.exports = Router;