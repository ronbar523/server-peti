const { PostArrays } = require("../postArraysModel");

const sendTag = (createdBy, arrTagMePhoto) => {
  return PostArrays.findOneAndUpdate(
    {createdBy: createdBy},
    {
      $push: {
        arrTagMePhoto: {
          $each: [arrTagMePhoto],
          $position: 0,
        },
      },
    },
    { new: true }
  );
};


const remoevTag = (createdBy, arrTagMePhoto) => {
  return PostArrays.findOneAndUpdate(
    {createdBy: createdBy},
    {
      $pull: { arrTagMePhoto: arrTagMePhoto
      },
    },
    { new: true }
  );
};



module.exports = {
  sendTag,
 remoevTag 
}