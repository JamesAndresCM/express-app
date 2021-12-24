const authRouter = require('./auth')
const categoriesRouter = require('./categories')
const productsRouter = require('./products')
const searchRouter = require('./search')
const usersRouter = require('./users')

module.exports = {
  authRouter,
  categoriesRouter,
  productsRouter,
  searchRouter,
  usersRouter
}