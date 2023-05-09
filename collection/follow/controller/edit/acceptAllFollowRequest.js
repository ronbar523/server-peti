const UserModelGet = require("../../../user/model/functions/getFunctions");
const FollowModelGet = require("../../model/functions/getFunctions")
const FollowModelEdit = require("../../model/functions/editFunctions")


const acceptAll = async (req, res) => {
  try {
    const myId = req.jwtData._id;
    const myFollow = await FollowModelGet.findFollowByCreatedBy(myId);
    const myFollowId = myFollow[0]._id;
    let { countRequest } = req.query;
    countRequest = Number(countRequest);
    const userArr = [];

    const myArrFollowersRequest = myFollow[0].arrFollowersRequest;


    if (myArrFollowersRequest.length < countRequest) {
      countRequest = myArrFollowersRequest.length;
    } 

    const myArrFollowersRequestReverse = myArrFollowersRequest.reverse();

    for (let x = 0; x < countRequest; x++) {
      const userId = myArrFollowersRequestReverse[x]

      await FollowModelEdit.sendFollowingByCreatedBy(userId, myId);
      await FollowModelEdit.unFollowingRequestByCreatedBy(userId, myId);

      await FollowModelEdit.receiveFollowers(myFollowId, userId);
      await FollowModelEdit.unFollowersRequest(myFollowId, userId);

      userArr.unshift(myArrFollowersRequest[x]);
    }

    const requestUserArr = await UserModelGet.findUsers(
      userArr,
      0,
      userArr.length
    );


    const myFollowAfterAccept = await FollowModelGet.findFollowByCreatedBy(myId);

    res.json({
      status: 200,
      msg: "You accept all the requests",
      requestUserArr,
      myFollowAfterAccept,
    });
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
};

module.exports = {
  acceptAll,
};
