const UserModelGet = require("../../../user/model/functions/getFunctions");
const FollowModelGet = require("../../model/functions/getFunctions");
const Jwt = require("../../../../config/jwt");

const find = async (req, res) => {
  try {
    let { id } = req.params;
    let { firstTime, skip, limit } = req.query;
    firstTime = /true/.test(firstTime);
    skip = Number(skip);
    limit = Number(limit);

    const follow = await FollowModelGet.findFollowByCreatedBy(id);

    const userArrFollowers = follow[0].arrFollowers;
    const userArrFollowing = follow[0].arrFollowing;
    let arrUsers = [];
    let countFollowers = userArrFollowers.length;
    let countFollowing = userArrFollowing.length;

    if (countFollowers !== 0) {
      if (req.headers.token !== undefined) {
        req.jwtData = await Jwt.verifyToken(req.headers.token);
        const myId = req.jwtData._id;
        const myFollow = await FollowModelGet.findFollowByCreatedBy(myId);

        const myFollowing = myFollow[0].arrFollowing;

        if (firstTime) {
          const arrUsersId = [];
          if (myFollowing.length > 0 && userArrFollowers.length > 0) {
            if (myFollowing.length > userArrFollowers.length) {
              for (let x = 0; x < userArrFollowers.length; x++) {
                const userFollowersId = userArrFollowers[x].toString();
                for (let y = 0; y < myFollowing.length; y++) {
                  if (userFollowersId === myFollowing[y].toString()) {
                    if (userFollowersId !== myId) {
                      arrUsersId.push(userFollowersId);
                    }
                    break;
                  }
                }
              }
            } else {
              for (let x = 0; x < myFollowing.length; x++) {
                const followId = myFollowing[x].toString();
                for (let y = 0; y < userArrFollowers.length; y++) {
                  if (followId === userArrFollowers[y].toString()) {
                    if (followId !== myId) {
                      arrUsersId.push(followId);
                    }
                    break;
                  }
                }
              }
            }

            if (arrUsersId.length < 6) {
              for (let x = 0; x < userArrFollowers.length; x++) {
                if (arrUsersId.length < 6) {
                  const userFollowersId = userArrFollowers[x].toString();
                  let flag = false;
                  for (let y = 0; y < myFollowing.length; y++) {
                    if (userFollowersId === myFollowing[y].toString()) {
                      flag = true;
                      break;
                    }
                  }
                  if (!flag) {
                    if (userFollowersId !== myId) {
                      arrUsersId.push(userFollowersId);
                    }
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
              if (userArrFollowers[x] !== undefined) {
                arr.push(userArrFollowers[x]);
              }
            }
            arrUsers = await UserModelGet.filterUsers(arr);
          }
        } else {
          const arr = [];
          for (let x = skip; x < limit; x++) {
            if (userArrFollowers[x] !== undefined) {
              arr.push(userArrFollowers[x]);
            }
          }

          arrUsers = await UserModelGet.filterUsers(arr);
        }
      }
    }

    res.json({
      arrUsers: arrUsers,
      countFollowers: countFollowers,
      countFollowing: countFollowing,
    });
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
};

module.exports = {
  find,
};
