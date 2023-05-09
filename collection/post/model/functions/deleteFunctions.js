const { Post } = require("../postModel");

const deletePostById = (id) => {
  return Post.findByIdAndDelete(id);
};

const deleteComment = (id, arrComments) => {
  return Post.findByIdAndUpdate(
    id,
    {
      $pull: { arrComments: arrComments },
    },
    { new: true }
  );
};

const deleteAllMyPosts = ( createdBy ) => {
  return Post.deleteMany({ createdBy });
};




const deleteCommentOnComment = (id, arrCommentsForComments) => {
  return Post.findByIdAndUpdate(
    id,
    {
      $pull: { arrCommentsForComments: arrCommentsForComments },
    },
    { new: true }
  );
};

module.exports = {
  deletePostById,
  deleteComment,
  deleteCommentOnComment,
  deleteAllMyPosts
};
