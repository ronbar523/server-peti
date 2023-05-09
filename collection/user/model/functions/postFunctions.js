const { User } = require("../userModel");

const createUser = async (
  firstName,
  lastName,
  fullName,
  userName,
  bio,
  phone,
  dateOfBirth,
  gender,
  email,
  photo,
  password,
  verifySecureNumber,
  public,
  createdAt,
  isAdmin,
  block,
  verify,
) => {
  const newUser = new User({
    firstName,
    lastName,
    fullName,
    userName,
    bio,
    phone,
    dateOfBirth,
    gender,
    email,
    photo,
    password,
    verifySecureNumber,
    public,
    createdAt,
    isAdmin,
    block,
    verify,
  });
  return (
    newUser.save()
  );
};


module.exports = {
  createUser,
};
