const Jwt = require('../config/jwt');


module.exports = async (req,res,next) => {
    try {            
      req.jwtData = await Jwt.verifyToken(req.headers.token);
      next();
    } catch (err) {
      res.status(401).json({ status: 401, msg: "you must login" });
    }
}

