const { Follow } = require("../followModel");

const findFollowById = (id) => {
  return Follow.findById(id);
};

const findFollowByCreatedBy = (createdBy) => {
  return Follow.find({
    createdBy: createdBy,
  });
};

module.exports = {
  findFollowById,
  findFollowByCreatedBy,
};
