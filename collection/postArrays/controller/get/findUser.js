const PostArraysModelGet = require("../../model/functions/getFunctions");

const find = async (req, res) => {
    try {
      const { id } = req.params
      const postArrays = await PostArraysModelGet.findPostArraysByCreatedBy(id)
      
      res.json(postArrays[0]);
      
    } catch (err) {
      res.status(400).json({ err: err });
    }
  };
  
  module.exports = {
    find,
  };
  