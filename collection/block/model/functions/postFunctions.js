const { Block } = require("../blockModel");

const createBlock = (createdBy, arrMyBlock, arrBlockMe) => {
  const newBlock = new Block({
    createdBy,
    arrMyBlock,
    arrBlockMe,
  });
  return newBlock.save();
};

module.exports = {
  createBlock,
};
