const UserModelGet = require("../../../user/model/functions/getFunctions");
const FollowModelGet = require("../../model/functions/getFunctions");
const FollowModelEdit = require("../../model/functions/editFunctions");
const BlockModelGet = require("../../../block/model/functions/getFunctinos");

const unFollowers = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModelGet.findUserById(id);
    const userId = user._id;
    const userName = user.userName;
    const myId = req.jwtData._id;

    let followersFlag = false;
    let blockMeFlag = false;
    let blockUserFlag = false;
    let deleteFlag = false;

    const myFollow = await FollowModelGet.findFollowByCreatedBy(myId);
    const userFollow = await FollowModelGet.findFollowByCreatedBy(id);

    const myArrFollowers = myFollow[0].arrFollowers;
    const userArrFollowing = userFollow[0].arrFollowing;

    const myFollowId = myFollow[0]._id;
    const userFollowId = userFollow[0]._id;

    const myArrFollowing = myFollow[0].arrFollowing;
    const myArrFollowingRequest = myFollow[0].arrFollowingRequest;

    let followersLength = myArrFollowers.length;
    let followersRequestLength = myFollow[0].arrFollowersRequest;

    if (myId !== id) {
      if (userName !== "User Not Available") {
        if (myArrFollowers.length > 0 && userArrFollowing.length > 0) {
          if (myArrFollowers.length >= userArrFollowing.length) {
            for (let x = 0; x < myArrFollowers.length; x++) {
              if (myArrFollowers[x].toString() === id) {
                followersFlag = true;
                break;
              }
            }
          } else {
            for (let x = 0; x < userArrFollowing.length; x++) {
              if (userArrFollowing[x].toString() === myId) {
                followersFlag = true;
                break;
              }
            }
          }
        }

        if (followersFlag) {
          followersFlag = false;
          await FollowModelEdit.unFollowers(myFollowId, userId);
          await FollowModelEdit.unFollowing(userFollowId, myId);
          followersLength = followersLength - 1;
          res.json({
            status: 200,
            msg: "Remove request",
            followersFlag,
            blockMeFlag,
            blockUserFlag,
            deleteFlag,
            myArrFollowing,
            myArrFollowingRequest,
            followersLength,
            followersRequestLength
          });
        } else {
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
          }

          if (blockMeFlag) {
            res.status(203).json({
              msg: "User blocked you",
              followersFlag,
              blockMeFlag,
              blockUserFlag,
              deleteFlag,
              myArrFollowing,
              myArrFollowingRequest,
              followersLength,
              followersRequestLength
            });
          } else {
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
                  followersFlag,
                  blockMeFlag,
                  blockUserFlag,
                  deleteFlag,
                  myArrFollowing,
                  myArrFollowingRequest,
                  followersLength,
                  followersRequestLength
                });
              }
            } else {
              res.status(203).json({
                msg: "Follow not Available",
                followersFlag,
                blockMeFlag,
                blockUserFlag,
                deleteFlag,
                myArrFollowing,
                myArrFollowingRequest,
                followersLength,
                followersRequestLength
              });
            }
          }
        }
      } else {
        deleteFlag = true;
        res.status(203).json({
          msg: "User Not Available",
          followersFlag,
          blockMeFlag,
          blockUserFlag,
          deleteFlag,
          myArrFollowing,
          myArrFollowingRequest,
          followersLength,
          followersRequestLength
        });
      }
    } else {
      throw "you can't follow after youselef";
    }
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
};

module.exports = {
  unFollowers,
};
