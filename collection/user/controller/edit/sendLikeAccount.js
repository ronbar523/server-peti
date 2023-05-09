const UserModelEdit = require("../../model/functions/editFunctions");
const UserModelGet = require("../../model/functions/getFunctions");

const sendLikeAccount = async (req, res) => {
  try {
    const { userName } = req.params;

    const user = await UserModelGet.findUserByUserName(userName);

    const myId = req.jwtData._id;

    if (user[0].arrMyUserLike.length > 0) {
      user[0].arrMyUserLike.forEach((item) => {
        if (item.toString() === myId) {
          throw "you already did like for this user";
        }
      });
    }

    const countMyLike = user[0].countMyLike + 1;

    await UserModelEdit.sendLike(user[0]._id, myId);
    await UserModelEdit.editCountMyLike(user[0]._id, countMyLike);
    res.json({ status: 200, msg: "new like" });
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
};

module.exports = {
  sendLikeAccount,
};
