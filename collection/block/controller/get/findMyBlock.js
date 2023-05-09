const BlockModelGet = require("../../model/functions/getFunctinos");
const UserModelGet = require("../../../user/model/functions/getFunctions");

const find = async (req, res) => {
  try {
    const myId = req.jwtData._id;

    let { skip, limit } = req.query;

    let usersArr = [];
    let zeroFollowFlag = false;

    const myBlock = await BlockModelGet.findBlockByCreatedBy(myId);
    const arrMyBlock = myBlock[0].arrMyBlock;
    const totalBlockUser = arrMyBlock.length;

    if (arrMyBlock.length !== 0) {
      usersArr = await UserModelGet.findUsers(arrMyBlock, skip, limit);
    } else {
      zeroFollowFlag = true;
    }

    res.json({ usersArr, totalBlockUser, zeroFollowFlag });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

module.exports = {
  find,
};
