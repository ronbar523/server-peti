const { PostArrays } = require("../postArraysModel");

const createPostArrays = (
  createdBy,
  arrMyTextPost,
  arrMyPhoto,
  arrMyVideo,
  arrMySaveTextPost,
  arrMySavePhoto,
  arrMySaveVideo,
  arrTagMeTextPost,
  arrTagMePhoto,
  arrTagMeVideo
) => {
  const newPostArray = new PostArrays({
    createdBy,
    arrMyTextPost,
    arrMyPhoto,
    arrMyVideo,
    arrMySaveTextPost,
    arrMySavePhoto,
    arrMySaveVideo,
    arrTagMeTextPost,
    arrTagMePhoto,
    arrTagMeVideo,
  });
  return newPostArray.save();
};

const newPost = (createdBy, postKind, postId) => {
  if (postKind === "Photo Post") {
    return PostArrays.findOneAndUpdate(
      { createdBy: createdBy },
      {
        $push: {
          arrMyPhoto: postId,
        },
      },
      { new: true }
    );
  }
};

const sendTag = (createdBy, postId) => {
  return PostArrays.findOneAndUpdate(
    {createdBy: createdBy},
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

module.exports = {
  createPostArrays,
  newPost,
  sendTag
};
