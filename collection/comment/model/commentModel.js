const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  createdByName: {
    type: String,
    required: true,
  },

  createdByFullName: {
    type: String,
    required: true,
  },

  userProfile: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  shortDescription: {
    type: String,
    required: true,
  },

  arrTag: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
  ],

  postId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Post",
    required: true,
  },

  createdBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },

  commentIdCreated : {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Comment",
  },

  createdAt: {
    type: Number,
    required: true,
    default: Date.now,
  },

  lastUpdate: {
    type: Number,
  },

  arrComments: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Comment",
    },
  ],

  arrLikes: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
  ],
});

const Comment = mongoose.model("comments", commentSchema);

module.exports = {
  Comment,
};
