const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
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

  category: {
    type: Array,
  },

  description: {
    type: String,
  },

  shortDescription: {
    type: String,
  },

  location: {
    type: String,
  },

  postKind: {
    type: String,
    required: true,
  },

  postPhoto: {
    type: String,
    required: true,
  },

  arrTag: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
  ],

  createdBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },

  lastUpdate: {
    type: Number,
  },

  createdAt: {
    type: Number,
    required: true,
    default: Date.now,
  },

  arrComments: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Comment",
    },
  ],

  arrCommentsForComments: [
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

  arrSaves: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
  ],
});

const Post = mongoose.model("posts", postSchema);

module.exports = {
  Post,
};
