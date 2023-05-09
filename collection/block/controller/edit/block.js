const UserModelGet = require("../../../user/model/functions/getFunctions");
const BlockModelGet = require("../../model/functions/getFunctinos");
const BlockModelEdit = require("../../model/functions/editFunctions");
const FollowModelGet = require("../../../follow/model/functions/getFunctions");
const FollowModelEdit = require("../../../follow/model/functions/editFunctions");


const block = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModelGet.findUserById(id);
    const userId = user._id;
    const strUserId = userId.toString();

    const myId = req.jwtData._id;
    const myUser = await UserModelGet.findUserById(myId);

    let userDeletedFlag = false;
    let UserBlockedFlag = false;
    let userAlreadyBlocked = false;

    if (strUserId !== myId) {
      if (user.userName !== "User Not Available") {
        const myBlock = await BlockModelGet.findBlockByCreatedBy(myId);
        const userBlock = await BlockModelGet.findBlockByCreatedBy(strUserId);

        const myArrMyBlock = myBlock[0].arrMyBlock;
        const userArrBlockMe = userBlock[0].arrBlockMe;

        const myBlockId = myBlock[0]._id;
        const userBlockId = userBlock[0]._id;

        if (myArrMyBlock.length > 0 && userArrBlockMe.length > 0) {
          if (myArrMyBlock.length >= userArrBlockMe.length) {
            for (let x = 0; x < userArrBlockMe.length; x++) {
              if (userArrBlockMe[x].toString() === myId) {
                userAlreadyBlocked = true;
                break;
              }
            }
          } else {
            for (let x = 0; x < myArrMyBlock.length; x++) {
              if (myArrMyBlock[x].toString() === myId) {
                userAlreadyBlocked = true;
                break;
              }
            }
          }
        }

        if (userAlreadyBlocked) {
          res.status(203).json({
            msg: "User alreday blocked",
            UserBlockedFlag,
            userDeletedFlag,
            userAlreadyBlocked,
          });
        } else {
          const myFollow = await FollowModelGet.findFollowByCreatedBy(myId);
          const userFollow = await FollowModelGet.findFollowByCreatedBy(userId);

          const myArrFollowing = myFollow[0].arrFollowing;
          const myArrFollowingRequest = myFollow[0].arrFollowingRequest;
          const myArrFollowers = myFollow[0].arrFollowers;
          const myArrFollowersRequest = myFollow[0].arrFollowersRequest;

          const userArrFollowing = userFollow[0].arrFollowing;
          const userArrFollowingRequest = userFollow[0].arrFollowingRequest;
          const userArrFollowers = userFollow[0].arrFollowers;
          const userArrFollowersRequest = userFollow[0].arrFollowersRequest;

          const myFollowId = myFollow[0]._id;
          const userFollowId = userFollow[0]._id;

          let myFollowFlag = false;
          let myRequestFlag = false;
          let userFollowFlag = false;
          let userRequestFlag = false;

          if (myArrFollowers.length > 0 && userArrFollowing.length > 0) {
            if (myArrFollowers.lenhth >= userArrFollowing.length) {
              for (let x = 0; x < userArrFollowing.length; x++) {
                if (userArrFollowing[x].toString() === myId) {
                  userFollowFlag = true;
                  break;
                }
              }
            } else {
              for (let x = 0; x < myArrFollowers.length; x++) {
                if (myArrFollowers[x].toString() === id) {
                  userFollowFlag = true;
                  break;
                }
              }
            }
          }

          if (!userFollowFlag && !myUser.public) {
            if (
              myArrFollowersRequest.length > 0 &&
              userArrFollowingRequest.length > 0
            ) {
              if (
                myArrFollowersRequest.lenhth >= userArrFollowingRequest.length
              ) {
                for (let x = 0; x < userArrFollowingRequest.length; x++) {
                  if (userArrFollowingRequest[x].toString() === myId) {
                    userRequestFlag = true;
                    break;
                  }
                }
              } else {
                for (let x = 0; x < myArrFollowersRequest.length; x++) {
                  if (myArrFollowersRequest[x].toString() === id) {
                    userRequestFlag = true;
                    break;
                  }
                }
              }
            }
          }

          if (myArrFollowing.length > 0 && userArrFollowers.length > 0) {
            if (myArrFollowing.lenhth >= userArrFollowers.length) {
              for (let x = 0; x < userArrFollowers.length; x++) {
                if (userArrFollowers[x].toString() === myId) {
                  myFollowFlag = true;
                  break;
                }
              }
            } else {
              for (let x = 0; x < myArrFollowing.length; x++) {
                if (myArrFollowing[x].toString() === id) {
                  myFollowFlag = true;
                  break;
                }
              }
            }
          }

          if (!myFollowFlag && !user.public) {
            if (
              myArrFollowingRequest.length > 0 &&
              userArrFollowersRequest.length > 0
            ) {
              if (
                myArrFollowingRequest.lenhth >= userArrFollowersRequest.length
              ) {
                for (let x = 0; x < userArrFollowersRequest.length; x++) {
                  if (userArrFollowersRequest[x].toString() === myId) {
                    myRequestFlag = true;
                    break;
                  }
                }
              } else {
                for (let x = 0; x < myArrFollowingRequest.length; x++) {
                  if (myArrFollowingRequest[x].toString() === id) {
                    myRequestFlag = true;
                    break;
                  }
                }
              }
            }
          }

          if (myFollowFlag) {
            await FollowModelEdit.unFollowers(userFollowId, myId);
            await FollowModelEdit.unFollowing(myFollowId, userId);
          } else if (myRequestFlag) {
            await FollowModelEdit.unFollowersRequest(userFollowId, myId);
            await FollowModelEdit.unFollowingRequest(myFollowId, userId);
          }

          if (userFollowFlag) {
            await FollowModelEdit.unFollowers(myFollowId, userId);
            await FollowModelEdit.unFollowing(userFollowId, myId);
          } else if (userRequestFlag) {
            await FollowModelEdit.unFollowersRequest(myFollowId, userId);
            await FollowModelEdit.unFollowingRequest(userFollowId, myId);
          }

          await BlockModelEdit.userBlock(userBlockId, myId);
          await BlockModelEdit.blockUser(myBlockId, userId);
          UserBlockedFlag = true;
          res.json({
            status: 200,
            msg: "User blocked",
            UserBlockedFlag,
            userDeletedFlag,
            userAlreadyBlocked,
          });
        }
      } else {
        userDeletedFlag = true;
        res.status(203).json({
          msg: "User Not Available",
          UserBlockedFlag,
          userDeletedFlag,
          userAlreadyBlocked,
        });
      }
    } else {
      throw "You can't block yourself";
    }
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
};

module.exports = {
  block,
};
