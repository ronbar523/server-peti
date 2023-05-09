const UserModelGet = require("../../../user/model/functions/getFunctions");
const FollowModelGet = require("../../model/functions/getFunctions");

const filterFollowersRequest = async (req, res) => {
  try {
    let { filter } = req.query;
    filter = filter.toLowerCase();

    const myId = req.jwtData._id;

    const myFollow = await FollowModelGet.findFollowByCreatedBy(myId);
    const arrFollowersRequest = myFollow[0].arrFollowersRequest;

    let arrUsers = [];

    arrUsers = await UserModelGet.filterUsers(arrFollowersRequest);

    const filterArr = arrUsers.filter((users) =>
      users.userName.toLowerCase().startsWith(filter)
    );

    res.status(200).json({ filterArr: filterArr });
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
};

module.exports = {
  filterFollowersRequest,
};
