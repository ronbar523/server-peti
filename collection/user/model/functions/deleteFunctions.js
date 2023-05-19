const { User } = require("../userModel");

const deleteMyUser = (
  id,
  userName,
  fullName,
  email,
  userDeleteEmail,
  photo
) => {
  return User.findByIdAndUpdate(
    id,
    {
      $set: {
        userName: userName,
        fullName: fullName,
        email: email,
        userDeleteEmail: userDeleteEmail,
        photo: photo,
      },
    },
    { new: true }
  );
};

module.exports = {
  deleteMyUser,
};
