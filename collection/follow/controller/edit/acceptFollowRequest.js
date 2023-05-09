const UserModelGet = require("../../../user/model/functions/getFunctions");
const BlockModelGet = require("../../../block/model/functions/getFunctinos");
const FollowModelGet = require("../../model/functions/getFunctions");
const FollowModelEdit = require("../../model/functions/editFunctions")


const accept = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModelGet.findUserById(id);
    const userId = user._id;
    const userName = user.userName;
    const myId = req.jwtData._id;
    let deleteFlag = false;
    let flagBlock = false;
    let acceptFlag = false;
    let blockMeFlag = false;
    let blockUserFlag = false;
    let notAvailableFlag = false;
    let alredayAcceptFlag = false;

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
                acceptFlag = true;
                break;
              }
            }
          } else {
            for (let x = 0; x < myArrFollowersRequest.length; x++) {
              if (myArrFollowersRequest[x].toString() === id) {
                acceptFlag = true;
                break;
              }
            }
          }
        }

        if (acceptFlag) {
          await FollowModelEdit.sendFollowing(userFollowId, myId);
          await FollowModelEdit.unFollowingRequest(userFollowId, myId);

          await FollowModelEdit.receiveFollowers(myFollowId, userId);
          await FollowModelEdit.unFollowersRequest(myFollowId, userId);

          res.json({
            msg: "newFollow",
            acceptFlag,
            blockMeFlag,
            notAvailableFlag,
            deleteFlag,
            blockUserFlag,
            alredayAcceptFlag,
          });
        } else {
          
          const myArrFollowers = myFollow[0].arrFollowers;
          const userArrFollowing = userFollow[0].arrFollowing;

          if (myArrFollowers.length > 0 && userArrFollowing.length > 0) {
            if (myArrFollowers.length >= userArrFollowing.length) {
              for (let x = 0; x < userArrFollowing.length; x++) {
                if (userArrFollowing[x].toString() === myId) {
                  alredayAcceptFlag = true;
                  break;
                }
              }
            } else {
              for (let x = 0; x < myArrFollowers.length; x++) {
                if (myArrFollowers[x].toString() === userId) {
                  alredayAcceptFlag = true;
                  break;
                }
              }
            }
          }


          if (alredayAcceptFlag) {
            res.json({
              msg: "You alreday accept this request",
              acceptFlag,
              blockMeFlag,
              notAvailableFlag,
              deleteFlag,
              blockUserFlag,
              alredayAcceptFlag,
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
                    flagBlock = true;
                    break;
                  }
                }
              } else {
                for (let x = 0; x < myBlockMeArr.length; x++) {
                  if (myBlockMeArr[x].toString() === id) {
                    flagBlock = true;
                    break;
                  }
                }
              }
            }

            if (flagBlock) {
              res.status(203).json({
                msg: "User blocked you",
                acceptFlag,
                blockMeFlag,
                notAvailableFlag,
                deleteFlag,
                blockUserFlag,
                alredayAcceptFlag,
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
                  acceptFlag,
                  blockMeFlag,
                  notAvailableFlag,
                  deleteFlag,
                  blockUserFlag,
                  alredayAcceptFlag,
                });
              } else {
                notAvailableFlag = true;
                const myFollowingArr = myFollow[0].arrFollowing;
                const myFollowersArr = myFollow[0].arrFollowers;
                res.status(203).json({
                  msg: "Request not available",
                  acceptFlag,
                  blockMeFlag,
                  notAvailableFlag,
                  deleteFlag,
                  blockUserFlag,
                  alredayAcceptFlag,
                  myFollowingArr,
                  myFollowersArr,
                });
              }
            }
          }
        }
      } else {
        deleteFlag = true;
        res.status(203).json({
          msg: "User Not Available",
          acceptFlag,
          blockMeFlag,
          alredayAcceptFlag,
          notAvailableFlag,
          deleteFlag,
          blockUserFlag,
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
  accept,
};
