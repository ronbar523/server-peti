const { Post } = require("../postModel");

const findPosts = (arrPostsId, skip, limit) => {
  return Post.find({
    _id: { $in: arrPostsId },
  })
    .sort({ createdAt: "-1" })
    .skip(skip)
    .limit(limit);
};

const completePost = (arrPostsId) => {
  return Post.find({
    _id: { $in: arrPostsId },
  })
};

const findPostById = (id) => {
  return Post.findById(id);
};

const findAllPosts = (skip, limit) => {
  return Post.find().sort({ createdAt: "-1" }).skip(skip).limit(limit);
};


// const findByFilter = (postKind) => {
//   const filter = postKind ? { postKind } : {};

//   return Post.find(filter);
// };

// const findPostByCreatedBy = (createdBy, skip, limit) => {
//   return Post.find({ createdBy: createdBy })
//     .sort({ createdAt: "-1" })
//     .skip(skip)
//     .limit(limit);
// };

module.exports = {
  // findPostByCreatedBy,
  // findByFilter
  findPosts,
  findPostById,
  findAllPosts,
  completePost
};
