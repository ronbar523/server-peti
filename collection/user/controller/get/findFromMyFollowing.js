const UserModelGet = require("../../model/functions/getFunctions");
const FollowModelGet = require("../../../follow/model/functions/getFunctions");

const findUsers = async (req, res) => {
  try {
    let { limit } = req.query;
    const myId = req.jwtData._id;

    const myFollow = await FollowModelGet.findFollowByCreatedBy(myId);

    const myFollowing = myFollow[0].arrFollowing;

    let usersArr = await UserModelGet.findFollowersForTag(
      myFollowing,
      0,
      limit
    );

    if (usersArr.length < 10) {
      const limit = 10 - usersArr.length;
      let moreUsers = await UserModelGet.findAllUsers(0, limit);

      for (let x = 0; x < moreUsers.length; x++) {
        if (moreUsers[x].userName !== "User Not Available") {
          let flag = false;
          const newUserId = moreUsers[x]._id.toString();
          for (let y = 0; y < usersArr.length; y++) {
            if (newUserId === usersArr[y]._id.toString()) {
              flag = true;
              break;
            }
          }
          if (!flag) {
            usersArr.push(moreUsers[x]);
          }
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
