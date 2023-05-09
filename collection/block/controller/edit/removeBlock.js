const UserModelGet = require("../../../user/model/functions/getFunctions")
const BlockModelEdit = require("../../model/functions/editFunctions");
const BlockModelGet = require("../../model/functions/getFunctinos");

const unBlock = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModelGet.findUserById(id);
    const userId = user._id;
    const strUserId = userId.toString();
    let userDeletedFlag = false;
    let UserBlockedFlag = false;

    const myId = req.jwtData._id;

    if (strUserId !== myId) {
      if (user.userName !== "User Not Available") {
        const myBlock = await BlockModelGet.findBlockByCreatedBy(myId);
        const userBlock = await BlockModelGet.findBlockByCreatedBy(strUserId);

        const myArrMyBlock = myBlock[0].arrMyBlock;
        const userArrBlockMe = userBlock[0].arrBlockMe;

        const myBlockId = myBlock[0]._id;
        const userBlockId = userBlock[0]._id;

        if (myArrMyBlock.length > 0 && userArrBlockMe.length > 0) {
          if (myArrMyBlock.length >= userArrBlockMe) {
            for (let x = 0; x < userArrBlockMe.length; x++) {
              if (userArrBlockMe[x].toString() === myId) {
                UserBlockedFlag = true;
                break;
              }
            }
          } else {
            for (let x = 0; x < myArrMyBlock.length; x++) {
              if (myArrMyBlock[x].toString() === strUserId) {
                UserBlockedFlag = true;
                break;
              }
            }

            if (UserBlockedFlag) {
              await BlockModelEdit.userUnBlock(userBlockId, myId);
              await BlockModelEdit.unBlockUser(myBlockId, userId);
              res.json({ msg: "unBlcok", userDeletedFlag });
            } else {
              res.status(203).json({ msg: "you not block this user"})
            }
          }
        } else {
          res.status(203).json({ msg: "you not block this user"})
        }
      } else {
        res.status(203).json({ msg: "User Not Available", userDeletedFlag });
      }
    } else {
      throw "You can't block yourself";
    }
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
};

module.exports = {
  unBlock,
};
