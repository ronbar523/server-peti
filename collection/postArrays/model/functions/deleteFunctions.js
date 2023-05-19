const { PostArrays } = require("../postArraysModel");

const removePost = (createdBy, postKind, postId) => {
  if (postKind === "Photo Post") {
    return PostArrays.findOneAndUpdate(
      { createdBy: createdBy },
      {
        $pull: { arrMyPhoto: postId },
      },
      { new: true }
    );
  }
};

const removeTagByCreatedBy = (createdBy, postKind, postId) => {
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

const unSavePhotoPostByCreatedBy = (createdBy, postKind, postId) => {
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
  removePost,
  removeTagByCreatedBy,
  unSavePhotoPostByCreatedBy,
};
