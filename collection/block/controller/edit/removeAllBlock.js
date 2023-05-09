const BlockModelGet = require("../../model/functions/getFunctinos");
const BlockModelEdit = require("../../model/functions/editFunctions");

const unBlockAll = async (req, res) => {
  try {
    const myId = req.jwtData._id;
    const myBlock = await BlockModelGet.findBlockByCreatedBy(myId);
    const myBlockId = myBlock[0]._id;

    const myBlockArr = myBlock[0].arrMyBlock;

    if (myBlockArr.length === 0) {
      throw "you block list it's emptey";
    }

    for (let x = 0; x < myBlockArr.length; x++) {
      const userId = myBlockArr[x]

      await BlockModelEdit.userUnBlockByCreatedBy(userId, myId);
      await BlockModelEdit.unBlockUser(myBlockId, userId);
    }

    res.json({ msg: "You remove your block list" });
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
};

module.exports = {
  unBlockAll,
};
