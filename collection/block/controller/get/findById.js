const BlockModelGet = require("../../model/functions/getFunctinos");

const find = async (req, res) => {
  try {
    const { id } = req.params;
    const block = await BlockModelGet.findBlockByCreatedBy(id);

    res.json(block[0]);
    
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

module.exports = {
  find,
};