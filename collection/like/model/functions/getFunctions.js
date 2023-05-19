const { Like } = require("../likeModel");

const findLikeByCreatedBy = (createdBy) => {
  return Like.find({ createdBy: createdBy });
};

module.exports = {
  findLikeByCreatedBy,
};
