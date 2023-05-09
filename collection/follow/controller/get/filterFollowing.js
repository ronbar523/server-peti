const UserModelGet = require("../../../user/model/functions/getFunctions");
const FollowModelGet = require("../../model/functions/getFunctions");

const filterFollowing = async (req, res) => {
  try {
    let { id } = req.params
    let { filter } = req.query;
    filter = filter.toLowerCase();


    const userFollow = await FollowModelGet.findFollowByCreatedBy(id);
    const userFollowing = userFollow[0].arrFollowing;

    let arrUsers = [];

    arrUsers = await UserModelGet.filterUsers(userFollowing);

    const filterArr = arrUsers.filter((users) =>
      users.userName.toLowerCase().startsWith(filter)
    );

    res.status(200).json({ filterArr: filterArr });
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
};

module.exports = {
  filterFollowing,
};
