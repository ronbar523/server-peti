const { Like } = require("../likeModel");

const newLikePost = (createdBy, arrPostLikes) => {
  return Like.findOneAndUpdate(
    { createdBy: createdBy },
    {
      $push: {
        arrPostLikes: {
          $each: [arrPostLikes],
          $position: 0,
        },
      },
    },
    { new: true }
  );
};

const unLikePost = (createdBy, arrPostLikes) => {
  return Like.findOneAndUpdate(
    { createdBy: createdBy },
    {
      $pull: { arrPostLikes: arrPostLikes },
    },
    { new: true }
  );
};

const newLikeComment = (createdBy, arrCommentLikes) => {
  return Like.findOneAndUpdate(
    { createdBy: createdBy },
    {
      $push: {
        arrCommentLikes: {
          $each: [arrCommentLikes],
          $position: 0,
        },
      },
    },
    { new: true }
  );
};

const unLikeComment = (createdBy, arrCommentLikes) => {
  return Like.findOneAndUpdate(
    { createdBy: createdBy },
    {
      $pull: { arrCommentLikes: arrCommentLikes },
    },
    { new: true }
  );
};

module.exports = {
  newLikePost,
  unLikePost,
  newLikeComment,
  unLikeComment,
};
