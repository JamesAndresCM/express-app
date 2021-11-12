const { response, request } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');

const allUsers = async (req, res = response) => {
  const { limit = 5, next = 0 } = req.query;
  const query = { status: true }
  const [ users, total_elements ] = await Promise.all([
    User.find(query).skip(Number(next)).limit(Number(limit)),
    User.countDocuments(query)
  ]);
  res.json({
    users,
    total_elements
  });
}

const showUser = async (req, res = response) => {
  const { id } = req.params;
  const user = await User.find({"_id": id, status: true})
  res.json({
    user
  });
}

const destroyUser = async (req, res = response) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, { status: false}, {new: true})
  res.json({
    message: 'User destroy successfully',
    user
  });
}

const createUser = async (req, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({name, email, password, role});
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);
  await user.save();
  res.json({
    message: 'create user successfully',
    user
  });
}

const updateUser = async (req, res = response) => {
  const { id } = req.params;
  const { _id, role, password, google, email, ...userres } = req.body;

  if ( password ) {
    const salt = bcryptjs.genSaltSync();
    userres.password = bcyrptjs.hashSync(password, salt);
  }
  const user = await User.findByIdAndUpdate(id, userres, { new: true });
  res.json({
    message: 'update user successfully',
    user
  });
}

module.exports = {
  allUsers,
  showUser,
  updateUser,
  createUser,
  destroyUser
}
