const PostModelGet = require("../../model/functions/getFunctions");
const FollowModelGet = require("../../../follow/model/functions/getFunctions");
const UserModelGet = require("../../../user/model/functions/getFunctions");
const Jwt = require("../../../../config/jwt");

const findLikes = async (req, res) => {
  try {
    let { id } = req.params;
    let { firstTime, skip, limit } = req.query;
    firstTime = /true/.test(firstTime);
    skip = Number(skip);
    limit = Number(limit);

    const post = await PostModelGet.findPostById(id);

    if (post === null) {
      res.status(410).json({ msg: "Post deleted" });
    } else {
      const arrLikes = post.arrLikes;
      let zeroLikesFlag = false;
      let arrUsers = [];
      let countLikes = arrLikes.length;

      if (arrLikes.length === 0) {
        zeroLikesFlag = true;
      } else {
        if (req.headers.token !== undefined) {
          req.jwtData = await Jwt.verifyToken(req.headers.token);
          const myId = req.jwtData._id;
          const myFollow = await FollowModelGet.findFollowByCreatedBy(myId);

          const myFollowing = myFollow[0].arrFollowing;

          if (firstTime) {
            const arrUsersId = [];
            if (myFollowing.length > 0 && arrLikes.length > 0) {
              if (myFollowing.length > arrLikes.length) {
                for (let x = 0; x < arrLikes.length; x++) {
                  const userLikeId = arrLikes[x].toString();
                  for (let y = 0; y < myFollowing.length; y++) {
                    if (userLikeId === myFollowing[y].toString()) {
                      if (userLikeId !== myId) {
                        arrUsersId.push(userLikeId);
                      }
                      break;
                    }
                  }
                }
              } else {
                for (let x = 0; x < myFollowing.length; x++) {
                  const followId = myFollowing[x].toString();
                  for (let y = 0; y < arrLikes.length; y++) {
                    if (followId === arrLikes[y].toString()) {
                      if (followId !== myId) {
                        arrUsersId.push(followId);
                      }
                      break;
                    }
                  }
                }
              }
            } 

            if (arrUsersId.length < 6 && !zeroLikesFlag) {
             
              for (let x = 0; x < arrLikes.length; x++) {
                if (arrUsersId.length < 6) {
                  const userLikeId = arrLikes[x].toString();
                  let flag = false;
                  for (let y = 0; y < myFollowing.length; y++) {
                    if (userLikeId === myFollowing[y].toString()) {
                      flag = true;
                      break;
                    }
                  }
                  if (!flag) {
                    if (userLikeId !== myId) {
                      arrUsersId.push(userLikeId);
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
              if (arrLikes[x] !== undefined) {
                arr.push(arrLikes[x]);
              }
            }
            arrUsers = await UserModelGet.filterUsers(arr);
          }
        } else {
          const arr = [];
          for (let x = skip; x < limit; x++) {
            if (arrLikes[x] !== undefined) {
              arr.push(arrLikes[x]);
            }
          }

          arrUsers = await UserModelGet.filterUsers(arr);
        }
      }

      res.json({
        arrUsers: arrUsers,
        zeroLikesFlag: zeroLikesFlag,
        countLikes: countLikes,
      });
    }
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
};

module.exports = {
  findLikes,
};
