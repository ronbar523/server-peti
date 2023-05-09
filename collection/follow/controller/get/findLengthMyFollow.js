const FollowModelGet = require("../../model/functions/getFunctions");

const find = async (req, res) => {
  try {
    const myId = req.jwtData._id;

    const myFollow = await FollowModelGet.findFollowByCreatedBy(myId);

    const myArrFollowers = myFollow[0].arrFollowers;
    const myArrFollowing = myFollow[0].arrFollowing;
    const myArrFollowingRequest = myFollow[0].arrFollowingRequest;
    const myFollowersLength = myFollow[0].arrFollowers.length;
    const myFollowingLength = myFollow[0].arrFollowing.length;

    res.json({
      myArrFollowers,
      myArrFollowing,
      myArrFollowingRequest,
      myFollowersLength,
      myFollowingLength,
    });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

module.exports = {
  find,
};
