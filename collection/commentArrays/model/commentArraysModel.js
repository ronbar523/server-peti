const mongoose = require("mongoose");

const commentArraysSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },

  arrTagMe: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Comment",
    },
  ],
});

const CommentArrays = mongoose.model("Comment Arrays", commentArraysSchema);

module.exports = {
  CommentArrays,
};
