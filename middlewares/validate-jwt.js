const jwt = require('jsonwebtoken');
const { response } = require('express');
const User = require('../models/user');

const validateJWT = async (req = request, res = response, next ) => {
  const bearerHeader = req.header('authorization');

  if (bearerHeader) {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    try {
      const { uid } = jwt.verify(req.token, process.env.JWTPRIVATEKEY)
      const user = await User.findOne({"_id": uid, status: true})
      if (!user) {
        return res.status(401).json({
          message: 'user not active'
        });
      }
      req.user = user;
      next();
    } catch(error) {
      console.log(error);
      res.status(401).json({
        message: 'token are not valid'
      });
    }
  } else {
    return res.status(401).json({
      message: 'unauthorized token not present'
    });
  }
}

module.exports = {
  validateJWT
}
