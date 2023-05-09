const { PostArrays } = require("../postArraysModel");

const removePost = (createdBy, postKind, arrMyPhoto) => {
  if (postKind === "Photo Post") {
    return PostArrays.findOneAndUpdate(
      {createdBy: createdBy},
      {
        $pull: { arrMyPhoto: arrMyPhoto },
      },
      { new: true }
    );
  }
};


const remoevTagByCreatedBy = (createdBy, arrTagMePhoto) => {
  return PostArrays.findOneAndUpdate(
    {createdBy: createdBy},
    {
      $pull: { arrTagMePhoto: arrTagMePhoto },
    },
    { new: true }
  );
};



module.exports = {
  removePost,
  remoevTagByCreatedBy
};
