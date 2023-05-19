const UserModelGet = require("../../model/functions/getFunctions");
const UserModelDelete = require("../../model/functions/deleteFunctions");
const FollowModelGet = require("../../../follow/model/functions/getFunctions");
const FollowModelEdit = require("../../../follow/model/functions/editFunctions");
const BlockModelGet = require("../../../block/model/functions/getFunctinos");
const BlockModelEdit = require("../../../block/model/functions/editFunctions");
const PostModelDelete = require("../../../post/model/functions/deleteFunctions");
const PostModelEdit = require("../../../post/model/functions/editFunctions");
const PostModelGet = require("../../../post/model/functions/getFunctions");
const PostArraysModelDelete = require("../../../postArrays/model/functions/deleteFunctions");
const PostArraysModelGet = require("../../../postArrays/model/functions/getFunctions");

const CommentModelEdit = require("../../../comment/model/functions/editFunctions");
const CommentModelDelete = require("../../../comment/model/functions/deleteFunctions");
const LikeModelGet = require("../../../like/model/functions/getFunctions");
const LikeModelEdit = require("../../../like/model/functions/editFunctions");

const deleteUser = async (req, res) => {
  try {
    const myId = req.jwtData._id;

    const myFollow = await FollowModelGet.findFollowByCreatedBy(myId);
    const myFollowId = myFollow[0]._id;
    const myArrFollowers = myFollow[0].arrFollowers;
    const myArrFollowing = myFollow[0].arrFollowing;
    const myArrFollowersRequest = myFollow[0].arrFollowingRequest;
    const myArrFollowingRequest = myFollow[0].arrFollowingRequest;

    const myBlock = await BlockModelGet.findBlockByCreatedBy(myId);
    const myBlockId = myBlock[0]._id;
    const myArrMyBlock = myBlock[0].arrMyBlock;
    const myArrBlockMe = myBlock[0].arrBlockMe;

    const myLike = await LikeModelGet.findLikeByCreatedBy(myId);
    const myLikePost = myLike[0].arrPostLikes;
    const myLikeComment = myLike[0].arrCommentLikes;

    for (let x = 0; x < myArrFollowing.length; x++) {
      const userId = myArrFollowing[x];

      await FollowModelEdit.unFollowing(myFollowId, userId);
      await FollowModelEdit.unFollowersByCreatedBy(userId, myId);
    }

    for (let x = 0; x < myArrFollowingRequest.length; x++) {
      const userId = myArrFollowingRequest[x];

      await FollowModelEdit.unFollowingRequest(myFollowId, userId);
      await FollowModelEdit.unFollowersRequestByCreatedBy(userId, myId);
    }

    for (let x = 0; x < myArrFollowers.length; x++) {
      const userId = myArrFollowers[x];

      await FollowModelEdit.unFollowers(myFollowId, userId);
      await FollowModelEdit.unFollowingByCreatedBy(userId, myId);
    }

    for (let x = 0; x < myArrFollowersRequest.length; x++) {
      const userId = myArrFollowersRequest[x];

      await FollowModelEdit.unFollowersRequest(myFollowId, userId);
      await FollowModelEdit.unFollowingRequestByCreatedBy(userId, myId);
    }

    for (let x = 0; x < myArrBlockMe.length; x++) {
      const userId = myArrBlockMe[x];
      await BlockModelEdit.unBlockUserByCreatedBy(userId, myId);
      await BlockModelEdit.userUnBlock(myBlockId, userId);
    }

    for (let x = 0; x < myArrMyBlock.length; x++) {
      const userId = myArrMyBlock[x];

      await BlockModelEdit.unBlockUser(myBlockId, userId);
      await BlockModelEdit.userUnBlockByCreatedBy(userId, myId);
    }

    for (let x = 0; x < myLikePost.length; x++) {
      const postId = myLikePost[x];
      await PostModelEdit.removeLike(postId, myId);
      await LikeModelEdit.unLikePost(myId, postId);
    }

    for (let x = 0; x < myLikeComment.length; x++) {
      const commentId = myLikeComment[x];
      await CommentModelEdit.removeLike(commentId, myId);
      await LikeModelEdit.unLikeComment(myId, commentId);
    }

    const myUser = await UserModelGet.findUserById(myId);
    const userName = "User Not Available";
    const email = "-";
    const userDeleteEmail = myUser.email;
    const fullName = "User Not Available";
    const photo =
      "https://st3.depositphotos.com/9998432/13335/v/600/depositphotos_133352062-stock-illustration-default-placeholder-profile-icon.jpg";

    await UserModelDelete.deleteMyUser(
      myId,
      userName,
      fullName,
      email,
      userDeleteEmail,
      photo
    );

    const myPostArrays = await PostArraysModelGet.findPostArraysByCreatedBy(
      myId
    );
    const myPostArr = [
      ...myPostArrays[0].arrMyPhoto,
      ...myPostArrays[0].arrMyVideo,
      ...myPostArrays[0].arrMyTextPost,
    ];
    for (let x = 0; x < myPostArr.length; x++) {
      const post = await PostModelGet.findPostById(myPostArr[x]);
      const postId = post._id;
      const savePostArr = post.arrSaves;
      const tagPostArr = post.arrTag;
      const postKind = post.postKind;
      for (let y = 0; y < savePostArr.length; y++) {
        const userId = savePostArr[y];
        await PostArraysModelDelete.unSavePhotoPostByCreatedBy(
          userId,
          postKind,
          postId
        );
      }

      for (let y = 0; y < tagPostArr.length; y++) {
        const userId = tagPostArr[y];

        await PostArraysModelDelete.removeTagByCreatedBy(
          userId,
          postKind,
          postId
        );
      }

      await CommentModelDelete.deleteAllCommentsInPost(postId);
    }

    await PostModelDelete.deleteAllMyPosts(myId);

    await CommentModelEdit.editUserInfo(myId, photo, userName);
    res.json({ msg: "Your user deleted" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: 400, err: err });
  }
};

module.exports = {
  deleteUser,
};
