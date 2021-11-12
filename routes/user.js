const { Router } = require('express');
const { check } = require('express-validator');
const { allUsers, showUser, destroyUser, updateUser, createUser } = require('../controllers/user');
const router = Router();
const { validateUser } = require('../middlewares/validator.js');
const { isValidRole, isValidEmail, userExists } = require('../helpers/db-validators.js');

router.get('/', allUsers);
router.get('/:id',[
  check('id', 'not valid id').isMongoId(),
  check('id').custom( userExists ),
  validateUser
],showUser);

router.put('/:id',[
  check('id', 'not valid id').isMongoId(),
  check('id').custom( userExists ),
  validateUser
],updateUser);
router.post('/', [
  check('email').custom( isValidEmail ),
  check('email', 'this is not valid email').isEmail(),
  check('name', 'name must be exists').not().isEmpty(),
  check('password', 'password must be exists, and greather than 6 letters').isLength({min: 6}),
  check('role').custom( isValidRole ),
  validateUser
], createUser);
router.delete('/:id',[
  check('id', 'not valid id').isMongoId(),
  check('id').custom( userExists ),
  validateUser
],
destroyUser);

module.exports = router;
