const UserModelGet = require("../../model/functions/getFunctions");
const FollowModelGet = require("../../../follow/model/functions/getFunctions");

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
      if (usersArr.length <= limit) {
        if (myFollowingUsers[x].userName.toLowerCase().startsWith(userName)) {
          usersArr.push(myFollowingUsers[x]);
        }
      }
    }

    // Find More Users That Not Exist In My Following

    const moreUsers = await UserModelGet.findForTag(userName, limit + 3);

    usersArr = [...usersArr, moreUsers];

    res.json(usersArr);
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

module.exports = {
  findUsers,
};
