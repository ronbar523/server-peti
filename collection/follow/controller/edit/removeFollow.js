const UserModelGet = require("../../../user/model/functions/getFunctions");
const FollowModelGet = require("../../model/functions/getFunctions");
const FollowModelEdit = require("../../model/functions/editFunctions");
const BlockModelGet = require("../../../block/model/functions/getFunctinos");

const unFollow = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModelGet.findUserById(id);
    const userId = user._id;
    const myId = req.jwtData._id;
    const userName = user.userName;

    let followFlag = false;
    let blockMeFlag = false;
    let deleteFlag = false;

    if (id !== myId) {
      if (userName !== "User Not Available") {
        const myFollow = await FollowModelGet.findFollowByCreatedBy(myId);
        const userFollow = await FollowModelGet.findFollowByCreatedBy(id);

        const myArrFollowing = myFollow[0].arrFollowing;
        const userArrFollowers = userFollow[0].arrFollowers;

        const myFollowId = myFollow[0]._id;
        const userFollowId = userFollow[0]._id;

        if (myArrFollowing.length > 0 && userArrFollowers.length > 0) {
          if (myArrFollowing.length >= userArrFollowers.length) {
            for (let x = 0; x < userArrFollowers.length; x++) {
              if (userArrFollowers[x].toString() === myId) {
                followFlag = true;
                break;
              }
            }
          } else {
            for (let x = 0; x < myArrFollowing.length; x++) {
              if (myArrFollowing[x].toString() === id) {
                followFlag = true;
                break;
              }
            }
          }
        }


        if (followFlag) {
          followFlag = false;
          await FollowModelEdit.unFollowers(userFollowId, myId);
          await FollowModelEdit.unFollowing(myFollowId, userId);

          res.json({
            status: 200,
            msg: "unFollow",
            followFlag,
            blockMeFlag,
            deleteFlag,
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
                  res
                    .status(203)
                    .json({
                      msg: "User blocked you",
                      followFlag,
                      blockMeFlag,
                      deleteFlag,
                    });
                  break;
                }
              }
            } else {
              for (let x = 0; x < myBlockMeArr.length; x++) {
                if (myBlockMeArr[x].toString() === id) {
                  blockMeFlag = true;
                  followFlag = false;
                  res
                    .status(203)
                    .json({
                      msg: "User blocked you",
                      followFlag,
                      blockMeFlag,
                      deleteFlag,
                    });
                  break;
                }
              }
            }
          }

          if (!blockMeFlag) {
            res.status(203).json({
              msg: "Follow not Available",
              followFlag,
              blockMeFlag,
              deleteFlag,
            });
          }
        }
      } else {
        deleteFlag = true;
        res.status(203).json({
          msg: "User not vailable",
          followFlag,
          blockMeFlag,
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
  unFollow,
};
