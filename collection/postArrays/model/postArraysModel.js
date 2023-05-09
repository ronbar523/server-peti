const mongoose = require("mongoose");

const postArraysSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },

  arrMySaveTextPost: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Post",
    },
  ],

  arrMySavePhoto: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Post",
    },
  ],

  arrMySaveVideo: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Post",
    },
  ],

  arrTagMeTextPost: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Post",
    },
  ],

  arrTagMePhoto: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Post",
    },
  ],

  arrTagMeVideo: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Post",
    },
  ],

  arrMyTextPost: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Post",
    },
  ],

  arrMyPhoto: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Post",
    },
  ],

  arrMyVideo: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Post",
    },
  ],
});

const PostArrays = mongoose.model("Post Arrays", postArraysSchema);

module.exports = {
  PostArrays,
};
