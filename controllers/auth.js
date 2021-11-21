const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { createJWT } = require('../helpers/create-jwt.js');

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({email});
    if (!user) {
      return res.status(400).json({
        message: 'User - Password are incorrect'
      });      
    }

    if (!user.status) {
      return res.status(400).json({
        message: 'User - Password are incorrect'
      });
    }

    const validPasswd = bcryptjs.compareSync(password ,user.password);

    if (!validPasswd) {
      return res.status(400).json({
        message: 'User -Password are incorrect'
      })
    }
    const token = await createJWT(user.id);
    res.json({
      token: token
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Error auth'
    });
  }
}

module.exports = {
  login
}
