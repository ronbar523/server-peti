const { Like } = require("../likeModel");

const createLike = async (createdBy, arrPostLikes, arrCommentLikes) => {
  const newLike = new Like({
    createdBy,
    arrPostLikes,
    arrCommentLikes,
  });
  return newLike.save();
};

module.exports = {
  createLike,
};
