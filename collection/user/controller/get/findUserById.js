const UserModelGet = require("../../model/functions/getFunctions");

const findUser = async (req, res) => {
    try {

      const { id } = req.params 
   
      const user = await UserModelGet.findUserById(id);
  
      res.json(user);
      
    } catch (err) {
      res.status(400).json({ status: 400, err: err });
    }
  };
  
  module.exports = {
    findUser,
  };
  