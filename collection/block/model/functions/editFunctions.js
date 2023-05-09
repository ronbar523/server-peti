const { Block } = require("../blockModel");

const userBlock = (id, arrBlockMe) => {
  return Block.findByIdAndUpdate(
    id,
    {
      $push: {
        arrBlockMe: {
          $each: [arrBlockMe],
          $position: 0,
        },
      },
    },
    { new: true }
  );
};

const blockUser = (id, arrMyBlock) => {
  return Block.findByIdAndUpdate(
    id,
    {
      $push: {
        arrMyBlock: {
          $each: [arrMyBlock],
          $position: 0,
        },
      },
    },
    { new: true }
  );
};

const unBlockUser = (id, arrMyBlock) => {
  return Block.findByIdAndUpdate(
    id,
    {
      $pull: { arrMyBlock: arrMyBlock },
    },
    { new: true }
  );
};

const unBlockUserByCreatedBy = (createdBy, arrMyBlock) => {
  return Block.findOneAndUpdate(
    {createdBy: createdBy},
    {
      $pull: { arrMyBlock: arrMyBlock },
    },
    { new: true }
  );
};

const userUnBlock = (id, arrBlockMe) => {
  return Block.findByIdAndUpdate(
    id,
    {
      $pull: { arrBlockMe: arrBlockMe },
    },
    { new: true }
  );
};


const userUnBlockByCreatedBy = (createdBy, arrBlockMe) => {
  return Block.findOneAndUpdate(
    {createdBy: createdBy},
    {
      $pull: { arrBlockMe: arrBlockMe },
    },
    { new: true }
  );
};





module.exports = {
  Block,
  userBlock,
  unBlockUserByCreatedBy,
  blockUser,
  unBlockUser,
  userUnBlock,
  userUnBlockByCreatedBy
};
