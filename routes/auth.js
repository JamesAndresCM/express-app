const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validateUser } = require('../middlewares/validator');

const router = Router();
router.post('/',[
  check('email', 'email must be exists').isEmail(),
  check('password', 'password must be exists').not().isEmpty(),
  validateUser
],
login);

module.exports = router;
