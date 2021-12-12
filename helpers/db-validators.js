const Role = require('../models/role');
const User = require('../models/user');
const Category = require('../models/category');
const Product = require('../models/product');

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

const categoryExists = async ( id ) => {
  const category = await Category.findById(id)
  if ( !category ) {
    throw new Error(`category ${id} not found`);
  }
}

const productExists = async ( id ) => {
  const product = await Product.findById(id)
  if ( !product ) {
    throw new Error(`product ${id} not found`);
  }
}

module.exports = {
  isValidRole,
  isValidEmail,
  userExists,
  categoryExists,
  productExists
}
