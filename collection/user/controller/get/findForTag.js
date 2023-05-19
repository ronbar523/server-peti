const UserModelGet = require("../../model/functions/getFunctions");
const FollowModelGet = require("../../../follow/model/functions/getFunctions");
const BlockModelGet = require("../../../block/model/functions/getFunctinos");

const findUsers = async (req, res) => {
  try {
    let { userName, limit } = req.query;
    const myId = req.jwtData._id;
    userName = userName.toLowerCase();

    const myFollow = await FollowModelGet.findFollowByCreatedBy(myId);
    const myFollowing = myFollow[0].arrFollowing;

    let usersArr = [];

    let myFollowingUsers = await UserModelGet.findFollowersForTag(
      myFollowing,
      0,
      myFollowing.length
    );

    for (let x = 0; x < myFollowingUsers.length; x++) {
      if (myFollowingUsers[x].userName.toLowerCase().startsWith(userName)) {
        usersArr.push(myFollowingUsers[x]);
      }
    }

    // Find More Users That Not Exist In My Following
    if (usersArr.length < limit) {
      const myBlock = await BlockModelGet.findBlockByCreatedBy(myId);
      const myBlockArr = myBlock[0].arrMyBlock;
      const blockMeArr = myBlock[0].arrBlockMe;

      const moreUsers = await UserModelGet.findForTag(userName, limit);
      for (let y = 0; y < moreUsers.length; y++) {
        let flag = false;
        if (usersArr.length <= limit) {
          if (moreUsers[y].userName !== "User Not Available") {
            const userId = moreUsers[y]._id.toString();
            for (let x = 0; x < usersArr.length; x++) {
              if (moreUsers[y].userName === usersArr[x].userName) {
                flag = true;
                break;
              }
            }
            if (!flag) {
              if (userId !== myId) {
                for (let x = 0; x < myBlockArr.length; x++) {
                  if (myBlockArr[x].toString() === userId) {
                    flag = true;
                    break;
                  }
                }
                if (!flag) {
                  for (let x = 0; x < blockMeArr.length; x++) {
                    if (blockMeArr[x].toString() === userId) {
                      flag = true;
                      break;
                    }
                  }
                  usersArr.push(moreUsers[y]);
                }
              }
            }
          }
        } else {
          break;
        }
      }
    }


    res.json(usersArr);
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

module.exports = {
  findUsers,
};
