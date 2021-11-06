const { response, request } = require('express');

const allUsers = (req, res = response) => {
  const { page = 1, per_page = 25 } = req.query;

  res.json({
    message: 'all users',
    page,
    per_page
  });
}

const showUser = (req, res = response) => {
  const { id } = req.params;
  res.json({
    message: 'get Api',
    id
  });
}

const destroyUser = (req, res = response) => {
  const { id } = req.params;
  res.json({
    message: 'get Api'
  });
}

const createUser = (req, res = response) => {
  const { name , age } = req.body;
  res.json({
    message: 'get Api'
  });
}

const updateUser = (req, res = response) => {
  const { id } = req.params;
  res.json({
    message: 'get Api'
  });
}

module.exports = {
  allUsers,
  showUser,
  updateUser,
  createUser,
  destroyUser
}
