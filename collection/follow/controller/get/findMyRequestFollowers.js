const UserModelGet = require("../../../user/model/functions/getFunctions");
const FollowModelGet = require("../../model/functions/getFunctions");

const find = async (req, res) => {
  try {
    let { skip, limit } = req.query;
    const myId = req.jwtData._id;
    const myFollow = await FollowModelGet.findFollowByCreatedBy(myId);

    const myFollowersRequest = myFollow[0].arrFollowersRequest;
    const totalRequest = myFollowersRequest.length;

    let zeroFollowFlag = false
    let usersArr = []

    if (myFollowersRequest.length !== 0) {
      usersArr = await UserModelGet.findUsers(myFollowersRequest, skip, limit);
    } else {
      zeroFollowFlag = true;
    }


    res.json({ usersArr, myFollowersRequest, totalRequest, zeroFollowFlag });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

module.exports = {
  find,
};
