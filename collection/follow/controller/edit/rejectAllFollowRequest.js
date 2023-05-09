const FollowModelGet = require("../../model/functions/getFunctions");
const FollowModelEdit = require("../../model/functions/editFunctions")


const rejectAll = async (req, res) => {
  try {
    const myId = req.jwtData._id;
    const myFollow = await FollowModelGet.findFollowByCreatedBy(myId);
    const myFollowId = myFollow[0]._id;
    let { countRequest } = req.query;
    countRequest = Number(countRequest);

    const myArrFollowersRequest = myFollow[0].arrFollowersRequest;
    const myUserId = myFollow[0].createdBy;

    if (myArrFollowersRequest.length < countRequest) {
      countRequest = myArrFollowersRequest.length;
    }

    const myArrFollowersRequestReverse = myArrFollowersRequest.reverse();

    for (let x = 0; x < countRequest; x++) {

      const userId = myArrFollowersRequestReverse[x]

      await FollowModelEdit.unFollowingRequestByCreatedBy(userId, myUserId);
      await FollowModelEdit.unFollowersRequest(
        myFollowId,
        userId
      );
    }

    res.json({
      status: 200,
      msg: "You reject all the requests",
    });
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
};

module.exports = {
  rejectAll,
};
