const mongoose = require("mongoose");

const blockSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },

  arrMyBlock: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
  ],
  arrBlockMe: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
  ],
});

const Block = mongoose.model("block", blockSchema);


module.exports = {
  Block
};
