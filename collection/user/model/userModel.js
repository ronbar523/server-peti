const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  phone: {
    type: String,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  photo: {
    type: String,
    default:
      "44d94280-a709-4ca8-9247-26fd89f735b9-default-image.jpg",
  },
  password: {
    type: String,
    required: true,
  },
  public: {
    type: Boolean,
    default: true,
    required: true,
  },

  createdAt: {
    type: Number,
    required: true,
    default: Date.now,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  block: {
    type: Boolean,
    default: false,
  },
  verify: {
    type: Boolean,
    default: false,
  },

  userDeleteEmail: {
    type: String,
  },

  verifySecureNumber: {
    type: String,
  },

  passowrdSecureNumber: {
    type: String,
  },
  dateSecureNumber: {
    type: Date,
  },

});

const User = mongoose.model("users", userSchema);

module.exports = {
  User,
};
