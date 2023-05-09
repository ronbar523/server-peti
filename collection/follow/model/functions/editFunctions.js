const { Follow } = require("../followModel");

const receiveFollowers = (id, arrFollowers) => {
  return Follow.findByIdAndUpdate(
    id,
    {
      $push: {
        arrFollowers: {
          $each: [arrFollowers],
          $position: 0,
        },
      },
    },
    { new: true }
  );
};

const receiveFollowersByCreatedBy = (createdBy, arrFollowers) => {
  return Follow.findOneAndUpdate(
    { createdBy: createdBy },
    {
      $push: {
        arrFollowers: {
          $each: [arrFollowers],
          $position: 0,
        },
      },
    },
    { new: true }
  );
};

const sendFollowing = (id, arrFollowing) => {
  return Follow.findByIdAndUpdate(
    id,
    {
      $push: {
        arrFollowing: {
          $each: [arrFollowing],
          $position: 0,
        },
      },
    },
    { new: true }
  );
};

const sendFollowingByCreatedBy = (createdBy, arrFollowing) => {
  return Follow.findOneAndUpdate(
    { createdBy: createdBy },
    {
      $push: {
        arrFollowing: {
          $each: [arrFollowing],
          $position: 0,
        },
      },
    },
    { new: true }
  );
};

const unFollowers = (id, arrFollowers) => {
  return Follow.findByIdAndUpdate(
    id,
    {
      $pull: { arrFollowers: arrFollowers },
    },
    { new: true }
  );
};

const unFollowersByCreatedBy = (createdBy, arrFollowers) => {
  return Follow.findOneAndUpdate(
    { createdBy: createdBy },
    {
      $pull: { arrFollowers: arrFollowers },
    },
    { new: true }
  );
};

const unFollowing = (id, arrFollowing) => {
  return Follow.findByIdAndUpdate(
    id,
    {
      $pull: { arrFollowing: arrFollowing },
    },
    { new: true }
  );
};

const unFollowingByCreatedBy = (createdBy, arrFollowing) => {
  return Follow.findOneAndUpdate(
    { createdBy: createdBy },
    {
      $pull: { arrFollowing: arrFollowing },
    },
    { new: true }
  );
};

const sendFollowingRequest = (id, arrFollowingRequest) => {
  return Follow.findByIdAndUpdate(
    id,
    {
      $push: {
        arrFollowingRequest: {
          $each: [arrFollowingRequest],
          $position: 0,
        },
      },
    },
    { new: true }
  );
};

const sendFollowingRequestByCreatedBy = (createdBy, arrFollowingRequest) => {
  return Follow.findOneAndUpdate(
    { createdBy: createdBy },
    {
      $push: {
        arrFollowingRequest: {
          $each: [arrFollowingRequest],
          $position: 0,
        },
      },
    },
    { new: true }
  );
};

const receiveFollowersRequest = (id, arrFollowersRequest) => {
  return Follow.findByIdAndUpdate(
    id,
    {
      $push: {
        arrFollowersRequest: {
          $each: [arrFollowersRequest],
          $position: 0,
        },
      },
    },
    { new: true }
  );
};

const receiveFollowingRequestByCreatedBy = (createdBy, arrFollowersRequest) => {
  return Follow.findOneAndUpdate(
    { createdBy: createdBy },
    {
      $push: {
        arrFollowersRequest: {
          $each: [arrFollowersRequest],
          $position: 0,
        },
      },
    },
    { new: true }
  );
};

const unFollowersRequest = (id, arrFollowersRequest) => {
  return Follow.findByIdAndUpdate(
    id,
    {
      $pull: { arrFollowersRequest: arrFollowersRequest },
    },
    { new: true }
  );
};

const unFollowersRequestByCreatedBy = (createdBy, arrFollowersRequest) => {
  return Follow.findOneAndUpdate(
    { createdBy: createdBy },
    {
      $pull: { arrFollowersRequest: arrFollowersRequest },
    },
    { new: true }
  );
};

const unFollowingRequest = (id, arrFollowingRequest) => {
  return Follow.findByIdAndUpdate(
    id,
    {
      $pull: { arrFollowingRequest: arrFollowingRequest },
    },
    { new: true }
  );
};

const unFollowingRequestByCreatedBy = (createdBy, arrFollowingRequest) => {
  return Follow.findOneAndUpdate(
    { createdBy: createdBy },
    {
      $pull: { arrFollowingRequest: arrFollowingRequest },
    },
    { new: true }
  );
};

module.exports = {
  receiveFollowers,
  receiveFollowersByCreatedBy,
  sendFollowing,
  sendFollowingByCreatedBy,
  unFollowers,
  unFollowersByCreatedBy,
  unFollowing,
  unFollowingByCreatedBy,
  sendFollowingRequest,
  sendFollowingRequestByCreatedBy,
  receiveFollowersRequest,
  receiveFollowingRequestByCreatedBy,
  unFollowersRequest,
  unFollowersRequestByCreatedBy,
  unFollowingRequest,
  unFollowingRequestByCreatedBy,
};
