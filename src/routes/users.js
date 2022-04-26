const { Router } = require('express');
const {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/users');
const {
    getAllRequestValidations,
    postRequestValidations, 
    putRequestValidations,
    deleteRequestValidations
} = require('../middlewares/users');

const router = Router();

router.get('/', getAllRequestValidations, getAllUsers);
router.post('/', postRequestValidations, createUser);
router.put('/:id', putRequestValidations, updateUser);
router.delete('/:id(\\d+)', deleteRequestValidations, deleteUser);


module.exports = router;