const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validator');

const router = Router();
router.post('/',[
  check('email', 'email must be exists').isEmail(),
  check('password', 'password must be exists').not().isEmpty(),
  validateFields
],
login);

router.post('/google',[
  check('id_token', 'Token not present').not().isEmpty(),
  validateFields
],googleSignIn);

module.exports = router;
