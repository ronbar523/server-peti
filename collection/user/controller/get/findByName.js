const UserModelGet = require("../../model/functions/getFunctions");

const findUsers = async (req, res) => {
  try {
    const { firstName, lastName, userName, fullName, skip, limit } = req.query;
    let arr = [];
    let usersArr = [];

    arr = await UserModelGet.findByName(
      firstName,
      lastName,
      userName,
      fullName,
      skip,
      limit
    );

    for (let x = 0; x < arr.length; x++) {
      if (arr[x].userName !== "User Not Available") {
        usersArr.push(arr[x]);
      }
    }

    res.json(usersArr);
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

module.exports = {
  findUsers,
};
