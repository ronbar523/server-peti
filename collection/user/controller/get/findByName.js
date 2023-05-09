const UserModelGet = require("../../model/functions/getFunctions");

const findUsers = async (req, res) => {
  try {
    const { firstName, lastName, userName, fullName, skip, limit } = req.query;

    const usersArr = await UserModelGet.findByName(
      firstName,
      lastName,
      userName,
      fullName,
      skip,
      limit
    );


    res.json( usersArr );
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

module.exports = {
  findUsers,
};
