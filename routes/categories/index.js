const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../../middlewares/validator');
const { validateJWT } = require('../../middlewares/validate-jwt.js');
const { createCategory, allCategories, showCategory, updateCategory, destroyCategory } = require('../../controllers/categories');
const { isAdminRole } = require('../../middlewares/validate-role.js');
const { categoryExists } = require('../../helpers/db-validators.js');

const router = Router();
router.get('/',allCategories);

router.get('/:id',[
  check('id', 'not valid id').isMongoId(),
  check('id').custom( categoryExists ),
  validateFields
],showCategory);

router.put('/:id',[
  validateJWT,
  check('id', 'not valid id').isMongoId(),
  check('id').custom( categoryExists ),
  validateFields
],updateCategory);

router.post('/', [ 
  validateJWT, 
  check('name', 'name must be exists').not().isEmpty(),
  validateFields
], createCategory);

router.delete('/:id',[
  validateJWT,
  isAdminRole,
  check('id', 'not valid id').isMongoId(),
  check('id').custom( categoryExists ),
  validateFields
],
destroyCategory);

module.exports = router;
