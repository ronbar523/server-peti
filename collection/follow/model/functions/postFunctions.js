const { Follow } = require("../followModel");

const createFollow = (
  createdBy,
  arrFollowers,
  arrFollowing,
  arrFollowingRequest,
  arrFollowersRequest
) => {
  const newFollow = new Follow({
    createdBy,
    arrFollowers,
    arrFollowing,
    arrFollowingRequest,
    arrFollowersRequest,
  });
  return newFollow.save();
};

module.exports = {
  createFollow,
};
