const { User } = require("../userModel");

const verifyUser = (email) => {
  return User.updateOne({ email }, { verify: true, verifySecureNumber: null });
};

const editUserName = (id, { userName }) => {
  return User.findByIdAndUpdate(
    id,
    { $set: { userName: userName } },
    { new: true }
  );
};

const editNameUser = (id, { firstName, lastName, fullName }) => {
  return User.findByIdAndUpdate(
    id,
    { $set: { firstName: firstName, lastName: lastName, fullName: fullName } },
    { new: true }
  );
};

const editNameUserForAdmin = (userName, { firstName, lastName, fullName }) => {
  return User.findOneAndUpdate(
    { userName: userName },
    { $set: { firstName: firstName, lastName: lastName, fullName: fullName } },
    { new: true }
  );
};

const editUserProfilePhoto = (id, photo) => {
  return User.findByIdAndUpdate(id, { $set: { photo: photo } }, { new: true });
};

const editUserProfilePhotoForAdmin = (userName, photo) => {
  return User.findOneAndUpdate(
    { userName: userName },
    { $set: { photo: photo } },
    { new: true }
  );
};

const editBio = (id, { bio }) => {
  return User.findByIdAndUpdate(id, { $set: { bio: bio } }, { new: true });
};

const editEmail = (id, { email }, verifySecureNumber) => {
  return User.findByIdAndUpdate(
    id,
    {
      $set: {
        email: email,
        verifySecureNumber: verifySecureNumber,
        verify: false,
      },
    },
    { new: true }
  );
};

const editPublic = (id, public) => {
  return User.findByIdAndUpdate(
    id,
    { $set: { public: public } },
    { new: true }
  );
};

const editRecoveryParams = (email, passowrdSecureNumber, dateSecureNumber) => {
  return User.updateOne({ email }, { passowrdSecureNumber, dateSecureNumber });
};

const editPassword = (id, password) => {
  return User.findByIdAndUpdate(
    id,
    { $set: { password: password } },
    { new: true }
  );
};

const resetPassword = (email, password) => {
  return User.updateOne(
    { email },
    { password, passowrdSecureNumber: null, dateSecureNumber: null }
  );
};



module.exports = {
  verifyUser,
  editUserName,
  editNameUser,
  editNameUserForAdmin,
  editUserProfilePhoto,
  editUserProfilePhotoForAdmin,
  editBio,
  editEmail,
  editPublic,
  editRecoveryParams,
  editPassword,
  resetPassword,
  
};
