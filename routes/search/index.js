const { Router } = require('express');
const { search } = require('../../controllers/search');
const { isAdminRole } = require('../../middlewares/validate-role.js');

const router = Router();
router.get('/:collection/:filter',[isAdminRole], search )
module.exports = router;