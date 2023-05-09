const FollowModelGet = require("../../model/functions/getFunctions");

const find = async (req, res) => {
  try {
    const myId = req.jwtData._id;
    const follow = await FollowModelGet.findFollowByCreatedBy(myId);

    res.json(follow[0]);
    
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

module.exports = {
  find,
};
