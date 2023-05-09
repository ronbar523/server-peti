const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },

  arrFollowers: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
  ],
  arrFollowing: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
  ],

  arrFollowingRequest: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
  ],

  arrFollowersRequest: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
  ],
});

const Follow = mongoose.model("follow", followSchema);


module.exports = {
  Follow,
};
