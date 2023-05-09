const { Comment } = require("../commentModel");

const editUserPhoto = (createdBy, userProfile) => {
  return Comment.updateMany(
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
  return Comment.updateMany(
    { createdBy: createdBy },
    {
      $set: {
        createdByName: createdByName,
      },
    },
    { new: true }
  );
};

const editUserFullName = (createdBy, createdByFullName) => {
  return Comment.updateMany(
    { createdBy: createdBy },
    {
      $set: {
        createdByFullName: createdByFullName,
      },
    },
    { new: true }
  );
};

const editUserInfo = (createdBy, userProfile,  createdByName) => {
  return Comment.updateMany(
    { createdBy: createdBy },
    {
      $set: {
        createdByName: createdByName,
        userProfile: userProfile,
      },
    },
    { new: true }
  );
};


const likePost = (id, arrLikes) => {
  return Comment.findByIdAndUpdate(
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
  return Comment.findByIdAndUpdate(
    id,
    {
      $pull: { arrLikes: arrLikes },
    },
    { new: true }
  );
};


const editComment = (
  id,
  description,
  shortDescription,
  arrTag,
  lastUpdate
) => {
  return Comment.findByIdAndUpdate(
    id,
    {
      $set: {
        description: description,
        shortDescription: shortDescription,
        arrTag:arrTag,
        lastUpdate: lastUpdate
      },
    },
    { new: true }
  );
};






module.exports = {
  editComment,
  editUserPhoto,
  editUserName,
  editUserFullName,
  likePost,
  removeLike,
  editUserInfo
};
