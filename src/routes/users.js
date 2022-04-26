const { Router } = require('express');
const { getAllUsers } = require('../controllers/users');
const { getAllRequestValidations } = require('../middlewares/users');

const router = Router();

router.get('/', getAllRequestValidations, getAllUsers);


module.exports = router;