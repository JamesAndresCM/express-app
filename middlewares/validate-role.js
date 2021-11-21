const { response } = require('express');

const isAdminRole = (req, res = response, next) => {
  if (!req.user ) {
    return res.status(500).json({
      message: 'verify role'
    });
  }
  const { role, name } = req.user;

  if ( role !== 'ADMIN'){
    return res.status(401).json({
      message: 'error user is not admin'
    })
  }
  next();
}

const hasRole = ( ...roles ) => {
  return (req, res = response, next) => {
    if (!req.user) {
      return res.status(500).json({
        message: 'verify role'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        message: `your role is not in ${roles}`
      })
    }
    next();
  }
}

module.exports = {
    isAdminRole,
    hasRole
}
