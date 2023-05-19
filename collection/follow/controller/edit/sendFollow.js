const UserModelGet = require("../../../user/model/functions/getFunctions");
const FollowModelGet = require("../../model/functions/getFunctions");
const FollowModelEdit = require("../../model/functions/editFunctions");
const BlockModelGet = require("../../../block/model/functions/getFunctinos");

const follow = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModelGet.findUserById(id);
    const userId = user._id;
    const public = user.public;
    const myId = req.jwtData._id;
    const userName = user.userName;

    let followFlag = false;
    let requestFollowFlag = false;
    let blockMeFlag = false;
    let blockUserFlag = false;
    let deleteFlag = false;

    if (id !== myId) {
      if (userName !== "User Not Available") {
        const myBlock = await BlockModelGet.findBlockByCreatedBy(myId);
        const userBlock = await BlockModelGet.findBlockByCreatedBy(id);

        const myBlockMeArr = myBlock[0].arrBlockMe;
        const userMyBlockArr = userBlock[0].arrMyBlock;

        if (myBlockMeArr.length > 0 && userMyBlockArr.length > 0) {
          if (myBlockMeArr.length >= userMyBlockArr.length) {
            for (let x = 0; x < userMyBlockArr.length; x++) {
              if (userMyBlockArr[x].toString() === myId) {
                blockMeFlag = true;
                break;
              }
            }
          } else {
            for (let x = 0; x < myBlockMeArr.length; x++) {
              if (myBlockMeArr[x].toString() === id) {
                blockMeFlag = true;
                break;
              }
            }
          }

          if (blockMeFlag) {
            res.status(203).json({
              msg: "User blocked you",
              followFlag,
              requestFollowFlag,
              blockMeFlag,
              blockUserFlag,
              deleteFlag,
            });
          }
        }

        if (!blockMeFlag) {
          const myBlockArr = myBlock[0].arrMyBlock;
          const userBlockMe = userBlock[0].arrBlockMe;

          if (myBlockArr.length > 0 && userBlockMe.length > 0) {
            if (myBlockArr.length >= userBlockMe.length) {
              for (let x = 0; x < userBlockMe.length; x++) {
                if (userBlockMe[x].toString() === myId) {
                  blockUserFlag = true;
                  break;
                }
              }
            } else {
              for (let x = 0; x < myBlockArr.length; x++) {
                if (myBlockArr[x].toString() === id) {
                  blockUserFlag = true;
                  break;
                }
              }
            }

            if (blockUserFlag) {
              res.status(203).json({
                msg: "You blocked this user",
                followFlag,
                requestFollowFlag,
                blockMeFlag,
                blockUserFlag,
                deleteFlag,
              });
            }
          }
        }

        if (!blockMeFlag && !blockUserFlag) {
          const myFollow = await FollowModelGet.findFollowByCreatedBy(myId);
          const userFollow = await FollowModelGet.findFollowByCreatedBy(id);
          const myArrFollowing = myFollow[0].arrFollowing;
          const userArrFollowers = userFollow[0].arrFollowers;
          const myFollowId = myFollow[0]._id;
          const userFollowId = userFollow[0]._id;
          const myArrFollowingRequest = myFollow[0].arrFollowingRequest;
          const userFollowersRequest = userFollow[0].arrFollowersRequest;

          if (public) {
            if (myArrFollowing.length > 0 && userArrFollowers.length > 0) {
              if (myArrFollowing.length >= userArrFollowers.length) {
                userArrFollowers.forEach((item) => {
                  if (item.toString() === myId) {
                    followFlag = true;
                    throw res.status(203).json({
                      msg: "New follow",
                      followFlag,
                      requestFollowFlag,
                      blockMeFlag,
                      blockUserFlag,
                      deleteFlag,
                    });
                  }
                });
              } else {
                myArrFollowing.forEach((item) => {
                  if (item.toString() === id) {
                    followFlag = true;
                    throw res.status(203).json({
                      msg: "New follow",
                      followFlag,
                      requestFollowFlag,
                      blockMeFlag,
                      blockUserFlag,
                      deleteFlag,
                    });
                  }
                });
              }
            }

            await FollowModelEdit.receiveFollowers(userFollowId, myId);
            await FollowModelEdit.sendFollowing(myFollowId, userId);
            followFlag = true;
            res.json({
              msg: "New follow",
              followFlag,
              requestFollowFlag,
              blockMeFlag,
              blockUserFlag,
              deleteFlag,
            });
          } else {
            if (
              myArrFollowingRequest.length > 0 &&
              userFollowersRequest.length > 0
            ) {
              if (myArrFollowingRequest.length >= userFollowersRequest.length) {
                for (let x = 0; x < userFollowersRequest.length; x++) {
                  if (userFollowersRequest[x].toString() === myId) {
                    requestFollowFlag = true;
                    break;
                  }
                }
              } else {
                for (let x = 0; x < myArrFollowingRequest.length; x++) {
                  if (myArrFollowingRequest[x].toString() === userId) {
                    requestFollowFlag = true;
                    break;
                  }
                }
              }
            }

            if (requestFollowFlag) {
              res.status(203).json({
                msg: "You already request to follow after this user",
                followFlag,
                requestFollowFlag,
                blockMeFlag,
                blockUserFlag,
                deleteFlag,
              });
            } else {
              await FollowModelEdit.receiveFollowersRequest(userFollowId, myId);
              await FollowModelEdit.sendFollowingRequest(myFollowId, userId);
              requestFollowFlag = true;

              res.json({
                msg: "New request",
                followFlag,
                requestFollowFlag,
                blockMeFlag,
                blockUserFlag,
                deleteFlag,
              });
            }
          }
        }
      } else {
        deleteFlag = true;
        res.status(203).json({
          msg: "User Not Available",
          followFlag,
          requestFollowFlag,
          blockMeFlag,
          blockUserFlag,
          deleteFlag,
        });
      }
    } else {
      throw "You can't follow after yourself";
    }
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
};

module.exports = {
  follow,
};
