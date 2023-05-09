const PostModelPost = require("../../model/functions/postFunctions");
const UserModelGet = require("../../../user/model/functions/getFunctions");
const PostArraysModelPost = require("../../../postArrays/model/functions/postFunctions");
const PostValidation = require("../../validation/postValidation");
// const mongoose = require("mongoose");

const create = async (req, res) => {
  try {
    const myId = req.jwtData._id;

    const requestBody = await PostValidation.createSchema.validateAsync(
      req.body,
      { abortEarly: false }
    );

    const user = await UserModelGet.findUserById(myId);

    // let tagUsers = []
    // if (requestBody.arrTag.legth > 0) {
    //   requestBody.arrTag.forEach((item) => {
    //     tagUsers.push(mongoose.Types.ObjectId(item))
    //   })

    // }

    if (!user.block || user.userName !== "User Not Available") {
      let post = await PostModelPost.createPost(
        user.userName,
        user.fullName,
        user.photo,
        requestBody.category,
        requestBody.description,
        requestBody.shortDescription,
        requestBody.location,
        requestBody.postKind,
        requestBody.postPhoto,
        requestBody.arrTag,
        user._id
      );

      await PostArraysModelPost.newPost(myId, requestBody.postKind, post._id);

      const arrUserIdTag = requestBody.arrTag;
      if (arrUserIdTag.length > 0) {
        for (let x = 0; x < arrUserIdTag.length; x++) {
          await PostArraysModelPost.sendTag(arrUserIdTag[x], post._id);
        }
      }

      res.json({
        status: 201,
        msg: "new post created",
        post: post,
      });
    } else {
      res.status(400).json({ msg: "You not allow to publish post" });
    }
  } catch (err) {
    res.status(400).json({ status: 400 });
  }
};

module.exports = {
  create,
};
