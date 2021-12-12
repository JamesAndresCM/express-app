const { Router } = require('express');
const { check } = require('express-validator');
const { allUsers, showUser, destroyUser, updateUser, createUser } = require('../controllers/users');
const router = Router();
const { validateFields } = require('../middlewares/validator.js');
const { validateJWT } = require('../middlewares/validate-jwt.js');
const { isAdminRole, hasRole } = require('../middlewares/validate-role.js');
const { isValidRole, isValidEmail, userExists } = require('../helpers/db-validators.js');

router.get('/', [validateJWT, hasRole('ADMIN', 'USER')],allUsers);
router.get('/:id',[
  check('id', 'not valid id').isMongoId(),
  check('id').custom( userExists ),
  validateFields
],showUser);

router.put('/:id',[
  validateJWT,
  check('id', 'not valid id').isMongoId(),
  check('id').custom( userExists ),
  validateFields
],updateUser);

router.post('/', [
  check('email').custom( isValidEmail ),
  check('email', 'this is not valid email').isEmail(),
  check('name', 'name must be exists').not().isEmpty(),
  check('password', 'password must be exists, and greather than 6 letters').isLength({min: 6}),
  check('role').custom( isValidRole ),
  validateFields
], createUser);

router.delete('/:id',[
  validateJWT,
  isAdminRole,
  check('id', 'not valid id').isMongoId(),
  check('id').custom( userExists ),
  validateFields
],
destroyUser);

module.exports = router;
