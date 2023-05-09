const UserModelGet = require("../../model/functions/getFunctions");

const findUser = async (req, res) => {
  try {
    let { userName } = req.params;
    
    const user = await UserModelGet.findUserByUserName(userName);

    if (user.length > 0) {
      res.json(user[0]);
    } else {
      res.json({ msg: "User Name not exist" });
    }
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
};

module.exports = {
  findUser,
};
