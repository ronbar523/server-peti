const UserModelGet = require("../../model/functions/getFunctions");

const findUsers = async (req, res) => {
  try {
    let { arrUsers } = req.query;

    let arrUsersId = [];
    if (arrUsers.length > 0) {
      arrUsersId = arrUsers.split(",");
    }

    const usersArr = await UserModelGet.findTag(arrUsersId);

    res.json({ usersArr: usersArr });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

module.exports = {
  findUsers,
};
