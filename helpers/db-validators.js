const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async (role = '') => {
    const roleExists = await Role.findOne({role});
    if ( !roleExists ){
      throw new Error(`${role} is not permitted`);
    }
}

const isValidEmail = async (email = '') => {
  const emailExists = await User.findOne({email});
  if ( emailExists ){
    throw new Error(`${email} has been taken`);
  }
}

const userExists = async ( id ) => {
  const user = await User.findById(id);
  if ( !user ) {
    throw new Error(`user ${id} not found`);
  }
}
module.exports = {
  isValidRole,
  isValidEmail,
  userExists
}
