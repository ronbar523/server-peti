const UserModelEdit = require("../../model/functions/editFunctions");
const UserModelGet = require("../../model/functions/getFunctions");

const verify = async (req, res) => {
  try {
    const { email, verifySecureNumber } = req.query;

    const user = await UserModelGet.findUserByEmail(email);

    if (user.length > 0) {
      if(!user.verify){

        if (verifySecureNumber === user[0].verifySecureNumber) {
          const verify = true;
          await UserModelEdit.verifyUser(email, verify);
          res.json({ msg: "The account is approved" });
        } else {
          throw "Request not available";
        }
      } else {
        res.status(203).json({ msg: "account already approved"})
      }
    } else {
      throw "Email not exist";
    }
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

module.exports = {
  verify,
};
