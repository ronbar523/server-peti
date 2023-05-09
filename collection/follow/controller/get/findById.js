const FollowModelGet = require("../../model/functions/getFunctions");


const find = async (req, res) => {
  try {
    const { id } = req.params;
    const follow = await FollowModelGet.findFollowByCreatedBy(id);

    res.json(follow[0]);
    
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

module.exports = {
  find,
};
