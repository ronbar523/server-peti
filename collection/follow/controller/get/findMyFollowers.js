const UserModelGet = require("../../../user/model/functions/getFunctions");
const FollowModelGet = require("../../model/functions/getFunctions");

const find = async (req, res) => {
  try {
    let { firstTime, skip, limit } = req.query;
    firstTime = /true/.test(firstTime);
    skip = Number(skip);
    limit = Number(limit);
    const myId = req.jwtData._id;

    const myFollow = await FollowModelGet.findFollowByCreatedBy(myId);
    const myFollowers = myFollow[0].arrFollowers;
    const myFollowing = myFollow[0].arrFollowing;

    let zeroFollowFlag = false;
    let arrUsers = [];

    if (myFollowers.length > 0) {
      if (firstTime) {
        const arrUsersId = [];
        for (let x = 0; x < myFollowers.length; x++) {
          const myFollowersId = myFollowers[x].toString();
          for (let y = 0; y < myFollowing.length; y++) {
            if (myFollowersId === myFollowing[y].toString()) {
              arrUsersId.push(myFollowersId);
              break;
            }
          }
        }

       

        if (arrUsersId.length < 6) {
          for (let x = 0; x < myFollowers.length; x++) {
            if (arrUsersId.length < 6) {
              const myFollowersId = myFollowers[x].toString();
              let flag = false;
              for (let y = 0; y < arrUsersId.length; y++) {
                if (myFollowersId === arrUsersId[y]) {
                  flag = true;
                  break;
                }
              }
              if (!flag) {
                arrUsersId.push(myFollowersId);
              }
            } else {
              break;
            }
          }
        }

       for (let x = 0; x < arrUsersId.length; x++) {
          arrUsers.push(await UserModelGet.findUserById(arrUsersId[x]));
        }
      } else {
        const arr = [];
        for (let x = skip; x < limit; x++) {
          if (myFollowers[x] !== undefined) {
            arr.push(myFollowers[x]);
          }
        }
        arrUsers = await UserModelGet.filterUsers(arr);
      }
    } else {
      zeroFollowFlag = true;
    }

    res.json({
      arrUsers: arrUsers,
      myFollowers: myFollowers,
      zeroFollowFlag: zeroFollowFlag,
    });
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
};

module.exports = {
  find,
};
