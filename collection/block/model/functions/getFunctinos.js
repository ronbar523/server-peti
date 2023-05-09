const { Block } = require("../blockModel");

const findBlockByCreatedBy = (createdBy) => {
  return Block.find({
    createdBy: createdBy,
  });
};



module.exports = {
  findBlockByCreatedBy,
};
