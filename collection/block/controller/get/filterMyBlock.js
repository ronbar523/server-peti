const BlockModelGet = require("../../model/functions/getFunctinos");
const UserModelGet = require("../../../user/model/functions/getFunctions");

const filter = async (req, res) => {
  try {
    let { filter } = req.query;
    filter = filter.toLowerCase();

    const myId = req.jwtData._id;

    const myBlock = await BlockModelGet.findBlockByCreatedBy(myId);
    const myBlockArr = myBlock[0].arrMyBlock;

    let arrUsers = [];

    arrUsers = await UserModelGet.filterUsers(myBlockArr);

    const filterArr = arrUsers.filter((users) =>
      users.userName.toLowerCase().startsWith(filter)
    );

    res.status(200).json({ filterArr: filterArr });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

module.exports = {
    filter,
};
