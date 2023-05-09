const { Comment } = require("../commentModel");

const findCommentById = (id) => {
  return Comment.findById(id);
};

const findPostComments = (arrComments, skip, limit) => {
  return Comment.find({
    _id: { $in: arrComments },
  })
    .skip(skip)
    .limit(limit)
    .sort({ arrLikes: -1, createdAt: -1 });
};

const findCommentComments = (arrComments, skip, limit) => {
  return Comment.find({
    _id: { $in: arrComments },
  })
    .skip(skip)
    .limit(limit);
};









module.exports = {
  findPostComments,
  findCommentById,
  findCommentComments,
};
