const { PostArrays } = require("../postArraysModel");

const sendTag = (createdBy, postId) => {
  return PostArrays.findOneAndUpdate(
    { createdBy: createdBy },
    {
      $push: {
        arrTagMePhoto: {
          $each: [postId],
          $position: 0,
        },
      },
    },
    { new: true }
  );
};

const removeTag = (createdBy, postKind, postId) => {
  if (postKind === "Photo Post") {
    return PostArrays.findOneAndUpdate(
      { createdBy: createdBy },
      {
        $pull: { arrTagMePhoto: postId },
      },
      { new: true }
    );
  }
};

const savePhotoPost = (createdBy, postKind, postId) => {
  if (postKind === "Photo Post") {
    return PostArrays.findOneAndUpdate(
      { createdBy: createdBy },
      {
        $push: {
          arrMySavePhoto: {
            $each: [postId],
            $position: 0,
          },
        },
      },
      { new: true }
    );
  }
};

const unSavePhotoPost = (createdBy, postKind, postId) => {
  if (postKind === "Photo Post") {
  return PostArrays.findOneAndUpdate(
    { createdBy: createdBy },
    {
      $pull: { arrMySavePhoto: postId },
    },
    { new: true }
  );
  }
};

module.exports = {
  sendTag,
  removeTag,
  savePhotoPost,
  unSavePhotoPost,
};
