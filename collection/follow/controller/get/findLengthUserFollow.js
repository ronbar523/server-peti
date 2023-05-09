const FollowModelGet = require("../../model/functions/getFunctions");

const find = async (req, res) => {
  try {
    const { id } = req.params

    const follow = await FollowModelGet.findFollowByCreatedBy(id);

    const followersLength = follow[0].arrFollowers.length;
    const followingLength = follow[0].arrFollowing.length;

    res.json({
      followersLength,
      followingLength,
    });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

module.exports = {
  find,
};
