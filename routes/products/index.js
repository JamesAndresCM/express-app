const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../../middlewares/validator');
const { validateJWT } = require('../../middlewares/validate-jwt.js');
const { createProduct, allProducts, showProduct, updateProduct, destroyProduct } = require('../../controllers/products');
const { isAdminRole } = require('../../middlewares/validate-role.js');
const { categoryExists, productExists } = require('../../helpers/db-validators.js');

const router = Router();
router.post('/', [ 
  validateJWT, 
  check('name', 'name must be exists').not().isEmpty(),
  check('category', 'not valid category id').isMongoId(),
  check('category').custom( categoryExists ),
  validateFields
], createProduct);

router.get('/',allProducts);

router.get('/:id',[
  check('id', 'not valid id').isMongoId(),
  check('id').custom( productExists ),
  validateFields
],showProduct);

router.put('/:id',[
  validateJWT,
  check('id', 'not valid id').isMongoId(),
  check('id').custom( productExists ),
  validateFields
],updateProduct);

router.delete('/:id',[
  validateJWT,
  isAdminRole,
  check('id', 'not valid id').isMongoId(),
  check('id').custom( productExists ),
  validateFields
],destroyProduct);

module.exports = router;
