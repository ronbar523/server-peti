const { Post } = require("../postModel");

const createPost = async (
  createdByName,
  createdByFullName,
  userProfile,
  category,
  description,
  shortDescription,
  location,
  postKind,
  postPhoto,
  arrTag,
  createdBy,
  lastUpdate,
  createdAt,
  arrComments,
  arrCommentsForComments,
  arrLikes,
  arrSaves
) => {
  const newPost = new Post({
    createdByName,
    createdByFullName,
    userProfile,
    category,
    description,
    shortDescription,
    location,
    postKind,
    postPhoto,
    arrTag,
    createdBy,
    lastUpdate,
    createdAt,
    arrComments,
    arrCommentsForComments,
    arrLikes,
    arrSaves,
  });
  return newPost.save();
};

const createComment = (id, arrComments) => {
  return Post.findByIdAndUpdate(
    id,
    {
      $push: { arrComments: arrComments },
    },
    { new: true }
  );
};

const createCommentForComment = (id, arrCommentsForComments) => {
  return Post.findByIdAndUpdate(
    id,
    {
      $push: { arrCommentsForComments: arrCommentsForComments },
    },
    { new: true }
  );
};

module.exports = { createPost, createComment, createCommentForComment };
