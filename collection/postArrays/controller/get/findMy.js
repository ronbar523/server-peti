const PostArraysModelGet = require("../../model/functions/getFunctions");

const find = async (req, res) => {
    try {
      const myId = req.jwtData._id;
      const postArrays = await PostArraysModelGet.findPostArraysByCreatedBy(myId)
      
      res.json(postArrays[0]);
      
    } catch (err) {
      res.status(400).json({ err: err });
    }
  };
  
  module.exports = {
    find,
  };
  