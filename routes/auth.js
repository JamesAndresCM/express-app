const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const { validateUser } = require('../middlewares/validator');

const router = Router();
router.post('/',[
  check('email', 'email must be exists').isEmail(),
  check('password', 'password must be exists').not().isEmpty(),
  validateUser
],
login);

router.post('/google',[
  check('id_token', 'Token not present').not().isEmpty(),
  validateUser
],googleSignIn);

module.exports = router;
