const { Router } = require('express');
const { uploadImage } = require('../controllers/images');
const { putRequestValidations } = require('../middlewares/images');

const router = Router();

router.put('/:id/:collection', putRequestValidations, uploadImage);

module.exports = router;
