const { Comment } = require("../commentModel");

const createComment = async (
  createdByName,
  createdByFullName,
  userProfile,
  description,
  shortDescription,
  arrTag,
  postId,
  createdBy,
  commentIdCreated,
  createdAt,
  lastUpdate,
  arrComments,
  arrLikes
) => {
  const newComment = new Comment({
    createdByName,
    createdByFullName,
    userProfile,
    description,
    shortDescription,
    arrTag,
    postId,
    createdBy,
    commentIdCreated,
    createdAt,
    lastUpdate,
    arrComments,
    arrLikes,
  });
  return newComment.save();
};

const createCommentForComment = (id, arrComments) => {
  return Comment.findByIdAndUpdate(id, {
    $push: { arrComments: arrComments },
  });
};

module.exports = { createComment, createCommentForComment };
