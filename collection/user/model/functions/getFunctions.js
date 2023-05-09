const { User } = require("../userModel");

const findUserById = (id) => {
  return User.findById(id);
};

const findUserByEmail = (email) => {
  return User.find({
    email: { $regex: "^" + email.toString() + "$", $options: "i" },
  });
};

const findUserByUserName = (userName) => {
  return User.find({
    userName: { $regex: "^" + userName.toString() + "$", $options: "i" },
  });
};

const findUsers = (arr, skip, limit) => {
  return User.find({
    _id: { $in: arr },
  })
    .skip(skip)
    .limit(limit);
};

const findTag = (arrTag) => {
  return User.find({
    _id: { $in: arrTag },
  }).select(["userName", "photo", "fullName", "public"]);
};

const findByName = (firstName, lastName, userName, fullName, skip, limit) => {
  return User.find({
    $or: [
      { firstName: { $regex: "^" + firstName.toString(), $options: "i" } },
      { lastName: { $regex: "^" + lastName.toString(), $options: "i" } },
      { userName: { $regex: "^" + userName.toString(), $options: "i" } },
      { fullName: { $regex: "^" + fullName.toString(), $options: "i" } },
    ],
  })
    .select(["-password", "-__v"])
    .skip(skip)
    .limit(limit);
};

const findFollowersForTag = (arrFollowers, skip, limit) => {
  return User.find({
    _id: { $in: arrFollowers },
  })
    .skip(skip)
    .limit(limit)
    .select(["userName", "photo", "fullName"]);
};

const findForTag = (userName, limit) => {
  return User.find({
    userName: { $regex: "^" + userName.toString(), $options: "i" },
  })
    .limit(limit)
    .select(["userName", "photo", "fullName"]);
};

const filterUsers = (arr) => {
  return User.find({
    _id: { $in: arr },
  });
};

const findAllUsers = (skip, limit) => {
  return User.find().skip(skip).limit(limit);
};

module.exports = {
  findUserById,
  findUserByEmail,
  findUsers,
  findUserByUserName,
  findByName,
  findFollowersForTag,
  findForTag,
  findTag,
  filterUsers,
  findAllUsers
};
