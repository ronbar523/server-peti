const { Comment } = require("../commentModel");

const deleteAllCommentsInPost = (postId) => {
  return Comment.deleteMany({ postId });
};

const deleteComment = (id) => {
  return Comment.findByIdAndDelete(id);
};

const deleteAllCommentsInComment = (commentIdCreated) => {
  return Comment.deleteMany({ commentIdCreated });
};

const deleteCommentOnComment = (id, arrComments) => {
  return Comment.findByIdAndUpdate(
    id,
    {
      $pull: { arrComments: arrComments },
    },
    { new: true }
  );
};


module.exports = {
  deleteComment,
  deleteAllCommentsInPost,
  deleteAllCommentsInComment,
  deleteCommentOnComment
};
