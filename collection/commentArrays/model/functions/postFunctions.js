const { CommentArrays } = require("../commentArraysModel");

const createCommentArrays = (createdBy, arrTagMe) => {
  const newCommentArray = new CommentArrays({
    createdBy,
    arrTagMe,
  });
  return newCommentArray.save();
};

const tagMe = (createdBy, arrTagMe) => {
  return CommentArrays.findOneAndUpdate(
    {createdBy: createdBy},
    {
      $push: { arrTagMe: arrTagMe },
    },
    { new: true }
  );
};

module.exports = {
  createCommentArrays,
  tagMe
};
