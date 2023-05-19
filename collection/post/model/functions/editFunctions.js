const { Post } = require("../postModel");

const editPost = (
  id,
  description,
  shortDescription,
  category,
  location,
  arrTag,
  lastUpdate
) => {
  return Post.findByIdAndUpdate(
    id,
    {
      $set: {
        description: description,
        shortDescription: shortDescription,
        category: category,
        location: location,
        arrTag: arrTag,
        lastUpdate: lastUpdate,
      },
    },
    { new: true }
  );
};

const editUserPhoto = (createdBy, userProfile) => {
  return Post.updateMany(
    { createdBy: createdBy },
    {
      $set: {
        userProfile: userProfile,
      },
    },
    { new: true }
  );
};

const editUserName = (createdBy, createdByName) => {
  return Post.updateMany(
    { createdBy: createdBy },
    {
      $set: {
        createdByName: createdByName,
      },
    },
    { new: true }
  );
};

const editFullName = (createdBy, createdByFullName) => {
  return Post.updateMany(
    { createdBy: createdBy },
    {
      $set: {
        createdByFullName: createdByFullName,
      },
    },
    { new: true }
  );
};

const removeTag = (id, arrTag) => {
  return Post.findByIdAndUpdate(
    id,
    {
      $pull: { arrTag: arrTag },
    },
    { new: true }
  );
};

const likePost = (id, arrLikes) => {
  return Post.findByIdAndUpdate(
    id,
    {
      $push: {
        arrLikes: {
          $each: [arrLikes],
          $position: 0,
        },
      },
    },
    { new: true }
  );
};

const removeLike = (id, arrLikes) => {
  return Post.findByIdAndUpdate(
    id,
    {
      $pull: { arrLikes: arrLikes },
    },
    { new: true }
  );
};

const savePost = (id, arrSaves) => {
  return Post.findByIdAndUpdate(
    id,
    {
      $push: {
        arrSaves: {
          $each: [arrSaves],
          $position: 0,
        },
      },
    },
    { new: true }
  );
};

const unSavePost = (id, arrSaves) => {
  return Post.findByIdAndUpdate(
    id,
    {
      $pull: { arrSaves: arrSaves },
    },
    { new: true }
  );
};

module.exports = {
  editPost,
  editUserPhoto,
  editFullName,
  editUserName,
  removeTag,
  likePost,
  removeLike,
  savePost,
  unSavePost,
};
