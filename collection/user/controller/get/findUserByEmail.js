const UserModelGet = require("../../model/functions/getFunctions");

const findUser = async (req, res) => {
  try {
    const { email } = req.params;

    const user = await UserModelGet.findUserByEmail(email);

    if (user.length > 0) {
      res.json({ status: 203, msg: "Email exist" });
    } else {
      res.json({ msg: "Email not exist" });
    }
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
};

module.exports = {
  findUser,
};
