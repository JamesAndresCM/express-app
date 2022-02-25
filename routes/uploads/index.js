const { Router } = require('express');
const { check } = require('express-validator');
const { uploadFile, updateImg } = require('../../controllers/uploads');
const { permittedCollection } = require('../../helpers/db-validators');
const { validateFileUpload } = require('../../middlewares/validate-file');
const { validateFields } = require('../../middlewares/validator');

const router = Router();
router.post('/', validateFileUpload, uploadFile)
router.put('/:collection/:id', [
  validateFileUpload,
  check('id', 'not valid id').isMongoId(),
  check('collection').custom( c => permittedCollection( c, ['users','products'] ) ),
  validateFields
], updateImg)

module.exports = router;
