const { Router } = require('express');
const { allUsers, showUser, destroyUser, updateUser, createUser } = require('../controllers/user');
const router = Router();

router.get('/', allUsers);
router.get('/:id', showUser);
router.put('/:id', updateUser);
router.post('/', createUser);
router.delete('/:id', destroyUser);

module.exports = router;
