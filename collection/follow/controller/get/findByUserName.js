const UserModelGet = require("../../../user/model/functions/getFunctions");
const FollowModelGet = require("../../model/functions/getFunctions");

const find = async (req, res) => {
  try {
    const { userName } = req.params;
    const user = await UserModelGet.findUserByUserName(userName)
    const userId = user[0]._id
    const follow = await FollowModelGet.findFollowByCreatedBy(userId);

    res.json(follow[0]);
    
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

module.exports = {
  find,
};
