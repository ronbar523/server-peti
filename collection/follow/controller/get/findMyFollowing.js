const UserModelGet = require("../../../user/model/functions/getFunctions");
const FollowModelGet = require("../../model/functions/getFunctions");

const find = async (req, res) => {
  try {
    const id = req.jwtData._id;

    let { skip, limit } = req.query;

    let usersArr = [];
    let zeroFollowFlag = false;

    const myFollow = await FollowModelGet.findFollowByCreatedBy(id);
    const myFollowing = myFollow[0].arrFollowing;

    if (myFollowing.length !== 0) {
      usersArr = await UserModelGet.findUsers(myFollowing, skip, limit);
    } else {
      zeroFollowFlag = true;
    }

    res.json({
      zeroFollowFlag,
      usersArr,
      myFollowing
    });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

module.exports = {
  find,
};
