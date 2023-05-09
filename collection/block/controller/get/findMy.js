const BlockModelGet = require("../../model/functions/getFunctinos");

const find = async (req, res) => {
    try {
      const myId = req.jwtData._id;
      const block = await BlockModelGet.findBlockByCreatedBy(myId);
  
      res.json(block[0]);
      
    } catch (err) {
      res.status(400).json({ err: err });
    }
  };
  
  module.exports = {
    find,
  };
  