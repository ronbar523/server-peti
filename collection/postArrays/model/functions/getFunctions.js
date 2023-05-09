const { PostArrays } = require("../postArraysModel");


const findPostArraysById = (id) => {
  return PostArrays.findById(
    id
  );
};

const findPostArraysByCreatedBy = (createdBy) => {
  return PostArrays.find({
    createdBy: createdBy,
  });
};

const findPostArraysForTag = (usersIdArray) => {
  return PostArrays.find(
    _id,
    { $in: usersIdArray },
  )
};



module.exports = {
  findPostArraysById,
  findPostArraysByCreatedBy,
  findPostArraysForTag
};
