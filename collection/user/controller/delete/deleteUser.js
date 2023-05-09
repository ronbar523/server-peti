const UserModelGet = require("../../model/functions/getFunctions");
const UserModelDelete = require("../../model/functions/deleteFunctions");
const FollowModelGet = require("../../../follow/model/functions/getFunctions");
const FollowModelEdit = require("../../../follow/model/functions/editFunctions");
const BlockModelGet = require("../../../block/model/functions/getFunctinos");
const BlockModelEdit = require("../../../block/model/functions/editFunctions");
const PostModelDelete = require("../../../post/model/functions/deleteFunctions");
const CommentModelEdit = require("../../../comment/model/functions/editFunctions");


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


    const myUser = await UserModelGet.findUserById(myId);
    // const userName = "User Not Available";
    const email = "-";
    const userDeleteEmail = myUser.email;
    // const fullName = "User Not Available";
    const photo =
      "https://st3.depositphotos.com/9998432/13335/v/600/depositphotos_133352062-stock-illustration-default-placeholder-profile-icon.jpg";
    
      await UserModelDelete.deleteMyUser(
      myId,
      // userName,
      // fullName,
      email,
      userDeleteEmail,
      photo
    );

    await PostModelDelete.deleteAllMyPosts(myId)
    await CommentModelEdit.editUserInfo(myId, photo, userName)
    res.json({ msg: "Your user deleted" });
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
};

module.exports = {
  deleteUser,
};
