const FollowModelGet = require("../../model/functions/getFunctions");
const FollowModelEdit = require("../../model/functions/editFunctions")
const BlockModelGet = require("../../../block/model/functions/getFunctinos");
const UserModelGet = require("../../../user/model/functions/getFunctions");



const reject = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModelGet.findUserById(id);
    const userId = user._id;
    const myId = req.jwtData._id;
    const userName = user.userName;
    let rejectFlag = false;
    let blockMeFlag = false;
    let notAvailableFlag = false;
    let blockUserFlag = false;
    let deleteFlag = false;
    let alreadyAcceptFlag = false;

    if (myId !== id) {
      if (userName !== "User Not Available") {
        const myFollow = await FollowModelGet.findFollowByCreatedBy(myId);
        const userFollow = await FollowModelGet.findFollowByCreatedBy(id);

        const myFollowId = myFollow[0]._id;
        const userFollowId = userFollow[0]._id;

        const myArrFollowersRequest = myFollow[0].arrFollowersRequest;
        const userArrFollowingRequest = userFollow[0].arrFollowingRequest;

        if (
          myArrFollowersRequest.length > 0 &&
          userArrFollowingRequest.length > 0
        ) {
          if (myArrFollowersRequest.length >= userArrFollowingRequest.length) {
            for (let x = 0; x < userArrFollowingRequest.length; x++) {
              if (userArrFollowingRequest[x].toString() === myId) {
                rejectFlag = true;
                break;
              }
            }
          } else {
            for (let x = 0; x < myArrFollowersRequest.length; x++) {
              if (myArrFollowersRequest[x].toString() === id) {
                rejectFlag = true;
                break;
              }
            }
          }
        }

        if (rejectFlag) {
          await FollowModelEdit.unFollowingRequest(userFollowId, myId);
          await FollowModelEdit.unFollowersRequest(myFollowId, userId);
          res.json({
            status: 200,
            msg: "Reject request",
            rejectFlag,
            blockMeFlag,
            notAvailableFlag,
            blockUserFlag,
            deleteFlag,
            alreadyAcceptFlag,
          });
        } else {
          const myArrFollowers = myFollow[0].arrFollowers;
          const userArrFollowing = userFollow[0].arrFollowing;

          if (myArrFollowers.length > 0 && userArrFollowing.length > 0) {
            if (myArrFollowers.length >= userArrFollowing.length) {
              for (let x = 0; x < userArrFollowing.length; x++) {
                if (userArrFollowing[x].toString() === myId) {
                  alreadyAcceptFlag = true;
                  break;
                }
              }
            } else {
              for (let x = 0; x < myArrFollowers.length; x++) {
                if (myArrFollowers[x].toString() === userId) {
                  alreadyAcceptFlag = true;
                  break;
                }
              }
            }
          }

          if (alreadyAcceptFlag) {
            res.status(203).json({
              msg: "you already accept this request",
              rejectFlag,
              blockMeFlag,
              notAvailableFlag,
              blockUserFlag,
              deleteFlag,
              alreadyAcceptFlag,
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
                rejectFlag,
                blockMeFlag,
                notAvailableFlag,
                blockUserFlag,
                deleteFlag,
                alreadyAcceptFlag,
              });
            } else {
              const myArrMyBlock = myBlock[0].arrMyBlock;
              const userArrBlockMe = userBlock[0].arrBlockMe;

              if (myArrMyBlock.length > 0 && userArrBlockMe.length > 0) {
                if (myArrMyBlock.length >= userArrBlockMe.length) {
                  for (let x = 0; x < userArrBlockMe.length; x++) {
                    if (userArrBlockMe[x].toString() === myId) {
                      blockUserFlag = true;
                      break;
                    }
                  }
                } else {
                  for (let x = 0; x < myArrMyBlock.length; x++) {
                    if (myArrMyBlock[x].toString() === id) {
                      blockUserFlag = true;
                      break;
                    }
                  }
                }
              }

              if (blockUserFlag) {
                res.status(203).json({
                  msg: "You blocked this user",
                  rejectFlag,
                  blockMeFlag,
                  notAvailableFlag,
                  blockUserFlag,
                  deleteFlag,
                  alreadyAcceptFlag,
                });
              } else {
                notAvailableFlag = true;
                res.status(203).json({
                  msg: "Request not available",
                  rejectFlag,
                  blockMeFlag,
                  notAvailableFlag,
                  blockUserFlag,
                  deleteFlag,
                  alreadyAcceptFlag,
                });
              }
            }
          }
        }
      } else {
        deleteFlag = true;
        res.status(203).json({
          msg: "User Not Available",
          rejectFlag,
          blockMeFlag,
          notAvailableFlag,
          blockUserFlag,
          deleteFlag,
          alreadyAcceptFlag,
        });
      }
    } else {
      throw "You can't send request to yourself";
    }
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
};

module.exports = {
  reject,
};
