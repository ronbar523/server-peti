const UserModelEdit = require("../../model/functions/editFunctions");
const FollowModelGet = require("../../../follow/model/functions/getFunctions");
const FollowModelEdit = require("../../../follow/model/functions/editFunctions");

const changePublic = async (req, res) => {
  try {
    const id = req.jwtData._id;

    let { status } = req.query;
    status = /true/.test(status);

    await UserModelEdit.editPublic(id, status);

    if (status) {
      const myFollow = await FollowModelGet.findFollowByCreatedBy(id);

      if (myFollow[0].arrFollowersRequest.length > 0) {
        const myUserId = myFollow[0].createdBy;
        const myFollowId = myFollow[0]._id;

        const myRequestArr = myFollow[0].arrFollowersRequest;

        for (let x = 0; x < myRequestArr.length; x++) {
         
          const userId = myRequestArr[x];

          await FollowModelEdit.sendFollowingByCreatedBy(userId, myUserId);
          await FollowModelEdit.unFollowingRequestByCreatedBy(userId, myUserId);

          await FollowModelEdit.receiveFollowers(myFollowId, userId);
          await FollowModelEdit.unFollowersRequest(myFollowId, userId);

        }
      }
    }

    const myFollow = await FollowModelGet.findFollowByCreatedBy(id);

    res.json({
      status: 200,
      msg: "your account status cahnged",
      public: status,
      myFollow,
    });
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
};

module.exports = {
  changePublic,
};
